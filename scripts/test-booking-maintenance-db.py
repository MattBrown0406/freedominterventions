#!/usr/bin/env python3
"""Disposable local PostgreSQL ACL/default/toggle tests; never connects to production."""
from pathlib import Path
import subprocess, time
NAME = 'fi-maintenance-gate-isolated-test'
IMAGE = 'public.ecr.aws/supabase/postgres:17.6.1.165'
def run(*args, **kw):
    return subprocess.run(args, text=True, capture_output=True, **kw)
created = False
try:
    r = run('docker','run','--rm','-d','--name',NAME,'-e','POSTGRES_PASSWORD=local-test-only',IMAGE)
    if r.returncode: raise RuntimeError(r.stderr)
    created = True
    for _ in range(60):
        r=run('docker','exec',NAME,'pg_isready','-U','postgres')
        if r.returncode==0: break
        time.sleep(1)
    def sql(text, ok=True):
        r=run('docker','exec','-i',NAME,'psql','-X','-U','postgres','-d','postgres','-At','-v','ON_ERROR_STOP=1',input=text)
        if ok and r.returncode: raise AssertionError(r.stderr)
        if not ok and r.returncode==0: raise AssertionError('unexpected allowed statement: '+text)
        return r.stdout.strip()
    sql(Path('supabase/migrations/20261014182908_booking_maintenance_control.sql').read_text())
    checks=0
    def check(condition):
        global checks
        assert condition
        checks+=1
    check(sql('SELECT enabled FROM public.booking_maintenance_control')=='f')
    check(sql("SELECT relrowsecurity FROM pg_class WHERE oid='public.booking_maintenance_control'::regclass")=='t')
    check(sql('SET ROLE service_role; SELECT enabled FROM public.booking_maintenance_control').endswith('f'))
    for role in ['anon','authenticated']:
        for statement in ['SELECT * FROM public.booking_maintenance_control','UPDATE public.booking_maintenance_control SET enabled=true',
                          'INSERT INTO public.booking_maintenance_control VALUES (true,true)','DELETE FROM public.booking_maintenance_control']:
            sql(f'SET ROLE {role}; {statement}',ok=False); checks+=1
    for statement in ['UPDATE public.booking_maintenance_control SET enabled=true','DELETE FROM public.booking_maintenance_control',
                      'INSERT INTO public.booking_maintenance_control VALUES (true,true)','TRUNCATE public.booking_maintenance_control']:
        sql(f'SET ROLE service_role; {statement}',ok=False); checks+=1
    sql('UPDATE public.booking_maintenance_control SET enabled=true WHERE id=true')
    check(sql('SET ROLE service_role; SELECT enabled FROM public.booking_maintenance_control').endswith('t'))
    sql('UPDATE public.booking_maintenance_control SET enabled=false WHERE id=true')
    check(sql('SELECT enabled FROM public.booking_maintenance_control')=='f')
    sql('INSERT INTO public.booking_maintenance_control VALUES(false,false)',ok=False);checks+=1
    sql('INSERT INTO public.booking_maintenance_control VALUES(true,false)',ok=False);checks+=1
    print(f'{checks} PostgreSQL maintenance assertions passed (isolated migration delta, not full historical replay)')
finally:
    if created:
        r=run('docker','rm','-f',NAME)
        if r.returncode: raise RuntimeError(r.stderr)
