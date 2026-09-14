import { authenticate, handler } from "./index.ts";
const assert = (ok: boolean) => {
  if (!ok) throw new Error("assertion failed");
};
async function sign(body: string, stamp: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode("synthetic-test-secret"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return Array.from(
    new Uint8Array(
      await crypto.subtle.sign(
        "HMAC",
        key,
        new TextEncoder().encode(`${stamp}.${body}`),
      ),
    ),
  )
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}
Deno.test("valid signature", async () => {
  assert(
    await authenticate(
      "{}",
      "1800000000",
      await sign("{}", "1800000000"),
      "synthetic-test-secret",
      1800000000000,
    ),
  );
});
Deno.test("tampered body rejected", async () => {
  assert(
    !(await authenticate(
      '{"x":1}',
      "1800000000",
      await sign("{}", "1800000000"),
      "synthetic-test-secret",
      1800000000000,
    )),
  );
});
Deno.test("expired replay rejected", async () => {
  assert(
    !(await authenticate(
      "{}",
      "1800000000",
      await sign("{}", "1800000000"),
      "synthetic-test-secret",
      1800000360000,
    )),
  );
});
Deno.test("missing signature rejected", async () => {
  assert(
    !(await authenticate(
      "{}",
      "1800000000",
      "",
      "synthetic-test-secret",
      1800000000000,
    )),
  );
});
Deno.test("missing secret fails closed", async () => {
  Deno.env.delete("ATTRIBUTION_INGEST_SECRET");
  assert(
    (
      await handler(
        new Request("http://localhost", { method: "POST", body: "{}" }),
      )
    ).status === 503,
  );
});
Deno.test("unauthorized rejected before database", async () => {
  Deno.env.set("ATTRIBUTION_INGEST_SECRET", "synthetic-test-secret");
  assert(
    (
      await handler(
        new Request("http://localhost", { method: "POST", body: "{}" }),
      )
    ).status === 401,
  );
});
Deno.test("GET rejected", async () => {
  assert((await handler(new Request("http://localhost"))).status === 405);
});
