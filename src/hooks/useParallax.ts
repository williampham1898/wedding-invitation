import { useCallback, useEffect, useRef } from 'react'

interface ParallaxEntry {
  el: HTMLElement
  speed: number
  template: string
  maxPx: number
  last: number
}

// Port of the original template's scroll-parallax engine.
export default function useParallax() {
  const entries = useRef(new Map<HTMLElement, ParallaxEntry>())

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const innerHeight = window.innerHeight
      entries.current.forEach((entry) => {
        const rect = entry.el.getBoundingClientRect()
        const raw = (rect.top - entry.last + rect.height / 2 - innerHeight / 2) * entry.speed
        const clamped = Math.max(-entry.maxPx, Math.min(entry.maxPx, raw))
        entry.last = clamped
        entry.el.style.transform = entry.template.replace('{y}', `${clamped}px`)
      })
    }
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request, { passive: true })
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const cache = useRef(new Map<string, (el: HTMLElement | null) => void>())
  const get = useCallback((speed: number, template = 'translateY({y})', maxPx = 20) => {
    const key = `${speed}|${template}|${maxPx}`
    let fn = cache.current.get(key)
    if (!fn) {
      fn = (el: HTMLElement | null) => {
        if (el) entries.current.set(el, { el, speed, template, maxPx, last: 0 })
        // React 19 null-invocation: keep the entry (element identity unchanged on re-render);
        // do nothing — avoids clearing on transient ref churn.
      }
      cache.current.set(key, fn)
    }
    return fn
  }, [])
  return get
}
