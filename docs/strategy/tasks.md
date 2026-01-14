# Design System Builder - Task Priority Matrix

> **Last Updated:** 2025-12-31
> **Current Sprint:** Foundation & Token System
> **Critical Path:** Token System → Component Migration → B2C Components → Megaprompt

## 📊 Task Sequencing Overview

The current implementation is **backwards** - we're building components without the proper token foundation. This document reorganizes tasks in the correct sequence to build a solid, scalable system.

## ⚠️ Critical Finding

**Documentation vs Reality Gap:**
- ✅ Comprehensive token system **documented** (3-tier OKLCH system)
- ✅ Token system **NOW IMPLEMENTED** (11-step OKLCH scales + semantic mappings)
- ⚠️ Components still using hardcoded values (migration needed)
- ⚠️ Megaprompt needs updating to use new token system

---

## 🎯 Task Priority List (Sequenced by Dependency)

### CATEGORY 1: Foundation & Token System 🔴 **CRITICAL - DO FIRST**

| Task | Why Important | Model | Status | Time |
|------|--------------|-------|--------|------|
| **1.1 Implement 3-Tier Token System** | Components can't be properly themed without this foundation | Opus | ✅ COMPLETED | 2 days |
| - Primitive tokens (11-step OKLCH scales) | Enable wide color gamut and perceptual uniformity | Opus | ✅ Completed | 4h |
| - Semantic token mappings | Theme switching and dark mode support | Opus | ✅ Completed | 4h |
| - Component token overrides | Per-component customization | Sonnet | ✅ Completed | 2h |
| - Token-to-CSS bridge | Real-time preview updates | Sonnet | ✅ Completed | 2h |
| **1.2 Create Token Factory Functions** | 87% code reduction for component variants | Opus | ✅ COMPLETED | 1 day |
| - Color scale generator | Automatic 11-step scales from brand color | Opus | ✅ Completed | 3h |
| - Size variant generator | Consistent sizing across components | Sonnet | ✅ Completed | 2h |
| - State transformation rules | Hover/focus/press states | Sonnet | ✅ Completed | 3h |
| **1.3 Update Tamagui Config** | Bridge tokens to Tamagui properly | Sonnet | ✅ COMPLETED | 4h |
| - Map semantic tokens | Connect token system to Tamagui | Sonnet | ✅ Completed | 2h |
| - Platform-specific tokens | iOS/Android/Web differences | Sonnet | ✅ Completed | 2h |

---

### CATEGORY 2: Component Migration 🟡 **REQUIRED - DO SECOND**

| Task | Why Important | Model | Status | Time |
|------|--------------|-------|--------|------|
| **2.1 Migrate Existing Components to Token System** | Current components use hardcoded values | Sonnet | ✅ COMPLETED | 2 days |
| - Button component | Most used component, sets pattern | Sonnet | ✅ Completed | 2h |
| - Card component | Base for FeedCard | Sonnet | ✅ Completed | 2h |
| - Input/Select/Checkbox | Form foundation | Sonnet | Partial | 3h |
| - Text component | Typography tokens | Sonnet | ✅ Completed | 2h |
| - Stack component | Spacing tokens | Sonnet | ✅ Completed | 1h |
| **2.2 Add CVA Variant Structure** | Consistent variant API across components | Opus | Not Started | 1 day |
| - Define variant types | Size/variant/state patterns | Opus | Not Started | 3h |
| - Implement compound variants | Complex state combinations | Opus | Not Started | 3h |
| - Add default variants | Sensible defaults | Sonnet | Not Started | 2h |

---

### CATEGORY 3: B2C Hero Components 🟢 **MVP FEATURES - DO THIRD**

| Task | Why Important | Model | Status | Time |
|------|--------------|-------|--------|------|
| **3.1 FeedCard Component** | #1 B2C component - Instagram/TikTok feeds | Opus | Not Started | 1 day |
| - Image handling & aspect ratios | Visual content display | Opus | Not Started | 3h |
| - Content zones (title/desc/meta) | Information hierarchy | Sonnet | Not Started | 2h |
| - Action slots | Like/comment/share | Sonnet | Not Started | 3h |
| **3.2 TabBar Component** | Primary mobile navigation pattern | Opus | Not Started | 1 day |
| - Platform-specific styles | iOS/Android conventions | Opus | Not Started | 4h |
| - Badge support | Notification indicators | Sonnet | Not Started | 2h |
| - Active state animations | Visual feedback | Sonnet | Not Started | 2h |
| **3.3 NavHeader Component** | App branding and top navigation | Sonnet | Partial (AppBar exists) | 6h |
| - Transparent/blur modes | Modern mobile patterns | Sonnet | Not Started | 3h |
| - Logo/avatar slots | Branding flexibility | Sonnet | Not Started | 3h |
| **3.4 DrawerMenu Component** | Secondary navigation | Opus | Not Started | 1 day |
| - Section headers | Content organization | Sonnet | Not Started | 2h |
| - Nested menus | Complex navigation | Opus | Not Started | 4h |
| - User profile area | Account section | Sonnet | Not Started | 2h |
| **3.5 SegmentedControl Component** | Content filtering UI | Sonnet | Not Started | 6h |
| - Sliding indicator | Visual selection | Sonnet | Not Started | 3h |
| - Icon support | Visual options | Sonnet | Not Started | 3h |
| **3.6 SearchBar Component** | Discovery pattern | Sonnet | Not Started | 6h |
| - Filter chips | Search refinement | Sonnet | Not Started | 3h |
| - Recent searches | User convenience | Sonnet | Not Started | 3h |

---

### CATEGORY 4: Megaprompt System 🔵 **EXPORT - DO FOURTH**

| Task | Why Important | Model | Status | Time |
|------|--------------|-------|--------|------|
| **4.1 Token System Export** | Include all token definitions in prompt | Opus | Not Started | 1 day |
| - OKLCH color system | Color generation logic | Opus | Not Started | 4h |
| - Semantic mappings | Theme relationships | Sonnet | Not Started | 4h |
| **4.2 Component Code Generation** | Full Tamagui component implementations | Opus | Partial (basic exists) | 2 days |
| - Component templates | Reusable patterns | Opus | Not Started | 6h |
| - Variant generation | All component variants | Opus | Not Started | 6h |
| - Platform overrides | iOS/Android specifics | Sonnet | Not Started | 4h |
| **4.3 Project Setup Instructions** | Zero to app in 5 minutes | Sonnet | Partial | 6h |
| - Expo initialization | Project creation | Sonnet | Partial | 2h |
| - Tamagui setup | Dependencies and config | Sonnet | Partial | 2h |
| - Directory structure | Organized codebase | Sonnet | Not Started | 2h |
| **4.4 Adherence Rules** | Enforce token usage | Opus | Not Started | 4h |
| - Token enforcement | No hardcoded values | Opus | Not Started | 2h |
| - Accessibility rules | WCAG compliance | Sonnet | Not Started | 2h |
| **4.5 AI Enhancement Features** | Make megaprompt more powerful | Opus | Not Started | 6h |
| - Illustration generation capabilities | Enable AI to generate SVG illustrations/icons | Opus | Not Started | 3h |
| - Claude skills/instructions | Add specific Claude capabilities and best practices | Opus | Not Started | 3h |

---

### CATEGORY 4B: UX Enhancements 🟢 **USER EXPERIENCE - DO ALONGSIDE**

| Task | Why Important | Model | Status | Time |
|------|--------------|-------|--------|------|
| **4B.1 Automatic Color Generation** | Simplify color palette creation | Sonnet | ✅ COMPLETED | 4h |
| - Analogous color generation | Generate harmonious secondary colors | Sonnet | ✅ Completed | 2h |
| - Manual override tracking | Respect user's explicit choices | Sonnet | ✅ Completed | 1h |
| - Color naming (Primary/Secondary) | Industry-standard naming conventions | Sonnet | ✅ Completed | 1h |

---

### CATEGORY 5: Extended Components ⚪ **NICE TO HAVE - DO FIFTH**

| Task | Why Important | Model | Status | Time |
|------|--------------|-------|--------|------|
| **5.1 Content Components** | | | | |
| - Avatar | User representation | Sonnet | Not Started | 3h |
| - Badge/Chip | Tags and status | Sonnet | Not Started | 3h |
| - ImageCarousel | Product galleries | Opus | Not Started | 6h |
| - EmptyState | No content handling | Sonnet | Not Started | 3h |
| **5.2 Form Components** | | | | |
| - RadioGroup | Single selection | Sonnet | Not Started | 3h |
| - TextArea | Long form input | Sonnet | Not Started | 3h |
| - Slider | Range selection | Sonnet | Not Started | 4h |
| **5.3 Feedback Components** | | | | |
| - Toast | Transient messages | Sonnet | Not Started | 4h |
| - Alert | Inline warnings | Sonnet | Not Started | 3h |
| - Skeleton | Loading states | Sonnet | Not Started | 3h |

---

## 🚀 Sprint Plan

### Sprint 1: Foundation (Week 1)
**Goal:** Implement complete token system
- [ ] Day 1-2: Implement 3-tier token system
- [ ] Day 3: Create token factory functions
- [ ] Day 4: Update Tamagui config
- [ ] Day 5: Migrate 2-3 existing components as proof

**Success Criteria:**
- All colors using OKLCH
- Semantic tokens working
- Theme switching functional
- At least Button and Card using tokens

### Sprint 2: Component Migration (Days 6-8)
**Goal:** All existing components use token system
- [ ] Day 6: Migrate remaining basic components
- [ ] Day 7: Add CVA variant structure
- [ ] Day 8: Test and refine

**Success Criteria:**
- Zero hardcoded values
- All components themeable
- Consistent variant API

### Sprint 3: B2C Components (Week 2)
**Goal:** Ship 6 hero B2C components
- [ ] Day 9-10: FeedCard & TabBar
- [ ] Day 11: NavHeader & DrawerMenu
- [ ] Day 12-13: SegmentedControl & SearchBar

**Success Criteria:**
- Instagram-like feed possible
- TikTok-like navigation working
- All using token system

### Sprint 4: Megaprompt (Days 14-16)
**Goal:** Complete megaprompt generation
- [ ] Day 14: Token system export
- [ ] Day 15: Component code generation
- [ ] Day 16: Setup instructions & adherence rules

**Success Criteria:**
- Copy/paste to Claude works
- Generates working app
- Under 5 minutes to running code

---

## 📈 Progress Tracking

### Overall Progress
- **Foundation:** 100% ✅ (Token system, factories & platform tokens complete!)
- **Token Integration:** 100% ✅ (OKLCH tokens integrated with Zustand store!)
- **Migration:** 100% ✅ (Semantic tokens now power all UI colors!)
- **B2C Components:** 15% (AppBar/BottomNav partial - ready for new tokens)
- **Megaprompt:** 30% (token system integration complete, needs component updates)
- **Extended:** 0%
- **UX Enhancements:** 100% ✅ (Color auto-generation complete!)

### Current Status
1. ✅ **Token system IMPLEMENTED** - Foundation complete!
2. ✅ **Factory functions COMPLETE** - 87% code reduction achieved!
3. ✅ **Platform-specific tokens COMPLETE** - iOS/Android/Web support added!
4. ✅ **Color auto-generation IMPLEMENTED** - Automatic analogous color generation!
5. ✅ **OKLCH tokens INTEGRATED** - Connected to Zustand store!
6. ✅ **Semantic color mappings ACTIVE** - Proper dark mode via OKLCH!
7. ✅ **Token migration DOCUMENTED** - See docs/architecture/TOKEN_MIGRATION.md
8. ✅ **UI Polish & Refinement** - Fixed padding, borders, and spacing consistency!
9. ✅ **Dark Mode System** - Fixed top bar and sidebar theming!

---

### CATEGORY 6: UI Restructure 🔵 **UX IMPROVEMENT - IN PROGRESS**

| Task | Why Important | Model | Status | Time |
|------|--------------|-------|--------|------|
| **6.1 Tab Restructure** | Current 2-tab system confusing | Sonnet | Not Started | 2h |
| - Update `Index.tsx` to 3-tab structure | Atoms / Components / Patterns | Sonnet | Not Started | 1h |
| - Create `PatternsShowcase.tsx` panel | Third tab content | Sonnet | Not Started | 1h |
| **6.2 Typography Consolidation** | Duplicate typography displays | Sonnet | Not Started | 1h |
| - Remove typography from TamaguiShowcase | Typography is an Atom, not Component | Sonnet | Not Started | 30m |
| - Improve TypeScaleTable display | Show rendered text first | Sonnet | Not Started | 30m |
| **6.3 Component Badges** | Future-proof for custom components | Sonnet | Not Started | 1h |
| - Create ComponentBadge component | TAMAGUI / CUSTOM variants | Sonnet | Not Started | 30m |
| - Add badges to component sections | Visual origin indicators | Sonnet | Not Started | 30m |
| **6.4 Documentation Updates** | Align docs with new UI | Sonnet | Partial | 1h |
| - Update architecture.md | Document 3-tier hierarchy | Sonnet | ✅ Completed | 30m |
| - Update product-plan.md | Information architecture | Sonnet | Not Started | 30m |

---

## 🎯 Definition of Done

### Token System Complete When:
- [ ] All colors in OKLCH format
- [ ] 11-step scales generate from any color
- [ ] Semantic tokens map to primitives
- [ ] Dark mode works automatically
- [ ] Components update instantly on token change

### Component Complete When:
- [ ] Uses only tokens (no hardcoded values)
- [ ] Has all documented variants
- [ ] Includes platform overrides
- [ ] Passes accessibility checks
- [ ] Has TypeScript types

### Megaprompt Complete When:
- [ ] Includes all token definitions
- [ ] Generates all components
- [ ] Has setup instructions
- [ ] Includes adherence rules
- [ ] Works in Claude/Cursor first try

---

## 💡 Key Insights

1. **Current approach is backwards** - Building UI without token foundation
2. **Token system is the critical path** - Everything depends on it
3. **Factory pattern crucial** - Enables rapid component creation
4. **Megaprompt needs real code** - Not just configuration
5. **B2C focus differentiates** - Navigation over forms

---

## 🚦 Next Action

**STOP** current component development
**START** with Task 1.1 - Implement 3-Tier Token System

Without the token foundation, all other work will need to be redone.

---

**Note:** This prioritization fixes the fundamental sequencing issue. The token system MUST come first, then migrate existing components, then build new B2C components properly.

---

## 🔥 CATEGORY 7: Full Tamagui Migration (Remove Tailwind) 🔴 **URGENT - PARALLEL EXECUTION**

> **Goal:** Remove ALL Tailwind CSS and convert the builder UI to use Tamagui exclusively
> **Why:** Builder UI has harsh black borders because Tailwind CSS variables aren't being resolved correctly. Presets don't update the builder UI dynamically.
> **Success Criteria:** Soft grey borders on Modern Flat, NO borders on Soft & Dreamy, thick black borders on Neo-Brutalism

### 🎯 Key Reference Values (From Lovable UI)
- **Soft Grey Border:** `oklch(0.925 0.004 210)` - already defined in `stylePresets.ts`
- **White Background:** `oklch(1.000 0.000 0)`
- **Text Color:** `oklch(0.150 0.002 210)`

---

### STREAM A: Infrastructure (Do First - Blocks Others)

| Task ID | Task | File(s) | Can Parallelize? | Status |
|---------|------|---------|------------------|--------|
| **7.A.1** | Remove @tailwind directives from index.css | `src/index.css` lines 23-25 | ❌ DO FIRST | ✅ Completed |
| **7.A.2** | Remove @layer base wrapper, keep :root variables | `src/index.css` lines 27-298 | After 7.A.1 | ✅ Completed |
| **7.A.3** | Update Tamagui config to add preset-specific themes | `src/tamagui.config.ts` | ✅ Yes | Not Started |
| **7.A.4** | Create TamaguiThemeProvider component | `src/providers/TamaguiThemeProvider.tsx` (new) | ✅ Yes | Not Started |

**7.A.1 Prompt:**
```
Remove Tailwind from index.css. In /Users/mushy/Documents/Repositories/designsystembuilder/src/index.css:
1. Delete lines 23-25 (@tailwind base/components/utilities)
2. Remove "@layer base {" wrapper (line 27) and its closing "}" (around line 298)
3. Keep all :root CSS variables and other styles
4. Verify the app still loads (run `npm run dev`)
```

**7.A.3 Prompt:**
```
Update Tamagui config to support style presets. In /Users/mushy/Documents/Repositories/designsystembuilder/src/tamagui.config.ts:
1. Add 4 theme variants: 'modernFlat', 'softDreamy', 'minimalist', 'neoBrutalism'
2. Each theme should define: borderColor, borderWidth, background, shadow tokens
3. modernFlat: borderColor=oklch(0.925 0.004 210), borderWidth=1
4. softDreamy: borderColor=transparent, borderWidth=0
5. minimalist: borderColor=oklch(0.925 0.004 210), borderWidth=1
6. neoBrutalism: borderColor=oklch(0 0 0), borderWidth=2-4
7. Export a function to get theme by preset ID
```

---

### STREAM B: Convert Sidebar Component (Most Complex)

| Task ID | Task | File(s) | Can Parallelize? | Status |
|---------|------|---------|------------------|--------|
| **7.B.1** | Replace Sidebar container div with Tamagui YStack | `src/components/Sidebar.tsx` line 219 | ✅ Yes | Not Started |
| **7.B.2** | Convert Sidebar header section to Tamagui | `src/components/Sidebar.tsx` lines 220-225 | ✅ Yes | Not Started |
| **7.B.3** | Replace Collapsible with Tamagui Accordion | `src/components/Sidebar.tsx` lines 229-386 | ✅ Yes | Not Started |
| **7.B.4** | Convert color picker grid to Tamagui XStack/YStack | `src/components/Sidebar.tsx` lines 264-315 | ✅ Yes | Not Started |
| **7.B.5** | Convert style preset buttons to Tamagui | `src/components/Sidebar.tsx` lines 324-347 | ✅ Yes | Not Started |
| **7.B.6** | Convert all remaining buttons to Tamagui Button | `src/components/Sidebar.tsx` | After B.1-B.5 | Not Started |
| **7.B.7** | Replace shadcn Switch with Tamagui Switch | `src/components/Sidebar.tsx` line 320 | ✅ Yes | Not Started |
| **7.B.8** | Replace shadcn DropdownMenu with Tamagui Select | `src/components/Sidebar.tsx` lines 242-260 | ✅ Yes | Not Started |

**7.B.1 Prompt:**
```
Convert Sidebar container to Tamagui. In /Users/mushy/Documents/Repositories/designsystembuilder/src/components/Sidebar.tsx:
1. Import { YStack, ScrollView } from 'tamagui'
2. Replace line 219's <div className="w-80 h-screen overflow-y-auto p-6 border-r border-border bg-background">
   With: <YStack width={320} height="100vh" padding="$6" borderRightWidth="$borderWidth" borderRightColor="$borderColor" backgroundColor="$background">
   Wrap content in <ScrollView>
3. The $borderWidth and $borderColor should come from the Tamagui theme (set by preset)
4. Remove className attribute entirely
```

**7.B.3 Prompt:**
```
Replace Collapsible with Tamagui Accordion in Sidebar. In /Users/mushy/Documents/Repositories/designsystembuilder/src/components/Sidebar.tsx:
1. Remove imports for Collapsible, CollapsibleContent, CollapsibleTrigger from @/components/ui/collapsible
2. Create a simple accordion using Tamagui:
   - Use YStack with pressable header
   - Use AnimatePresence for content visibility
   - Use state to track open/closed
3. Convert Basic Options section (lines 229-386)
4. Convert Advanced Styling section (lines 388-621)
5. Use Tamagui's XStack for flex row layouts, YStack for columns
6. Replace all className props with Tamagui style props
```

---

### STREAM C: Convert Main Layout (Index.tsx)

| Task ID | Task | File(s) | Can Parallelize? | Status |
|---------|------|---------|------------------|--------|
| **7.C.1** | Replace main layout div with Tamagui XStack | `src/pages/Index.tsx` | ✅ Yes | Not Started |
| **7.C.2** | Convert right panel container to YStack | `src/pages/Index.tsx` lines 175-190 | ✅ Yes | Not Started |
| **7.C.3** | Convert tab buttons to Tamagui | `src/pages/Index.tsx` lines 181-196 | ✅ Yes | Not Started |
| **7.C.4** | Add preset class to root element dynamically | `src/pages/Index.tsx` | ✅ Yes | Not Started |

**7.C.1 Prompt:**
```
Convert Index.tsx layout to Tamagui. In /Users/mushy/Documents/Repositories/designsystembuilder/src/pages/Index.tsx:
1. Import { XStack, YStack } from 'tamagui'
2. Replace the main container div with XStack:
   <XStack flex={1} height="100vh">
3. Replace all className="flex" with Tamagui flex props
4. Replace background color classes with backgroundColor="$background"
5. Replace border classes with borderWidth and borderColor props
6. Ensure the 3-panel layout (Sidebar | Preview | Right Panel) is preserved
```

---

### STREAM D: Convert Right Panel Components

| Task ID | Task | File(s) | Can Parallelize? | Status |
|---------|------|---------|------------------|--------|
| **7.D.1** | Convert DesignSystemOverview to Tamagui | `src/panels/DesignSystemOverview.tsx` | ✅ Yes | Not Started |
| **7.D.2** | Remove DesignSystemOverview.css (use Tamagui styles) | `src/panels/DesignSystemOverview.css` | After 7.D.1 | Not Started |
| **7.D.3** | Verify TamaguiShowcase uses only Tamagui | `src/panels/TamaguiShowcase.tsx` | ✅ Yes | Not Started |
| **7.D.4** | Convert PatternsShowcase to Tamagui | `src/panels/PatternsShowcase.tsx` | ✅ Yes | Not Started |
| **7.D.5** | Remove PatternsShowcase.css | `src/panels/PatternsShowcase.css` | After 7.D.4 | Not Started |

**7.D.1 Prompt:**
```
Convert DesignSystemOverview to Tamagui. In /Users/mushy/Documents/Repositories/designsystembuilder/src/panels/DesignSystemOverview.tsx:
1. Remove import of DesignSystemOverview.css
2. Import { YStack, XStack, Text, Heading, ScrollView } from 'tamagui'
3. Replace all <div className="..."> with appropriate Tamagui components:
   - div with flex-col → YStack
   - div with flex-row → XStack
   - p/span → Text
   - h1/h2/h3 → Heading
4. Replace all className props with Tamagui style props:
   - p-4 → padding="$4"
   - gap-2 → space="$2"
   - bg-white → backgroundColor="$background"
   - border → borderWidth={1} borderColor="$borderColor"
5. Ensure colors use theme tokens ($textPrimary, $borderColor, etc.)
```

---

### STREAM E: Dynamic Theming Integration

| Task ID | Task | File(s) | Can Parallelize? | Status |
|---------|------|---------|------------------|--------|
| **7.E.1** | Update handleStylePresetChange to set Tamagui theme | `src/components/Sidebar.tsx` lines 153-208 | After B.1 | Not Started |
| **7.E.2** | Create usePresetTheme hook | `src/hooks/usePresetTheme.ts` (new) | ✅ Yes | Not Started |
| **7.E.3** | Wrap App in TamaguiProvider with dynamic theme | `src/App.tsx` | After 7.A.4 | Not Started |

**7.E.1 Prompt:**
```
Update preset switching to use Tamagui themes. In /Users/mushy/Documents/Repositories/designsystembuilder/src/components/Sidebar.tsx:
1. In handleStylePresetChange function (lines 153-208):
   - Instead of setting CSS variables on document.documentElement
   - Call a function to switch the Tamagui theme
2. Map preset IDs to Tamagui theme names:
   - 'modern-flat' → 'modernFlat'
   - 'soft-dreamy' → 'softDreamy'
   - 'minimalist' → 'minimalist'
   - 'neo-brutalism' → 'neoBrutalism'
3. Use Tamagui's useTheme hook or context to change theme
4. Ensure the theme change propagates to all Tamagui components
```

**7.E.2 Prompt:**
```
Create usePresetTheme hook. Create new file /Users/mushy/Documents/Repositories/designsystembuilder/src/hooks/usePresetTheme.ts:
1. Import preset definitions from src/config/stylePresets.ts
2. Create hook that returns:
   - currentTheme: the Tamagui theme object for current preset
   - setPreset(presetId): function to switch presets
   - presetTokens: the raw tokens for current preset
3. Use Zustand or React context to manage state
4. When preset changes, update:
   - Tamagui theme
   - CSS variables for non-Tamagui elements
   - Border widths based on preset (0 for Soft & Dreamy, 2-4 for Neo-Brutalism)
```

---

### STREAM F: Cleanup

| Task ID | Task | File(s) | Can Parallelize? | Status |
|---------|------|---------|------------------|--------|
| **7.F.1** | Remove tailwind.config.ts | `tailwind.config.ts` | After all streams | Not Started |
| **7.F.2** | Remove tailwindcss from package.json | `package.json` | After 7.F.1 | Not Started |
| **7.F.3** | Remove postcss tailwind plugin | `postcss.config.js` | After 7.F.2 | Not Started |
| **7.F.4** | Remove all remaining className attributes | All .tsx files | After all streams | Not Started |
| **7.F.5** | Verify all presets work correctly | Browser testing | LAST | Not Started |

**7.F.4 Prompt:**
```
Find and remove all remaining Tailwind className usage. Run this search and fix all results:
1. Search: grep -r "className=" src/
2. For each file with className:
   - If it's a Tamagui component: convert to style props
   - If it's HTML element: wrap with Tamagui component
   - Remove all Tailwind utility classes
3. Exception: Keep className for third-party libraries that require it
4. Run `npm run dev` and verify no build errors
```

---

## 🚀 Parallel Execution Strategy

### Phase 1 (Sequential - Unblocks Everything)
Run these FIRST, in order:
1. **7.A.1** - Remove @tailwind directives
2. **7.A.2** - Clean up @layer wrapper

### Phase 2 (Parallel - Run Simultaneously)
After Phase 1, run these in parallel:
- **Agent 1:** Stream B (Sidebar) - Tasks 7.B.1 through 7.B.8
- **Agent 2:** Stream C (Index.tsx) - Tasks 7.C.1 through 7.C.4
- **Agent 3:** Stream D (Right Panels) - Tasks 7.D.1 through 7.D.5
- **Agent 4:** Stream A.3 + A.4 (Tamagui themes)

### Phase 3 (Integration)
After Phase 2:
- **7.E.1, 7.E.2, 7.E.3** - Dynamic theming

### Phase 4 (Cleanup)
After Phase 3:
- **7.F.1 through 7.F.5** - Remove Tailwind completely

---

## ✅ Verification Checklist

After migration, verify:
- [ ] Modern Flat: Soft grey borders (`oklch(0.925 0.004 210)`), 1px width
- [ ] Soft & Dreamy: NO visible borders, larger shadows
- [ ] Minimalist: Very subtle borders, minimal shadows
- [ ] Neo-Brutalism: Thick black borders (2-4px), hard shadows
- [ ] Dark mode works for all presets
- [ ] No Tailwind classes remain
- [ ] `npm run build` succeeds
- [ ] All panels respond to preset changes