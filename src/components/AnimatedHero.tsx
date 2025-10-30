'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePostHog } from 'posthog-js/react'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedHeroProps {
  onMeetTeamClick?: () => void
  onGetStartedClick?: () => void
}

export function AnimatedHero({ onMeetTeamClick, onGetStartedClick }: AnimatedHeroProps) {
  const posthog = usePostHog()
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const meetTeamBtnRef = useRef<HTMLButtonElement>(null)
  const getStartedBtnRef = useRef<HTMLDivElement>(null) // Changed to HTMLDivElement since it's a div now

  useEffect(() => {
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const buttons = buttonsRef.current
    const videoContainer = videoContainerRef.current
    const meetTeamBtn = meetTeamBtnRef.current
    const getStartedBtn = getStartedBtnRef.current
    const hero = heroRef.current

    if (!title || !subtitle || !buttons || !videoContainer || !hero) return

    // Initial state - everything hidden
    gsap.set([title, subtitle, buttons], {
      opacity: 0,
      y: 50
    })

    gsap.set(videoContainer, {
      opacity: 0,
      y: 100,
      scale: 0.9,
      rotateX: 8
    })

    // Elena's signature smooth entrance sequence - 2025 style
    const timeline = gsap.timeline({ delay: 0.2 })

    timeline
      // Title appears with smooth elastic bounce
      .to(title, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'elastic.out(1, 0.5)'
      })
      // Subtitle follows with butter-smooth slide
      .to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out'
      }, '-=0.7')
      // Buttons cascade in
      .to(buttons, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.4')

    // Video peek effect - initially hidden, slightly peeking
    gsap.set(videoContainer, {
      opacity: 0.3,
      y: 80,
      scale: 0.92,
      rotateX: 12
    })

    // Fade in video peek after content loads
    timeline.to(videoContainer, {
      opacity: 0.5,
      y: 60,
      scale: 0.94,
      rotateX: 10,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.3')

    // ScrollTrigger: Video reveal on scroll - 2025 trend: perspective + scale
    ScrollTrigger.create({
      trigger: videoContainer,
      start: 'top bottom-=100',
      end: 'top center',
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress
        gsap.to(videoContainer, {
          opacity: 0.5 + (progress * 0.5), // 0.5 → 1
          y: 60 - (progress * 60), // 60 → 0
          scale: 0.94 + (progress * 0.06), // 0.94 → 1
          rotateX: 10 - (progress * 10), // 10deg → 0deg
          duration: 0.1,
          overwrite: true
        })
      }
    })

    // Orange dot pulsing animation
    const orangeDot = hero.querySelector('.w-2.h-2.bg-primary')
    if (orangeDot) {
      gsap.to(orangeDot, {
        scale: 1.4,
        opacity: 0.4,
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
    }

    // Button hover animations - 2025 style: lift + glow
    if (meetTeamBtn) {
      const handleMeetTeamHover = () => {
        gsap.to(meetTeamBtn, {
          scale: 1.05,
          y: -4,
          boxShadow: '0 20px 40px -12px rgba(255, 107, 0, 0.5)',
          duration: 0.3,
          ease: 'back.out(2)'
        })
      }

      const handleMeetTeamLeave = () => {
        gsap.to(meetTeamBtn, {
          scale: 1,
          y: 0,
          boxShadow: '0 0px 0px 0px rgba(255, 107, 0, 0)',
          duration: 0.3,
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
          scale: 1.03,
          borderColor: 'rgb(255, 107, 0)',
          backgroundColor: 'rgba(255, 107, 0, 0.08)',
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      const handleGetStartedLeave = () => {
        gsap.to(getStartedBtn, {
          scale: 1,
          borderColor: 'hsl(var(--border))',
          backgroundColor: 'transparent',
          duration: 0.3,
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

  return (
    <section ref={heroRef} className="relative px-6 py-20 lg:py-32 min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient - 2025 trend: subtle mesh gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 opacity-40 pointer-events-none" />

      {/* Single Column Centered Content */}
      <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">

        {/* Orange dot indicator */}
        <div className="flex items-center justify-center gap-3 text-sm">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-muted-foreground uppercase tracking-wider font-mono">QUACK AGENCY</span>
        </div>

        {/* Title */}
        <div className="space-y-8">
          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-tight"
          >
            Quack: Visual GUI for AI Coding with Claude Code
          </h1>
          <div className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-semibold">
            🦆 Work on Multiple Projects While Claude Thinks
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg text-foreground/90 font-mono max-w-3xl mx-auto leading-relaxed"
          >
            <span className="text-primary font-semibold">Never Wait Idle Again.</span>
            <br />
            <span className="text-base text-muted-foreground">
              Run 10+ Claude Code sessions in parallel. Switch projects instantly.
            </span>
          </p>
        </div>

        {/* CTAs */}
        <div ref={buttonsRef} className="flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              ref={meetTeamBtnRef}
              onClick={() => {
                posthog?.capture('discord_button_clicked', {
                  button_location: 'hero',
                  button_text: 'JOIN DISCORD COMMUNITY'
                })
                window.open('https://discord.gg/bQd39uDhnc', '_blank')
              }}
              className="px-10 py-5 bg-primary text-primary-foreground text-lg font-mono uppercase tracking-wider hover:bg-primary/90 transition-colors border border-transparent shadow-lg"
            >
              🦆 JOIN DISCORD COMMUNITY
            </button>
            <div
              ref={getStartedBtnRef}
              className="px-10 py-5 border border-border text-muted-foreground font-mono text-lg uppercase tracking-wider bg-muted/10 flex items-center justify-center cursor-not-allowed"
            >
              <span>📦 DOWNLOAD - COMING SOON</span>
            </div>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-2">
              <span>💻</span>
              <span>macOS Native App</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🚀</span>
              <span>Built on Claude Agent SDK</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💬</span>
              <span>Join Early Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Container - Peeking from below with perspective */}
      <div
        ref={videoContainerRef}
        className="w-full max-w-6xl mx-auto mt-20 relative z-0"
        style={{
          perspective: '2000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Glassmorphism container - 2025 trend */}
        <div className="relative border border-border/50 rounded-2xl overflow-hidden shadow-2xl bg-black/40 backdrop-blur-sm">
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-30 pointer-events-none z-10" />

          {/* YouTube Video Embed */}
          <div className="relative pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/clOiCbl7NbU"
              title="Quack - Visual GUI for Claude Code Demo"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Glow effect behind video - 2025 trend */}
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-3xl opacity-50 pointer-events-none -z-10" />
      </div>
    </section>
  )
}
