# Design System Builder - Development Tasks

> **See [product-plan.md](./product-plan.md) for complete product strategy, roadmap, and vision.**

## 🎯 Current Status - Phase 1: Tamagui Integration

- ✅ Tamagui dependencies installed
- ✅ Basic Tamagui configuration created
- ✅ PreviewPhoneTamagui and TamaguiShowcase components created
- ✅ React Native Web configured
- ⚠️ **CRITICAL:** Components unstyled (Tamagui is headless)
- ⚠️ **CRITICAL:** Need to bridge design tokens with Tamagui
- 🎯 **GOAL:** Visual parity with original PreviewPhone

---

## 🔴 Phase 1: Fix Tamagui Integration (THIS SPRINT)

**Timeline:** 2-3 weeks | **Est. Time:** 11.5 hours

### Task 1.1: Create Proper Tamagui Token Configuration ⚡
**Status:** 🚨 URGENT | **Time:** 2 hours | **Complexity:** High

**Problem:** Tamagui tokens don't reference our CSS variables

**Solution:** Bridge our design tokens to Tamagui

**Implementation:**

1. **Update `src/tamagui.config.ts`** - Map CSS variables to Tamagui tokens:
```typescript
import { createTamagui, createTokens, createFont } from '@tamagui/core';
import { useDesignSystem } from './state/designSystem';

export const createDynamicConfig = () => {
  const designSystem = useDesignSystem.getState();

  // Map our CSS variables to Tamagui tokens
  const tokens = createTokens({
    color: {
      // Brand colors
      brand: 'rgb(var(--color-brand))',
      brandWeak: 'rgb(var(--color-brand-weak))',

      // Text colors
      textPrimary: 'rgb(var(--color-text-primary))',
      textSecondary: 'rgb(var(--color-text-secondary))',
      textDisabled: 'rgb(var(--color-text-disabled))',

      // Background colors
      bgPrimary: 'rgb(var(--color-bg-primary))',
      bgSecondary: 'rgb(var(--color-bg-secondary))',

      // Border
      border: 'rgb(var(--color-border))',

      // Semantic colors
      success: 'rgb(var(--color-success))',
      warning: 'rgb(var(--color-warning))',
      info: 'rgb(var(--color-info))',
      danger: 'rgb(var(--color-danger))',
      focus: 'rgb(var(--color-focus))',
    },

    space: {
      1: 'var(--space-1)',
      2: 'var(--space-2)',
      3: 'var(--space-3)',
      4: 'var(--space-4)',
      5: 'var(--space-5)',
      6: 'var(--space-6)',
      7: 'var(--space-7)',
      8: 'var(--space-8)',
    },

    size: {
      // Same as space for consistency
      1: 'var(--space-1)',
      2: 'var(--space-2)',
      3: 'var(--space-3)',
      4: 'var(--space-4)',
      5: 'var(--space-5)',
      6: 'var(--space-6)',
      7: 'var(--space-7)',
      8: 'var(--space-8)',
    },

    radius: {
      1: 'var(--radius-sm)',
      2: 'var(--radius-md)',
      3: 'var(--radius-lg)',
      4: 'var(--radius-full)',
    },
  });

  // Map our typography to Tamagui fonts
  const fonts = {
    body: createFont({
      family: 'var(--font-family)',
      size: {
        1: 'var(--font-caption-size)',
        2: 'var(--font-body-size)',
        3: 'var(--font-subhead-size)',
        4: 'var(--font-h2-size)',
        5: 'var(--font-h1-size)',
        6: 'var(--font-display-size)',
      },
      lineHeight: {
        1: 'var(--font-caption-line)',
        2: 'var(--font-body-line)',
        3: 'var(--font-subhead-line)',
        4: 'var(--font-h2-line)',
        5: 'var(--font-h1-line)',
        6: 'var(--font-display-line)',
      },
      weight: {
        4: '400',
        6: '600',
        7: '700',
      },
    }),
    heading: createFont({
      family: 'var(--font-display)',
      // Same size/lineHeight/weight as body
    }),
  };

  return createTamagui({
    tokens,
    fonts,
    themes: {
      light: { /* map tokens */ },
      dark: { /* map tokens */ },
    },
  });
};
```

2. **Make config reactive** - Subscribe to store changes
3. **Test token propagation** - Verify changes update components

**Acceptance Criteria:**
- [ ] All CSS variables accessible as `$token` in Tamagui
- [ ] Color changes in store update Tamagui components
- [ ] Font changes propagate to typography
- [ ] Spacing/radius changes visible

**Files to modify:**
- `src/tamagui.config.ts`

---

### Task 1.2: Create Styled Component Library ⚡
**Status:** 🚨 URGENT | **Time:** 3 hours | **Complexity:** High

**What:** Create styled Tamagui components with our design tokens

**Directory Structure:**
```
src/design-system/
├── components/
│   ├── Button.tsx       # 5 variants (primary, secondary, tertiary, destructive, disabled)
│   ├── Input.tsx        # States (default, focus, error, disabled)
│   ├── Card.tsx         # Elevation levels, borders
│   ├── Text.tsx         # H1-H6, Body, Caption
│   ├── Switch.tsx       # Brand colors, states
│   ├── Checkbox.tsx     # Brand colors, states
│   ├── Select.tsx       # Styled dropdown
│   ├── Tabs.tsx         # Active/inactive states
│   ├── Progress.tsx     # Brand color fills
│   ├── Dialog.tsx       # Overlays, animations
│   └── index.ts         # Export all
├── bespoke/
│   ├── AppBar.tsx       # Logo, title, actions
│   ├── BottomNav.tsx    # Navigation with icons
│   ├── CategoryPills.tsx # Horizontal scrolling filters
│   ├── StatsCard.tsx    # Icon + label + value
│   ├── UserCard.tsx     # Avatar + name + status
│   ├── HeroCard.tsx     # Image + title + CTA
│   └── index.ts         # Export all
└── tokens.ts            # Token utilities
```

**Example Implementation (Button.tsx):**
```typescript
import { Button as TamaguiButton, styled, GetProps } from 'tamagui';

export const Button = styled(TamaguiButton, {
  name: 'Button',
  fontFamily: '$body',
  fontSize: '$3',
  fontWeight: '600',
  paddingHorizontal: '$4',
  paddingVertical: '$3',
  borderRadius: '$2',
  cursor: 'pointer',

  // Default: Primary variant
  backgroundColor: '$brand',
  color: 'white',

  hoverStyle: {
    opacity: 0.9,
  },

  pressStyle: {
    opacity: 0.8,
    scale: 0.98,
  },

  focusStyle: {
    borderWidth: 2,
    borderColor: '$focus',
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$brand',
        color: 'white',
      },
      secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$brand',
        color: '$brand',
      },
      tertiary: {
        backgroundColor: 'transparent',
        color: '$brand',
        hoverStyle: {
          textDecorationLine: 'underline',
        }
      },
      destructive: {
        backgroundColor: '$danger',
        color: 'white',
      },
    },
    size: {
      small: {
        fontSize: '$2',
        paddingHorizontal: '$3',
        paddingVertical: '$2',
      },
      medium: {
        fontSize: '$3',
        paddingHorizontal: '$4',
        paddingVertical: '$3',
      },
      large: {
        fontSize: '$4',
        paddingHorizontal: '$5',
        paddingVertical: '$4',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      }
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  }
});

export type ButtonProps = GetProps<typeof Button>;
```

**Best Practices (from shadcn/ui):**
- ✅ Use `styled()` API for type safety
- ✅ Define clear variants (like CVA)
- ✅ Export TypeScript props
- ✅ Make components composable

**Acceptance Criteria:**
- [ ] All basic components styled and exported
- [ ] Components use design tokens (`$brand`, `$space`, etc.)
- [ ] Variants match design system
- [ ] TypeScript types exported
- [ ] Responds to theme changes

**Files to create:**
- `src/design-system/components/*.tsx` (10 files)
- `src/design-system/bespoke/*.tsx` (6 files)
- `src/design-system/tokens.ts`

---

### Task 1.3: Rebuild PreviewPhoneTamagui ⚡
**Status:** 🚨 URGENT | **Time:** 2 hours | **Complexity:** Medium

**What:** Replace unstyled Tamagui primitives with styled components

**Changes:**
```typescript
// OLD (unstyled primitives)
import { View, Text, Button } from 'tamagui';

// NEW (styled components)
import { YStack, XStack, ScrollView } from 'tamagui'; // Keep layout primitives
import { Button } from '@/design-system/components/Button';
import { Card } from '@/design-system/components/Card';
import { H1, H3, Body } from '@/design-system/components/Text';
import { AppBar } from '@/design-system/bespoke/AppBar';
import { CategoryPills } from '@/design-system/bespoke/CategoryPills';
import { StatsCard } from '@/design-system/bespoke/StatsCard';
```

**Visual Requirements (match original PreviewPhone.tsx):**
- [ ] Phone frame with 8px border and shadow
- [ ] Status bar with time (9:41) and battery indicator
- [ ] App header with logo, title, search, bell icons
- [ ] Category pills with active state (first pill highlighted)
- [ ] Hero card with gradient background, title, description, CTA
- [ ] Stats row (Posts, Likes, Time) with icons and values
- [ ] List items with icons, titles, subtitles
- [ ] User cards with avatars, names, "Follow" buttons
- [ ] Action buttons (Get Started, Learn More)
- [ ] Review card with stars, quote, timestamp
- [ ] Bottom navigation (when enabled)

**Acceptance Criteria:**
- [ ] Visual parity with original PreviewPhone
- [ ] All interactions working (hovers, presses)
- [ ] Responds to design token changes
- [ ] Dark mode switching works
- [ ] Font changes apply correctly

**Files to modify:**
- `src/components/PreviewPhoneTamagui.tsx`

---

### Task 1.4: Rebuild TamaguiShowcase ⚡
**Status:** 🚨 URGENT | **Time:** 2 hours | **Complexity:** Medium

**What:** Replace unstyled components with styled versions

**Sections to include:**
1. **Typography** - H1, H2, H3, H4, Body, Caption
2. **Buttons** - All 5 variants, all 3 sizes
3. **Form Controls** - Input, TextArea, Switch, Checkbox, Radio, Select
4. **Cards** - Basic, elevated, branded
5. **Tabs** - Working tab system
6. **Progress** - Progress bars, sliders
7. **Overlays** - Dialog, Sheet examples
8. **Shapes** - Circle, Square, Avatar

**Acceptance Criteria:**
- [ ] All components properly styled
- [ ] Visual parity with original TailwindShowcase
- [ ] Components respond to theme changes
- [ ] Interactive elements work
- [ ] Proper backgrounds, shadows, borders

**Files to modify:**
- `src/panels/TamaguiShowcase.tsx`

---

### Task 1.5: Polish & Platform-Specific Styling
**Status:** ⏳ PENDING | **Time:** 30 min | **Complexity:** Low

**Add to components:**
```typescript
import { Platform } from 'react-native';

// In styled components
...Platform.select({
  web: {
    cursor: 'pointer',
    userSelect: 'none',
  },
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  android: {
    elevation: 3,
  },
}),
```

---

### Task 1.6: End-to-End Testing
**Status:** ⏳ PENDING | **Time:** 1 hour | **Complexity:** Low

**Test all design system controls:**
- [ ] Color theme changes update all components
- [ ] Primary font changes apply to body text
- [ ] Display font changes apply to headings
- [ ] Typography scale affects all text sizes
- [ ] Spacing mode changes component spacing
- [ ] Dark mode switches properly
- [ ] Border radius changes visible
- [ ] Logo upload/display works
- [ ] Menu layout toggle works

---

## 🟢 Phase 2: Enhanced Megaprompt with Adherence (NEXT SPRINT)

**Timeline:** 1 week | **Est. Time:** 8-10 hours

### Goal
Generate complete design system with built-in adherence rules

### Key Features

#### 2.1: Adherence Documentation
**Create `.claude/prompts/design-system-rules.md` in megaprompt:**

```markdown
## Design System Adherence Rules

You are working on an app with a strict token-based design system.

### ✅ ALWAYS Use Theme Tokens
```typescript
// ✅ Correct
<Button backgroundColor="$brand" />
<Text color="$textPrimary" />
<View padding="$4" />

// ❌ Wrong
<Button backgroundColor="#3498db" />
<Text color="rgb(52, 152, 219)" />
<View padding={16} />
```

### Color Rules
- ✅ Use: `$brand`, `$textPrimary`, `$bgSecondary`, `theme.colors.brand`
- ❌ Never: `#hex`, `rgb()`, `rgba()`, hardcoded colors

### Spacing Rules
- ✅ Use: `$1` through `$8`, `theme.space.m`
- ❌ Never: Arbitrary values like `13px`, `margin: 23`
- ✅ Follow 8-point grid: 8, 16, 24, 32, 40, 48, 64, 80

### Component Rules
- ✅ Use: Design system components (`<Button variant="primary">`)
- ❌ Never: Raw primitives (`<TouchableOpacity>`, `<View style={{bg: 'blue'}}>`)
- ✅ Use variants: `variant`, `size`, `disabled`

### Typography Rules
- ✅ Use: `<H1>`, `<H2>`, `<Body>`, `<Caption>`
- ❌ Never: Hardcoded fonts (`fontFamily: 'Arial'`, `fontSize: 18`)
- ✅ Use semantic sizes: `fontSize="$3"`

### Accessibility Rules
- ✅ Always add `accessibilityLabel` to interactive elements
- ✅ Ensure 4.5:1 contrast ratio (WCAG AA)
- ✅ 44×44pt minimum touch targets
- ✅ Support reduced motion

### Review Checklist
Before committing:
- [ ] No hardcoded colors (search: `#`, `rgb(`)
- [ ] No arbitrary spacing (search: `px` outside theme)
- [ ] All components from design system
- [ ] Typography uses theme sizes
- [ ] Accessibility labels present
```

#### 2.2: TypeScript Strict Mode
**Generate theme.ts with strict types:**

```typescript
// Generated theme.ts
export const theme = {
  colors: {
    brand: '$brand',
    textPrimary: '$textPrimary',
    // ... all colors
  },
  space: {
    1: '$1',
    2: '$2',
    // ... all space
  },
} as const;

// Strict types prevent token violations
export type ThemeColors = typeof theme.colors;
export type ThemeSpacing = typeof theme.space;

// Helper to ensure token usage
export const color = (c: keyof ThemeColors) => theme.colors[c];
export const space = (s: keyof ThemeSpacing) => theme.space[s];
```

#### 2.3: Complete File Structure
**Megaprompt generates:**
```
project/
├── src/
│   ├── design-system/
│   │   ├── tamagui.config.ts
│   │   ├── theme.ts
│   │   ├── components/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── [all components]
│   │   └── bespoke/
│   │       ├── AppBar.tsx
│   │       └── [app components]
│   └── App.tsx
├── .claude/
│   └── prompts/
│       └── design-system-rules.md
├── package.json
└── README.md
```

#### 2.4: Platform-Specific Code
**Generate iOS/Android/Web specific code:**

```typescript
// Platform-specific exports
export const shadows = Platform.select({
  ios: {
    shadow1: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
  },
  android: {
    shadow1: {
      elevation: 2,
    },
  },
  web: {
    shadow1: {
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    },
  },
});
```

---

## 🔵 Phase 3: Advanced Features (FUTURE SPRINTS)

**Timeline:** 3-4 weeks | **Est. Time:** 20-30 hours

### 3.1: Color Palette Generator
**Inspired by: Material Theme Builder**

- [ ] Generate tints/shades from brand color
- [ ] Create 50-900 scale automatically
- [ ] Show contrast ratios
- [ ] Color harmony suggestions
- [ ] Export palette to tokens

### 3.2: Accessibility Checker
**Inspired by: Material customizers**

- [ ] WCAG AA/AAA contrast checker
- [ ] Real-time warnings for failing combinations
- [ ] Suggest accessible alternatives
- [ ] Keyboard navigation testing
- [ ] Screen reader compatibility check

### 3.3: Responsive Variants
**Inspired by: Shopify Restyle**

```typescript
// Generate responsive component props
<Button
  size={{ xs: 'small', md: 'medium', lg: 'large' }}
  padding={{ xs: '$2', md: '$4', lg: '$6' }}
/>
```

### 3.4: Multiple Device Previews
- [ ] Phone (375×667)
- [ ] Tablet (768×1024)
- [ ] Desktop web (1440×900)
- [ ] Side-by-side comparison

### 3.5: Export Formats
- [ ] JSON tokens
- [ ] CSS custom properties
- [ ] JavaScript constants
- [ ] Figma tokens (JSON)
- [ ] Style Dictionary format

### 3.6: Share Functionality
- [ ] URL-based configuration
- [ ] Shareable links
- [ ] QR code for mobile preview
- [ ] Embed widget

---

## 🔒 Phase 4: Adherence Enforcement (LONG-TERM)

**Timeline:** 4-6 weeks | **Est. Time:** 40-60 hours

### 4.1: ESLint Plugin
**Create `eslint-plugin-design-system-adherence`:**

```javascript
rules: {
  'no-hardcoded-colors': 'error',
  'no-arbitrary-spacing': 'error',
  'require-component-variants': 'warn',
  'require-accessibility-labels': 'error',
  'enforce-token-usage': 'error',
}
```

### 4.2: TypeScript Strict Mode
- [ ] Strict type checking for tokens
- [ ] Prevent hardcoded values at compile time
- [ ] Generate union types for variants

### 4.3: Pre-commit Hooks
- [ ] Git hook template
- [ ] Validate token usage
- [ ] Check accessibility
- [ ] Lint design system violations

### 4.4: CI/CD Integration
- [ ] npm package: `@design-system-builder/adherence`
- [ ] Run in GitHub Actions
- [ ] Block PRs with violations
- [ ] Generate adherence report

### 4.5: VS Code Extension (Future)
- [ ] Syntax highlighting for tokens
- [ ] Auto-complete theme tokens
- [ ] Real-time violation warnings
- [ ] Quick fix: Convert to token

---

## 📊 Progress Tracking

### Phase 1: Tamagui Integration
- [x] Dependencies installed
- [x] Basic configuration created
- [x] Components created (unstyled)
- [ ] Task 1.1: Token bridge (0%)
- [ ] Task 1.2: Styled components (0%)
- [ ] Task 1.3: PreviewPhoneTamagui (0%)
- [ ] Task 1.4: TamaguiShowcase (0%)
- [ ] Task 1.5: Platform styling (0%)
- [ ] Task 1.6: Testing (0%)

**Progress: 25% | ETA: 2-3 weeks**

### Phase 2: Enhanced Megaprompt
- [ ] Adherence documentation (0%)
- [ ] TypeScript strict mode (0%)
- [ ] Complete file structure (0%)
- [ ] Platform-specific code (0%)

**Progress: 0% | ETA: 1 week after Phase 1**

### Phase 3: Advanced Features
- [ ] Color palette generator (0%)
- [ ] Accessibility checker (0%)
- [ ] Responsive variants (0%)
- [ ] Multiple device previews (0%)
- [ ] Export formats (0%)
- [ ] Share functionality (0%)

**Progress: 0% | ETA: 3-4 weeks**

---

## 🎯 Success Metrics

### Technical Metrics
- [ ] 100% visual parity with original PreviewPhone
- [ ] <100ms token update latency
- [ ] <3s megaprompt generation time
- [ ] 0 TypeScript errors
- [ ] 90%+ test coverage

### Quality Metrics
- [ ] All components WCAG AA compliant
- [ ] 60fps animations
- [ ] Works on Web, iOS, Android
- [ ] 15+ adherence rules in megaprompt
- [ ] Type-safe token system

### User Metrics
- [ ] <5 min to first megaprompt
- [ ] <10 min to customized design system
- [ ] 90%+ user satisfaction
- [ ] 100+ design systems generated/week

---

## 📚 Reference Documents

- **[product-plan.md](./product-plan.md)** - Complete product strategy
- **[SYNC_ARCHITECTURE.md](./SYNC_ARCHITECTURE.md)** - State management patterns
- **[ADD_NEW_SETTING.md](./ADD_NEW_SETTING.md)** - How to add controls
- **[claude.md](./claude.md)** - AI assistant context

---

## 🚀 Quick Start (For New Contributors)

### Setup
```bash
npm install --legacy-peer-deps
npm run dev
```

### Current Sprint: Phase 1 Tasks
Start with Task 1.1 (Token Bridge) - see detailed implementation above

### Key Patterns
1. **All state in Zustand store** - Never pass props between panels
2. **CSS variables bridge tokens** - `--color-brand` → `$brand`
3. **Tamagui styled() API** - Create styled components
4. **shadcn/ui patterns** - Copy/paste, variants, composition

### Getting Help
- Read [product-plan.md](./product-plan.md) for big picture
- Check [SYNC_ARCHITECTURE.md](./SYNC_ARCHITECTURE.md) for patterns
- Review existing components for examples

---

**Last Updated:** 2025-10-31 (Phase 1: Tamagui Integration)
**Current Sprint:** Tasks 1.1-1.6
**Next Sprint:** Phase 2 (Enhanced Megaprompt with Adherence)
**Long-term:** Phases 3-4 (Advanced Features + Enforcement)
