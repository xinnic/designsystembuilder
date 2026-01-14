---
description: how to migrate a component from Tailwind CSS to Tamagui
---

This project is moving away from Tailwind CSS to a pure Tamagui implementation. Follow these steps when converting or creating components.

### 1. Replace Containers
Replace `div` with `YStack` (vertical), `XStack` (horizontal), or `ZStack` (layered).

### 2. Map Tailwind Classes to Tamagui Props
Convert `className` utility classes to direct Tamagui style props.
- `flex flex-col` → `YStack`
- `p-4` → `padding="$4"` (Use tokens with $ prefix)
- `bg-white` → `backgroundColor="$background"`
- `border border-gray-200` → `borderWidth={1} borderColor="$borderColor"`
- `shadow-md` → `shadowColor="$shadowColor" shadowOffset={{width: 0, height: 2}} shadowRadius={4} shadowOpacity={0.1}`

### 3. Replace Typography
Replace `h1`, `p`, `span` with Tamagui components:
- `h1`, `h2`, `h3` → `Heading`
- `p`, `span` → `Text` (use `fontWeight`, `fontSize` props)

### 4. Use Theme Tokens
Always use theme tokens for colors and sizes to ensure dark mode and preset support.
- Colors: `$background`, `$color`, `$borderColor`, `$primary`, etc.
- Spacing: `$1`, `$2`, `$4`, etc.

### 5. Remove Tailwind Dependencies
- Delete the `className` attribute once conversion is complete.
- Ensure no Tailwind-specific imports remain.

### Success Criteria
- [ ] No `className` attribute remains on the component.
- [ ] Component responds correctly to theme changes (Light/Dark).
- [ ] Component responds to preset changes (e.g., border width changes in Neo-Brutalism).
- [ ] `npm run dev` shows no layout regressions.
