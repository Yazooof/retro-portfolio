import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const roles = ['Developer', 'Pixel Artist', 'Code Wizard', 'Boss Fighter']

  useEffect(() => {
    // Power-on delay effect
    setTimeout(() => setShowContent(true), 500)

    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Staggered container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  return (
    <section id="home" className="hero">
      <motion.div
        className="power-on"
        variants={containerVariants}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
      >
        <motion.p
          className="hero-greeting"
          variants={itemVariants}
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ▶
          </motion.span>{' '}
          Hey there! I'm
        </motion.p>

        <motion.h1
          className="hero-name glitch-text"
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            textShadow: [
              "3px 3px 0 #e60012, 6px 6px 0 #0058a8",
              "5px 3px 0 #00a651, 4px 6px 0 #ffd700",
              "3px 5px 0 #4e4a87, 6px 4px 0 #e60012"
            ]
          }}
        >
          Yusuf
          <motion.span
            className="wave"
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            style={{ display: 'inline-block', marginLeft: '0.5rem' }}
          >
            👋
          </motion.span>
        </motion.h1>

        <motion.div
          className="hero-role-container"
          variants={itemVariants}
        >
          <motion.span
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            I'm a{' '}
          </motion.span>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentRole}
              className="hero-role typing-cursor"
              initial={{ y: 20, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, type: 'spring' }}
            >
              {roles[currentRole]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.p
          className="hero-tagline"
          variants={itemVariants}
        >
          <motion.span
            animate={{
              textShadow: [
                "0 0 10px rgba(255,215,0,0)",
                "0 0 20px rgba(255,215,0,0.5)",
                "0 0 10px rgba(255,215,0,0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            PLAYER 1 READY!
          </motion.span>{' '}
          Building cool stuff, one pixel at a time.
        </motion.p>

        <motion.div
          className="hero-buttons flex-col sm:flex-row w-full sm:w-auto px-4 sm:px-0 items-center justify-center"
          variants={itemVariants}
        >
          <motion.a
            href="#projects"
            className="btn btn-primary"
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 30px rgba(230, 0, 18, 0.6), 0 0 60px rgba(230, 0, 18, 0.3)'
            }}
            whileTap={{ scale: 0.92, y: 4 }}
          >
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              See My Work →
            </motion.span>
          </motion.a>
          <motion.a
            href="#contact"
            className="btn btn-secondary shake-on-hover"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92, y: 4 }}
          >
            Say Hello
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll down
        </motion.span>
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 8, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ▼
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
