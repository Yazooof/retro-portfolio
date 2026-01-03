import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'

const Experience = () => {
  const { playSound } = useGame()

  const experiences = [
    {
      world: '1-1',
      title: 'Started Coding Journey',
      period: '2020',
      description: 'Learned HTML, CSS, and JavaScript. Built first websites.',
      boss: 'Tutorial Mode',
      powerUps: ['HTML', 'CSS', 'JS Basics'],
      color: '#00a651'
    },
    {
      world: '1-2',
      title: 'React Developer',
      period: '2021',
      description: 'Mastered React and built interactive web applications.',
      boss: 'Component Beast',
      powerUps: ['React', 'Redux', 'APIs'],
      color: '#61dafb'
    },
    {
      world: '2-1',
      title: 'Full Stack Explorer',
      period: '2022',
      description: 'Expanded to backend development with Node.js and databases.',
      boss: 'Database Dragon',
      powerUps: ['Node.js', 'MongoDB', 'Express'],
      color: '#68a063'
    },
    {
      world: '2-2',
      title: 'Current Quest',
      period: '2023-Present',
      description: 'Building awesome projects and leveling up every day!',
      boss: '???',
      powerUps: ['TypeScript', 'Next.js', 'Cloud'],
      color: '#ffd700'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  return (
    <section id="experience" className="experience">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Quest Log
        </motion.h2>
        <motion.p className="section-subtitle" variants={itemVariants}>
          My coding adventure so far...
        </motion.p>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.world}
              className="timeline-item"
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 10 }}
              onHoverStart={() => playSound('playHover')}
            >
              <motion.div
                className="world-badge"
                style={{ backgroundColor: exp.color }}
                animate={{
                  boxShadow: [
                    `0 0 10px ${exp.color}50`,
                    `0 0 20px ${exp.color}80`,
                    `0 0 10px ${exp.color}50`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="world-text">WORLD</span>
                <span className="world-number">{exp.world}</span>
              </motion.div>

              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>{exp.title}</h3>
                  <span className="timeline-period">{exp.period}</span>
                </div>

                <p className="timeline-description">{exp.description}</p>

                <div className="timeline-boss">
                  <span className="boss-label">BOSS:</span>
                  <motion.span
                    className="boss-name"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {exp.boss}
                  </motion.span>
                </div>

                <div className="power-ups">
                  <span className="powerup-label">POWER-UPS:</span>
                  <div className="powerup-list">
                    {exp.powerUps.map((powerUp, j) => (
                      <motion.span
                        key={powerUp}
                        className="powerup-item"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.1 }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: exp.color,
                          color: '#fff'
                        }}
                      >
                        {powerUp}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {i < experiences.length - 1 && (
                <motion.div
                  className="timeline-connector"
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Experience
