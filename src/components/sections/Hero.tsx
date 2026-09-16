import useParallax from '../../hooks/useParallax'
import { withBase } from '../../lib/withBase'
import type { SectionProps } from '../../types'

const ASSETS = () => withBase('/images/themes/chateau-blue')

export default function Hero({ data }: SectionProps) {
  const ref = useParallax()
  const { groom, bride, brideFirst } = data.couple
  const [first, second] = brideFirst ? [bride, groom] : [groom, bride]

  return (
    <section className="relative isolate w-full" id="hero">
      <header className="relative z-20 flex w-full flex-col items-center px-4 sm:px-5 pt-[80px] md:pt-[110px] pb-6 md:pb-10">
        <img
          src={`${ASSETS()}/asset-2.webp`}
          alt=""
          aria-hidden
          className="relative z-30 mb-3 md:mb-4 h-[32px] md:h-[38px] w-auto object-contain opacity-95"
          loading="eager"
          decoding="async"
        />
        <div className="relative z-30 flex items-center justify-center gap-3 md:gap-4">
          <img
            src={`${ASSETS()}/asset-1.webp`}
            alt=""
            aria-hidden
            className="h-auto w-[56px] md:w-[80px] object-contain opacity-90"
          />
          <p className="font-welcome uppercase text-center text-[15px] md:text-[20px] tracking-[0.02em] whitespace-pre font-bold text-primary">
            {data.hero.welcomeText}
          </p>
          <img
            src={`${ASSETS()}/asset-1.webp`}
            alt=""
            aria-hidden
            className="h-auto w-[56px] md:w-[80px] object-contain opacity-90 scale-x-[-1]"
          />
        </div>
        <div className="relative z-30 mt-14 md:mt-20 flex flex-col items-center text-center leading-none font-heading uppercase text-primary">
          <span
            style={{ fontSize: 'clamp(38px, 9vw, 70px)', lineHeight: 1.3, paddingTop: '0.18em' }}
          >
            {first.shortName}
          </span>
          <span
            className="my-6 md:my-8 font-script"
            style={{
              fontSize: 'clamp(20px, 4.5vw, 32px)',
              textTransform: 'none',
              lineHeight: 1,
              opacity: 0.95,
            }}
          >
            &
          </span>
          <span
            style={{ fontSize: 'clamp(38px, 9vw, 70px)', lineHeight: 1.3, paddingTop: '0.18em' }}
          >
            {second.shortName}
          </span>
        </div>
        <div className="relative mt-6 md:mt-10 shrink-0 w-full flex justify-center">
          <img
            ref={ref(-0.05, 'translateX({y})')}
            src={`${ASSETS()}/cloud-3.webp`}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -top-[35%] left-[2%] w-[100%] h-auto object-contain z-0 opacity-70 max-w-none"
            style={{ willChange: 'transform' }}
            loading="eager"
            decoding="async"
          />
          <img
            ref={ref(0.08, 'translateX({y})')}
            src={`${ASSETS()}/cloud-1.webp`}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -top-[50%] right-[-28%] w-[100%] h-auto object-contain z-0 opacity-90 max-w-none"
            style={{ willChange: 'transform' }}
            loading="eager"
            decoding="async"
          />
          <img
            ref={ref(-0.18, 'translateX({y})')}
            src={`${ASSETS()}/cloud-2.webp`}
            alt=""
            aria-hidden
            className="pointer-events-none absolute top-[5%] -left-[5%] w-[90%] h-auto object-contain z-0 opacity-90 max-w-none"
            style={{ willChange: 'transform' }}
            loading="eager"
            decoding="async"
          />
          <img
            src={`${ASSETS()}/home.webp`}
            alt="Wedding mansion"
            className="relative block h-auto w-[560px] md:w-[1200px] max-w-none object-contain z-10"
            loading="eager"
            decoding="async"
          />
        </div>
      </header>
    </section>
  )
}
