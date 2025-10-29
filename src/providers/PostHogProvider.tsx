'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
        capture_pageview: true,
        capture_pageleave: true,
        person_profiles: 'identified_only',
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug()

          // Register super properties for segmentation
          posthog.register({
            site: 'quack',
            project: 'quack-website',
            domain: 'quack.build'
          })
        }
      })
    }
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
