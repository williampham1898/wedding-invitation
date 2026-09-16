import type { ReactNode } from 'react'
import useReveal from '../../hooks/useReveal'

interface RevealProps {
  children: ReactNode
  delay?: number // ms
  className?: string
}

export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`transition-all duration-[var(--duration-reveal)] ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
