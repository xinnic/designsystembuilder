# Design System Builder - Task Priority Matrix

> **Last Updated:** 2026-02-22
> **Current Phase:** Phase 1D — Composed B2C Preview Components
> **Critical Path:** ~~Expo Setup~~ → ~~Core Components~~ → ~~Bespoke Components~~ → Composed Components → Builder UI → Skill.md Export → Validation
> **Key Decision:** Full platform rebuild. Builder becomes an Expo universal app with NativeWind + gluestack-ui v2.
> **Scope:** ~75% new code, ~25% preserved logic (Zustand, tokens, color math, presets)

---

## 🤖 Model Assignment Guide

| Model | Use For | Examples |
|-------|---------|---------|
| **Opus** | Architecture, complex components, pattern-setting work, export format design, structural specs | First component (sets CVA pattern), Select/Modal/Tabs, SKILL.md format, builder layout |
| **Sonnet** | Following established patterns, straightforward implementations, porting, config generation, testing | Components after pattern is set, simple wrappers, file generation, copy tasks |

**Rule of thumb:** Opus builds the first of a kind + anything with multiple interaction modes. Sonnet follows the pattern for the rest.

---

## 📊 Strategic Context

### What Gets Preserved vs Rebuilt

| Preserved (~25%) | Rebuilt (~75%) |
|-------------------|----------------|
| `src/state/designSystem.ts` (Zustand store) | All layout components → `View` + NativeWind |
| `src/design-system/tokens/` (OKLCH math) | All Radix UI wrappers → gluestack-ui v2 |
| `src/config/stylePresets.ts` | All Tamagui components → NativeWind + CVA |
| `src/config/colorThemes.ts` | Routing → Expo Router |
| Color generation (culori) | Build system → Expo/Metro |
| Component variant definitions (props, sizes) | Theme provider → NativeWind |
| Font configuration logic | Preview system → WYSIWYG (builder IS preview) |

---

## ✅ COMPLETED PHASES

### Phase 0: Foundation (Vite Web App) ✅
### Phase 0.5: Tamagui Migration ✅ (superseded)

---

## 🔴 PHASE 1: NATIVEWIND + GLUESTACK REBUILD (CURRENT)

### Phase 1A: Project Setup + Token System ✅ 90% COMPLETE

| # | Task | Model | Status | Notes |
|---|------|-------|--------|-------|
| **1A.1** | Create Expo project | — | ✅ Done | Expo SDK 54, TypeScript, `expo-app/` subdirectory |
| **1A.2** | Install + configure NativeWind | — | ✅ Done | v4, tailwind.config.js, babel, metro, global.css |
| **1A.3** | Install gluestack-ui v2 | Sonnet | ⏳ Deferred | v2 is copy-paste (like shadcn). Do when building 1B components |
| **1A.4** | Install core dependencies | — | ✅ Done | Zustand, culori, CVA, clsx, Expo Router, Reanimated, SVG |
| **1A.5** | Port Zustand store | — | ✅ Done | `designSystem.ts` copied |
| **1A.6** | Port token system | — | ✅ Done | `design-system/tokens/` copied (primitives, semantic, platform, factories) |
| **1A.7** | Port config files | — | ✅ Done | stylePresets, colorThemes, builderLayout |
| **1A.8** | Create tailwind.config.js | — | ✅ Done | Token-based theme with CSS var references |
| **1A.9** | Create global.css | — | ✅ Done | OKLCH defaults + dark mode |
| **1A.10** | Create useTokenSystem hook | — | ✅ Done | Bridges Zustand → CSS vars for NativeWind |
| **1A.11** | Verify iOS/Android | Sonnet | ⬜ Not Started | Requires simulator/emulator. Web verified ✅ |

---

### Phase 1B: Core Design System Components ✅ **COMPLETE**

Rebuild each component using RN primitives + NativeWind `className` + CVA.

**Opus set the pattern with Button, Input, Select, Tabs, Dialog. Sonnet followed for the remaining 9 components.**

| # | Component | Model | Structural Specs | Variants | Status | Notes |
|---|-----------|-------|------------------|----------|--------|-------|
| **1B.1** | Button | **Opus** | ✅ Pattern-setter | primary, secondary, tertiary, destructive, ghost, outline × sm, md, lg | ✅ | CVA + active:scale press feedback |
| **1B.2** | Card | Sonnet | ✅ Slots pattern | elevated, outlined, ghost × padding variants | ✅ | header/children/footer slots, dividers |
| **1B.3** | Text | Sonnet | ✅ Presets | heading, body, caption, label × xs-3xl sizes | ✅ | Heading/Body/Caption/Label convenience exports |
| **1B.4** | Input | **Opus** | ✅ Multi-element | default, error, filled × sm, md, lg | ✅ | label, helperText, error, leading/trailing icons |
| **1B.5** | Stack | Sonnet | ✅ Layout utils | HStack, VStack, Spacer, Divider | ✅ | gap, align, justify, wrap variants |
| **1B.6** | Switch | Sonnet | ✅ Form control | on/off, disabled, label positions | ✅ | RN Switch + label, helperText |
| **1B.7** | Checkbox | Sonnet | ✅ Tri-state | checked, unchecked, indeterminate, disabled | ✅ | Custom checkmark + indeterminate icons |
| **1B.8** | Select | **Opus** | ✅ Platform-aware | web dropdown, native bottom sheet | ✅ | measureInWindow positioning, FlatList options |
| **1B.9** | Tabs | **Opus** | ✅ Animated | underline, pill, segmented | ✅ | accessibilityRole="tablist", fullWidth, scrollable |
| **1B.10** | Dialog/Modal | **Opus** | ✅ 3 modes | default, fullscreen, bottom-sheet | ✅ | KeyboardAvoidingView, ScrollView content |
| **1B.11** | Avatar | Sonnet | ✅ Fallback | xs-2xl, status indicators | ✅ | Image + initials fallback, AvatarGroup component |
| **1B.12** | Progress | Sonnet | ✅ Determinate/indeterminate | linear bar, circular (placeholder) | ✅ | brand/success/warning/error colors |
| **1B.13** | ListItem | Sonnet | ✅ Slots | leading, title, subtitle, trailing | ✅ | List container with auto-dividers |
| **1B.14** | Image | Sonnet | ✅ Loading states | cover/contain/fill, aspect ratios | ✅ | loading spinner, error fallback |

**Build Results:**
- 14 components built (5 Opus pattern-setters + 9 Sonnet pattern-followers)
- All components export CVA variants for spec generation
- Comprehensive showcase page at `expo-app/app/index.tsx`
- Build verified: 722 modules, 1.08 MB web bundle
- All components include structural spec comments for Skill.md generation

**Recommended build order:**
1. **Button (Opus)** — Sets the CVA + NativeWind + structural spec pattern for everything
2. **Text + Stack (Sonnet)** — Foundational, needed by all other components
3. **Card (Sonnet)** — Uses Text + Stack, validates composition
4. **Input (Opus)** — Complex: error states, labels, icons, multiple sub-elements
5. **Switch + Checkbox (Sonnet)** — First gluestack headless integration, follows pattern
6. **Select (Opus)** — Complex: dropdown on web, actionsheet on mobile
7. **Tabs (Opus)** — Animated indicator, multiple layout modes
8. **Dialog/Modal (Opus)** — Bottom sheet, fullscreen, backdrop
9. **ListItem + Avatar + Progress + Image (Sonnet)** — Batch the simple ones

**Component Convention (set by 1B.1):**

```tsx
// Pattern: NativeWind + CVA + structural specs
// - CVA for className-based variants
// - cn() for className merging
// - Structural spec comments at top of file
// - accessibilityRole on interactive elements
// - active:scale-[0.97] on pressables
// - Token classes only (no hardcoded colors/sizes)
// - dark: prefix for dark mode
```

**Each component is complete when:**
- [ ] Uses only `className` (no inline styles for layout/color)
- [ ] Has all documented variants via CVA
- [ ] References tokens (no hardcoded colors, sizes, spacing)
- [ ] Includes accessibility props
- [ ] Has pressStyle/active state (interactive components)
- [ ] Has TypeScript types
- [ ] Renders on iOS, Android, Web
- [ ] Dark mode works via `dark:` classes
- [ ] Structural spec documented (interaction rules, required props, nesting)

---

### Phase 1C: Bespoke Mobile Components ✅ **COMPLETE**

Mobile-specific UI components (modals, notifications, overlays). All Sonnet since patterns established.

| # | Component | Model | Description | Status | Notes |
|---|-----------|-------|-------------|--------|-------|
| **1C.1** | BottomSheet | Sonnet | Modal sliding up from bottom, snap points, handle bar | ✅ | KeyboardAvoidingView, auto/half/full snap points |
| **1C.2** | Chip | Sonnet | Compact pill tags, deletable, pressable | ✅ | filled/outlined/light × default/brand/success/warning/error |
| **1C.3** | Badge | Sonnet | Notification indicators (dot/numeric/icon) | ✅ | Overlay positioning, BadgeWrapper helper, bordered variant |
| **1C.4** | Toast | Sonnet | Temporary notifications, auto-dismiss | ✅ | ToastManager for stacking, ToastIcons presets, positions |
| **1C.5** | ActionSheet | Sonnet | Native action menu (iOS/Android pattern) | ✅ | Destructive actions, dividers, cancel button |

**Build Results:**
- 5 bespoke components built following established CVA + NativeWind pattern
- All components include structural specs for Skill.md generation
- Showcase page updated with interactive demos
- Build verified: 704 modules, 1.1 MB web bundle, 22.6 kB CSS

**Total Component Count:** 19 components (14 core + 5 bespoke)

---

### Phase 1D: Composed B2C Preview Components ⬜ **DO NEXT**

These compose core components into real B2C app screens. Sonnet handles most since patterns are established.

| # | Component | Model | Description | Status | Effort |
|---|-----------|-------|-------------|--------|--------|
| **1D.1** | AppBar | Sonnet | Top nav: logo, title, search, notifications | ⬜ | 3h |
| **1D.2** | BottomNav | **Opus** | Tab bar: platform-specific, badges, active animation | ⬜ | 3h |
| **1D.3** | CategoryPills | Sonnet | Horizontal scrollable filter chips | ⬜ | 2h |
| **1D.4** | FeedCard / HeroCard | Sonnet | Content card: image, title, meta, actions | ⬜ | 3h |
| **1D.5** | ProfileCard | Sonnet | User profile: avatar, stats, bio | ⬜ | 2h |
| **1D.6** | ReviewCard | Sonnet | Star rating + review text | ⬜ | 2h |
| **1D.7** | SettingsGroup | Sonnet | Grouped settings list items | ⬜ | 2h |
| **1D.8** | StatsCard | Sonnet | Metric display with icon | ⬜ | 1h |
| **1D.9** | UserCard | Sonnet | User info (horizontal + vertical layouts) | ⬜ | 3h |

---

### Phase 1E: Builder UI 🔵 **DO FOURTH**

The builder interface — where users customize their design system.

| # | Task | Model | Description | Status | Effort |
|---|------|-------|-------------|--------|--------|
| **1E.1** | Expo Router layout | **Opus** | 3-panel app shell: sidebar + preview + code | ⬜ | 4h |
| **1E.2** | Sidebar / Controls panel | **Opus** | Color pickers, font selectors, spacing, presets | ⬜ | 8h |
| **1E.3** | Preview panel | Sonnet | WYSIWYG rendering of bespoke components | ⬜ | 4h |
| **1E.4** | Code preview panel | Sonnet | NativeWind code snippets for current component | ⬜ | 4h |
| **1E.5** | Style preset selector | Sonnet | Grid of visual preset thumbnails | ⬜ | 3h |
| **1E.6** | Color theme selector | **Opus** | Swatches + custom color picker (cross-platform) | ⬜ | 4h |
| **1E.7** | Font pair selector | Sonnet | Primary + Display font with live preview | ⬜ | 3h |
| **1E.8** | Dark mode toggle | Sonnet | Light/dark switch | ⬜ | 1h |
| **1E.9** | Export dialog | **Opus** | Folder structure preview, ZIP download, clipboard | ⬜ | 4h |
| **1E.10** | Accordion/collapsible | Sonnet | Expandable sections (gluestack Accordion) | ⬜ | 2h |

**Radix → gluestack mapping:**

| Radix UI (old) | gluestack-ui v2 (new) | Used in |
|----------------|----------------------|---------|
| Accordion | gluestack Accordion | 1D.10 |
| Dialog | gluestack Modal | 1D.9 |
| Popover | gluestack Popover | 1D.6 |
| Select | gluestack Select / Actionsheet | 1D.2 |
| Switch | gluestack Switch | 1D.8 |
| Tabs | Custom NativeWind tabs | 1D.1 |
| Toast | gluestack Toast | — |

---

### Phase 1F: Skill.md Export System 🔵 **DO FIFTH**

| # | Task | Model | Description | Status | Effort |
|---|------|-------|-------------|--------|--------|
| **1F.1** | SKILL.md generator | **Opus** | Structured SKILL.md with YAML frontmatter — defines the export format | ⬜ | 4h |
| **1F.2** | tailwind.config.js generator | Sonnet | Generate complete Tailwind config from tokens | ⬜ | 3h |
| **1F.3** | global.css generator | Sonnet | Generate CSS custom properties (light + dark) | ⬜ | 2h |
| **1F.4** | tokens.json generator | Sonnet | DTCG format machine-readable tokens | ⬜ | 2h |
| **1F.5** | Component spec generator | **Opus** | Structural rules: interaction, props, accessibility, nesting, animation | ⬜ | 6h |
| **1F.6** | rules.md generator | Sonnet | Design system do's/don'ts, token enforcement | ⬜ | 2h |
| **1F.7** | ZIP download | Sonnet | Package design-system/ folder as ZIP | ⬜ | 3h |
| **1F.8** | Clipboard copy | Sonnet | Copy SKILL.md to clipboard | ⬜ | 1h |

---

### Phase 1G: Validation & QA 🔵 **DO SIXTH**

| # | Task | Model | Description | Status | Effort |
|---|------|-------|-------------|--------|--------|
| **1G.1** | Cross-platform visual test | Sonnet | Verify all components on iOS, Android, Web | ⬜ | 4h |
| **1G.2** | Token propagation test | Sonnet | Change every token type, verify updates | ⬜ | 3h |
| **1G.3** | Style preset test | Sonnet | Verify all 4 presets render correctly | ⬜ | 2h |
| **1G.4** | Dark mode test | Sonnet | Verify dark mode on all platforms | ⬜ | 2h |
| **1F.5** | SKILL.md validation | **Opus** | Feed to Claude Code, verify output quality | ⬜ | 4h |
| **1F.6** | Component spec validation | **Opus** | Verify structural specs are accurate/complete | ⬜ | 2h |
| **1F.7** | Performance test | Sonnet | Verify no lag/jank on token changes | ⬜ | 2h |
| **1F.8** | Cleanup old Vite app | Sonnet | Remove/archive old codebase | ⬜ | 2h |

---

## 🟠 PHASE 2: B2C COMPONENTS + USE-CASE PRESETS + FIGMA EXPORT

### CATEGORY 6: B2C Hero Components

| # | Component | Model | Description | Status | Effort |
|---|-----------|-------|-------------|--------|--------|
| **6.1** | FeedCard (enhanced) | **Opus** | Multiple layouts, action slots, image handling | ⬜ | 6h |
| **6.2** | TabBar (enhanced) | **Opus** | Platform-specific, badges, active animation | ⬜ | 6h |
| **6.3** | NavHeader (enhanced) | Sonnet | Transparent/blur modes, logo/avatar slots | ⬜ | 4h |
| **6.4** | DrawerMenu | **Opus** | Section headers, nested menus, user profile area | ⬜ | 6h |
| **6.5** | SegmentedControl | Sonnet | Sliding indicator, icon support | ⬜ | 4h |
| **6.6** | SearchBar | Sonnet | Filter chips, recent searches, animated expand | ⬜ | 4h |

### CATEGORY 7: Use-Case Presets

| # | Preset | Model | Token Overrides | Status | Effort |
|---|--------|-------|----------------|--------|--------|
| **7.1** | Dating App | Sonnet | Warm tones, rounded, photo-forward, card-heavy | ⬜ | 3h |
| **7.2** | Fitness App | Sonnet | Dark default, high contrast, energetic, bold type | ⬜ | 3h |
| **7.3** | E-commerce | Sonnet | Clean white, trust blues, product cards, subtle shadows | ⬜ | 3h |
| **7.4** | Social App | Sonnet | Playful colors, engaging animations, content-first | ⬜ | 3h |

### CATEGORY 8: Figma Token Studio + Responsive Tokens

| # | Task | Model | Status | Effort |
|---|------|-------|--------|--------|
| **8.1** | DTCG JSON export for Figma Token Studio | **Opus** | ⬜ | 4h |
| **8.2** | Compact/regular/expanded responsive token sets | **Opus** | ⬜ | 4h |
| **8.3** | Device size preview switcher | Sonnet | ⬜ | 4h |

---

## 🟡 PHASE 3: MCP SERVER + EXTENDED COMPONENTS

### CATEGORY 9: MCP Server

| # | Task | Model | Status | Effort |
|---|------|-------|--------|--------|
| **9.1** | Design MCP resource schema | **Opus** | ⬜ | 3h |
| **9.2** | Implement MCP server (Node.js) | **Opus** | ⬜ | 6h |
| **9.3** | Token resource provider | Sonnet | ⬜ | 3h |
| **9.4** | Component spec resource provider | Sonnet | ⬜ | 3h |
| **9.5** | Test with Claude Code + Cursor | **Opus** | ⬜ | 4h |

### CATEGORY 10: Extended Components

| Component | Model | Effort |
|-----------|-------|--------|
| Avatar (enhanced) | Sonnet | 3h |
| Badge/Chip | Sonnet | 3h |
| ImageCarousel | **Opus** | 6h |
| EmptyState | Sonnet | 2h |
| RadioGroup | Sonnet | 3h |
| TextArea | Sonnet | 2h |
| Slider | **Opus** | 4h |
| Toast | Sonnet | 3h |
| Alert | Sonnet | 2h |
| Skeleton | Sonnet | 3h |

---

## 🟢 PHASE 4: PLATFORM EXCELLENCE + DISTRIBUTION

| Task | Model | Effort |
|------|-------|--------|
| iOS haptics integration | Sonnet | 3h |
| Android Material You | Sonnet | 3h |
| WCAG AA audit + fixes | **Opus** | 6h |
| Reanimated animations library | **Opus** | 8h |
| `npx design-system-builder init` CLI | **Opus** | 6h |
| NPM package generation | **Opus** | 6h |
| CI/CD templates | Sonnet | 4h |
| Template marketplace | **Opus** | 8h |
| Team collaboration | **Opus** | 8h |

---

## 📈 Progress Tracking

### Overall Progress
- **Phase 0 (Vite Foundation):** 100% ✅
- **Phase 0.5 (Tamagui Migration):** 100% ✅ (superseded)
- **Phase 1 (NativeWind + gluestack Rebuild):** ~15% 🟡
  - 1A Setup + Tokens: 90% ✅ (gluestack + iOS/Android remain)
  - 1B Core Components: 0% ⬜
  - 1C Bespoke Components: 0% ⬜
  - 1D Builder UI: 0% ⬜
  - 1E Skill.md Export: 0% ⬜
  - 1F Validation: 0% ⬜
- **Phase 2 (B2C + Presets + Figma):** 0% ⬜
- **Phase 3 (MCP + Extended):** 0% ⬜
- **Phase 4 (Platform + Distribution):** 0% ⬜

### Model Allocation Summary

| Phase | Opus Tasks | Sonnet Tasks | Total |
|-------|-----------|-------------|-------|
| 1A (Setup) | 0 | 2 remaining | 2 |
| 1B (Core Components) | 5 (Button, Input, Select, Tabs, Modal) | 9 | 14 |
| 1C (Bespoke) | 1 (BottomNav) | 8 | 9 |
| 1D (Builder UI) | 4 (Layout, Sidebar, Color, Export) | 6 | 10 |
| 1E (Export) | 2 (SKILL.md, Specs) | 6 | 8 |
| 1F (Validation) | 2 (SKILL.md + Spec validation) | 6 | 8 |
| **Phase 1 Total** | **14** | **37** | **51** |

---

## 🚀 Sprint Plan

### Sprint 1: ~~Expo Setup~~ + First Components (Now)
**Goal:** Set component pattern with Opus, then batch simple components with Sonnet

- [x] ~~Create Expo project, NativeWind, deps~~ (Done)
- [x] ~~Port Zustand + tokens + configs~~ (Done)
- [x] ~~Wire useTokenSystem~~ (Done)
- [ ] **Opus: Build Button (1B.1)** — sets CVA + structural spec pattern
- [ ] **Sonnet: Text (1B.3) + Stack (1B.5)** — foundational, fast
- [ ] **Sonnet: Card (1B.2) + Image (1B.14)** — simple, follows pattern

### Sprint 2: Complex Components (Opus) + Simple Batch (Sonnet)
- [ ] **Opus: Input (1B.4)** — complex multi-element component
- [ ] **Opus: Select (1B.8)** — dropdown/actionsheet cross-platform
- [ ] **Sonnet: Switch (1B.6) + Checkbox (1B.7)** — gluestack headless + styling
- [ ] **Sonnet: Avatar (1B.11) + Progress (1B.12) + ListItem (1B.13)** — batch

### Sprint 3: Final Components + Bespoke Start
- [ ] **Opus: Tabs (1B.9) + Dialog/Modal (1B.10)** — animation, multiple modes
- [ ] **Sonnet: Bespoke batch** — AppBar, CategoryPills, FeedCard, ProfileCard, ReviewCard, StatsCard, UserCard, SettingsGroup
- [ ] **Opus: BottomNav (1C.2)** — platform-specific navigation

### Sprint 4: Builder UI
- [ ] **Opus: Router layout (1D.1) + Sidebar (1D.2)** — architecture
- [ ] **Opus: Color picker (1D.6) + Export dialog (1D.9)**
- [ ] **Sonnet: Preview (1D.3) + Code (1D.4) + Presets (1D.5) + Fonts (1D.7) + Dark (1D.8) + Accordion (1D.10)**

### Sprint 5: Export + Validation
- [ ] **Opus: SKILL.md format (1E.1) + Component specs (1E.5)**
- [ ] **Sonnet: Config generators (1E.2-1E.4) + rules.md (1E.6) + ZIP (1E.7) + Clipboard (1E.8)**
- [ ] **Opus: SKILL.md validation (1F.5) + Spec validation (1F.6)**
- [ ] **Sonnet: Cross-platform tests (1F.1-1F.4) + Performance (1F.7) + Cleanup (1F.8)**

---

## 🚦 Next Action

**Opus: Build Button component (1B.1)**

This is the pattern-setting task. The Button establishes:
- CVA variant structure convention
- NativeWind className approach
- Structural spec format
- Accessibility patterns
- Dark mode approach
- TypeScript interface pattern

Every subsequent component follows this template.

---

## 🔍 Investigation Items

| Item | Question | When | Model |
|------|----------|------|-------|
| **NativeWind CSS vars on native** | Does `var()` in className work on native, or only web? | Sprint 1 | Opus |
| **gluestack-ui v2 install** | Copy-paste approach — how to set up? | Sprint 2 | Sonnet |
| **Color picker for Expo** | Cross-platform color picker library? | Sprint 4 | Opus |
| **Font loading in Expo** | Dynamically load Google Fonts? `expo-google-fonts`? | Sprint 4 | Sonnet |
| **File download on mobile** | Export ZIP on iOS/Android via share sheet? | Sprint 5 | Sonnet |
| **NativeWind v4 vs v5** | v5 stable? Reanimated CSS animations worth it? | Sprint 1 | Opus |
| **CVA + NativeWind on native** | Confirm className approach works on native, not just web | Sprint 1 | Opus |

---

**Note:** This task list supersedes all previous versions. Phase 0.5 (Tamagui migration) is archived as completed but superseded by the full NativeWind + gluestack rebuild.
