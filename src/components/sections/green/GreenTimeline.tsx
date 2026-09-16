import type { SectionProps } from '../../../types'
import { GREEN, GREEN_ASSETS } from './theme'

const TITLE = 'Timeline'

export default function GreenTimeline({ data }: SectionProps) {
  const items = data.event.schedule

  return (
    <section
      id="green-timeline"
      className="relative w-full overflow-hidden px-5 py-12 md:px-12 md:py-16"
      style={{ background: GREEN.paperBg, color: GREEN.ink }}
    >
      <h2
        className="text-center font-script"
        style={{ fontSize: 'clamp(2.75rem, 11vw, 4.25rem)', color: GREEN.sage }}
      >
        {TITLE}
      </h2>

      <div className="mt-10 flex items-start justify-center gap-2 md:gap-4">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-start">
            {index > 0 && (
              <div
                className="mt-20 mr-3 h-px w-8 shrink-0 md:mt-24 md:mr-5 md:w-14"
                style={{ backgroundColor: GREEN.sage }}
                aria-hidden
              />
            )}
            <div className="flex w-[150px] flex-col items-center text-center md:w-[200px]">
              <img
                src={index === 0 ? GREEN_ASSETS.bouquet : GREEN_ASSETS.champagne}
                alt=""
                aria-hidden
                className="h-[130px] w-auto object-contain md:h-[170px]"
              />
              <p
                className="mt-5 text-[22px] tracking-[0.08em] md:text-[28px]"
                style={{ fontFamily: 'var(--font-serif-alt)', color: GREEN.inkDeep }}
              >
                {item.time}
              </p>
              <p
                className="mt-1 text-[14px] tracking-[0.16em] uppercase md:text-[16px]"
                style={{ fontFamily: 'var(--font-serif-alt)' }}
              >
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
