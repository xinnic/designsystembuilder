# Design System Builder - Testing Plan

## 🎯 Testing Strategy Overview

This document outlines the comprehensive testing strategy for the Design System Builder application. The testing approach focuses on the auto-sync architecture, real-time token updates, and component responsiveness to design system changes.

---

## 📋 Testing Priorities

### Priority 1: Critical Path Testing (Auto-Sync Architecture)
- State management synchronization
- Token propagation across panels
- CSS variable binding

### Priority 2: Component Testing
- Individual component rendering
- Token responsiveness
- Interactive behavior

### Priority 3: Integration Testing
- Cross-panel updates
- Theme switching
- Export functionality

### Priority 4: Visual Regression Testing
- Component appearance consistency
- Dark mode transitions
- Responsive layouts

---

## 🧪 Test Categories

### 1. Unit Tests

#### State Management (src/state/designSystem.ts)
```typescript
// Test cases for Zustand store
- [ ] Store initialization with default values
- [ ] Token setters update state correctly
- [ ] Options setters update state correctly
- [ ] Haptics configuration updates
- [ ] Theme switching logic
- [ ] Color system updates (primary, accent, custom)
- [ ] Typography scale changes
- [ ] Spacing mode transitions
- [ ] Style preset applications
```

#### Utility Functions
```typescript
// Helper function tests
- [ ] hexToRgb conversion accuracy
- [ ] Color mapping functions
- [ ] Typography scale calculations
- [ ] Spacing scale mappings
```

### 2. Component Tests

#### Left Panel Controls (src/left/StylingControls.tsx)
```typescript
- [ ] Spacing mode selector renders all options
- [ ] Style preset buttons apply correct tokens
- [ ] Menu layout toggle switches between hamburger/bottom bar
- [ ] Logo upload accepts valid image files
- [ ] Logo generation API integration
- [ ] Control state reflects store values
- [ ] User interactions trigger store updates
```

#### Sidebar (src/components/Sidebar.tsx)
```typescript
- [ ] Typography controls render correctly
- [ ] Font family dropdown shows all options
- [ ] Type scale buttons (small/regular/large) work
- [ ] Color picker shows theme colors
- [ ] Custom color input works
- [ ] Accent color selection works
- [ ] Dark mode toggle functions
- [ ] All controls use store directly (no props)
```

#### Preview Phone (src/components/PreviewPhone.tsx)
```typescript
- [ ] Renders mobile mockup frame
- [ ] Displays correct menu layout (hamburger vs bottom bar)
- [ ] Shows logo when uploaded
- [ ] Updates colors from tokens
- [ ] Typography reflects current scale
- [ ] Spacing adjusts with mode changes
- [ ] Dark mode renders correctly
```

#### Tailwind Showcase (src/panels/TailwindShowcase.tsx)
```typescript
// Tab System
- [ ] Tab navigation switches content
- [ ] Active tab styling applies correctly

// Tailwind Components Tab
- [ ] Data table renders with mock data
- [ ] Pagination controls are interactive
- [ ] Progress bars show correct percentages
- [ ] Skeleton loaders animate
- [ ] Tooltips appear on hover
- [ ] Accordion expands/collapses
- [ ] Alert messages display with correct colors
- [ ] Form components are interactive

// Complex Patterns Tab
- [ ] Loading spinners animate
- [ ] Button loading states display
- [ ] Page overlay shows backdrop
- [ ] Navigation patterns render correctly
- [ ] Statistics cards show data
- [ ] Profile card displays user info
```

### 3. Integration Tests

#### Auto-Sync Flow
```typescript
describe('Auto-sync architecture', () => {
  test('Changing spacing mode updates all panels', () => {
    // 1. Change spacing mode in left panel
    // 2. Verify CSS variables update
    // 3. Check phone preview reflects new spacing
    // 4. Confirm showcase components use new spacing
  })

  test('Theme color changes propagate everywhere', () => {
    // 1. Select new theme color
    // 2. Verify brand color CSS variable updates
    // 3. Check all branded elements update
    // 4. Confirm color contrast remains accessible
  })

  test('Typography scale affects all text', () => {
    // 1. Switch between small/regular/large
    // 2. Verify all text sizes update
    // 3. Check line heights adjust
    // 4. Confirm readability maintained
  })

  test('Dark mode toggles all components', () => {
    // 1. Toggle dark mode
    // 2. Verify background colors invert
    // 3. Check text colors adjust
    // 4. Confirm all panels update simultaneously
  })
})
```

#### Store Subscription Tests
```typescript
describe('Store subscriptions', () => {
  test('Color changes trigger token updates', () => {
    // 1. Change selectedTheme
    // 2. Verify brand token updates
    // 3. Change customPrimaryColor
    // 4. Verify brand token uses custom color
  })

  test('Font changes update typography', () => {
    // 1. Change selectedFont
    // 2. Verify fontFamily token updates
    // 3. Check CSS variable reflects new font
  })

  test('Style presets apply multiple tokens', () => {
    // 1. Select different preset
    // 2. Verify shadow tokens update
    // 3. Verify radius tokens update
    // 4. Verify border weights update
  })
})
```

### 4. End-to-End Tests

#### User Workflows
```typescript
describe('Complete user workflows', () => {
  test('Design system customization flow', () => {
    // 1. User uploads logo
    // 2. Selects brand colors
    // 3. Chooses typography scale
    // 4. Adjusts spacing
    // 5. Applies style preset
    // 6. Toggles dark mode
    // 7. All changes reflect across panels
  })

  test('Component exploration flow', () => {
    // 1. User navigates to Tailwind Components tab
    // 2. Scrolls through components
    // 3. Switches to Complex Patterns tab
    // 4. Views loading states
    // 5. Components respond to theme changes
  })

  test('Export design tokens flow', () => {
    // 1. User customizes design system
    // 2. Clicks export button
    // 3. Views generated tokens
    // 4. Copies CSS variables
    // 5. Copies Tailwind config
  })
})
```

### 5. Performance Tests

#### Rendering Performance
```typescript
- [ ] Initial app load time < 3s
- [ ] Panel switching < 100ms
- [ ] Theme switching < 200ms
- [ ] Token updates < 50ms
- [ ] No memory leaks during extended use
- [ ] Smooth scrolling in showcase panel
```

#### Store Performance
```typescript
- [ ] State updates don't cause unnecessary re-renders
- [ ] Subscriptions clean up properly
- [ ] Token calculations are memoized
- [ ] CSS variable updates are batched
```

### 6. Accessibility Tests

#### Keyboard Navigation
```typescript
- [ ] All controls keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Escape key closes modals/dropdowns
```

#### Screen Reader Support
```typescript
- [ ] All controls have accessible labels
- [ ] Color selections announce values
- [ ] State changes are announced
- [ ] Error messages are accessible
```

#### Color Contrast
```typescript
- [ ] Text meets WCAG AA standards
- [ ] Interactive elements have sufficient contrast
- [ ] Focus indicators are visible
- [ ] Dark mode maintains accessibility
```

### 7. Browser Compatibility

#### Supported Browsers
```typescript
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)
```

#### Features to Test
```typescript
- [ ] CSS custom properties support
- [ ] Grid/Flexbox layouts
- [ ] Color picker inputs
- [ ] File upload functionality
- [ ] Clipboard API (export)
```

---

## 🔧 Testing Tools & Setup

### Recommended Testing Stack

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "vitest": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "playwright": "^1.40.0",
    "msw": "^2.0.0",
    "jsdom": "^23.0.0"
  }
}
```

### Test File Structure
```
src/
├── __tests__/
│   ├── unit/
│   │   ├── state/
│   │   │   └── designSystem.test.ts
│   │   └── utils/
│   │       └── colors.test.ts
│   ├── components/
│   │   ├── Sidebar.test.tsx
│   │   ├── PreviewPhone.test.tsx
│   │   └── TailwindShowcase.test.tsx
│   └── integration/
│       ├── autoSync.test.tsx
│       └── themeSwitch.test.tsx
e2e/
├── workflows/
│   ├── customization.spec.ts
│   └── export.spec.ts
└── accessibility/
    └── wcag.spec.ts
```

---

## 🚀 Test Execution Plan

### Phase 1: Critical Path (Week 1)
1. Set up testing infrastructure
2. Write store unit tests
3. Test auto-sync mechanism
4. Verify token propagation

### Phase 2: Component Testing (Week 2)
1. Test all left panel controls
2. Test preview phone updates
3. Test showcase components
4. Verify tab navigation

### Phase 3: Integration (Week 3)
1. Test complete workflows
2. Verify cross-panel updates
3. Test theme switching
4. Test export functionality

### Phase 4: Polish (Week 4)
1. Performance optimization
2. Accessibility audit
3. Browser compatibility
4. Visual regression tests

---

## 📊 Test Coverage Goals

### Minimum Coverage Requirements
- **Overall**: 80%
- **Store Logic**: 95%
- **Critical Components**: 90%
- **Utility Functions**: 100%
- **Integration Tests**: 70%

### Coverage Report Structure
```
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |   85.3  |   78.9   |   82.1  |   86.2  |
 state/             |   95.2  |   92.3   |   94.8  |   95.5  |
  designSystem.ts   |   95.2  |   92.3   |   94.8  |   95.5  |
 components/        |   88.7  |   82.4   |   85.3  |   89.1  |
  Sidebar.tsx       |   91.2  |   85.3   |   88.9  |   91.5  |
  PreviewPhone.tsx  |   87.3  |   80.1   |   84.2  |   87.8  |
 panels/            |   82.4  |   75.8   |   79.3  |   83.1  |
  TailwindShowcase  |   82.4  |   75.8   |   79.3  |   83.1  |
--------------------|---------|----------|---------|---------|
```

---

## 🐛 Bug Tracking

### Known Issues to Test
1. Color picker may not work in Safari
2. Logo upload file size limits
3. Dark mode transition flicker
4. Accordion animation jank
5. Tooltip positioning edge cases

### Regression Test Suite
- Run before each release
- Focus on previously fixed bugs
- Test browser-specific issues
- Verify performance metrics

---

## 🔴 Current Test Failures (To Be Fixed)

### E2E Test Failures - WebKit Browser
**Status**: All E2E tests failing on WebKit (Safari)
**Affected Tests**: 20 tests in `e2e/workflows/customization.spec.ts` and `e2e/accessibility/wcag.spec.ts`
**Impact**: High - Safari users cannot be tested
**Priority**: P1

#### Workflow Tests Failing (WebKit):
1. `complete customization flow - colors, typography, spacing` - workflows/customization.spec.ts:10
2. `theme color changes propagate everywhere` - workflows/customization.spec.ts:53
3. `spacing mode affects all components` - workflows/customization.spec.ts:71
4. `typography scale affects all text` - workflows/customization.spec.ts:90
5. `font family changes update all text` - workflows/customization.spec.ts:108
6. `dark mode toggles all components` - workflows/customization.spec.ts:125
7. `menu layout toggle updates preview` - workflows/customization.spec.ts:150
8. `style presets apply multiple token changes` - workflows/customization.spec.ts:172
9. `accent color changes independently from primary` - workflows/customization.spec.ts:196
10. `collapsible sections maintain state` - workflows/customization.spec.ts:211

#### Accessibility Tests Failing (WebKit):
1. `homepage should not have automatically detectable accessibility issues` - accessibility/wcag.spec.ts:5
2. `sidebar controls should be keyboard accessible` - accessibility/wcag.spec.ts:14
3. `color selections should have accessible labels` - accessibility/wcag.spec.ts:27
4. `dark mode should maintain accessibility standards` - accessibility/wcag.spec.ts:38
5. `form controls should have proper ARIA labels` - accessibility/wcag.spec.ts:52
6. `interactive elements should be keyboard navigable` - accessibility/wcag.spec.ts:60
7. `color contrast should meet WCAG AA standards` - accessibility/wcag.spec.ts:75
8. `focus indicators should be visible` - accessibility/wcag.spec.ts:86
9. `screen reader landmarks should be present` - accessibility/wcag.spec.ts:101
10. `alt text should be present for images` - accessibility/wcag.spec.ts:113

**Root Cause**: Likely WebKit browser compatibility issues or timing problems specific to Safari's rendering engine
**Next Steps**:
- [ ] Investigate WebKit-specific selectors and timing
- [ ] Add WebKit-specific wait conditions
- [ ] Test with actual Safari browser
- [ ] Consider skipping WebKit tests temporarily if not critical

### E2E Test Timeouts - Chromium & Firefox
**Status**: Some tests timing out after 30+ seconds
**Affected Tests**: Intermittent timeouts in workflow tests
**Impact**: Medium - Tests are slow but may pass inconsistently
**Priority**: P2

#### Tests with Timeout Issues:
1. `complete customization flow` - 32.3s (Chromium), 30.5s (Firefox)
2. `spacing mode affects all components` - 32.3s (Chromium), 31.1s (Firefox)
3. `menu layout toggle updates preview` - 32.3s (Chromium), 30.1s (Firefox)
4. `style presets apply multiple token changes` - 32.3s (Chromium), 30.1s (Firefox)

**Root Cause**: Tests waiting for animations/transitions or inefficient selectors
**Next Steps**:
- [ ] Reduce waitForTimeout durations
- [ ] Use more efficient selectors (data-testid attributes)
- [ ] Wait for specific state changes instead of arbitrary timeouts
- [ ] Optimize test setup/teardown

### Accessibility Test Failures - Firefox
**Status**: Some accessibility tests failing on Firefox
**Affected Tests**: 5 tests in `e2e/accessibility/wcag.spec.ts`
**Impact**: Medium - Firefox-specific accessibility issues
**Priority**: P2

#### Firefox Accessibility Failures:
1. `homepage should not have automatically detectable accessibility issues` - accessibility/wcag.spec.ts:5 (40.5s)
2. `dark mode should maintain accessibility standards` - accessibility/wcag.spec.ts:38 (47.0s)
3. `color contrast should meet WCAG AA standards` - accessibility/wcag.spec.ts:75 (32.1s)
4. `screen reader landmarks should be present` - accessibility/wcag.spec.ts:101 (17.7s)
5. `alt text should be present for images` - accessibility/wcag.spec.ts:113 (14.8s)

**Root Cause**: Firefox may handle axe-core analysis differently or have genuine accessibility violations
**Next Steps**:
- [ ] Run axe-core DevTools in Firefox manually to verify violations
- [ ] Check if violations are browser-specific or actual issues
- [ ] Update components to fix any real accessibility violations
- [ ] Adjust test assertions for Firefox-specific behavior if needed

### Summary
- **Total Failing Tests**: 38 (20 WebKit, 13 Chromium timing, 5 Firefox a11y)
- **Passing Tests**: 174 unit/component/integration tests (100%)
- **Critical Path**: All unit, component, and integration tests passing ✅
- **Blocking Issues**: WebKit compatibility (P1)
- **Recommended Action**: Focus on WebKit compatibility fixes first, then optimize test timing

---

## 📝 Test Documentation

### Test Case Template
```markdown
#### Test ID: TC-001
**Component**: Sidebar
**Feature**: Theme Color Selection
**Preconditions**: App loaded, sidebar visible
**Steps**:
1. Click on color palette
2. Select "Emerald" theme
3. Observe changes

**Expected Result**:
- Brand color updates to emerald
- All branded elements change color
- Preview phone reflects new theme
- Showcase components update

**Actual Result**: [To be filled during testing]
**Status**: [ ] Pass [ ] Fail
**Notes**:
```

---

## ✅ Testing Checklist

### Before Release
- [ ] All unit tests passing
- [ ] Integration tests complete
- [ ] E2E workflows verified
- [ ] Performance benchmarks met
- [ ] Accessibility audit passed
- [ ] Browser compatibility confirmed
- [ ] Visual regression tests passed
- [ ] Coverage goals achieved
- [ ] Bug fixes verified
- [ ] Documentation updated

### Post-Release Monitoring
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] User feedback collected
- [ ] Analytics reviewed
- [ ] Hotfix process ready

---

## 🔄 Continuous Testing

### CI/CD Pipeline
```yaml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npm run test:e2e
      - run: npm run test:coverage
      - run: npm run test:a11y
```

### Testing Commands
```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run accessibility tests
npm run test:a11y

# Watch mode for development
npm run test:watch

# UI mode for debugging
npm run test:ui
```

---

## 📞 Contact & Support

**Test Lead**: [Your Name]
**Email**: [test-lead@example.com]
**Slack**: #design-system-testing
**Documentation**: [Wiki Link]

---

**Last Updated**: 2025-01-16
**Version**: 1.0.0
**Status**: Active Development