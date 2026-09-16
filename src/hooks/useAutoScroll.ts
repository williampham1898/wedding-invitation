import { useEffect } from 'react'

// Auto-scroll for the revealed invitation (ported from the original
// template's behavior): after the envelope opens the page starts at the
// top, waits 2s, then drifts down at a fixed 50px/s until it reaches the
// bottom.
//
// Pause/resume model:
// - Tap/click ANYWHERE toggles pause/resume (400ms double-click guard).
// - Exceptions: the floating music toggle (data-autoscroll-ignore) never
//   touches scroll state; typing fields (input/textarea/select) pause so
//   the page doesn't drift while typing.
// - Real scrolling gestures (touch swipe, scrollbar drag) pause the drift —
//   detected via the scroll event: if the position deviates from what our
//   loop last wrote, a user moved the page. No touchstart listener, so the
//   tap-generated synthetic click can never fight the pause state.
const START_DELAY_MS = 2000
const SPEED_PX_PER_S = 50
const CLICK_GUARD_MS = 400
const BOTTOM_EPSILON_PX = 10
const SCROLL_DEVIATION_PX = 2
// Typing fields pause the drift (no toggle) so the page stays still while
// the user enters text. Everything else toggles.
const TYPING_SELECTOR = 'input, textarea, select, [contenteditable="true"]'
// Clicks on functional controls marked with this attribute never touch the
// scroll state (e.g. the floating music toggle).
const IGNORE_SELECTOR = '[data-autoscroll-ignore]'

export default function useAutoScroll(active: boolean) {
  useEffect(() => {
    if (!active) return

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    let raf = 0
    let timer = 0
    let anchor = 0 // performance.now() at which scrollY was 0
    let lastWritten = 0 // scroll position our loop last wrote
    let paused = false
    let done = false
    let lastClick = 0

    function finish() {
      done = true
      cancelAnimationFrame(raf)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('click', onClick)
      window.removeEventListener('scroll', onScroll)
    }

    const setPaused = (value: boolean) => {
      if (done || paused === value) return
      paused = value
      if (paused) return
      // Re-anchor the elapsed-time math so the drift resumes from the
      // current position without a jump (original: resume()).
      lastWritten = window.scrollY
      anchor = performance.now() - (window.scrollY * 1000) / SPEED_PX_PER_S
    }

    const onWheel = (e: WheelEvent) => {
      if (done || paused) return
      if (Math.abs(e.deltaY) > 0) setPaused(true)
      void e
    }

    const onScroll = () => {
      // Our own rAF writes land within a fraction of a pixel of lastWritten;
      // a larger deviation means the user scrolled (swipe/scrollbar).
      if (!paused && Math.abs(window.scrollY - lastWritten) > SCROLL_DEVIATION_PX) {
        // eslint-disable-next-line no-console -- temporary diagnosis
        console.log('[autoscroll] scroll-deviation pause', {
          y: Math.round(window.scrollY),
          lastWritten: Math.round(lastWritten),
        })
        setPaused(true)
      }
    }

    const onClick = (e: MouseEvent) => {
      if (done) return
      const target = e.target as HTMLElement | null
      // Functional controls marked data-autoscroll-ignore never touch the
      // scroll state (e.g. the floating music toggle).
      const ignored = !!target?.closest(IGNORE_SELECTOR)
      const typing = !!target?.closest(TYPING_SELECTOR)
      // eslint-disable-next-line no-console -- temporary diagnosis
      console.log('[autoscroll] click', {
        tag: target?.tagName,
        cls: target?.className?.toString?.().slice(0, 50),
        ignored,
        typing,
        paused,
        y: Math.round(window.scrollY),
      })
      if (ignored) return
      // Typing fields pause the drift (no toggle).
      if (typing) {
        setPaused(true)
        return
      }
      // Everything else: toggle pause/resume.
      const now = Date.now()
      if (now - lastClick < CLICK_GUARD_MS) return
      lastClick = now
      setPaused(!paused)
    }

    const step = (now: number) => {
      if (done) return
      if (!paused) {
        const target = ((now - anchor) / 1000) * SPEED_PX_PER_S
        const max = document.documentElement.scrollHeight - window.innerHeight
        const clamped = Math.min(target, max)
        lastWritten = clamped
        window.scrollTo(0, clamped)
        // iOS Safari fallback (original does the same)
        if (Math.abs(window.scrollY - clamped) > 2) {
          document.documentElement.scrollTop = clamped
          document.body.scrollTop = clamped
        }
        // max is a scroll offset, so compare scrollY (offset) against it directly —
        // NOT scrollY + innerHeight (that mixes the viewport-bottom edge with an
        // offset and stops a full viewport early, e.g. at the RSVP section).
        if (window.scrollY >= max - BOTTOM_EPSILON_PX) {
          finish()
          return
        }
      }
      raf = requestAnimationFrame(step)
    }

    timer = window.setTimeout(() => {
      anchor = performance.now()
      lastWritten = window.scrollY
      raf = requestAnimationFrame(step)
    }, START_DELAY_MS)

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('click', onClick)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.clearTimeout(timer)
      finish()
    }
  }, [active])
}
