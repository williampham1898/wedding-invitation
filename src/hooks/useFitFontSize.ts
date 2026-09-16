import type { RefObject } from 'react'
import { useEffect, useState } from 'react'

interface Options {
  fontFamily?: string
  fontWeight?: number | string
  letterSpacing?: string
}

// Measures text width with a hidden span and returns a font size that fits the
// ref'd container (port of the original template's fit-text hook).
export default function useFitFontSize(
  text: string,
  baseSizeMobile: number,
  baseSizeTablet: number,
  ref: RefObject<HTMLElement | null>,
  options?: Options,
): number {
  const [size, setSize] = useState(baseSizeMobile)

  useEffect(() => {
    const el = ref.current
    if (!el || !text) {
      setSize(window.innerWidth >= 768 ? baseSizeTablet : baseSizeMobile)
      return
    }
    let cancelled = false

    const measure = (fontSize: number): number => {
      const span = document.createElement('span')
      span.style.visibility = 'hidden'
      span.style.position = 'absolute'
      span.style.whiteSpace = 'nowrap'
      span.style.fontSize = `${fontSize}px`
      if (options?.fontFamily) span.style.fontFamily = options.fontFamily
      if (options?.fontWeight !== undefined) span.style.fontWeight = String(options.fontWeight)
      if (options?.letterSpacing) span.style.letterSpacing = options.letterSpacing
      span.textContent = text
      document.body.appendChild(span)
      const width = span.offsetWidth
      document.body.removeChild(span)
      return width
    }

    const compute = () => {
      const containerWidth = el.offsetWidth
      if (!containerWidth) return
      const base = window.innerWidth >= 768 ? baseSizeTablet : baseSizeMobile
      const minSize = Math.max(12, baseSizeMobile * 0.4)
      const fitPadding = 0.95
      const textWidth = measure(base)
      let next = base
      if (textWidth > containerWidth) {
        next = Math.max(minSize, Math.min(base, (containerWidth / textWidth) * base * fitPadding))
      }
      if (!cancelled) setSize(Math.round(next))
    }

    const apply = () => {
      if (document.fonts?.ready) {
        void document.fonts.ready.then(() => {
          if (!cancelled) requestAnimationFrame(compute)
        })
      } else {
        requestAnimationFrame(compute)
      }
    }
    apply()

    const observer =
      typeof ResizeObserver !== 'undefined' && ref.current
        ? new ResizeObserver(() => compute())
        : null
    if (observer && ref.current) observer.observe(ref.current)
    window.addEventListener('resize', compute)
    return () => {
      cancelled = true
      observer?.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [
    text,
    baseSizeMobile,
    baseSizeTablet,
    ref,
    options?.fontFamily,
    options?.fontWeight,
    options?.letterSpacing,
  ])

  return size
}
