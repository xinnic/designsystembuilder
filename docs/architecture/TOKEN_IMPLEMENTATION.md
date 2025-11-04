# Token Implementation Guide

> **This file contains the exact token values and implementation details extracted from research. Use these values directly when implementing components.**

## 🎨 Color Token Implementation

### Primitive Color Scales (OKLCH Format)

```typescript
// Generate these programmatically from a base color using OKLCH
const generateColorScale = (baseLCH: {l: number, c: number, h: number}) => ({
  50:  `oklch(${baseLCH.l + 0.45} ${baseLCH.c * 0.4} ${baseLCH.h})`,
  100: `oklch(${baseLCH.l + 0.40} ${baseLCH.c * 0.5} ${baseLCH.h})`,
  200: `oklch(${baseLCH.l + 0.30} ${baseLCH.c * 0.6} ${baseLCH.h})`,
  300: `oklch(${baseLCH.l + 0.20} ${baseLCH.c * 0.7} ${baseLCH.h})`,
  400: `oklch(${baseLCH.l + 0.10} ${baseLCH.c * 0.85} ${baseLCH.h})`,
  500: `oklch(${baseLCH.l} ${baseLCH.c} ${baseLCH.h})`, // Base
  600: `oklch(${baseLCH.l - 0.10} ${baseLCH.c} ${baseLCH.h})`,
  700: `oklch(${baseLCH.l - 0.15} ${baseLCH.c * 0.9} ${baseLCH.h})`,
  800: `oklch(${baseLCH.l - 0.20} ${baseLCH.c * 0.8} ${baseLCH.h})`,
  900: `oklch(${baseLCH.l - 0.25} ${baseLCH.c * 0.7} ${baseLCH.h})`,
  950: `oklch(${baseLCH.l - 0.30} ${baseLCH.c * 0.6} ${baseLCH.h})`,
})

// Example brand color scale (blue)
const bluePrimitive = generateColorScale({ l: 0.50, c: 0.20, h: 237 })
```

### Semantic Color Tokens (Use These in Components)

```typescript
export const semanticColors = {
  // Canvas Layer (page background)
  background: {
    default: '{gray.50}',     // Light mode
    _dark: '{gray.950}'       // Dark mode
  },
  foreground: {
    default: '{gray.900}',
    _dark: '{gray.50}'
  },

  // Surface Layer (cards, modals, elevated content)
  surface: {
    default: '{white}',
    _dark: '{gray.900}'
  },
  surfaceForeground: {
    default: '{gray.900}',
    _dark: '{gray.100}'
  },

  // Primary (main brand color)
  primary: {
    default: '{blue.500}',
    _dark: '{blue.400}'
  },
  primaryForeground: {
    default: '{white}',
    _dark: '{gray.950}'
  },

  // Secondary (accent color)
  secondary: {
    default: '{purple.500}',
    _dark: '{purple.400}'
  },
  secondaryForeground: {
    default: '{white}',
    _dark: '{gray.950}'
  },

  // Muted (subtle backgrounds and secondary text)
  muted: {
    default: '{gray.100}',
    _dark: '{gray.800}'
  },
  mutedForeground: {
    default: '{gray.600}',
    _dark: '{gray.400}'
  },

  // Destructive/Danger
  danger: {
    default: '{red.500}',
    _dark: '{red.400}'
  },
  dangerForeground: {
    default: '{white}',
    _dark: '{white}'
  },
  dangerSurface: {
    default: '{red.50}',
    _dark: '{red.950}'
  },
  dangerBorder: {
    default: '{red.200}',
    _dark: '{red.800}'
  },

  // Success
  success: {
    default: '{green.500}',
    _dark: '{green.400}'
  },
  successForeground: {
    default: '{white}',
    _dark: '{white}'
  },
  successSurface: {
    default: '{green.50}',
    _dark: '{green.950}'
  },
  successBorder: {
    default: '{green.200}',
    _dark: '{green.800}'
  },

  // Warning
  warning: {
    default: '{yellow.500}',
    _dark: '{yellow.400}'
  },
  warningForeground: {
    default: '{gray.900}',
    _dark: '{gray.900}'
  },
  warningSurface: {
    default: '{yellow.50}',
    _dark: '{yellow.950}'
  },
  warningBorder: {
    default: '{yellow.200}',
    _dark: '{yellow.800}'
  },

  // Info
  info: {
    default: '{blue.500}',
    _dark: '{blue.400}'
  },
  infoForeground: {
    default: '{white}',
    _dark: '{white}'
  },
  infoSurface: {
    default: '{blue.50}',
    _dark: '{blue.950}'
  },
  infoBorder: {
    default: '{blue.200}',
    _dark: '{blue.800}'
  },

  // Utility
  border: {
    default: '{gray.200}',
    _dark: '{gray.800}'
  },
  divider: {
    default: '{gray.100}',
    _dark: '{gray.900}'
  },
  ring: {
    default: '{blue.500}',  // Focus ring
    _dark: '{blue.400}'
  }
}
```

## 📏 Typography Tokens

```typescript
export const typography = {
  // Font Families
  fonts: {
    body: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    heading: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace'
  },

  // Font Sizes (px values for clarity, convert to rem in implementation)
  fontSize: {
    xs: 12,    // Caption, small labels
    sm: 14,    // Secondary text, descriptions
    md: 16,    // Body text default
    lg: 18,    // Emphasized body, small headings
    xl: 24,    // H3
    '2xl': 30, // H2
    '3xl': 36, // H1
    '4xl': 48  // Display, hero text
  },

  // Line Heights
  lineHeight: {
    tight: 1.25,   // Headings
    normal: 1.5,   // Body text
    relaxed: 1.75  // Readable paragraphs
  },

  // Font Weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },

  // Letter Spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em'
  }
}
```

## 📐 Spacing Tokens (8-Point Grid)

```typescript
export const spacing = {
  // Core spacing scale (multiplier of 4px base unit)
  0: 0,      // 0px
  1: 4,      // 4px (0.5 units)
  2: 8,      // 8px (1 unit) - base
  3: 16,     // 16px (2 units)
  4: 24,     // 24px (3 units)
  5: 32,     // 32px (4 units)
  6: 48,     // 48px (6 units)
  7: 64,     // 64px (8 units)
  8: 96,     // 96px (12 units)

  // Semantic spacing aliases
  xs: 4,     // Extra small
  sm: 8,     // Small
  md: 16,    // Medium (default)
  lg: 24,    // Large
  xl: 32,    // Extra large
  '2xl': 48, // 2x large
  '3xl': 64  // 3x large
}
```

## 🔲 Border Radius Tokens

```typescript
export const radius = {
  none: 0,
  sm: 4,     // Subtle rounding
  md: 8,     // Default for buttons, inputs
  lg: 12,    // Cards, containers
  xl: 16,    // Large cards, modals
  '2xl': 24, // Extra rounded
  full: 9999 // Pills, circles
}
```

## 🌑 Shadow/Elevation Tokens

```typescript
export const shadows = {
  // Shadow definitions
  xs: {
    web: '0 1px 2px rgba(0, 0, 0, 0.05)',
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2
    },
    android: { elevation: 1 }
  },

  sm: {
    web: '0 2px 6px rgba(0, 0, 0, 0.08)',
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6
    },
    android: { elevation: 2 }
  },

  md: {
    web: '0 4px 12px rgba(0, 0, 0, 0.10)',
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.10,
      shadowRadius: 12
    },
    android: { elevation: 3 }
  },

  lg: {
    web: '0 8px 16px rgba(0, 0, 0, 0.12)',
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16
    },
    android: { elevation: 4 }
  },

  xl: {
    web: '0 12px 24px rgba(0, 0, 0, 0.15)',
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.15,
      shadowRadius: 24
    },
    android: { elevation: 5 }
  }
}
```

## ⚡ Animation Tokens

```typescript
export const animation = {
  // Durations (ms)
  duration: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    verySlow: 1000
  },

  // Easing functions
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },

  // Spring animations (React Native)
  spring: {
    gentle: { damping: 15, stiffness: 150 },
    bouncy: { damping: 10, stiffness: 200 },
    stiff: { damping: 20, stiffness: 300 }
  }
}
```

## 🎛️ Interactive State Transformations

```typescript
// States are NOT tokens - they are transformation rules
export const interactiveStates = {
  hover: {
    opacity: 0.9,
    transform: 'translateY(-1px)', // Subtle lift
    transition: 'all 200ms ease-out'
  },

  focus: {
    outlineWidth: 2,
    outlineColor: '$ring',
    outlineOffset: 2
  },

  press: {
    scale: 0.98,
    opacity: 0.7
  },

  disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    pointerEvents: 'none'
  }
}
```

## 🧩 Component-Specific Token Values

### Button
```typescript
const buttonTokens = {
  // Sizes
  size: {
    xs: { paddingX: spacing[2], paddingY: spacing[1], fontSize: typography.fontSize.xs },
    sm: { paddingX: spacing[3], paddingY: spacing[1.5], fontSize: typography.fontSize.sm },
    md: { paddingX: spacing[4], paddingY: spacing[2], fontSize: typography.fontSize.md },
    lg: { paddingX: spacing[5], paddingY: spacing[2.5], fontSize: typography.fontSize.lg },
    xl: { paddingX: spacing[6], paddingY: spacing[3], fontSize: typography.fontSize.xl }
  },

  // Variants (use semantic colors)
  variants: ['solid', 'outline', 'ghost', 'link']
}
```

### FeedCard
```typescript
const feedCardTokens = {
  padding: spacing[3],         // 16px
  borderRadius: radius.lg,     // 12px
  imageAspectRatio: 1.5,       // 3:2
  titleSize: 18,
  titleWeight: 600,
  descriptionSize: 14,
  metaSize: 12,
  shadowLevel: 'md'
}
```

### TabBar
```typescript
const tabBarTokens = {
  height: 56,           // iOS standard
  iconSize: 24,
  labelSize: 10,
  activeScale: 1.1,
  inactiveOpacity: 0.6,
  indicatorHeight: 2
}
```

### NavHeader
```typescript
const navHeaderTokens = {
  height: 56,
  logoSize: 32,
  titleSize: 20,
  iconSize: 24,
  paddingHorizontal: spacing[3],  // 16px
  blurIntensity: 20
}
```

### DrawerMenu
```typescript
const drawerMenuTokens = {
  width: 280,
  itemHeight: 48,
  sectionHeaderHeight: 32,
  iconSize: 20,
  fontSize: 16,
  activeBgOpacity: 0.1
}
```

### SegmentedControl
```typescript
const segmentedControlTokens = {
  height: 36,
  minSegmentWidth: 60,
  borderWidth: 1,
  indicatorInset: 2,
  fontSize: 14,
  borderRadius: radius.full / 2  // Pill shape
}
```

### SearchBar
```typescript
const searchBarTokens = {
  height: 40,
  borderRadius: radius.full / 2,  // Pill shape
  iconSize: 20,
  fontSize: 16,
  paddingHorizontal: spacing[3],   // 16px
  backgroundColor: 'rgba(0,0,0,0.05)'
}
```

## 🔧 Implementation Example

```typescript
// tamagui.config.ts
import { createTokens } from '@tamagui/core'

export const tokens = createTokens({
  color: {
    // Map semantic colors
    primary: semanticColors.primary.default,
    primaryForeground: semanticColors.primaryForeground.default,
    surface: semanticColors.surface.default,
    // ... etc
  },

  space: spacing,
  size: spacing, // Use same scale for sizes
  radius: radius,
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500
  }
})

// Component usage
const FeedCard = styled(YStack, {
  backgroundColor: '$surface',
  borderRadius: '$lg',  // Maps to radius.lg = 12
  padding: '$3',         // Maps to spacing[3] = 16
  shadowColor: shadows.md.ios.shadowColor,
  shadowOpacity: shadows.md.ios.shadowOpacity,
  // ... etc
})
```

## 🚨 Critical Implementation Rules

1. **NEVER hardcode values** - Always use tokens
2. **Use semantic colors** - Not primitive colors in components
3. **Follow 8-point grid** - All spacing must be divisible by 4
4. **Use OKLCH for color generation** - Not HSL or RGB
5. **States are transformations** - Not separate color tokens
6. **Platform-specific shadows** - Use correct implementation per platform
7. **Respect platform conventions** - iOS 56px bar height, Android Material Design

---

**Reference this file when implementing any component. All values have been validated through research and represent industry best practices.**

Last Updated: 2025-11-04