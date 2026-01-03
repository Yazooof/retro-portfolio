import { motion } from 'framer-motion'

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
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

  const skills = ['JavaScript', 'React', 'HTML/CSS', 'Node.js', 'Git', 'Problem Solving']

  return (
    <section id="about" className="about">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          className="section-title"
          variants={itemVariants}
        >
          About Me
        </motion.h2>

        <div className="about-content flex-col md:flex-row items-center text-center md:text-left">
          <motion.div
            className="about-image levitate"
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.5 }
            }}
          >
            <motion.div
              className="avatar-placeholder"
              animate={{
                boxShadow: [
                  '4px 4px 0px #000, inset 0 0 30px rgba(0,0,0,0.3), 0 0 0 0 rgba(255, 215, 0, 0.7)',
                  '4px 4px 0px #000, inset 0 0 30px rgba(0,0,0,0.3), 0 0 30px 10px rgba(255, 215, 0, 0.3)',
                  '4px 4px 0px #000, inset 0 0 30px rgba(0,0,0,0.3), 0 0 0 0 rgba(255, 215, 0, 0.7)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Y
              </motion.span>
            </motion.div>
          </motion.div>

          <div className="about-text">
            <motion.p variants={itemVariants}>
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎮
              </motion.span>{' '}
              Welcome to my corner of the internet! I'm passionate about
              creating things that live on the web. I love turning ideas
              into reality through clean code and thoughtful design.
            </motion.p>
            <motion.p variants={itemVariants}>
              When I'm not coding, you can find me exploring new technologies,
              learning something new, or probably drinking too much coffee.{' '}
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                style={{ display: 'inline-block' }}
              >
                ☕
              </motion.span>
            </motion.p>

            <motion.div className="skills" variants={itemVariants}>
              <motion.h3
                animate={{
                  color: ['#0058a8', '#00a651', '#e60012', '#0058a8']
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Things I work with:
              </motion.h3>
              <div className="skill-tags">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.1,
                      type: 'spring',
                      stiffness: 200
                    }}
                    whileHover={{
                      scale: 1.15,
                      y: -8,
                      boxShadow: '0 10px 20px rgba(0,0,0,0.3), 0 0 15px rgba(78, 74, 135, 0.5)',
                      backgroundColor: 'var(--snes-purple-light)'
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
