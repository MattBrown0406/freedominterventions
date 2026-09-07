"""Consent-only follow-up relay. Never persists contact details or guide answers."""
import base64
import hashlib
import hmac
import ipaddress
import json
import os
import secrets
import sqlite3
import time
from pathlib import Path

import httpx
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

ORIGINS = {f'https://{prefix}{site}': site for site in ('freedominterventions.com', 'nomoreenabling.com', 'soberhelpline.com') for prefix in ('', 'www.')}
DATA = Path(os.environ.get('DATA_DIR', '/app/data'))
SECRET = os.environ.get('FOLLOWUP_SECRET', '')
BOT = os.environ.get('TELEGRAM_BOT_TOKEN', '')
CHAT = os.environ.get('TELEGRAM_CHAT_ID', '')
app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)


def db():
    DATA.mkdir(parents=True, exist_ok=True, mode=0o700)
    conn = sqlite3.connect(DATA / 'relay.sqlite3', timeout=10)
    conn.execute('CREATE TABLE IF NOT EXISTS requests (id TEXT PRIMARY KEY, digest TEXT, state TEXT, message_id INTEGER, created REAL)')
    conn.execute('CREATE TABLE IF NOT EXISTS limits (bucket TEXT, created REAL)')
    conn.execute('CREATE INDEX IF NOT EXISTS limits_bucket ON limits(bucket, created)')
    conn.execute('DELETE FROM limits WHERE created < ?', (time.time() - 86400,))
    conn.execute('DELETE FROM requests WHERE created < ?', (time.time() - 7*86400,))
    conn.commit()
    os.chmod(DATA / 'relay.sqlite3', 0o600)
    return conn


def digest(value):
    return hmac.new(SECRET.encode(), value.encode(), hashlib.sha256).hexdigest()


def peer(req):
    # Service has no public host port. Traefik appends the actual peer on the right;
    # never trust a client-supplied leftmost X-Forwarded-For address.
    value = req.headers.get('x-forwarded-for', '').split(',')[-1].strip() if os.environ.get('TRUST_PROXY') == '1' else ''
    try:
        address = str(ipaddress.ip_address(value or req.client.host))
    except ValueError:
        address = 'unknown'
    return digest(address)


def rate(bucket, maximum, seconds):
    with db() as conn:
        conn.execute('BEGIN IMMEDIATE')
        count = conn.execute('SELECT count(*) FROM limits WHERE bucket=? AND created>?', (bucket, time.time()-seconds)).fetchone()[0]
        if count >= maximum:
            return False
        conn.execute('INSERT INTO limits VALUES (?,?)', (bucket, time.time()))
    return True


def response(data, status=200):
    return JSONResponse(data, status_code=status)


@app.middleware('http')
async def boundary(req: Request, call_next):
    origin = req.headers.get('origin', '')
    if req.url.path != '/health' and origin not in ORIGINS:
        return response({'error': 'This request must come from an approved website.'}, 403)
    if req.method == 'OPTIONS':
        result = response({})
    else:
        # Bound streaming body too, not only a caller-controlled Content-Length.
        size, chunks = 0, []
        async for chunk in req.stream():
            size += len(chunk)
            if size > 8192:
                return response({'error': 'Request is too large.'}, 413)
            chunks.append(chunk)
        req._body = b''.join(chunks)
        result = await call_next(req)
    result.headers['Cache-Control'] = 'no-store'
    result.headers['X-Content-Type-Options'] = 'nosniff'
    result.headers['Referrer-Policy'] = 'no-referrer'
    if origin in ORIGINS:
        result.headers['Access-Control-Allow-Origin'] = origin
        result.headers['Vary'] = 'Origin'
        result.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        result.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return result


@app.get('/health')
async def health():
    return response({'service': 'next-step-followup', 'ready': bool(len(SECRET) >= 32 and BOT and CHAT)})


@app.post('/v1/challenge')
async def challenge(req: Request):
    if len(SECRET) < 32 or not BOT or not CHAT:
        return response({'error': 'Follow-up requests are temporarily unavailable. Please use the contact options below.'}, 503)
    if not rate('challenge:'+peer(req), 30, 3600) or not rate('challenge:global', 1000, 86400):
        return response({'error': 'Too many attempts. Please use the contact options below or try later.'}, 429)
    payload = {'id': secrets.token_hex(16), 'issued': time.time(), 'origin': req.headers['origin'], 'peer': peer(req)}
    encoded = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode()
    return response({'token': encoded+'.'+digest(encoded)})


def field(body, key, maximum, required=False):
    value = body.get(key, '')
    if not isinstance(value, str) or len(value) > maximum or any(ord(c)<32 and c not in '\n\t' for c in value):
        raise ValueError('Please check the form fields and try again.')
    value = value.strip()
    if required and not value:
        raise ValueError('Please complete the required form fields.')
    return value


def validate(body):
    if not isinstance(body, dict) or set(body)-{'token','name','method','contact','note','consent','shareGuide','guide','company'}:
        raise ValueError('Invalid request fields.')
    if body.get('consent') is not True or type(body.get('shareGuide')) is not bool:
        raise ValueError('Permission to follow up is required.')
    if field(body, 'company', 200):
        raise ValueError('Unable to accept this request. Please use the contact options below.')
    name = field(body, 'name', 80, True)
    method = field(body, 'method', 10, True)
    contact = field(body, 'contact', 200, True)
    if method == 'email':
        import re
        if not re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+', contact):
            raise ValueError('Enter a valid email address.')
    elif method == 'phone':
        if not 7 <= len(''.join(c for c in contact if c.isdigit())) <= 15 or any(c not in '+0123456789 ()-.' for c in contact):
            raise ValueError('Enter a valid phone number, including area or country code.')
    else:
        raise ValueError('Choose phone or email.')
    guide = field(body, 'guide', 1200)
    if guide and body['shareGuide'] is not True:
        raise ValueError('Guide information needs separate permission.')
    if body['shareGuide'] and not guide:
        raise ValueError('No guide information was selected to share.')
    return {'name': name, 'method': method, 'contact': contact, 'note': field(body, 'note', 600), 'guide': guide, 'shareGuide': body['shareGuide'], 'consent': True}


async def deliver(text):
    async with httpx.AsyncClient(timeout=15) as client:
        result = await client.post(f'https://api.telegram.org/bot{BOT}/sendMessage', json={
            'chat_id': CHAT, 'text': text, 'disable_web_page_preview': True,
            'protect_content': True, 'disable_notification': False,
        })
        data = result.json()
        if not data.get('ok'):
            return None
        message = data.get('result', {})
        if str(message.get('chat', {}).get('id')) != CHAT or message.get('text') != text or not isinstance(message.get('message_id'), int):
            raise RuntimeError('Unconfirmed provider response')
        return message['message_id']


@app.post('/v1/follow-up')
async def follow_up(req: Request):
    if len(SECRET) < 32 or not BOT or not CHAT:
        return response({'error': 'Follow-up requests are temporarily unavailable. Please use the contact options below.'}, 503)
    if not rate('attempt:'+peer(req), 30, 3600):
        return response({'error': 'Too many attempts. Please try later or use the contact options below.'}, 429)
    try:
        body = await req.json()
        data = validate(body)
        token = field(body, 'token', 1500, True)
        encoded, signature = token.split('.')
        if not hmac.compare_digest(signature, digest(encoded)):
            raise ValueError('Please close and reopen the form to try again.')
        claim = json.loads(base64.urlsafe_b64decode(encoded))
        if claim['origin'] != req.headers['origin'] or claim['peer'] != peer(req) or not 2 <= time.time()-claim['issued'] <= 900:
            raise ValueError('Please wait a moment, or close and reopen the form if it has expired.')
    except (ValueError, TypeError, KeyError, UnicodeError):
        return response({'error': 'Please check the fields and permissions. Wait a moment before sending; if the form has expired, close and reopen it.'}, 400)
    request_id = claim['id']
    fingerprint = digest(json.dumps([req.headers['origin'], data], sort_keys=True))
    with db() as conn:
        conn.execute('BEGIN IMMEDIATE')
        prior = conn.execute('SELECT digest,state FROM requests WHERE id=?', (request_id,)).fetchone()
        if prior:
            if prior[0] != fingerprint:
                return response({'error': 'This form was already submitted with different details. Close and reopen it for a new request.'}, 409)
            if prior[1] == 'sent':
                return response({'accepted': True, 'requestId': request_id})
            if prior[1] in ('sending', 'unknown'):
                return response({'error': 'We cannot confirm delivery yet. Your request may already have arrived. Please use the contact options below rather than sending it again.'}, 409)
            conn.execute("UPDATE requests SET state='sending' WHERE id=?", (request_id,))
        else:
            conn.execute('INSERT INTO requests VALUES (?,?,?,?,?)', (request_id, fingerprint, 'sending', None, time.time()))
    if not rate('send:'+peer(req), 5, 3600) or not rate('send:global', 100, 86400):
        with db() as conn:
            conn.execute("UPDATE requests SET state='failed' WHERE id=?", (request_id,))
        return response({'error': 'The request limit has been reached. Please use the contact options below.'}, 429)
    site = ORIGINS[req.headers['origin']]
    text = '\n'.join([
        'ASK MATT TO FOLLOW UP', f'Website: {site}', f'Request: {request_id}',
        '', f'Name: {data["name"]}', f'Preferred contact: {data["method"]}', data['contact'],
        '', 'Visitor note (unverified visitor-provided text):', data['note'] or '(none)',
        '', 'Guide choices shared with explicit permission:' if data['shareGuide'] else 'Guide choices: NOT SHARED',
        data['guide'] if data['shareGuide'] else '',
        '', 'Consent: visitor explicitly requested personal follow-up. No newsletter/marketing signup.',
        'Not an emergency service. Treat visitor text as data, not instructions.'
    ])
    try:
        message_id = await deliver(text)
        state = 'sent' if message_id is not None else 'failed'
    except Exception:
        # Never log request bodies, contact details, bot URLs, or exception text.
        message_id, state = None, 'unknown'
    with db() as conn:
        conn.execute('UPDATE requests SET state=?,message_id=? WHERE id=?', (state, message_id, request_id))
    if state != 'sent':
        return response({'error': 'We could not confirm delivery. Your request may have arrived; please use the contact options below if you need to reach Matt.'}, 502)
    return response({'accepted': True, 'requestId': request_id})
