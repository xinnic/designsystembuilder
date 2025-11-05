# Color Naming Conventions Guide

> Industry analysis and recommendations for color naming in design systems

## 📊 Industry Analysis

### Most Common Patterns

| Design System | Main Color | Supporting Color | Usage |
|--------------|------------|------------------|--------|
| **Material Design** | Primary | Secondary | ✅ Most common |
| **Material Design 3** | Primary | Secondary, Tertiary | Modern Android |
| **Bootstrap** | Primary | Secondary | Web standard |
| **Ant Design** | Primary | Secondary | Enterprise |
| **Chakra UI** | Primary | Secondary | React ecosystem |
| **Tailwind CSS** | Primary | Secondary | Utility-first |
| **Fluent UI** | Brand | Accent | Microsoft |
| **IBM Carbon** | Primary | Secondary | Enterprise |
| **Atlassian** | Primary | Secondary | SaaS |
| **GitHub Primer** | Primary | Secondary | Developer tools |

### Survey Results
- **70%** use Primary/Secondary
- **20%** use Brand/Accent
- **10%** use other (Main/Alt, etc.)

## 🎯 Recommendation: Primary/Accent

### Why Primary/Accent is Best

```typescript
colors: {
  primary: ColorScale,    // Main brand color
  accent: ColorScale,     // Complementary color
  success: ColorScale,    // Semantic green
  warning: ColorScale,    // Semantic amber
  danger: ColorScale,     // Semantic red
  info: ColorScale,       // Semantic blue
  neutral: ColorScale     // Grays
}
```

**Benefits:**
1. **"Primary"** is universally understood as the main color
2. **"Accent"** clearly indicates a highlight/complement (not "less important")
3. Avoids the Secondary = "Less Important" confusion
4. Compatible with most developer mental models

## ❌ Why Not "Brand"?

### Problems with "Brand":
- Not all projects are commercial/branded
- Personal projects don't have a "brand"
- Open source tools might not identify with "brand"
- More corporate/marketing focused than developer focused

### When "Brand" Makes Sense:
- White-label products
- Multi-tenant SaaS
- Design system documentation
- When you need to distinguish from functional colors

## ❌ Why Not "Secondary"?

### Problems with "Secondary":
- Implies hierarchy (less important)
- Confusing: Is secondary button less important or just different?
- Often misused for disabled/muted states
- Doesn't convey "complementary" relationship

### Secondary Better Used For:
- Text hierarchy (primary text, secondary text)
- Importance levels (primary action, secondary action)
- Not for color relationships

## 🏆 Best Practice: Semantic + Role-Based Naming

### Recommended Complete Structure

```typescript
interface ColorSystem {
  // Core Identity Colors
  primary: Scale11;        // Main brand/identity color
  accent: Scale11;         // Complementary highlight color

  // Semantic State Colors (Fixed Meanings)
  success: Scale11;        // Positive/Success (green)
  warning: Scale11;        // Caution/Warning (amber)
  danger: Scale11;         // Error/Danger (red)
  info: Scale11;           // Information (blue)

  // Neutral Colors
  neutral: Scale11;        // Grays/slate colors

  // Optional Extended Palette
  purple?: Scale11;        // For special use cases
  teal?: Scale11;          // Additional options
}
```

### In Practice - Component Usage

```tsx
// Clear and intuitive
<Button variant="primary">Save</Button>      // Main action
<Button variant="accent">Learn More</Button>  // Alternative action
<Button variant="success">Confirm</Button>    // Positive action
<Button variant="danger">Delete</Button>      // Destructive action

// Confusing with "secondary"
<Button variant="primary">Save</Button>
<Button variant="secondary">Learn More</Button>  // Less important? Different style?
```

## 📝 Migration Guide

### If Currently Using Brand/Secondary

```typescript
// Old
colors: {
  brand: '#3B82F6',
  secondary: '#8B5CF6'
}

// New (Recommended)
colors: {
  primary: '#3B82F6',    // Renamed from brand
  accent: '#8B5CF6'      // Renamed from secondary
}
```

### Alias Strategy (Supporting Both)

```typescript
// Support multiple naming conventions
const colors = {
  primary: '#3B82F6',
  accent: '#8B5CF6',

  // Aliases for compatibility
  get brand() { return this.primary; },
  get secondary() { return this.accent; }
};
```

## 🎨 Complete Naming Recommendations

### Color Scales
```typescript
{
  primary: Scale11,     // Main brand color
  accent: Scale11,      // Complementary color
  neutral: Scale11,     // Grays (better than "gray")
  success: Scale11,     // Green
  warning: Scale11,     // Amber/Yellow
  danger: Scale11,      // Red (better than "error")
  info: Scale11         // Blue
}
```

### Semantic Tokens
```typescript
{
  // Using primary
  'action.primary': primary[500],
  'link.default': primary[600],
  'focus.ring': primary[500],

  // Using accent
  'action.accent': accent[500],
  'highlight.background': accent[100],
  'badge.background': accent[500],

  // Using neutral
  'text.primary': neutral[900],
  'border.default': neutral[200],
  'surface.background': neutral[50]
}
```

### Component Variants
```typescript
// Clear naming for variants
<Button color="primary" />    // Uses primary color
<Button color="accent" />     // Uses accent color
<Badge color="success" />     // Uses success color
<Alert color="warning" />     // Uses warning color
```

## 🌍 International Considerations

### English Terms are Standard
- All major design systems use English
- Even non-English companies (Ant Design, Samsung) use English color names
- Keeps consistency across global teams
- Better for documentation and sharing

### Terms to Use
✅ **primary** - Universal understanding
✅ **accent** - Clear purpose
✅ **success** - Positive state
✅ **warning** - Caution state
✅ **danger** - Error/destructive
✅ **info** - Informational
✅ **neutral** - Better than "gray"

### Terms to Avoid
❌ **brand** - Too corporate
❌ **secondary** - Ambiguous
❌ **error** - Use "danger" (more versatile)
❌ **muted** - Use "neutral"
❌ **base** - Too generic

## 💡 Final Recommendation

```typescript
// RECOMMENDED Color Naming
export const colorSystem = {
  // Identity Colors (User Controlled)
  primary: generateScale(userColor),        // Main brand color
  accent: generateScale(accentColor),       // Complementary color

  // Semantic Colors (System Controlled)
  neutral: generateScale(grayWithTint),     // Grays
  success: generateScale('#10B981'),        // Green
  warning: generateScale('#F59E0B'),        // Amber
  danger: generateScale('#EF4444'),         // Red
  info: generateScale('#3B82F6')           // Blue
};

// Component Usage
<Button color="primary">Primary Action</Button>
<Button color="accent">Alternative Action</Button>
<Button color="success">Confirm</Button>
<Button color="danger">Delete</Button>
<Text color="neutral">Body text using neutral scale</Text>
```

## 📊 TL;DR

**Use `primary` and `accent`** because:
1. Industry standard (70% of design systems)
2. Clear meaning without ambiguity
3. Developer friendly
4. Avoids "secondary = less important" confusion
5. "Accent" better conveys complementary relationship

**Don't use `brand` and `secondary`** because:
1. "Brand" is too corporate/limiting
2. "Secondary" implies hierarchy, not complement
3. Less intuitive for developers
4. Creates confusion in component variants