"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Status = "idle" | "sending" | "sent" | "failed";

const fieldClass =
  "h-12 border-0 border-b border-gold/50 bg-transparent text-base text-ivory outline-none transition-colors focus:border-gold";
const labelClass = "flex flex-col gap-2 text-[13px] uppercase tracking-[0.12em] text-sand";

/**
 * Name, email and message, posted as JSON to /api/contact. The hidden
 * "company" field is a honeypot: people never see it, bots fill it in.
 * The result is announced through a polite live region.
 */
export function ContactForm({ copy }: { copy: Dictionary["contact"] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <label className={labelClass}>
        {copy.fields.name}
        <input name="name" type="text" autoComplete="name" required maxLength={100} className={fieldClass} />
      </label>
      <label className={labelClass}>
        {copy.fields.email}
        <input name="email" type="email" autoComplete="email" required maxLength={200} dir="ltr" className={fieldClass} />
      </label>
      <label className={labelClass}>
        {copy.fields.message}
        <textarea name="message" rows={4} required maxLength={5000} className={`${fieldClass} h-auto resize-none py-3`} />
      </label>
      <input name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 flex h-13 items-center justify-center self-start bg-gold px-8 text-sm font-medium uppercase tracking-[0.12em] text-navy transition-colors hover:bg-gold-bright disabled:opacity-60"
      >
        {status === "sending" ? copy.sending : copy.send}
      </button>
      <p role="status" className="min-h-6 text-[15px] text-sand">
        {status === "sent" ? copy.sent : status === "failed" ? copy.failed : ""}
      </p>
    </form>
  );
}
