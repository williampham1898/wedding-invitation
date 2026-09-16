import { withBase } from '../../lib/withBase'
import type { SectionProps } from '../../types'
import SectionShell from '../layout/SectionShell'
import Reveal from '../ui/Reveal'

const ASSETS = () => withBase('/images/themes/chateau-blue')

export default function ThankYou({ data }: SectionProps) {
  return (
    <SectionShell id="thank-you" bg="dark" className="text-center">
      <Reveal>
        <div className="flex justify-center">
          <img
            src={`${ASSETS()}/chim.webp`}
            alt=""
            aria-hidden
            loading="lazy"
            className="w-[480px] md:w-[680px] max-w-full object-contain"
          />
        </div>
        <p className="font-script text-4xl sm:text-5xl text-white/90 mb-6">Cảm ơn</p>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-white" />
          <span className="text-sm text-white opacity-70" aria-hidden>
            ❦
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-white" />
        </div>
        <p className="mt-6 text-body text-white/85 max-w-md mx-auto">{data.thankYou.note}</p>
      </Reveal>
    </SectionShell>
  )
}
