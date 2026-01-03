import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'

const MiniGame = () => {
  const { showGame, toggleGame, playSound, unlockAchievement } = useGame()
  const [gameState, setGameState] = useState('menu') // menu, playing, gameover
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('miniGameHighScore') || '0')
  })
  const [playerY, setPlayerY] = useState(50)
  const [obstacles, setObstacles] = useState([])
  const [coins, setCoins] = useState([])
  const gameLoopRef = useRef(null)
  const velocityRef = useRef(0)

  const jump = useCallback(() => {
    if (gameState === 'playing') {
      velocityRef.current = -15
      playSound('playJump')
    }
  }, [gameState, playSound])

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setPlayerY(50)
    setObstacles([])
    setCoins([])
    velocityRef.current = 0
    playSound('playPowerUp')
  }

  const endGame = useCallback(() => {
    setGameState('gameover')
    playSound('playError')
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('miniGameHighScore', score.toString())
      unlockAchievement('highscore', 'High Scorer', 'Set a new high score!')
    }
    if (score >= 10) {
      unlockAchievement('gamer', 'Gamer', 'Scored 10+ in the mini game!')
    }
  }, [score, highScore, playSound, unlockAchievement])

  useEffect(() => {
    if (gameState !== 'playing') return

    const gameLoop = setInterval(() => {
      // Update player position with gravity
      velocityRef.current += 0.8
      setPlayerY(prev => {
        const newY = prev + velocityRef.current * 0.1
        if (newY > 85) {
          endGame()
          return 85
        }
        if (newY < 5) return 5
        return newY
      })

      // Spawn obstacles
      if (Math.random() < 0.02) {
        setObstacles(prev => [...prev, {
          id: Date.now(),
          x: 100,
          y: 70 + Math.random() * 20,
          type: Math.random() > 0.5 ? 'cactus' : 'bird'
        }])
      }

      // Spawn coins
      if (Math.random() < 0.03) {
        setCoins(prev => [...prev, {
          id: Date.now() + 1,
          x: 100,
          y: 20 + Math.random() * 50
        }])
      }

      // Move obstacles
      setObstacles(prev => prev
        .map(obs => ({ ...obs, x: obs.x - 2 }))
        .filter(obs => obs.x > -10)
      )

      // Move coins
      setCoins(prev => prev
        .map(coin => ({ ...coin, x: coin.x - 2 }))
        .filter(coin => coin.x > -10)
      )
    }, 50)

    gameLoopRef.current = gameLoop
    return () => clearInterval(gameLoop)
  }, [gameState, endGame])

  // Collision detection
  useEffect(() => {
    if (gameState !== 'playing') return

    // Check obstacle collisions
    obstacles.forEach(obs => {
      if (obs.x < 15 && obs.x > 5) {
        const playerBottom = playerY + 8
        const obsTop = obs.y - 5
        if (playerBottom > obsTop) {
          endGame()
        }
      }
    })

    // Check coin collisions
    coins.forEach(coin => {
      if (coin.x < 15 && coin.x > 5) {
        if (Math.abs(playerY - coin.y) < 10) {
          setCoins(prev => prev.filter(c => c.id !== coin.id))
          setScore(prev => prev + 1)
          playSound('playCoin')
        }
      }
    })
  }, [obstacles, coins, playerY, gameState, endGame, playSound])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        if (gameState === 'menu' || gameState === 'gameover') {
          startGame()
        } else {
          jump()
        }
      }
      if (e.code === 'Escape') {
        toggleGame()
      }
    }

    if (showGame) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showGame, gameState, jump, toggleGame])

  if (!showGame) return null

  return (
    <AnimatePresence>
      <motion.div
        className="minigame-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target.className === 'minigame-overlay' && toggleGame()}
      >
        <motion.div
          className="minigame-container"
          initial={{ scale: 0.5, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.5, y: 100 }}
        >
          <div className="minigame-header">
            <h2>COIN RUNNER</h2>
            <div className="minigame-scores">
              <span>SCORE: {score}</span>
              <span>HIGH: {highScore}</span>
            </div>
            <button className="minigame-close" onClick={toggleGame}>✕</button>
          </div>

          <div
            className="minigame-screen"
            onClick={gameState === 'playing' ? jump : startGame}
          >
            {/* Ground */}
            <div className="game-ground" />

            {/* Player */}
            <motion.div
              className="game-player"
              style={{ top: `${playerY}%` }}
              animate={{
                rotate: velocityRef.current < 0 ? -20 : velocityRef.current > 5 ? 20 : 0
              }}
            >
              🏃
            </motion.div>

            {/* Obstacles */}
            {obstacles.map(obs => (
              <div
                key={obs.id}
                className="game-obstacle"
                style={{ left: `${obs.x}%`, top: `${obs.y}%` }}
              >
                {obs.type === 'cactus' ? '🌵' : '🦅'}
              </div>
            ))}

            {/* Coins */}
            {coins.map(coin => (
              <motion.div
                key={coin.id}
                className="game-coin"
                style={{ left: `${coin.x}%`, top: `${coin.y}%` }}
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🪙
              </motion.div>
            ))}

            {/* Menu/Game Over Overlay */}
            {gameState !== 'playing' && (
              <div className="game-overlay">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="game-message"
                >
                  {gameState === 'menu' && (
                    <>
                      <h3>COIN RUNNER</h3>
                      <p>Collect coins, avoid obstacles!</p>
                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        PRESS SPACE TO START
                      </motion.p>
                    </>
                  )}
                  {gameState === 'gameover' && (
                    <>
                      <h3>GAME OVER</h3>
                      <p>Score: {score}</p>
                      {score >= highScore && score > 0 && (
                        <motion.p
                          className="new-highscore"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          NEW HIGH SCORE!
                        </motion.p>
                      )}
                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        PRESS SPACE TO RETRY
                      </motion.p>
                    </>
                  )}
                </motion.div>
              </div>
            )}
          </div>

          <div className="minigame-controls">
            <p>SPACE/TAP to jump | ESC to close</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default MiniGame
