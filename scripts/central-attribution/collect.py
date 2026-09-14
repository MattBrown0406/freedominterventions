#!/usr/bin/env python3
"""Read-only operational/GA4 adapters; emit only fixed-schema daily aggregates.
No modification or restart of the phone worker; no provider webhook added.
"""
import argparse
import hashlib
import hmac
import importlib.util
import json
import os
from pathlib import Path
import sqlite3
import subprocess
import time
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo
from urllib.request import Request, urlopen

SITES = ('freedom','sober_helpline','nme','partywreckers','familybridge','ayuda_sobria','unknown')
METRICS = ('phone_connections','ai_audio_observed','transfer_requested','transfer_bridged','call_ended','callback_requested')
PROPERTIES = {'freedom':'545973139','sober_helpline':'545963354','nme':'545966789'}
PT = ZoneInfo('America/Los_Angeles')

def snapshot(feed, site, start, end, observed, rows, status='ok'):
    return dict(feed=feed,site=site,start=str(start),end=str(end),observed=observed,rows=rows,status=status)

def days(start,end):
    for n in range((end-start).days+1): yield str(start+timedelta(days=n))

def phone(con, mapping, start, end, observed):
    # Deliberately project only called business number, UTC time and boolean event flags.
    # JSON event payloads, caller ID and call IDs never leave SQLite.
    queries = ['1','first_agent_audio_seconds IS NOT NULL',
       "EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(tools_json) THEN tools_json ELSE '[]' END) e WHERE json_extract(e.value,'$.type')='warm_transfer_requested')",
       "EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(tools_json) THEN tools_json ELSE '[]' END) e WHERE json_extract(e.value,'$.type')='warm_transfer_bridged')",
       "call_ended_at IS NOT NULL AND call_ended_at<>''",
       "EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(tools_json) THEN tools_json ELSE '[]' END) e WHERE json_extract(e.value,'$.type')='callback_requested')"]
    a=datetime.combine(start,datetime.min.time(),PT).astimezone(timezone.utc).isoformat()
    b=datetime.combine(end+timedelta(days=1),datetime.min.time(),PT).astimezone(timezone.utc).isoformat()
    counts={(s,d,m):0 for s in SITES for d in days(start,end) for m in METRICS}
    sql="SELECT called_number,coalesce(call_started_at,created_at),"+','.join(queries)+" FROM calls WHERE julianday(coalesce(call_started_at,created_at))>=julianday(?) AND julianday(coalesce(call_started_at,created_at))<julianday(?)"
    for number, stamp, *flags in con.execute(sql,(a,b)):
        dt=datetime.fromisoformat(stamp)
        if dt.tzinfo is None: raise ValueError('SOURCE_TIMEZONE_MISSING')
        day=str(dt.astimezone(PT).date())
        # Observed worker storage uses 11 US digits; brand_for_number uses the same
        # canonical +1 mapping. Accept only this verified representation, not arbitrary cleanup.
        canonical='+'+number if isinstance(number,str) and len(number)==11 and number.startswith('1') and number.isascii() and number.isdigit() else number
        site=mapping.get(canonical,'unknown')
        if site not in SITES: site='unknown'
        for m,v in zip(METRICS,flags): counts[site,day,m]+=int(bool(v))
    return [snapshot('livekit',s,start,end,observed,[dict(day=d,metric=m,channel='all',value=counts[s,d,m]) for d in days(start,end) for m in METRICS]) for s in SITES]

def ga4(start,end,observed):
    spec=importlib.util.spec_from_file_location('existing_ga4','/opt/seo-ctr/bin/fetch-ga4.py')
    mod=importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    session=mod.AuthorizedSession(mod.Credentials.from_authorized_user_file(str(mod.TOKEN_PATH),[mod.SCOPE]))
    snapshots=[]
    for site in SITES:
        if site not in PROPERTIES:
            snapshots.append(snapshot('ga4',site,start,end,observed,[],'not_connected')); continue
        try:
            rows=[]
            for channel in ('all','organic','chatgpt'):
                body={'dateRanges':[{'startDate':str(start),'endDate':str(end)}], 'dimensions':[{'name':'date'}], 'metrics':[{'name':'sessions'},{'name':'engagedSessions'}], 'limit':'1000','keepEmptyRows':False}
                filt=mod.source_filter(channel)
                if filt: body['dimensionFilter']=filt
                result=mod.request_json(session,'POST',mod.API+PROPERTIES[site]+':runReport',body)
                if result.get('metadata',{}).get('timeZone')!='America/Los_Angeles': raise ValueError('TIMEZONE_MISMATCH')
                parsed=mod.parse_rows(result)
                if len(parsed)!=int(result.get('rowCount',0)): raise ValueError('PARTIAL_ROWS')
                found={}
                for r in parsed:
                    d=str(datetime.strptime(r['date'],'%Y%m%d').date())
                    if d not in set(days(start,end)) or d in found: raise ValueError('INVALID_DAY')
                    found[d]=r
                for d in days(start,end):
                    for metric, source in [('sessions','sessions'),('engaged_sessions','engagedSessions')]:
                        value=found.get(d,{}).get(source,0)
                        if not isinstance(value,int) or value<0: raise ValueError('INVALID_COUNT')
                        rows.append(dict(day=d,metric=metric,channel=channel,value=value))
            snapshots.append(snapshot('ga4',site,start,end,observed,rows))
        except Exception:
            snapshots.append(snapshot('ga4',site,start,end,observed,[],'error'))
    return snapshots

def send(p, endpoint, secret):
    if endpoint!='https://rizfkjgwhcpwiryyqejx.supabase.co/functions/v1/attribution-ingest': raise ValueError('UNAPPROVED_TARGET')
    body=json.dumps(p,separators=(',',':')).encode()
    for attempt in range(3):
        stamp=str(int(time.time())); signature=hmac.new(secret.encode(),stamp.encode()+b'.'+body,hashlib.sha256).hexdigest()
        try:
            req=Request(endpoint,data=body,headers={'Content-Type':'application/json','x-attribution-timestamp':stamp,'x-attribution-signature':signature},method='POST')
            with urlopen(req,timeout=40) as r: result=json.load(r)
            if result.get('accepted') is not True and result.get('duplicate_or_older') is not True: raise ValueError('WRITE_NOT_CONFIRMED')
            return
        except Exception:
            if attempt==2: raise RuntimeError('INGEST_FAILED') from None
            time.sleep(2**attempt)

def main():
    p=argparse.ArgumentParser(); p.add_argument('--days',type=int,default=28); p.add_argument('--output',required=True); p.add_argument('--push',action='store_true'); args=p.parse_args()
    if not 1<=args.days<=90: p.error('days must be 1..90')
    observed=datetime.now(timezone.utc).isoformat(); end=datetime.now(PT).date(); start=end-timedelta(days=args.days-1)
    mapping=json.loads(subprocess.check_output(['docker','exec','freedom-livekit-agent-freedom-livekit-agent-1','python','-c','import json; from app.brands import brand_numbers; print(json.dumps(brand_numbers()))'],text=True))
    con=sqlite3.connect('file:/root/freedom-livekit-agent/data/calls.db?mode=ro',uri=True)
    try: snapshots=phone(con,mapping,start,end,observed)
    finally: con.close()
    ga_end=end-timedelta(days=3); ga_start=ga_end-timedelta(days=args.days-1)
    snapshots+=ga4(ga_start,ga_end,observed)
    output=Path(args.output); output.parent.mkdir(parents=True,exist_ok=True); output.write_text(json.dumps(snapshots,indent=2)); output.chmod(0o600)
    if args.push:
        secret=os.environ.get('ATTRIBUTION_INGEST_SECRET','')
        if not secret: raise RuntimeError('INGEST_SECRET_MISSING')
        for s in snapshots: send(s,'https://rizfkjgwhcpwiryyqejx.supabase.co/functions/v1/attribution-ingest',secret)
    print(json.dumps({'snapshots':len(snapshots),'feed_statuses':[{k:s[k] for k in ('feed','site','status')} for s in snapshots],'pushed':args.push}))
    if any(s['status']=='error' for s in snapshots): raise SystemExit(1)
if __name__=='__main__': main()
