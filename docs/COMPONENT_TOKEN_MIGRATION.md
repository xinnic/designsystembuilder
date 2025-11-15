# Component Token Migration Status

## ✅ Completed Migrations

### 1. Sidebar.tsx ✅
- **Status**: COMPLETED
- **Changes**:
  - Created centralized `src/config/colorThemes.ts`
  - Removed 18 hardcoded hex colors
  - Now uses `COLOR_VALUES`, `RAINBOW_GRADIENT`, `DEFAULT_PRIMARY`, `DEFAULT_ACCENT`
  - Both Sidebar and designSystem.ts use same color source

## 🔧 Critical Components to Migrate

### 2. FontPreviewColumn.tsx 🚨
**Location**: `src/components/FontPreviewColumn.tsx`
**Issues**:
- 10+ hardcoded theme colors
- Hardcoded text colors: #000000, #FFFFFF, #E1E1E1, #A8A8A8, #1C1C1E, #636366, #121212, #1E1E1E, #F2F2F7
- Missing useDesignSystem hook

**Migration Plan**:
```typescript
// Add at top:
import { useDesignSystem } from '../state/designSystem';

// In component:
const { tokens, isDarkMode } = useDesignSystem();

// Replace hardcoded colors with:
color: `rgb(${tokens.textPrimary})`
backgroundColor: `rgb(${tokens.bgPrimary})`
borderColor: `rgb(${tokens.border})`
```

### 3. SettingsBar.tsx 🚨
**Location**: `src/components/SettingsBar.tsx`
**Issues**:
- 7 hardcoded theme hex colors (#1976D2, #7B1FA2, #C2185B, #D32F2F, #FBC02D, #F57C00, #00796B)
- Missing useDesignSystem hook

**Migration Plan**:
```typescript
// Similar to FontPreviewColumn
import { useDesignSystem } from '../state/designSystem';
import { COLOR_VALUES } from '../config/colorThemes';
```

## 📋 Other Components with Hardcoded Values

### 4. ColorScaleDemo.tsx
- Multiple inline hex colors: #111, #fff, #999, #666, #000, #1a1a1a, #f9fafb, #e5e7eb, #333, #f0f9ff, #3b82f6
- Ternary conditionals for colors
- Missing useDesignSystem hook

### 5. PreviewPhoneTamagui.tsx
- Gradient colors: #a78bfa, #ec4899
- Hardcoded star color: #facc15
- Inline rgba values for shadows

### 6. TokenSystemDemo.tsx
- Inline colors: #000, #fff

## 📁 CSS Files Requiring Migration

### Priority 1: Component-Specific CSS
These files have hardcoded spacing/dimensions that should use CSS variables:

1. **ButtonMatrix.css**
   - `color: #fff` → `color: rgb(var(--color-text-primary))`
   - `outline-offset: 2px` → `outline-offset: var(--space-1)`

2. **ColorSwatch.css**
   - `height: 48px` → `height: var(--space-12)`
   - `font-size: 12px` → `font-size: var(--font-caption-size)`

3. **TypeScaleTable.css**
   - `font-size: 11px` → `font-size: var(--font-caption-size)`
   - `line-height: 14px` → `line-height: var(--font-caption-line)`

### Priority 2: Layout CSS
4. **SpacingLadder.css**
   - `height: 24px` → `height: var(--space-6)`
   - `min-width: 8px` → `min-width: var(--space-2)`

5. **RadiiChips.css**
   - `width: 48px` → `width: var(--space-12)`
   - `height: 32px` → `height: var(--space-8)`

6. **ElevationTiles.css**
   - `width: 64px` → `width: var(--space-16)`
   - `height: 48px` → `height: var(--space-12)`

## 🔨 Migration Strategy

### Phase 1: Critical Components (Today)
1. ✅ Sidebar.tsx - DONE
2. ⏳ FontPreviewColumn.tsx
3. ⏳ SettingsBar.tsx

### Phase 2: Secondary Components
4. ColorScaleDemo.tsx
5. PreviewPhoneTamagui.tsx
6. TokenSystemDemo.tsx
7. All preview/* components

### Phase 3: CSS Files
- Convert all hardcoded px values to CSS variables
- Use token system for colors, spacing, typography

## 🧪 Testing Checklist

After each migration:
- [ ] Component renders correctly
- [ ] Dark mode works
- [ ] Theme switching works
- [ ] No console errors
- [ ] Visual regression tests pass

## 📊 Progress Tracking

| Component | Status | Hardcoded Values | Using Tokens |
|-----------|---------|-----------------|--------------|
| Sidebar.tsx | ✅ | 18 colors | Yes |
| FontPreviewColumn.tsx | 🔧 | 10+ colors | No |
| SettingsBar.tsx | 🔧 | 7 colors | No |
| ColorScaleDemo.tsx | ⏳ | 10+ colors | No |
| PreviewPhoneTamagui.tsx | ⏳ | 3 colors | No |
| TokenSystemDemo.tsx | ⏳ | 2 colors | No |
| CSS Files | ⏳ | 50+ values | No |

## 🎯 Success Criteria

A component is fully migrated when:
1. ✅ No hardcoded hex colors
2. ✅ No hardcoded RGB values
3. ✅ No hardcoded spacing values
4. ✅ Uses useDesignSystem hook
5. ✅ Uses token values from state
6. ✅ Responsive to theme changes
7. ✅ Passes visual tests

## 🚀 Next Steps

1. Complete FontPreviewColumn.tsx migration
2. Complete SettingsBar.tsx migration
3. Run visual regression tests
4. Document any new token needs
5. Update this document with completion status

---

**Last Updated**: 2025-11-15
**Migrated**: 1/20+ components
**Status**: In Progress 🔧