'use client'

// Re-export the animated version as the main component
export { AnimatedFeaturesInAction as FeaturesInAction } from './AnimatedFeaturesInAction'

// Keep the original implementation as FeaturesInActionBase for backwards compatibility
import { useState } from 'react'
import { FeatureVideoCard, VideoModal } from './FeatureVideoCard'
import { AnimatedSection } from './AnimatedSection'

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

export function FeaturesInActionBase() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null)

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
    <section className="px-6 py-32 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="flex items-center gap-3 text-sm mb-8">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-muted-foreground uppercase tracking-wider font-mono">
              FEATURES IN ACTION
            </span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6 font-mono bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-accent">
            See Quack in Action
          </h2>

          <p className="text-lg text-muted-foreground mb-16 font-mono max-w-3xl">
            Watch real demonstrations of Quack's most powerful features.
            <br />
            Click any card to see the magic happen.
          </p>
        </AnimatedSection>

        {/* Features grid */}
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

        {/* Video count indicator */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-card/50 backdrop-blur-xl border border-border px-6 py-3 rounded-full font-mono text-sm">
              <span className="text-primary font-bold">{features.length}</span>
              <span className="text-muted-foreground">powerful features showcased</span>
              <span className="text-2xl">🦆</span>
            </div>
          </div>
        </AnimatedSection>
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
