# Design System Builder - React Native Tamagui Integration Plan

## 🎯 Current Project Status - TAMAGUI MIGRATION
- ✅ Tamagui dependencies installed
- ✅ Basic Tamagui configuration created
- ✅ PreviewPhoneTamagui and TamaguiShowcase components created
- ⚠️ **CRITICAL ISSUE:** Components are unstyled - Tamagui is headless
- ⚠️ **CRITICAL ISSUE:** Need to bridge our design tokens with Tamagui
- ⚠️ **CRITICAL ISSUE:** Middle preview looks broken/unstyled
- ⚠️ **CRITICAL ISSUE:** Right panel components look unstyled

---

## 🔴 URGENT: Fix Tamagui Integration (DO THIS FIRST)

### The Core Problem
**Tamagui is a primitive/headless system** - it provides the structure but NOT the styling. We need to:
1. **Bridge our design tokens** (CSS variables) → Tamagui tokens
2. **Style Tamagui primitives** with our design system
3. **Create bespoke components** for app-specific patterns

### Three-Layer Architecture

#### **Layer 1: Design Tokens** (Foundation)
Our existing token system + Tamagui token mapping

**What to keep from our system:**
- ✅ Color system (brand, semantic, text, backgrounds)
- ✅ Typography scales (displayLg, h1, h2, subhead, body, caption, button, eyebrow)
- ✅ Spacing scale (space-1 through space-8)
- ✅ Border radius (sm, md, lg, full)
- ✅ Shadows (level-1, level-2, level-3)
- ✅ Motion/animations (duration-fast, duration-medium, easing)

**What to add/modify:**
- Create Tamagui-compatible token definitions
- Map our RGB variables to Tamagui's token format
- Create platform-specific font mappings

#### **Layer 2: Basic Components** (Styled Primitives)
Tamagui components with our design system applied

**Components to style:**
1. **Button** - 5 variants (primary, secondary, tertiary, destructive, disabled)
2. **Input/TextArea** - States (default, focus, error, disabled)
3. **Card** - Elevation levels, borders
4. **Switch/Checkbox/Radio** - Brand colors, states
5. **Select/Dropdown** - Styled with our tokens
6. **Tabs** - Active/inactive states
7. **Progress/Slider** - Brand color fills
8. **Dialog/Sheet** - Overlays, animations
9. **Text** (H1-H6, Paragraph) - Typography scale mapping

**Styling Approach:**
```typescript
// Example: Styled Button
export const Button = styled(TamaguiButton, {
  name: 'Button',
  backgroundColor: '$brand',
  color: 'white',
  borderRadius: '$md',
  fontSize: '$body',
  paddingHorizontal: '$4',
  paddingVertical: '$3',
  fontFamily: '$body',

  variants: {
    variant: {
      primary: { bg: '$brand', color: 'white' },
      secondary: { bg: 'transparent', borderWidth: 1, borderColor: '$brand', color: '$brand' },
      // etc.
    }
  }
});
```

#### **Layer 3: Bespoke Components** (App-Specific)
Custom components not in Tamagui

**Components to create:**
1. **AppBar/TopBar** - Logo, title, actions
2. **BottomTabBar** - Navigation with icons + labels
3. **CategoryPills** - Horizontal scrolling filters
4. **StatsCard** - Icon + label + value display
5. **UserCard** - Avatar + name + status
6. **ReviewCard** - Stars + content + actions
7. **HeroCard** - Image + title + description + CTA

---

## 🔴 Priority 1: Fix Token Bridge & Configuration

### Task 1.1: Create Proper Tamagui Token Configuration
**Complexity:** High
**Time Estimate:** 2 hours
**Status:** 🚨 IN PROGRESS

**Steps:**
1. Update `src/tamagui.config.ts` to properly map our tokens:
   ```typescript
   // Map our CSS variables to Tamagui tokens
   const tokens = createTokens({
     color: {
       brand: 'rgb(var(--color-brand))',
       brandWeak: 'rgb(var(--color-brand-weak))',
       textPrimary: 'rgb(var(--color-text-primary))',
       textSecondary: 'rgb(var(--color-text-secondary))',
       bgPrimary: 'rgb(var(--color-bg-primary))',
       bgSecondary: 'rgb(var(--color-bg-secondary))',
       border: 'rgb(var(--color-border))',
       success: 'rgb(var(--color-success))',
       danger: 'rgb(var(--color-danger))',
       // etc.
     },
     space: {
       1: 'var(--space-1)',
       2: 'var(--space-2)',
       3: 'var(--space-3)',
       // Map all 8 space values
     },
     size: {
       // Same as space for consistency
     },
     radius: {
       sm: 'var(--radius-sm)',
       md: 'var(--radius-md)',
       lg: 'var(--radius-lg)',
       full: 'var(--radius-full)',
     }
   });
   ```

2. Create fonts that reference our typography:
   ```typescript
   const fonts = {
     body: createFont({
       family: 'var(--font-family)', // Our primary font
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
         // Map all line heights
       },
       weight: {
         // Map weights
       }
     }),
     heading: createFont({
       family: 'var(--font-display)', // Our display font
       // Same size/line-height/weight as body
     })
   };
   ```

3. Make Tamagui config reactive to our store changes:
   ```typescript
   // Subscribe to design system changes
   useDesignSystem.subscribe((state) => {
     // Update Tamagui config when tokens change
   });
   ```

**Acceptance Criteria:**
- [ ] All our CSS variables accessible in Tamagui as `$token`
- [ ] Color changes in store update Tamagui components
- [ ] Font changes in store update Tamagui typography
- [ ] Spacing/radius changes propagate to Tamagui

---

### Task 1.2: Create Styled Component Library
**Complexity:** High
**Time Estimate:** 3 hours
**Status:** 🚨 PENDING

**Create:** `src/design-system/components/`

**Files to create:**
```
src/design-system/
├── components/
│   ├── Button.tsx          # Styled button with variants
│   ├── Input.tsx           # Styled text inputs
│   ├── Card.tsx            # Styled card container
│   ├── Text.tsx            # Typography components (H1-H6, P)
│   ├── Switch.tsx          # Styled switch
│   ├── Checkbox.tsx        # Styled checkbox
│   ├── Select.tsx          # Styled select/dropdown
│   ├── Tabs.tsx            # Styled tabs
│   ├── Progress.tsx        # Styled progress bar
│   ├── Dialog.tsx          # Styled modal/dialog
│   └── index.ts            # Export all
├── bespoke/
│   ├── AppBar.tsx          # Custom top bar
│   ├── BottomNav.tsx       # Custom bottom navigation
│   ├── CategoryPills.tsx   # Custom filter pills
│   ├── StatsCard.tsx       # Custom stats display
│   └── index.ts            # Export all
└── tokens.ts               # Token utilities
```

**Each component should:**
1. Import Tamagui primitive
2. Apply our design tokens via `styled()`
3. Define variants for different states
4. Export typed props

**Example Button.tsx:**
```typescript
import { Button as TamaguiButton, styled } from 'tamagui';

export const Button = styled(TamaguiButton, {
  name: 'Button',
  fontFamily: '$body',
  fontSize: '$3',
  fontWeight: '600',
  paddingHorizontal: '$4',
  paddingVertical: '$3',
  borderRadius: '$md',
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

export type ButtonProps = React.ComponentProps<typeof Button>;
```

**Acceptance Criteria:**
- [ ] All basic components styled and exported
- [ ] Components use our design tokens (`$brand`, `$space`, etc.)
- [ ] Variants match our design system (primary, secondary, etc.)
- [ ] TypeScript types exported for each component
- [ ] Components respond to theme changes (light/dark)

---

### Task 1.3: Rebuild PreviewPhoneTamagui with Styled Components
**Complexity:** Medium
**Time Estimate:** 2 hours
**Status:** 🚨 PENDING

**Update:** `src/components/PreviewPhoneTamagui.tsx`

**Changes needed:**
1. Import styled components from `src/design-system/components`
2. Import bespoke components from `src/design-system/bespoke`
3. Replace all unstyled Tamagui primitives with styled versions
4. Match the visual design of original `PreviewPhone.tsx`
5. Use proper backgrounds, shadows, borders, colors
6. Ensure responsive to design token changes

**Structure:**
```typescript
import { YStack, XStack, ScrollView } from 'tamagui';
import { Button } from '@/design-system/components/Button';
import { Card } from '@/design-system/components/Card';
import { H1, H3, Paragraph } from '@/design-system/components/Text';
import { AppBar } from '@/design-system/bespoke/AppBar';
import { CategoryPills } from '@/design-system/bespoke/CategoryPills';
import { StatsCard } from '@/design-system/bespoke/StatsCard';

export const PreviewPhoneTamagui = () => {
  // ... component implementation with styled components
};
```

**Visual Requirements (match original):**
- [ ] Phone frame with proper border and shadow
- [ ] Status bar with time and battery
- [ ] App header with logo, title, search, bell icons
- [ ] Category pills with active state highlighting
- [ ] Hero card with gradient, title, description, CTA button
- [ ] Stats row with icons and values
- [ ] List items with proper spacing
- [ ] User cards with avatars and follow buttons
- [ ] Action buttons side-by-side
- [ ] Review card with stars and interaction buttons
- [ ] Bottom navigation (when enabled)

**Acceptance Criteria:**
- [ ] Visual parity with original PreviewPhone
- [ ] All interactions working (button hovers, etc.)
- [ ] Responds to design token changes
- [ ] Dark mode switching works
- [ ] Font changes apply correctly
- [ ] Spacing/radius changes visible

---

### Task 1.4: Rebuild TamaguiShowcase with Styled Components
**Complexity:** Medium
**Time Estimate:** 2 hours
**Status:** 🚨 PENDING

**Update:** `src/panels/TamaguiShowcase.tsx`

**Changes needed:**
1. Import all styled components
2. Replace unstyled Tamagui primitives
3. Organize into clear sections like original TailwindShowcase
4. Add proper backgrounds, spacing, borders
5. Show all component variants

**Sections to include:**
1. **Typography** - H1-H6, Paragraph, Caption using styled Text components
2. **Buttons** - All variants (primary, secondary, tertiary, destructive, disabled)
3. **Form Controls** - Input, TextArea, Switch, Checkbox, Radio, Select
4. **Cards** - Basic card, elevated card, branded card
5. **Tabs** - Working tab system
6. **Progress** - Progress bars and sliders
7. **Overlays** - Dialog and Sheet examples
8. **Shapes & Avatars** - Circle, Square, Avatar components

**Acceptance Criteria:**
- [ ] All components properly styled
- [ ] Visual parity with original TailwindShowcase
- [ ] Components respond to theme changes
- [ ] Interactive elements work (tabs, dialogs, etc.)
- [ ] Proper backgrounds and shadows
- [ ] Typography uses correct fonts

---

## 🟡 Priority 2: Polish & Refinement

### Task 2.1: Add Platform-Specific Styling
**Complexity:** Low
**Time Estimate:** 30 minutes

**Add to styled components:**
```typescript
import { Platform } from 'react-native';

const platformStyles = Platform.select({
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
});
```

---

### Task 2.2: Fix Typography Duality
**Complexity:** Medium
**Time Estimate:** 1 hour

**Problem:** We have two typography systems:
1. Our semantic token system (displayLg, h1, h2, etc.)
2. Tamagui's size system (1-6)

**Solution:**
- Map our semantic names to Tamagui sizes in config
- Create convenience components: `<H1>`, `<H2>`, `<Body>`, `<Caption>`
- These wrap Tamagui's Text with correct size props

```typescript
// src/design-system/components/Text.tsx
import { Text as TamaguiText, styled } from 'tamagui';

export const H1 = styled(TamaguiText, {
  fontFamily: '$heading',
  fontSize: '$5', // Maps to our h1 size
  fontWeight: '700',
  lineHeight: '$5',
});

export const H2 = styled(TamaguiText, {
  fontFamily: '$heading',
  fontSize: '$4', // Maps to our h2 size
  fontWeight: '600',
  lineHeight: '$4',
});

export const Body = styled(TamaguiText, {
  fontFamily: '$body',
  fontSize: '$2', // Maps to our body size
  fontWeight: '400',
  lineHeight: '$2',
});
```

---

### Task 2.3: Test All Design System Controls
**Complexity:** Low
**Time Estimate:** 1 hour

**Test that everything still works:**
- [ ] Color theme changes update Tamagui components
- [ ] Primary font changes apply to body text
- [ ] Display font changes apply to headings
- [ ] Typography scale affects all text sizes
- [ ] Spacing mode changes update component spacing
- [ ] Dark mode switches properly
- [ ] Border radius changes visible
- [ ] Logo upload displays correctly
- [ ] Menu layout toggle works

---

## 📊 Progress Tracking

### Current Architecture

**Token Flow:**
```
User Changes Setting
  ↓
Zustand Store Updates
  ↓
CSS Variables Updated (--color-brand, etc.)
  ↓
Tamagui Config References CSS Variables
  ↓
Styled Components Use Tamagui Tokens ($brand, etc.)
  ↓
Components Re-render with New Styles
```

**Component Hierarchy:**
```
Tamagui Primitive (unstyled)
  ↓
Styled Component (our design applied)
  ↓
Bespoke Component (app-specific patterns)
```

---

## 🎯 Recommendations Summary

### Design Tokens Layer
**Keep:** All our existing tokens (colors, typography, spacing, radius, shadows)
**Add:** Tamagui-compatible token definitions that reference our CSS variables
**Approach:** Bridge layer that maps `rgb(var(--color-brand))` → `$brand` token

### Basic Components Layer
**Use:** Tamagui primitives as base
**Style:** Via `styled()` API with our tokens
**Pattern:** One styled component file per primitive
**Include:** All variants our design system supports

### Bespoke Components Layer
**Create:** App-specific components not in Tamagui
**Examples:** AppBar, BottomNav, CategoryPills, StatsCard
**Build:** Compose from styled basic components
**Goal:** Match visual fidelity of original PreviewPhone

---

## ⏱️ Time Estimates

- Task 1.1: Fix token bridge - **2 hours**
- Task 1.2: Create styled library - **3 hours**
- Task 1.3: Rebuild PreviewPhoneTamagui - **2 hours**
- Task 1.4: Rebuild TamaguiShowcase - **2 hours**
- Task 2.1: Platform-specific styling - **30 minutes**
- Task 2.2: Fix typography duality - **1 hour**
- Task 2.3: Testing - **1 hour**

**Total: ~11.5 hours**

---

## 🚀 Success Criteria

When complete, we should have:
1. ✅ Visual parity between PreviewPhone and PreviewPhoneTamagui
2. ✅ All components properly styled with our design system
3. ✅ Design token changes propagate to Tamagui components
4. ✅ Typography system merged and working
5. ✅ All original functionality maintained
6. ✅ Cross-platform code that works on Web, iOS, Android
7. ✅ Generated megaprompt produces functional React Native apps

---

**Last Updated:** 2025-10-31 (Tamagui Integration Analysis)
**Next Task:** Task 1.1 - Fix Token Bridge & Configuration
**Critical Path:** Must complete Priority 1 tasks before continuing
