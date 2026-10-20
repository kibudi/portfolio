/** A short "open for projects" line with a softly pulsing gold dot. */
export function AvailabilityNote({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-3 text-sm text-sand">
      <span aria-hidden="true" className="relative flex size-2.5">
        <span className="absolute inset-0 rounded-full bg-gold opacity-60 motion-safe:animate-ping" />
        <span className="relative size-2.5 rounded-full bg-gold" />
      </span>
      {text}
    </p>
  );
}
