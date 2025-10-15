# Auto-Sync Architecture for Design System Builder

## Current State Analysis

### Existing Architecture
- **State Management**: Zustand store (`src/state/designSystem.ts`)
- **CSS Variables**: Synced via `useTokenCSS` hook
- **Components**: Mix of prop passing and direct store consumption

### Current Issues
1. Style presets are managed separately (not in Zustand store)
2. Some settings bypass the central store
3. Manual sync required for new settings
4. Inconsistent update patterns across components

## Proposed Architecture

### Core Principles
1. **Single Source of Truth**: ALL settings must live in Zustand store
2. **Automatic CSS Sync**: Every store change auto-updates CSS variables
3. **Reactive Components**: All UI components consume from store, not props
4. **Type-Safe Settings**: Strong TypeScript definitions for all settings

## Implementation Plan

### Phase 1: Centralize All Settings
```typescript
// Extend DesignSystemState to include ALL settings
interface DesignSystemState {
  // Existing
  tokens: Tokens;
  opts: StylingOptions;
  haptics: HapticsConfig;

  // New additions
  stylePreset: StylePreset;
  isDarkMode: boolean;
  selectedTheme: string;
  customColors: CustomColors;
  selectedFont: string;
  selectedScale: string;

  // Setters
  setStylePreset(preset: StylePreset): void;
  setDarkMode(enabled: boolean): void;
  setTheme(theme: string): void;
  // ... etc
}
```

### Phase 2: Enhanced CSS Variable Sync
```typescript
// Enhanced useTokenCSS hook
export const useTokenCSS = () => {
  const state = useDesignSystem();

  useEffect(() => {
    // Auto-sync ALL state to CSS variables
    syncTokensToCSS(state.tokens);
    syncOptionsToCSS(state.opts);
    syncStylePresetToCSS(state.stylePreset);
    syncThemeToCSS(state.selectedTheme, state.isDarkMode);
    // ... etc
  }, [state]); // React to ANY state change
};
```

### Phase 3: Component Refactor Pattern

#### Left Panel (Settings)
```typescript
// StylingControls.tsx
function StylingControls() {
  const { setStylePreset, stylePreset } = useDesignSystem();

  // Direct store updates, no props needed
  const handlePresetChange = (preset) => {
    setStylePreset(preset);
    // That's it! Middle and right panels auto-update
  };
}
```

#### Middle Panel (Phone Mock)
```typescript
// PreviewPhone.tsx
function PreviewPhone() {
  useTokenCSS(); // Ensures CSS vars are synced

  // No props needed! Everything from CSS variables
  return (
    <div className="phone-mock">
      {/* All styling from CSS variables */}
    </div>
  );
}
```

#### Right Panel (Component Showcase)
```typescript
// TailwindShowcase.tsx
function TailwindShowcase() {
  useTokenCSS(); // Ensures CSS vars are synced

  // Components automatically use updated CSS variables
  return (
    <div className="showcase">
      {/* All components styled with CSS variables */}
    </div>
  );
}
```

## Adding New Settings Pattern

### Step 1: Update State Interface
```typescript
// In designSystem.ts
interface DesignSystemState {
  // Add new setting
  newSetting: string;
  setNewSetting(value: string): void;
}
```

### Step 2: Add to Store Implementation
```typescript
export const useDesignSystem = create<DesignSystemState>((set) => ({
  newSetting: 'default',
  setNewSetting: (value) => set({ newSetting: value }),
}));
```

### Step 3: Add CSS Variable Mapping
```typescript
// In useTokenCSS effect
root.style.setProperty('--new-setting', state.newSetting);
```

### Step 4: Use in Components
```typescript
// In any component
.my-component {
  property: var(--new-setting);
}
```

## Benefits of This Architecture

1. **Zero Manual Sync**: Add setting → Update store → Everything updates
2. **Type Safety**: TypeScript ensures all settings are properly typed
3. **Single Update Path**: All changes go through Zustand
4. **Easy Testing**: Mock the store for testing
5. **DevTools Support**: Zustand DevTools show all state changes
6. **Performance**: React's built-in optimization with Zustand

## Migration Checklist

- [ ] Move all settings to Zustand store
- [ ] Remove prop drilling from Index.tsx
- [ ] Refactor PreviewPhone to use store directly
- [ ] Refactor TailwindShowcase to use store directly
- [ ] Update StylingControls to update store directly
- [ ] Create comprehensive CSS variable mapping
- [ ] Add TypeScript interfaces for all settings
- [ ] Document the pattern for future developers

## Example: Adding a New "Button Style" Setting

1. **Update State** (designSystem.ts):
```typescript
interface DesignSystemState {
  buttonStyle: 'rounded' | 'square' | 'pill';
  setButtonStyle(style: ButtonStyle): void;
}
```

2. **Update Store**:
```typescript
buttonStyle: 'rounded',
setButtonStyle: (style) => set({ buttonStyle: style }),
```

3. **Map to CSS**:
```typescript
// In useTokenCSS
const radiusMap = {
  rounded: '8px',
  square: '0px',
  pill: '9999px'
};
root.style.setProperty('--button-radius', radiusMap[state.buttonStyle]);
```

4. **Use Everywhere**:
```css
.button {
  border-radius: var(--button-radius);
}
```

**Result**: Change button style in left panel → ALL buttons everywhere update automatically!

## Next Steps

1. Implement Phase 1: Centralize all settings
2. Implement Phase 2: Enhanced CSS sync
3. Implement Phase 3: Refactor components
4. Test thoroughly
5. Document for team