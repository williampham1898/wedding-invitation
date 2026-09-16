import { useEffect, useState } from 'react'

export interface Remaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  past: boolean
}

// Returns the UTC epoch of a wall-clock date/time interpreted in `timeZone`,
// DST-safe via two-pass offset refinement (port of the original template's parser).
export function venueWallclockToEpoch(dateIso: string, timeHHmm: string, timeZone: string): number {
  const asUTC = Date.parse(`${dateIso}T${timeHHmm}:00Z`)
  if (Number.isNaN(asUTC)) return NaN
  const offset = (instant: number): number => {
    const dtf = new Intl.DateTimeFormat('en-US', {
      hourCycle: 'h23',
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    const parts = dtf.formatToParts(new Date(instant))
    const map: Record<string, number> = {}
    for (const p of parts) if (p.type !== 'literal') map[p.type] = Number(p.value)
    const asUTC2 = Date.UTC(
      map.year,
      (map.month ?? 1) - 1,
      map.day ?? 1,
      (map.hour ?? 0) % 24,
      map.minute ?? 0,
      map.second ?? 0,
    )
    return asUTC2 - instant
  }
  let guess = asUTC - offset(asUTC)
  const offset2 = offset(guess)
  if (offset2 === offset(asUTC)) return guess
  guess = asUTC - offset2
  return asUTC - offset(guess) === guess ? guess : asUTC - Math.max(offset(asUTC), offset2)
}

function calc(epoch: number): Remaining {
  const diff = epoch - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
    past: false,
  }
}

// Text-style countdown ("36 days 15 hours 4 min 27 sec"), venue-timezone correct.
export default function useCountdownTz(
  dateIso: string,
  timeHHmm: string,
  timeZone: string,
): { remaining: Remaining | null; past: boolean } {
  const [state, setState] = useState<{ remaining: Remaining | null; past: boolean }>(() => {
    const r = calc(venueWallclockToEpoch(dateIso, timeHHmm, timeZone))
    return { remaining: r.past ? null : r, past: r.past }
  })

  useEffect(() => {
    const epoch = venueWallclockToEpoch(dateIso, timeHHmm, timeZone)
    const tick = () => {
      const r = calc(epoch)
      setState({ remaining: r.past ? null : r, past: r.past })
    }
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [dateIso, timeHHmm, timeZone])

  return state
}
