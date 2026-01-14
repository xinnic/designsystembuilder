---
description: how to create a new component in the design system
---

When creating a new component (Atom, Component, or Pattern), follow these standards to ensure consistency and themeability.

### 1. File Location
- **Atoms**: Basic building blocks (e.g., `src/design-system/atoms/`)
- **Components**: Functional UI elements (e.g., `src/design-system/components/`)
- **Patterns**: Complex layouts (e.g., `src/design-system/patterns/`)

### 2. Implementation Standards
- **Tamagui Only**: Use Tamagui primitives (`YStack`, `XStack`, `Text`, `Heading`).
- **Token Based**: Every color, size, and margin MUST use a token (e.g., `$background`, `$space.4`). No hardcoded values.
- **Variants**: Define clear variants (e.g., `size`, `variant`, `status`) using the Tamagui `styled` API or props.
- **Platform Specifics**: Consider iOS/Android/Web overrides if necessary.

### 3. Component Definition Template
```typescript
import { styled, YStack, Text } from 'tamagui';

export const MyComponent = styled(YStack, {
  name: 'MyComponent',
  backgroundColor: '$background',
  padding: '$4',
  borderRadius: '$radius.md',
  
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
      },
      outline: {
        borderWidth: 1,
        borderColor: '$borderColor',
      }
    }
  } as const,
  
  defaultVariants: {
    variant: 'primary',
  }
});
```

### 4. Integration
1. Export from the component directory.
2. Add to the `TamaguiShowcase` (right panel) for preview.
3. Ensure it works with the current active Style Preset.

### Definition of Done
- [ ] Uses only tokens (no hardcoded values).
- [ ] Has documented variants.
- [ ] Includes platform overrides if applicable.
- [ ] Passes accessibility checks.
- [ ] Has clean TypeScript types.
- [ ] Integrated into the Showcase panel.
