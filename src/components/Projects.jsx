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

  return (
    <section id="projects" className="projects">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">Here's what I've been working on</p>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            >
              <div className="project-emoji">{project.emoji}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
              <motion.a
                href={project.link}
                className="project-link"
                whileHover={{ x: 5 }}
              >
                View Project →
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects
