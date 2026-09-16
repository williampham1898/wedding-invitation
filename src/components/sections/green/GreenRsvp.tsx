import type { FormEvent } from 'react'
import { useState } from 'react'
import type { SectionProps } from '../../../types'
import { GREEN } from './theme'

interface FormState {
  name: string
  attending: 'yes' | 'no' | ''
  wish: string
}

const initialForm: FormState = { name: '', attending: '', wish: '' }

const fieldClass =
  'w-full rounded-md border bg-white/75 px-4 py-2.5 outline-none placeholder:opacity-50'
const fieldStyle = {
  borderColor: `${GREEN.sage}55`,
  color: GREEN.inkDeep,
  fontFamily: 'var(--font-serif-alt)',
}

function Choice({
  selected,
  children,
}: {
  selected: boolean
  children: string
}) {
  return (
    <span
      className="flex-1 cursor-pointer rounded-md border px-3 py-2.5 text-center text-sm"
      style={{
        fontFamily: 'var(--font-serif-alt)',
        borderColor: selected ? GREEN.sageDeep : `${GREEN.sage}55`,
        backgroundColor: selected ? GREEN.sageDeep : 'rgba(255,255,255,0.75)',
        color: selected ? '#fff' : GREEN.inkDeep,
      }}
    >
      {children}
    </span>
  )
}

export default function GreenRsvp({ data }: SectionProps) {
  const [form, setForm] = useState<FormState>(initialForm)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!data.rsvp?.show) return null
  const rsvp = data.rsvp

  const handleSubmit = async (e: FormEvent) => {
    if (submitting) return
    e.preventDefault()
    if (!form.name.trim()) {
      setError(rsvp.nameError)
      return
    }
    if (!form.attending) {
      setError(rsvp.attendError)
      return
    }
    setError('')
    if (!rsvp.endpoint) {
      setSubmitted(true)
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch(rsvp.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: form.name.trim(),
          attending: form.attending,
          wish: form.wish.trim(),
          event: data.event.title,
          answers: form.wish.trim()
            ? [{ question: rsvp.wishLabel, answer: form.wish.trim() }]
            : [],
        }),
      })
      const json = (await res.json()) as { ok?: boolean }
      if (!res.ok || !json.ok) throw new Error('submit failed')
      setSubmitted(true)
    } catch {
      setError(rsvp.submitError)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="rsvp"
      className="relative w-full overflow-hidden px-5 py-12 md:px-10 md:py-16"
      style={{ background: GREEN.paperBg, color: GREEN.ink }}
    >
      {submitted ? (
        <div className="text-center">
          <h2
            className="font-script leading-none"
            style={{ fontSize: 'clamp(2.25rem, 9vw, 3.25rem)', color: GREEN.sage }}
          >
            Cảm ơn, {form.name}!
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-[15px] md:text-[17px]" style={{ fontFamily: 'var(--font-serif-alt)' }}>
            {form.attending === 'yes'
              ? 'Rất mong được đón tiếp bạn trong ngày vui của chúng tôi.'
              : 'Cảm ơn bạn đã báo tin — chúng tôi sẽ nhớ đến bạn.'}
          </p>
        </div>
      ) : (
        <>
          <h2
            className="text-center font-script leading-none"
            style={{ fontSize: 'clamp(2.25rem, 9vw, 3.25rem)', color: GREEN.sage }}
          >
            {rsvp.buttonLabel}
          </h2>
          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-sm space-y-5">
            <div>
              <label
                htmlFor="green-rsvp-name"
                className="mb-1 block text-sm"
                style={{ fontFamily: 'var(--font-serif-alt)' }}
              >
                Tên của bạn*
              </label>
              <input
                id="green-rsvp-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={fieldClass}
                style={fieldStyle}
                placeholder="Tên của bạn"
              />
            </div>

            <div>
              <span className="mb-2 block text-sm" style={{ fontFamily: 'var(--font-serif-alt)' }}>
                {rsvp.attendLabel}
              </span>
              <div className="flex gap-3">
                {(['yes', 'no'] as const).map((choice) => (
                  <label key={choice} className="flex flex-1">
                    <input
                      type="radio"
                      name="attending"
                      value={choice}
                      checked={form.attending === choice}
                      onChange={() => setForm({ ...form, attending: choice })}
                      className="sr-only"
                    />
                    <Choice selected={form.attending === choice}>
                      {choice === 'yes' ? rsvp.acceptLabel : rsvp.declineLabel}
                    </Choice>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="green-rsvp-wish"
                className="mb-1 block text-sm"
                style={{ fontFamily: 'var(--font-serif-alt)' }}
              >
                {rsvp.wishLabel}
              </label>
              <textarea
                id="green-rsvp-wish"
                value={form.wish}
                onChange={(e) => setForm({ ...form, wish: e.target.value })}
                rows={4}
                placeholder={rsvp.wishPlaceholder}
                className={`${fieldClass} resize-y min-h-[6.5rem]`}
                style={fieldStyle}
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="cursor-pointer rounded-full px-8 py-2.5 text-base font-semibold text-white disabled:opacity-60"
                style={{
                  backgroundColor: GREEN.sageDeep,
                  fontFamily: 'var(--font-serif-alt)',
                  boxShadow: '0 4px 14px rgba(90, 102, 64, 0.35)',
                }}
              >
                {submitting ? 'Đang gửi...' : rsvp.buttonLabel}
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  )
}
