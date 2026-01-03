import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('LOADING')

  useEffect(() => {
    const texts = ['LOADING', 'LOADING.', 'LOADING..', 'LOADING...']
    let textIndex = 0
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length
      setLoadingText(texts[textIndex])
    }, 300)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(textInterval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 150)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="loading-screen"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          filter: 'brightness(2)',
          transition: { duration: 0.5 }
        }}
      >
        <div className="loading-content">
          <motion.div
            className="loading-logo"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="loading-icon">🎮</span>
          </motion.div>

          <motion.h1
            className="loading-title"
            animate={{
              textShadow: [
                '0 0 10px rgba(255,215,0,0.5)',
                '0 0 20px rgba(255,215,0,0.8)',
                '0 0 10px rgba(255,215,0,0.5)'
              ]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            YUSUF'S PORTFOLIO
          </motion.h1>

          <div className="loading-bar-container">
            <motion.div
              className="loading-bar"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <motion.p
            className="loading-text"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            {loadingText}
          </motion.p>

          <p className="loading-percent">{Math.min(Math.floor(progress), 100)}%</p>

          <motion.p
            className="loading-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
          >
            TIP: Try the Konami Code for a surprise!
          </motion.p>
        </div>

        <div className="scanlines" />
      </motion.div>
    </AnimatePresence>
  )
}

export default LoadingScreen
