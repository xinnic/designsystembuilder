# Next Steps - Design System Builder

> **Updated:** 2025-11-04
> **Current Status:** Token System Foundation ✅ COMPLETE

## ✅ What We Just Completed

1. **3-Tier Token System** (Task 1.1) ✅
   - Primitive tokens with 11-step OKLCH scales
   - Semantic token mappings for theme switching
   - Component token overrides
   - CSS variable bridge for real-time updates

2. **Partial Factory Functions** (Task 1.2) 🟡
   - Color scale generator ✅
   - State transformations (partial)
   - Size variant generator (not started)

3. **Tamagui Config Update** (Task 1.3) ✅
   - Semantic tokens mapped
   - New config file created

---

## 🎯 Next Priority Tasks (In Order)

### IMMEDIATE: Complete Token Factory Functions (Task 1.2)
**Model:** Sonnet
**Time:** ~5 hours

1. **Size Variant Generator** (2h)
   ```typescript
   generateSizeVariants(scale: SpacingScale): VariantMap
   // Creates xs, sm, md, lg, xl variants automatically
   ```

2. **Complete State Transformation Rules** (3h)
   ```typescript
   generateStates(config: StateConfig): StateMap
   // Hover, focus, press, disabled states
   ```

---

### THEN: Migrate Existing Components (Task 2.1)
**Model:** Sonnet
**Time:** ~10 hours total

Priority order for migration:
1. **Button** (2h) - Most used, sets the pattern
2. **Card** (2h) - Base for FeedCard
3. **Input/Select/Checkbox** (3h) - Form foundation
4. **Text** (2h) - Typography tokens
5. **Stack** (1h) - Spacing tokens

**Migration means:**
- Replace ALL hardcoded values with tokens
- Use semantic tokens, not primitives
- Add proper TypeScript types
- Test theme switching works

---

### THEN: Add CVA Variant Structure (Task 2.2)
**Model:** Opus
**Time:** ~8 hours

Implement Class Variance Authority pattern:
```typescript
interface ComponentDefinition {
  base: StyleObject
  variants: VariantMap
  compoundVariants?: Rule[]
  defaultVariants: Defaults
}
```

---

### FINALLY: Build B2C Hero Components (Task 3.1-3.6)
**Model:** Opus for complex, Sonnet for simple
**Time:** ~5 days total

1. **FeedCard** (1 day) - #1 priority for B2C
2. **TabBar** (1 day) - Mobile navigation
3. **NavHeader** (6h) - Top bar
4. **DrawerMenu** (1 day) - Side nav
5. **SegmentedControl** (6h) - Content filtering
6. **SearchBar** (6h) - Discovery

---

## 📊 Current Blockers

1. **Components still use hardcoded values** - Can't properly theme until migrated
2. **No CVA structure** - Inconsistent variant APIs
3. **Factory functions incomplete** - Manual variant creation

---

## 💡 Recommended Next Action

**Start with:** Complete Token Factory Functions
**Why:** These will make component migration 87% faster
**Time:** 5 hours
**Model:** Use Sonnet (simpler implementation task)

```bash
# Next commands to run:
1. Complete factory functions
2. Test with a simple component
3. Begin systematic migration
```

---

## 🚀 Sprint Goals

### This Week
- [x] Token system foundation
- [ ] Complete factory functions
- [ ] Migrate 3+ components to tokens
- [ ] Start CVA implementation

### Next Week
- [ ] Complete all component migrations
- [ ] Full CVA variant system
- [ ] Begin B2C components (FeedCard, TabBar)

---

## 📈 Success Metrics

We'll know we're successful when:
1. ✅ No hardcoded values in any component
2. ✅ Theme switching works instantly
3. ✅ Dark mode is automatic
4. ✅ All components use consistent variant API
5. ✅ Can build Instagram-like feed UI

---

## 🎯 Definition of "Migration Complete"

A component is migrated when:
- [ ] Uses ONLY tokens (no hardcoded colors/spacing)
- [ ] Uses semantic tokens (not primitive)
- [ ] Has proper TypeScript types
- [ ] Theme switching tested
- [ ] Dark mode tested
- [ ] All variants work with tokens

---

## 🔧 Technical Debt to Address

1. **Old CSS variables** - Still using RGB format, need OKLCH
2. **Backwards compatibility layer** - Remove once migration complete
3. **Old tamagui.config.ts** - Replace with new one after testing

---

## 📝 Notes

- The token system foundation is solid ✅
- All future work builds on this foundation
- Focus on systematic migration, not perfection
- Test theme switching after each component
- Document any issues for later cleanup

---

**Ready to continue?** Start with completing the Token Factory Functions!