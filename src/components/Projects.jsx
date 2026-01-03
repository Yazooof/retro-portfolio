import { motion } from 'framer-motion'

const Projects = () => {
  const projects = [
    {
      title: 'Project One',
      description: 'A cool project that does amazing things. Built with React and love.',
      tags: ['React', 'CSS', 'API'],
      link: '#',
      emoji: '🍄'
    },
    {
      title: 'Project Two',
      description: 'Another awesome project showcasing my skills and creativity.',
      tags: ['JavaScript', 'Node.js'],
      link: '#',
      emoji: '💎'
    },
    {
      title: 'Project Three',
      description: 'This one is my favorite! Check it out to see why.',
      tags: ['Full Stack', 'Database'],
      link: '#',
      emoji: '🐉'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  }

  const tagVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 200
      }
    })
  }

  return (
    <section id="projects" className="projects">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          My Projects
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⭐
          </motion.span>{' '}
          Here's what I've been working on{' '}
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            ⭐
          </motion.span>
        </motion.p>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="project-card"
              variants={cardVariants}
              whileHover={{
                y: -15,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300 }
              }}
            >
              <motion.div
                className="project-emoji"
                whileHover={{
                  scale: 1.3,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {project.emoji}
              </motion.div>
              <motion.h3
                whileHover={{ color: '#fff', x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {project.title}
              </motion.h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <motion.span
                    key={tag}
                    className="project-tag"
                    custom={tagIndex}
                    variants={tagVariants}
                    whileHover={{
                      scale: 1.15,
                      backgroundColor: 'rgba(0, 166, 81, 0.4)',
                      boxShadow: '0 0 15px rgba(0, 166, 81, 0.5)'
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              <motion.a
                href={project.link}
                className="project-link"
                whileHover={{
                  x: 10,
                  color: '#fff',
                  backgroundColor: 'var(--snes-red)',
                  boxShadow: '0 0 20px rgba(230, 0, 18, 0.5)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  View Project →
                </motion.span>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Projects
