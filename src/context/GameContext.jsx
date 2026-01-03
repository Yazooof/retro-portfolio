import { createContext, useContext, useState, useCallback } from 'react'
import { useKonamiCode } from '../hooks/useKonamiCode'
import { useSoundEffects } from '../hooks/useSoundEffects'

const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const [partyMode, setPartyMode] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [achievements, setAchievements] = useState([])
  const [visitorCount] = useState(() => Math.floor(Math.random() * 9000) + 1000)

  const sounds = useSoundEffects()

  const playSound = useCallback((soundName) => {
    if (soundEnabled && sounds[soundName]) {
      sounds[soundName]()
    }
  }, [soundEnabled, sounds])

  const unlockAchievement = useCallback((id, title, description) => {
    if (!achievements.find(a => a.id === id)) {
      setAchievements(prev => [...prev, { id, title, description, unlockedAt: Date.now() }])
      playSound('playPowerUp')
    }
  }, [achievements, playSound])

  const activatePartyMode = useCallback(() => {
    setPartyMode(true)
    sounds.playKonami()
    unlockAchievement('konami', 'Konami Master', 'Entered the Konami Code!')
    setTimeout(() => setPartyMode(false), 10000)
  }, [sounds, unlockAchievement])

  useKonamiCode(activatePartyMode)

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev)
    playSound('playSelect')
  }, [playSound])

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev)
  }, [])

  const toggleMusic = useCallback(() => {
    setMusicPlaying(prev => !prev)
  }, [])

  const toggleGame = useCallback(() => {
    setShowGame(prev => !prev)
    playSound('playCoin')
  }, [playSound])

  return (
    <GameContext.Provider value={{
      partyMode,
      darkMode,
      soundEnabled,
      musicPlaying,
      showGame,
      achievements,
      visitorCount,
      playSound,
      unlockAchievement,
      toggleDarkMode,
      toggleSound,
      toggleMusic,
      toggleGame,
      sounds
    }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

export default GameContext
