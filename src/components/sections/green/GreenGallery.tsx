import { useEffect, useRef } from 'react'
import useLightbox from '../../../hooks/useLightbox'
import type { SectionProps } from '../../../types'
import { GREEN } from './theme'

export default function GreenGallery({ data }: SectionProps) {
  const { index, open, close, next, prev } = useLightbox(data.gallery.images.length)
  const active = index === null ? null : data.gallery.images[index]
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (index === null) {
      lastTriggerRef.current?.focus()
      return
    }
    closeButtonRef.current?.focus()
  }, [index])

  useEffect(() => {
    if (index === null) return
    const dialog = dialogRef.current
    if (!dialog) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusables = Array.from(dialog.querySelectorAll('button')).filter(
        (el) => !el.hasAttribute('disabled'),
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const activeEl = document.activeElement
      if (e.shiftKey) {
        if (activeEl === first || !dialog.contains(activeEl)) {
          e.preventDefault()
          last.focus()
        }
      } else if (activeEl === last || !dialog.contains(activeEl)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index])

  return (
    <section
      id="gallery"
      className="relative w-full overflow-hidden px-5 py-6 md:px-10 md:py-8"
      style={{ background: GREEN.paperBg, color: GREEN.ink }}
    >
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {data.gallery.images.slice(0, 6).map((image, i) => (
          <button
            key={image.url}
            type="button"
            onClick={(e) => {
              lastTriggerRef.current = e.currentTarget
              open(i)
            }}
            className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-lg"
            style={{ border: `1px solid ${GREEN.sage}33`, backgroundColor: `${GREEN.sage}10` }}
            aria-label={`Open image ${i + 1}: ${image.alt}`}
          >
            <img
              src={image.url}
              alt={image.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {i === 5 && data.gallery.images.length > 6 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/55 font-serif-alt text-4xl font-light text-white">
                +{data.gallery.images.length - 6}
              </div>
            )}
          </button>
        ))}
      </div>

      {active && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') close()
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 h-10 w-10 cursor-pointer rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            aria-label="Previous image"
            className="absolute left-2 h-12 w-12 cursor-pointer rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:left-6"
          >
            ‹
          </button>
          <img
            src={active.url}
            alt={active.alt}
            className="max-h-[85vh] max-w-full rounded-card object-contain"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            aria-label="Next image"
            className="absolute right-2 h-12 w-12 cursor-pointer rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:right-6"
          >
            ›
          </button>
          <div className="absolute bottom-4 text-sm text-white/70">
            {index === null ? null : index + 1} / {data.gallery.images.length}
          </div>
        </div>
      )}
    </section>
  )
}
