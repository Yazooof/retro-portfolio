import { motion } from 'framer-motion'

const Nav = ({ activeSection }) => (
  <motion.nav
    className="nav flex-col sm:flex-row gap-2 sm:gap-0"
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ type: 'spring', stiffness: 100 }}
  >
    <motion.div
      className="nav-logo"
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      Yusuf
    </motion.div>
    <div className="nav-links flex-wrap justify-center">
      {['home', 'about', 'projects', 'contact'].map((section) => (
        <motion.a
          key={section}
          href={`#${section}`}
          className={activeSection === section ? 'active' : ''}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {section}
        </motion.a>
      ))}
    </div>
  </motion.nav>
)

export default Nav
