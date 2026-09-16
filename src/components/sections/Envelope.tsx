import { useEffect, useRef, useState } from 'react'
import type { InvitationData } from '../../types'
import EnvelopeCover, { PAPER_BG } from './EnvelopeCover'

interface EnvelopeProps {
  data: InvitationData
  open: boolean
  onOpen: () => void
}

// Polaroids rise ~1.2s, flowers bloom through ~1.8s, overlay fades after.
const REVEAL_DELAY_MS = 2600
const REDUCED_MOTION_DELAY_MS = 120

export default function Envelope({ data, open, onOpen }: EnvelopeProps) {
  const [opened, setOpened] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const handleOpen = () => {
    if (opened) return
    setOpened(true)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timer.current = window.setTimeout(onOpen, reduced ? REDUCED_MOTION_DELAY_MS : REVEAL_DELAY_MS)
  }

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <div
      aria-hidden={open}
      inert={open}
      className={`fixed inset-0 z-50 overflow-hidden transition-[opacity,visibility] duration-700 ${
        open ? 'pointer-events-none opacity-0 invisible' : 'opacity-100'
      }`}
      style={{ background: PAPER_BG }}
    >
      <div
        className={`flex h-full w-full justify-center overflow-x-clip outline-none ${opened ? '' : 'cursor-pointer'} focus-visible:ring-2 focus-visible:ring-[#5c5346]/30 focus-visible:ring-inset`}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleOpen()
          }
        }}
        role="button"
        tabIndex={opened ? -1 : 0}
        aria-label={data.envelope.openButton}
      >
        <div className="relative w-full max-w-[480px] md:max-w-[900px]">
          <EnvelopeCover
            data={data}
            stage={opened ? 'opening' : 'closed'}
            showCta
          />
        </div>
      </div>
    </div>
  )
}
