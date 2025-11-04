# Design System Builder - Development Tasks (B2C Focus)

> **See [product-plan.md](./product-plan.md) for complete product strategy and [architecture.md](../architecture/architecture.md) for technical architecture.**

## 📚 Essential Documentation
- **[TOKEN_IMPLEMENTATION.md](../architecture/TOKEN_IMPLEMENTATION.md)** - Exact token values and implementation details
- **[architecture.md](../architecture/architecture.md)** - Token system design and component architecture
- **[product-plan.md](./product-plan.md)** - Strategic vision and roadmap

## 🎯 Current Status - Phase 1: B2C Component MVP

- ✅ 34 Tamagui components built (good foundation)
- ✅ Factory pattern achieving 87% code reduction
- ✅ CSS variable bridge working
- ✅ Live preview with phone mock
- ⚠️ **CRITICAL:** Need to prioritize B2C navigation & content components
- ⚠️ **CRITICAL:** Megaprompt must be comprehensive for CLI generation
- 🎯 **GOAL:** Ship megaprompt-based MVP in 2-4 weeks

---

## 🔴 Phase 1: B2C Component MVP (THIS SPRINT - Weeks 1-2)

**Timeline:** 10-14 days | **Focus:** Navigation & Content Components

### Day 1-2: FeedCard Component ⚡
**Status:** 🚨 URGENT | **Time:** 2 days | **Complexity:** High

**Why First:** Hero component that showcases visual customization best

**📚 Required Reading:**
- **[TOKEN_IMPLEMENTATION.md](../architecture/TOKEN_IMPLEMENTATION.md#feedcard)** - Exact token values for FeedCard
- **[architecture.md](../architecture/architecture.md#component-architecture)** - Component structure patterns

**Token Dependencies:** See `TOKEN_IMPLEMENTATION.md#feedcard` for exact values:
```typescript
{
  card: {
    padding: 16,           // spacing[3]
    radius: 12,           // radius.lg
    imageAspectRatio: 1.5, // 3:2 default
    shadowOpacity: 0.08,
    shadowRadius: 12,
    borderWidth: 0, // or 1 for outlined variant
  },
  content: {
    titleSize: 18,
    titleWeight: '600',
    descriptionSize: 14,
    metaSize: 12,
    lineHeight: 1.5,
  }
}
```

**Component Structure:**
```typescript
FeedCard = {
  container: styled(YStack),
  image: Image component with aspect ratio,
  content: YStack with padding,
  title: Text with semantic sizing,
  description: Text with secondary color,
  meta: Text with muted color (author, date),
  actions: XStack for buttons/icons
}
```

**Acceptance Criteria:**
- [ ] Supports image + content layout
- [ ] 3 variants: default, outlined, elevated
- [ ] Responsive to theme changes
- [ ] Proper shadows and borders
- [ ] Actions slot for buttons/icons

---

### Day 3-4: TabBar & NavHeader Components ⚡
**Status:** 🚨 URGENT | **Time:** 2 days | **Complexity:** High

**TabBar Tokens:**
```typescript
{
  tabBar: {
    height: 56, // iOS standard
    iconSize: 24,
    labelSize: 10,
    activeScale: 1.1,
    inactiveOpacity: 0.6,
    indicatorHeight: 2,
  }
}
```

**TabBar Variants:**
- `floating` - Elevated with margins
- `attached` - Full width bottom
- `labeled` - Icons + labels
- `icons-only` - Just icons

**NavHeader Variants:**
- `solid` - Opaque background
- `transparent` - Blur background
- `minimal` - Just logo/title

**Acceptance Criteria:**
- [ ] Platform-specific styling (iOS/Android)
- [ ] Active state animations
- [ ] Badge support for notifications
- [ ] Logo/avatar support in header

---

### Day 5-6: DrawerMenu & SegmentedControl ⚡
**Status:** 🚨 URGENT | **Time:** 2 days | **Complexity:** Medium

**DrawerMenu Features:**
- Section headers
- Icon + label items
- Active state highlighting
- User profile area
- Nested menu support

**SegmentedControl Features:**
- Sliding indicator animation
- 2-5 segments support
- Icon + text options
- Disabled state

---

### Day 7-8: SearchBar Component ⚡
**Status:** 🚨 URGENT | **Time:** 2 days | **Complexity:** Medium

**SearchBar Features:**
- Icon prefix
- Clear button
- Filter chips
- Voice search icon (optional)
- Recent searches dropdown

---

## 🟢 Phase 2: Megaprompt Generation (Week 2)

**Timeline:** 3-4 days | **Focus:** Comprehensive code generation

### Task 2.1: Token System Architecture
**Status:** ⏳ PENDING | **Time:** 1 day

**📚 Required Reading:**
- **[TOKEN_IMPLEMENTATION.md](../architecture/TOKEN_IMPLEMENTATION.md)** - Complete token values and implementation
- **[architecture.md](../architecture/architecture.md#token-system-architecture)** - 3-tier token system design

**3-Tier Token System:**
```typescript
// Tier 1: Primitives
color.primitive.blue.500 = '#3b82f6'

// Tier 2: Semantic (theme-aware)
color.semantic.primary.default = {color.primitive.blue.500}

// Tier 3: Component (optional overrides)
component.button.primary.background = {color.semantic.primary.default}
```

**Semantic Token Taxonomy:**
- **Canvas:** background/foreground pairs
- **Surfaces:** surface/surface-foreground
- **Interactive:** primary/secondary with foreground pairs
- **Status:** success, warning, error, info (full sets)
- **Borders:** border, divider, ring (focus)

---

### Task 2.2: Megaprompt Template
**Status:** ⏳ PENDING | **Time:** 2 days

**Structure:**
```xml
<DesignSystemMegaprompt>
  <Role>Expert React Native/Tamagui developer</Role>
  <ProjectSetup>
    - Expo setup commands
    - Tamagui installation
    - Directory structure
  </ProjectSetup>
  <TokenConfiguration>
    - Complete token system
    - Light/dark themes
    - Platform overrides
  </TokenConfiguration>
  <ComponentLibrary>
    - All 6 core components
    - Styled with tokens
    - Variants included
  </ComponentLibrary>
  <UsageExamples>
    - Complete app screens
    - Component composition
  </UsageExamples>
  <AdherenceRules>
    - Token usage enforcement
    - Accessibility requirements
    - Platform conventions
  </AdherenceRules>
</DesignSystemMegaprompt>
```

---

### Task 2.3: State Management for Export
**Status:** ⏳ PENDING | **Time:** 1 day

**Generate from Zustand store:**
- Token values from current theme
- Component variant selections
- Platform-specific overrides
- Accessibility settings

---

## 🔵 Phase 3: Extended Components (Week 3-4)

**Timeline:** 1-2 weeks | **Components:** Tier 2 B2C components

### Content Display Components
- [ ] ImageCarousel - Product galleries, onboarding
- [ ] ListItem - Feeds, settings, notifications
- [ ] Badge/Chip - Tags, filters, status
- [ ] Avatar - User profiles everywhere
- [ ] Empty State - No content scenarios

### Form Components
- [ ] Checkbox - Multi-select
- [ ] Switch - Settings toggles
- [ ] RadioGroup - Single select
- [ ] TextArea - Comments, descriptions
- [ ] Slider - Price ranges, ratings

### Feedback Components
- [ ] Toast - Transient notifications
- [ ] Alert - Inline messages
- [ ] Skeleton - Loading states
- [ ] Progress - Upload/download
- [ ] Spinner - Activity indicator

---

## 🚀 Phase 4: Production Polish (Post-MVP)

### Platform Optimizations
- [ ] iOS-specific haptics
- [ ] Android ripple effects
- [ ] Web hover states
- [ ] Keyboard navigation

### Performance
- [ ] Lazy loading
- [ ] Animation frame optimization
- [ ] Bundle size analysis
- [ ] Memory profiling

### Distribution
- [ ] NPM package setup
- [ ] Documentation site
- [ ] Example apps
- [ ] Video tutorials

---

## 📊 Progress Tracking

### Phase 1: B2C Component MVP
- [x] Foundation (34 components built)
- [x] Factory pattern (87% reduction)
- [ ] FeedCard (0%)
- [ ] TabBar & NavHeader (0%)
- [ ] DrawerMenu & SegmentedControl (0%)
- [ ] SearchBar (0%)

**Progress: 40% | ETA: 10-14 days**

### Phase 2: Megaprompt Generation
- [ ] Token system architecture (0%)
- [ ] Megaprompt template (0%)
- [ ] State management export (0%)

**Progress: 0% | ETA: 3-4 days after Phase 1**

---

## 🎯 Success Metrics

### MVP Success (2 weeks)
- [ ] 6 core B2C components working
- [ ] Megaprompt generates working app
- [ ] Visual customization instant (<100ms)
- [ ] Cross-platform verified (iOS/Android/Web)

### Quality Metrics
- [ ] All components use tokens (no hardcoded values)
- [ ] WCAG AA accessibility
- [ ] 60fps animations
- [ ] <3s megaprompt generation

### User Metrics
- [ ] <5 min to customized design system
- [ ] Copy-paste megaprompt works first try
- [ ] Components look native on each platform

---

## 📚 Key Documents

- **[product-plan.md](./product-plan.md)** - Strategic vision & roadmap
- **[architecture.md](./architecture.md)** - Token system & technical design
- **[SYNC_ARCHITECTURE.md](./SYNC_ARCHITECTURE.md)** - State management
- **[claude.md](./claude.md)** - AI context for development

---

## 🚦 Quick Start

### Today's Priority
1. Start with FeedCard component (most visual impact)
2. Implement full token support
3. Test theme responsiveness

### Key Technical Decisions
- **Platform:** React Native + Tamagui (cross-platform)
- **Export:** Megaprompt only for MVP (config files later)
- **Focus:** B2C apps needing strong visual identity
- **Components:** Navigation & content first, forms second

### Component Implementation Pattern
```typescript
// 1. Define tokens
const tokens = {
  component: { /* component-specific tokens */ }
}

// 2. Create styled component
const Component = styled(TamaguiPrimitive, {
  // Base styles using tokens
  backgroundColor: '$surface',
  // Variants
  variants: { /* CVA-style variants */ }
})

// 3. Export with TypeScript types
export type ComponentProps = GetProps<typeof Component>
```

---

**Last Updated:** 2025-11-04 (B2C Pivot)
**Current Sprint:** Phase 1 - B2C Component MVP
**Next Milestone:** Megaprompt export (Week 2)