import { useEffect } from 'react'
import useAudio from '../hooks/useAudio'

interface MusicPlayerProps {
  src: string
  autoPlaySignal: boolean
}

export default function MusicPlayer({ src, autoPlaySignal }: MusicPlayerProps) {
  const { playing, play, toggle } = useAudio(src)

  useEffect(() => {
    if (autoPlaySignal) void play()
  }, [autoPlaySignal, play])

  return (
    <button
      type="button"
      onClick={toggle}
      data-autoscroll-ignore
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-player transition-transform hover:scale-105 cursor-pointer"
    >
      {playing ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
          <path d="M8 5h3v14H8zM13 5h3v14h-3z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
      {playing && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full animate-ping bg-primary opacity-20"
        />
      )}
    </button>
  )
}
