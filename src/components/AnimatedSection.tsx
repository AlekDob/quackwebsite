'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  stagger = 0
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Set initial state
    gsap.set(section, {
      opacity: 0,
      y: 50,
    })

    // Animate on scroll
    ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay,
          ease: 'power3.out',
        })
      },
      once: true,
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [delay])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}
