import type { SectionProps } from '../../../types'
import { galleryImg, GREEN } from './theme'

const PHOTO = galleryImg(3)
const PHOTO_POSITION = 'center 62%'
const QUOTE_LINE_1 = 'All of me loves'
const QUOTE_LINE_2 = 'all of you'

export default function GreenLoveQuote({ data }: SectionProps) {
  return (
    <section id="green-love-quote" className="relative w-full overflow-hidden" style={{ background: GREEN.paperBg }}>
      <div className="relative aspect-[3/4] w-full md:aspect-[4/5]">
        <img
          src={PHOTO}
          alt={`${data.couple.groom.shortName} và ${data.couple.bride.shortName}`}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: PHOTO_POSITION }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
        <p
          className="absolute inset-x-8 bottom-[10%] text-center font-script leading-[1.2] text-white md:inset-x-14"
          style={{ fontSize: 'clamp(1.65rem, 6.2vw, 2.65rem)' }}
        >
          {QUOTE_LINE_1}
          <br />
          {QUOTE_LINE_2}
        </p>
      </div>
    </section>
  )
}
