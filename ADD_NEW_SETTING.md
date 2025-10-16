# 🚀 Quick Guide: Adding a New Setting

> **Goal:** When you add a setting to the left panel, the phone mockup and right panel should update automatically without any extra work!

## The 4-Step Process

### Example: Adding a "Button Size" Setting

#### 📝 Step 1: Define in State Type
**File:** `src/state/designSystem.ts`

```typescript
interface DesignSystemState {
  // Add your setting type
  buttonSize: 'small' | 'medium' | 'large';

  // Add its setter
  setButtonSize(size: 'small' | 'medium' | 'large'): void;
}
```

#### 🎯 Step 2: Add to Store
**File:** `src/state/designSystem.ts` (in the store creation)

```typescript
export const useDesignSystem = create<DesignSystemState>((set) => ({
  // Set default value
  buttonSize: 'medium',

  // Implement setter
  setButtonSize: (size) => set({ buttonSize: size }),
}));
```

#### 🎨 Step 3: Map to CSS Variable
**File:** `src/state/designSystem.ts` (in `useTokenCSS` hook)

```typescript
useEffect(() => {
  // Convert setting to CSS value
  const sizeMap = {
    small: '32px',
    medium: '40px',
    large: '48px'
  };

  root.style.setProperty('--button-height', sizeMap[state.buttonSize]);
}, [state]);
```

#### 🎮 Step 4: Create Control in Left Panel
**File:** `src/left/StylingControls.tsx` (or wherever your control is)

```typescript
function ButtonSizeControl() {
  const { buttonSize, setButtonSize } = useDesignSystem();

  return (
    <div>
      <label>Button Size</label>
      <select
        value={buttonSize}
        onChange={(e) => setButtonSize(e.target.value)}
      >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>
  );
}
```

## ✨ That's It!

Now all buttons everywhere will automatically use `var(--button-height)` and update when you change the setting!

---

## How It Works Automatically

### Phone Mockup (Middle Panel)
```css
/* Automatically uses the CSS variable */
.button {
  height: var(--button-height);
}
```

### Component Showcase (Right Panel)
```css
/* Also automatically uses the CSS variable */
.showcase-button {
  min-height: var(--button-height);
}
```

**No props to pass! No manual updates! It just works! 🎉**

---

## Common Setting Types

### Color Setting
```typescript
// State
primaryButtonColor: string;
setPrimaryButtonColor(color: string): void;

// CSS Mapping
root.style.setProperty('--button-primary-color', state.primaryButtonColor);
```

### Numeric Setting
```typescript
// State
borderWidth: number; // in pixels
setBorderWidth(width: number): void;

// CSS Mapping
root.style.setProperty('--border-width', `${state.borderWidth}px`);
```

### Boolean Toggle
```typescript
// State
showShadows: boolean;
setShowShadows(show: boolean): void;

// CSS Mapping
root.style.setProperty('--shadow', state.showShadows ? '0 2px 4px rgba(0,0,0,0.1)' : 'none');
```

### Multi-value Setting
```typescript
// State
spacing: { small: number; medium: number; large: number };
setSpacing(spacing: Partial<Spacing>): void;

// CSS Mapping
root.style.setProperty('--space-sm', `${state.spacing.small}px`);
root.style.setProperty('--space-md', `${state.spacing.medium}px`);
root.style.setProperty('--space-lg', `${state.spacing.large}px`);
```

---

## Checklist for New Settings

- [ ] Added to `DesignSystemState` interface?
- [ ] Added setter to interface?
- [ ] Added default value in store?
- [ ] Added setter implementation in store?
- [ ] Added CSS variable mapping in `useTokenCSS`?
- [ ] Created control component in left panel?
- [ ] Tested that middle panel updates?
- [ ] Tested that right panel updates?

---

## Tips

1. **Name CSS variables semantically**
   - Good: `--button-height`
   - Bad: `--height-1`

2. **Use TypeScript enums for complex options**
   ```typescript
   enum ButtonStyle {
     Flat = 'flat',
     Raised = 'raised',
     Outlined = 'outlined'
   }
   ```

3. **Group related settings**
   ```typescript
   interface ButtonSettings {
     size: 'small' | 'medium' | 'large';
     style: 'flat' | 'raised' | 'outlined';
     roundness: 'sharp' | 'soft' | 'pill';
   }
   ```

4. **Document your CSS variables**
   ```css
   :root {
     /* Button Settings */
     --button-height: 40px; /* small: 32px, medium: 40px, large: 48px */
   }
   ```

---

## Questions?

Check these files:
- `src/state/designSystem.ts` - Where all settings live
- `src/left/StylingControls.tsx` - Example controls
- `SYNC_ARCHITECTURE.md` - Detailed architecture explanation
- `REFACTOR_GUIDE.md` - Refactoring existing code