import importlib.util
import json
from pathlib import Path
import sqlite3
import unittest
from datetime import date

spec=importlib.util.spec_from_file_location('collector',Path(__file__).with_name('collect.py'))
c=importlib.util.module_from_spec(spec); spec.loader.exec_module(c)

class PhoneTests(unittest.TestCase):
    def setUp(self):
        self.db=sqlite3.connect(':memory:')
        self.db.execute('create table calls (called_number text,call_started_at text,created_at text,first_agent_audio_seconds real,tools_json text,call_ended_at text)')
    def tearDown(self): self.db.close()
    def add(self,number='+15550000001',stamp='2026-09-10T08:00:00+00:00',events=None,audio=None):
        self.db.execute('insert into calls values(?,?,?,?,?,?)',(number,stamp,stamp,audio,json.dumps(events or []),'2026-09-10T09:00:00+00:00'))
    def collect(self): return c.phone(self.db,{'+15550000001':'freedom'},date(2026,9,10),date(2026,9,10),'2026-09-11T00:00:00+00:00')
    def total(self,ss,site,metric): return sum(r['value'] for s in ss if s['site']==site for r in s['rows'] if r['metric']==metric)
    def test_no_rows_explicit_observed_zero(self): self.assertEqual(self.total(self.collect(),'freedom','phone_connections'),0)
    def test_observed_eleven_digit_provider_format(self):
        self.add(number='15550000001'); self.assertEqual(self.total(self.collect(),'freedom','phone_connections'),1)
    def test_malformed_number_not_repaired(self):
        self.add(number='tel:+15550000001'); self.assertEqual(self.total(self.collect(),'unknown','phone_connections'),1)
    def test_unknown_preserved(self):
        self.add(number='+15559999999'); self.assertEqual(self.total(self.collect(),'unknown','phone_connections'),1)
    def test_duplicate_events_count_one_call(self):
        self.add(events=[{'type':'warm_transfer_bridged'}]*2)
        self.assertEqual(self.total(self.collect(),'freedom','transfer_bridged'),1)
    def test_transfer_request_not_bridge(self):
        self.add(events=[{'type':'warm_transfer_requested'}]); out=self.collect()
        self.assertEqual(self.total(out,'freedom','transfer_requested'),1); self.assertEqual(self.total(out,'freedom','transfer_bridged'),0)
    def test_audio_not_human_answer(self):
        self.add(audio=0); out=self.collect(); self.assertEqual(self.total(out,'freedom','ai_audio_observed'),1); self.assertNotIn('human_answered',json.dumps(out))
    def test_payload_is_never_selected(self):
        self.add(events=[{'type':'warm_transfer_requested','payload':{'email':'private@example.test','transcript':'SENSITIVE_SENTINEL','url':'/?name=private'}}])
        self.assertNotIn('SENSITIVE_SENTINEL',json.dumps(self.collect())); self.assertNotIn('private',json.dumps(self.collect()))
    def test_pacific_boundary(self):
        self.add(stamp='2026-09-10T06:59:00+00:00'); self.assertEqual(self.total(self.collect(),'freedom','phone_connections'),0)
    def test_idempotent_read(self):
        self.add(); self.assertEqual(self.collect(),self.collect())
    def test_late_bridge_recomputed(self):
        self.add(); before=self.collect(); self.db.execute('update calls set tools_json=?',(json.dumps([{'type':'warm_transfer_bridged'}]),)); after=self.collect()
        self.assertEqual(self.total(before,'freedom','transfer_bridged'),0); self.assertEqual(self.total(after,'freedom','transfer_bridged'),1)
    def test_target_restricted(self):
        with self.assertRaises(ValueError): c.send({},'https://example.com','synthetic-secret')
if __name__=='__main__': unittest.main()
