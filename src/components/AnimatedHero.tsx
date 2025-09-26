'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface AnimatedHeroProps {
  onMeetTeamClick?: () => void
  onGetStartedClick?: () => void
}

export function AnimatedHero({ onMeetTeamClick, onGetStartedClick }: AnimatedHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const meetTeamBtnRef = useRef<HTMLButtonElement>(null)
  const getStartedBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const description = descriptionRef.current
    const buttons = buttonsRef.current
    const meetTeamBtn = meetTeamBtnRef.current
    const getStartedBtn = getStartedBtnRef.current

    if (!title || !subtitle || !description || !buttons) return

    // Initial state - everything hidden
    gsap.set([title, subtitle, description, buttons], {
      opacity: 0,
      y: 30
    })

    // Elena's signature smooth entrance sequence
    const timeline = gsap.timeline({ delay: 0.2 })

    timeline
      // Title appears with subtle bounce
      .to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.2)'
      })
      // Subtitle follows smoothly
      .to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4')
      // Description with slight delay
      .to(description, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.2')
      // Buttons with stagger effect
      .to(buttons, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.1')

    // Button hover animations
    if (meetTeamBtn) {
      const handleMeetTeamHover = () => {
        gsap.to(meetTeamBtn, {
          scale: 1.02,
          boxShadow: '0 8px 25px -5px rgba(59, 130, 246, 0.3)',
          duration: 0.2,
          ease: 'power2.out'
        })
      }

      const handleMeetTeamLeave = () => {
        gsap.to(meetTeamBtn, {
          scale: 1,
          boxShadow: '0 0px 0px 0px rgba(59, 130, 246, 0)',
          duration: 0.2,
          ease: 'power2.out'
        })
      }

      meetTeamBtn.addEventListener('mouseenter', handleMeetTeamHover)
      meetTeamBtn.addEventListener('mouseleave', handleMeetTeamLeave)

      return () => {
        meetTeamBtn.removeEventListener('mouseenter', handleMeetTeamHover)
        meetTeamBtn.removeEventListener('mouseleave', handleMeetTeamLeave)
      }
    }

    if (getStartedBtn) {
      const handleGetStartedHover = () => {
        gsap.to(getStartedBtn, {
          scale: 1.02,
          borderColor: 'rgb(59, 130, 246)',
          duration: 0.2,
          ease: 'power2.out'
        })
      }

      const handleGetStartedLeave = () => {
        gsap.to(getStartedBtn, {
          scale: 1,
          borderColor: 'hsl(var(--border))',
          duration: 0.2,
          ease: 'power2.out'
        })
      }

      getStartedBtn.addEventListener('mouseenter', handleGetStartedHover)
      getStartedBtn.addEventListener('mouseleave', handleGetStartedLeave)

      return () => {
        getStartedBtn.removeEventListener('mouseenter', handleGetStartedHover)
        getStartedBtn.removeEventListener('mouseleave', handleGetStartedLeave)
      }
    }
  }, [])

  const scrollToTeam = () => {
    const teamSection = document.querySelector('#team-section')
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' })
    }
    onMeetTeamClick?.()
  }

  return (
    <section ref={heroRef} className="relative px-6 py-32 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Content */}
        <div className="space-y-8">
          {/* Orange dot indicator */}
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-muted-foreground uppercase tracking-wider">VISION</span>
          </div>

          <h1
            ref={titleRef}
            className="text-5xl lg:text-7xl font-bold text-foreground leading-tight"
          >
            Agent-Native
            <br />
            Development Workflow
          </h1>

          <div className="space-y-4">
            <p
              ref={subtitleRef}
              className="text-lg text-muted-foreground font-mono"
            >
              The only development methodology
              <br />
              that works everywhere you do.
            </p>

            <p
              ref={descriptionRef}
              className="text-sm text-muted-foreground font-mono leading-relaxed"
            >
              From IDE to CI/CD - delegate complete tasks like
              <br />
              refactors, incident response, and migrations to Droids
              <br />
              without changing your tools, models, or workflow.
            </p>
          </div>

          <div ref={buttonsRef} className="flex gap-4">
            <button
              ref={meetTeamBtnRef}
              onClick={scrollToTeam}
              className="px-6 py-3 bg-primary text-primary-foreground text-sm font-mono uppercase tracking-wider hover:bg-primary/90 transition-colors border border-transparent"
            >
              START BUILDING →
            </button>
          </div>
        </div>

        {/* Right: Visual Element */}
        <div className="relative hidden lg:block">
          <div className="bg-card border border-border p-8 font-mono text-sm">
            {/* Terminal-like header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-muted-foreground ml-4">WEB BROWSER</span>
            </div>

            {/* Animated dots matrix */}
            <div className="grid grid-cols-12 gap-2">
              {Array.from({ length: 144 }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-1000 ${
                    Math.random() > 0.7 ? 'bg-primary animate-pulse' :
                    Math.random() > 0.4 ? 'bg-muted' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            {/* Bottom section with trusted companies */}
            <div className="mt-8 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>TRUSTED BY TEAMS AT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}