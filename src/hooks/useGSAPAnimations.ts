import { useEffect, useLayoutEffect, RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface StaggerEntranceOptions {
  delay?: number
  duration?: number
  ease?: string
  yOffset?: number
  scale?: number
  scrollTriggerStart?: string
  scrollTriggerEnd?: string
  once?: boolean
}

/**
 * Hook for staggered entrance animations on scroll
 * Creates smooth fade-in + translate animations for elements
 */
export function useStaggerEntrance(
  ref: RefObject<HTMLElement>,
  index: number = 0,
  options: StaggerEntranceOptions = {}
) {
  const {
    delay = 0.1,
    duration = 0.6,
    ease = 'power3.out',
    yOffset = 50,
    scale = 0.9,
    scrollTriggerStart = 'top 85%',
    scrollTriggerEnd = 'bottom 20%',
    once = false
  } = options

  useLayoutEffect(() => {
    if (!ref.current) return undefined

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(ref.current, {
        opacity: 0,
        y: yOffset,
        scale
      })

      // Create scroll-triggered animation
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration,
        delay: index * delay,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start: scrollTriggerStart,
          end: scrollTriggerEnd,
          toggleActions: 'play none none reverse',
          once
        }
      })
    })

    return () => ctx.revert()
  }, [ref, index, delay, duration, ease, yOffset, scale, scrollTriggerStart, scrollTriggerEnd, once])
}

interface HoverScaleOptions {
  scale?: number
  duration?: number
  ease?: string
}

/**
 * Hook for smooth scale animations on hover
 * Perfect for video previews and interactive elements
 */
export function useHoverScale(
  ref: RefObject<HTMLElement>,
  isHovered: boolean,
  options: HoverScaleOptions = {}
) {
  const {
    scale = 1.05,
    duration = 0.4,
    ease = 'power2.inOut'
  } = options

  useEffect(() => {
    if (!ref.current) return undefined

    const tl = gsap.timeline({ paused: true })
    tl.to(ref.current, {
      scale,
      duration,
      ease
    })

    if (isHovered) {
      tl.play()
    } else {
      tl.reverse()
    }

    return () => {
      tl.kill()
    }
  }, [ref, isHovered, scale, duration, ease])
}

interface PulseOptions {
  minScale?: number
  maxScale?: number
  duration?: number
  ease?: string
}

/**
 * Hook for continuous pulse animations
 * Great for icons and attention-grabbing elements
 */
export function usePulseAnimation(
  ref: RefObject<HTMLElement>,
  isActive: boolean,
  options: PulseOptions = {}
) {
  const {
    minScale = 1.1,
    maxScale = 1.15,
    duration = 0.6,
    ease = 'power2.inOut'
  } = options

  useEffect(() => {
    if (!ref.current || !isActive) return undefined

    const tl = gsap.timeline({ repeat: -1 })
    tl.to(ref.current, {
      scale: maxScale,
      duration,
      ease
    })
    .to(ref.current, {
      scale: minScale,
      duration,
      ease
    })

    return () => {
      tl.kill()
    }
  }, [ref, isActive, minScale, maxScale, duration, ease])
}

interface SlideInOptions {
  xOffset?: number
  duration?: number
  ease?: string
  delay?: number
}

/**
 * Hook for slide-in animations from left or right
 * Used for navigation buttons and sidebars
 */
export function useSlideIn(
  ref: RefObject<HTMLElement>,
  direction: 'left' | 'right',
  isVisible: boolean,
  options: SlideInOptions = {}
) {
  const {
    xOffset = 30,
    duration = 0.4,
    ease = 'power3.out',
    delay = 0
  } = options

  useLayoutEffect(() => {
    if (!ref.current) return undefined

    const initialX = direction === 'left' ? -xOffset : xOffset

    if (isVisible) {
      gsap.fromTo(ref.current,
        {
          opacity: 0,
          x: initialX
        },
        {
          opacity: 1,
          x: 0,
          duration,
          ease,
          delay
        }
      )
    } else {
      gsap.to(ref.current, {
        opacity: 0,
        x: initialX,
        duration: duration / 2,
        ease
      })
    }
  }, [ref, direction, isVisible, xOffset, duration, ease, delay])
}

interface FadeBlurOptions {
  blur?: number
  duration?: number
  ease?: string
}

/**
 * Hook for fade with blur effect
 * Perfect for modal backdrops and overlays
 */
export function useFadeBlur(
  ref: RefObject<HTMLElement>,
  isVisible: boolean,
  options: FadeBlurOptions = {}
) {
  const {
    blur = 10,
    duration = 0.3,
    ease = 'power2.out'
  } = options

  useLayoutEffect(() => {
    if (!ref.current) return undefined

    if (isVisible) {
      gsap.fromTo(ref.current,
        {
          opacity: 0,
          filter: 'blur(0px)'
        },
        {
          opacity: 1,
          filter: `blur(${blur}px)`,
          duration,
          ease
        }
      )
    } else {
      gsap.to(ref.current, {
        opacity: 0,
        filter: 'blur(0px)',
        duration,
        ease
      })
    }
  }, [ref, isVisible, blur, duration, ease])
}

/**
 * Hook for optimized performance with will-change CSS property
 * Automatically manages will-change for better performance
 */
export function useWillChange(
  ref: RefObject<HTMLElement>,
  properties: string[],
  isAnimating: boolean
) {
  useEffect(() => {
    if (!ref.current) return undefined

    if (isAnimating) {
      ref.current.style.willChange = properties.join(', ')
    } else {
      // Reset will-change after animation to free memory
      const timeout = setTimeout(() => {
        if (ref.current) {
          ref.current.style.willChange = 'auto'
        }
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [ref, properties, isAnimating])
}

/**
 * Hook for parallax scrolling effects
 * Creates depth and visual interest
 */
export function useParallax(
  ref: RefObject<HTMLElement>,
  speed: number = 0.5
) {
  useLayoutEffect(() => {
    if (!ref.current) return undefined

    gsap.to(ref.current, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  }, [ref, speed])
}

/**
 * Hook for text reveal animations with stagger
 * Perfect for headings and important text
 */
export function useTextReveal(
  ref: RefObject<HTMLElement>,
  isVisible: boolean,
  splitByWords: boolean = false
) {
  useLayoutEffect(() => {
    if (!ref.current || !isVisible) return undefined

    const text = ref.current.innerText
    const wrapper = ref.current

    if (splitByWords) {
      const words = text.split(' ')
      wrapper.innerHTML = words
        .map(word => `<span class="inline-block">${word}</span>`)
        .join(' ')
    } else {
      const chars = text.split('')
      wrapper.innerHTML = chars
        .map(char => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('')
    }

    const elements = wrapper.querySelectorAll('span')

    gsap.fromTo(elements,
      {
        opacity: 0,
        y: 20,
        rotateX: -90
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: 'back.out(1.2)'
      }
    )

    return () => {
      wrapper.innerText = text // Restore original text
    }
  }, [ref, isVisible, splitByWords])
}