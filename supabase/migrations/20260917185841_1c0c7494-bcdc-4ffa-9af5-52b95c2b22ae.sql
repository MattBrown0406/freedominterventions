-- These three policies were deny-all placeholders (condition "AND false"): they granted
-- no access at all. Row-level security already denies everything not explicitly allowed,
-- so removing them changes no behavior while eliminating misleading permissive-looking rules.
DROP POLICY IF EXISTS "No direct client reads" ON storage.objects;
DROP POLICY IF EXISTS "No direct client deletes" ON storage.objects;
DROP POLICY IF EXISTS "No direct client uploads" ON storage.objects;