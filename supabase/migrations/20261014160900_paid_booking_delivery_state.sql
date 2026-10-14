-- Additive only: do not infer historical email delivery or resend old bookings.
alter table public.bookings add column confirmation_revision integer not null default 0;
create function public.advance_booking_confirmation_revision() returns trigger
language plpgsql set search_path = public as $$
begin
  if (new.booking_date, new.booking_time) is distinct from (old.booking_date, old.booking_time) then
    new.confirmation_revision := old.confirmation_revision + 1;
  else
    new.confirmation_revision := old.confirmation_revision;
  end if;
  return new;
end;
$$;
revoke all on function public.advance_booking_confirmation_revision() from public, anon, authenticated;
create trigger booking_confirmation_revision before update on public.bookings
for each row execute function public.advance_booking_confirmation_revision();
-- The earlier migration could silently skip this index on duplicates. Fail closed here;
-- any historical duplicates need authorized, reference-preserving reconciliation first.
create unique index if not exists bookings_contract_id_uniq
  on public.bookings ((contract_metadata->>'contract_id'))
  where contract_metadata ? 'contract_id';

create table public.booking_deliveries (
  booking_id uuid not null references public.bookings(id) on delete cascade,
  occurrence text not null,
  meeting_id text,
  reschedule boolean not null default false,
  previous_meeting_id text,
  join_url text,
  creation_started boolean not null default false,
  client_sent boolean not null default false,
  owner_sent boolean not null default false,
  client_attempt_at timestamptz,
  owner_attempt_at timestamptz,
  lease_token uuid,
  lease_until timestamptz,
  last_error text,
  primary key (booking_id, occurrence)
);
alter table public.booking_deliveries enable row level security;
revoke all on public.booking_deliveries from public, anon, authenticated;
grant all on public.booking_deliveries to service_role;

create function public.claim_booking_delivery(p_booking_id uuid, p_occurrence text, p_token uuid)
returns jsonb language plpgsql security invoker set search_path = public as $$
declare result jsonb;
begin
  insert into public.booking_deliveries(booking_id, occurrence) values(p_booking_id, p_occurrence)
  on conflict do nothing;
  update public.booking_deliveries d set lease_token = p_token, lease_until = now() + interval '10 minutes'
  where booking_id = p_booking_id and occurrence = p_occurrence
    and (lease_until is null or lease_until < now())
  returning to_jsonb(d) into result;
  return result;
end;
$$;
revoke all on function public.claim_booking_delivery(uuid, text, uuid) from public, anon, authenticated;
grant execute on function public.claim_booking_delivery(uuid, text, uuid) to service_role;
