# Design System Builder - Prioritized Task List for AI Assistant

## 🎯 Current Project Status
- ✅ Auto-sync architecture partially implemented
- ✅ Zustand store with core settings working
- ✅ Menu layout toggle (hamburger/bottom bar) syncing
- ✅ Logo upload/generation working
- ✅ Style presets updating shadows/radii
- ⚠️ Some settings still using hybrid approach (need full migration)
- 📝 **IMPORTANT:** Follow patterns in `claude.md`, `SYNC_ARCHITECTURE.md`, and `ADD_NEW_SETTING.md`

---

## 🔴 Priority 1: Complete Auto-Sync Architecture (CRITICAL)
*These tasks MUST be done first to establish consistent architecture*

### ✅ Task 1.1: Complete Sidebar Component Refactoring - COMPLETED
**Complexity:** Medium
**Time Estimate:** 30 minutes
**Status:** ✅ COMPLETED

**Completed:**
- Removed ALL props from Sidebar interface
- Used `useDesignSystem()` hook to get all values directly
- Updated `src/pages/Index.tsx` to call `<Sidebar />` with NO props
- All controls working via store

---

### ✅ Task 1.2: Fix Color System to Use Store Properly - COMPLETED
**Complexity:** Medium
**Time Estimate:** 45 minutes
**Status:** ✅ COMPLETED

**Completed:**
- Added store subscription in `src/state/designSystem.ts` that watches color changes
- Automatically updates tokens when `selectedTheme`, `customPrimaryColor`, `selectedAccentColor`, `customAccentColor`, or `isDarkMode` changes
- Removed color useEffect from Sidebar.tsx
- Primary and accent color changes update all panels instantly

---

### ✅ Task 1.3: Move Typography Scale Logic to Store - COMPLETED
**Complexity:** Medium
**Time Estimate:** 30 minutes
**Status:** ✅ COMPLETED

**Completed:**
- Moved scale definitions to store constants (`typographyScales`)
- Added font family map to store (`fontFamilyMap`)
- Auto-applies typography tokens when `selectedScale` or `selectedFont` changes
- Removed typography useEffects from Sidebar
- All text sizes update across panels automatically

---

## ✅ Priority 2: Add Missing Core Controls - COMPLETED
*Essential UI controls that users expect*

### ✅ Task 2.1: Add Spacing Scale Control - COMPLETED
**Complexity:** Medium
**Time Estimate:** 45 minutes
**Status:** ✅ COMPLETED

**Completed:**
- Added `spacingMode: 'compact' | 'normal' | 'comfortable'` to state interface
- Added default value `'normal'` and setter `setSpacingMode()` to store
- Created spacing scale definitions: Compact [4,8,12,16,20,24,32,40], Normal [8,16,24,32,40,48,64,80], Comfortable [12,24,36,48,60,72,96,120]
- Mapped spacing scales to CSS variables (--space-1 through --space-8) in store subscription
- Added UI control with 3 buttons in StylingControls.tsx
- Spacing updates automatically across all panels

**Priority 2 Status:** Core controls complete for now. Additional controls (animation speed, button style, focus ring) deferred.

---

## ✅ Priority 3: Enhance Components & Preview - COMPLETED
*Improve the visual feedback and component variety*

### ✅ Task 3.1: Add More Tailwind Showcase Components - COMPLETED
**Complexity:** Low (each component)
**Time Estimate:** 20 minutes per component
**Status:** ✅ COMPLETED

**Completed:**
- Added tab system to TailwindShowcase with "Tailwind Components" and "Complex Patterns" tabs
- **Tailwind Components Tab:**
  - ✅ Data table with sorting icon
  - ✅ Pagination controls with numbered pages
  - ✅ Progress bars (linear, stepped, circular)
  - ✅ Skeleton loaders (card & list variants)
  - ✅ Tooltip examples
  - ✅ Accordion/Collapsible component
  - Alert messages
  - Form components (search, toggle buttons)
- **Complex Patterns Tab:**
  - Navigation patterns (app title bar, bottom nav, side menu, breadcrumb)
  - Statistics cards
  - Profile cards
  - Loading states (moved from Task 3.3)

---

### ✅ Task 3.3: Add Loading States to Complex Patterns - COMPLETED
**Complexity:** Low
**Time Estimate:** 30 minutes
**Status:** ✅ COMPLETED (Integrated into Task 3.1)

**Completed:**
- Added comprehensive loading states section to Complex Patterns tab
- Includes:
  - ✅ Spinner variations (small, medium, large)
  - ✅ Button loading states
  - ✅ Page loading overlay with backdrop blur
- All loading states use motion tokens and brand colors

---

## 🟢 Priority 4: Export & Productivity Features
*Help users get their design system out of the builder*

### Task 4.1: Add Export Design Tokens
**Complexity:** Medium
**Time Estimate:** 1 hour

**Steps:**
1. Add "Export" button in header
2. Generate outputs:
   - `tokens.json` - Raw token values
   - `variables.css` - CSS custom properties
   - `tailwind.config.js` - Tailwind configuration
3. Use dialog to show all exports
4. Add copy-to-clipboard for each

---

### Task 4.2: Add Undo/Redo Functionality
**Complexity:** Medium
**Time Estimate:** 1 hour

**Steps:**
1. Install `zustand/middleware` for temporal state
2. Wrap store with temporal middleware
3. Add keyboard shortcuts (Ctrl+Z, Ctrl+Y)
4. Add UI buttons in header
5. Limit history to 50 actions

---

### Task 4.3: Add Local Storage Persistence
**Complexity:** Low
**Time Estimate:** 30 minutes

**Steps:**
1. Add persist middleware to Zustand store
2. Configure storage name and version
3. Add "Reset to Defaults" button
4. Handle migration for future updates

---

### Task 4.4: Add Contrast Checker
**Complexity:** Medium
**Time Estimate:** 45 minutes

**Steps:**
1. Add WCAG contrast calculation utility
2. Show contrast ratios for:
   - Text on backgrounds
   - Button text
   - Brand colors
3. Add warning badges for failing combinations
4. Suggest accessible alternatives

---

## 🔵 Priority 5: Polish & Advanced Features
*Nice-to-have features that enhance the experience*

### Task 5.1: Add Preset Themes
**Complexity:** Low
**Time Estimate:** 1 hour

**Complete theme presets to add:**
- Corporate (blue, conservative)
- Startup (purple, modern)
- E-commerce (green, trustworthy)
- Healthcare (teal, clean)
- Education (orange, friendly)
- SaaS (gradient, tech)

Each includes: colors, fonts, spacing, style preset

---

### Task 5.2: Add Color Palette Generator
**Complexity:** Medium
**Time Estimate:** 1 hour

**Steps:**
1. Use color theory to generate palettes
2. Create shades/tints from brand color
3. Generate complementary colors
4. Ensure accessibility
5. Preview in real-time

---

### Task 5.3: Add Component Code Export
**Complexity:** High
**Time Estimate:** 2 hours

**Steps:**
1. Add "View Code" button on showcase components
2. Generate React + Tailwind code
3. Include proper imports
4. Format with prettier
5. Copy to clipboard

---

## 📋 How to Work Through This List

### For Each Task:
1. **Read the current status** in the task description
2. **Follow the 4-step pattern** from `ADD_NEW_SETTING.md`:
   - Define in state interface
   - Add to store implementation
   - Map to CSS variables
   - Create UI control
3. **Test immediately** after implementation
4. **Verify auto-sync** works (change in left panel → updates everywhere)

### Key Files Reference:
- **Store:** `src/state/designSystem.ts` - All state management
- **Controls:** `src/left/StylingControls.tsx` - Left panel controls
- **Phone:** `src/components/PreviewPhone.tsx` - Mobile preview
- **Showcase:** `src/panels/TailwindShowcase.tsx` - Component examples
- **Layout:** `src/pages/Index.tsx` - Main app layout
- **Sidebar:** `src/components/Sidebar.tsx` - Typography/color controls

### Architecture Rules (MUST FOLLOW):
1. **NEVER pass props between panels** - Use store only
2. **ALWAYS map settings to CSS variables** - Don't use values directly
3. **ALWAYS test auto-sync** - Settings must update all panels instantly
4. **FOLLOW the pattern** - Look at menuLayout or stylePresetId implementation

### Testing Checklist:
- [ ] Setting updates in left panel
- [ ] Phone mockup updates immediately
- [ ] Tailwind showcase updates immediately
- [ ] No console errors
- [ ] Smooth transitions

---

## 🚀 Quick Commands

```bash
# Dev server (already running on port 8081)
npm run dev

# Install dependencies if needed
npm install [package]

# Type checking
npx tsc --noEmit

# Find files
find . -name "*.tsx" | grep -i [search]
```

---

## 📊 Progress Tracking

### Completed Today:
- ✅ Fixed menu layout toggle sync
- ✅ Added logo display in phone
- ✅ Fixed style presets to use store
- ✅ Removed props from PreviewPhone
- ✅ Updated Index.tsx to use store
- ✅ Task 1.1: Complete Sidebar refactoring
- ✅ Task 1.2: Fix color system to use store properly
- ✅ Task 1.3: Move typography scale logic to store
- ✅ Task 2.1: Add Spacing Scale Control
- ✅ Task 3.1: Add More Tailwind Showcase Components (with tabs)
- ✅ Task 3.3: Add Loading States to Complex Patterns

### Next Session Should Start With:
**Task 4.1** - Add Export Design Tokens

### Estimated Time to Complete All:
- Priority 1: ✅ COMPLETED
- Priority 2: ✅ COMPLETED
- Priority 3: ✅ COMPLETED
- Priority 4: 3 hours
- Priority 5: 4 hours
- **Total: ~7 hours remaining**

---

**Last Updated:** Current session (2025-01-15)
**Next Task:** Task 4.1 - Add Export Design Tokens
**Critical Path:** Priority 1, 2, & 3 COMPLETE ✅ - Moving to Priority 4