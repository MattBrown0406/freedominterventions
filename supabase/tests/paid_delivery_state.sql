begin;
insert into public.bookings(id,booking_date,booking_time,notes,client_notes,contract_metadata)
values('00000000-0000-0000-0000-000000000001','2099-01-01','10:00','notes','client notes','{"contract_id":"contract-1"}');
do $$
declare first_claim jsonb; second_claim jsonb; n integer;
begin
 if has_table_privilege('anon','public.booking_deliveries','select') then raise exception 'anon table access'; end if;
 if has_function_privilege('authenticated','public.claim_booking_delivery(uuid,text,uuid)','execute') then raise exception 'user claim access'; end if;
 first_claim := public.claim_booking_delivery('00000000-0000-0000-0000-000000000001','slot','00000000-0000-0000-0000-000000000002');
 if first_claim is null then raise exception 'claim failed'; end if;
 second_claim := public.claim_booking_delivery('00000000-0000-0000-0000-000000000001','slot','00000000-0000-0000-0000-000000000003');
 if second_claim is not null then raise exception 'duplicate claim'; end if;
 update public.booking_deliveries set lease_until=now()-interval '1 minute';
 second_claim := public.claim_booking_delivery('00000000-0000-0000-0000-000000000001','slot','00000000-0000-0000-0000-000000000003');
 if second_claim is null then raise exception 'expired lease not reclaimed'; end if;
 update public.booking_deliveries set client_sent=true where lease_token='00000000-0000-0000-0000-000000000002';
 get diagnostics n = row_count;
 if n <> 0 then raise exception 'old lease not fenced'; end if;
 update public.bookings set booking_time='11:00';
 update public.bookings set booking_time='10:00';
 update public.bookings set notes=notes;
 if (select confirmation_revision from public.bookings limit 1) <> 2 then raise exception 'revision incorrect'; end if;
 if (select client_notes from public.bookings limit 1) <> 'client notes' then raise exception 'notes changed'; end if;
 begin
  insert into public.bookings(id,contract_metadata) values('00000000-0000-0000-0000-000000000004','{"contract_id":"contract-1"}');
  raise exception 'duplicate contract accepted';
 exception when unique_violation then null;
 end;
end;
$$;
set local role service_role;
select public.claim_booking_delivery('00000000-0000-0000-0000-000000000001','second-slot','00000000-0000-0000-0000-000000000005') is not null as service_role_claim;
rollback;
