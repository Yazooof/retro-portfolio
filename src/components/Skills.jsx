import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'

const Skills = () => {
  const { playSound } = useGame()

  const stats = [
    { name: 'JavaScript', level: 85, maxLevel: 100, color: '#f7df1e', icon: '⚡' },
    { name: 'React', level: 80, maxLevel: 100, color: '#61dafb', icon: '⚛️' },
    { name: 'CSS/Styling', level: 75, maxLevel: 100, color: '#e60012', icon: '🎨' },
    { name: 'Node.js', level: 70, maxLevel: 100, color: '#68a063', icon: '🔧' },
    { name: 'Problem Solving', level: 90, maxLevel: 100, color: '#ffd700', icon: '🧠' },
    { name: 'Git/GitHub', level: 75, maxLevel: 100, color: '#6e5494', icon: '🐙' },
  ]

  const characterStats = [
    { stat: 'HP', value: 100, max: 100, color: '#e60012' },
    { stat: 'MP', value: 85, max: 100, color: '#0058a8' },
    { stat: 'EXP', value: 7500, max: 10000, color: '#ffd700' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  return (
    <section id="skills" className="skills-section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Character Stats
        </motion.h2>

        <div className="stats-container">
          {/* Character Status */}
          <motion.div className="character-status" variants={itemVariants}>
            <div className="status-header">
              <motion.div
                className="character-portrait"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🧙‍♂️
              </motion.div>
              <div className="character-info">
                <h3 className="character-name">YUSUF</h3>
                <p className="character-class">Lv. 25 Code Wizard</p>
              </div>
            </div>

            <div className="character-bars">
              {characterStats.map((stat) => (
                <div key={stat.stat} className="character-bar">
                  <span className="bar-label">{stat.stat}</span>
                  <div className="bar-container">
                    <motion.div
                      className="bar-fill"
                      style={{ backgroundColor: stat.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(stat.value / stat.max) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="bar-value">{stat.value}/{stat.max}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skill Stats */}
          <motion.div className="skill-stats" variants={itemVariants}>
            <h3 className="stats-title">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚔️
              </motion.span>
              {' '}ABILITIES
            </h3>

            <div className="stats-list">
              {stats.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  className="stat-item"
                  variants={itemVariants}
                  whileHover={{ x: 10, scale: 1.02 }}
                  onHoverStart={() => playSound('playHover')}
                >
                  <div className="stat-header">
                    <span className="stat-icon">{skill.icon}</span>
                    <span className="stat-name">{skill.name}</span>
                    <span className="stat-level">Lv.{skill.level}</span>
                  </div>

                  <div className="stat-bar-container">
                    <motion.div
                      className="stat-bar-bg"
                    >
                      <motion.div
                        className="stat-bar-fill"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                      <motion.div
                        className="stat-bar-shine"
                        animate={{
                          x: ['-100%', '200%'],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      />
                    </motion.div>
                  </div>

                  <div className="stat-pips">
                    {[...Array(10)].map((_, j) => (
                      <motion.div
                        key={j}
                        className={`stat-pip ${j < skill.level / 10 ? 'filled' : ''}`}
                        style={{
                          backgroundColor: j < skill.level / 10 ? skill.color : 'transparent'
                        }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.05 + i * 0.1 }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Skills
