# GSAP Animations Documentation

## Overview
Professional GSAP animations implemented for the Quack Features section with buttery-smooth 60fps performance.

## Installed Dependencies
- **gsap**: ^3.13.0 - Core animation library
- **ScrollTrigger**: Included plugin for scroll-based animations

## Animation Components

### 1. FeatureVideoCard (`/src/components/FeatureVideoCard.tsx`)
Premium card animations with sophisticated hover effects:

#### Staggered Entrance Animation
- **Trigger**: Scroll (when cards enter viewport)
- **Effect**: Fade in + translate from bottom (y: 50) + scale (0.9 → 1)
- **Duration**: 0.6s per card
- **Stagger**: 0.1s delay between cards
- **Easing**: `power3.out` for smooth deceleration

#### Video Hover Zoom
- **Trigger**: Mouse hover
- **Effect**: Subtle zoom on video (scale: 1 → 1.05)
- **Duration**: 0.4s
- **Easing**: `power2.inOut` for smooth transition

#### Icon Pulse Animation
- **Trigger**: Mouse hover
- **Effect**: Continuous pulse (scale: 1.1 ↔ 1.15)
- **Duration**: 0.6s per cycle
- **Loop**: Infinite during hover

### 2. VideoModal (`/src/components/FeatureVideoCard.tsx`)
Orchestrated modal animations with professional transitions:

#### Modal Entrance
- **Backdrop**: Fade in with progressive blur (0.3s)
- **Video Container**: Scale from 0.8 + fade in + slide up
- **Duration**: 0.5s with `back.out(1.2)` easing
- **Navigation Buttons**: Slide in from sides with stagger
- **Close Button**: Rotate + scale with bounce effect

#### Navigation Button Effects
- **Hover**: Scale to 1.1 + glow shadow effect
- **Pulse**: Orange glow for nav buttons (rgba(255, 107, 53, 0.4))
- **Active**: Scale down to 0.95 on click

### 3. AnimatedFeaturesInAction (`/src/components/AnimatedFeaturesInAction.tsx`)
Advanced section animations with parallax and text effects:

#### Background Decorations
- **Floating Animation**: Continuous movement (8-10s cycles)
- **Parallax Scroll**: Different scroll speeds for depth
- **Performance**: GPU-accelerated with `will-change`

#### Title Animation
- **Effect**: Word-by-word reveal with 3D rotation
- **Transform**: rotateX from -90° to 0°
- **Stagger**: 0.1s between words
- **Easing**: `back.out(1.7)` for dramatic entrance

#### Counter Badge
- **Effect**: Scale + rotate entrance
- **Animation**: From scale(0) rotate(-180°) to scale(1) rotate(0°)
- **Float**: Subtle continuous floating after entrance

### 4. Custom Hooks (`/src/hooks/useGSAPAnimations.ts`)
Reusable animation patterns:

- **useStaggerEntrance**: Scroll-triggered staggered animations
- **useHoverScale**: Smooth scale effects on hover
- **usePulseAnimation**: Continuous pulsing for attention
- **useSlideIn**: Directional slide animations
- **useFadeBlur**: Fade with blur for overlays
- **useParallax**: Depth-creating scroll effects
- **useTextReveal**: Character/word split animations
- **useWillChange**: Performance optimization helper

## Performance Optimizations

### Hardware Acceleration
- All transforms use `will-change` CSS property
- GPU-accelerated properties only (transform, opacity)
- No layout-triggering properties during animations

### Memory Management
- Proper cleanup with `gsap.context()` and `revert()`
- Timeline killing on unmount
- ScrollTrigger cleanup on component destroy

### Mobile Optimization
- Reduced motion for low-end devices
- Touch-friendly interaction areas
- Optimized animation durations for mobile

## Usage Examples

### Basic Stagger Animation
```tsx
import { useStaggerEntrance } from '@/hooks/useGSAPAnimations'

function MyComponent({ index }) {
  const cardRef = useRef(null)

  useStaggerEntrance(cardRef, index, {
    delay: 0.1,
    duration: 0.6,
    yOffset: 50
  })

  return <div ref={cardRef}>Content</div>
}
```

### Hover Scale Effect
```tsx
import { useHoverScale } from '@/hooks/useGSAPAnimations'

function VideoPreview() {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef(null)

  useHoverScale(videoRef, isHovered, {
    scale: 1.05,
    duration: 0.4
  })

  return (
    <video
      ref={videoRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  )
}
```

## Testing

### Test Page
Visit `/test-animations` to see all animations in action

### Performance Metrics
- Target: 60fps on all animations
- ScrollTrigger markers: Set `markers: true` in development
- Chrome DevTools Performance tab for profiling

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility
- Respects `prefers-reduced-motion` media query
- Keyboard navigation fully supported
- ARIA labels on all interactive elements

## Future Enhancements
1. Add motion path animations for decorative elements
2. Implement morphing SVG animations
3. Create custom easing curves library
4. Add WebGL effects for premium interactions

---

*Crafted with precision by Elena - The Animation Architect*
*"Animation should be felt, not seen."*