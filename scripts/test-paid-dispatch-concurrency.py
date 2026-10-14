"""Local-only PostgreSQL delta/concurrency regression; requires psycopg[binary].
PAID_TEST_DSN must point at a disposable PostgreSQL server on loopback.
Creates/drops its own unique database; never loads real booking rows.
--baseline REF demonstrates the old race using that ref's actual migration.
"""
import argparse
import os
from pathlib import Path
import subprocess
import time
import uuid
from concurrent.futures import ThreadPoolExecutor

import psycopg
from psycopg import sql
from psycopg.conninfo import conninfo_to_dict, make_conninfo

ROOT = Path(__file__).resolve().parents[1]
MIGRATION = 'supabase/migrations/20261014160900_paid_booking_delivery_state.sql'
parser = argparse.ArgumentParser()
parser.add_argument('--baseline')
args = parser.parse_args()
params = conninfo_to_dict(os.environ['PAID_TEST_DSN'])
assert params.get('host') in ('127.0.0.1', 'localhost'), 'loopback disposable server required'
name = 'paid_dispatch_test_' + uuid.uuid4().hex
admin = psycopg.connect(**params, autocommit=True)
admin.execute(sql.SQL('create database {}').format(sql.Identifier(name)))
params['dbname'] = name
DSN = make_conninfo(**params)
ID = '00000000-0000-0000-0000-000000000001'
checks = []

def connect():
    return psycopg.connect(DSN, autocommit=True)

def claim(c, rev=0, occurrence='old'):
    values: list[object] = [ID, occurrence, str(uuid.uuid4())]
    if not args.baseline:
        values.append(rev)
    return c.execute('select public.claim_booking_delivery(' + ','.join(['%s']*len(values)) + ')', values).fetchone()[0]

def reset(c):
    c.execute('truncate public.booking_deliveries, public.bookings cascade')
    c.execute("insert into public.bookings(id,booking_date,booking_time,notes,client_notes) values(%s,'2099-01-01','10:00','notes','client notes')", [ID])

def move(c):
    try:
        c.execute("update public.bookings set booking_date='2099-01-02',booking_time='11:00',reminder_sent=false where id=%s", [ID])
        return 'success'
    except psycopg.Error as e:
        return e.sqlstate

def wait_locked(observer, pid):
    until = time.monotonic() + 10
    while time.monotonic() < until:
        row = observer.execute('select wait_event_type from pg_stat_activity where pid=%s', [pid]).fetchone()
        if row and row[0] == 'Lock':
            return
        time.sleep(.01)
    raise AssertionError('concurrent session never observed waiting on a database lock')

def check(label):
    checks.append(label)
    print('PASS:', label, flush=True)

try:
    with connect() as c:
        c.execute((ROOT/'supabase/tests/paid_delivery_fixture.sql').read_text())
        migration = subprocess.check_output(['git','show',f'{args.baseline}:{MIGRATION}'], cwd=ROOT, text=True) if args.baseline else (ROOT/MIGRATION).read_text()
        c.execute(migration)
        if not args.baseline:
            c.execute((ROOT/'supabase/tests/paid_delivery_state.sql').read_text())
            check('SQL privileges, revision, token fencing, atomic rollback and ambiguity assertions')
        reset(c)
    with connect() as a, connect() as b, connect() as observer, ThreadPoolExecutor() as pool:
        # Claim first: writer is genuinely concurrent and must inspect committed claim.
        a.execute('begin')
        assert claim(a) is not None
        future = pool.submit(move, b)
        if not args.baseline:
            wait_locked(observer, b.info.backend_pid)
        else:
            assert future.result(10) == 'success'
        a.execute('commit')
        assert future.result(10) == ('success' if args.baseline else '55000')
        if not args.baseline:
            assert observer.execute('select booking_date::text,confirmation_revision,reminder_sent,notes,client_notes from public.bookings').fetchone() == ('2099-01-01',0,True,'notes','client notes')
        check('BASELINE writer proceeds before claim commit' if args.baseline else 'claim-first observed lock wait: writer rejected with entire update unchanged')

        # An expired timestamp cannot terminate a paused process or remote IO.
        observer.execute("update public.booking_deliveries set lease_until=now()-interval '1 day'")
        if args.baseline:
            assert claim(b, 1, 'new') is not None
            check('BASELINE lets new occurrence dispatch while old worker can resume')
        else:
            assert claim(b, 0, 'new') is None
            assert claim(b, 0, 'old') is None
            assert move(b) == '55000'
            check('expiry never steals ownership or allows reschedule, for either occurrence')

        reset(observer)
        # Writer first: claim must read the new revision after its row-lock wait.
        a.execute('begin')
        assert move(a) == 'success'
        future = pool.submit(claim, b)
        if not args.baseline:
            wait_locked(observer, b.info.backend_pid)
        a.execute('commit')
        result = future.result(10)
        assert (result is not None) if args.baseline else (result is None)
        check('writer-first stale revision ' + ('BASELINE accepted' if args.baseline else 'rejected after observed lock wait'))

        reset(observer)
        b.execute('begin isolation level repeatable read')
        b.execute('select * from public.bookings').fetchall()
        assert claim(a) is not None
        assert move(b) == ('success' if args.baseline else '40001')
        b.execute('rollback')
        check('stale REPEATABLE READ writer ' + ('BASELINE accepted' if args.baseline else 'serialization failure'))

        if not args.baseline:
            # Public-role direct writes also run the private-table guard.
            observer.execute('grant select, update, delete on public.bookings to authenticated')
            b.execute('set role authenticated')
            assert move(b) == '55000'
            b.execute('reset role')
            check('authenticated direct writer cannot bypass private delivery guard')
            # Orderly failure releases ownership, not ambiguity. Only recipient
            # reconciliation or a safe same-revision retry can clear uncertainty.
            for field in ('client_attempt_at', 'owner_attempt_at', 'creation_started'):
                reset(observer)
                assert claim(a) is not None
                value = 'true' if field == 'creation_started' else 'now()'
                observer.execute(f'update public.booking_deliveries set lease_until=null,{field}={value}')
                assert move(b) == '55000'
                assert claim(a) is not None
                check(field + ' ambiguity blocks DB writer but permits same-revision recovery')
            reset(observer)
            assert claim(a) is not None
            observer.execute('update public.booking_deliveries set lease_until=null')
            assert move(b) == 'success'
            assert claim(a,0) is None
            assert claim(a,1,'new') is not None
            check('settled/released dispatch permits reschedule and only new revision can claim')
    print(f'{len(checks)} PostgreSQL gates passed; baseline={args.baseline or "none"}')
finally:
    admin.execute(sql.SQL('drop database {} with (force)').format(sql.Identifier(name)))
    assert not admin.execute('select 1 from pg_database where datname=%s',[name]).fetchone()
    admin.close()
