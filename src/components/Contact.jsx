import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/yourusername', icon: '🐙' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yusuf-derie-42010112a/', icon: '💼' },
    { name: 'Email', url: 'mailto:your@email.com', icon: '📧' }
  ]

  return (
    <section id="contact" className="contact">
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
          Get In Touch
        </motion.h2>
        <motion.p
          className="section-subtitle"
          variants={itemVariants}
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            style={{ display: 'inline-block' }}
          >
            💬
          </motion.span>{' '}
          Have a question or want to work together? Drop me a message!
        </motion.p>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          <motion.div
            className="form-group"
            whileHover={{ scale: 1.02 }}
          >
            <motion.input
              type="text"
              placeholder="Your Name"
              value={formState.name}
              onChange={(e) => setFormState({...formState, name: e.target.value})}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
              }}
              required
            />
          </motion.div>
          <motion.div
            className="form-group"
            whileHover={{ scale: 1.02 }}
          >
            <motion.input
              type="email"
              placeholder="Your Email"
              value={formState.email}
              onChange={(e) => setFormState({...formState, email: e.target.value})}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
              }}
              required
            />
          </motion.div>
          <motion.div
            className="form-group"
            whileHover={{ scale: 1.02 }}
          >
            <motion.textarea
              placeholder="Your Message"
              rows="5"
              value={formState.message}
              onChange={(e) => setFormState({...formState, message: e.target.value})}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
              }}
              required
            />
          </motion.div>
          <motion.button
            type="submit"
            className="btn btn-primary"
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 30px rgba(230, 0, 18, 0.6)'
            }}
            whileTap={{ scale: 0.92, y: 4 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.span
                  key="sent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, scale: [1, 1.1, 1] }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  ✓ Message Sent!
                </motion.span>
              ) : (
                <motion.span
                  key="send"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Send Message{' '}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ display: 'inline-block' }}
                  >
                    →
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>

        <motion.div
          className="social-links flex-col sm:flex-row w-full sm:w-auto items-center justify-center"
          variants={itemVariants}
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.url}
              target={link.name !== 'Email' ? '_blank' : undefined}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: 'spring' }}
              whileHover={{
                scale: 1.15,
                y: -8,
                boxShadow: '0 10px 25px rgba(255, 215, 0, 0.3)',
                backgroundColor: 'rgba(255, 215, 0, 0.15)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                style={{ marginRight: '0.5rem' }}
              >
                {link.icon}
              </motion.span>
              {link.name}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contact
