import type { Person, SectionProps } from '../../../types'
import { galleryImg, GREEN } from './theme'

// Đổi ảnh tại đây khi chỉnh sửa
const PHOTO = galleryImg(7)
const PHOTO_POSITION = 'center 35%'

function FamilyColumn({ person, houseLabel }: { person: Person; houseLabel: string }) {
  return (
    <div>
      <p
        className="mb-3 text-[17px] font-semibold tracking-[0.16em] uppercase md:text-[22px]"
        style={{ fontFamily: 'var(--font-serif-alt)', color: GREEN.inkDeep }}
      >
        {houseLabel}
      </p>
      <p
        className="text-[14px] leading-relaxed md:text-[18px]"
        style={{ fontFamily: 'var(--font-serif-alt)' }}
      >
        Bố. {person.father}
        <br />
        Mẹ. {person.mother}
      </p>
      <p
        className="mx-auto mt-3 max-w-[11rem] whitespace-pre-line text-[13px] leading-snug md:max-w-[14rem] md:text-[16px]"
        style={{ fontFamily: 'var(--font-serif-alt)', color: GREEN.ink }}
      >
        {person.address}
      </p>
    </div>
  )
}

export default function GreenFamily({ data }: SectionProps) {
  const { groom, bride, groomHouseLabel, brideHouseLabel } = data.couple

  return (
    <section
      id="green-family"
      className="relative z-10 w-full overflow-hidden"
      style={{ background: GREEN.paperBg, color: GREEN.ink }}
    >
      <img
        src={PHOTO}
        alt={`${groom.shortName} và ${bride.shortName}`}
        className="block w-full object-cover aspect-[16/9] md:aspect-[2/1]"
        style={{ objectPosition: PHOTO_POSITION }}
      />
      <div className="grid grid-cols-2 gap-4 px-6 py-8 text-center md:gap-10 md:px-12 md:py-10">
        <FamilyColumn person={groom} houseLabel={groomHouseLabel} />
        <FamilyColumn person={bride} houseLabel={brideHouseLabel} />
      </div>
    </section>
  )
}
