import json
import os
import tempfile
import time
import unittest
from unittest.mock import patch, AsyncMock

os.environ.update(DATA_DIR=tempfile.mkdtemp(), FOLLOWUP_SECRET='test-secret-'*4, TELEGRAM_BOT_TOKEN='test-token', TELEGRAM_CHAT_ID='123')
import app as relay
from fastapi.testclient import TestClient


class RelayTests(unittest.TestCase):
    def setUp(self):
        relay.DATA = __import__('pathlib').Path(tempfile.mkdtemp())
        self.client = TestClient(relay.app)
        self.headers = {'Origin': 'https://soberhelpline.com'}

    def payload(self, **overrides):
        issued = time.time()
        with patch('app.time.time', return_value=issued-3):
            token = self.client.post('/v1/challenge', headers=self.headers).json()['token']
        body = dict(token=token, name='Test Visitor', method='email', contact='test@example.com', note='', consent=True, shareGuide=False, company='')
        body.update(overrides)
        return body

    def send(self, body):
        return self.client.post('/v1/follow-up', headers=self.headers, json=body)

    def test_origin_and_body_bounds(self):
        self.assertEqual(self.client.post('/v1/challenge').status_code, 403)
        self.assertEqual(self.client.post('/v1/challenge', headers={'Origin':'https://evil.example'}).status_code,403)
        self.assertEqual(self.client.post('/v1/follow-up', headers=self.headers, content='x'*8193).status_code,413)
        r = self.client.options('/v1/follow-up',headers=self.headers)
        self.assertEqual(r.headers['access-control-allow-origin'], self.headers['Origin'])
        self.assertEqual(r.headers['cache-control'],'no-store')

    def test_consent_and_strict_sharing(self):
        with patch('app.deliver', new_callable=AsyncMock) as mock:
            for overrides in [{'consent':False},{'consent':'true'},{'shareGuide':'false'},{'guide':'secret'},{'shareGuide':True},{'name':''},{'method':'email','contact':'bad'},{'method':'phone','contact':'123'},{'company':'bot'},{'unexpected':'field'}]:
                self.assertEqual(self.send(self.payload(**overrides)).status_code,400,overrides)
            mock.assert_not_called()

    def test_success_dedup_and_no_contact_storage(self):
        body=self.payload()
        with patch('app.deliver', new_callable=AsyncMock, return_value=42) as mock:
            r=self.send(body)
            self.assertEqual(r.status_code,200)
            self.assertTrue(r.json()['accepted'])
            self.assertEqual(self.send(body).status_code,200)
            self.assertEqual(mock.await_count,1)
            self.assertNotIn('Understanding options',mock.call_args.args[0])
            self.assertIn('NOT SHARED',mock.call_args.args[0])
            self.assertEqual(self.send(dict(body,name='Changed')).status_code,409)
        data=(relay.DATA/'relay.sqlite3').read_bytes()
        for value in [body['name'],body['contact']]:self.assertNotIn(value.encode(),data)

    def test_explicit_guide_sharing(self):
        body=self.payload(shareGuide=True,guide='Preparing a family conversation / Setting a boundary')
        with patch('app.deliver',new_callable=AsyncMock,return_value=42) as mock:
            self.assertEqual(self.send(body).status_code,200)
            self.assertIn(body['guide'],mock.call_args.args[0])
            self.assertNotIn(body['guide'].encode(),(relay.DATA/'relay.sqlite3').read_bytes())

    def test_delivery_unknown_never_claims_success_or_resends(self):
        body=self.payload()
        with patch('app.deliver',new_callable=AsyncMock,side_effect=TimeoutError) as mock:
            self.assertEqual(self.send(body).status_code,502)
            self.assertEqual(self.send(body).status_code,409)
            self.assertEqual(mock.await_count,1)

    def test_explicit_failure_can_retry(self):
        body=self.payload()
        with patch('app.deliver',new_callable=AsyncMock,side_effect=[None,42]):
            self.assertEqual(self.send(body).status_code,502)
            self.assertEqual(self.send(body).status_code,200)

    def test_rate_limit_and_spoofed_origin(self):
        with patch('app.deliver',new_callable=AsyncMock,return_value=42) as mock:
            for _ in range(5):self.assertEqual(self.send(self.payload()).status_code,200)
            self.assertEqual(self.send(self.payload()).status_code,429)
            self.assertEqual(mock.await_count,5)
        self.headers={'Origin':'https://nomoreenabling.com'}
        self.assertEqual(self.send(self.payload()).status_code,429)

    def test_timing_signature_and_cross_origin(self):
        with patch('app.deliver',new_callable=AsyncMock) as mock:
            b=self.payload(); b['token']+='tamper'; self.assertEqual(self.send(b).status_code,400)
            b=self.payload();self.headers={'Origin':'https://freedominterventions.com'};self.assertEqual(self.send(b).status_code,400)
            token=self.client.post('/v1/challenge',headers=self.headers).json()['token'];b=self.payload(token=token);self.assertEqual(self.send(b).status_code,400)
            b=self.payload()
            with patch('app.time.time',return_value=time.time()+1000):self.assertEqual(self.send(b).status_code,400)
            mock.assert_not_called()

    def test_telegram_response_requires_exact_delivery(self):
        async def check(payload):
            class Fake:
                async def __aenter__(self): return self
                async def __aexit__(self,*args): pass
                async def post(self,*args,**kwargs):
                    self.sent=kwargs['json']
                    return type('R',(),{'json':lambda s:payload})()
            with patch('app.httpx.AsyncClient',return_value=Fake()):
                return await relay.deliver('hello')
        import asyncio
        self.assertEqual(asyncio.run(check({'ok':True,'result':{'chat':{'id':123},'message_id':9,'text':'hello'}})),9)
        with self.assertRaises(RuntimeError):asyncio.run(check({'ok':True,'result':{'chat':{'id':999},'message_id':9,'text':'hello'}}))
        self.assertIsNone(asyncio.run(check({'ok':False})))

if __name__=='__main__':unittest.main()
