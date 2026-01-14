---
description: how to set up or update Tamagui themes for style presets
---

This workflow explains how to ensure Tamagui themes are properly mapped to the design system's style presets.

### 1. Define Theme Variants
Add or update the theme variants in the Tamagui configuration.
**File:** `src/tamagui.config.ts`

Follow these specs for the 4 core themes:
- **modernFlat**: `borderColor: oklch(0.925 0.004 210)`, `borderWidth: 1`, `backgroundColor: "$background"`
- **softDreamy**: `borderColor: "transparent"`, `borderWidth: 0`, `shadowRadius: 10`
- **minimalist**: Subtle border and shadows.
- **neoBrutalism**: `borderColor: oklch(0 0 0)`, `borderWidth: 3`, `shadowOffset: {width: 4, height: 4}`

### 2. Map State to Theme
Ensure the `usePresetTheme` hook (or equivalent) correctly switches the active Tamagui theme when a preset is selected.

### 3. Apply Theme to Layout
Wrap the application (or specific panels) in a `Theme` component from Tamagui.
**File:** `src/App.tsx` or `src/pages/Index.tsx`

```tsx
<Theme name={currentPresetTheme}>
  <YStack backgroundColor="$background" flex={1}>
    {/* Components will now use the specific preset theme */}
  </YStack>
</Theme>
```

### 4. Verification
- Change preset to **Neo-Brutalism**: Builder UI should show thick black borders.
- Change preset to **Soft & Dreamy**: Builder UI should have NO borders.
- Change preset to **Modern Flat**: Builder UI should have soft grey borders.
