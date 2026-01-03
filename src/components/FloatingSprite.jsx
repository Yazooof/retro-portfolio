import { motion } from 'framer-motion'
import { useMemo } from 'react'

const FloatingSprite = ({ src, delay, size = 48 }) => {
  const randomValues = useMemo(() => ({
    left: Math.random() * 85 + 5,
    xMovement: Math.random() * 60 - 30,
    rotateAmount: Math.random() * 20 - 10,
    duration: 18 + Math.random() * 8,
    scale: 0.8 + Math.random() * 0.4
  }), [])

  return (
    <motion.img
      src={src}
      className="floating-sprite"
      initial={{ y: '110vh', opacity: 0, scale: 0.5 }}
      animate={{
        y: '-110vh',
        opacity: [0, 0.9, 0.9, 0.9, 0],
        x: [0, randomValues.xMovement, -randomValues.xMovement, randomValues.xMovement / 2, 0],
        rotate: [0, randomValues.rotateAmount, -randomValues.rotateAmount, 0],
        scale: [0.5, randomValues.scale, randomValues.scale, randomValues.scale, 0.5]
      }}
      transition={{
        duration: randomValues.duration,
        delay,
        repeat: Infinity,
        ease: 'linear'
      }}
      whileHover={{
        scale: 1.5,
        filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))',
        zIndex: 100
      }}
      style={{
        left: `${randomValues.left}%`,
        width: size,
        height: size,
        cursor: 'pointer'
      }}
      alt=""
    />
  )
}

export default FloatingSprite
