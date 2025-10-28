'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  index?: number
  staggerDelay?: number
}

export function AnimatedCard({
  children,
  className = '',
  index = 0,
  staggerDelay = 0.1
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // Set initial state
    gsap.set(card, {
      opacity: 0,
      y: 30,
      scale: 0.95,
    })

    // Animate on scroll with stagger
    ScrollTrigger.create({
      trigger: card,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * staggerDelay,
          ease: 'back.out(1.2)',
        })
      },
      once: true,
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [index, staggerDelay])

  return (
    <div ref={cardRef} className={className}>
      {children}
    </div>
  )
}
