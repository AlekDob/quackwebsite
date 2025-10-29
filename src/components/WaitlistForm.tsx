'use client'

import { useState } from 'react'
import { usePostHog } from 'posthog-js/react'

interface WaitlistFormProps {
  source?: string
  placeholder?: string
  buttonText?: string
  className?: string
}

export function WaitlistForm({
  source = 'unknown',
  placeholder = 'Enter your email',
  buttonText = 'Join Waitlist',
  className = ''
}: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const posthog = usePostHog()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('🎉 You\'re on the list! Check your email.')
        setEmail('')

        // Track successful signup in PostHog
        posthog?.capture('waitlist_signup', {
          email,
          source,
          timestamp: new Date().toISOString()
        })

        // Also identify user in PostHog
        posthog?.identify(email, {
          email,
          signup_source: source,
          signup_date: new Date().toISOString()
        })

      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')

        // Track failed signup in PostHog
        posthog?.capture('waitlist_signup_failed', {
          email,
          source,
          error: data.error
        })
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please check your connection.')
      console.error('Waitlist form error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          disabled={status === 'loading' || status === 'success'}
          className="flex-1 px-6 py-4 bg-background border-2 border-border font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-8 py-4 bg-primary text-primary-foreground font-mono uppercase tracking-wider hover:bg-primary/90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {status === 'loading' ? 'Joining...' : status === 'success' ? '✓ Joined!' : buttonText}
        </button>
      </div>

      {message && (
        <p className={`text-sm font-mono ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}

      {status === 'idle' && (
        <p className="text-xs text-muted-foreground font-mono">
          Join 1000+ developers. Free & open-source. No spam.
        </p>
      )}
    </form>
  )
}
