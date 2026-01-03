import { motion } from 'framer-motion'

const About = () => (
  <section id="about" className="about">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title">About Me</h2>

      <div className="about-content flex-col md:flex-row items-center text-center md:text-left">
        <motion.div
          className="about-image"
          whileHover={{ scale: 1.05, rotate: 3 }}
        >
          <div className="avatar-placeholder">
            <span>Y</span>
          </div>
        </motion.div>

        <div className="about-text">
          <p>
            Welcome to my corner of the internet! I'm passionate about
            creating things that live on the web. I love turning ideas
            into reality through clean code and thoughtful design.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies,
            learning something new, or probably drinking too much coffee.
          </p>

          <div className="skills">
            <h3>Things I work with:</h3>
            <div className="skill-tags">
              {['JavaScript', 'React', 'HTML/CSS', 'Node.js', 'Git', 'Problem Solving'].map((skill, i) => (
                <motion.span
                  key={skill}
                  className="skill-tag"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
)

export default About
