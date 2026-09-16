import type { SectionConfig, SectionKey } from '../types'

// Reorder, remove, or disable sections here. Envelope is rendered
// separately by App.tsx and is not part of this list.
export const sections: SectionConfig[] = [
  { key: 'hero', enabled: true },
  { key: 'receptionInfo', enabled: true },
  { key: 'gallery', enabled: false },
  { key: 'gift', enabled: false },
  { key: 'rsvp', enabled: false },
  { key: 'guestbook', enabled: true },
  { key: 'thankYou', enabled: false },
]

export const sectionOrder: SectionKey[] = sections.filter((s) => s.enabled).map((s) => s.key)
