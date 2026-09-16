import { venueWallclockToEpoch } from '../hooks/useCountdownTz'
import type { CeremonyScheduleItem } from '../types'

function formatUtc(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60_000)
}

// "HH:mm" → minutes since midnight. Returns NaN for malformed input.
function hhmmToMinutes(hhmm: string): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm)
  if (!m) return Number.NaN
  return Number(m[1]) * 60 + Number(m[2])
}

// Duration from the schedule's first/last times; falls back when the
// schedule is empty, malformed, or non-positive.
export function durationFromSchedule(
  schedule: CeremonyScheduleItem[],
  fallbackMinutes: number,
): number {
  const first = schedule[0]
  const last = schedule[schedule.length - 1]
  if (!first || !last) return fallbackMinutes
  const start = hhmmToMinutes(first.time)
  const end = hhmmToMinutes(last.time)
  if (Number.isNaN(start) || Number.isNaN(end)) return fallbackMinutes
  const duration = end - start
  if (duration <= 0) return fallbackMinutes
  return duration
}

// Calendar event title/description: "[<event title>] <first> & <second>"
export function calendarTitle(
  eventTitle: string,
  firstShortName: string,
  secondShortName: string,
): string {
  return `[${eventTitle}] ${firstShortName} & ${secondShortName}`
}

// Builds a Google Calendar "add event" URL. Times are interpreted in the
// event's timezone (DST-safe) then expressed as UTC in `dates`.
export function buildGoogleCalendarUrl(opts: {
  title: string
  description: string
  location: string
  dateIso: string
  timeHHmm: string
  timeZone: string
  durationMinutes?: number
}): string {
  const start = new Date(venueWallclockToEpoch(opts.dateIso, opts.timeHHmm, opts.timeZone))
  const end = addMinutes(start, opts.durationMinutes ?? 120)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: opts.title,
    dates: `${formatUtc(start)}/${formatUtc(end)}`,
    ctz: opts.timeZone,
    details: opts.description,
    location: opts.location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
