'use client'

import { AnimatedFeaturesInAction } from '@/components/AnimatedFeaturesInAction'

export default function TestAnimationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">GSAP Animation Test Page</h1>
        <p className="text-muted-foreground">
          Scroll down to see the animated features in action
        </p>
      </div>

      {/* Add some space before the features section */}
      <div className="h-96" />

      {/* Animated Features Section */}
      <AnimatedFeaturesInAction />

      {/* Add some space after for scrolling */}
      <div className="h-96" />
    </main>
  )
}