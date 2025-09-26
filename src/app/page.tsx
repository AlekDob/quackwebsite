'use client'

import { useState } from 'react'
import { AnimatedHero } from '@/components/AnimatedHero'
import { AnimatedDuckCard } from '@/components/AnimatedDuckCard'

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<any>(null)

  const agents = [
    {
      id: 'mike',
      name: 'Mike',
      title: 'Project Manager',
      description: 'Converts requirements into executable development plans. Handles scope, timelines, and stakeholder translation.',
      expertise: ['Requirements Engineering', 'Technical Planning', 'Team Coordination'],
      personality: 'Direct, analytical, Italian-adjacent wit',
      emoji: '🦆'
    },
    {
      id: 'scott',
      name: 'Scott',
      title: 'HR & Talent Operations',
      description: 'Recruits and onboards specialized AI agents. Manages team composition and skill matching.',
      expertise: ['Agent Recruitment', 'Skills Assessment', 'Team Assembly'],
      personality: 'Enthusiastic talent scout',
      emoji: '🦆'
    },
    {
      id: 'elena',
      name: 'Elena',
      title: 'Animation Engineer',
      description: 'Implements performance-optimized UI animations. GSAP specialist with UX engineering focus.',
      expertise: ['GSAP Implementation', 'Performance Analysis', 'Motion Design Systems'],
      personality: 'Perfectionist engineer',
      emoji: '🦆'
    }
  ]

  const handleChatWithAgent = (agent: any) => {
    setSelectedAgent(agent)
    console.log(`Opening chat with ${agent.name}...`)
    // TODO: Open chat modal
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Animated Hero Section */}
      <AnimatedHero />

      {/* Team Section */}
      <section id="team-section" className="px-6 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-sm mb-8">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-muted-foreground uppercase tracking-wider font-mono">PRODUCT</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-mono">
            Droids meet you
            <br />
            wherever you work.
          </h2>

          <p className="text-lg text-muted-foreground mb-16 font-mono max-w-2xl">
            Droids embed directly into your workflow.
            <br />
            IDE, Web, CLI, Slack, Linear. Delegate tasks
            <br />
            as they come to mind, wherever you are.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <AnimatedDuckCard
                key={agent.id}
                agent={agent}
                onChatClick={handleChatWithAgent}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features Grid */}
      <section className="px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground uppercase tracking-wider font-mono">ENTERPRISE</span>
              </div>
              <h2 className="text-3xl font-bold font-mono">
                Agent Mike is designed to meet the demands of modern development teams — secure, scalable, and ready to integrate with your existing engineering tools.
              </h2>
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-center">SECURE AT EVERY LEVEL</h3>
              <div className="space-y-4 font-mono text-sm">
                <h4 className="font-semibold">Industry-grade security and compliance</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Agent Mike uses state-of-the-art security protocols to protect your data and IP from AI misuse.
                </p>
                <button className="text-primary hover:underline text-sm">
                  LEARN MORE ABOUT SECURITY →
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-center">ACROSS YOUR DEVELOPMENT STACK</h3>
              <div className="space-y-4 font-mono text-sm">
                <h4 className="font-semibold">Interface and vendor agnostic</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Agent Mike is flexible and extensible, working with any model provider, any dev tooling, and on any interface. As your tooling matures, so do your Droids.
                </p>
                <button className="text-primary hover:underline text-sm">
                  LEARN MORE ABOUT ENTERPRISE →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-mono">
            AI that will work with you,
            <br />
            not replace you
          </h2>

          <div className="flex justify-center gap-4 mb-16">
            <button className="px-6 py-3 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors">
              START BUILDING →
            </button>
          </div>

          {/* Trusted by companies logos placeholders */}
          <div className="border-t border-border pt-16">
            <div className="flex items-center gap-3 text-sm justify-center mb-8">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-muted-foreground uppercase tracking-wider font-mono">TRUSTED BY TEAMS AT</span>
            </div>
            <div className="flex justify-center items-center gap-16 opacity-40">
              <div className="text-2xl font-mono">Framer</div>
              <div className="text-2xl font-mono">Vercel</div>
              <div className="text-2xl font-mono">Linear</div>
              <div className="text-2xl font-mono">Supabase</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}