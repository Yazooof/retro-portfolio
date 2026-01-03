import { motion, AnimatePresence } from 'framer-motion'

const Nav = ({ activeSection }) => {
  const navItems = [
    { id: 'home', icon: '🏠' },
    { id: 'about', icon: '👤' },
    { id: 'projects', icon: '🎮' },
    { id: 'contact', icon: '📧' }
  ]

  return (
    <motion.nav
      className="nav flex-col sm:flex-row gap-2 sm:gap-0"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, delay: 0.2 }}
    >
      <motion.div
        className="nav-logo"
        whileHover={{
          scale: 1.1,
          rotate: [0, -5, 5, 0],
          textShadow: [
            "2px 2px 0 #e60012, 4px 4px 0 #000",
            "2px 2px 0 #00a651, 4px 4px 0 #000",
            "2px 2px 0 #0058a8, 4px 4px 0 #000",
            "2px 2px 0 #e60012, 4px 4px 0 #000"
          ]
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          animate={{
            color: ['#ffd700', '#fff', '#ffd700']
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Yusuf
        </motion.span>
      </motion.div>
      <div className="nav-links flex-wrap justify-center">
        {navItems.map((item, i) => (
          <motion.a
            key={item.id}
            href={`#${item.id}`}
            className={activeSection === item.id ? 'active' : ''}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            whileHover={{
              scale: 1.15,
              y: -3,
              boxShadow: '0 5px 15px rgba(255, 215, 0, 0.3)'
            }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {activeSection === item.id && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  style={{ marginRight: '0.3rem' }}
                >
                  ▶
                </motion.span>
              )}
            </AnimatePresence>
            {item.id}
          </motion.a>
        ))}
      </div>
    </motion.nav>
  )
}

export default Nav
