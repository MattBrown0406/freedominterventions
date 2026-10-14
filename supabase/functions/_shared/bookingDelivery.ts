// Durable per-occurrence state with BOOKING-WIDE dispatch ownership in the RPC.
// lease_until is diagnostic, NOT takeover permission. Only the settled owner
// releases it; a dead/paused worker must be stopped and reconciled by an operator.
// Never infer that a remote request stopped merely because its deadline elapsed.
export async function claimDelivery(db: any, bookingId: string, occurrence: string, revision: number) {
  const token = crypto.randomUUID();
  const { data, error } = await db.rpc('claim_booking_delivery', {
    p_booking_id: bookingId, p_occurrence: occurrence, p_token: token, p_revision: revision,
  });
  if (error) throw error;
  if (!data) throw new Error('Booking delivery is already in progress; retry later');
  return { ...data, lease_token: token };
}

export async function saveDelivery(db: any, state: any, changes: Record<string, unknown>) {
  const { data, error } = await db.from('booking_deliveries').update(changes)
    .eq('booking_id', state.booking_id).eq('occurrence', state.occurrence)
    .eq('lease_token', state.lease_token).select('booking_id');
  if (error) throw error;
  if (!data?.length) throw new Error('Booking delivery lease lost');
  Object.assign(state, changes);
}
