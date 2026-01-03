import { useState, useEffect } from 'react'
import {
  FloatingSprite, Nav, Hero, About, Projects, Contact, Footer, Stars,
  LoadingScreen, MusicPlayer, ThemeToggle, Experience, Skills,
  Testimonials, MiniGame, Achievements, VisitorCounter, GameButton
} from './components'
import { GameProvider, useGame } from './context/GameContext'
import './App.css'

function AppContent() {
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const { partyMode, darkMode, playSound, unlockAchievement } = useGame()

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
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'testimonials', 'contact']
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

      // Check if user visited all sections
      const allVisited = sections.every(s => {
        const el = document.getElementById(s)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top < window.innerHeight
        }
        return false
      })
      if (allVisited) {
        unlockAchievement('explorer', 'Explorer', 'Visited all sections!')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [unlockAchievement])

  // Add click sound to all buttons
  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        playSound('playClick')
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [playSound])

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <div className={`app ${partyMode ? 'party-mode' : ''} ${darkMode ? 'dark-mode' : ''}`}>
      <Stars />
      <div className="floating-sprites hidden sm:block">
        {sprites.map((sprite, i) => (
          <FloatingSprite key={i} src={sprite.src} size={sprite.size} delay={i * 2.5} />
        ))}
      </div>

      {/* Fixed UI Elements */}
      <MusicPlayer />
      <ThemeToggle />
      <Achievements />
      <GameButton />
      <VisitorCounter />

      {/* Mini Game Modal */}
      <MiniGame />

      <Nav activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  )
}

export default App
