import { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your form submission logic here (e.g., EmailJS)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="contact">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Have a question or want to work together? Drop me a message!
        </p>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="form-group">
            <motion.input
              type="text"
              placeholder="Your Name"
              value={formState.name}
              onChange={(e) => setFormState({...formState, name: e.target.value})}
              whileFocus={{ scale: 1.02 }}
              required
            />
          </div>
          <div className="form-group">
            <motion.input
              type="email"
              placeholder="Your Email"
              value={formState.email}
              onChange={(e) => setFormState({...formState, email: e.target.value})}
              whileFocus={{ scale: 1.02 }}
              required
            />
          </div>
          <div className="form-group">
            <motion.textarea
              placeholder="Your Message"
              rows="5"
              value={formState.message}
              onChange={(e) => setFormState({...formState, message: e.target.value})}
              whileFocus={{ scale: 1.02 }}
              required
            />
          </div>
          <motion.button
            type="submit"
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitted ? 'Message Sent!' : 'Send Message'}
          </motion.button>
        </motion.form>

        <div className="social-links flex-col sm:flex-row w-full sm:w-auto items-center justify-center">
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            whileHover={{ scale: 1.2, y: -5 }}
          >
            GitHub
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/yusuf-derie-42010112a/"
            target="_blank"
            whileHover={{ scale: 1.2, y: -5 }}
          >
            LinkedIn
          </motion.a>
          <motion.a
            href="mailto:your@email.com"
            whileHover={{ scale: 1.2, y: -5 }}
          >
            Email
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
