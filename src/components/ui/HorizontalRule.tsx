// Shared horizontal rule so every event block's divider has identical length.
export default function HorizontalRule({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-[1px] w-[min(100%,420px)] md:w-[min(100%,720px)] ${className}`}
      style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 25%, transparent)' }}
    />
  )
}
