# Claude Instructions - Design System Builder

## 🎯 Primary Rule: Auto-Sync Architecture

**IMPORTANT:** This project uses an automatic synchronization pattern. When adding ANY new setting to the left panel, it MUST automatically update the middle phone mockup and right panel without manual intervention.

## 🔄 Auto-Sync Pattern (MUST FOLLOW)

### Adding a New Setting - 4 Mandatory Steps

When a user asks to add ANY new control/setting to the left panel, you MUST follow these 4 steps:

#### Step 1: Add to State Interface
**File:** `src/state/designSystem.ts`

```typescript
interface DesignSystemState {
  // Add the new setting type
  yourNewSetting: string | number | boolean;

  // Add its setter
  setYourNewSetting(value: type): void;
}
```

#### Step 2: Initialize in Store
**File:** `src/state/designSystem.ts` (in store creation)

```typescript
export const useDesignSystem = create<DesignSystemState>((set) => ({
  // Default value
  yourNewSetting: 'defaultValue',

  // Setter implementation
  setYourNewSetting: (value) => set({ yourNewSetting: value }),
}));
```

#### Step 3: Map to CSS Variable
**File:** `src/state/designSystem.ts` (in `useTokenCSS` hook)

```typescript
useEffect(() => {
  // Map the setting to a CSS variable
  root.style.setProperty('--your-new-setting', state.yourNewSetting);
}, [state]);
```

#### Step 4: Create Control in Left Panel
**File:** `src/left/StylingControls.tsx` or similar

```typescript
const { yourNewSetting, setYourNewSetting } = useDesignSystem();

// Create the control UI
```

## ⚠️ Critical Rules

### DO NOT:
- ❌ Pass settings as props between components
- ❌ Store settings in component local state
- ❌ Update CSS manually in components
- ❌ Create settings outside the Zustand store
- ❌ Skip the CSS variable mapping step

### ALWAYS:
- ✅ Use Zustand store for ALL settings
- ✅ Map ALL settings to CSS variables
- ✅ Use `useTokenCSS()` in display components
- ✅ Access settings directly from store using `useDesignSystem()`
- ✅ Test that changes auto-update all panels

## 📁 Key Files to Remember

- **State Management:** `src/state/designSystem.ts`
- **Left Panel Controls:** `src/left/StylingControls.tsx`
- **Phone Mockup:** `src/components/PreviewPhone.tsx`
- **Right Panel:** `src/panels/TailwindShowcase.tsx`
- **Token Display:** `src/panels/DesignSystemOverview.tsx`

## 🔍 Before Making Changes

1. Check if the setting already exists in `DesignSystemState`
2. Verify if there's already a CSS variable for it
3. Ensure you're not duplicating functionality

## 📝 Example: User Asks "Add a button corner style setting"

```typescript
// Step 1: Interface (designSystem.ts)
interface DesignSystemState {
  buttonCornerStyle: 'square' | 'rounded' | 'pill';
  setButtonCornerStyle(style: 'square' | 'rounded' | 'pill'): void;
}

// Step 2: Store (designSystem.ts)
buttonCornerStyle: 'rounded',
setButtonCornerStyle: (style) => set({ buttonCornerStyle: style }),

// Step 3: CSS Mapping (designSystem.ts - useTokenCSS)
const cornerMap = {
  square: '0px',
  rounded: '8px',
  pill: '9999px'
};
root.style.setProperty('--button-corner', cornerMap[state.buttonCornerStyle]);

// Step 4: Control (StylingControls.tsx)
const { buttonCornerStyle, setButtonCornerStyle } = useDesignSystem();

<select value={buttonCornerStyle} onChange={(e) => setButtonCornerStyle(e.target.value)}>
  <option value="square">Square</option>
  <option value="rounded">Rounded</option>
  <option value="pill">Pill</option>
</select>
```

**Result:** ALL buttons everywhere automatically update!

## 🚫 Common Mistakes to Avoid

1. **Creating isolated settings**
   ```typescript
   // WRONG
   const [mySetting, setMySetting] = useState('value');

   // RIGHT
   const { mySetting, setMySetting } = useDesignSystem();
   ```

2. **Passing props unnecessarily**
   ```typescript
   // WRONG
   <PreviewPhone theme={theme} font={font} />

   // RIGHT
   <PreviewPhone /> // Gets everything from store/CSS vars
   ```

3. **Manual CSS updates**
   ```typescript
   // WRONG
   element.style.borderRadius = '8px';

   // RIGHT
   element.style.borderRadius = 'var(--radius-md)';
   ```

## 🎨 Style Preset Integration

Style presets are special - they update multiple tokens at once:

```typescript
applyStylePreset: (presetId: string) => {
  const preset = stylePresets.find(p => p.id === presetId);
  if (!preset) return;

  set((state) => ({
    stylePresetId: presetId,
    tokens: {
      ...state.tokens,
      shadow: preset.styles.shadows,
      radius: preset.styles.radii,
      // Update all relevant tokens
    }
  }));
}
```

## 🧪 Testing Checklist

After adding any new setting:
- [ ] Change setting in left panel
- [ ] Verify phone mockup updates immediately
- [ ] Verify right panel components update immediately
- [ ] Check dark mode still works
- [ ] Verify setting persists on page refresh (if implemented)

## 📚 Documentation References

- `SYNC_ARCHITECTURE.md` - Full architecture details
- `REFACTOR_GUIDE.md` - Refactoring existing code
- `ADD_NEW_SETTING.md` - Quick reference guide

## 🔧 Current Architecture Status

### Already in Zustand Store:
- tokens (colors, typography, spacing, etc.)
- opts (menu layout, borders, inputs)
- haptics configuration

### Need to Move to Store (Refactor TODO):
- isDarkMode
- selectedTheme
- selectedFont
- selectedScale
- stylePresetId
- Custom color values

## 💡 Pro Tips

1. **Group Related Settings:**
   ```typescript
   interface ButtonSettings {
     style: 'flat' | 'raised' | 'outlined';
     size: 'sm' | 'md' | 'lg';
     corners: 'square' | 'rounded' | 'pill';
   }
   ```

2. **Use Descriptive CSS Variable Names:**
   ```css
   /* Good */
   --button-primary-bg
   --card-border-radius

   /* Bad */
   --color-1
   --radius-2
   ```

3. **Consider Token Inheritance:**
   ```typescript
   // If changing border radius preset, update all related tokens
   tokens.radius.sm = preset.radii.sm;
   tokens.radius.md = preset.radii.md;
   tokens.radius.lg = preset.radii.lg;
   ```

## 🚀 Quick Command Reference

```bash
# Check what needs syncing
grep -r "useState" src/  # Find local state that should move to store
grep -r "props\." src/   # Find prop drilling to eliminate

# Test the sync
npm run dev
# Change any setting in left panel
# Both middle and right panels should update instantly
```

---

**Remember:** The goal is ZERO manual sync. Any setting change should automatically propagate to all panels through the Zustand store and CSS variables. If you find yourself passing props or manually updating multiple places, you're doing it wrong!