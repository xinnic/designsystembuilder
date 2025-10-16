# Refactoring Guide: Auto-Sync Implementation

## Quick Start: How to Add a New Setting

### ✨ The Magic Formula
When you add ANY new setting to the left panel, follow these 4 steps:

### Step 1: Add to State Type (`src/state/designSystem.ts`)
```typescript
interface DesignSystemState {
  // Your new setting
  buttonRoundness: 'sharp' | 'soft' | 'round';

  // Its setter
  setButtonRoundness(value: 'sharp' | 'soft' | 'round'): void;
}
```

### Step 2: Initialize in Store (`src/state/designSystem.ts`)
```typescript
export const useDesignSystem = create<DesignSystemState>((set) => ({
  // Default value
  buttonRoundness: 'soft',

  // Setter implementation
  setButtonRoundness: (value) => set({ buttonRoundness: value }),
}));
```

### Step 3: Map to CSS Variable (`src/state/designSystem.ts` in `useTokenCSS`)
```typescript
useEffect(() => {
  // Map your setting to CSS
  const roundnessMap = {
    sharp: '0px',
    soft: '8px',
    round: '24px'
  };
  root.style.setProperty('--button-roundness', roundnessMap[state.buttonRoundness]);
}, [state]);
```

### Step 4: Use in Left Panel Control
```typescript
// In StylingControls.tsx or similar
const { buttonRoundness, setButtonRoundness } = useDesignSystem();

<button onClick={() => setButtonRoundness('round')}>
  Round Buttons
</button>
```

**That's it!** The middle phone mock and right panel will automatically update because they use the CSS variables.

---

## Immediate Refactor Tasks

### 1. Move These Settings to Store

Currently managed outside Zustand - need to move in:

```typescript
// Add to DesignSystemState
interface DesignSystemState {
  // Theme settings
  isDarkMode: boolean;
  selectedTheme: string; // 'turquoise', 'emerald', etc.
  customPrimaryColor: string;
  selectedAccentColor: string;
  customAccentColor: string;

  // Typography
  selectedFont: string; // 'font-jakarta', 'font-vietnam', etc.
  selectedScale: 'small' | 'regular' | 'large';

  // Style presets
  stylePresetId: string; // 'modern', 'glass', 'playful', etc.

  // Add setters for all above
  setDarkMode(enabled: boolean): void;
  setTheme(theme: string): void;
  // ... etc
}
```

### 2. Remove Props from Components

**Index.tsx - BEFORE:**
```typescript
<PreviewPhone
  fontClass={selectedFont}
  selectedScale={selectedScale}
  isDarkMode={isDarkMode}
  selectedTheme={selectedTheme}
/>
```

**Index.tsx - AFTER:**
```typescript
<PreviewPhone /> // No props needed!
```

**PreviewPhone.tsx - AFTER:**
```typescript
export const PreviewPhone = () => {
  useTokenCSS(); // This ensures CSS vars are updated
  const { selectedFont, selectedScale } = useDesignSystem(); // If needed directly

  // Component uses CSS variables automatically
  return <div className="phone-container">...</div>;
}
```

### 3. Centralize Style Preset Logic

**Move from StylingControls.tsx to designSystem.ts:**

```typescript
// In designSystem.ts
import { stylePresets } from '@/lib/stylePresets';

// In store
applyStylePreset: (presetId: string) => {
  const preset = stylePresets.find(p => p.id === presetId);
  if (!preset) return;

  set((state) => ({
    stylePresetId: presetId,
    tokens: {
      ...state.tokens,
      // Apply preset shadows, radii, etc.
      shadow: preset.styles.shadows,
      radius: preset.styles.radii,
      // ... etc
    }
  }));
}
```

### 4. Enhanced CSS Variable Mapping

```typescript
// Complete mapping in useTokenCSS
export const useTokenCSS = () => {
  const state = useDesignSystem();

  useEffect(() => {
    const root = document.documentElement;

    // Theme mode
    if (state.isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Font family
    root.classList.remove(...fontClasses); // Remove all
    root.classList.add(state.selectedFont); // Add selected

    // Scale
    root.setAttribute('data-scale', state.selectedScale);

    // All token mappings...
    mapTokensToCSS(root, state.tokens);

    // Style preset specific
    mapStylePresetToCSS(root, state.stylePresetId);

  }, [state]); // React to ANY state change
};
```

---

## Component Patterns

### Pattern 1: Settings Control (Left Panel)
```typescript
function MySettingControl() {
  const { mySetting, setMySetting } = useDesignSystem();

  return (
    <select
      value={mySetting}
      onChange={(e) => setMySetting(e.target.value)}
    >
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  );
}
```

### Pattern 2: Display Component (Middle/Right Panels)
```typescript
function MyDisplayComponent() {
  useTokenCSS(); // Ensure CSS vars are synced

  // Just use CSS variables in your styles
  return (
    <div
      style={{
        borderRadius: 'var(--radius-md)',
        color: 'rgb(var(--color-text-primary))',
        // All styling from CSS variables
      }}
    >
      Content
    </div>
  );
}
```

---

## Testing Checklist

After implementing:

- [ ] Change font in left panel → Phone mock updates? ✓
- [ ] Change font in left panel → Right panel updates? ✓
- [ ] Change colors → Both panels update? ✓
- [ ] Change style preset → Both panels update? ✓
- [ ] Dark mode toggle → Both panels update? ✓
- [ ] Add new setting → Both panels update automatically? ✓

---

## Common Pitfalls to Avoid

❌ **DON'T**: Pass settings as props between components
✅ **DO**: Use Zustand store directly in each component

❌ **DON'T**: Manually update CSS in components
✅ **DO**: Map everything through useTokenCSS

❌ **DON'T**: Store settings in component state
✅ **DO**: Store everything in Zustand

❌ **DON'T**: Use inline style objects with hardcoded values
✅ **DO**: Use CSS variables for all token-based styling

---

## Example: Adding "Animation Speed" Setting

1. **Add to state:**
```typescript
animationSpeed: 'slow' | 'normal' | 'fast';
setAnimationSpeed(speed: 'slow' | 'normal' | 'fast'): void;
```

2. **Initialize:**
```typescript
animationSpeed: 'normal',
setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
```

3. **Map to CSS:**
```typescript
const speedMap = {
  slow: '500ms',
  normal: '300ms',
  fast: '150ms'
};
root.style.setProperty('--animation-speed', speedMap[state.animationSpeed]);
```

4. **Use in components:**
```css
.my-animation {
  transition: all var(--animation-speed) ease;
}
```

**Result:** Change animation speed in left panel → ALL animations everywhere update!