import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'

const GameButton = () => {
  const { toggleGame, playSound } = useGame()

  const handleClick = () => {
    playSound('playCoin')
    toggleGame()
  }

  return (
    <motion.button
      className="game-button"
      onClick={handleClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 3, type: 'spring' }}
      whileHover={{
        scale: 1.1,
        boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
      }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span
        animate={{
          rotate: [0, 10, -10, 0],
          y: [0, -3, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🕹️
      </motion.span>
      <span className="game-button-text">PLAY</span>
    </motion.button>
  )
}

export default GameButton
