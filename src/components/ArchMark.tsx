/**
 * The logo mark: a gold arch with a keystone inside a thin circle,
 * a small version of the hero drawing.
 */
export function ArchMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden="true" className="shrink-0">
      <circle cx="18" cy="18" r="17" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 26 L9 16 A9 9 0 0 1 27 16 L27 26" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 9 L20 9 L19 12 L17 12 Z" fill="currentColor" />
    </svg>
  );
}
