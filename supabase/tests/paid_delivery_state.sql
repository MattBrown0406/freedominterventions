begin;
insert into public.bookings(id,booking_date,booking_time,notes,client_notes,contract_metadata)
values('00000000-0000-0000-0000-000000000001','2099-01-01','10:00','notes','client notes','{"contract_id":"contract-1"}');
do $$
declare first_claim jsonb; second_claim jsonb; n integer;
begin
 if has_table_privilege('anon','public.booking_deliveries','select') then raise exception 'anon table access'; end if;
 if has_function_privilege('authenticated','public.claim_booking_delivery(uuid,text,uuid,integer)','execute') then raise exception 'user claim access'; end if;
 if has_function_privilege('anon','public.guard_booking_dispatch()','execute') then raise exception 'public guard access'; end if;
 first_claim := public.claim_booking_delivery('00000000-0000-0000-0000-000000000001','slot','00000000-0000-0000-0000-000000000002',0);
 if first_claim is null then raise exception 'claim failed'; end if;
 second_claim := public.claim_booking_delivery('00000000-0000-0000-0000-000000000001','other-slot','00000000-0000-0000-0000-000000000003',0);
 if second_claim is not null then raise exception 'cross-occurrence claim'; end if;
 update public.booking_deliveries set lease_until=now()-interval '1 minute';
 second_claim := public.claim_booking_delivery('00000000-0000-0000-0000-000000000001','slot','00000000-0000-0000-0000-000000000003',0);
 if second_claim is not null then raise exception 'expired claim was stolen'; end if;
 begin
  update public.bookings set booking_time='11:00', reminder_sent=false;
  raise exception 'active dispatch allowed reschedule';
 exception when sqlstate '55000' then null;
 end;
 if not (select reminder_sent from public.bookings limit 1) then raise exception 'partial reschedule'; end if;
 begin
  delete from public.bookings;
  raise exception 'active dispatch allowed delete';
 exception when sqlstate '55000' then null;
 end;
 -- An orderly worker exit can release ownership, but ambiguous IO still blocks changes.
 update public.booking_deliveries set lease_until=null, client_attempt_at=now();
 begin
  update public.bookings set booking_time='11:00';
  raise exception 'ambiguous email allowed reschedule';
 exception when sqlstate '55000' then null;
 end;
 second_claim := public.claim_booking_delivery('00000000-0000-0000-0000-000000000001','slot','00000000-0000-0000-0000-000000000003',0);
 if second_claim is null then raise exception 'same revision retry blocked'; end if;
 update public.booking_deliveries set client_sent=true where lease_token='00000000-0000-0000-0000-000000000002';
 get diagnostics n = row_count;
 if n <> 0 then raise exception 'old token not fenced'; end if;
 update public.booking_deliveries set client_sent=true, lease_until=null;
 update public.bookings set booking_time='11:00';
 update public.bookings set booking_time='10:00';
 update public.bookings set notes=notes;
 if (select confirmation_revision from public.bookings limit 1) <> 2 then raise exception 'revision incorrect'; end if;
 if (select client_notes from public.bookings limit 1) <> 'client notes' then raise exception 'notes changed'; end if;
 if public.claim_booking_delivery('00000000-0000-0000-0000-000000000001','stale','00000000-0000-0000-0000-000000000004',0) is not null then raise exception 'stale revision claimed'; end if;
 begin
  insert into public.bookings(id,contract_metadata) values('00000000-0000-0000-0000-000000000004','{"contract_id":"contract-1"}');
  raise exception 'duplicate contract accepted';
 exception when unique_violation then null;
 end;
end;
$$;
set local role service_role;
do $$ begin
 if public.claim_booking_delivery('00000000-0000-0000-0000-000000000001','second-slot','00000000-0000-0000-0000-000000000005',2) is null then raise exception 'service role claim denied'; end if;
end $$;
rollback;
