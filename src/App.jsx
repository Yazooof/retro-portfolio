import { useState, useEffect } from 'react'
import { FloatingSprite, Nav, Hero, About, Projects, Contact, Footer, Stars } from './components'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  const sprites = [
    { src: '/sprites/yoshi.png', size: 72 },
    { src: '/sprites/pikachu.png', size: 80 },
    { src: '/sprites/goku.png', size: 76 },
    { src: '/sprites/mushroom.png', size: 56 },
    { src: '/sprites/pokeball.png', size: 52 },
    { src: '/sprites/star.png', size: 68 },
    { src: '/sprites/dragon-ball.png', size: 64 },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <Stars />
      <div className="floating-sprites hidden sm:block">
        {sprites.map((sprite, i) => (
          <FloatingSprite key={i} src={sprite.src} size={sprite.size} delay={i * 2.5} />
        ))}
      </div>

      <Nav activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
