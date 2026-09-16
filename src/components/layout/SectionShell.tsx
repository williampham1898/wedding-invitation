import type { ReactNode } from 'react'
import Container from './Container'

interface SectionShellProps {
  id: string
  children: ReactNode
  bg?: 'surface' | 'soft' | 'gradient' | 'dark' | 'none'
  className?: string
}

const bgMap = {
  surface: 'bg-surface',
  soft: 'bg-soft',
  gradient: 'bg-gradient-to-b from-soft to-surface',
  dark: 'bg-gradient-to-b from-primary-deep to-primary-light',
  none: '',
}

export default function SectionShell({
  id,
  children,
  bg = 'surface',
  className = '',
}: SectionShellProps) {
  return (
    <section id={id} className={`relative py-section ${bgMap[bg]} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
