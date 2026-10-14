// One authoritative validator for browser returns and signed webhook replays.
// Order state alone is not payment truth: payment-link orders can remain OPEN.
export async function verifySquareOrderPaid(orderId: string, expectedAmountCents: number, paymentHint?: string) {
  const token = Deno.env.get('SQUARE_ACCESS_TOKEN');
  const location = Deno.env.get('SQUARE_LOCATION_ID');
  if (!token || !location) throw new Error('Square payment verification is not configured');
  const get = async (path: string) => {
    const response = await fetch(`https://connect.squareup.com/v2/${path}`, {
      headers: { Authorization: `Bearer ${token}`, 'Square-Version': '2024-01-18' },
      signal: AbortSignal.timeout(15000),
    });
    const data = await response.json();
    if (!response.ok || data.errors) throw new Error('Square verification temporarily unavailable');
    return data;
  };
  const { order } = await get(`orders/${encodeURIComponent(orderId)}`);
  const unpaid = { paid: false, order, paymentId: null as string | null };
  if (!Number.isSafeInteger(expectedAmountCents) || expectedAmountCents <= 0 ||
      order?.id !== orderId || order.location_id !== location ||
      order.total_money?.amount !== expectedAmountCents || order.total_money?.currency !== 'USD' ||
      !['OPEN', 'COMPLETED'].includes(order.state)) return unpaid;
  const ids: string[] = paymentHint ? [paymentHint] :
    [...new Set<string>((order.tenders ?? []).map((t: any) => t.payment_id ?? t.id).filter(Boolean))];
  for (const id of ids) {
    const { payment: p } = await get(`payments/${encodeURIComponent(id)}`);
    if (p?.id === id && p.order_id === orderId && p.location_id === location &&
        p.status === 'COMPLETED' && p.amount_money?.amount === expectedAmountCents &&
        p.amount_money?.currency === 'USD' && !(p.refunded_money?.amount > 0)) {
      return { paid: true, order, paymentId: p.id as string };
    }
  }
  return unpaid;
}
