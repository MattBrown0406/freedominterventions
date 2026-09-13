-- Aggregate-only attribution. No contacts, caller IDs, transcripts or arbitrary payloads.
begin;
create table public.attribution_daily (
  feed text not null check(feed in ('livekit','ga4')),
  site text not null check(site in ('freedom','sober_helpline','nme','partywreckers','familybridge','ayuda_sobria','unknown')),
  day date not null,
  metric text not null check(metric in ('sessions','engaged_sessions','phone_connections','ai_audio_observed','transfer_requested','transfer_bridged','call_ended','callback_requested')),
  channel text not null check(channel in ('all','organic','chatgpt')),
  value bigint not null check(value >= 0 and value <= 1000000000),
  observed_at timestamptz not null,
  primary key(feed,site,day,metric,channel),
  check((feed='ga4' and metric in ('sessions','engaged_sessions')) or (feed='livekit' and channel='all' and metric not in ('sessions','engaged_sessions')))
);
create table public.attribution_feeds (
  feed text not null check(feed in ('livekit','ga4')),
  site text not null check(site in ('freedom','sober_helpline','nme','partywreckers','familybridge','ayuda_sobria','unknown')),
  status text not null check(status in ('ok','error','not_connected')),
  coverage_start date,
  coverage_end date,
  last_success_at timestamptz,
  checked_at timestamptz not null,
  primary key(feed,site)
);
alter table public.attribution_daily enable row level security;
alter table public.attribution_feeds enable row level security;
revoke all on public.attribution_daily,public.attribution_feeds from public,anon,authenticated;
grant select on public.attribution_daily,public.attribution_feeds to authenticated;
grant all on public.attribution_daily,public.attribution_feeds to service_role;
create policy attribution_admin_read on public.attribution_daily for select to authenticated using(public.is_strict_admin());
create policy attribution_feeds_admin_read on public.attribution_feeds for select to authenticated using(public.is_strict_admin());

-- Service-only transaction: validate before any write, reject stale snapshots per feed.
create function public.ingest_attribution_snapshot(p_feed text,p_site text,p_status text,p_start date,p_end date,p_observed timestamptz,p_rows jsonb)
returns boolean language plpgsql security invoker set search_path = public,pg_temp as $$
declare r jsonb; previous timestamptz;
begin
  if p_feed not in ('livekit','ga4') or p_site not in ('freedom','sober_helpline','nme','partywreckers','familybridge','ayuda_sobria','unknown') or p_status not in ('ok','error','not_connected')
    or p_feed is null or p_site is null or p_status is null or p_observed is null or p_observed > now()+interval '5 minutes'
    or p_start is null or p_end is null or p_end < p_start or p_end-p_start > 89
    or p_rows is null or jsonb_typeof(p_rows)<>'array' or jsonb_array_length(p_rows)>2000 then raise exception 'invalid snapshot'; end if;
  if p_end > (now() at time zone 'America/Los_Angeles')::date then raise exception 'future coverage'; end if;
  if (select count(*) from jsonb_array_elements(p_rows)) <> (select count(distinct (item->>'day',item->>'metric',item->>'channel')) from jsonb_array_elements(p_rows) as entries(item)) then raise exception 'duplicate aggregate key'; end if;
  if p_status = 'ok' and jsonb_array_length(p_rows) <> (p_end-p_start+1)*6 then raise exception 'incomplete daily coverage'; end if;
  if p_status <> 'ok' and jsonb_array_length(p_rows)<>0 then raise exception 'failed feed cannot contain data'; end if;
  perform pg_advisory_xact_lock(hashtextextended('attribution:'||p_feed||':'||p_site,0));
  select checked_at into previous from public.attribution_feeds where feed=p_feed and site=p_site;
  if previous is not null and previous>=p_observed then return false; end if;
  for r in select value from jsonb_array_elements(p_rows) loop
    if jsonb_typeof(r)<>'object' or (select count(*) from jsonb_object_keys(r))<>4 or not (r ?& array['day','metric','channel','value'])
       or jsonb_typeof(r->'value') <> 'number' or (r->>'value') !~ '^[0-9]+$'
       or (r->>'day')::date not between p_start and p_end or (r->>'day') is null or (r->>'value') is null then raise exception 'invalid aggregate row'; end if;
    insert into public.attribution_daily(feed,site,day,metric,channel,value,observed_at)
    values(p_feed,p_site,(r->>'day')::date,r->>'metric',r->>'channel',(r->>'value')::bigint,p_observed)
    on conflict(feed,site,day,metric,channel) do update set value=excluded.value,observed_at=excluded.observed_at
    where attribution_daily.observed_at < excluded.observed_at;
  end loop;
  insert into public.attribution_feeds(feed,site,status,coverage_start,coverage_end,last_success_at,checked_at)
  values(p_feed,p_site,p_status,case when p_status='ok' then p_start end,case when p_status='ok' then p_end end,case when p_status='ok' then p_observed end,p_observed)
  on conflict(feed,site) do update set status=excluded.status,checked_at=excluded.checked_at,
    coverage_start=coalesce(excluded.coverage_start,attribution_feeds.coverage_start),coverage_end=coalesce(excluded.coverage_end,attribution_feeds.coverage_end),last_success_at=coalesce(excluded.last_success_at,attribution_feeds.last_success_at);
  return true;
end $$;
revoke all on function public.ingest_attribution_snapshot(text,text,text,date,date,timestamptz,jsonb) from public,anon,authenticated;
grant execute on function public.ingest_attribution_snapshot(text,text,text,date,date,timestamptz,jsonb) to service_role;

create function public.get_central_attribution(p_start date,p_end date,p_site text default null)
returns jsonb language plpgsql security invoker set search_path=public,pg_temp as $$
begin
  if public.is_strict_admin() is not true then raise exception 'admin required' using errcode='42501'; end if;
  if p_start is null or p_end is null or p_end<p_start or p_end-p_start>89 or p_end>(now() at time zone 'America/Los_Angeles')::date then raise exception 'invalid date window'; end if;
  if p_site is not null and p_site not in ('freedom','sober_helpline','nme','partywreckers','familybridge','ayuda_sobria','unknown') then raise exception 'invalid site'; end if;
  return jsonb_build_object('timezone','America/Los_Angeles','rows',coalesce((select jsonb_agg(d order by day,site,metric,channel) from public.attribution_daily d where day between p_start and p_end and (p_site is null or site=p_site)),'[]'::jsonb),
    'feeds',coalesce((select jsonb_agg(f order by site,feed) from public.attribution_feeds f where p_site is null or site=p_site),'[]'::jsonb));
end $$;
revoke all on function public.get_central_attribution(date,date,text) from public,anon;
grant execute on function public.get_central_attribution(date,date,text) to authenticated;
commit;
