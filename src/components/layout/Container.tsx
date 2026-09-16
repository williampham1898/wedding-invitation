import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export default function Container({ children, className = '' }: ContainerProps) {
  return <div className={`w-full px-3 md:px-6 ${className}`}>{children}</div>
}
