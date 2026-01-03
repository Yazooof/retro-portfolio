import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'

const Achievements = () => {
  const { achievements } = useGame()

  const allAchievements = [
    { id: 'konami', title: 'Konami Master', description: 'Enter the Konami Code', icon: '🎮' },
    { id: 'gamer', title: 'Gamer', description: 'Score 10+ in mini game', icon: '🏆' },
    { id: 'highscore', title: 'High Scorer', description: 'Set a new high score', icon: '⭐' },
    { id: 'explorer', title: 'Explorer', description: 'Visit all sections', icon: '🗺️' },
    { id: 'night_owl', title: 'Night Owl', description: 'Enable dark mode', icon: '🌙' },
    { id: 'music_lover', title: 'Music Lover', description: 'Listen to the chiptune', icon: '🎵' },
  ]

  const unlockedIds = achievements.map(a => a.id)

  return (
    <motion.div
      className="achievements-panel"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2.5 }}
    >
      <div className="achievements-header">
        <span>🏅</span>
        <span className="achievements-count">
          {achievements.length}/{allAchievements.length}
        </span>
      </div>

      <div className="achievements-list">
        {allAchievements.map((achievement) => {
          const isUnlocked = unlockedIds.includes(achievement.id)
          return (
            <motion.div
              key={achievement.id}
              className={`achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`}
              whileHover={{ scale: 1.05, x: 5 }}
              title={isUnlocked ? achievement.description : '???'}
            >
              <span className="achievement-icon">
                {isUnlocked ? achievement.icon : '🔒'}
              </span>
              <AnimatePresence>
                {isUnlocked && (
                  <motion.span
                    className="achievement-unlocked-indicator"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default Achievements
