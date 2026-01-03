import { useCallback, useRef } from 'react'

// Web Audio API-based 8-bit sound generator
export const useSoundEffects = () => {
  const audioContextRef = useRef(null)

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioContextRef.current
  }

  const playTone = useCallback((frequency, duration, type = 'square', volume = 0.3) => {
    try {
      const ctx = getAudioContext()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.value = frequency
      oscillator.type = type

      gainNode.gain.setValueAtTime(volume, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + duration)
    } catch (e) {
      // Audio not supported
    }
  }, [])

  const playClick = useCallback(() => {
    playTone(800, 0.1, 'square', 0.2)
  }, [playTone])

  const playCoin = useCallback(() => {
    const ctx = getAudioContext()
    playTone(988, 0.1, 'square', 0.3)
    setTimeout(() => playTone(1319, 0.3, 'square', 0.3), 100)
  }, [playTone])

  const playPowerUp = useCallback(() => {
    const frequencies = [523, 659, 784, 1047]
    frequencies.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.15, 'square', 0.25), i * 80)
    })
  }, [playTone])

  const playJump = useCallback(() => {
    const ctx = getAudioContext()
    try {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      oscillator.type = 'square'
      oscillator.frequency.setValueAtTime(150, ctx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1)
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.15)
    } catch (e) {}
  }, [])

  const playSuccess = useCallback(() => {
    const notes = [523, 659, 784, 1047, 1319]
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.2, 'square', 0.2), i * 100)
    })
  }, [playTone])

  const playError = useCallback(() => {
    playTone(200, 0.3, 'sawtooth', 0.3)
  }, [playTone])

  const playHover = useCallback(() => {
    playTone(440, 0.05, 'square', 0.1)
  }, [playTone])

  const playSelect = useCallback(() => {
    playTone(660, 0.08, 'square', 0.15)
    setTimeout(() => playTone(880, 0.08, 'square', 0.15), 50)
  }, [playTone])

  const playKonami = useCallback(() => {
    const melody = [
      { freq: 659, dur: 0.15 },
      { freq: 659, dur: 0.15 },
      { freq: 659, dur: 0.15 },
      { freq: 523, dur: 0.15 },
      { freq: 659, dur: 0.3 },
      { freq: 784, dur: 0.3 },
      { freq: 392, dur: 0.3 },
    ]
    melody.forEach((note, i) => {
      setTimeout(() => playTone(note.freq, note.dur, 'square', 0.3), i * 150)
    })
  }, [playTone])

  return {
    playClick,
    playCoin,
    playPowerUp,
    playJump,
    playSuccess,
    playError,
    playHover,
    playSelect,
    playKonami,
    playTone
  }
}

export default useSoundEffects
