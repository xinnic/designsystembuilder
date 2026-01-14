# Design System Builder - Technical Architecture

## 🏗️ Overview

This document defines the technical architecture for a **B2C-focused, cross-platform design system builder** that exports comprehensive megaprompts for CLI-based code generation. The system prioritizes visual customization for branded consumer apps across iOS, Android, and Web.

---

## 🎯 Core Architecture Principles

1. **Token-First Design** - Everything derives from a 3-tier token system
2. **Framework-Agnostic Core** - Abstract model translates to any target
3. **Cross-Platform Native** - Tamagui enables true iOS/Android/Web support
4. **Megaprompt as Product** - The export is a comprehensive instruction set, not config files
5. **Visual-to-Code Bridge** - Live preview directly maps to generated code
6. **Atomic Design Hierarchy** - UI organized as Atoms → Components → Patterns

---

## 🎨 UI Architecture: 3-Tier Hierarchy

The builder's interface uses an **Atomic Design-inspired** organization that makes the design system intuitive for end users:

```
┌─────────┐   ┌────────────┐   ┌──────────┐
│  Atoms  │ → │ Components │ → │ Patterns │
└─────────┘   └────────────┘   └──────────┘
```

### Tier 1: Atoms (Foundational Tokens)
Fundamental design decisions that establish the visual language:

| Atom Category | What It Controls | Example Values |
|---------------|------------------|----------------|
| Typography | Font scales, weights, line heights | Display: 48px/56px @ 700 |
| Colors | Brand, semantic, status colors | Primary: oklch(0.55 0.22 160) |
| Spacing | Layout rhythm (8-pt grid) | $1=8px, $2=16px, $3=24px |
| Radii | Corner roundness | sm=4px, md=8px, lg=12px |
| Shadows | Elevation/depth cues | Level 1, 2, 3 |
| Motion | Duration, easing curves | base=300ms, ease-standard |
| Haptics | Tactile feedback types | light, medium, success |

### Tier 2: Components
Individual UI elements built with Tamagui, consuming atom tokens:

- **Buttons** - Primary, secondary, outline variants
- **Cards** - Elevated, flat, gradient
- **Form Controls** - Input, TextArea, Switch, Checkbox
- **Typography** - Display, H1-H3, Body, Caption (demos only in Components)
- **Tabs** - Navigation within sections
- **Progress** - Bars, indicators
- **Overlays** - Dialog, Sheet, Modal

Each component section shows a subtle `TAMAGUI` badge indicating it's a pre-built component. Future custom components will show a `CUSTOM` badge.

### Tier 3: Patterns
Composed layouts combining multiple components for common use cases:

- **App Header** - Logo + title + action buttons
- **Navigation Bar** - Tab bar / bottom navigation
- **Form Layout** - Label + input + validation message
- **Card Grid** - Responsive grid of content cards
- **Modal Pattern** - Dialog header + content + action buttons

### Why This Structure?

| Previous (Confusing) | New (Intuitive) |
|---------------------|------------------|
| "Design Tokens" | → **Atoms** |
| "React Native Components" | → **Components** |
| *(missing)* | → **Patterns** |

- **Atoms** = "What are my design values?"
- **Components** = "What UI pieces can I use?"
- **Patterns** = "How do I compose them?"

---

## 🪙 Token System Architecture

### 3-Tier Token Hierarchy

The entire system's flexibility hinges on this hierarchy, enabling theme switching, dark mode, and multi-brand support:

```
Tier 1: Primitives → Tier 2: Semantic → Tier 3: Component
```

#### Tier 1: Primitive Tokens (Raw Values)
```typescript
{
  color: {
    primitive: {
      blue: {
        50: 'oklch(0.95 0.02 237)',
        100: 'oklch(0.90 0.04 237)',
        200: 'oklch(0.80 0.08 237)',
        300: 'oklch(0.70 0.12 237)',
        400: 'oklch(0.60 0.16 237)',
        500: 'oklch(0.50 0.20 237)', // Base
        600: 'oklch(0.40 0.18 237)',
        700: 'oklch(0.35 0.16 237)',
        800: 'oklch(0.30 0.14 237)',
        900: 'oklch(0.25 0.12 237)',
        950: 'oklch(0.20 0.10 237)'
      }
    }
  },
  space: {
    primitive: {
      0: 0,
      1: 4,
      2: 8,
      3: 16,
      4: 24,
      5: 32,
      6: 48,
      7: 64,
      8: 96
    }
  },
  radius: {
    primitive: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999
    }
  }
}
```

#### Tier 2: Semantic Tokens (Contextual Mappings)
```typescript
{
  color: {
    semantic: {
      // Canvas layer
      background: {
        default: '{color.primitive.gray.50}',  // Light theme
        _dark: '{color.primitive.gray.950}'    // Dark theme
      },
      foreground: {
        default: '{color.primitive.gray.900}',
        _dark: '{color.primitive.gray.50}'
      },

      // Surface layer (cards, modals)
      surface: {
        default: '{color.primitive.white}',
        _dark: '{color.primitive.gray.900}'
      },
      surfaceForeground: {
        default: '{color.primitive.gray.900}',
        _dark: '{color.primitive.gray.100}'
      },

      // Interactive colors
      primary: {
        default: '{color.primitive.blue.500}',
        _dark: '{color.primitive.blue.400}'
      },
      primaryForeground: {
        default: '{color.primitive.white}',
        _dark: '{color.primitive.gray.950}'
      },

      // Status colors
      danger: {
        default: '{color.primitive.red.500}',
        surface: '{color.primitive.red.50}',
        border: '{color.primitive.red.200}'
      }
    }
  }
}
```

#### Tier 3: Component Tokens (Optional Overrides)
```typescript
{
  component: {
    button: {
      primary: {
        background: '{color.semantic.primary.default}',
        color: '{color.semantic.primary.foreground}',
        borderRadius: '{radius.primitive.md}',
        paddingX: '{space.primitive.4}',
        paddingY: '{space.primitive.2}'
      }
    },
    feedCard: {
      background: '{color.semantic.surface.default}',
      borderRadius: '{radius.primitive.lg}',
      shadowColor: 'rgba(0,0,0,0.08)',
      padding: '{space.primitive.3}'
    }
  }
}
```

### Color System Using OKLCH

**Why OKLCH over HSL:**
- Perceptually uniform - equal lightness steps appear equal to human eyes
- Wide gamut support - can express Display P3 colors (30% more than sRGB)
- Predictable gradients - avoids HSL's "gray dead zone"
- Better accessibility - consistent contrast across hues

**11-Step Scale Generation:**
```typescript
function generateColorScale(baseColor: string): ColorScale {
  const base = parseOKLCH(baseColor) // 500 value

  return {
    50:  adjustLightness(base, +0.45),
    100: adjustLightness(base, +0.40),
    200: adjustLightness(base, +0.30),
    300: adjustLightness(base, +0.20),
    400: adjustLightness(base, +0.10),
    500: base,
    600: adjustLightness(base, -0.10),
    700: adjustLightness(base, -0.15),
    800: adjustLightness(base, -0.20),
    900: adjustLightness(base, -0.25),
    950: adjustLightness(base, -0.30)
  }
}
```

### Interactive State Model

**Critical Decision:** States are NOT tokenized but handled as transformation rules:

```typescript
// Abstract state definitions (not tokens)
const interactiveStates = {
  _hover: {
    web: '[data-state="hover"]:opacity-90',
    native: null // No hover on mobile
  },
  _focus: {
    web: '[data-state="focus-visible"]:ring-2',
    native: { borderWidth: 2, borderColor: '$focus' }
  },
  _press: {
    web: '[data-state="active"]:scale-95',
    native: { scale: 0.98, opacity: 0.7 }
  },
  _disabled: {
    all: { opacity: 0.4, pointerEvents: 'none' }
  }
}
```

---

## 🧩 Component Architecture

### Component Hierarchy

```
Tamagui Primitive → Styled Component → Composed Component
```

### CVA-Based Variant Model

All components use a Class Variance Authority (CVA) inspired structure:

```typescript
interface ComponentDefinition {
  name: string
  base: StyleObject           // Base styles
  variants: VariantMap        // Named variants
  compoundVariants?: Rule[]   // Variant combinations
  defaultVariants: Defaults    // Default variant values
  states: StateMap            // Interactive states
  platform?: PlatformOverrides // iOS/Android/Web specific
}
```

### Example Component Implementation (FeedCard)

```typescript
const FeedCardDefinition: ComponentDefinition = {
  name: 'FeedCard',

  base: {
    backgroundColor: '$surface',
    borderRadius: '$3',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12
  },

  variants: {
    variant: {
      default: {
        borderWidth: 0
      },
      outlined: {
        borderWidth: 1,
        borderColor: '$border',
        shadowOpacity: 0
      },
      elevated: {
        shadowOpacity: 0.12,
        shadowRadius: 16
      }
    },
    size: {
      small: { minHeight: 200 },
      medium: { minHeight: 300 },
      large: { minHeight: 400 }
    }
  },

  defaultVariants: {
    variant: 'default',
    size: 'medium'
  },

  states: {
    hover: {
      web: { transform: 'translateY(-2px)' }
    },
    press: {
      all: { scale: 0.98 }
    }
  },

  platform: {
    ios: {
      shadowOffset: { width: 0, height: 2 }
    },
    android: {
      elevation: 3
    },
    web: {
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }
  }
}
```

### Component Priority Matrix

**Tier 1: MVP Components (Week 1-2)**
1. **FeedCard** - Content display hero component
2. **TabBar** - Primary navigation pattern
3. **NavHeader** - Top navigation/branding
4. **DrawerMenu** - Secondary navigation
5. **SegmentedControl** - Content filtering
6. **SearchBar** - Discovery pattern

**Tier 2: Extended Set (Week 3-4)**
- Avatar, Badge, Chip
- ListItem, ImageCarousel
- Checkbox, Switch, RadioGroup
- Toast, Alert, Skeleton
- TextArea, Slider

---

## 🤖 Megaprompt Architecture

### Megaprompt Structure

The megaprompt is a comprehensive, structured instruction set for AI CLIs:

```xml
<DesignSystemMegaprompt version="1.0">

  <Metadata>
    <Generator>Design System Builder v1.0</Generator>
    <Timestamp>{ISO_8601_TIMESTAMP}</Timestamp>
    <Target>Tamagui + React Native</Target>
  </Metadata>

  <SystemPersona>
    You are an expert React Native and Tamagui developer specializing
    in token-first, cross-platform design systems. You will generate
    production-ready code that works identically on iOS, Android, and Web.
  </SystemPersona>

  <ProjectSetup>
    <Commands>
      npx create-expo-app my-branded-app --template blank-typescript
      cd my-branded-app
      npx expo install @tamagui/core @tamagui/config
      npm install @tamagui/animations-react-native
    </Commands>
    <DirectoryStructure>
      src/
      ├── theme/
      │   ├── tokens.ts
      │   ├── config.ts
      │   └── themes.ts
      ├── components/
      │   ├── ui/          # Core components
      │   └── navigation/  # Nav components
      └── screens/
    </DirectoryStructure>
  </ProjectSetup>

  <TokenSystem>
    <PrimitiveTokens>
      <!-- Complete color scales, spacing, radii -->
    </PrimitiveTokens>
    <SemanticTokens>
      <!-- Theme-aware mappings -->
    </SemanticTokens>
    <ComponentTokens>
      <!-- Component-specific overrides -->
    </ComponentTokens>
  </TokenSystem>

  <ComponentLibrary>
    <!-- Each component with full implementation -->
    <Component name="FeedCard">
      <Implementation>
        <!-- Complete Tamagui styled component code -->
      </Implementation>
      <Usage>
        <!-- Example usage patterns -->
      </Usage>
    </Component>
  </ComponentLibrary>

  <AdherenceRules>
    <Rule id="no-hardcoded-colors">
      NEVER use hardcoded colors. Always use tokens: $primary, $surface
    </Rule>
    <Rule id="semantic-spacing">
      Use only token spacing: $1 through $8. Never arbitrary pixels.
    </Rule>
    <Rule id="component-variants">
      Always use defined variants. Never create one-off styles.
    </Rule>
  </AdherenceRules>

  <ExampleScreens>
    <!-- Complete screen implementations showing component composition -->
  </ExampleScreens>

</DesignSystemMegaprompt>
```

### Token-to-Code Translation

The megaprompt includes explicit translation rules for different targets:

```typescript
const translationMap = {
  // Tamagui (Primary Target)
  tamagui: {
    token: (name: string) => `$${name}`,
    variant: (component: string, variant: string) => `variant="${variant}"`,
    state: (state: string) => `${state}Style={{ ... }}`
  },

  // Future: Tailwind/Shadcn
  tailwind: {
    token: (name: string) => `var(--${name})`,
    variant: (component: string, variant: string) =>
      className: cva(...)({ variant })
    state: (state: string) => `data-[state="${state}"]:...`
  },

  // Future: MUI
  mui: {
    token: (name: string) => `theme.palette.${name}`,
    variant: (component: string, variant: string) =>
      `variant="${muiVariantMap[variant]}"`,
    state: (state: string) => `sx={{ '&:${state}': { ... } }}`
  }
}
```

---

## 🏭 Factory Pattern Architecture

### 87% Code Reduction Strategy

The factory pattern reduces component code by abstracting common patterns:

```typescript
class ComponentFactory {
  // Generate all color variants from semantic tokens
  generateColorVariants(semanticColors: string[]): VariantMap {
    return semanticColors.reduce((acc, color) => ({
      ...acc,
      [color]: {
        backgroundColor: `$${color}`,
        color: `$${color}Foreground`,
        borderColor: `$${color}`,
        hoverStyle: { opacity: 0.9 },
        pressStyle: { opacity: 0.7 }
      }
    }), {})
  }

  // Generate size variants from spacing scale
  generateSizeVariants(scale: SpacingScale): VariantMap {
    return {
      xs: { padding: scale[1], fontSize: 12 },
      sm: { padding: scale[2], fontSize: 14 },
      md: { padding: scale[3], fontSize: 16 },
      lg: { padding: scale[4], fontSize: 18 },
      xl: { padding: scale[5], fontSize: 20 }
    }
  }

  // Generate interactive states
  generateStates(config: StateConfig): StateMap {
    return {
      hover: config.hover || { opacity: 0.9 },
      focus: config.focus || { borderWidth: 2, borderColor: '$focus' },
      press: config.press || { scale: 0.98 },
      disabled: { opacity: 0.4, pointerEvents: 'none' }
    }
  }
}
```

### Component Generation Pipeline

```
User Configuration → Factory Processing → Abstract Definition → Megaprompt Generation
```

---

## 🔄 State Management Architecture

### Zustand Store Structure

```typescript
interface DesignSystemState {
  // Token Values
  tokens: {
    primitive: PrimitiveTokens
    semantic: SemanticTokens
    component: ComponentTokens
  }

  // Theme Settings
  theme: {
    mode: 'light' | 'dark'
    brand: string // Base brand color
    fontFamily: string
    roundness: number
    density: 'comfortable' | 'compact' | 'spacious'
  }

  // Component Configurations
  components: {
    [componentName: string]: {
      variants: string[]
      defaultVariant: string
      customTokens: Record<string, any>
    }
  }

  // Export Settings
  export: {
    target: 'tamagui' | 'tailwind' | 'mui'
    includeAdherence: boolean
    includeExamples: boolean
    includeDocs: boolean
  }

  // Actions
  actions: {
    updateToken: (path: string, value: any) => void
    generateMegaprompt: () => string
    exportTheme: () => ThemeObject
    resetToDefaults: () => void
  }
}
```

### CSS Variable Bridge

The system maintains a bidirectional bridge between Zustand state and CSS variables:

```typescript
// State → CSS Variables
useEffect(() => {
  const root = document.documentElement

  // Map semantic tokens to CSS variables
  Object.entries(tokens.semantic.color).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value.default)
  })

  // Map spacing to CSS variables
  Object.entries(tokens.primitive.space).forEach(([key, value]) => {
    root.style.setProperty(`--space-${key}`, `${value}px`)
  })
}, [tokens])

// CSS Variables → Tamagui Config
export const tamaguiConfig = createTamagui({
  tokens: createTokens({
    color: {
      primary: 'var(--color-primary)',
      surface: 'var(--color-surface)',
      // ... map all CSS variables
    }
  })
})
```

---

## 🎯 Platform-Specific Handling

### Platform Detection and Adaptation

```typescript
const platformStyles = {
  ios: {
    fontFamily: 'SF Pro Display',
    shadowImplementation: 'native',
    haptics: true,
    safeAreaHandling: 'automatic'
  },
  android: {
    fontFamily: 'Roboto',
    elevation: true,
    rippleEffect: true,
    materialDesign: 3
  },
  web: {
    fontFamily: 'system-ui',
    hoverStates: true,
    focusVisible: true,
    smoothScroll: true
  }
}
```

### Responsive Breakpoints

```typescript
const breakpoints = {
  base: 0,    // Mobile first
  sm: 480,    // Large phone
  md: 768,    // Tablet
  lg: 1024,   // Desktop
  xl: 1280,   // Large desktop
  '2xl': 1536 // Wide screen
}
```

---

## 📊 Performance Optimization

### Optimization Strategies

1. **Token Caching** - Computed values cached until dependencies change
2. **Lazy Component Loading** - Components loaded on-demand
3. **Virtual Scrolling** - For long component lists
4. **Memoization** - Factory functions memoized
5. **Web Workers** - Megaprompt generation in background

### Performance Targets

- Token update: <100ms
- Component preview: <50ms refresh
- Megaprompt generation: <3s
- Initial load: <2s
- Memory usage: <100MB

---

## 🔒 Security & Validation

### Input Validation

```typescript
const validators = {
  color: (value: string) => {
    // Validate OKLCH, HEX, RGB formats
    return isValidOKLCH(value) || isValidHex(value) || isValidRGB(value)
  },

  spacing: (value: number) => {
    // Ensure 8-point grid alignment
    return value % 4 === 0 && value >= 0 && value <= 96
  },

  token: (name: string) => {
    // Validate token naming convention
    return /^[a-z][a-zA-Z0-9]*$/.test(name)
  }
}
```

### Megaprompt Sanitization

```typescript
function sanitizeMegaprompt(prompt: string): string {
  // Remove potential injection attacks
  // Escape special characters
  // Validate XML structure
  // Ensure no executable code in strings
  return sanitizedPrompt
}
```

---

## 🚀 Deployment Architecture

### Static Hosting (MVP)
```
Vercel/Netlify
├── Static React App
├── Client-side generation
└── No backend required
```

### Future Architecture
```
Frontend (Vercel)
├── React App
├── Preview Engine
└── Token Management

Backend (Optional)
├── Theme Storage
├── Template Marketplace
├── Team Collaboration
└── Analytics

CDN
├── Component Library
├── Templates
└── Documentation
```

---

## 📚 Related Documents

- [tasks.md](./tasks.md) - Implementation tasks and timeline
- [product-plan.md](./product-plan.md) - Product strategy and roadmap
- [SYNC_ARCHITECTURE.md](./SYNC_ARCHITECTURE.md) - State synchronization details

---

**Last Updated:** 2025-11-04
**Version:** 1.0
**Architecture Status:** Foundation Complete, Implementation In Progress