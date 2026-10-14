// Durable, service-only per-occurrence delivery state. Never use notes as a lock.
export async function claimDelivery(db: any, bookingId: string, occurrence: string) {
  const token = crypto.randomUUID();
  const { data, error } = await db.rpc('claim_booking_delivery', {
    p_booking_id: bookingId, p_occurrence: occurrence, p_token: token,
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
