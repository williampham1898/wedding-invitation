import type { SectionProps } from '../../../types'
import { GREEN, GREEN_ASSETS } from './theme'

export default function GreenThankYou({ data }: SectionProps) {
  const note = data.thankYou.note
  const mobileLines = data.thankYou.noteLines ?? [note]

  return (
    <section
      id="thank-you"
      className="relative w-full overflow-hidden px-6 py-16 text-center md:px-12 md:py-20"
      style={{ background: GREEN.paperBg, color: GREEN.ink }}
    >
      <img
        src={GREEN_ASSETS.orchids}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-4 left-2 w-[28%] max-w-[140px] md:left-6"
      />
      <img
        src={GREEN_ASSETS.petal}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-6 bottom-8 w-[14%] max-w-[72px] rotate-[18deg]"
      />

      <h2
        className="relative font-script leading-none"
        style={{ fontSize: 'clamp(2.75rem, 11vw, 4.25rem)', color: GREEN.sage }}
      >
        Trân trọng
      </h2>

      <div className="relative mt-5 flex items-center justify-center gap-3">
        <div className="h-px w-10" style={{ backgroundColor: `${GREEN.sage}66` }} />
        <img src={GREEN_ASSETS.seal} alt="" aria-hidden className="h-10 w-10 object-contain md:h-12 md:w-12" />
        <div className="h-px w-10" style={{ backgroundColor: `${GREEN.sage}66` }} />
      </div>

      <p
        className="relative mx-auto mt-6 hidden whitespace-nowrap text-[15px] md:block md:text-[18px]"
        style={{ fontFamily: 'var(--font-serif-alt)' }}
      >
        {note}
      </p>
      <p
        className="relative mx-auto mt-6 text-[15px] leading-relaxed md:hidden"
        style={{ fontFamily: 'var(--font-serif-alt)' }}
      >
        {mobileLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    </section>
  )
}
