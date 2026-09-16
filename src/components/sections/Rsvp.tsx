import type { FormEvent } from 'react'
import { useState } from 'react'
import type { SectionProps } from '../../types'
import SectionShell from '../layout/SectionShell'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

interface FormState {
  name: string
  attending: 'yes' | 'no' | ''
  guests: number
  answers: Record<string, string>
}

const initialForm: FormState = { name: '', attending: '', guests: 1, answers: {} }

export default function Rsvp({ data }: SectionProps) {
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
      console.warn('rsvp.endpoint is empty; RSVP submissions are not persisted')
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
          guests: form.attending === 'yes' ? form.guests : undefined,
          answers: rsvp.questions.map((q) => ({
            question: q.label,
            answer:
              q.type === 'choice'
                ? (form.answers[q.id] ?? '')
                : form.answers[q.id] === 'yes'
                  ? 'Có'
                  : form.answers[q.id] === 'no'
                    ? 'Không'
                    : '',
          })),
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

  if (submitted) {
    return (
      <SectionShell id="rsvp" bg="soft">
        <Reveal>
          <SectionTitle className="!text-primary">{`Cảm ơn, ${form.name}!`}</SectionTitle>
          <p className="mt-4 text-center text-text">
            {form.attending === 'yes'
              ? 'Rất mong được đón tiếp bạn trong ngày vui của chúng tôi.'
              : 'Cảm ơn bạn đã báo tin — chúng tôi sẽ nhớ đến bạn.'}
          </p>
        </Reveal>
      </SectionShell>
    )
  }

  return (
    <SectionShell id="rsvp" bg="soft">
      <Reveal>
        <SectionTitle className="!text-primary">{rsvp.buttonLabel}</SectionTitle>
      </Reveal>
      <Reveal delay={100}>
        <form onSubmit={handleSubmit} className="mt-8 mx-auto max-w-sm space-y-5">
          <div>
            <label htmlFor="rsvp-name" className="block text-sm text-text mb-1">
              Tên của bạn*
            </label>
            <input
              id="rsvp-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-card border border-primary/30 bg-white/70 px-4 py-2.5 text-primary placeholder-primary/40 outline-none focus:border-primary/60"
              placeholder="Tên của bạn"
            />
          </div>

          <div>
            <span className="block text-sm text-text mb-2">{rsvp.attendLabel}</span>
            <div className="flex gap-3">
              {(['yes', 'no'] as const).map((choice) => (
                <label
                  key={choice}
                  className={`flex-1 cursor-pointer rounded-card border px-4 py-2.5 text-center text-sm capitalize ${
                    form.attending === choice
                      ? 'border-primary bg-primary text-white'
                      : 'border-primary/30 bg-white/70 text-primary'
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value={choice}
                    checked={form.attending === choice}
                    onChange={() => setForm({ ...form, attending: choice })}
                    className="sr-only"
                  />
                  {choice === 'yes' ? rsvp.acceptLabel : rsvp.declineLabel}
                </label>
              ))}
            </div>
          </div>

          {form.attending === 'yes' && (
            <div>
              <label htmlFor="rsvp-guests" className="block text-sm text-text mb-1">
                Số lượng khách
              </label>
              <select
                id="rsvp-guests"
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                className="w-full rounded-card border border-primary/30 bg-white/70 px-4 py-2.5 text-primary outline-none focus:border-primary/60"
              >
                {Array.from({ length: rsvp.maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          )}

          {rsvp.questions.map((question) =>
            question.type === 'choice' ? (
              <div key={question.id}>
                <span className="block text-sm text-text mb-2">{question.label}</span>
                <div className="flex gap-3">
                  {(question.options ?? []).map((option) => (
                    <label
                      key={option}
                      className={`flex-1 cursor-pointer rounded-card border px-4 py-2 text-center text-sm ${
                        form.answers[question.id] === option
                          ? 'border-primary bg-primary text-white'
                          : 'border-primary/30 bg-white/70 text-primary'
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={form.answers[question.id] === option}
                        onChange={() =>
                          setForm({
                            ...form,
                            answers: { ...form.answers, [question.id]: option },
                          })
                        }
                        className="sr-only"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div key={question.id}>
                <span className="block text-sm text-text mb-2">{question.label}</span>
                <div className="flex gap-3">
                  {(['yes', 'no'] as const).map((choice) => (
                    <label
                      key={choice}
                      className={`flex-1 cursor-pointer rounded-card border px-4 py-2 text-center text-sm capitalize ${
                        form.answers[question.id] === choice
                          ? 'border-primary bg-primary text-white'
                          : 'border-primary/30 bg-white/70 text-primary'
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={choice}
                        checked={form.answers[question.id] === choice}
                        onChange={() =>
                          setForm({
                            ...form,
                            answers: { ...form.answers, [question.id]: choice },
                          })
                        }
                        className="sr-only"
                      />
                      {choice === 'yes' ? 'Có' : 'Không'}
                    </label>
                  ))}
                </div>
              </div>
            ),
          )}

          {error && (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex justify-center pt-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Đang gửi...' : rsvp.buttonLabel}
            </Button>
          </div>
        </form>
      </Reveal>
    </SectionShell>
  )
}
