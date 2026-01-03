import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'

// Simple chiptune generator using Web Audio API
const useChiptune = () => {
  const audioContextRef = useRef(null)
  const gainNodeRef = useRef(null)
  const isPlayingRef = useRef(false)
  const timeoutIdsRef = useRef([])

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      gainNodeRef.current = audioContextRef.current.createGain()
      gainNodeRef.current.connect(audioContextRef.current.destination)
      gainNodeRef.current.gain.value = 0.15
    }
    return audioContextRef.current
  }

  const playNote = useCallback((frequency, startTime, duration, type = 'square') => {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const noteGain = ctx.createGain()

    oscillator.connect(noteGain)
    noteGain.connect(gainNodeRef.current)

    oscillator.frequency.value = frequency
    oscillator.type = type

    noteGain.gain.setValueAtTime(0.3, startTime)
    noteGain.gain.exponentialRampToValueAtTime(0.01, startTime + duration - 0.05)

    oscillator.start(startTime)
    oscillator.stop(startTime + duration)
  }, [])

  const melody = [
    // Simple catchy 8-bit loop
    { note: 'E5', dur: 0.25 }, { note: 'E5', dur: 0.25 }, { note: 'R', dur: 0.25 }, { note: 'E5', dur: 0.25 },
    { note: 'R', dur: 0.25 }, { note: 'C5', dur: 0.25 }, { note: 'E5', dur: 0.5 },
    { note: 'G5', dur: 0.5 }, { note: 'R', dur: 0.5 }, { note: 'G4', dur: 0.5 },
    { note: 'R', dur: 0.5 }, { note: 'C5', dur: 0.375 }, { note: 'R', dur: 0.125 }, { note: 'G4', dur: 0.375 },
    { note: 'R', dur: 0.375 }, { note: 'E4', dur: 0.375 }, { note: 'R', dur: 0.125 },
    { note: 'A4', dur: 0.25 }, { note: 'R', dur: 0.25 }, { note: 'B4', dur: 0.25 }, { note: 'R', dur: 0.25 },
    { note: 'Bb4', dur: 0.25 }, { note: 'A4', dur: 0.5 },
    { note: 'G4', dur: 0.33 }, { note: 'E5', dur: 0.33 }, { note: 'G5', dur: 0.33 },
    { note: 'A5', dur: 0.5 }, { note: 'F5', dur: 0.25 }, { note: 'G5', dur: 0.25 },
    { note: 'R', dur: 0.25 }, { note: 'E5', dur: 0.25 }, { note: 'R', dur: 0.25 },
    { note: 'C5', dur: 0.25 }, { note: 'D5', dur: 0.25 }, { note: 'B4', dur: 0.375 },
  ]

  const noteFrequencies = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00,
    'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99,
    'A5': 880.00, 'B5': 987.77, 'R': 0
  }

  const playMelody = useCallback(() => {
    if (!isPlayingRef.current) return

    const ctx = getAudioContext()
    let time = ctx.currentTime + 0.1

    melody.forEach(({ note, dur }) => {
      if (note !== 'R' && noteFrequencies[note]) {
        playNote(noteFrequencies[note], time, dur * 0.9)
      }
      time += dur * 0.5
    })

    const loopDuration = melody.reduce((acc, { dur }) => acc + dur * 0.5, 0) * 1000
    const timeoutId = setTimeout(() => {
      if (isPlayingRef.current) {
        playMelody()
      }
    }, loopDuration)

    timeoutIdsRef.current.push(timeoutId)
  }, [melody, playNote])

  const start = useCallback(() => {
    isPlayingRef.current = true
    playMelody()
  }, [playMelody])

  const stop = useCallback(() => {
    isPlayingRef.current = false
    timeoutIdsRef.current.forEach(id => clearTimeout(id))
    timeoutIdsRef.current = []
  }, [])

  return { start, stop }
}

const MusicPlayer = () => {
  const { musicPlaying, toggleMusic, playSound } = useGame()
  const [expanded, setExpanded] = useState(false)
  const chiptune = useChiptune()

  useEffect(() => {
    if (musicPlaying) {
      chiptune.start()
    } else {
      chiptune.stop()
    }
    return () => chiptune.stop()
  }, [musicPlaying, chiptune])

  const handleToggle = () => {
    playSound('playSelect')
    toggleMusic()
  }

  return (
    <motion.div
      className="music-player"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <motion.button
        className="music-toggle"
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <motion.span
          animate={musicPlaying ? {
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {musicPlaying ? '🎵' : '🔇'}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="music-label"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            {musicPlaying ? 'MUSIC ON' : 'MUSIC OFF'}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default MusicPlayer
