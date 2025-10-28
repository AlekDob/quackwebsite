import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'], // Reduced from 4 weights to 2 for better performance
  display: 'swap', // Prevents invisible text during font load
  preload: true,
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://quack-app.dev'),
  title: 'Quack - Visual GUI for AI Coding with Claude Code | Work on Multiple Projects Simultaneously',
  description: 'Work on 3+ Claude Code projects simultaneously with Quack - the only visual desktop GUI for parallel AI development. Visual terminals, Git integration, smart notifications. Join 1000+ developers. Free & open-source.',
  keywords: 'claude code GUI, visual ai coding, claude code desktop app, multiple claude sessions, parallel ai development, ai coding productivity, claude agent sdk interface, multi-project workspace, claude code tool',
  authors: [{ name: 'Alek Dobrohotov', url: 'https://alekdob.com' }],
  creator: 'Alek Dobrohotov',
  publisher: 'Alek Dobrohotov',
  alternates: {
    canonical: 'https://quack-app.dev',
  },
  openGraph: {
    title: '🦆 Quack - Visual GUI for AI Coding with Claude Code',
    description: 'Work on multiple projects while Claude thinks. The only desktop app for parallel Claude Code sessions. Visual terminals, Git integration, and smart notifications.',
    url: 'https://quack-app.dev',
    siteName: 'Quack',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/quack-screenshot.png',
        width: 1200,
        height: 630,
        alt: 'Quack Desktop App - Multiple Claude Code Sessions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🦆 Quack - Visual GUI for Claude Code',
    description: 'Work on multiple projects simultaneously. Never wait idle while Claude thinks. Early access available now.',
    creator: '@quackapp',
    images: ['/images/quack-screenshot.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // SoftwareApplication Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Quack",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "macOS 12.0 or later",
    "description": "Visual GUI for AI Coding with Claude Code. Work on multiple projects simultaneously with visual terminals, Git integration, and smart notifications.",
    "url": "https://quack-app.dev",
    "screenshot": "https://quack-app.dev/images/quack-screenshot.png",
    "softwareVersion": "0.1.0-beta",
    "datePublished": "2025-01-15",
    "dateModified": new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Person",
      "name": "Alek Dobrohotov",
      "url": "https://alekdob.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "softwareRequirements": "macOS 12.0 or later",
    "featureList": [
      "Multi-Project Workspace - Run 3+ Claude Code sessions in parallel",
      "Visual Git Integration - Side-by-side diff viewer and commit UI",
      "Smart Terminal Management - BUSY/READY status indicators",
      "Real-time AI Assistant - Built on Claude Agent SDK",
      "HTTP Hooks Integration - External tool integration",
      "Desktop Notifications - Quack sound when tasks complete"
    ]
  }

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Quack",
    "url": "https://quack-app.dev",
    "logo": "https://quack-app.dev/images/quackapp.png",
    "sameAs": [
      "https://discord.gg/quack",
      "https://twitter.com/quackapp"
    ],
    "founder": {
      "@type": "Person",
      "name": "Alek Dobrohotov",
      "url": "https://alekdob.com"
    }
  }

  // VideoObject Schema
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Quack Demo - Visual GUI for Claude Code",
    "description": "See how Quack enables developers to work on multiple Claude Code projects simultaneously with visual terminals, Git integration, and smart notifications.",
    "thumbnailUrl": "https://i.ytimg.com/vi/clOiCbl7NbU/maxresdefault.jpg",
    "uploadDate": "2025-01-15",
    "contentUrl": "https://www.youtube.com/watch?v=clOiCbl7NbU",
    "embedUrl": "https://www.youtube.com/embed/clOiCbl7NbU",
    "duration": "PT3M24S"
  }

  return (
    <html lang="en">
      <head>
        {/* SoftwareApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* VideoObject Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      </head>
      <body className={jetbrainsMono.className}>{children}</body>
    </html>
  )
}