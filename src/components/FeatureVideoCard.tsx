'use client'

import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FeatureVideoCardProps {
  title: string
  description: string
  videoSrc: string
  icon: string
  index: number
  onVideoClick?: (index: number) => void
}

export function FeatureVideoCard({
  title,
  description,
  videoSrc,
  icon,
  index,
  onVideoClick
}: FeatureVideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  // Staggered entrance animation on scroll
  useLayoutEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(cardRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.9
      })

      // Create scroll trigger animation
      gsap.to(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1, // Stagger effect based on index
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          once: false // Allow animation to replay
        }
      })
    })

    return () => ctx.revert()
  }, [index])

  // Video hover zoom effect
  useEffect(() => {
    if (!videoRef.current) return undefined

    const tl = gsap.timeline({ paused: true })
    tl.to(videoRef.current, {
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.inOut'
    })

    if (isHovered) {
      tl.play()
    } else {
      tl.reverse()
    }

    return () => {
      tl.kill()
    }
  }, [isHovered])

  // Icon pulse effect on hover
  useEffect(() => {
    if (!iconRef.current || !isHovered) return undefined

    const tl = gsap.timeline({ repeat: -1 })
    tl.to(iconRef.current, {
      scale: 1.15,
      duration: 0.6,
      ease: 'power2.inOut'
    })
    .to(iconRef.current, {
      scale: 1.1,
      duration: 0.6,
      ease: 'power2.inOut'
    })

    return () => {
      tl.kill()
    }
  }, [isHovered])

  return (
    <div
      ref={cardRef}
      className="group relative cursor-pointer will-change-transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onVideoClick?.(index)}
    >
      {/* Animated border glow */}
      <div
        ref={glowRef}
        className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-secondary rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
      />

      {/* Main card */}
      <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-lg p-6 h-full transition-all duration-300 group-hover:translate-y-[-4px] group-hover:border-primary/50">
        {/* Video preview container */}
        <div className="relative mb-6 rounded-lg overflow-hidden bg-black/20 aspect-video">
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover will-change-transform"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Icon */}
        <div
          ref={iconRef}
          className="text-5xl mb-4 transform transition-transform duration-300"
        >
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-3 font-mono text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed font-mono">
          {description}
        </p>

        {/* Click indicator */}
        <div className="mt-4 flex items-center gap-2 text-xs text-primary/60 group-hover:text-primary transition-colors duration-300 font-mono uppercase tracking-wider">
          <span>Click to watch</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

interface VideoModalProps {
  isOpen: boolean
  videoSrc: string
  title: string
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  currentIndex: number
  totalVideos: number
}

export function VideoModal({
  isOpen,
  videoSrc,
  title,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalVideos
}: VideoModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const nextBtnRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, onPrev, onNext])

  // Modal entrance/exit animations
  useLayoutEffect(() => {
    if (!isOpen || !modalRef.current) return

    const ctx = gsap.context(() => {
      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill()
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      })

      timelineRef.current = tl

      // Set initial states
      gsap.set(backdropRef.current, { opacity: 0 })
      gsap.set(videoContainerRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20
      })
      gsap.set([prevBtnRef.current, nextBtnRef.current], {
        opacity: 0,
        x: (i) => i === 0 ? -30 : 30
      })
      gsap.set(closeBtnRef.current, {
        opacity: 0,
        scale: 0.5,
        rotate: -90
      })

      // Animate entrance
      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3
      })
      .to(videoContainerRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.2)'
      }, '-=0.2')
      .to([prevBtnRef.current, nextBtnRef.current], {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1
      }, '-=0.3')
      .to(closeBtnRef.current, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: 'back.out(2)'
      }, '-=0.2')
    })

    return () => {
      ctx.revert()
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [isOpen])

  // Navigation button hover animations
  useEffect(() => {
    const buttons = [prevBtnRef.current, nextBtnRef.current, closeBtnRef.current].filter(Boolean)

    const handleMouseEnter = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement
      gsap.to(btn, {
        scale: 1.1,
        duration: 0.2,
        ease: 'power2.out'
      })

      // Pulse effect for navigation buttons
      if (btn !== closeBtnRef.current) {
        gsap.to(btn, {
          boxShadow: '0 0 20px rgba(255, 107, 53, 0.4)',
          duration: 0.3
        })
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement
      gsap.to(btn, {
        scale: 1,
        boxShadow: 'none',
        duration: 0.2,
        ease: 'power2.out'
      })
    }

    buttons.forEach(btn => {
      if (btn) {
        btn.addEventListener('mouseenter', handleMouseEnter)
        btn.addEventListener('mouseleave', handleMouseLeave)
      }
    })

    return () => {
      buttons.forEach(btn => {
        if (btn) {
          btn.removeEventListener('mouseenter', handleMouseEnter)
          btn.removeEventListener('mouseleave', handleMouseLeave)
        }
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl will-change-opacity"
      />

      {/* Close button */}
      <button
        ref={closeBtnRef}
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-colors duration-300 group z-10 will-change-transform"
        aria-label="Close video"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation buttons */}
      {onPrev && currentIndex > 0 && (
        <button
          ref={prevBtnRef}
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          className="absolute left-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-primary/80 flex items-center justify-center transition-colors duration-300 group z-10 will-change-transform"
          aria-label="Previous video"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {onNext && currentIndex < totalVideos - 1 && (
        <button
          ref={nextBtnRef}
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-primary/80 flex items-center justify-center transition-colors duration-300 group z-10 will-change-transform"
          aria-label="Next video"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Video container */}
      <div
        ref={videoContainerRef}
        className="relative max-w-6xl w-full mx-6 will-change-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="mb-4 text-center">
          <h3 className="text-2xl font-bold text-white font-mono mb-2">{title}</h3>
          <div className="text-sm text-white/60 font-mono">
            {currentIndex + 1} / {totalVideos}
          </div>
        </div>

        {/* Video */}
        <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl border-2 border-primary/30">
          <video
            src={videoSrc}
            className="w-full"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          />
        </div>

        {/* Keyboard hints */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-white/40 font-mono">
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-white/10 rounded">ESC</kbd>
            Close
          </span>
          {onPrev && (
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white/10 rounded">←</kbd>
              Previous
            </span>
          )}
          {onNext && (
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white/10 rounded">→</kbd>
              Next
            </span>
          )}
        </div>
      </div>
    </div>
  )
}