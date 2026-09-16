import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline'
  children: ReactNode
}

export default function Button({
  variant = 'solid',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const base =
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-2.5 text-lg font-semibold transition-shadow duration-300 cursor-pointer select-none'
  const styles =
    variant === 'solid'
      ? 'bg-primary text-white shadow-button hover:shadow-button-hover'
      : 'border border-primary text-primary bg-transparent'
  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
      {variant === 'solid' && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_3s_ease-in-out_infinite]"
        />
      )}
    </button>
  )
}
