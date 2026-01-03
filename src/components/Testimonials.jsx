import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'

const Testimonials = () => {
  const { playSound } = useGame()
  const [activeNPC, setActiveNPC] = useState(0)

  const npcs = [
    {
      name: 'Elder Developer',
      sprite: '🧙‍♂️',
      role: 'Senior Mentor',
      dialogue: [
        "Ah, young adventurer...",
        "Yusuf has shown great potential in the coding arts.",
        "His React skills grow stronger each day!",
        "I foresee a bright future for this one..."
      ],
      color: '#6b67a8'
    },
    {
      name: 'Guild Master',
      sprite: '👨‍💼',
      role: 'Project Manager',
      dialogue: [
        "Welcome to the Developer's Guild!",
        "Yusuf completed all quests on time.",
        "A reliable party member indeed!",
        "Would quest with again. 10/10."
      ],
      color: '#0058a8'
    },
    {
      name: 'Fellow Adventurer',
      sprite: '🧑‍💻',
      role: 'Team Member',
      dialogue: [
        "Hey there, traveler!",
        "Yusuf helped me defeat the Bug Dragon!",
        "Great at pair programming quests.",
        "Always shares his power-ups!"
      ],
      color: '#00a651'
    },
    {
      name: 'Merchant',
      sprite: '🧞',
      role: 'Client',
      dialogue: [
        "Greetings, customer!",
        "Yusuf built my online shop.",
        "Sales increased by 200%!",
        "Best gold I ever spent!"
      ],
      color: '#ffd700'
    }
  ]

  const [dialogueIndex, setDialogueIndex] = useState(0)
  const currentNPC = npcs[activeNPC]

  const nextDialogue = () => {
    playSound('playClick')
    if (dialogueIndex < currentNPC.dialogue.length - 1) {
      setDialogueIndex(dialogueIndex + 1)
    } else {
      setDialogueIndex(0)
    }
  }

  const selectNPC = (index) => {
    playSound('playSelect')
    setActiveNPC(index)
    setDialogueIndex(0)
  }

  return (
    <section id="testimonials" className="testimonials">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="section-title"
          initial={{ y: -30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
        >
          NPC Testimonials
        </motion.h2>
        <motion.p className="section-subtitle">
          What the townsfolk are saying...
        </motion.p>

        <div className="npc-container">
          {/* NPC Selection */}
          <div className="npc-list">
            {npcs.map((npc, i) => (
              <motion.button
                key={npc.name}
                className={`npc-button ${activeNPC === i ? 'active' : ''}`}
                onClick={() => selectNPC(i)}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  borderColor: activeNPC === i ? npc.color : 'transparent'
                }}
              >
                <motion.span
                  className="npc-sprite"
                  animate={activeNPC === i ? {
                    y: [0, -5, 0]
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {npc.sprite}
                </motion.span>
                <span className="npc-name">{npc.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Dialogue Box */}
          <motion.div
            className="dialogue-box"
            style={{ borderColor: currentNPC.color }}
          >
            <div className="dialogue-header">
              <motion.span
                className="dialogue-sprite"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {currentNPC.sprite}
              </motion.span>
              <div className="dialogue-info">
                <h3 style={{ color: currentNPC.color }}>{currentNPC.name}</h3>
                <p>{currentNPC.role}</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeNPC}-${dialogueIndex}`}
                className="dialogue-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p>"{currentNPC.dialogue[dialogueIndex]}"</p>
              </motion.div>
            </AnimatePresence>

            <motion.button
              className="dialogue-next"
              onClick={nextDialogue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                {dialogueIndex < currentNPC.dialogue.length - 1 ? 'NEXT ▶' : 'RESTART ↺'}
              </motion.span>
            </motion.button>

            <div className="dialogue-dots">
              {currentNPC.dialogue.map((_, i) => (
                <motion.div
                  key={i}
                  className={`dialogue-dot ${i === dialogueIndex ? 'active' : ''}`}
                  animate={i === dialogueIndex ? {
                    scale: [1, 1.3, 1],
                    backgroundColor: currentNPC.color
                  } : {}}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Testimonials
