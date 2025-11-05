# 11-Step Color Scale Mapping Guide

> Best practices for mapping semantic colors to the 11-step OKLCH scale

## 📊 Understanding the 11-Step Scale

Each color in our system has 11 steps from `50` (lightest) to `950` (darkest):

```
50   - Nearly white tint (98% lightness)
100  - Very light tint (95% lightness)
200  - Light tint (90% lightness)
300  - Light-medium (80% lightness)
400  - Medium-light (70% lightness)
500  - Base color (60% lightness) ← Brand color
600  - Medium-dark (50% lightness)
700  - Dark (40% lightness)
800  - Very dark (30% lightness)
900  - Nearly black (20% lightness)
950  - Darkest (10% lightness)
```

## 🎨 Semantic Mapping Patterns

### Text Colors

| Semantic | Light Mode | Dark Mode | Use Case |
|----------|------------|-----------|----------|
| **text.primary** | gray-900 | gray-50 | Main content, headings |
| **text.secondary** | gray-600 | gray-400 | Supporting text, descriptions |
| **text.tertiary** | gray-500 | gray-500 | Disabled, placeholder text |
| **text.disabled** | gray-400 | gray-600 | Inactive elements |
| **text.inverse** | white | gray-950 | Text on colored backgrounds |

**Pattern:** Use high contrast (900/50) for primary, medium contrast (600/400) for secondary

### Background/Surface Colors

| Semantic | Light Mode | Dark Mode | Use Case |
|----------|------------|-----------|----------|
| **canvas.default** | gray-50 | gray-950 | Page background |
| **surface.default** | white | gray-900 | Cards, panels |
| **surface.subtle** | gray-50 | gray-850 | Nested cards |
| **surface.elevated** | white | gray-850 | Modals, dropdowns |
| **surface.hover** | gray-100 | gray-800 | Hover states |
| **surface.pressed** | gray-200 | gray-700 | Active/pressed states |

**Pattern:** Light mode goes lighter (50→white), dark mode stays in 700-950 range

### Border & Divider Colors

| Semantic | Light Mode | Dark Mode | Use Case |
|----------|------------|-----------|----------|
| **border.default** | gray-200 | gray-800 | Default borders |
| **border.subtle** | gray-100 | gray-850 | Subtle dividers |
| **border.strong** | gray-300 | gray-700 | Emphasized borders |
| **divider.default** | gray-100 | gray-850 | Section separators |

**Pattern:** Use low contrast (100-300) in light, inverted (700-850) in dark

### Interactive Colors (Primary/Brand)

| Semantic | Light Mode | Dark Mode | Use Case |
|----------|------------|-----------|----------|
| **primary.default** | brand-500 | brand-400 | Primary buttons, links |
| **primary.hover** | brand-600 | brand-300 | Hover state |
| **primary.active** | brand-700 | brand-500 | Pressed state |
| **primary.subtle** | brand-50 | brand-950 | Tinted backgrounds |
| **primary.subtleHover** | brand-100 | brand-900 | Hover on tinted bg |
| **primary.text** | brand-600 | brand-400 | Colored text |
| **primary.border** | brand-200 | brand-800 | Colored borders |

**Pattern:** Center around 500 in light mode, shift to 300-400 in dark mode

### State Colors (Success/Warning/Danger/Info)

| Semantic | Light Mode | Dark Mode | Use Case |
|----------|------------|-----------|----------|
| **success.default** | green-600 | green-400 | Success states |
| **success.subtle** | green-50 | green-950 | Success backgrounds |
| **success.border** | green-200 | green-800 | Success borders |
| **danger.default** | red-600 | red-400 | Error states |
| **danger.subtle** | red-50 | red-950 | Error backgrounds |
| **warning.default** | amber-600 | amber-400 | Warning states |
| **info.default** | blue-600 | blue-400 | Info states |

**Pattern:** Same as primary - 600 in light, 400 in dark for main color

## 🔄 Scale Usage Rules

### 1. **Contrast Requirements**
- **Text on backgrounds:** Minimum 600 steps difference
  - `gray-900` on `white` ✅ (900 steps)
  - `gray-600` on `gray-100` ✅ (500 steps)
  - `gray-500` on `gray-200` ⚠️ (300 steps - borderline)

### 2. **Interactive States**
Progressive darkening/lightening for states:
```
Light Mode:           Dark Mode:
default:  500        default:  400
hover:    600 (+100) hover:    300 (-100)
active:   700 (+200) active:   500 (+100)
```

### 3. **Elevation/Depth**
Use scale to indicate depth:
```
Light Mode (lighter = higher):
canvas:    gray-50
surface-0: white
surface-1: white + shadow
surface-2: white + larger shadow

Dark Mode (lighter = higher):
canvas:    gray-950
surface-0: gray-900
surface-1: gray-850
surface-2: gray-800
```

### 4. **Semantic Grouping**
Group related colors in similar ranges:
```
Text:     50-900 range (high contrast)
Borders:  100-300, 700-850 (low contrast)
Surfaces: 50-200, 800-950 (background range)
Actions:  300-700 (mid-range, vibrant)
```

## 📋 Quick Reference Mapping

### Light Mode Typical Mappings
```typescript
{
  // Backgrounds (light end)
  canvas: 50,
  surface: 'white' or 50,
  subtle: 100,

  // Text (dark end)
  primary: 900,
  secondary: 600,
  muted: 500,

  // Borders (light-medium)
  default: 200,
  subtle: 100,
  strong: 300,

  // Interactive (middle)
  action: 500,
  hover: 600,
  active: 700,

  // States backgrounds (very light)
  successBg: 50,
  errorBg: 50,
  warningBg: 50,
}
```

### Dark Mode Typical Mappings
```typescript
{
  // Backgrounds (dark end)
  canvas: 950,
  surface: 900,
  subtle: 850,

  // Text (light end)
  primary: 50,
  secondary: 400,
  muted: 500,

  // Borders (dark-medium)
  default: 800,
  subtle: 850,
  strong: 700,

  // Interactive (lighter middle)
  action: 400,
  hover: 300,
  active: 500,

  // States backgrounds (very dark)
  successBg: 950,
  errorBg: 950,
  warningBg: 950,
}
```

## 🎯 Best Practices

1. **Maintain Contrast Ratios**
   - AA (4.5:1) for normal text
   - AAA (7:1) for important text
   - Use steps 600+ apart for text/background

2. **Preserve Visual Hierarchy**
   - Primary text: Highest contrast (900/50)
   - Secondary text: Medium contrast (600/400)
   - Tertiary text: Lower contrast (500/500)

3. **Consistent State Changes**
   - Hover: ±100 steps
   - Active: ±200 steps
   - Disabled: Move toward 500 (middle)

4. **Theme Symmetry**
   - If light uses 200, dark uses 800 (inverse)
   - If light uses 100, dark uses 850-900
   - Middle values (400-600) can stay same

5. **Accessibility First**
   - Test with contrast checkers
   - Ensure focus states are visible
   - Don't rely on color alone

## 💡 Implementation Example

```typescript
// Good semantic mapping
export const semanticColors = {
  text: {
    primary: semantic(gray[900], gray[50]),    // Maximum contrast
    secondary: semantic(gray[600], gray[400]),  // Balanced contrast
    tertiary: semantic(gray[500], gray[500]),   // Same in both themes
  },

  surface: {
    default: semantic(white, gray[900]),        // Card backgrounds
    subtle: semantic(gray[50], gray[850]),      // Nested cards
    hover: semantic(gray[100], gray[800]),      // Hover state
  },

  primary: {
    default: semantic(brand[500], brand[400]),  // Slightly lighter in dark
    hover: semantic(brand[600], brand[300]),    // State progression
    active: semantic(brand[700], brand[500]),   // Clear interaction
  }
};
```

## 🚀 Advantages of This System

1. **Predictable** - Developers know which step to use
2. **Consistent** - Same patterns across all colors
3. **Accessible** - Built-in contrast ratios
4. **Themeable** - Easy to create new themes
5. **Maintainable** - Change one value, update everywhere

---

This systematic approach ensures your semantic colors properly leverage the 11-step scale for consistent, accessible, and beautiful interfaces across light and dark modes.