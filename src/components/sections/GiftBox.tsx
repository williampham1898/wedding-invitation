import { useState } from 'react'
import { copyText } from '../../lib/clipboard'
import { withBase } from '../../lib/withBase'
import type { SectionProps } from '../../types'
import SectionShell from '../layout/SectionShell'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

export default function GiftBox({ data }: SectionProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = async (index: number, value: string) => {
    const ok = await copyText(value)
    if (ok) {
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex((cur) => (cur === index ? null : cur)), 2000)
    }
  }

  return (
    <SectionShell id="gift" bg="surface">
      <Reveal>
        <SectionTitle>{data.gift.title}</SectionTitle>
        <img
          src={withBase('/images/themes/chateau-blue/giftbox.png')}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="mx-auto mt-4 h-36 w-auto object-contain"
        />
        <p className="mt-4 text-center text-body whitespace-pre-line">{data.gift.thankYou}</p>
      </Reveal>
      {data.gift.qrCodes && data.gift.qrCodes.length > 0 && (
        <Reveal delay={100}>
          <div className="mt-8 mx-auto grid max-w-md grid-cols-1 gap-4 sm:max-w-lg sm:grid-cols-2 md:max-w-2xl">
            {data.gift.qrCodes.map((qr) => (
              <div
                key={qr.image}
                className="rounded-xl border border-[#12346733] bg-white/60 p-4 text-center"
              >
                <div className="text-sm uppercase tracking-widest text-primary/70">{qr.label}</div>
                <img
                  src={qr.image}
                  alt={`Mã QR chuyển khoản — ${qr.label}`}
                  className="mx-auto mt-3 h-40 w-40 md:h-[200px] md:w-[200px] rounded-lg object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </Reveal>
      )}
      {data.gift.accounts.length > 0 && (
        <Reveal delay={100}>
          <div className="mt-8 mx-auto max-w-sm space-y-3">
            {data.gift.accounts.map((account, i) => (
              <button
                key={account.accountNumber}
                type="button"
                onClick={() => handleCopy(i, account.iban ?? account.accountNumber)}
                className="w-full rounded-xl border border-[#12346733] bg-transparent p-4 text-center transition-opacity hover:opacity-90 cursor-pointer"
                aria-label={`Copy ${account.bank} account number`}
              >
                <div className="text-sm uppercase tracking-widest text-primary/70">
                  {account.bank}
                </div>
                <div className="mt-1 font-heading text-lg text-primary">{account.accountName}</div>
                <div className="mt-1 text-body tabular-nums">{account.accountNumber}</div>
                <div aria-live="polite" className="mt-2 h-4 text-xs text-primary font-medium">
                  {copiedIndex === i ? 'Copied!' : ''}
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      )}
    </SectionShell>
  )
}
