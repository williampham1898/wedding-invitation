import { withBase } from '../../lib/withBase'
import type { InvitationData } from '../../types'

const theme = (file: string) => withBase(`/images/themes/green-themes/${file}`)

const ASSETS = {
  envelope: theme('thiep-thanh-dat-element_0021_13-20251010160528-wcnlv.png'),
  polaroid: theme('thiep-thanh-dat-element_0023_11-20251010160529-l3kgn.png'),
  seal: theme('thiep-thanh-dat-element_0030_4-20251010171938-qfleq.png'),
  flowerLeft: theme('thiep-thanh-dat-element_0017_17-20251010160529-gulgj.png'),
  flowerRight: theme('thiep-thanh-dat-element_0019_15-20251010160529-kgwqz.png'),
  orchids: theme('thiep-thanh-dat-element_0026_8-20251010160529-58dj0.png'),
  petal: theme('thiep-thanh-dat-element_0018_16-20251010160531-qmshd.png'),
  greenery: theme('anh-chup-man-hinh-2026-01-30-luc-141213-20260130071226-l8d26.png'),
}

export type EnvelopeStage = 'closed' | 'opening' | 'open'

export const PAPER_BG =
  'radial-gradient(ellipse at 50% 38%, #fbf8f2 0%, #f3efe6 58%, #ebe6db 100%)'

function formatDotDate(isoDate: string) {
  const [year, month, day] = isoDate.split('-')
  if (!year || !month || !day) return isoDate
  return `${day}.${month}.${year}`
}

function Polaroid({
  src,
  alt,
  date,
  photoPosition = 'center',
  photoScale = 1,
}: {
  src: string
  alt: string
  date?: string
  photoPosition?: string
  photoScale?: number
}) {
  return (
    <div className="relative w-full">
      <div
        className="absolute overflow-hidden"
        style={{
          top: '9%',
          left: '13.5%',
          width: '71%',
          height: '61%',
          transform: 'rotate(4.2deg)',
        }}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          style={{
            objectPosition: photoPosition,
            transform: photoScale === 1 ? undefined : `scale(${photoScale})`,
          }}
          draggable={false}
        />
      </div>
      <img
        src={ASSETS.polaroid}
        alt=""
        aria-hidden
        className="relative z-[1] h-auto w-full select-none"
        draggable={false}
      />
      {date ? (
        <span
          className="pointer-events-none absolute z-[2] whitespace-nowrap font-serif-alt font-medium text-[#3f3f3f]"
          style={{
            bottom: '8%',
            left: '50%',
            transform: 'translateX(-50%) rotate(4.2deg)',
            fontSize: 'clamp(11px, 3.1vw, 16px)',
            letterSpacing: '0.14em',
          }}
        >
          {date}
        </span>
      ) : null}
    </div>
  )
}

interface EnvelopeCoverProps {
  data: InvitationData
  stage?: EnvelopeStage
  showCta?: boolean
}

export default function EnvelopeCover({
  data,
  stage = 'open',
  showCta = false,
}: EnvelopeCoverProps) {
  const dateLabel = formatDotDate(data.event.date)
  const couplePhoto = data.gallery.images[2]?.url ?? data.gallery.images[0]?.url ?? ASSETS.greenery
  const tucked = stage === 'closed'
  const animated = stage !== 'open'

  const polaroidEase = animated
    ? 'transform 1.15s cubic-bezier(0.22, 1, 0.36, 1)'
    : 'none'
  const bloom = (delay: string) =>
    animated
      ? `opacity 0.85s ease ${delay}, transform 0.95s cubic-bezier(0.22, 1, 0.36, 1) ${delay}`
      : 'none'

  return (
    <section
      id={stage === 'open' ? 'envelope-cover' : undefined}
      aria-label="Thiệp mời"
      className={`relative w-full ${stage === 'open' ? 'overflow-hidden' : 'overflow-visible'}`}
      style={{ background: PAPER_BG }}
    >
      <div className="relative mx-auto w-full max-w-[520px] px-6 pb-16 pt-8 md:max-w-[680px] md:px-8 md:pb-20 md:pt-10">
        <div
          className={`relative aspect-[3/4] w-full select-none ${tucked ? 'overflow-hidden' : 'overflow-visible'}`}
        >
          <div
            className="absolute z-[1] w-[42%] drop-shadow-[0_10px_16px_rgba(60,45,25,0.22)]"
            style={{
              top: '16%',
              left: '10%',
              transform: tucked ? 'rotate(-10deg) translateY(48%)' : 'rotate(-16deg) translateY(0)',
              transition: `${polaroidEase} 0.12s`,
            }}
          >
            <Polaroid src={ASSETS.greenery} alt="" photoPosition="center 42%" />
          </div>

          <div
            className="absolute z-[2] w-[54%] drop-shadow-[0_12px_18px_rgba(60,45,25,0.24)]"
            style={{
              top: '7.5%',
              left: '27%',
              transform: tucked ? 'rotate(4deg) translateY(52%)' : 'rotate(2deg) translateY(0)',
              transition: `${polaroidEase} 0.28s`,
            }}
          >
            <Polaroid
              src={couplePhoto}
              alt={`${data.couple.groom.shortName} & ${data.couple.bride.shortName}`}
              date={dateLabel}
              photoPosition="center 62%"
              photoScale={1.4}
            />
          </div>

          <img
            src={ASSETS.envelope}
            alt=""
            aria-hidden
            className="absolute z-[3] h-auto w-[86%] select-none drop-shadow-[0_16px_28px_rgba(70,55,30,0.16)]"
            style={{ top: '41%', left: '7%' }}
            draggable={false}
          />

          <img
            src={ASSETS.seal}
            alt=""
            aria-hidden
            className={`absolute z-[4] h-auto w-[15%] select-none drop-shadow-[0_6px_10px_rgba(40,50,20,0.35)] ${
              tucked ? 'animate-seal-pulse' : stage === 'opening' ? 'animate-seal-pop' : ''
            }`}
            style={{ top: '54.5%', left: '42.5%' }}
            draggable={false}
          />

          <img
            src={ASSETS.orchids}
            alt=""
            aria-hidden
            className="pointer-events-none absolute z-[5] h-auto w-[24%] select-none"
            style={{
              top: '20%',
              left: '2%',
              opacity: tucked ? 0 : 1,
              transform: tucked ? 'scale(0.7) translate(-12px, 18px)' : 'scale(1) translate(0, 0)',
              transition: bloom('0.45s'),
            }}
            draggable={false}
          />

          <img
            src={ASSETS.flowerRight}
            alt=""
            aria-hidden
            className="pointer-events-none absolute z-[6] h-auto w-[40%] select-none drop-shadow-[0_8px_12px_rgba(80,90,50,0.12)]"
            style={{
              top: '5%',
              right: '-5%',
              opacity: tucked ? 0 : 1,
              transform: tucked ? 'scale(0.72) translate(18px, 28px)' : 'scale(1) translate(0, 0)',
              transition: bloom('0.58s'),
            }}
            draggable={false}
          />

          <img
            src={ASSETS.flowerLeft}
            alt=""
            aria-hidden
            className="pointer-events-none absolute z-[7] h-auto w-[40%] select-none drop-shadow-[0_8px_12px_rgba(80,90,50,0.12)]"
            style={{
              bottom: '0%',
              left: '-6%',
              opacity: tucked ? 0 : 1,
              transform: tucked ? 'scale(0.72) translate(-16px, 24px)' : 'scale(1) translate(0, 0)',
              transition: bloom('0.72s'),
            }}
            draggable={false}
          />

          <img
            src={ASSETS.petal}
            alt=""
            aria-hidden
            className="pointer-events-none absolute z-[8] h-auto w-[14%] select-none"
            style={{
              bottom: '6%',
              right: '16%',
              opacity: tucked ? 0 : 1,
              transform: tucked
                ? 'rotate(-12deg) translateY(-28px) scale(0.5)'
                : 'rotate(18deg) translateY(0) scale(1)',
              transition: bloom('1.05s'),
            }}
            draggable={false}
          />

          {showCta ? (
            <div
              className="pointer-events-none absolute inset-x-0 z-[9] text-center"
              style={{
                top: '71%',
                opacity: tucked ? 1 : 0,
                transition: animated ? 'opacity 0.4s ease' : 'none',
              }}
            >
              <p className="font-welcome text-[13px] font-semibold tracking-[0.14em] text-[#5c5346] uppercase">
                {data.envelope.openButton}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
