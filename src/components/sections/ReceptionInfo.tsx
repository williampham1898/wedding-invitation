import { useRef } from 'react'
import useCountdownTz from '../../hooks/useCountdownTz'
import useFitFontSize from '../../hooks/useFitFontSize'
import useParallax from '../../hooks/useParallax'
import { buildGoogleCalendarUrl, calendarTitle, durationFromSchedule } from '../../lib/gcal'
import { withBase } from '../../lib/withBase'
import type { CeremonyScheduleItem, EventTime, Person, SectionProps } from '../../types'
import HorizontalRule from '../ui/HorizontalRule'
import MiniCalendar from '../ui/MiniCalendar'
import Reveal from '../ui/Reveal'

const ASSETS = () => withBase('/images/themes/chateau-blue')

const titleStyle = {
  fontFamily: 'var(--font-serif-alt)',
  fontWeight: 700,
  letterSpacing: '0.1em',
} as const

const nameStyle = {
  fontFamily: '"EB Garamond", serif',
} as const

const nameClassName = 'font-semibold w-full text-[13px] md:text-[23px] [overflow-wrap:anywhere]'

function formatDateParts(dateIso: string) {
  const date = new Date(`${dateIso}T00:00:00`)
  return {
    dayName: date.toLocaleDateString('vi-VN', { weekday: 'long' }).toUpperCase(),
    day: date.getDate(),
    monthName: date.toLocaleDateString('vi-VN', { month: 'long' }).toUpperCase(),
    year: date.getFullYear(),
  }
}

function PersonColumn({ person, houseLabel }: { person: Person; houseLabel: string }) {
  return (
    <div className="row-span-5 grid grid-rows-subgrid justify-items-center min-w-0 text-center max-w-[180px] md:max-w-[300px]">
      <p className="text-[12px] md:text-[14px] uppercase tracking-wider font-semibold text-primary mb-1">
        {houseLabel}
      </p>
      <p className="text-[13px] md:text-[15px] mb-1">{person.parentTitle}</p>
      <p className={nameClassName} style={nameStyle}>
        {person.father}
      </p>
      <p className={nameClassName} style={nameStyle}>
        {person.mother}
      </p>
      <p className="mt-2 text-[12px] md:text-[13px] whitespace-pre-line leading-snug flex flex-col">
        {person.address}
      </p>
    </div>
  )
}

function FamilyGrid({
  left,
  right,
  leftHouseLabel,
  rightHouseLabel,
}: {
  left: Person
  right: Person
  leftHouseLabel: string
  rightHouseLabel: string
}) {
  return (
    <div className="w-full grid grid-cols-[1fr_auto_1fr] justify-center gap-x-3 md:gap-x-8 grid-rows-[repeat(5,auto)] gap-y-1">
      <PersonColumn person={left} houseLabel={leftHouseLabel} />
      <div
        className="row-span-5 w-[1px] h-[60px] md:h-[80px] self-center bg-primary opacity-50"
        aria-hidden
      />
      <PersonColumn person={right} houseLabel={rightHouseLabel} />
    </div>
  )
}

function DateRow({ dayName, day, monthName }: { dayName: string; day: number; monthName: string }) {
  return (
    <div className="flex items-center justify-center gap-6">
      <span className="uppercase text-[12px] md:text-[16px] text-right">{dayName}</span>
      <span className="text-[20px] md:text-[28px] opacity-40" aria-hidden>
        |
      </span>
      <span className="text-[30px] md:text-[40px] leading-none">{day}</span>
      <span className="text-[20px] md:text-[28px] opacity-40" aria-hidden>
        |
      </span>
      <span className="uppercase text-[12px] md:text-[16px] text-left">{monthName}</span>
    </div>
  )
}

function ScheduleList({ items }: { items: CeremonyScheduleItem[] }) {
  return (
    <ol className="mt-4 w-full max-w-[300px] md:max-w-[360px] grid grid-cols-[minmax(0,1fr)_16px_minmax(0,1.4fr)] items-center gap-x-4 gap-y-5 pt-5">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <li key={item.id} className="contents">
            <span className="text-right text-[15px] md:text-[17px] font-semibold text-primary tabular-nums leading-snug">
              {item.time}
            </span>
            <span aria-hidden className="relative flex items-center justify-center self-stretch">
              <span
                className={`absolute left-1/2 -translate-x-1/2 w-px ${
                  index === 0 ? 'top-1/2' : '-top-5'
                } ${isLast ? 'bottom-1/2' : '-bottom-5'}`}
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-primary) 40%, transparent)',
                }}
              />
              <span
                className="relative block h-2 w-2 rounded-full"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  boxShadow: '0 0 0 2px color-mix(in srgb, var(--color-primary) 13%, transparent)',
                }}
              />
            </span>
            <span className="text-start text-[14px] md:text-[16px] text-primary leading-snug">
              {item.label}
              {item.note && (
                <span className="block text-[11px] md:text-[12px] opacity-70">{item.note}</span>
              )}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function EventBlock({
  title,
  times,
  dayName,
  day,
  monthName,
  year,
  venue,
  address,
  mapAddress,
  mapLink,
  schedule,
  calendar,
}: {
  title: string
  times: EventTime[]
  dayName: string
  day: number
  monthName: string
  year: number
  venue: string
  address: string
  mapAddress: string
  mapLink: string
  schedule: CeremonyScheduleItem[]
  calendar?: {
    label: string
    href: string
    year: number
    month: number
    day: number
  }
}) {
  return (
    <div className="relative flex flex-col items-center gap-4 md:gap-5 text-center">
      <h2
        className="uppercase font-bold text-[22px] md:text-[27px] text-center text-primary"
        style={titleStyle}
      >
        {title}
      </h2>
      <div className="flex w-full flex-col items-center gap-3 md:gap-4">
        <div className="flex items-start justify-center gap-8 md:gap-12">
          {times.map((t) => (
            <div key={t.time + (t.label ?? '')} className="flex flex-col items-center gap-1">
              {t.label && (
                <div className="text-[12px] md:text-[14px] uppercase tracking-wider text-primary/80">
                  {t.label}
                </div>
              )}
              <div className="text-[20px] md:text-[30px] text-primary">{t.time}</div>
            </div>
          ))}
        </div>
        <DateRow dayName={dayName} day={day} monthName={monthName} />
        <p className="text-[18px] md:text-[24px]">{year}</p>
        <p className="mt-2 text-center font-serif-alt text-[20px] md:text-[26px] text-primary">
          {`Tại: ${venue}`}
        </p>
        <p className="text-center text-[13px] md:text-[15px] text-primary whitespace-pre-line">
          {address}
        </p>
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`}
          title={`Map: ${venue}`}
          loading="lazy"
          className="w-[280px] md:w-[320px] h-[160px] rounded-lg border-0"
        />
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 decoration-1 text-sm tracking-wider hover:opacity-70 cursor-pointer pb-2"
        >
          Bản đồ chỉ đường
        </a>
        <div className="relative flex w-full flex-col md:flex-row items-center justify-center gap-6 md:gap-10 pt-6 mt-2">
          <HorizontalRule className="absolute top-0 left-1/2 -translate-x-1/2" />
          <div className="flex justify-center md:flex-1">
            <ScheduleList items={schedule} />
          </div>
          {calendar && (
            <>
              <div
                aria-hidden
                className="hidden md:block w-[1px] self-stretch my-2 shrink-0"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-primary) 25%, transparent)',
                }}
              />
              <div className="flex flex-col items-center gap-3 pt-5 md:flex-1">
                <div className="relative w-[240px] md:w-[280px] aspect-[388/307]">
                  <img
                    src={`${ASSETS()}/frame-lich.webp`}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-fill"
                  />
                  <div className="absolute inset-0 flex items-center justify-center px-8 py-6">
                    <MiniCalendar year={calendar.year} month={calendar.month} day={calendar.day} />
                  </div>
                </div>
                <a
                  href={calendar.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-1 text-sm tracking-wider hover:opacity-70 cursor-pointer"
                >
                  {calendar.label}
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ReceptionInfo({ data }: SectionProps) {
  const { remaining, past } = useCountdownTz(
    data.event.date,
    data.event.times[0]?.time ?? '11:00',
    data.event.timezone,
  )
  const parallax2 = useParallax()
  const firstNameRef = useRef<HTMLHeadingElement>(null)
  const secondNameRef = useRef<HTMLHeadingElement>(null)

  const { groom, bride } = data.couple
  const brideFirst = data.couple.brideFirst
  const [first, second] = brideFirst ? [bride, groom] : [groom, bride]
  const firstSize = useFitFontSize(first.fullName, 40, 64, firstNameRef, {
    fontFamily: '"EB Garamond", serif',
  })
  const secondSize = useFitFontSize(second.fullName, 40, 64, secondNameRef, {
    fontFamily: '"EB Garamond", serif',
  })

  const [y, m, d] = data.event.date.split('-').map(Number)
  const [cy, cm, cd] = data.ceremony.date.split('-').map(Number)
  const ceremonyDateParts = { year: cy, month: cm, day: cd }
  const eventDateParts = { year: y, month: m, day: d }

  const eventParts = formatDateParts(data.event.date)
  const ceremonyParts = formatDateParts(data.ceremony.date)

  const unitLabels = data.countdown.units
  const countdownText = remaining
    ? `${remaining.days} ${unitLabels.days} ${remaining.hours} ${unitLabels.hours} ${remaining.minutes} ${unitLabels.minutes} ${remaining.seconds} ${unitLabels.seconds}`
    : null

  const calendarTitleText = (eventTitle: string) =>
    calendarTitle(
      eventTitle,
      brideFirst ? bride.shortName : groom.shortName,
      brideFirst ? groom.shortName : bride.shortName,
    )

  const ceremonyCalendarUrl = buildGoogleCalendarUrl({
    title: calendarTitleText(data.ceremony.title),
    description: calendarTitleText(data.ceremony.title),
    location: data.ceremony.mapLink,
    dateIso: data.ceremony.date,
    timeHHmm: data.ceremony.times[0]?.time ?? '08:00',
    timeZone: data.ceremony.timezone,
    durationMinutes: durationFromSchedule(data.ceremony.schedule, 120),
  })

  const eventCalendarUrl = buildGoogleCalendarUrl({
    title: calendarTitleText(data.event.title),
    description: calendarTitleText(data.event.title),
    location: data.event.mapLink,
    dateIso: data.event.date,
    timeHHmm: data.event.times[0]?.time ?? '11:00',
    timeZone: data.event.timezone,
    durationMinutes: durationFromSchedule(data.event.schedule, 120),
  })

  return (
    <section
      id="reception-info"
      className="relative isolate px-[12px] md:px-[24px] pt-[8px] md:pt-[40px] pb-[56px] md:pb-[80px] z-10"
    >
      <img
        ref={parallax2(0.08, 'translate(20%, {y}) scaleX(-1)')}
        src={`${ASSETS()}/hoa.webp`}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-30 md:-top-150 right-0 md:right-[20%] h-[700px] md:h-[900px] w-auto max-w-none object-contain opacity-[0.17] -z-10"
        style={{ willChange: 'transform' }}
        loading="lazy"
        decoding="async"
      />
      <div className="relative z-10 flex flex-col gap-6 md:gap-8">
        {/* Ceremony Info title */}
        <Reveal>
          <h2
            className="uppercase font-bold text-[22px] md:text-[27px] text-center text-primary"
            style={titleStyle}
          >
            {data.reception.ceremonyInfoTitle}
          </h2>
        </Reveal>

        {/* Family info */}
        <Reveal>
          <FamilyGrid
            left={first}
            right={second}
            leftHouseLabel={brideFirst ? data.couple.brideHouseLabel : data.couple.groomHouseLabel}
            rightHouseLabel={brideFirst ? data.couple.groomHouseLabel : data.couple.brideHouseLabel}
          />
        </Reveal>

        {/* Announcement + full names */}
        <Reveal delay={100}>
          <div
            className="relative text-center text-[16px] md:text-[20px] flex flex-col gap-2 whitespace-pre-line"
            style={{ fontFamily: 'var(--font-serif-alt)', color: 'var(--color-text)' }}
          >
            {data.announcement.text}
          </div>
          <div className="relative flex w-full min-w-0 flex-col items-center text-center gap-3 md:gap-4 mt-2">
            <h3
              ref={firstNameRef}
              className="w-[80%] min-h-[80px] flex items-center justify-center leading-[42px] md:leading-[60px] whitespace-nowrap"
              style={{ ...nameStyle, fontSize: `${firstSize}px` }}
            >
              {first.fullName}
            </h3>
            <div
              className="font-script text-[24px] md:text-[32px] text-primary"
              style={{ fontWeight: 400 }}
            >
              &amp;
            </div>
            <h3
              ref={secondNameRef}
              className="w-[80%] min-h-[80px] leading-[42px] md:leading-[60px] whitespace-nowrap flex items-center justify-center"
              style={{ ...nameStyle, fontSize: `${secondSize}px` }}
            >
              {second.fullName}
            </h3>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 mt-10 flex justify-center">
        <img
          src={`${ASSETS()}/hoa-ngang.webp`}
          alt=""
          aria-hidden
          loading="lazy"
          className="h-auto w-[380px] md:w-[680px] max-w-full object-contain"
        />
      </div>

      <div className="relative z-10 mt-10 flex flex-col gap-6 md:gap-8">
        {/* Ceremony block */}
        <Reveal delay={150}>
          <EventBlock
            title={data.ceremony.title}
            times={data.ceremony.times}
            dayName={ceremonyParts.dayName}
            day={ceremonyParts.day}
            monthName={ceremonyParts.monthName}
            year={ceremonyParts.year}
            venue={data.ceremony.venue}
            address={data.ceremony.address}
            mapAddress={data.ceremony.mapAddress}
            mapLink={data.ceremony.mapLink}
            schedule={data.ceremony.schedule}
            calendar={{
              label: data.reception.calendarButton,
              href: ceremonyCalendarUrl,
              ...ceremonyDateParts,
            }}
          />
        </Reveal>
      </div>

      <div className="relative z-10 mt-10 flex justify-center">
        <img
          src={`${ASSETS()}/hoa-ngang.webp`}
          alt=""
          aria-hidden
          loading="lazy"
          className="h-auto w-[380px] md:w-[680px] max-w-full object-contain"
        />
      </div>

      <div className="relative z-10 mt-10 flex flex-col gap-6 md:gap-8">
        {/* Lễ Thành Hôn block */}
        <Reveal delay={100}>
          <EventBlock
            title={data.event.title}
            times={data.event.times}
            dayName={eventParts.dayName}
            day={d}
            monthName={eventParts.monthName}
            year={eventParts.year}
            venue={data.event.venue}
            address={data.event.address}
            mapAddress={data.event.mapAddress}
            mapLink={data.event.mapLink}
            schedule={data.event.schedule}
            calendar={{
              label: data.reception.calendarButton,
              href: eventCalendarUrl,
              ...eventDateParts,
            }}
          />
        </Reveal>

        {/* Countdown */}
        <Reveal delay={100}>
          <h3 className="flex flex-col items-center text-center uppercase text-[16px] md:text-[18px] tracking-[0.1em] font-semibold text-primary">
            {past ? data.countdown.pastTitle : data.countdown.title}
          </h3>
          {!past && countdownText && (
            <p className="mt-3 text-center text-sm md:text-lg text-primary tabular-nums">
              {countdownText}
            </p>
          )}

          {/* Banquet illustration */}
          <div className="relative flex justify-center pt-6 md:pt-8">
            <img
              src={`${ASSETS()}/ban-tiec.webp`}
              alt="Wedding banquet table illustration"
              loading="lazy"
              className="w-[450px] md:w-[730px] max-w-full object-contain"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
