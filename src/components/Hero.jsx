import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0)
  const roles = ['Developer', 'Pixel Artist', 'Code Wizard', 'Boss Fighter']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="hero">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="hero-greeting"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hey there! I'm
        </motion.p>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
        >
          Yusuf
          <motion.span
            className="wave"
            animate={{ rotate: [0, 20, 0, 20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          >
            {' '}
          </motion.span>
        </motion.h1>

        <div className="hero-role-container">
          <span>I'm a </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentRole}
              className="hero-role"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {roles[currentRole]}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          PLAYER 1 READY! Building cool stuff, one pixel at a time.
        </motion.p>

        <motion.div
          className="hero-buttons flex-col sm:flex-row w-full sm:w-auto px-4 sm:px-0 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="#projects"
            className="btn btn-primary"
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(99, 102, 241, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            See My Work
          </motion.a>
          <motion.a
            href="#contact"
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Say Hello
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span>Scroll down</span>
        <div className="scroll-arrow">v</div>
      </motion.div>
    </section>
  )
}

export default Hero
