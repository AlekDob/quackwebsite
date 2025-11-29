'use client'

import { useState } from 'react'

interface Feature {
  id: number
  title: string
  description: string
  videoSrc: string
}

const features: Feature[] = [
  {
    id: 1,
    title: 'Quack Agents System',
    description: 'Create custom AI agents with intelligent droids (Claude Code subagents) and skills. Define when and how they activate with triggers and auto-invocation rules.',
    videoSrc: '/videos/1video.mp4'
  },
  {
    id: 2,
    title: 'Advanced Chat Parameters',
    description: 'Fine-tune Claude\'s behavior in real-time. Adjust effort level, switch models on-the-fly, and control thinking depth for optimal results.',
    videoSrc: '/videos/3video.mp4'
  },
  {
    id: 3,
    title: 'Visual Code Review',
    description: 'See every change Claude makes with side-by-side diff view. Open modified files directly in your editor and work seamlessly between Quack and your IDE.',
    videoSrc: '/videos/4video.mp4'
  },
  {
    id: 4,
    title: 'Custom Layouts & Themes',
    description: 'Personalize your workspace with flexible layouts and custom backgrounds. Make Quack truly yours with themes that match your style and workflow.',
    videoSrc: '/videos/5video.mp4'
  },
  {
    id: 5,
    title: 'Multi-Terminal Management',
    description: 'Manage multiple terminals per project with intelligent grouping. Run tests, start servers, and execute commands across different contexts simultaneously.',
    videoSrc: '/videos/6video.mp4'
  },
  {
    id: 6,
    title: 'Droid Factory',
    description: 'Build custom droids and skills with AI assistance. The Droid Factory helps you create specialized agents tailored to your exact development needs.',
    videoSrc: '/videos/7video.mp4'
  },
  {
    id: 7,
    title: 'Stamina Monitor',
    description: 'Track your context usage and API spending in real-time. Know exactly how much context you have left and optimize your Claude interactions.',
    videoSrc: '/videos/8video.mp4'
  },
  {
    id: 8,
    title: 'Built-in Learning Guide',
    description: 'Master Claude Code with integrated tutorials and best practices. Learn proven techniques, shortcuts, and workflows directly inside Quack.',
    videoSrc: '/videos/9video.mp4'
  }
]

export function FeaturesShowcase() {
  const [hoveredFeature, setHoveredFeature] = useState<number>(1)
  const [isVideoHovered, setIsVideoHovered] = useState(false)
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null)

  const currentFeature = features.find(f => f.id === hoveredFeature) || features[0]

  return (
    <section className="px-6 py-32 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 text-sm mb-6">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-muted-foreground uppercase tracking-wider font-mono">
              FEATURES
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-mono mb-4">
            See Quack in Action
          </h2>
          <p className="text-lg text-muted-foreground font-mono max-w-2xl">
            Watch real demonstrations of Quack's most powerful features.
          </p>
        </div>

        {/* Mobile Layout - Accordion Style */}
        <div className="lg:hidden space-y-4">
          {features.map((feature) => (
            <div key={feature.id} className="border border-border bg-card">
              <button
                onClick={() => setExpandedMobile(expandedMobile === feature.id ? null : feature.id)}
                className="w-full p-4 text-left flex items-center justify-between"
              >
                <h3 className="text-base font-bold font-mono">
                  {feature.title}
                </h3>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    expandedMobile === feature.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedMobile === feature.id && (
                <div className="border-t border-border p-4 space-y-4">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden border-2 border-primary/30">
                    <video
                      src={feature.videoSrc}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-mono mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden lg:relative lg:flex gap-8">
          {/* List on the left - moves left when video is hovered */}
          <div
            className={`
              space-y-2 transition-all duration-500 ease-out
              ${isVideoHovered ? 'translate-x-[-40px] opacity-80 scale-90' : 'translate-x-0 scale-100'}
            `}
            style={{ width: '320px', flexShrink: 0 }}
          >
            {features.map((feature) => (
              <div
                key={feature.id}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                className={`
                  border transition-all duration-300 cursor-pointer
                  ${isVideoHovered ? 'p-3' : 'p-4'}
                  ${hoveredFeature === feature.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card/50 hover:border-primary/30'
                  }
                `}
              >
                <h3 className={`
                  font-bold font-mono transition-all duration-300
                  ${isVideoHovered ? 'text-sm' : 'text-base'}
                `}>
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Video preview on the right - scales up when hovered */}
          <div className="flex-1">
            <div
              className={`
                relative bg-black rounded-lg overflow-hidden border-2
                transition-all duration-500 ease-out origin-right
                ${isVideoHovered
                  ? 'border-primary scale-110 shadow-2xl shadow-primary/30 mb-12'
                  : 'border-primary/30 scale-100 mb-6'
                }
              `}
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
              style={{ aspectRatio: '16/9' }}
            >
              <video
                key={currentFeature.videoSrc}
                src={currentFeature.videoSrc}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            {/* Description below video - appears on hover */}
            <div
              className={`
                mt-6 transition-all duration-300
                ${hoveredFeature ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
              `}
            >
              <h4 className="text-lg font-bold font-mono mb-2">
                {currentFeature.title}
              </h4>
              <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                {currentFeature.description}
              </p>
            </div>
          </div>
        </div>
        {/* End Desktop Layout */}

      </div>
    </section>
  )
}
