'use client'

import { useEffect, useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'

interface AnimatedVideoModalProps {
  isOpen: boolean
  videoSrc: string
  title: string
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  currentIndex: number
  totalVideos: number
}

export function AnimatedVideoModal({
  isOpen,
  videoSrc,
  title,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalVideos
}: AnimatedVideoModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const nextBtnRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const prevVideoSrc = useRef<string>(videoSrc)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        animateClose()
      }
      if (e.key === 'ArrowLeft' && onPrev) {
        animateTransition('prev')
      }
      if (e.key === 'ArrowRight' && onNext) {
        animateTransition('next')
      }
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

  // Video transition animation when switching between videos
  useEffect(() => {
    if (videoSrc !== prevVideoSrc.current && videoRef.current && titleRef.current) {
      const tl = gsap.timeline()

      // Determine direction based on navigation
      const direction = currentIndex > features.indexOf(features.find(f => f.videoSrc === prevVideoSrc.current) || features[0]) ? 1 : -1

      // Animate out old content
      tl.to([videoRef.current, titleRef.current], {
        opacity: 0,
        x: direction * -100,
        duration: 0.3,
        ease: 'power2.in'
      })
      .set(videoRef.current, { src: videoSrc }) // Change video source
      .set(titleRef.current, { innerText: title }) // Change title
      .fromTo([videoRef.current, titleRef.current],
        {
          opacity: 0,
          x: direction * 100
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: 'power2.out'
        }
      )

      prevVideoSrc.current = videoSrc
    }
  }, [videoSrc, title, currentIndex])

  const animateClose = () => {
    if (!timelineRef.current) return

    const tl = gsap.timeline({
      onComplete: onClose
    })

    tl.to(videoContainerRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to([prevBtnRef.current, nextBtnRef.current, closeBtnRef.current], {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      stagger: 0.05
    }, '-=0.2')
    .to(backdropRef.current, {
      opacity: 0,
      duration: 0.2
    }, '-=0.1')
  }

  const animateTransition = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && onPrev) {
      // Animate button press
      gsap.to(prevBtnRef.current, {
        scale: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: onPrev
      })
    } else if (direction === 'next' && onNext) {
      // Animate button press
      gsap.to(nextBtnRef.current, {
        scale: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: onNext
      })
    }
  }

  // Enhanced entrance animation with orchestrated timeline
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

      // Set initial states with more dramatic transforms
      gsap.set(backdropRef.current, {
        opacity: 0,
        backdropFilter: 'blur(0px)'
      })
      gsap.set(videoContainerRef.current, {
        opacity: 0,
        scale: 0.5,
        y: 100,
        rotateX: -15,
        transformPerspective: 1000
      })
      gsap.set([prevBtnRef.current, nextBtnRef.current], {
        opacity: 0,
        scale: 0,
        rotate: (i) => i === 0 ? -180 : 180
      })
      gsap.set(closeBtnRef.current, {
        opacity: 0,
        scale: 0,
        rotate: -180
      })
      gsap.set(counterRef.current, {
        opacity: 0,
        y: 20
      })

      // Orchestrated entrance animation
      tl.to(backdropRef.current, {
        opacity: 1,
        backdropFilter: 'blur(10px)',
        duration: 0.4
      })
      .to(videoContainerRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'back.out(1.4)'
      }, '-=0.2')
      .to([prevBtnRef.current, nextBtnRef.current], {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(2)'
      }, '-=0.3')
      .to(closeBtnRef.current, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.4,
        ease: 'back.out(3)'
      }, '-=0.3')
      .to(counterRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3
      }, '-=0.2')

      // Add subtle breathing animation to video container
      gsap.to(videoContainerRef.current, {
        scale: 1.02,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 1
      })
    })

    return () => {
      ctx.revert()
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [isOpen])

  // Enhanced button hover animations with glow effect
  useEffect(() => {
    const buttons = [prevBtnRef.current, nextBtnRef.current, closeBtnRef.current].filter(Boolean)

    const handleMouseEnter = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement
      const isNavButton = btn !== closeBtnRef.current

      gsap.to(btn, {
        scale: 1.15,
        duration: 0.3,
        ease: 'back.out(2)'
      })

      if (isNavButton) {
        // Create glow effect
        gsap.to(btn, {
          boxShadow: '0 0 30px rgba(255, 107, 53, 0.6), 0 0 60px rgba(255, 107, 53, 0.3)',
          duration: 0.3
        })
      } else {
        // Close button gets red glow
        gsap.to(btn, {
          boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
          duration: 0.3
        })
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement
      gsap.to(btn, {
        scale: 1,
        boxShadow: 'none',
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseDown = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1
      })
    }

    const handleMouseUp = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement
      gsap.to(btn, {
        scale: 1.15,
        duration: 0.1
      })
    }

    buttons.forEach(btn => {
      if (btn) {
        btn.addEventListener('mouseenter', handleMouseEnter)
        btn.addEventListener('mouseleave', handleMouseLeave)
        btn.addEventListener('mousedown', handleMouseDown)
        btn.addEventListener('mouseup', handleMouseUp)
      }
    })

    return () => {
      buttons.forEach(btn => {
        if (btn) {
          btn.removeEventListener('mouseenter', handleMouseEnter)
          btn.removeEventListener('mouseleave', handleMouseLeave)
          btn.removeEventListener('mousedown', handleMouseDown)
          btn.removeEventListener('mouseup', handleMouseUp)
        }
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={animateClose}
    >
      {/* Backdrop with animated blur */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/90 will-change-[opacity,backdrop-filter]"
        style={{ backdropFilter: 'blur(0px)' }}
      />

      {/* Close button */}
      <button
        ref={closeBtnRef}
        onClick={(e) => {
          e.stopPropagation()
          animateClose()
        }}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-red-500/20 flex items-center justify-center transition-colors duration-300 group z-10 will-change-transform"
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
            animateTransition('prev')
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
            animateTransition('next')
          }}
          className="absolute right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-primary/80 flex items-center justify-center transition-colors duration-300 group z-10 will-change-transform"
          aria-label="Next video"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Video container with 3D transform */}
      <div
        ref={videoContainerRef}
        className="relative max-w-6xl w-full mx-6 will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="mb-4 text-center">
          <h3 ref={titleRef} className="text-2xl font-bold text-white font-mono mb-2">{title}</h3>
          <div ref={counterRef} className="text-sm text-white/60 font-mono">
            {currentIndex + 1} / {totalVideos}
          </div>
        </div>

        {/* Video with enhanced shadow and border */}
        <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl border-2 border-primary/30 will-change-transform">
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          />

          {/* Animated corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl animate-pulse" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/50 rounded-tr-2xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/50 rounded-bl-2xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/50 rounded-br-2xl animate-pulse" />
        </div>

        {/* Keyboard hints with fade animation */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-white/40 font-mono">
          <span className="flex items-center gap-1 hover:text-white/60 transition-colors">
            <kbd className="px-2 py-1 bg-white/10 rounded">ESC</kbd>
            Close
          </span>
          {onPrev && (
            <span className="flex items-center gap-1 hover:text-white/60 transition-colors">
              <kbd className="px-2 py-1 bg-white/10 rounded">←</kbd>
              Previous
            </span>
          )}
          {onNext && (
            <span className="flex items-center gap-1 hover:text-white/60 transition-colors">
              <kbd className="px-2 py-1 bg-white/10 rounded">→</kbd>
              Next
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// Features data for reference
const features = [
  {
    title: 'Quack Agents System',
    videoSrc: '/videos/1video.mp4',
  },
  {
    title: 'Advanced Chat Parameters',
    videoSrc: '/videos/3video.mp4',
  },
  {
    title: 'Visual Code Review',
    videoSrc: '/videos/4video.mp4',
  },
  {
    title: 'Custom Layouts & Themes',
    videoSrc: '/videos/5video.mp4',
  },
  {
    title: 'Multi-Terminal Management',
    videoSrc: '/videos/6video.mp4',
  },
  {
    title: 'Droid Factory',
    videoSrc: '/videos/7video.mp4',
  },
  {
    title: 'Stamina Monitor',
    videoSrc: '/videos/8video.mp4',
  },
  {
    title: 'Built-in Learning Guide',
    videoSrc: '/videos/9video.mp4',
  }
]