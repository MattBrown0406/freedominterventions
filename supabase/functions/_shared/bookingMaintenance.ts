// No request field, header, cache, or client credential can bypass this gate.
export const BOOKING_GATE_BUILD = "booking-gate-legacy-v1";
export const maintenanceHeaders = {
  "X-Booking-Gate-Build": BOOKING_GATE_BUILD,
  "Cache-Control": "no-store",
};

type ControlClient = {
  from(table: string): any;
};

// Only an explicit false from the singleton row permits work. Missing schema/row,
// malformed data, permission errors, timeouts and thrown errors all fail closed.
// Admission only: requests already past this read are NOT cancelled by a toggle.
export async function bookingMaintenanceGate(
  client: () => ControlClient,
  corsHeaders: Record<string, string>,
): Promise<Response | null> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => {
        controller.abort();
        reject(new Error("maintenance read timeout"));
      }, 3000);
    });
    const result = await Promise.race([
      client().from("booking_maintenance_control")
        .select("enabled").eq("id", true).abortSignal(controller.signal).single(),
      timeout,
    ]);
    if (!result.error && result.data?.enabled === false) return null;
  } catch {
    // Do not disclose database errors or credentials in public responses/logs.
  } finally {
    clearTimeout(timer);
  }
  return new Response(JSON.stringify({
    error: "Booking temporarily unavailable. Please try again later.",
    code: "BOOKING_MAINTENANCE",
  }), {
    status: 503,
    headers: { ...corsHeaders, ...maintenanceHeaders,
      "Content-Type": "application/json", "Retry-After": "60" },
  });
}
