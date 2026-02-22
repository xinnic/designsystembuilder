# Design System Builder - Product Strategy

## 🎯 Vision

**"The first WYSIWYG design system builder that exports production-ready Skill.md + NativeWind configs for cross-platform apps — build visually, export for iOS, Android, and Web."**

### Mission Statement
Empower developers building consumer apps to visually create branded design systems that export as structured Skill.md packages for AI agents and NativeWind configurations for Expo apps. The builder itself runs on Expo + NativeWind + gluestack-ui v2 — the same stack as the export target — achieving true WYSIWYG fidelity.

---

## 🏆 Market Position

### The Problem We Solve
- **B2C apps need strong visual identity** — Generic components = cheap feeling
- **Cross-platform is complex** — Maintaining iOS + Android + Web consistency is hard
- **No visual builders for React Native** — Everything requires manual coding or prompt-based generation
- **AI tools generate generic output** — v0/Lovable/shadcn create generate code but lack curated B2C taste
- **Existing builders are web-only** — Pencil.dev, Subframe, Banani, tweakcn all target web, not native mobile
- **AI agents lack design context** — No standardized way to give AI your design system rules
- **Static megaprompts are brittle** — One-shot text dumps lose structure and become stale

### Our Unique Solution
**Visual builder + Structured Skill.md export + NativeWind cross-platform output**

We're not competing with dashboard tools (they can use MUI/shadcn). We're building for:
- Dating apps that need personality
- Social apps that need branding
- E-commerce apps that need trust
- Fitness apps that need energy

### Competitive Differentiation

| Aspect | v0/Lovable | shadcn create | Pencil.dev | Subframe | tweakcn | **Our Builder** |
|--------|-----------|---------------|------------|----------|---------|-----------------|
| Visual Builder UI | ❌ (prompts) | ❌ (CLI) | ✅ (canvas) | ✅ (canvas) | ✅ (component-level) | ✅ (WYSIWYG app preview) |
| React Native Output | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (NativeWind + Expo) |
| Cross-Platform | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (iOS/Android/Web) |
| Preview = Output | ⚠️ | ❌ | ❌ | ⚠️ | ⚠️ | ✅ (WYSIWYG — same stack) |
| B2C Components | ⚠️ | ❌ | ❌ | ⚠️ | ❌ | ✅ (navigation-first) |
| AI Skill Export | ❌ | ❌ | N/A | ❌ | ❌ | ✅ (SKILL.md + tokens) |
| AI Training Data Alignment | ✅ (Tailwind) | ✅ (Tailwind) | ✅ (Tailwind) | ✅ (Tailwind) | ✅ (Tailwind) | ✅ (NativeWind = Tailwind) |
| Component Spec Depth | ⚠️ (visual only) | ⚠️ (visual only) | ⚠️ (visual only) | ⚠️ (visual only) | ⚠️ (visual only) | ✅ (structural rules + interaction specs) |
| Figma Token Integration | ❌ | ❌ | ❌ | ⚠️ | ❌ | ✅ (DTCG JSON export) |
| Local Dev Integration | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (live config updates) |

**Our Moat:** The only tool that combines a visual design system builder with structured AI export (SKILL.md) targeting cross-platform NativeWind/Expo apps. NativeWind uses the same Tailwind utility classes that AI models are trained on — so our export is natively consumable by AI agents. Our component specs include structural interaction rules — not just visual properties — making the difference between a theme and a true design system.

### Why NativeWind + gluestack — Strategic Decision Table

| Factor | Tamagui | NativeWind + gluestack | Winner |
|--------|---------|------------------------|--------|
| AI training data | Limited (proprietary API) | ✅ Tailwind is everywhere in training data | NativeWind |
| Developer familiarity | Niche (~3K GitHub stars) | ✅ Tailwind is the #1 CSS framework | NativeWind |
| Ecosystem momentum | Declining (maintainer capacity) | ✅ Growing (backed by Expo team interest) | NativeWind |
| Component library | Limited, must build from scratch | ✅ gluestack-ui v2 (accessible, NativeWind-native) | NativeWind |
| Cross-platform support | ✅ Good (native + web) | ✅ Good (native + web via Expo) | Tie |
| CVA compatibility | ❌ Requires styled() wrapper | ✅ Native CVA + className support | NativeWind |
| Market positioning | Commoditized | ✅ Underserved (no visual builders) | NativeWind |
| WYSIWYG fidelity | Builder ≠ Export target | ✅ Builder = Export target (same stack) | NativeWind |

**Decision:** Full migration to NativeWind + gluestack-ui v2. Builder and export use the same stack.

---

## 👥 Target Users

### Primary Persona: "The Indie App Developer"
- Building a consumer mobile app (social, dating, fitness, e-commerce)
- Wants to launch on iOS + Android + Web simultaneously
- Needs professional design without a designer
- Already knows Tailwind CSS from web work
- Uses Claude Code / Cursor for development
- **Pain:** Every app looks the same with default components
- **Gain:** Unique visual identity in minutes, familiar DX, true cross-platform

### Secondary Persona: "The Startup Technical Co-founder"
- Building MVP for B2C startup
- Needs to move fast but look professional on all platforms
- Will use AI tools extensively
- **Pain:** No time to build design system from scratch, can't afford separate iOS/Android/Web
- **Gain:** Production-ready cross-platform design system on day 1, AI-ready exports

### Tertiary Persona: "The Agency Developer"
- Building multiple client apps across platforms
- Needs quick brandable starting points
- Values reusability and customization
- **Pain:** Recreating design systems for each client and platform
- **Gain:** New branded cross-platform system per client in minutes

---

## 🏗️ Technical Architecture

### Platform: Full NativeWind + gluestack Stack

The builder IS an Expo + NativeWind + gluestack-ui app. What you see in the builder is exactly what gets exported. True WYSIWYG.

```
┌────────────────────────────────────────────┐
│          Design System Builder             │
│      (Expo + NativeWind + gluestack)       │
│                                            │
│  ┌──────────┐  ┌────────────┐  ┌────────┐ │
│  │ Controls │  │  Preview   │  │ Export  │ │
│  │(gluestack│  │ (NativeWind│  │ Layer   │ │
│  │  + NW)   │→ │  + glue-   │→ │         │ │
│  │ Colors   │  │  stack)    │  │ Skill   │ │
│  │ Fonts    │  │ WYSIWYG    │  │ Config  │ │
│  │ Spacing  │  │ preview    │  │ Comps   │ │
│  │ Presets  │  │            │  │ Rules   │ │
│  └──────────┘  └────────────┘  └────────┘ │
│                                            │
│  Runs on: iOS, Android, Web (Expo)         │
└────────────────────────────────────────────┘
          │
          ▼ Export generates:
┌────────────────────────────────────────────┐
│         design-system/ folder              │
│                                            │
│  ├── SKILL.md          (AI agent entry)    │
│  ├── tokens.json       (DTCG format)       │
│  ├── tailwind.config.js (NativeWind theme) │
│  ├── global.css        (CSS custom props)  │
│  ├── components/       (NativeWind + CVA)  │
│  │   ├── Button.tsx                        │
│  │   ├── Card.tsx                          │
│  │   ├── Input.tsx                         │
│  │   └── ...                               │
│  └── rules.md          (do's and don'ts)   │
│                                            │
│  Consumed by:                              │
│  • User's Expo app (drop-in folder)        │
│  • AI agents (Claude Code, Cursor)         │
│  • MCP server (live token queries)         │
└────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Runtime** | Expo + Expo Router | Universal iOS/Android/Web from one codebase |
| **Styling** | NativeWind v4+ | Tailwind CSS for React Native — AI training data alignment |
| **Component Library** | gluestack-ui v2 | Accessible, NativeWind-native headless components |
| **State** | Zustand | Framework-agnostic, all state logic preserved from previous builder |
| **Color Math** | culori | OKLCH color space manipulation |
| **Variants** | CVA (class-variance-authority) | Component variant management with NativeWind className |
| **Token Format** | DTCG (tokens.json) | Machine-readable, standardized |

### What Gets Preserved (~25%)
- **Zustand stores** (`src/state/designSystem.ts`) — all state logic
- **Token system** (`src/design-system/tokens/`) — OKLCH math, primitives, semantics, factories
- **Color generation** (culori-based `generateBrandPalette`)
- **Style preset configs** (`src/config/stylePresets.ts`, `colorThemes.ts`)
- **Font configurations** and selection logic
- **Component variant definitions** (prop interfaces, variant names, size scales)

### What Gets Rebuilt (~75%)
- All layout → React Native `View` + NativeWind `className`
- All Tamagui components → gluestack-ui v2 + NativeWind
- All Radix UI headless → gluestack equivalents
- Routing → Expo Router (file-based)
- Build system → Expo/Metro
- Theme provider → NativeWind
- Preview system → WYSIWYG (builder IS the preview)

### Token System Architecture (Preserved → Mapped to NativeWind)

The 3-tier OKLCH token system stays. It maps to NativeWind output:

```
Tier 1: Primitive Tokens (raw values)
  └── OKLCH color scales, spacing px values, font sizes
  └── Exports to: CSS custom properties in global.css

Tier 2: Semantic Tokens (theme-aware)
  └── surface, text, border, primary, etc. with light/dark values
  └── Exports to: tailwind.config.js theme extension + dark: prefix

Tier 3: Component Tokens (overrides)
  └── button-padding, card-radius, input-border-width
  └── Exports to: CVA variant definitions in component templates
```

### Skill.md Export Structure

The export replaces the static megaprompt with a structured folder:

```
design-system/
├── SKILL.md                    # Entry point for AI agents
│   ├── YAML frontmatter        # name, description, version
│   ├── Overview                # Design philosophy, aesthetic
│   ├── Token reference         # Points to tokens.json
│   ├── Component catalog       # Points to components/
│   └── Rules summary           # Key do's and don'ts
│
├── tokens.json                 # Machine-readable DTCG format
│   ├── colors (primitives)     # Full OKLCH palette
│   ├── colors (semantic)       # surface, text, border, brand
│   ├── spacing                 # 4px grid scale
│   ├── typography              # font families, sizes, weights
│   ├── radii                   # sm, md, lg, full
│   └── shadows                 # elevation scale
│
├── tailwind.config.js          # Drop-in NativeWind config
│   └── theme.extend            # All tokens as Tailwind theme
│
├── global.css                  # CSS custom properties
│   ├── :root                   # Light mode variables
│   └── .dark                   # Dark mode variables
│
├── components/                 # NativeWind + CVA templates
│   ├── Button.tsx              # Pressable + className + CVA
│   ├── Card.tsx                # View + className + CVA
│   ├── Input.tsx               # TextInput + className + CVA
│   ├── Text.tsx                # Text + className + CVA
│   └── ...                     # All component templates
│
└── rules.md                    # Design system constraints
    ├── Spacing rules            # Always use token scale
    ├── Color rules              # Never use raw hex
    ├── Typography rules         # Font pairing constraints
    ├── Component rules          # Structural interaction specs
    └── Dark mode rules          # Ensure all surfaces defined
```

### Component Specification Depth

Exported component specs include **structural rules**, not just visual properties. This is the difference between a theme and a true design system:

- **Interaction rules**: "Buttons MUST use pressStyle with scale(0.97), MUST have active opacity feedback"
- **Required props**: "Button MUST expose `icon`, `loading`, and `disabled` boolean props"
- **Accessibility**: "Focus ring MUST have 2px offset from element boundary, MUST use accessibilityRole"
- **Auto Layout / Flex rules**: "Card children MUST be vertically stacked, content MUST be padded by token spacing scale"
- **Nesting patterns**: "ListItem MUST accept leading (icon/avatar) and trailing (chevron/switch) slots"
- **Animation constraints**: "pressStyle MUST use scale(0.97), transitions MUST use 150ms ease-out"

---

## 🚀 Product Roadmap

### ✅ Phase 0: Foundation (COMPLETE — Original Vite App)
- [x] Visual builder with live preview
- [x] Core component library (Button, Card, Input, etc.)
- [x] Factory pattern (87% code reduction)
- [x] CSS variable bridge (useTokenSystem hook)
- [x] Basic megaprompt export
- [x] Style Presets (Modern Flat, Elegant, Playful, etc.)
- [x] Dark mode toggle
- [x] Font selection (Primary + Display fonts)
- [x] Color theme selection with custom color picker
- [x] 3-tier OKLCH token system (Primitive → Semantic → Component)

### ✅ Phase 0.5: Tamagui Migration (COMPLETE — Now Superseded)
- [x] All builder UI migrated from Tailwind to Tamagui
- [x] Live preview uses Tamagui-styled components
- [x] Token system bridges to Tamagui theme
- [x] Style presets apply correctly through Tamagui

### 🔴 Phase 1: NativeWind + gluestack Rebuild (CURRENT)
**Goal:** Rebuild the entire builder as an Expo + NativeWind + gluestack-ui v2 app. True WYSIWYG — the builder runs on the same stack as the export target.

**Why a full rebuild (not export-only):**
- Builder and export use the same stack = true WYSIWYG fidelity
- gluestack-ui v2 provides accessible headless components (replaces Radix UI)
- NativeWind className works identically in builder and exported code
- Expo Router enables the builder to run on iOS/Android/Web
- Eliminates Tamagui dependency entirely

**Sub-phases:**
1. **1A: Project Setup + Token System** — Create Expo project, install NativeWind + gluestack, port Zustand/tokens
2. **1B: Core Components** — Rebuild all design-system components with NativeWind + CVA + structural specs
3. **1C: Bespoke B2C Preview Components** — App preview components (AppBar, BottomNav, FeedCard, etc.)
4. **1D: Builder UI** — Rebuild the builder interface (controls, panels, layout)
5. **1E: Skill.md Export System** — Structured folder export replacing megaprompt
6. **1F: Validation** — Cross-platform testing, Skill.md validation with Claude Code

**Success Criteria:**
- Expo app runs on iOS, Android, Web
- All components use NativeWind className + CVA (no Tamagui)
- gluestack-ui headless components replace all Radix UI usage
- Export produces complete `design-system/` folder with SKILL.md
- Exported tailwind.config.js works in a fresh Expo + NativeWind project
- Component specs include structural rules (interaction, props, accessibility)
- Claude Code can consume SKILL.md and generate consistent new components
- All style presets export correctly
- Dark mode configuration exports correctly

### 🟠 Phase 2: B2C Components + Use-Case Presets + Figma Export
**Goal:** Ship 6 essential B2C component templates, use-case presets, Figma Token Studio integration, and responsive tokens

**B2C Components:** FeedCard (enhanced), TabBar (enhanced), NavHeader (enhanced), DrawerMenu, SegmentedControl, SearchBar

**Use-Case Presets (layer on top of aesthetic presets):**
- 🩷 **Dating App** — Warm tones, rounded corners, photo-forward, card-heavy layouts
- 💪 **Fitness App** — Dark default, high contrast, energetic feel, bold typography
- 🛍️ **E-commerce** — Clean white, trust blues, product cards, subtle shadows
- 💬 **Social App** — Playful colors, engaging animations, content-first design

**Figma Token Studio Export:**
- Export tokens in DTCG JSON format compatible with Figma Token Studio
- Bridge between our builder and the design-to-code workflow
- Makes the builder useful for design/dev handoff, not just dev-only

**Responsive Token Layer:**
- Compact (phone) / Regular (tablet) / Expanded (web) token sets
- Device size preview switcher in builder

### 🟡 Phase 3: MCP Server + Extended Components
**Goal:** Live AI agent integration + expanded component library

**MCP Server:**
- Expose design tokens via MCP protocol for live AI queries
- AI agents can query component specs, rules, and constraints
- Works with Claude Code and Cursor
- Real-time token updates (not static export)

**Extended Components:**
- Avatar (enhanced), Badge/Chip, ImageCarousel, EmptyState
- RadioGroup, TextArea, Slider, Toast, Alert, Skeleton

### 🟢 Phase 4: Platform Excellence + Distribution
**Goal:** Best-in-class platform support and growth

- Local dev integration (`npx design-system-builder init`)
- NPM package generation (user's design system as installable package)
- Template marketplace
- CI/CD templates for Expo apps
- Team collaboration

---

## 🎨 Design Philosophy

### Core Principles

1. **WYSIWYG Fidelity** — Builder runs on the same stack as the export (NativeWind + gluestack)
2. **B2C First** — Navigation and content over forms and tables
3. **AI-Native Export** — Output is structured for AI agent consumption (SKILL.md)
4. **Cross-Platform** — Everything works on iOS, Android, and Web
5. **Token Purity** — No hardcoded values ever, everything flows from tokens
6. **Instant Gratification** — See changes immediately in the builder preview
7. **Structural Depth** — Component specs include interaction rules, required props, accessibility, and nesting patterns — not just visual properties

### Information Architecture

| Tab | Contains | User Question Answered |
|-----|----------|------------------------|
| **Atoms** | Typography, Colors, Spacing, Radii, Shadows, Motion | "What are my design values?" |
| **Components** | Buttons, Cards, Inputs, Tabs, etc. | "What UI pieces can I use?" |
| **Patterns** | Headers, Navigation, Form Layouts, Card Grids | "How do I compose them together?" |
| **Export** | SKILL.md, Config files, Component code, Rules | "How do I use this in my app?" |

### Component Priorities

**Tier 1: Navigation & Content (Phase 1 Export)**
- Core: Button, Card, Input, Text, Stack, Switch, Checkbox, Tabs
- Navigation: TabBar, NavHeader, Drawer (Phase 2)
- Content: FeedCard, SearchBar, SegmentedControl (Phase 2)

**Tier 2: User & Interaction (Phase 3)**
- User: Avatar, Badge, Profile
- Display: ListItem, Carousel, EmptyState
- Forms: RadioGroup, TextArea, Slider

**Tier 3: Advanced (Phase 4)**
- DataTable, DatePicker, Stepper, Toast

---

## 💰 Business Model (Future)

### Monetization Strategy

**Free Tier:**
- Builder app (web)
- 10 component templates
- Skill.md export
- Community presets

**Pro ($19/month or one-time $99):**
- All 30+ component templates
- Use-case presets (Dating, Fitness, E-commerce, Social)
- Responsive token layer
- Figma Token Studio export (DTCG JSON)
- MCP server config
- Priority support

**Team ($99/month):**
- Shared design systems
- Version control
- NPM package generation
- Local dev integration
- SSO

---

## 📈 Go-to-Market Strategy

### Positioning Statement
**"Design visually. Export for NativeWind. Ship on every platform."**

### Launch Strategy
1. **Soft Launch** — Twitter/X, Dev.to, Reddit r/reactnative
2. **Demo Content** — "Instagram UI in 5 minutes with our builder + Claude Code"
3. **Product Hunt** — Target top 5 of day
4. **Skill.md Standard** — Propose as open format for AI-consumable design systems

### Content Marketing
1. "Building a TikTok Clone Design System in 5 Minutes"
2. "Why OKLCH is Superior for Design Systems"
3. "How to Use Skill.md to Make AI Agents Follow Your Design System"
4. "NativeWind + CVA: The Perfect Cross-Platform Component Pattern"
5. "From Visual Builder to Production App — The SKILL.md Workflow"

---

## 🎯 Success Metrics

### Phase 1 Complete When:
- [ ] Expo app runs on iOS, Android, Web
- [ ] All core components work with NativeWind + gluestack
- [ ] Export produces structured `design-system/` folder
- [ ] tailwind.config.js works in fresh Expo + NativeWind project
- [ ] Component templates include structural specs
- [ ] SKILL.md is consumable by Claude Code
- [ ] All style presets export correctly
- [ ] Dark mode exports correctly

### 6-Month Goals
- [ ] 5,000 users
- [ ] 500 GitHub stars
- [ ] 100 Pro subscribers
- [ ] Featured in React Native newsletter
- [ ] 10 community-submitted presets

---

## 🚫 What We're NOT Building (Right Now)

- ❌ Web-only tool (export targets cross-platform NativeWind)
- ❌ Figma competitor (we're code-first, not canvas-first)
- ❌ No-code platform (developers are our audience)
- ❌ Dashboard/admin builder (B2C consumer apps only)
- ❌ Component-level theme editor (app-level visual preview)

---

## 💡 Key Insights

1. **NativeWind = Tailwind for RN** — AI training data, developer familiarity, ecosystem momentum
2. **gluestack-ui = accessible headless for RN** — Replaces Radix UI, NativeWind-native, maintained
3. **SKILL.md > Megaprompt** — Structured folder with machine-readable tokens + component templates >> static text dump
4. **Same stack = true WYSIWYG** — Builder on NativeWind + gluestack means what you see is exactly what exports
5. **B2C focus is the niche** — Navigation-first, not forms-first
6. **AI agents need structure** — JSON tokens + component templates + rules = better AI output than prose
7. **Component specs need structural depth** — Visual properties alone make a theme. Structural rules (interaction patterns, required props, accessibility, nesting) make a design system
8. **Figma Token Studio bridges the designer gap** — DTCG JSON export opens the design-to-code workflow

## 🔍 Competitive Monitoring

| Competitor | Watch For | Why | Status |
|---|---|---|---|
| **Pencil.dev** | React Native support, AI features | Direct threat if they add RN export | Web-only, no RN plans visible |
| **React Native Reusables** | Visual builder, export features | OSS NativeWind components, could add builder | Components only, no builder |
| **gluestack v2** | Visual builder features, NativeWind adoption | Could add builder on NativeWind components | Components only |
| **shadcn create** | RN target support, Skill/AI export | Redefines market if they extend to RN | Web-only, massive ecosystem |
| **Subframe** | AI export, RN support | Visual builder with code export | Web-only, no AI export |
| **tweakcn** | Mobile support, app-level preview | Closest web analogy to our builder | Web-only, component-level only |

---

**Last Updated:** 2026-02-19
**Strategy Version:** 3.0
**Status:** Phase 1 — NativeWind + gluestack Rebuild
**Next Review:** Post-Phase 1B Completion
