-- Additive only: do not infer historical email delivery or resend old bookings.
alter table public.bookings add column confirmation_revision integer not null default 0;
create function public.advance_booking_confirmation_revision() returns trigger
language plpgsql set search_path = public as $$
begin
  if (new.booking_date, new.booking_time, new.booking_type, new.duration_minutes, new.customer_email, new.customer_name)
    is distinct from (old.booking_date, old.booking_time, old.booking_type, old.duration_minutes, old.customer_email, old.customer_name) then
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

-- Claims and all UPDATE/DELETE writers serialize on the booking row. The deadline
-- is diagnostic ONLY: elapsed time cannot prove that a paused worker/provider IO
-- has stopped. Never steal an expired claim. A crashed worker needs reconciliation.
create function public.claim_booking_delivery(p_booking_id uuid, p_occurrence text, p_token uuid, p_revision integer)
returns jsonb language plpgsql security invoker set search_path = public as $$
declare result jsonb; current_revision integer;
begin
  select confirmation_revision into current_revision from public.bookings
    where id = p_booking_id and status = 'confirmed' for update;
  if not found or p_revision is distinct from current_revision or p_token is null then return null; end if;
  -- Materialize the lock as a row version too: stale REPEATABLE READ writers must
  -- serialize/fail, not inspect a snapshot from before this dispatch claim.
  update public.bookings set confirmation_revision = confirmation_revision where id = p_booking_id;
  if exists (select 1 from public.booking_deliveries
    where booking_id = p_booking_id and lease_until is not null) then return null; end if;
  insert into public.booking_deliveries(booking_id, occurrence) values(p_booking_id, p_occurrence)
  on conflict do nothing;
  update public.booking_deliveries d set lease_token = p_token, lease_until = now() + interval '10 minutes'
  where booking_id = p_booking_id and occurrence = p_occurrence and lease_until is null
  returning to_jsonb(d) into result;
  return result;
end;
$$;
revoke all on function public.claim_booking_delivery(uuid, text, uuid, integer) from public, anon, authenticated;
grant execute on function public.claim_booking_delivery(uuid, text, uuid, integer) to service_role;

-- Trigger runs even for direct service-role/SQL writers. SECURITY DEFINER is
-- necessary because public booking writers cannot read the private delivery table.
-- No public RPC exposes it. UPDATE already holds the same row lock as claim.
create function public.guard_booking_dispatch() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'UPDATE' then
    if (new.booking_date, new.booking_time, new.status, new.booking_type,
        new.duration_minutes, new.customer_email, new.customer_name)
      is not distinct from
       (old.booking_date, old.booking_time, old.status, old.booking_type,
        old.duration_minutes, old.customer_email, old.customer_name) then return new; end if;
  end if;
  if exists (select 1 from public.booking_deliveries where booking_id = old.id and (
    lease_until is not null
    or (creation_started and join_url is null)
    or (client_attempt_at is not null and not client_sent)
    or (owner_attempt_at is not null and not owner_sent)
  )) then
    raise exception using errcode = '55000', message = 'BOOKING_DISPATCH_BUSY';
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;
revoke all on function public.guard_booking_dispatch() from public, anon, authenticated;
create trigger booking_dispatch_guard before update or delete on public.bookings
for each row execute function public.guard_booking_dispatch();
