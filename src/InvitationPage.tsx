import { useEffect, useState } from 'react'
import MusicPlayer from './components/MusicPlayer'
import Envelope from './components/sections/Envelope'
import EnvelopeCover from './components/sections/EnvelopeCover'
import GreenCalendar from './components/sections/green/GreenCalendar'
import GreenCountdown from './components/sections/green/GreenCountdown'
import GreenFamily from './components/sections/green/GreenFamily'
import GreenGallery from './components/sections/green/GreenGallery'
import GreenInvite from './components/sections/green/GreenInvite'
import GreenLoveQuote from './components/sections/green/GreenLoveQuote'
import GreenOurStory from './components/sections/green/GreenOurStory'
import GreenRsvp from './components/sections/green/GreenRsvp'
import GreenThankYou from './components/sections/green/GreenThankYou'
import GreenTimeline from './components/sections/green/GreenTimeline'
import FlowerBackground from './components/ui/FlowerBackground'
import useAutoScroll from './hooks/useAutoScroll'
import type { InvitationData } from './types'

export default function InvitationPage({ data }: { data: InvitationData }) {
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  useAutoScroll(envelopeOpen)

  useEffect(() => {
    document.title = `${data.site.title} — ${data.event.title}`
  }, [data.event.title, data.site.title])

  useEffect(() => {
    if (envelopeOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [envelopeOpen])

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="flex w-full justify-center overflow-x-clip bg-white">
        <div
          className="relative w-full max-w-[480px] md:max-w-[900px] md:mx-auto isolate !overflow-visible md:!overflow-hidden md:border md:border-[#12346722]"
          style={{ backgroundColor: '#FFFFFF', color: '#123467' }}
        >
          <FlowerBackground />
          <EnvelopeCover data={data} />
          <GreenFamily data={data} />
          <GreenInvite data={data} />
          <GreenTimeline data={data} />
          <GreenLoveQuote data={data} />
          <GreenOurStory data={data} />
          <GreenCalendar data={data} />
          <GreenCountdown data={data} />
          <GreenGallery data={data} />
          <GreenRsvp data={data} />
          <GreenThankYou data={data} />
        </div>
      </div>
      <Envelope data={data} open={envelopeOpen} onOpen={() => setEnvelopeOpen(true)} />
      {envelopeOpen && <MusicPlayer src={data.music.src} autoPlaySignal={envelopeOpen} />}
    </main>
  )
}
