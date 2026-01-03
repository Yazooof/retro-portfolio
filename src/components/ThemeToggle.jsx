import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode, playSound } = useGame()

  const handleToggle = () => {
    playSound('playSelect')
    toggleDarkMode()
  }

  return (
    <motion.div
      className="theme-toggle"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2.2 }}
    >
      <motion.button
        className="theme-toggle-btn"
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={darkMode ? 'Light Mode' : 'Dark Mode'}
      >
        <motion.div
          className="cartridge"
          animate={{
            rotateY: darkMode ? 180 : 0
          }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <span className="cartridge-front">🌙</span>
          <span className="cartridge-back">☀️</span>
        </motion.div>
      </motion.button>
      <span className="theme-label">
        {darkMode ? 'DARK' : 'LIGHT'}
      </span>
    </motion.div>
  )
}

export default ThemeToggle
