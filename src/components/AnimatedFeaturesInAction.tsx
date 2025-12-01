'use client'

import { useState, useRef, useLayoutEffect } from 'react'
import { FeatureVideoCard, VideoModal } from './FeatureVideoCard'
import { AnimatedSection } from './AnimatedSection'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Feature {
  title: string
  description: string
  videoSrc: string
  icon: string
}

const features: Feature[] = [
  {
    title: 'Quack Agents System',
    description: 'Create custom AI agents with intelligent droids (Claude Code subagents) and skills. Define when and how they activate with triggers and auto-invocation rules.',
    videoSrc: '/videos/1video.mp4',
    icon: '🤖'
  },
  {
    title: 'Advanced Chat Parameters',
    description: 'Fine-tune Claude\'s behavior in real-time. Adjust effort level, switch models on-the-fly, and control thinking depth for optimal results.',
    videoSrc: '/videos/3video.mp4',
    icon: '⚙️'
  },
  {
    title: 'Visual Code Review',
    description: 'See every change Claude makes with side-by-side diff view. Open modified files directly in your editor and work seamlessly between Quack and your IDE.',
    videoSrc: '/videos/4video.mp4',
    icon: '👁️'
  },
  {
    title: 'Custom Layouts & Themes',
    description: 'Personalize your workspace with flexible layouts and custom backgrounds. Make Quack truly yours with themes that match your style and workflow.',
    videoSrc: '/videos/5video.mp4',
    icon: '🎨'
  },
  {
    title: 'Multi-Terminal Management',
    description: 'Manage multiple terminals per project with intelligent grouping. Run tests, start servers, and execute commands across different contexts simultaneously.',
    videoSrc: '/videos/6video.mp4',
    icon: '💻'
  },
  {
    title: 'Droid Factory',
    description: 'Build custom droids and skills with AI assistance. The Droid Factory helps you create specialized agents tailored to your exact development needs.',
    videoSrc: '/videos/7video.mp4',
    icon: '🏭'
  },
  {
    title: 'Stamina Monitor',
    description: 'Track your context usage and API spending in real-time. Know exactly how much context you have left and optimize your Claude interactions.',
    videoSrc: '/videos/8video.mp4',
    icon: '⚡'
  },
  {
    title: 'Built-in Learning Guide',
    description: 'Master Claude Code with integrated tutorials and best practices. Learn proven techniques, shortcuts, and workflows directly inside Quack.',
    videoSrc: '/videos/9video.mp4',
    icon: '📚'
  }
]

export function AnimatedFeaturesInAction() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const decorativeRef1 = useRef<HTMLDivElement>(null)
  const decorativeRef2 = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)

  // Animate decorative background elements with parallax
  useLayoutEffect(() => {
    if (!decorativeRef1.current || !decorativeRef2.current) return

    const ctx = gsap.context(() => {
      // Floating animation for decorative elements
      gsap.to(decorativeRef1.current, {
        y: -30,
        x: 20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })

      gsap.to(decorativeRef2.current, {
        y: 30,
        x: -20,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })

      // Parallax effect on scroll
      gsap.to(decorativeRef1.current, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })

      gsap.to(decorativeRef2.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    })

    return () => ctx.revert()
  }, [])

  // Animate title with character split effect
  useLayoutEffect(() => {
    if (!titleRef.current) return

    const ctx = gsap.context(() => {
      // Split text into spans
      const text = titleRef.current!.innerText
      const words = text.split(' ')
      titleRef.current!.innerHTML = words
        .map(word => `<span class="inline-block">${word}</span>`)
        .join(' ')

      const wordSpans = titleRef.current!.querySelectorAll('span')

      gsap.fromTo(wordSpans,
        {
          opacity: 0,
          y: 50,
          rotateX: -90,
          transformOrigin: '50% 50% -50'
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  // Animate subtitle with typewriter effect
  useLayoutEffect(() => {
    if (!subtitleRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(subtitleRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  // Animate counter badge with bounce effect
  useLayoutEffect(() => {
    if (!counterRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(counterRef.current,
        {
          opacity: 0,
          scale: 0,
          rotate: -180
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.8,
          delay: 1,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: counterRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Add subtle floating animation
      gsap.to(counterRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 1.8
      })
    })

    return () => ctx.revert()
  }, [])

  const handlePrev = () => {
    if (selectedVideoIndex !== null && selectedVideoIndex > 0) {
      setSelectedVideoIndex(selectedVideoIndex - 1)
    }
  }

  const handleNext = () => {
    if (selectedVideoIndex !== null && selectedVideoIndex < features.length - 1) {
      setSelectedVideoIndex(selectedVideoIndex + 1)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="px-6 py-32 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden"
    >
      {/* Decorative background elements with animation */}
      <div className="absolute inset-0 opacity-30">
        <div
          ref={decorativeRef1}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl will-change-transform"
        />
        <div
          ref={decorativeRef2}
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl will-change-transform"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div ref={badgeRef} className="flex items-center gap-3 text-sm mb-8">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-muted-foreground uppercase tracking-wider font-mono">
              FEATURES IN ACTION
            </span>
          </div>

          <h2
            ref={titleRef}
            className="text-4xl lg:text-6xl font-bold mb-6 font-mono bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-accent"
          >
            See Quack in Action
          </h2>

          <p
            ref={subtitleRef}
            className="text-lg text-muted-foreground mb-16 font-mono max-w-3xl"
          >
            Watch real demonstrations of Quack's most powerful features.
            <br />
            Click any card to see the magic happen.
          </p>
        </AnimatedSection>

        {/* Features grid with staggered animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureVideoCard
              key={index}
              title={feature.title}
              description={feature.description}
              videoSrc={feature.videoSrc}
              icon={feature.icon}
              index={index}
              onVideoClick={(idx) => setSelectedVideoIndex(idx)}
            />
          ))}
        </div>

        {/* Video count indicator with animation */}
        <div ref={counterRef} className="mt-16 text-center will-change-transform">
          <div className="inline-flex items-center gap-3 bg-card/50 backdrop-blur-xl border border-border px-6 py-3 rounded-full font-mono text-sm">
            <span className="text-primary font-bold">{features.length}</span>
            <span className="text-muted-foreground">powerful features showcased</span>
            <span className="text-2xl animate-bounce">🦆</span>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideoIndex !== null && (
        <VideoModal
          isOpen={true}
          videoSrc={features[selectedVideoIndex].videoSrc}
          title={features[selectedVideoIndex].title}
          onClose={() => setSelectedVideoIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          currentIndex={selectedVideoIndex}
          totalVideos={features.length}
        />
      )}
    </section>
  )
}