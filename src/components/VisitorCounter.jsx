import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'

const VisitorCounter = () => {
  const { visitorCount } = useGame()

  const digits = visitorCount.toString().padStart(6, '0').split('')

  return (
    <motion.div
      className="visitor-counter"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.8 }}
    >
      <div className="counter-label">
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          👁️
        </motion.span>
        {' '}VISITORS
      </div>
      <div className="counter-display">
        {digits.map((digit, i) => (
          <motion.span
            key={i}
            className="counter-digit"
            initial={{ rotateX: -90 }}
            animate={{ rotateX: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {digit}
          </motion.span>
        ))}
      </div>
      <div className="counter-style">
        <span>Since 1999</span>
      </div>
    </motion.div>
  )
}

export default VisitorCounter
