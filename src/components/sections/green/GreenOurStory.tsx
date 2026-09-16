import type { SectionProps } from '../../../types'
import { galleryImg, GREEN, GREEN_ASSETS } from './theme'

const GROOM_PHOTO = galleryImg(9)
const BRIDE_PHOTO = galleryImg(4)

function Polaroid({
  src,
  alt,
  className,
  photoPosition,
}: {
  src: string
  alt: string
  className?: string
  photoPosition?: string
}) {
  return (
    <div className={`bg-white p-2 pb-10 shadow-[0_12px_28px_rgba(60,50,30,0.2)] ${className ?? ''}`}>
      <img
        src={src}
        alt={alt}
        className="aspect-[4/5] w-full object-cover"
        style={{ objectPosition: photoPosition }}
      />
    </div>
  )
}

export default function GreenOurStory({ data }: SectionProps) {
  const { groom, bride } = data.couple

  return (
    <section
      id="green-our-story"
      className="relative w-full overflow-hidden px-4 pb-5 pt-4 md:px-8 md:pb-8 md:pt-6"
      style={{ background: GREEN.paperBg, color: GREEN.ink }}
    >
      <img
        src={GREEN_ASSETS.flowerLeft}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-0 w-[42%] max-w-[210px] md:max-w-[260px]"
      />
      <img
        src={GREEN_ASSETS.flowerRight}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-[18%] z-0 w-[48%] max-w-[240px] md:max-w-[300px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[560px]">
        <div className="relative min-h-[600px] md:min-h-[760px]">
          <Polaroid
            src={GROOM_PHOTO}
            alt={groom.shortName}
            photoPosition="center 18%"
            className="absolute top-[4%] left-[2%] z-[1] w-[58%] -rotate-[8deg] md:w-[56%]"
          />

          <div
            className="absolute top-[7%] right-[2%] z-[2] w-[38%] text-right"
            style={{ fontFamily: 'var(--font-serif-alt)' }}
          >
            <p className="font-script text-[28px] leading-tight md:text-[36px]" style={{ color: GREEN.sage }}>
              Chú rể
            </p>
            <p
              className="mt-1 text-[22px] tracking-[0.1em] uppercase md:text-[28px]"
              style={{ color: GREEN.inkDeep }}
            >
              {groom.shortName}
            </p>
            <img
              src={GREEN_ASSETS.orchids}
              alt=""
              aria-hidden
              className="mt-2 ml-auto w-[78%] max-w-[140px]"
            />
          </div>

          <img
            src={GREEN_ASSETS.seal}
            alt=""
            aria-hidden
            className="absolute top-[36%] left-[36%] z-[4] w-[22%] max-w-[96px] drop-shadow-[0_6px_10px_rgba(40,50,20,0.28)] md:w-[18%]"
          />

          <Polaroid
            src={BRIDE_PHOTO}
            alt={bride.shortName}
            photoPosition="center 22%"
            className="absolute top-[38%] right-[1%] z-[3] w-[62%] rotate-[7deg] md:w-[58%]"
          />

          <div
            className="absolute bottom-[6%] left-[2%] z-[2] w-[40%]"
            style={{ fontFamily: 'var(--font-serif-alt)' }}
          >
            <p className="font-script text-[28px] leading-tight md:text-[36px]" style={{ color: GREEN.sage }}>
              Cô dâu
            </p>
            <p
              className="mt-1 text-[22px] tracking-[0.1em] uppercase md:text-[28px]"
              style={{ color: GREEN.inkDeep }}
            >
              {bride.shortName}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
