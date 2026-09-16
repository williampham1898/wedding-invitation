import { useCallback, useEffect, useRef, useState } from 'react'

export default function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [src])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (playing) pause()
    else void play()
  }, [playing, play, pause])

  return { audioRef, playing, play, pause, toggle }
}
