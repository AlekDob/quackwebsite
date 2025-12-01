'use client'

import { ReactNode } from 'react'

interface GlowIconProps {
  children: ReactNode
  color?: 'primary' | 'red' | 'green' | 'blue' | 'yellow' | 'muted'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  glow?: boolean
}

const colorClasses = {
  primary: 'text-primary',
  red: 'text-red-500',
  green: 'text-green-500',
  blue: 'text-blue-500',
  yellow: 'text-yellow-500',
  muted: 'text-muted-foreground'
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
}

const glowSizes = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px'
}

export function GlowIcon({
  children,
  color = 'primary',
  size = 'lg',
  className = '',
  glow = true
}: GlowIconProps) {
  return (
    <div
      className={`
        inline-flex items-center justify-center
        ${colorClasses[color]}
        ${sizeClasses[size]}
        ${glow ? 'glow-icon' : ''}
        transition-all duration-300
        ${className}
      `}
      style={glow ? {
        filter: `drop-shadow(0 0 ${glowSizes[size]} currentColor)`,
      } : undefined}
    >
      {children}
    </div>
  )
}

// Pre-built icon components with SVG
export function IconX({ color = 'red', size = 'lg', glow = true }: Omit<GlowIconProps, 'children'>) {
  return (
    <GlowIcon color={color} size={size} glow={glow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </GlowIcon>
  )
}

export function IconCheck({ color = 'green', size = 'lg', glow = true }: Omit<GlowIconProps, 'children'>) {
  return (
    <GlowIcon color={color} size={size} glow={glow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </GlowIcon>
  )
}

export function IconGrid({ color = 'primary', size = 'xl', glow = true }: Omit<GlowIconProps, 'children'>) {
  return (
    <GlowIcon color={color} size={size} glow={glow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    </GlowIcon>
  )
}

export function IconGitBranch({ color = 'primary', size = 'xl', glow = true }: Omit<GlowIconProps, 'children'>) {
  return (
    <GlowIcon color={color} size={size} glow={glow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </svg>
    </GlowIcon>
  )
}

export function IconTerminal({ color = 'primary', size = 'xl', glow = true }: Omit<GlowIconProps, 'children'>) {
  return (
    <GlowIcon color={color} size={size} glow={glow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    </GlowIcon>
  )
}

export function IconFolder({ color = 'primary', size = 'xl', glow = true }: Omit<GlowIconProps, 'children'>) {
  return (
    <GlowIcon color={color} size={size} glow={glow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    </GlowIcon>
  )
}

export function IconCpu({ color = 'primary', size = 'xl', glow = true }: Omit<GlowIconProps, 'children'>) {
  return (
    <GlowIcon color={color} size={size} glow={glow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    </GlowIcon>
  )
}

export function IconPlug({ color = 'primary', size = 'xl', glow = true }: Omit<GlowIconProps, 'children'>) {
  return (
    <GlowIcon color={color} size={size} glow={glow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M12 22v-5" />
        <path d="M9 8V2" />
        <path d="M15 8V2" />
        <path d="M18 8v5a6 6 0 0 1-12 0V8h12z" />
      </svg>
    </GlowIcon>
  )
}

export function IconBell({ color = 'primary', size = 'xl', glow = true }: Omit<GlowIconProps, 'children'>) {
  return (
    <GlowIcon color={color} size={size} glow={glow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    </GlowIcon>
  )
}

export function IconPip({ color = 'primary', size = 'xl', glow = true }: Omit<GlowIconProps, 'children'>) {
  return (
    <GlowIcon color={color} size={size} glow={glow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <rect x="12" y="10" width="8" height="5" rx="1" />
      </svg>
    </GlowIcon>
  )
}

export function IconMessage({ color = 'primary', size = 'lg', glow = true }: Omit<GlowIconProps, 'children'>) {
  return (
    <GlowIcon color={color} size={size} glow={glow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </GlowIcon>
  )
}

export function IconRocket({ color = 'primary', size = 'lg', glow = true }: Omit<GlowIconProps, 'children'>) {
  return (
    <GlowIcon color={color} size={size} glow={glow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    </GlowIcon>
  )
}

export function IconHeadphones({ color = 'primary', size = 'lg', glow = true }: Omit<GlowIconProps, 'children'>) {
  return (
    <GlowIcon color={color} size={size} glow={glow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    </GlowIcon>
  )
}

export function IconCode({ color = 'primary', size = 'lg', glow = true }: Omit<GlowIconProps, 'children'>) {
  return (
    <GlowIcon color={color} size={size} glow={glow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    </GlowIcon>
  )
}

export function IconLock({ color = 'primary', size = 'lg', glow = true }: Omit<GlowIconProps, 'children'>) {
  return (
    <GlowIcon color={color} size={size} glow={glow}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </GlowIcon>
  )
}
