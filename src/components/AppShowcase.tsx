'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface AppShowcaseProps {
  imageSrc?: string
  title?: string
  subtitle?: string
  description?: string
  badgeText?: string
}

export function AppShowcase({
  imageSrc = '/images/quack-team.jpg',
  title = 'Quack in Action',
  subtitle = 'Meet Your New AI Coding Team',
  description = 'A team of specialized AI ducks ready to help you code, manage projects, and ship faster.',
  badgeText = '🦆 Beta'
}: AppShowcaseProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isHovering, setIsHovering] = useState(false)

  // Gentle parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const smoothY = useSpring(y, springConfig)

  // 3D tilt effect on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    setMousePosition({ x, y })
  }

  const rotateX = isHovering ? (mousePosition.y - 0.5) * -8 : 0
  const rotateY = isHovering ? (mousePosition.x - 0.5) * 8 : 0

  return (
    <section
      ref={containerRef}
      className="relative px-6 py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-muted/5 to-background"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Caption above */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 text-sm mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-muted-foreground uppercase tracking-wider font-mono">
              {title}
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-mono text-foreground">
            {subtitle}
          </h2>
        </motion.div>

        {/* Main image container with effects */}
        <motion.div
          style={{ y: smoothY }}
        >
          <motion.div
            ref={imageRef}
            className="relative group cursor-pointer"
            style={{
              perspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false)
              setMousePosition({ x: 0.5, y: 0.5 })
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Animated glow border */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-primary rounded-2xl blur-xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Image wrapper with 3D transform */}
            <motion.div
              className="relative bg-card/80 backdrop-blur-sm border-2 border-primary/30 rounded-2xl overflow-hidden shadow-2xl"
              animate={{
                rotateX: isHovering ? rotateX : 0,
                rotateY: isHovering ? rotateY : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-10"
                initial={{ x: "-100%", y: "-100%" }}
                animate={isHovering ? { x: "100%", y: "100%" } : { x: "-100%", y: "-100%" }}
                transition={{ duration: 0.6 }}
              />

              {/* The actual image */}
              <motion.img
                src={imageSrc}
                alt={`Quack App - ${subtitle}`}
                className="w-full h-auto object-cover relative z-0"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              />

              {/* Corner accents */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full animate-pulse z-20" />
              <div
                className="absolute bottom-4 left-4 w-3 h-3 bg-blue-500 rounded-full animate-pulse z-20"
                style={{ animationDelay: '1s' }}
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-5 py-2 rounded-full font-mono text-sm font-bold shadow-lg z-30"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.5
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {badgeText}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Caption below */}
        <motion.p
          className="text-center mt-10 text-muted-foreground font-mono text-sm md:text-base max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </div>
    </section>
  )
}
