import type { EventInfo, SectionProps } from '../../../types'
import { GREEN, GREEN_ASSETS } from './theme'

const MAP_LABEL = 'CHỈ ĐƯỜNG'

function formatDotDate(isoDate: string) {
  const [year, month, day] = isoDate.split('-')
  if (!year || !month || !day) return isoDate
  return `${day}.${month}.${year}`
}

function ExtraCeremony({ ceremony }: { ceremony: NonNullable<EventInfo['extraCeremony']> }) {
  const date = new Date(`${ceremony.date}T00:00:00`)
  const weekday = date.toLocaleDateString('vi-VN', { weekday: 'long' }).toUpperCase()

  return (
    <div
      className="mx-auto mt-8 max-w-[22rem] border-t pt-6"
      style={{ fontFamily: 'var(--font-serif-alt)', borderColor: `${GREEN.sage}44` }}
    >
      <p className="text-[15px] tracking-[0.18em] uppercase md:text-[16px]" style={{ color: GREEN.inkDeep }}>
        {ceremony.title}
      </p>
      <p className="mt-2 text-[13px] tracking-[0.1em] uppercase md:text-[14px]">
        Được tổ chức vào {ceremony.time}
      </p>
      <p className="mt-1.5 text-[14px] tracking-[0.08em] uppercase md:text-[15px]">
        {weekday} | {formatDotDate(ceremony.date)}
      </p>
      {ceremony.lunarNote ? (
        <p className="mt-1.5 italic text-[13px] tracking-[0.02em] md:text-[14px]">
          ( {ceremony.lunarNote} )
        </p>
      ) : null}
    </div>
  )
}

export default function GreenInvite({ data }: SectionProps) {
  const event = data.event
  const { groom, bride, brideFirst } = data.couple
  const [first, second] = brideFirst ? [bride, groom] : [groom, bride]
  const date = new Date(`${event.date}T00:00:00`)
  const weekday = date.toLocaleDateString('vi-VN', { weekday: 'long' }).toUpperCase()
  const day = date.getDate()
  const year = date.getFullYear()
  const time = event.times[0]?.time ?? '09:00'
  const headline = event.inviteHeadline ?? `Kính mời tham dự ${event.title} của gia đình chúng tôi`
  const headlineLines = Array.isArray(headline) ? headline : [headline]

  return (
    <section
      id="green-invite"
      className="relative z-10 w-full overflow-hidden px-6 pb-14 pt-12 text-center md:px-14 md:pb-16 md:pt-16"
      style={{ background: GREEN.paperBg, color: GREEN.ink }}
    >
      <img
        src={GREEN_ASSETS.orchids}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-4 right-0 z-0 w-[34%] max-w-[200px] md:top-6 md:w-[26%]"
      />

      <div className="relative z-10">
      <p
        className="mx-auto text-center text-[12px] font-semibold leading-snug tracking-[0.04em] uppercase md:text-[15px]"
        style={{ fontFamily: 'var(--font-serif-alt)', color: GREEN.inkDeep }}
      >
        {headlineLines.map((line) => (
          <span key={line} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </p>

      <div
        className="mt-10 flex flex-col items-center leading-none"
        style={{ fontFamily: 'var(--font-serif-alt)', color: GREEN.sage }}
      >
        <span className="text-[34px] tracking-[0.08em] uppercase md:text-[48px]">{first.shortName}</span>
        <span className="my-3 font-script text-[28px] md:text-[36px]" style={{ color: GREEN.ink }}>
          &amp;
        </span>
        <span className="text-[34px] tracking-[0.08em] uppercase md:text-[48px]">{second.shortName}</span>
      </div>

      {event.showTitle !== false ? (
        <p
          className="mt-8 text-[18px] font-semibold tracking-[0.18em] uppercase md:text-[22px]"
          style={{ fontFamily: 'var(--font-serif-alt)', color: GREEN.inkDeep }}
        >
          {event.title}
        </p>
      ) : null}

      <p
        className={`${event.showTitle === false ? 'mt-8' : 'mt-4'} text-[22px] font-semibold tracking-[0.16em] uppercase md:text-[30px]`}
        style={{ fontFamily: 'var(--font-serif-alt)', color: GREEN.inkDeep }}
      >
        {time}, {weekday}
      </p>

      <div
        className="mt-6 flex items-center justify-center gap-4 text-[16px] tracking-[0.12em] uppercase md:gap-7 md:text-[19px]"
        style={{ fontFamily: 'var(--font-serif-alt)' }}
      >
        <span className="border-b border-current pb-1">Tháng {date.getMonth() + 1}</span>
        <span className="text-[52px] leading-none md:text-[68px]" style={{ color: GREEN.inkDeep }}>
          {day}
        </span>
        <span className="border-b border-current pb-1">Năm {year}</span>
      </div>

      {event.lunarNote ? (
        <p
          className="mt-5 italic text-[15px] md:text-[18px]"
          style={{ fontFamily: 'var(--font-serif-alt)', color: GREEN.inkDeep }}
        >
          ( {event.lunarNote} )
        </p>
      ) : null}

      {event.extraCeremony ? <ExtraCeremony ceremony={event.extraCeremony} /> : null}

      <p className="mt-8 text-[13px] tracking-[0.08em] md:text-[14px]" style={{ fontFamily: 'var(--font-serif-alt)' }}>
        Tổ chức tại
      </p>
      <p
        className="mt-2 text-[16px] font-semibold tracking-[0.08em] uppercase md:text-[20px]"
        style={{ fontFamily: 'var(--font-serif-alt)', color: GREEN.inkDeep }}
      >
        {event.venue}
      </p>
      <p className="mx-auto mt-2 max-w-sm text-[12px] leading-relaxed md:text-[14px]">{event.address}</p>

      <a
        href={event.mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.18em] uppercase"
        style={{ fontFamily: 'var(--font-serif-alt)', color: GREEN.sageDeep }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
        </svg>
        {MAP_LABEL}
      </a>
      </div>
    </section>
  )
}
