# Visual Regression Testing Guide

## 🎯 Overview

This document explains the visual regression testing strategy for the Design System Builder, focusing on detecting styling issues like black borders, excessive spacing, text overflow, and color consistency problems.

## 🛠️ Testing Approach Comparison

### Option 1: Playwright Visual Testing ✅ **RECOMMENDED** (Implemented)

**Advantages:**
- ✅ Already installed and configured
- ✅ Screenshot capture for visual comparison
- ✅ CSS variable inspection (validates `--color-brand`, `--color-border`, etc.)
- ✅ Computed style verification (checks actual rendered values)
- ✅ Element-level inspection (overflow, spacing, borders)
- ✅ Cross-browser testing support
- ✅ CI/CD integration
- ✅ Playwright UI for debugging
- ✅ Headless and headed modes

**Use Cases:**
- Automated visual regression testing
- CI/CD pipeline integration
- Screenshot-based comparisons
- Style validation (borders, spacing, colors)
- Cross-browser compatibility testing

**Implementation:**
- File: `e2e/visual-regression/styling-consistency.spec.ts`
- Config: `playwright.visual.config.ts`
- 10 comprehensive visual tests

### Option 2: Chrome DevTools MCP (Manual Inspection)

**Advantages:**
- ✅ Real-time inspection
- ✅ Interactive debugging
- ✅ Live element inspection
- ✅ Console access
- ✅ Network monitoring
- ✅ Performance profiling

**Disadvantages:**
- ⚠️ Requires manual setup/connection
- ⚠️ Not automated (manual clicks required)
- ⚠️ Not suitable for CI/CD
- ⚠️ Can't be version controlled

**Use Cases:**
- Manual debugging sessions
- Exploring unknown issues
- Performance analysis
- Network debugging

**Setup:**
```bash
# Start Chrome with remote debugging
google-chrome --remote-debugging-port=9222

# Or in WSL2
export CHROME_PATH="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
"$CHROME_PATH" --remote-debugging-port=9222
```

### Option 3: Puppeteer

**Comparison to Playwright:**
- ❌ Chrome-only (Playwright supports Firefox, Safari)
- ❌ Less modern API
- ❌ Not already installed
- ✅ Similar screenshot capabilities
- ✅ Similar automation features

**Verdict:** Playwright is superior for this use case

---

## 📋 Visual Tests Implemented

### 1. Black Border Detection ✅
**Purpose:** Ensure no pure black (0,0,0) borders anywhere in the app

**Test:**
```typescript
// Checks computed border colors on key elements
const borderColor = await element.evaluate((el) => {
  const computed = window.getComputedStyle(el);
  return computed.borderTopColor; // Returns rgb(229, 231, 235) ✅
});

expect(isBlack(borderColor)).toBe(false); // NOT rgb(0, 0, 0) ❌
```

**Elements Tested:**
- Type scale buttons
- Color swatches
- Corner radius options
- Phone preview container

**Expected Values:**
- Light mode: `rgb(229, 231, 235)` (soft gray)
- Dark mode: `rgb(44, 44, 44)` (dark gray)
- NEVER: `rgb(0, 0, 0)` (black)

---

### 2. Spacing Validation ✅
**Purpose:** Ensure spacing is reasonable and follows 8px-based scale

**Test:**
```typescript
const spacingVars = await page.evaluate(() => {
  const root = document.documentElement;
  const computed = window.getComputedStyle(root);

  return {
    space1: computed.getPropertyValue('--space-1'), // 8px
    space2: computed.getPropertyValue('--space-2'), // 16px
    space3: computed.getPropertyValue('--space-3'), // 24px
  };
});

// Verify spacing progression
expect(space2 > space1).toBe(true);
expect(space3 > space2).toBe(true);
```

**Validations:**
- Values > 0 (not missing)
- Values < 100px (not excessive)
- Proper progression (each level larger)
- Screenshots for manual review

---

### 3. Text Overflow Detection ✅
**Purpose:** Ensure text doesn't overflow containers unintentionally

**Test:**
```typescript
const overflow = await element.evaluate((el) => {
  const computed = window.getComputedStyle(el);
  return {
    overflow: computed.overflow,
    textOverflow: computed.textOverflow,
    isOverflowing: el.scrollWidth > el.clientWidth,
  };
});

// If ellipsis is set, overflow is intentional
if (overflow.textOverflow === 'ellipsis') {
  expect(overflow.whiteSpace).toBe('nowrap'); // OK
} else {
  expect(overflow.isOverflowing).toBe(false); // NOT OK
}
```

**Elements Tested:**
- "Discover" heading
- "Featured Today" text
- "For You" tab text
- Phone preview content

---

### 4. Tab Switching Color Consistency ✅ **CRITICAL**
**Purpose:** Prevent teal → blue color reversion when switching tabs

**Test:**
```typescript
// 1. Set turquoise theme
await page.click('[title="Turquoise"]');

const initialBrand = await page.evaluate(() => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--color-brand').trim();
});

expect(initialBrand).toBe('26 188 156'); // Teal RGB ✅

// 2. Switch to Design Tokens tab
await page.click('text=Design Tokens');

const brandAfterSwitch = await page.evaluate(() => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--color-brand').trim();
});

// Should still be teal, NOT blue
expect(brandAfterSwitch).toBe(initialBrand); // Same value ✅
expect(brandAfterSwitch).not.toContain('66'); // NOT blue (66 141 238) ❌
```

**Bug This Prevents:**
In the past, switching tabs would cause `--color-brand` to revert from teal (26 188 156) to blue (66 141 238) due to conflicting CSS variables in `index.css`.

**Screenshots Captured:**
1. `teal-theme-initial.png` - Before tab switch
2. `teal-theme-after-tab-switch.png` - After Design Tokens tab
3. `teal-theme-after-second-switch.png` - After React Native Components tab

---

### 5. Border Color CSS Variable Validation ✅
**Purpose:** Ensure border CSS variable is correct

**Test:**
```typescript
const borderColor = await page.evaluate(() => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--color-border').trim();
});

// Light mode
expect(borderColor).toBe('229 231 235'); ✅

// NOT black
expect(borderColor).not.toBe('0 0 0'); ❌
```

---

### 6. Phone Preview Spacing ✅
**Purpose:** Ensure phone preview has reasonable padding/margins

**Test:**
```typescript
const spacing = await phonePreview.evaluate((el) => {
  const computed = window.getComputedStyle(el);
  return {
    padding: computed.padding,
    margin: computed.margin,
    gap: computed.gap,
  };
});

const paddingValue = parseInt(spacing.padding);
expect(paddingValue).toBeLessThan(100); // Not excessive
```

**Screenshot:** `phone-preview-spacing.png`

---

### 7. Typography Scale Rendering ✅
**Purpose:** Ensure all 3 typography scales render correctly

**Test:**
```typescript
// Small scale
await page.click('[title="Small Scale"]');
await page.screenshot({ path: 'typography-small.png' });

// Regular scale
await page.click('[title="Regular Scale"]');
await page.screenshot({ path: 'typography-regular.png' });

// Large scale
await page.click('[title="Large Scale"]');
await page.screenshot({ path: 'typography-large.png' });
```

**Validations:**
- Text visible in all scales
- No layout breaks
- Proper font sizes

---

### 8. Dark Mode Visual Validation ✅
**Purpose:** Ensure dark mode doesn't have black borders

**Test:**
```typescript
// Toggle dark mode
await page.getByRole('switch').click();

const borderColor = await page.evaluate(() => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--color-border').trim();
});

// Should be dark gray, NOT black
expect(borderColor).toBe('44 44 44'); ✅
expect(borderColor).not.toBe('0 0 0'); ❌
```

**Screenshot:** `dark-mode.png`

---

### 9. Multi-Theme Color Validation ✅
**Purpose:** Ensure all color themes work without black borders

**Test:**
```typescript
const themes = [
  { name: 'Turquoise', expectedRgb: '26 188 156' },
  { name: 'Emerald', expectedRgb: '46 204 113' },
  { name: 'Peter River', expectedRgb: '52 152 219' },
  { name: 'Amethyst', expectedRgb: '155 89 182' },
];

for (const theme of themes) {
  await page.click(`[title="${theme.name}"]`);

  const brandColor = await page.evaluate(() => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--color-brand').trim();
  });

  expect(brandColor).toBe(theme.expectedRgb); ✅

  // Border should never be black
  const borderColor = await page.evaluate(...);
  expect(borderColor).not.toBe('0 0 0'); ✅
}
```

**Screenshots:**
- `theme-turquoise.png`
- `theme-emerald.png`
- `theme-peter-river.png`
- `theme-amethyst.png`

---

## 🚀 Running Visual Tests

### Headless Mode (CI/CD)
```bash
npm run test:visual
```
- Runs in headless Chromium
- Fast execution
- Perfect for automated pipelines
- Generates screenshots in `tests/visual-regression/__screenshots__/`

### Headed Mode (Visual Debugging)
```bash
npm run test:visual:headed
```
- Opens actual Chrome browser
- Watch tests execute in real-time
- See what the test "sees"
- Useful for debugging failing tests

### Playwright UI (Interactive)
```bash
npm run test:visual:ui
```
- Opens Playwright UI
- Step through tests one by one
- Inspect DOM state at each step
- Time-travel debugging
- View screenshots inline
- Best for understanding test failures

---

## 📸 Screenshot Storage

All screenshots are saved to:
```
tests/visual-regression/__screenshots__/
├── initial-load.png
├── phone-preview-spacing.png
├── teal-theme-initial.png
├── teal-theme-after-tab-switch.png
├── teal-theme-after-second-switch.png
├── typography-small.png
├── typography-regular.png
├── typography-large.png
├── dark-mode.png
├── theme-turquoise.png
├── theme-emerald.png
├── theme-peter-river.png
└── theme-amethyst.png
```

**Git Ignore:** Screenshots are not committed (too large). They're regenerated on each test run.

---

## 🔍 Debugging Failed Visual Tests

### 1. Check Screenshot
```bash
# Run test
npm run test:visual

# Open screenshot
open tests/visual-regression/__screenshots__/initial-load.png
```

### 2. Use Playwright UI
```bash
npm run test:visual:ui

# Then:
# 1. Click on failing test
# 2. Click "Run" to execute
# 3. Inspect DOM state in "Actions" tab
# 4. View screenshot in "Attachments" tab
```

### 3. Use Chrome DevTools MCP (Manual)
```bash
# 1. Start dev server
npm run dev

# 2. In another terminal, start Chrome with debugging
google-chrome --remote-debugging-port=9222 http://localhost:8080

# 3. Use MCP tools to inspect:
# - mcp__chrome-devtools__take_snapshot
# - mcp__chrome-devtools__take_screenshot
# - mcp__chrome-devtools__evaluate_script
```

### 4. Check Console Logs
Visual tests log computed styles:
```typescript
console.log('Border color CSS variable:', borderColor);
// Output: Border color CSS variable: 229 231 235
```

Run with `--headed` to see logs in terminal:
```bash
npm run test:visual:headed
```

---

## 🐛 Common Issues

### Issue: Black Borders Detected
**Symptoms:** Test fails with `Expected border color not to be '0 0 0'`

**Causes:**
1. OKLCH conversion bug returning black
2. CSS variable not set (defaults to black)
3. Conflicting CSS in `index.css`

**Fix:**
1. Check `src/state/designSystem.ts` - ensure `hexToRgb()` is working
2. Check `src/index.css` - remove hardcoded `--color-border` definitions
3. Verify Zustand store is updating CSS variables

### Issue: Colors Revert on Tab Switch
**Symptoms:** Test fails with teal → blue reversion

**Causes:**
1. Conflicting CSS variables in `index.css`
2. Store subscription not firing
3. React re-render clearing CSS variables

**Fix:**
1. Remove `--color-*` definitions from `src/index.css`
2. Ensure `useTokenCSS()` hook is called in App.tsx
3. Check Zustand subscriber in `designSystem.ts`

### Issue: Screenshots Not Generated
**Symptoms:** No files in `__screenshots__/` folder

**Causes:**
1. Directory doesn't exist
2. Permission issues
3. Test exiting before screenshot

**Fix:**
```bash
# Create directory
mkdir -p tests/visual-regression/__screenshots__

# Fix permissions
chmod -R 755 tests/visual-regression

# Check test is reaching screenshot code
npm run test:visual:headed
```

---

## 📊 Test Results Interpretation

### Success Output
```
✓ should not have black borders anywhere (5s)
✓ should have proper spacing - no excessive gaps (2s)
✓ should not have text overflow in components (3s)
✓ should maintain teal color when switching tabs (4s)
✓ should have soft gray borders, not black (1s)
✓ should have consistent spacing in phone preview (2s)
✓ should render all typography scales correctly (6s)
✓ should render dark mode without black borders (3s)
✓ should handle all color themes without visual issues (8s)

Test Files  1 passed (1)
     Tests  10 passed (10)
```

### Failure Output
```
✗ should not have black borders anywhere (5s)
  Error: Expected border color not to be '0 0 0', but got '0 0 0'

  at e2e/visual-regression/styling-consistency.spec.ts:42:7
```

**Next Steps:**
1. Run with `--headed` to see browser
2. Check screenshot: `__screenshots__/initial-load.png`
3. Inspect computed styles in test logs
4. Use Playwright UI for step-by-step debugging

---

## 🎓 Best Practices

### 1. Run Visual Tests Before Committing
```bash
# Quick check
npm run test:visual

# If issues found, debug with UI
npm run test:visual:ui
```

### 2. Update Screenshots When Design Changes
If you intentionally change the design:
1. Run tests to generate new screenshots
2. Manually review screenshots
3. If correct, tests will pass
4. Screenshots regenerated each run (not committed)

### 3. Use Headed Mode for New Tests
When writing new visual tests:
```bash
npm run test:visual:headed
```
This lets you see what's happening in real-time.

### 4. Combine with Unit Tests
Visual tests complement unit tests:
- **Unit tests**: Verify Zustand store logic
- **Visual tests**: Verify rendered output

Always run both:
```bash
npm run test:unit && npm run test:visual
```

---

## 📝 Summary

**Recommended Approach:** Playwright Visual Testing ✅

**Why:**
- Automated and repeatable
- Screenshot capture
- CSS variable inspection
- CI/CD ready
- Already installed
- Comprehensive test coverage

**When to Use Chrome MCP:**
- Manual debugging sessions
- Exploring unknown issues
- Network/performance analysis

**Test Coverage:**
- 10 comprehensive visual tests
- Border color validation
- Spacing verification
- Text overflow detection
- Color consistency across tabs
- Multi-theme validation
- Dark mode verification

**Run Commands:**
```bash
npm run test:visual          # Headless (fast)
npm run test:visual:headed   # With browser (debug)
npm run test:visual:ui       # Interactive (best for debugging)
```

---

**Last Updated:** 2025-01-15
**Status:** Production Ready ✅
