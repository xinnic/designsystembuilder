---
description: how to verify and test changes in the Design System Builder
---

After making changes, specifically adding settings or modifying components, follow this checklist.

### 1. Visual Synchronization
- [ ] Change the setting in the **Left Panel**.
- [ ] Verify the **Preview Phone** (middle) updates immediately.
- [ ] Verify the **Component Showcase** (right) updates immediately.

### 2. Preset Testing
Switch between presets and ensure the UI reflects the core characteristics:
- [ ] **Modern Flat**: Soft grey borders (`oklch(0.925 0.004 210)`), 1px width.
- [ ] **Soft & Dreamy**: NO visible borders, larger shadows.
- [ ] **Neo-Brutalism**: Thick black borders (2-4px), hard shadows.

### 3. Mode Testing
- [ ] Toggle **Dark Mode** and ensure all components remain readable and properly themed.
- [ ] Check contrast ratios for primary actions.

### 4. Technical Quality
- [ ] Run `npm run dev` and check for console errors or warnings (especially "circular structure" or "No theme found").
- [ ] Ensure no `className` attributes remain in converted files.
- [ ] Verify that new settings are stored in the Zustand store (`src/state/designSystem.ts`).

### 5. Final Build
- [ ] (Optional) Run `npm run build` to ensure no TypeScript or production build errors.
