import { useCallback, useEffect, useState } from 'react'

export default function useLightbox(count: number) {
  const [index, setIndex] = useState<number | null>(null)

  const close = useCallback(() => setIndex(null), [])
  const next = useCallback(() => {
    if (count <= 0) return
    setIndex((i) => (i === null ? null : (i + 1) % count))
  }, [count])
  const prev = useCallback(() => {
    if (count <= 0) return
    setIndex((i) => (i === null ? null : (i - 1 + count) % count))
  }, [count])

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, close, next, prev])

  return { index, open: setIndex, close, next, prev }
}
