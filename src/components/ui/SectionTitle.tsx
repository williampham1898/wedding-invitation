interface SectionTitleProps {
  children: string
  className?: string
}

export default function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2
      className={`font-heading text-section-title text-primary text-center leading-tight ${className}`}
    >
      {children}
    </h2>
  )
}
