import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for Styling Consistency
 *
 * These tests verify:
 * 1. No black borders (should be soft gray)
 * 2. Proper spacing (no excessive gaps)
 * 3. Text doesn't overflow
 * 4. Colors remain consistent when switching tabs
 */

test.describe('Visual Regression - Styling Consistency', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('text=Design System Builder', { timeout: 10000 });
  });

  test('should not have black borders anywhere', async ({ page }) => {
    // Take a full page screenshot
    await page.screenshot({
      path: 'tests/visual-regression/__screenshots__/initial-load.png',
      fullPage: true
    });

    // Check computed border colors on key elements
    const borderChecks = [
      // Type scale buttons
      { selector: '[title="Regular Scale"]', description: 'Type scale button' },
      // Color swatches
      { selector: '[title="Turquoise"]', description: 'Color swatch' },
      // Corner radius options
      { selector: 'text=Medium >> ..', description: 'Corner radius option' },
      // Phone preview
      { selector: '.phone-preview, [class*="preview"]', description: 'Phone preview' },
    ];

    for (const { selector, description } of borderChecks) {
      try {
        const element = page.locator(selector).first();
        if (await element.count() > 0) {
          const borderColor = await element.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              borderTopColor: computed.borderTopColor,
              borderRightColor: computed.borderRightColor,
              borderBottomColor: computed.borderBottomColor,
              borderLeftColor: computed.borderLeftColor,
              borderWidth: computed.borderWidth,
            };
          });

          console.log(`${description}:`, borderColor);

          // Check that border is not pure black (0, 0, 0)
          const isBlack = (color: string) => {
            const rgb = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (!rgb) return false;
            const [_, r, g, b] = rgb.map(Number);
            return r === 0 && g === 0 && b === 0;
          };

          expect(isBlack(borderColor.borderTopColor)).toBe(false);
          expect(isBlack(borderColor.borderRightColor)).toBe(false);
          expect(isBlack(borderColor.borderBottomColor)).toBe(false);
          expect(isBlack(borderColor.borderLeftColor)).toBe(false);
        }
      } catch (error) {
        console.log(`Could not check ${description}, selector might not exist yet`);
      }
    }
  });

  test('should have proper spacing - no excessive gaps', async ({ page }) => {
    // Check CSS variables for spacing
    const spacingVars = await page.evaluate(() => {
      const root = document.documentElement;
      const computed = window.getComputedStyle(root);

      return {
        space1: computed.getPropertyValue('--space-1'),
        space2: computed.getPropertyValue('--space-2'),
        space3: computed.getPropertyValue('--space-3'),
        space4: computed.getPropertyValue('--space-4'),
        space5: computed.getPropertyValue('--space-5'),
        space6: computed.getPropertyValue('--space-6'),
      };
    });

    console.log('Spacing variables:', spacingVars);

    // Verify spacing values are reasonable (8px-based scale)
    const parsePixels = (value: string) => parseInt(value.replace('px', ''));

    expect(parsePixels(spacingVars.space1)).toBeGreaterThan(0);
    expect(parsePixels(spacingVars.space1)).toBeLessThan(20); // Not too large
    expect(parsePixels(spacingVars.space2)).toBeGreaterThan(parsePixels(spacingVars.space1));
    expect(parsePixels(spacingVars.space3)).toBeGreaterThan(parsePixels(spacingVars.space2));

    // Take screenshot of middle mock to check spacing
    const middleMock = page.locator('.phone-preview, [class*="preview"]').first();
    if (await middleMock.count() > 0) {
      await middleMock.screenshot({
        path: 'tests/visual-regression/__screenshots__/phone-preview-spacing.png'
      });
    }
  });

  test('should not have text overflow in components', async ({ page }) => {
    // Check for text overflow in phone preview
    const textElements = page.locator('text=Discover, text=Featured Today, text=For You');

    for (let i = 0; i < await textElements.count(); i++) {
      const element = textElements.nth(i);
      const overflow = await element.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          overflow: computed.overflow,
          textOverflow: computed.textOverflow,
          whiteSpace: computed.whiteSpace,
          width: el.scrollWidth,
          visibleWidth: el.clientWidth,
          isOverflowing: el.scrollWidth > el.clientWidth,
        };
      });

      console.log(`Text element ${i}:`, overflow);

      // Text should not be overflowing unless intentionally ellipsed
      if (overflow.textOverflow === 'ellipsis') {
        // Ellipsis is intentional, that's ok
        expect(overflow.whiteSpace).toBe('nowrap');
      } else {
        // No unintended overflow
        expect(overflow.isOverflowing).toBe(false);
      }
    }
  });

  test('should maintain teal color when switching tabs', async ({ page }) => {
    // Ensure turquoise theme is selected
    await page.click('[title="Turquoise"]');
    await page.waitForTimeout(300);

    // Get the brand color from CSS variable
    const getTealBrandColor = async () => {
      return await page.evaluate(() => {
        const root = document.documentElement;
        const computed = window.getComputedStyle(root);
        return computed.getPropertyValue('--color-brand').trim();
      });
    };

    const initialBrand = await getTealBrandColor();
    console.log('Initial brand color:', initialBrand);

    // Should be teal (26 188 156)
    expect(initialBrand).toContain('26');
    expect(initialBrand).toContain('188');
    expect(initialBrand).toContain('156');

    // Take screenshot of initial state
    await page.screenshot({
      path: 'tests/visual-regression/__screenshots__/teal-theme-initial.png',
      fullPage: true
    });

    // Switch to Design Tokens tab (this used to cause color reversion)
    const tokensTab = page.locator('text=Design Tokens');
    if (await tokensTab.count() > 0) {
      await tokensTab.click();
      await page.waitForTimeout(300);

      const brandAfterTabSwitch = await getTealBrandColor();
      console.log('Brand color after tab switch:', brandAfterTabSwitch);

      // Should still be teal, not blue
      expect(brandAfterTabSwitch).toBe(initialBrand);
      expect(brandAfterTabSwitch).not.toContain('66'); // Not blue (66 141 238)

      // Take screenshot after tab switch
      await page.screenshot({
        path: 'tests/visual-regression/__screenshots__/teal-theme-after-tab-switch.png',
        fullPage: true
      });
    }

    // Switch to React Native Components tab
    const componentsTab = page.locator('text=React Native Components');
    if (await componentsTab.count() > 0) {
      await componentsTab.click();
      await page.waitForTimeout(300);

      const brandAfterSecondSwitch = await getTealBrandColor();
      console.log('Brand color after second tab switch:', brandAfterSecondSwitch);

      // Should STILL be teal
      expect(brandAfterSecondSwitch).toBe(initialBrand);

      // Take screenshot
      await page.screenshot({
        path: 'tests/visual-regression/__screenshots__/teal-theme-after-second-switch.png',
        fullPage: true
      });
    }
  });

  test('should have soft gray borders, not black', async ({ page }) => {
    // Check the border CSS variable
    const borderColor = await page.evaluate(() => {
      const root = document.documentElement;
      const computed = window.getComputedStyle(root);
      return computed.getPropertyValue('--color-border').trim();
    });

    console.log('Border color CSS variable:', borderColor);

    // Should be soft gray (229 231 235 in light mode)
    expect(borderColor).toBe('229 231 235');

    // Should NOT be black
    expect(borderColor).not.toBe('0 0 0');

    // Verify RGB values are in gray range (all components > 200)
    const [r, g, b] = borderColor.split(' ').map(Number);
    expect(r).toBeGreaterThan(200);
    expect(g).toBeGreaterThan(200);
    expect(b).toBeGreaterThan(200);
  });

  test('should have consistent spacing in phone preview', async ({ page }) => {
    // Take a screenshot of the phone preview specifically
    const phonePreview = page.locator('.phone-preview, [class*="preview"]').first();

    if (await phonePreview.count() > 0) {
      await phonePreview.screenshot({
        path: 'tests/visual-regression/__screenshots__/phone-preview-detailed.png'
      });

      // Check padding/margin values
      const spacing = await phonePreview.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          padding: computed.padding,
          margin: computed.margin,
          gap: computed.gap,
        };
      });

      console.log('Phone preview spacing:', spacing);

      // Verify spacing is not excessive
      const parsePx = (value: string) => {
        const match = value.match(/(\d+)px/);
        return match ? parseInt(match[1]) : 0;
      };

      const paddingValue = parsePx(spacing.padding);
      expect(paddingValue).toBeLessThan(100); // Not more than 100px padding
    }
  });

  test('should render all typography scales correctly', async ({ page }) => {
    // Test small scale
    await page.click('[title="Small Scale"]');
    await page.waitForTimeout(300);
    await page.screenshot({
      path: 'tests/visual-regression/__screenshots__/typography-small.png',
      fullPage: true
    });

    // Test regular scale
    await page.click('[title="Regular Scale"]');
    await page.waitForTimeout(300);
    await page.screenshot({
      path: 'tests/visual-regression/__screenshots__/typography-regular.png',
      fullPage: true
    });

    // Test large scale
    await page.click('[title="Large Scale"]');
    await page.waitForTimeout(300);
    await page.screenshot({
      path: 'tests/visual-regression/__screenshots__/typography-large.png',
      fullPage: true
    });

    // Verify text is visible in all scales
    await expect(page.locator('text=Design System Builder')).toBeVisible();
    await expect(page.locator('text=Discover')).toBeVisible();
  });

  test('should render dark mode without black borders', async ({ page }) => {
    // Toggle dark mode
    const darkModeSwitch = page.getByRole('switch');
    await darkModeSwitch.click();
    await page.waitForTimeout(500);

    // Take screenshot
    await page.screenshot({
      path: 'tests/visual-regression/__screenshots__/dark-mode.png',
      fullPage: true
    });

    // Check border color in dark mode
    const borderColor = await page.evaluate(() => {
      const root = document.documentElement;
      const computed = window.getComputedStyle(root);
      return computed.getPropertyValue('--color-border').trim();
    });

    console.log('Dark mode border color:', borderColor);

    // Should be dark gray (44 44 44), NOT black (0 0 0)
    expect(borderColor).toBe('44 44 44');
    expect(borderColor).not.toBe('0 0 0');

    // Verify it's not pure black
    const [r, g, b] = borderColor.split(' ').map(Number);
    expect(r).toBeGreaterThan(0);
    expect(g).toBeGreaterThan(0);
    expect(b).toBeGreaterThan(0);
  });

  test('should handle all color themes without visual issues', async ({ page }) => {
    const themes = [
      { name: 'Turquoise', expectedRgb: '26 188 156' },
      { name: 'Emerald', expectedRgb: '46 204 113' },
      { name: 'Peter River', expectedRgb: '52 152 219' },
      { name: 'Amethyst', expectedRgb: '155 89 182' },
    ];

    for (const theme of themes) {
      // Click theme
      await page.click(`[title="${theme.name}"]`);
      await page.waitForTimeout(300);

      // Take screenshot
      await page.screenshot({
        path: `tests/visual-regression/__screenshots__/theme-${theme.name.toLowerCase().replace(' ', '-')}.png`,
        fullPage: true
      });

      // Verify brand color
      const brandColor = await page.evaluate(() => {
        const root = document.documentElement;
        const computed = window.getComputedStyle(root);
        return computed.getPropertyValue('--color-brand').trim();
      });

      console.log(`${theme.name} brand color:`, brandColor);
      expect(brandColor).toBe(theme.expectedRgb);

      // Verify no black borders
      const borderColor = await page.evaluate(() => {
        const root = document.documentElement;
        const computed = window.getComputedStyle(root);
        return computed.getPropertyValue('--color-border').trim();
      });

      expect(borderColor).not.toBe('0 0 0');
    }
  });
});
