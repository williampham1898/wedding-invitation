import useCountdownTz from '../../../hooks/useCountdownTz'
import type { SectionProps } from '../../../types'
import { galleryImg, GREEN, GREEN_ASSETS, pad2 } from './theme'

const PHOTO = galleryImg(1)
const QUOTE = 'Every moment with you feels painted in gentle light.'

export default function GreenCountdown({ data }: SectionProps) {
  const { remaining, past } = useCountdownTz(
    data.event.date,
    data.event.times[0]?.time ?? '09:00',
    data.event.timezone,
  )

  const units = remaining
    ? [remaining.days, remaining.hours, remaining.minutes, remaining.seconds].map(pad2)
    : ['00', '00', '00', '00']

  return (
    <section
      id="green-countdown"
      className="relative w-full overflow-hidden"
      style={{ background: GREEN.paperBg, color: GREEN.ink }}
    >
      <div className="relative">
        <div className="grid grid-cols-2 aspect-[2/1]">
          <img
            src={PHOTO}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center 40%' }}
          />
          <div className="flex items-center px-5 md:px-8" style={{ backgroundColor: GREEN.sageDeep }}>
            <p
              className="font-script leading-snug text-white"
              style={{ fontSize: 'clamp(1.15rem, 4.4vw, 1.85rem)' }}
            >
              {QUOTE}
            </p>
          </div>
        </div>

        <img
          src={GREEN_ASSETS.flowerLeft}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full z-[1] w-[24%] max-w-[110px] -translate-x-1/2 -translate-y-[62%] object-contain md:max-w-[128px]"
        />
      </div>

      <div className="relative z-[2] px-6 pb-14 pt-16 text-center md:pb-16 md:pt-20">
        <h2 className="font-script leading-none" style={{ fontSize: 'clamp(2.5rem, 10vw, 3.75rem)', color: GREEN.sage }}>
          {past ? data.countdown.pastTitle : 'Countdown'}
        </h2>
        {!past && (
          <p
            className="mt-5 text-[32px] tracking-[0.14em] md:text-[42px]"
            style={{ fontFamily: 'var(--font-serif-alt)', color: GREEN.ink }}
          >
            {units.join(' : ')}
          </p>
        )}
      </div>
    </section>
  )
}
