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
      title: 'The Sarcastic PM Duck',
      description: 'Turns chaos into roadmaps with Italian wit. Specialty: Requirement translation ("make it pop" → actual specs). 87% sarcasm, 13% efficiency.',
      expertise: ['Requirement Translation', 'Scope Creep Prevention', 'Deadline Negotiation'],
      personality: '87% sarcasm, 13% efficiency',
      emoji: '🦆'
    },
    {
      id: 'scott',
      name: 'Scott',
      title: 'The HR Duck',
      description: 'Recruits perfect AI specialists. Specialty: Agent personality engineering and team chemistry optimization. Catchphrase: "I found someone AMAZING!"',
      expertise: ['Agent Personality Engineering', 'Skill Matching Algorithms', 'Team Chemistry Optimization'],
      personality: 'Enthusiastic talent scout',
      emoji: '🦆'
    },
    {
      id: 'elena',
      name: 'Elena',
      title: 'The Animation Duck',
      description: 'Pixel-perfect motion with performance obsession. GSAP specialist who will refactor your transitions 3 times until they\'re 60fps smooth.',
      expertise: ['Timeline Choreography', '60fps Optimization', 'Micro-interaction Obsession'],
      personality: 'Perfectionist engineer',
      emoji: '🦆'
    },
    {
      id: 'maya',
      name: 'Maya',
      title: 'The SEO Duck',
      description: 'Words that rank AND convert. Data-driven content strategist with semantic SEO mastery. Fun fact: Has A/B tested 47 button variations.',
      expertise: ['Semantic SEO Mastery', 'Conversion Copywriting', 'Data-driven Creativity'],
      personality: 'Analytical optimist',
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

      {/* Problem Section */}
      <section className="px-6 py-32 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-sm mb-8">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-muted-foreground uppercase tracking-wider font-mono">THE PROBLEM</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-mono">
            The Claude Code Problem Nobody Talks About
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="bg-card border border-red-500/20 p-8 font-mono">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-2xl font-bold mb-4">Waiting for Claude...</h3>
              <p className="text-muted-foreground">
                You send a prompt. Claude is thinking. You're sitting there, staring at your screen, waiting.
                Minutes pass. Your productivity drops to zero.
              </p>
            </div>

            <div className="bg-card border border-red-500/20 p-8 font-mono">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-2xl font-bold mb-4">One Project = Bottleneck</h3>
              <p className="text-muted-foreground">
                Claude Code locks you into one project at a time. Need to work on something else?
                Close the session. Lose context. Start over.
              </p>
            </div>

            <div className="bg-card border border-red-500/20 p-8 font-mono">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-2xl font-bold mb-4">Terminal-Only Hell</h3>
              <p className="text-muted-foreground">
                No visual feedback. No file explorer. No Git UI. Just text scrolling by.
                Context switching between terminal and IDE kills your flow.
              </p>
            </div>

            <div className="bg-card border border-red-500/20 p-8 font-mono">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-2xl font-bold mb-4">Miss Completed Tasks</h3>
              <p className="text-muted-foreground">
                Claude finishes a task in the background. You don't notice. You're still working on something else.
                Minutes wasted before you check back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-sm mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground uppercase tracking-wider font-mono">THE SOLUTION</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-mono">
            Parallel AI Development. Finally.
          </h2>

          <p className="text-xl text-muted-foreground mb-16 font-mono max-w-3xl">
            Quack lets you run multiple Claude Code sessions simultaneously.
            Work on 3+ projects at once. Never wait idle. Get notified when tasks complete.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-green-500/20 p-8 font-mono">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-4">Run 3+ Claude Sessions</h3>
              <p className="text-muted-foreground">
                Multiple projects, multiple terminals, multiple AI assistants. All running in parallel.
                Quack manages them all in one beautiful desktop app.
              </p>
            </div>

            <div className="bg-card border border-green-500/20 p-8 font-mono">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-4">Switch While Claude Processes</h3>
              <p className="text-muted-foreground">
                Claude is thinking on Project A? Switch to Project B. Review code. Make changes.
                When Claude finishes, you get a notification (and a quack! 🦆).
              </p>
            </div>

            <div className="bg-card border border-green-500/20 p-8 font-mono">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-4">Visual Everything</h3>
              <p className="text-muted-foreground">
                File explorer. Git panel with diffs. Preview system. Real-time AI streaming.
                Everything you need in one visual interface. No more terminal-only torture.
              </p>
            </div>

            <div className="bg-card border border-green-500/20 p-8 font-mono">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-4">Smart Notifications</h3>
              <p className="text-muted-foreground">
                Desktop notifications when Claude finishes. Status indicators (BUSY/READY).
                And yes, a delightful "quack" sound. Never miss a completed task again.
              </p>
            </div>
          </div>

          {/* Visual proof - split screen mockup */}
          <div className="mt-16 bg-card border border-border p-8 font-mono">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold">The 10x Productivity Workflow</h3>
              <p className="text-muted-foreground mt-2">
                This is how you actually work with Quack - no waiting, pure flow
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-muted/20 p-4 border-l-4 border-yellow-500">
                <div className="text-xs text-yellow-500 mb-2">● BUSY</div>
                <div className="font-bold">Project A</div>
                <div className="text-sm text-muted-foreground">Claude is writing tests...</div>
              </div>
              <div className="bg-muted/20 p-4 border-l-4 border-green-500">
                <div className="text-xs text-green-500 mb-2">● READY</div>
                <div className="font-bold">Project B</div>
                <div className="text-sm text-muted-foreground">You're reviewing code</div>
              </div>
              <div className="bg-muted/20 p-4 border-l-4 border-yellow-500">
                <div className="text-xs text-yellow-500 mb-2">● BUSY</div>
                <div className="font-bold">Project C</div>
                <div className="text-sm text-muted-foreground">Claude is refactoring...</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded">
                <span>🦆</span>
                <span className="font-bold">Result: 3x more work done in the same time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="px-6 py-32 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-sm mb-8">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-muted-foreground uppercase tracking-wider font-mono">FEATURES</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-mono">
            Everything You Need, Visually
          </h2>

          <p className="text-lg text-muted-foreground mb-16 font-mono max-w-2xl">
            Built on Claude Agent SDK with a beautiful native interface.
            <br />
            Not just a terminal - a complete visual development environment.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1: Multi-Project Workspace */}
            <div className="bg-card border border-border p-8">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 font-mono">Multi-Project Workspace</h3>
              <p className="text-muted-foreground mb-6">
                Run multiple Claude Code sessions in parallel. Each project in its own terminal with independent AI assistant.
                Switch instantly, no context loss.
              </p>
              <ul className="space-y-2 text-sm font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>3+ simultaneous projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Terminal groups organization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Independent AI assistants per project</span>
                </li>
              </ul>
            </div>

            {/* Feature 2: Visual Git Integration */}
            <div className="bg-card border border-border p-8">
              <div className="text-5xl mb-4">🔀</div>
              <h3 className="text-2xl font-bold mb-4 font-mono">Visual Git Integration</h3>
              <p className="text-muted-foreground mb-6">
                See your changes visually. Side-by-side diff viewer, staging area, commit UI, and timeline.
                No more git status in terminal.
              </p>
              <ul className="space-y-2 text-sm font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Side-by-side diff viewer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Interactive staging/unstaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Commit history timeline</span>
                </li>
              </ul>
            </div>

            {/* Feature 3: Smart Terminal Management */}
            <div className="bg-card border border-border p-8">
              <div className="text-5xl mb-4">💻</div>
              <h3 className="text-2xl font-bold mb-4 font-mono">Smart Terminal Management</h3>
              <p className="text-muted-foreground mb-6">
                True PTY terminals with intelligent state detection. Know when commands finish with BUSY/READY indicators
                and desktop notifications.
              </p>
              <ul className="space-y-2 text-sm font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>BUSY/READY status indicators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Desktop notifications + "quack" sound</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Smart auto-scroll system</span>
                </li>
              </ul>
            </div>

            {/* Feature 4: File Explorer & Preview */}
            <div className="bg-card border border-border p-8">
              <div className="text-5xl mb-4">📁</div>
              <h3 className="text-2xl font-bold mb-4 font-mono">File Explorer & Preview</h3>
              <p className="text-muted-foreground mb-6">
                Navigate your project visually. File explorer synced with terminal CWD.
                Preview files with Monaco Editor integration.
              </p>
              <ul className="space-y-2 text-sm font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Synced with terminal directory</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Monaco Editor file preview</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Context menu operations</span>
                </li>
              </ul>
            </div>

            {/* Feature 5: Real-time AI Assistant */}
            <div className="bg-card border border-border p-8">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold mb-4 font-mono">Real-time AI Assistant</h3>
              <p className="text-muted-foreground mb-6">
                Built on Claude Agent SDK. Real-time streaming messages, visual tool widgets,
                subagents support, and full SDK capabilities.
              </p>
              <ul className="space-y-2 text-sm font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Real-time streaming messages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Visual tool usage display</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Session persistence & resume</span>
                </li>
              </ul>
            </div>

            {/* Feature 6: HTTP Hooks Integration */}
            <div className="bg-card border border-border p-8">
              <div className="text-5xl mb-4">🔌</div>
              <h3 className="text-2xl font-bold mb-4 font-mono">HTTP Hooks Integration</h3>
              <p className="text-muted-foreground mb-6">
                Local HTTP endpoint for external tool integration. Let Claude Code, Factory.ai,
                or other tools update Quack's terminal status.
              </p>
              <ul className="space-y-2 text-sm font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Local endpoint on port 6768</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Bidirectional communication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Custom notifications control</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section - Join Discord */}
      <section className="px-6 py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <img
              src="/images/cyberducks.png"
              alt="Quack Duck"
              className="w-32 h-32 mx-auto mb-8"
            />
          </div>

          <h2 className="text-5xl lg:text-7xl font-bold mb-8 font-mono">
            Ready to 10x Your
            <br />
            Claude Code Workflow?
          </h2>

          <p className="text-xl text-muted-foreground mb-12 font-mono max-w-2xl mx-auto">
            Join our community of developers who stopped waiting for Claude
            <br />
            and started working in parallel. Early access available now.
          </p>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button
              onClick={() => window.open('https://discord.gg/quack', '_blank')}
              className="px-12 py-5 bg-primary text-primary-foreground text-lg font-mono uppercase tracking-wider hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
            >
              🦆 JOIN DISCORD - GET EARLY ACCESS
            </button>
          </div>

          {/* Creator info */}
          <div className="mb-12 text-center">
            <p className="text-muted-foreground font-mono mb-2">Built with ❤️ by</p>
            <a
              href="https://alekdob.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold font-mono text-primary hover:text-primary/80 transition-colors"
            >
              Alek Dobrohotov
            </a>
            <p className="text-sm text-muted-foreground font-mono mt-2">
              <a
                href="https://alekdob.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                alekdob.com
              </a>
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card border border-border p-6 rounded-lg">
              <div className="text-4xl font-bold text-primary font-mono mb-2">Early Access</div>
              <div className="text-sm text-muted-foreground font-mono">Join the First Wave</div>
            </div>
            <div className="bg-card border border-border p-6 rounded-lg">
              <div className="text-4xl font-bold text-primary font-mono mb-2">macOS</div>
              <div className="text-sm text-muted-foreground font-mono">Native Desktop App</div>
            </div>
            <div className="bg-card border border-border p-6 rounded-lg">
              <div className="text-4xl font-bold text-primary font-mono mb-2">Free</div>
              <div className="text-sm text-muted-foreground font-mono">Open Source Forever</div>
            </div>
          </div>

          {/* What you get */}
          <div className="border-t border-border pt-16">
            <h3 className="text-2xl font-bold mb-8 font-mono">What You'll Get in Discord</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">💬</span>
                <div>
                  <div className="font-bold font-mono">Early Access Download</div>
                  <div className="text-sm text-muted-foreground">Be the first to try Quack beta</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">🚀</span>
                <div>
                  <div className="font-bold font-mono">Feature Requests</div>
                  <div className="text-sm text-muted-foreground">Shape the future of Quack</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">🐛</span>
                <div>
                  <div className="font-bold font-mono">Direct Support</div>
                  <div className="text-sm text-muted-foreground">Get help from the dev team</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">🦆</span>
                <div>
                  <div className="font-bold font-mono">Duck Memes</div>
                  <div className="text-sm text-muted-foreground">We have the best duck memes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-sm text-muted-foreground font-mono">
              <div className="flex items-center gap-2">
                <span>💻</span>
                <span>Built with Tauri + React</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🤖</span>
                <span>Powered by Claude Agent SDK</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🔓</span>
                <span>MIT Licensed</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}