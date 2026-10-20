/**
 * Contact form endpoint. Accepts only same-site JSON, checks the fields,
 * drops honeypot submissions silently, limits each visitor to a few
 * messages, and emails the message to Shahar through Resend's HTTP API.
 *
 * Needs two environment variables: RESEND_API_KEY and CONTACT_TO_EMAIL.
 * Without them it answers 503, so the form shows its error message instead
 * of pretending the message was sent. CONTACT_FROM_EMAIL is optional;
 * Resend's shared test sender only delivers to the account owner's address.
 *
 * The rate limit lives in memory, so it is per server instance and resets
 * on cold starts: enough to stop one person hammering the form, not a
 * distributed attack. A Vercel Firewall rule is the stronger option.
 */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const windowMs = 10 * 60 * 1000;
const maxPerWindow = 5;
const recent = new Map<string, number[]>();

/** Returns the trimmed string if it is a non-empty string of at most `max` characters. */
function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= max ? trimmed : null;
}

/** Records this request and reports whether the visitor is over the limit. */
function overLimit(visitor: string): boolean {
  const now = Date.now();
  const hits = (recent.get(visitor) ?? []).filter((time) => now - time < windowMs);
  hits.push(now);
  recent.set(visitor, hits);
  return hits.length > maxPerWindow;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) {
    return Response.json({ error: "forbidden" }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return Response.json({ error: "unsupported_media_type" }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }
  const fields = body as Record<string, unknown>;

  if (typeof fields.company === "string" && fields.company.length > 0) {
    return Response.json({ ok: true });
  }

  const name = text(fields.name, 100);
  const email = text(fields.email, 200);
  const message = text(fields.message, 5000);
  if (!name || /[\r\n]/.test(name) || !email || !emailPattern.test(email) || !message) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  const visitor = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (overLimit(visitor)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `New project inquiry from ${name}`,
        text: `${message}\n\n${name} <${email}>`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!sent.ok) return Response.json({ error: "send_failed" }, { status: 502 });
  } catch {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
