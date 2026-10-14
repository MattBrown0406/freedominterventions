# Project rules

- Booking/payment edge functions (send-booking-confirmation, square-booking, contracts, square-webhook) must pass `_shared/bookingMaintenance.ts` gate before business work; it fails closed, so `public.booking_maintenance_control` must exist with enabled=false before deploying them. Why: lets old and new versions be kept from processing bookings concurrently during rollouts.
