/**
 * Validates contact submissions and sends them through Resend.
 * The in-memory rate limit is per instance and resets on cold starts.
 */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimitWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 5;
const recentRequestsByVisitor = new Map<string, number[]>();

function getTrimmedText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= maxLength ? trimmed : null;
}

function isRateLimited(visitorIp: string): boolean {
  const now = Date.now();
  const requestTimestamps = (recentRequestsByVisitor.get(visitorIp) ?? []).filter(
    (timestamp) => now - timestamp < rateLimitWindowMs,
  );
  requestTimestamps.push(now);
  recentRequestsByVisitor.set(visitorIp, requestTimestamps);
  return requestTimestamps.length > maxRequestsPerWindow;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) {
    return Response.json({ error: "forbidden" }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return Response.json({ error: "unsupported_media_type" }, { status: 415 });
  }

  let requestBody: unknown;
  try {
    requestBody = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!requestBody || typeof requestBody !== "object") {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }
  const contactFields = requestBody as Record<string, unknown>;

  if (typeof contactFields.company === "string" && contactFields.company.length > 0) {
    return Response.json({ ok: true });
  }

  const senderName = getTrimmedText(contactFields.name, 100);
  const senderEmail = getTrimmedText(contactFields.email, 200);
  const messageBody = getTrimmedText(contactFields.message, 5000);
  if (
    !senderName ||
    /[\r\n]/.test(senderName) ||
    !senderEmail ||
    !emailPattern.test(senderEmail) ||
    !messageBody
  ) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  const visitorIp = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(visitorIp)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: senderEmail,
        subject: `New project inquiry from ${senderName}`,
        text: `${messageBody}\n\n${senderName} <${senderEmail}>`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!emailResponse.ok) return Response.json({ error: "send_failed" }, { status: 502 });
  } catch {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
