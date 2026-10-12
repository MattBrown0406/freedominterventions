#!/usr/bin/env python3
"""Disposable PostgreSQL 17 delta gate; not a full Supabase migration-history replay.
No shared databases, ports, production records or credentials are used.
"""
from pathlib import Path
import subprocess
import time
import uuid

ROOT = Path(__file__).resolve().parents[1]
name = f"fi-client-notes-{uuid.uuid4().hex[:10]}"
image = "public.ecr.aws/supabase/postgres:17.6.1.165"

def run(args, **kwargs):
    return subprocess.run(args, check=True, text=True, capture_output=True, **kwargs)

def sql(text):
    return run(["docker", "exec", "-i", name, "psql", "-U", "postgres", "-v", "ON_ERROR_STOP=1", "-d", "notes_test"], input=text).stdout

try:
    run(["docker", "run", "-d", "--name", name, "--network", "none", "-e", "POSTGRES_HOST_AUTH_METHOD=trust", image])
    for attempt in range(90):
        ready = subprocess.run(["docker", "exec", name, "pg_isready", "-h", "127.0.0.1", "-U", "postgres"], capture_output=True)
        if ready.returncode == 0:
            break
        time.sleep(1)
    else:
        raise RuntimeError("Disposable Postgres did not become TCP-ready")
    run(["docker", "exec", name, "createdb", "-U", "postgres", "notes_test"])
    sql("""
      CREATE TABLE public.bookings (id int primary key, notes text, booking_date date, status text);
      CREATE TABLE public.contracts (id int primary key, status text);
      ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
      CREATE POLICY fixture_admin_bookings ON public.bookings TO authenticated USING (false);
      CREATE POLICY fixture_admin_contracts ON public.contracts TO authenticated USING (false);
      INSERT INTO public.bookings VALUES (1, 'Zoom meeting pending (claimed fixture)', '2099-10-14', 'confirmed');
      INSERT INTO public.contracts VALUES (1, 'signed-awaiting-payment');
      CREATE TABLE policies_before AS SELECT * FROM pg_policies WHERE schemaname='public';
    """)
    migrations = list((ROOT / "supabase/migrations").glob("*_add_private_client_booking_notes.sql"))
    assert len(migrations) == 1
    sql(migrations[0].read_text())
    output = sql("""
      DO $$
      DECLARE n text := E'Original Ω 👪\\n<script>& quotes\\r\\n  second line';
      BEGIN
        ASSERT (SELECT client_notes IS NULL AND notes='Zoom meeting pending (claimed fixture)' FROM public.bookings WHERE id=1), 'legacy booking changed';
        ASSERT (SELECT client_notes IS NULL FROM public.contracts WHERE id=1), 'legacy contract changed';
        UPDATE public.bookings SET client_notes=n WHERE id=1;
        UPDATE public.bookings SET notes='Zoom Meeting ID: 123, Join URL: fixture', booking_date='2099-10-15' WHERE id=1;
        ASSERT (SELECT client_notes=n FROM public.bookings WHERE id=1), 'operational update clobbered notes';
        UPDATE public.contracts SET client_notes=n, status='paid' WHERE id=1;
        INSERT INTO public.bookings (id, client_notes) SELECT 2, client_notes FROM public.contracts WHERE id=1;
        ASSERT (SELECT client_notes=n FROM public.bookings WHERE id=2), 'contract transfer lost notes';
        UPDATE public.bookings SET client_notes=repeat('x',5000) WHERE id=2;
        UPDATE public.contracts SET client_notes=repeat('x',5000) WHERE id=1;
        BEGIN
          UPDATE public.bookings SET client_notes=repeat('x',5001) WHERE id=2;
          RAISE EXCEPTION 'Oversized booking accepted';
        EXCEPTION WHEN check_violation THEN NULL; END;
        BEGIN
          UPDATE public.contracts SET client_notes=repeat('x',5001) WHERE id=1;
          RAISE EXCEPTION 'Oversized contract accepted';
        EXCEPTION WHEN check_violation THEN NULL; END;
        ASSERT NOT EXISTS ((SELECT * FROM policies_before EXCEPT SELECT * FROM pg_policies WHERE schemaname='public') UNION ALL (SELECT * FROM pg_policies WHERE schemaname='public' EXCEPT SELECT * FROM policies_before)), 'policies changed';
        ASSERT (SELECT bool_and(relrowsecurity) FROM pg_class WHERE oid IN ('public.bookings'::regclass, 'public.contracts'::regclass)), 'RLS disabled';
      END $$;
      SELECT 'PASS: legacy data, Unicode/multiline, operational updates, paid transfer, 5000/5001 limits, unchanged RLS/policies' AS result;
    """)
    print(output)
finally:
    subprocess.run(["docker", "rm", "-f", "-v", name], check=True, capture_output=True)
    remaining = run(["docker", "ps", "-a", "--filter", f"name=^{name}$", "--format", "{{.Names}}"])
    assert not remaining.stdout.strip(), "Test container was not removed"
    print("Disposable delta database removed; no shared stack changed.")
