import type { SectionProps } from '../../../types'
import { galleryImg } from './theme'

const PHOTO = galleryImg(3)

function mondayOffset(year: number, month: number) {
  const jsDay = new Date(year, month - 1, 1).getDay()
  return (jsDay + 6) % 7
}

export default function GreenCalendar({ data }: SectionProps) {
  const [year, month, day] = data.event.date.split('-').map(Number)
  const monthName = new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'long' })
  const daysInMonth = new Date(year, month, 0).getDate()
  const cells: (number | null)[] = [
    ...Array.from({ length: mondayOffset(year, month) }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <section id="green-calendar" className="relative w-full overflow-hidden">
      <div className="relative w-full">
        <img
          src={PHOTO}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(90, 102, 64, 0.82)' }} />
        <div className="relative z-[1] flex flex-col px-4 py-8 text-white md:px-12 md:py-10">
          <h2
            className="text-center font-script leading-none"
            style={{ fontSize: 'clamp(2.4rem, 11vw, 5.25rem)' }}
          >
            {monthName}
          </h2>
          <div
            className="mt-5 grid grid-cols-7 text-center text-[11px] tracking-[0.08em] uppercase opacity-85 md:mt-6 md:text-[16px] md:tracking-[0.14em]"
            style={{ fontFamily: 'var(--font-serif-alt)' }}
          >
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div
            className="mt-2 grid grid-cols-7 gap-y-2 text-center text-[16px] md:mt-3 md:gap-y-3 md:text-[26px]"
            style={{ fontFamily: 'var(--font-serif-alt)' }}
          >
            {cells.map((d, i) =>
              d === null ? (
                <span key={`e-${i}`} className="min-h-8 md:min-h-12" />
              ) : d === day ? (
                <span key={d} className="relative flex min-h-8 items-center justify-center md:min-h-12">
                  <svg
                    viewBox="0 0 32 32"
                    className="absolute h-8 w-8 md:h-14 md:w-14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    aria-hidden
                  >
                    <path d="M16 27s-9.5-6.2-9.5-12.2C6.5 11 9.2 8.8 12 8.8c1.8 0 3.3.9 4 2.3.7-1.4 2.2-2.3 4-2.3 2.8 0 5.5 2.2 5.5 6C25.5 20.8 16 27 16 27z" />
                  </svg>
                  <span className="relative">{d}</span>
                </span>
              ) : (
                <span key={d} className="flex min-h-8 items-center justify-center md:min-h-12">
                  {d}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
