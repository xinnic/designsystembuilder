# Full Tamagui Migration Plan

## Objective
Remove all Tailwind CSS dependencies and convert the entire Design System Builder UI to use Tamagui components exclusively, ensuring dynamic theming works across all presets.

## Current State Analysis

### Tailwind Dependencies Found
1. **`index.css`**: Contains `@tailwind` directives (lines 23-25)
2. **`tailwind.config.ts`**: Full Tailwind configuration
3. **`Sidebar.tsx`**: Heavy use of Tailwind classes (`className="w-80 h-screen..."`)
4. **`Index.tsx`**: Layout using Tailwind classes
5. **shadcn/ui components**: Built on Tailwind (Button, Switch, Dropdown, etc.)

### Tamagui Infrastructure Already Present
1. ✅ **`tamagui.config.ts`**: Complete Tamagui configuration
2. ✅ **OKLCH color system**: Implemented in `primitives.ts`
3. ✅ **Style presets**: Defined with proper tokens
4. ✅ **Tamagui components**: Some already created in `design-system/components/`

## Migration Strategy

### Phase 1: Remove Tailwind Infrastructure
- [ ] Remove `@tailwind` directives from `index.css`
- [ ] Delete or archive `tailwind.config.ts`
- [ ] Remove Tailwind from `package.json` dependencies
- [ ] Remove PostCSS Tailwind plugin

### Phase 2: Create Tamagui Replacements for shadcn/ui Components
Replace these shadcn/ui components with Tamagui equivalents:
- [ ] **Button** → Use Tamagui `Button`
- [ ] **Switch** → Use Tamagui `Switch`
- [ ] **Dropdown Menu** → Use Tamagui `Select` or custom `Popover`
- [ ] **Collapsible** → Create custom with Tamagui `Accordion` or `YStack` + animations
- [ ] **Toast** → Use Tamagui `Toast`

### Phase 3: Convert Sidebar Component
The Sidebar is the most complex component. Convert it to use:
- [ ] Replace `className` with Tamagui styled props
- [ ] Use `YStack`, `XStack` for layout
- [ ] Use `ScrollView` for scrollable content
- [ ] Use Tamagui `Text`, `Heading` components
- [ ] Replace color pickers with Tamagui-styled inputs
- [ ] Convert all buttons to Tamagui `Button`

### Phase 4: Convert Main Layout (Index.tsx)
- [ ] Replace Tailwind grid/flex with Tamagui `XStack`/`YStack`
- [ ] Use Tamagui spacing tokens (`$space.4`, etc.)
- [ ] Apply theme colors via `backgroundColor="$background"`

### Phase 5: Update Right Panel Components
- [ ] **DesignSystemOverview.tsx**: Convert to Tamagui
- [ ] **TamaguiShowcase.tsx**: Already uses Tamagui (verify)
- [ ] **PatternsShowcase.tsx**: Convert to Tamagui

### Phase 6: Dynamic Theming Integration
- [ ] Update `handleStylePresetChange` to set Tamagui theme
- [ ] Ensure `getStylePresetCSSVariables` maps to Tamagui tokens
- [ ] Test preset switching updates entire UI

### Phase 7: Clean Up & Verification
- [ ] Remove unused CSS files
- [ ] Remove Tailwind utility classes from all files
- [ ] Verify all presets work (Modern Flat, Soft & Dreamy, Minimalist, Neo-Brutalism)
- [ ] Test dark mode
- [ ] Verify responsive behavior

## Implementation Order

1. **Start**: Create Tamagui component replacements
2. **Core**: Convert Sidebar (most complex)
3. **Layout**: Convert Index.tsx
4. **Panels**: Convert right panel components
5. **Infrastructure**: Remove Tailwind completely
6. **Testing**: Verify dynamic theming

## Success Criteria

- ✅ No Tailwind classes in any component
- ✅ No `@tailwind` directives in CSS
- ✅ All UI uses Tamagui components
- ✅ Preset switching updates entire builder UI
- ✅ Soft & Dreamy removes borders
- ✅ Neo-Brutalism adds thick black borders
- ✅ Modern Flat shows soft grey borders
- ✅ Dark mode works
