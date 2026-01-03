import { motion } from 'framer-motion'

const FloatingSprite = ({ src, delay, size = 48 }) => (
  <motion.img
    src={src}
    className="floating-sprite"
    initial={{ y: '100vh', opacity: 0 }}
    animate={{
      y: '-100vh',
      opacity: [0, 0.8, 0.8, 0],
      x: [0, 30, -30, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{
      duration: 20,
      delay,
      repeat: Infinity,
      ease: 'linear'
    }}
    style={{
      left: `${Math.random() * 90}%`,
      width: size,
      height: size
    }}
    alt=""
  />
)

export default FloatingSprite
