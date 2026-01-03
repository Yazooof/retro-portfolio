import { motion } from 'framer-motion'

const Footer = () => (
  <motion.footer
    className="footer"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    <motion.p
      animate={{
        opacity: [0.5, 1, 0.5],
        textShadow: [
          '0 0 5px rgba(255, 215, 0, 0.3)',
          '0 0 15px rgba(255, 215, 0, 0.6)',
          '0 0 5px rgba(255, 215, 0, 0.3)'
        ]
      }}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{ color: 'var(--snes-yellow)' }}
    >
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        ▶
      </motion.span>{' '}
      PRESS START TO CONTINUE...
    </motion.p>
    <motion.p
      whileHover={{ scale: 1.05 }}
    >
      Built with{' '}
      <motion.span
        animate={{ color: ['#61dafb', '#00a651', '#e60012', '#61dafb'] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        React
      </motion.span>{' '}
      &{' '}
      <motion.span
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ display: 'inline-block' }}
      >
        🎮
      </motion.span>{' '}
      16-bit nostalgia
    </motion.p>
    <motion.p
      initial={{ opacity: 0.7 }}
      whileHover={{ opacity: 1, scale: 1.02 }}
    >
      © {new Date().getFullYear()} Yusuf. All rights reserved.
    </motion.p>
  </motion.footer>
)

export default Footer
