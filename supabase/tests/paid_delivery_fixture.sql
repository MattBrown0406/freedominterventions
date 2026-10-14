-- Disposable local fixture ONLY, never run against an application database.
create table public.bookings (
 id uuid primary key, booking_date date, booking_time time,
 notes text, client_notes text, contract_metadata jsonb default '{}'::jsonb,
 status text default 'confirmed', booking_type text default 'crisis-coaching',
 duration_minutes integer default 60, customer_email text, customer_name text,
 reminder_sent boolean default true
);
grant all on public.bookings to service_role;
