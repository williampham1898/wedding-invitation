import type { FormEvent } from 'react'
import { useState } from 'react'
import { uuid } from '../../lib/uuid'
import type { SectionProps } from '../../types'
import SectionShell from '../layout/SectionShell'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

interface Wish {
  id: string
  name: string
  wish: string
}

export default function Guestbook({ data }: SectionProps) {
  const [wishes, setWishes] = useState<Wish[]>(() =>
    (data.guestbook?.seedWishes ?? []).map((w) => ({ id: uuid(), ...w })),
  )
  const [name, setName] = useState('')
  const [wish, setWish] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)

  if (!data.guestbook?.show) return null
  const guestbook = data.guestbook

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !wish.trim()) {
      setError(guestbook.formError)
      return
    }
    setSubmitting(true)
    setError('')
    setSaved(false)
    // Stub: in-memory only, brief delay to simulate submission
    setTimeout(() => {
      setWishes((w) => [{ id: uuid(), name: name.trim(), wish: wish.trim() }, ...w])
      setName('')
      setWish('')
      setSubmitting(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 600)
  }

  return (
    <SectionShell id="guestbook" bg="surface">
      <Reveal>
        <SectionTitle>{guestbook.title}</SectionTitle>
      </Reveal>
      <Reveal delay={100}>
        <form
          onSubmit={submit}
          className="mt-8 mx-auto max-w-sm space-y-4 rounded-2xl border p-6"
          style={{ borderColor: '#12346733' }}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={guestbook.namePlaceholder}
            className="w-full rounded-card border px-4 py-2.5 outline-none focus:border-primary/50"
            style={{ borderColor: '#12346766', backgroundColor: 'transparent' }}
          />
          <textarea
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder={guestbook.wishPlaceholder}
            rows={3}
            className="w-full rounded-card border px-4 py-2.5 outline-none focus:border-primary/50 resize-none"
            style={{ borderColor: '#12346766', backgroundColor: 'transparent' }}
          />
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
          <div className="flex justify-center">
            <Button type="submit" disabled={submitting}>
              {submitting ? guestbook.submittingLabel : guestbook.submitLabel}
            </Button>
          </div>
        </form>
      </Reveal>
      {saved && (
        <p className="text-center text-sm text-primary" aria-live="polite">
          {guestbook.savedText}
        </p>
      )}
      <div className="mt-10 mx-auto max-w-sm space-y-4">
        {wishes.length === 0 && (
          <p className="text-center text-body opacity-70">{guestbook.noWishesText}</p>
        )}
        {wishes.map((entry, i) => (
          <Reveal key={entry.id} delay={Math.min(i, 3) * 80}>
            <div className="rounded-card bg-soft p-4">
              <div className="font-heading text-lg text-primary">{entry.name}</div>
              <p className="mt-1 text-body">{entry.wish}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
