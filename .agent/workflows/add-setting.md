---
description: how to add a new control/setting to the design system builder
---

When adding any new control or setting to the left panel, you MUST follow this 4-step synchronization pattern to ensure all panels update automatically.

### 1. Update the State Interface
Add the new setting type and its setter to the `DesignSystemState` interface.
**File:** `src/state/designSystem.ts`

```typescript
interface DesignSystemState {
  // Add the new setting type
  yourNewSetting: string | number | boolean;

  // Add its setter
  setYourNewSetting(value: type): void;
}
```

### 2. Initialize in the Zustand Store
Define the default value and implement the setter.
**File:** `src/state/designSystem.ts`

```typescript
export const useDesignSystem = create<DesignSystemState>((set) => ({
  // Default value
  yourNewSetting: 'defaultValue',

  // Setter implementation
  setYourNewSetting: (value) => set({ yourNewSetting: value }),
}));
```

### 3. Map to CSS Variable or Tamagui Token
Ensure the setting is reflected in the styling system.
**File:** `src/state/designSystem.ts` (inside the `useTokenCSS` hook or equivalent)

```typescript
useEffect(() => {
  // Map the setting to a CSS variable
  root.style.setProperty('--your-new-setting', state.yourNewSetting);
}, [state]);
```

### 4. Create the Control UI
Access the store and create the UI component in the left panel.
**File:** `src/left/StylingControls.tsx` (or appropriate sub-component)

```typescript
const { yourNewSetting, setYourNewSetting } = useDesignSystem();

// Create the control UI (e.g., Select, Switch, Input)
```

### Critical Rules
- ❌ **DO NOT** pass settings as props between components.
- ❌ **DO NOT** store settings in component local state.
- ✅ **ALWAYS** use the Zustand store as the single source of truth.
- ✅ **ALWAYS** verify that changing the setting updates the preview phone AND the right showcase panel.
