/**
 * Contact form endpoint. Checks the fields, drops honeypot submissions
 * silently, and emails the message to Shahar through Resend's HTTP API.
 *
 * Needs two environment variables: RESEND_API_KEY and CONTACT_TO_EMAIL.
 * Without them it answers 503, so the form shows its error message instead
 * of pretending the message was sent. CONTACT_FROM_EMAIL is optional;
 * Resend's shared test sender only delivers to the account owner's address.
 */

type Payload = { name?: unknown; email?: unknown; message?: unknown; company?: unknown };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns the trimmed string if it is a non-empty string of at most `max` characters. */
function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= max ? trimmed : null;
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.length > 0) {
    return Response.json({ ok: true });
  }

  const name = text(body.name, 100);
  const email = text(body.email, 200);
  const message = text(body.message, 5000);
  if (!name || !email || !emailPattern.test(email) || !message) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const sent = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `New project inquiry from ${name}`,
      text: `${message}\n\n${name} <${email}>`,
    }),
  });

  if (!sent.ok) {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
