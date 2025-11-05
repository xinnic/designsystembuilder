# Color System Architecture

> How user color choices propagate through the 11-step scale and semantic system

## 🎨 Current User Controls

Users currently select:
1. **Primary/Brand Color** - Main brand identity color
2. **Secondary/Accent Color** - Complementary accent color

## 🔄 How Colors Flow Through the System

```mermaid
User Picks → Generate 11-Step Scales → Map to Semantic Tokens → Apply to Components
   #3B82F6 →     50,100,200...950    →  primary.default: 500  →  Button, Links, etc.
```

## 📊 Recommended Color Architecture

### 1. User-Controlled Colors (What Users Pick)

#### **Brand Color** (Primary)
- **User picks**: Single hex color (e.g., #3B82F6)
- **System generates**: 11-step OKLCH scale
- **Used for**:
  - Primary buttons
  - Links
  - Selected states
  - Focus rings
  - Brand identity elements

#### **Accent Color** (Secondary)
- **User picks**: Single hex color OR auto-generate
- **System generates**: 11-step OKLCH scale
- **Options**:
  - Manual pick
  - Auto: Complementary (opposite on color wheel)
  - Auto: Analogous (adjacent on color wheel)
  - Auto: Triadic (120° apart)
- **Used for**:
  - Secondary actions
  - Highlights
  - Badges
  - Alternative CTAs

### 2. System-Generated Colors (Automatic)

#### **Neutral/Gray Scale**
- **Generated from**: Brand color's hue with low saturation
- **Better approach**: Tinted grays that harmonize with brand
- **Formula**:
  ```typescript
  // Extract hue from brand color
  const brandHue = getBrandHue(primaryColor);
  // Generate grays with subtle brand tint
  const gray500 = `oklch(0.5 0.02 ${brandHue})`;
  ```
- **Used for**:
  - Text colors
  - Borders
  - Backgrounds
  - Disabled states

#### **Semantic State Colors**
- **Fixed or Smart-Generated**:
  - ✅ Success: Green (or brand-relative green)
  - ⚠️ Warning: Amber/Yellow
  - ❌ Danger: Red
  - ℹ️ Info: Blue (unless blue is brand)

### 3. Advanced Color Generation Options

#### **Smart Palette Generation**
From one brand color, generate:

```typescript
interface SmartPalette {
  brand: Scale11;        // User's primary color
  accent: Scale11;       // Complementary/Analogous/Triadic
  gray: Scale11;         // Tinted neutral
  success: Scale11;      // Green variant
  warning: Scale11;      // Amber variant
  danger: Scale11;       // Red variant
  info: Scale11;         // Blue variant
}
```

## 🎯 Recommended User Controls

### Basic Mode (Simple)
```typescript
interface BasicColorControls {
  primaryColor: string;        // Single color picker
  colorScheme: 'monochromatic' | 'complementary' | 'analogous' | 'triadic';
  // Everything else auto-generated
}
```

### Advanced Mode (Designer)
```typescript
interface AdvancedColorControls {
  // Brand colors
  primaryColor: string;        // Main brand
  accentColor: string;         // Secondary brand

  // Neutral customization
  grayTint: 'cool' | 'neutral' | 'warm' | 'brand';
  graySaturation: 0-10;        // How much brand color in grays

  // Semantic overrides
  successColor?: string;       // Optional override
  warningColor?: string;       // Optional override
  dangerColor?: string;        // Optional override
  infoColor?: string;          // Optional override
}
```

### Pro Mode (Full Control)
```typescript
interface ProColorControls {
  scales: {
    brand: string;           // Base color for brand scale
    accent: string;          // Base color for accent scale
    gray: string;            // Base color for gray scale
    success: string;         // Base color for success scale
    warning: string;         // Base color for warning scale
    danger: string;          // Base color for danger scale
    info: string;            // Base color for info scale
  };

  // Fine-tune semantic mappings
  semanticOverrides?: {
    'primary.default'?: { light: string; dark: string };
    'text.primary'?: { light: string; dark: string };
    // ... any semantic token
  };
}
```

## 🔄 Color Relationships

### How Secondary/Accent Relates to Primary

#### Option 1: Complementary (Opposite)
```typescript
// 180° opposite on color wheel
Primary: Blue (#3B82F6) → Accent: Orange (#F97316)
```
**Use when**: Want high contrast, energetic feel

#### Option 2: Analogous (Adjacent)
```typescript
// 30-60° adjacent on color wheel
Primary: Blue (#3B82F6) → Accent: Purple (#8B5CF6) or Teal (#06B6D4)
```
**Use when**: Want harmony, professional feel

#### Option 3: Triadic (Triangle)
```typescript
// 120° apart on color wheel
Primary: Blue (#3B82F6) → Accent: Green (#10B981) & Red (#EF4444)
```
**Use when**: Want vibrant, balanced palette

#### Option 4: Split-Complementary
```typescript
// Opposite ±30°
Primary: Blue (#3B82F6) → Accent: Yellow (#EAB308) & Red (#EF4444)
```
**Use when**: Want contrast with more nuance

## 📋 Implementation Recommendations

### 1. Simplest Approach (Recommended Start)
```typescript
// User picks ONE color
const userColor = '#3B82F6';

// System generates everything
const palette = {
  brand: generateScale(userColor),
  accent: generateScale(getComplementary(userColor)),
  gray: generateTintedGrayScale(userColor),
  success: generateScale('#10B981'),
  warning: generateScale('#F59E0B'),
  danger: generateScale('#EF4444'),
  info: generateScale('#3B82F6')
};
```

### 2. Balanced Approach
```typescript
// User picks primary + relationship
const userPrimary = '#3B82F6';
const colorScheme = 'analogous'; // or complementary, triadic

// Generate accent based on scheme
const accent = generateAccentColor(userPrimary, colorScheme);

// Rest is automatic
const palette = {
  brand: generateScale(userPrimary),
  accent: generateScale(accent),
  gray: generateTintedGrayScale(userPrimary),
  // ... semantic colors
};
```

### 3. Designer-Friendly Approach
```typescript
// User has full control over brand colors
const userPrimary = '#3B82F6';
const userAccent = '#8B5CF6';
const grayTint = 'brand'; // cool, warm, neutral, brand

// System handles semantic colors intelligently
const palette = {
  brand: generateScale(userPrimary),
  accent: generateScale(userAccent),
  gray: generateGrayScale(grayTint, userPrimary),

  // Smart semantic colors that avoid conflicts
  success: userPrimary.includes('green')
    ? generateScale('#3B82F6')  // Use blue if brand is green
    : generateScale('#10B981'),

  danger: userPrimary.includes('red')
    ? generateScale('#7C3AED')  // Use purple if brand is red
    : generateScale('#EF4444')
};
```

## 🎨 Semantic Mapping Strategy

### Primary (Brand) Usage
```typescript
semanticColors = {
  // Primary brand color usage
  primary: {
    default: brand[500],
    hover: brand[600],
    subtle: brand[50],
    text: brand[600],
    border: brand[200]
  },

  // Link colors use brand
  text: {
    link: brand[600],
    linkHover: brand[700]
  },

  // Focus states use brand
  focus: {
    ring: brand[500]
  }
};
```

### Accent (Secondary) Usage
```typescript
semanticColors = {
  // Secondary/accent usage
  secondary: {
    default: accent[500],
    hover: accent[600],
    subtle: accent[50],
    text: accent[600],
    border: accent[200]
  },

  // Special highlights
  highlight: {
    background: accent[100],
    border: accent[300],
    text: accent[700]
  }
};
```

### Gray Scale Usage
```typescript
semanticColors = {
  // All neutral UI elements
  text: {
    primary: gray[900],
    secondary: gray[600],
    tertiary: gray[500],
    disabled: gray[400]
  },

  border: {
    default: gray[200],
    subtle: gray[100],
    strong: gray[300]
  },

  surface: {
    default: white,
    subtle: gray[50],
    muted: gray[100]
  }
};
```

## 🚀 Final Recommendations

### For Your Design System Builder

1. **Start Simple**
   - Let users pick ONE brand color
   - Auto-generate accent using complementary
   - Use tinted grays (not pure gray)
   - Keep semantic colors fixed

2. **Add Progressive Disclosure**
   ```
   Basic → Advanced → Pro
   1 color → 2 colors + scheme → Full control
   ```

3. **Provide Smart Defaults**
   - Complementary accent by default
   - 2% brand tint in grays
   - Standard semantic colors
   - Auto dark mode generation

4. **Validation & Constraints**
   - Ensure sufficient contrast
   - Prevent brand/semantic conflicts
   - Suggest alternatives if colors too similar
   - Show live preview of all generations

### Example UI Control Structure

```typescript
const ColorControls = {
  // Step 1: Brand
  brand: {
    label: "Brand Color",
    type: "color-picker",
    default: "#3B82F6"
  },

  // Step 2: Accent Strategy
  accentStrategy: {
    label: "Accent Color",
    type: "select",
    options: [
      { value: "auto-complementary", label: "Auto - Complementary (High Contrast)" },
      { value: "auto-analogous", label: "Auto - Analogous (Harmonious)" },
      { value: "auto-triadic", label: "Auto - Triadic (Vibrant)" },
      { value: "custom", label: "Custom Color..." }
    ],
    default: "auto-complementary"
  },

  // Step 3: (Only if custom)
  accentColor: {
    label: "Custom Accent",
    type: "color-picker",
    showIf: "accentStrategy === 'custom'"
  },

  // Step 4: Gray Tinting
  grayStyle: {
    label: "Neutral Colors",
    type: "select",
    options: [
      { value: "brand-tinted", label: "Brand Tinted (Recommended)" },
      { value: "cool-gray", label: "Cool Gray" },
      { value: "warm-gray", label: "Warm Gray" },
      { value: "true-gray", label: "Pure Gray" }
    ],
    default: "brand-tinted"
  },

  // Advanced Toggle
  showAdvanced: {
    label: "Advanced Options",
    type: "toggle",
    default: false
  },

  // Advanced: Override Semantics
  overrideSemantics: {
    showIf: "showAdvanced === true",
    success: { type: "color-picker", default: "#10B981" },
    warning: { type: "color-picker", default: "#F59E0B" },
    danger: { type: "color-picker", default: "#EF4444" },
    info: { type: "color-picker", default: "#3B82F6" }
  }
};
```

## 💡 Key Insights

1. **Less is More**: Most users need just 1-2 color choices
2. **Smart Generation**: Auto-generate harmonious palettes from minimal input
3. **Tinted Grays**: Always better than pure gray - creates cohesion
4. **Semantic Consistency**: Keep success=green, danger=red across all themes
5. **Progressive Disclosure**: Hide complexity until users need it

This approach gives users the perfect balance of simplicity and power while maintaining design system consistency!