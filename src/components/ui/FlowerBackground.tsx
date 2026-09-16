import useParallax from '../../hooks/useParallax'
import { withBase } from '../../lib/withBase'

const FLOWER = withBase('/images/themes/chateau-blue/hoa.webp')

// Page-level watermark; the other two hoa.webp instances are anchored
// inside their own sections (ReceptionInfo).
export default function FlowerBackground() {
  const ref1 = useParallax()

  return (
    <img
      ref={ref1(0.08)}
      src={FLOWER}
      alt=""
      aria-hidden
      className="pointer-events-none absolute top-[640px] md:top-[760px] -left-[25%] md:-left-[15%] h-[900px] md:h-[1400px] w-auto max-w-none object-contain opacity-[0.15] -z-10"
      style={{ willChange: 'transform' }}
      loading="eager"
      decoding="async"
    />
  )
}
