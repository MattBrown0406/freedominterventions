"""Disposable PostgreSQL 17 integration tests; no remote database commands."""
import json
from pathlib import Path
import subprocess
import unittest

CMD=['docker','exec','-i','supabase_db_sh_backend_release_20260907','psql','-X','-U','postgres','-d','central_attribution_qa','-v','ON_ERROR_STOP=1','-At']
def query(sql,ok=True):
    r=subprocess.run(CMD,input=sql,text=True,capture_output=True)
    if ok and r.returncode: raise AssertionError(r.stderr)
    if not ok and not r.returncode: raise AssertionError('Expected rejection')
    return r.stdout.strip()
def quote(x): return "'"+str(x).replace("'","''")+"'"
def call(s):
    return 'select public.ingest_attribution_snapshot('+','.join(quote(s[k]) for k in ['feed','site','status','start','end','observed'])+','+quote(json.dumps(s['rows']))+'::jsonb);'
ADMIN="set role authenticated; set request.jwt.claims='{"+'"sub":"11111111-1111-4111-8111-111111111111","email":"matt@freedominterventions.com"'+"}';"
READ="select public.get_central_attribution(current_date-28,current_date,null);"
class DatabaseTests(unittest.TestCase):
    def test_anon_denied(self): query('set role anon; '+READ,False)
    def test_nonadmin_denied(self): query("set role authenticated; set request.jwt.claims='{\"sub\":\"22222222-2222-4222-8222-222222222222\",\"email\":\"matt@freedominterventions.com\"}';"+READ,False)
    def test_empty_claims_denied(self): query("set role authenticated; set request.jwt.claims='{}';"+READ,False)
    def test_role_without_email_denied(self): query("set role authenticated; set request.jwt.claims='{\"sub\":\"11111111-1111-4111-8111-111111111111\",\"email\":\"other@example.test\"}';"+READ,False)
    def test_admin_accepted(self): self.assertIn('rows',query(ADMIN+READ))
    def test_nonadmin_rls(self): self.assertEqual(query('set role authenticated; select count(*) from attribution_daily;').splitlines()[-1],'0')
    def test_anon_table_denied(self): query('set role anon; select * from attribution_daily;',False)
    def test_admin_write_denied(self): query(ADMIN+"delete from attribution_daily;",False)
    def test_admin_ingest_denied(self): query(ADMIN+"select public.ingest_attribution_snapshot('ga4','freedom','error',current_date,current_date,now(),'[]');",False)
    def test_large_date_denied(self): query(ADMIN+"select public.get_central_attribution(current_date-91,current_date,null);",False)
    def test_privacy_payload_denied(self): query("set role service_role; select public.ingest_attribution_snapshot('ga4','freedom','ok',current_date,current_date,now(),jsonb_build_array(jsonb_build_object('day',current_date,'metric','sessions','channel','all','value',1,'email','SYNTHETIC')));",False)
    def test_negative_denied(self): query("set role service_role; select public.ingest_attribution_snapshot('ga4','freedom','ok',current_date,current_date,now(),jsonb_build_array(jsonb_build_object('day',current_date,'metric','sessions','channel','all','value',-1)));",False)
    def test_unknown_metric_denied(self): query("set role service_role; select public.ingest_attribution_snapshot('ga4','freedom','ok',current_date,current_date,now(),jsonb_build_array(jsonb_build_object('day',current_date,'metric','transcript','channel','all','value',1)));",False)
    def test_idempotent_and_late(self):
        sql="begin; set role service_role; select public.ingest_attribution_snapshot('livekit','unknown','error',current_date,current_date,now(),'[]'); select public.ingest_attribution_snapshot('livekit','unknown','error',current_date,current_date,now(),'[]'); select public.ingest_attribution_snapshot('livekit','unknown','error',current_date,current_date,now()-interval '1 hour','[]'); rollback;"
        self.assertEqual([x for x in query(sql).splitlines() if x in ['t','f']],['t','f','f'])
    def test_failed_feed_preserves_data(self):
        before=query('select count(*) from attribution_daily;')
        query("begin; set role service_role; select public.ingest_attribution_snapshot('ga4','freedom','error',current_date,current_date,now(),'[]'); rollback;")
        self.assertEqual(query('select count(*) from attribution_daily;'),before)
if __name__=='__main__': unittest.main()
