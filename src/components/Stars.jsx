import { motion } from 'framer-motion'
import { useMemo } from 'react'

const Stars = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }))
  }, [])

  return (
    <div className="stars">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
            boxShadow: [
              '0 0 2px rgba(255, 215, 0, 0.3)',
              '0 0 8px rgba(255, 215, 0, 0.8)',
              '0 0 2px rgba(255, 215, 0, 0.3)'
            ]
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}

export default Stars
