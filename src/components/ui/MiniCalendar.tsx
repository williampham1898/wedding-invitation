interface MiniCalendarProps {
  year: number
  month: number // 1-12
  day: number // highlighted
}

export default function MiniCalendar({ year, month, day }: MiniCalendarProps) {
  const monthLabel = new Date(year, month - 1, 1).toLocaleDateString('vi-VN', { month: 'long' })
  const firstWeekday = new Date(year, month - 1, 1).getDay() // 0=Sun
  const daysInMonth = new Date(year, month, 0).getDate()
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  return (
    <div className="w-full text-primary" style={{ fontFamily: 'var(--font-serif-alt)' }}>
      <div className="text-center font-bold uppercase tracking-wider text-sm md:text-base mb-2">
        {monthLabel} {year}
      </div>
      <div className="grid grid-cols-7 text-center text-[11px] md:text-xs mb-1">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((d, i) => (
          <span key={i} className="opacity-60">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center text-[12px] md:text-sm gap-y-1">
        {cells.map((d, i) =>
          d === null ? (
            <span key={`x${i}`} />
          ) : d === day ? (
            <span
              key={d}
              className="mx-auto flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {d}
            </span>
          ) : (
            <span key={d}>{d}</span>
          ),
        )}
      </div>
    </div>
  )
}
