-- Disposable local fixture ONLY, never run against an application database.
create table public.bookings (
 id uuid primary key, booking_date date, booking_time time,
 notes text, client_notes text, contract_metadata jsonb default '{}'::jsonb
);
grant all on public.bookings to service_role;
