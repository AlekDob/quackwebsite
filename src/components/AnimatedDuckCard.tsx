'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface Agent {
  id: string
  name: string
  title: string
  description: string
  expertise: string[]
  personality: string
  emoji: string
}

interface AnimatedDuckCardProps {
  agent: Agent
  onChatClick?: (agent: Agent) => void
}

export function AnimatedDuckCard({ agent, onChatClick }: AnimatedDuckCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const duckRef = useRef<HTMLDivElement>(null)
  const tieRef = useRef<HTMLDivElement>(null)
  const badgeRefs = useRef<(HTMLSpanElement | null)[]>([])
  const chatButtonRef = useRef<HTMLButtonElement>(null)

  const [isHovered, setIsHovered] = useState(false)
  const [showBusinessCard, setShowBusinessCard] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    const duck = duckRef.current
    const tie = tieRef.current
    const badges = badgeRefs.current

    if (!card || !duck) return

    // Initial setup
    gsap.set(card, {
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
    })

    const handleMouseEnter = () => {
      setIsHovered(true)

      // Elena's signature "subtle lift" with shadow elevation
      gsap.to(card, {
        y: -8,
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        duration: 0.4,
        ease: 'power2.out'
      })

      // Duck "straightening up" - professional posture
      gsap.to(duck, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      })

      // Tie straightening effect (rotate slightly)
      if (tie) {
        gsap.to(tie, {
          rotation: 2,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      // Badge shimmer - discrete professional shine
      badges.forEach((badge, index) => {
        if (badge) {
          gsap.to(badge, {
            boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.2)',
            duration: 0.2,
            delay: index * 0.05,
            ease: 'power2.out'
          })
        }
      })
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      setShowBusinessCard(false)

      // Return to rest state
      gsap.to(card, {
        y: 0,
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        duration: 0.4,
        ease: 'power2.out'
      })

      gsap.to(duck, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })

      if (tie) {
        gsap.to(tie, {
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      // Remove badge shimmer
      badges.forEach((badge) => {
        if (badge) {
          gsap.to(badge, {
            boxShadow: 'none',
            duration: 0.2,
            ease: 'power2.out'
          })
        }
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleBusinessCardToggle = () => {
    setShowBusinessCard(!showBusinessCard)
  }

  return (
    <div
      ref={cardRef}
      className="bg-card border border-border font-mono text-sm cursor-pointer relative overflow-hidden"
    >
      {/* Business Card Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{agent.emoji}</div>
          <div>
            <div className="text-xl font-bold text-foreground">{agent.name}</div>
            <div className="text-sm text-primary font-mono">{agent.title}</div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          QUACK AGENCY
        </div>
      </div>

      {/* Business Card Content */}
      <div className="p-6 space-y-6">
        {/* Specialty & Description */}
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground font-mono leading-relaxed">
            {agent.description}
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono border-b border-border pb-1">
            EXPERTISE
          </div>
          <div className="space-y-1">
            {agent.expertise.map((skill, index) => (
              <div
                key={skill}
                ref={(el) => { badgeRefs.current[index] = el }}
                className="text-xs text-foreground flex items-center gap-2"
              >
                <span className="text-primary">•</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How to invoke */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono border-b border-border pb-1">
            INVOKE COMMAND
          </div>
          <div className="bg-muted/20 border border-border p-2 rounded font-mono text-xs">
            <span className="text-muted-foreground">$</span>
            <span className="text-primary ml-1">quack {agent.id}</span>
            <span className="text-muted-foreground ml-1">"your task here"</span>
          </div>
        </div>

        {/* Interactive section on hover */}
        {isHovered && (
          <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-300 pt-2 border-t border-border">
            <div className="text-primary">
              <span className="text-muted-foreground">$</span> interact
            </div>
            <div className="pl-2 space-y-2">
              <button
                ref={chatButtonRef}
                onClick={() => onChatClick?.(agent)}
                className="block w-full text-left px-3 py-2 bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors text-xs"
              >
                → chat {agent.id}
              </button>
              <button
                onClick={handleBusinessCardToggle}
                className="block w-full text-left px-3 py-2 border border-border text-muted-foreground hover:bg-muted/50 transition-colors text-xs"
              >
                → info --verbose
              </button>
            </div>
          </div>
        )}

        {/* Terminal cursor */}
        <div className="flex items-center">
          <span className="text-muted-foreground">$</span>
          <div className="w-2 h-4 bg-primary ml-1 animate-terminal-cursor"></div>
        </div>
      </div>

      {/* Business Card as terminal output */}
      {showBusinessCard && (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="bg-card border border-border p-6 font-mono text-sm max-w-md">
            <div className="space-y-2">
              <div className="text-primary">
                <span className="text-muted-foreground">$</span> contact {agent.id} --format=vcard
              </div>
              <div className="pl-2 space-y-1 text-xs">
                <div>NAME: {agent.name}</div>
                <div>ROLE: {agent.title}</div>
                <div>EMAIL: {agent.id}@agent-mike.dev</div>
                <div>GITHUB: github.com/{agent.id}-agent</div>
                <div>PERSONALITY: {agent.personality}</div>
                <div>STATUS: ● ONLINE</div>
              </div>
              <button
                onClick={handleBusinessCardToggle}
                className="mt-4 px-3 py-2 bg-primary text-primary-foreground text-xs hover:bg-primary/90 transition-colors"
              >
                [ESC] CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}