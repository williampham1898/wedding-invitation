export interface Person {
  fullName: string
  shortName: string
  parentTitle: string
  father: string
  mother: string
  address: string
  photo: string // may be empty → Hero falls back to gallery[0]
}

export interface GalleryImage {
  url: string
  alt: string
}

export interface BankAccount {
  bank: string
  accountName: string
  accountNumber: string
  iban?: string
}

export interface RsvpQuestion {
  id: string
  type: 'yesno' | 'choice'
  label: string
  options?: string[] // required when type === 'choice'
}

export interface CeremonyScheduleItem {
  id: string
  time: string
  label: string
  note?: string
}

export interface EventTime {
  label?: string
  time: string
}

export interface EventInfo {
  title: string
  date: string // ISO yyyy-mm-dd
  timezone: string
  times: EventTime[]
  schedule: CeremonyScheduleItem[]
  venue: string
  address: string
  mapAddress: string
  mapLink: string // Google Maps share link (goo.gl); calendar location + "open in maps"
  lunarNote?: string
  inviteHeadline?: string | string[]
  showTitle?: boolean
  extraCeremony?: {
    title: string
    time: string
    date: string
    lunarNote?: string
  }
}

export interface InvitationData {
  lang: 'en' | 'vi'
  hero: { welcomeText: string }
  couple: {
    groom: Person
    bride: Person
    brideFirst: boolean
    groomHouseLabel: string
    brideHouseLabel: string
    relationLabel: string
  }
  event: EventInfo
  ceremony: EventInfo
  announcement: { text: string }
  envelope: {
    greeting: string
    inviteMessage: string
    openButton: string
  }
  countdown: {
    title: string
    pastTitle: string
    units: { days: string; hours: string; minutes: string; seconds: string }
  }
  reception: {
    ceremonyInfoTitle: string
    calendarButton: string
  }
  gallery: { title: string; layout: 'masonry'; images: GalleryImage[] }
  gift: {
    title: string
    thankYou: string
    accounts: BankAccount[]
    qrCodes?: { label: string; image: string }[]
  }
  rsvp?: {
    buttonLabel: string
    attendLabel: string
    acceptLabel: string
    declineLabel: string
    nameError: string
    attendError: string
    submitError: string
    questions: RsvpQuestion[]
    wishLabel: string
    wishPlaceholder: string
    show: boolean
    maxGuests: number
    endpoint: string
  }
  guestbook?: {
    title: string
    namePlaceholder: string
    wishPlaceholder: string
    submitLabel: string
    submittingLabel: string
    savedText: string
    noWishesText: string
    formError: string
    show: boolean
    seedWishes: { name: string; wish: string }[]
  }
  music: { src: string }
  thankYou: { note: string; noteLines?: string[] }
  site: { title: string }
}

export type SectionKey =
  | 'hero'
  | 'receptionInfo'
  | 'gallery'
  | 'gift'
  | 'rsvp'
  | 'guestbook'
  | 'thankYou'

export interface SectionConfig {
  key: SectionKey
  enabled: boolean
}

export interface SectionProps {
  data: InvitationData
}
