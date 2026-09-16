export default function OrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary" />
      <span className="text-sm text-primary opacity-70">❦</span>
      <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary" />
    </div>
  )
}
