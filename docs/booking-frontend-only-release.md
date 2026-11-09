# Frontend-only compatible booking release

Based on main c8d7f9290fc2f8e0c1ba00b2286b489642e0790c. Only frontend source, tests and documentation; no database, Edge Function, dependency, native, phone or workflow changes.

Includes booking landing/scroll handling, timezone-safe summaries, price visibility, availability retry, explicit paid-needs-reschedule/review states, hosted-checkout 409 handling and reschedule delivery-warning copy. Legacy successful coaching and contract responses retain the prior normal confirmation UX. Missing optional booking/fulfillment projections are NOT interpreted as failed fulfillment. Only explicit error/status evidence changes that path. This deliberately does not certify legacy email/Zoom delivery.

The previously proposed blanket review state for legacy contract success was excluded. Explicit unresolved returns retain their URL for verification on reload. Contract reschedule links use the returned booking ID, never the contract ID. No backend protocol rollout is required.

Browser tests intercept external traffic. No real payment, booking, email or meeting is created. Main synchronization is authorized for this reviewed frontend scope; public Lovable publication is a separate step. Full release evidence and exact SHAs are recorded outside the repository in /root/booking-repairs/frontend-release/REPORT.md.
