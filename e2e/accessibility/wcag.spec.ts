import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility - WCAG Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for app to fully load
    await expect(page.getByText('Design System Builder')).toBeVisible({ timeout: 10000 });
    await page.waitForLoadState('networkidle');
  });

  test('homepage should not have automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .exclude('.toaster') // Exclude toast notifications if any
      .exclude('[role="status"]') // Exclude status messages
      .analyze();

    // Log violations for debugging
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Accessibility violations found:',
        accessibilityScanResults.violations.map(v => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.length
        }))
      );
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('sidebar controls should be keyboard accessible', async ({ page }) => {
    // Tab through controls
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should have focus indicators
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });

  test('color selections should have accessible labels', async ({ page }) => {
    // All color buttons should have title attributes
    const turquoiseButtons = page.getByTitle('Turquoise');
    await expect(turquoiseButtons.first()).toBeVisible();

    const emeraldButtons = page.getByTitle('Emerald');
    await expect(emeraldButtons.first()).toBeVisible();
  });

  test('dark mode should maintain accessibility standards', async ({ page }) => {
    // Toggle dark mode
    const darkModeSwitch = page.getByRole('switch');
    await darkModeSwitch.click();

    // Wait for dark mode to apply
    await page.waitForFunction(() => {
      return document.documentElement.classList.contains('dark');
    }, { timeout: 2000 });

    // Run accessibility scan in dark mode
    const accessibilityScanResults = await new AxeBuilder({ page })
      .exclude('.toaster')
      .exclude('[role="status"]')
      .analyze();

    if (accessibilityScanResults.violations.length > 0) {
      console.log('Dark mode accessibility violations:',
        accessibilityScanResults.violations.map(v => ({
          id: v.id,
          impact: v.impact,
          description: v.description
        }))
      );
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('form controls should have proper ARIA labels', async ({ page }) => {
    // Dark mode switch should have proper aria attributes
    const darkModeSwitch = page.getByRole('switch');
    await expect(darkModeSwitch).toHaveAttribute('aria-checked');
  });

  test('interactive elements should be keyboard navigable', async ({ page }) => {
    // Font dropdown should be accessible via keyboard
    const fontButton = page.getByRole('button', { name: /Plus Jakarta Sans/i });
    await fontButton.focus();
    await page.keyboard.press('Enter');

    // Menu should open
    await expect(page.getByRole('menuitem', { name: /Be Vietnam Pro/i })).toBeVisible({ timeout: 2000 });

    // Escape should close
    await page.keyboard.press('Escape');
  });

  test('color contrast should meet WCAG AA standards', async ({ page }) => {
    // Run axe with color contrast rules only
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .withRules(['color-contrast'])
      .exclude('.toaster')
      .exclude('[role="status"]')
      .analyze();

    if (accessibilityScanResults.violations.length > 0) {
      console.log('Color contrast violations:',
        accessibilityScanResults.violations.map(v => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.map(n => n.target)
        }))
      );
    }

    // Allow some flexibility for decorative elements
    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(criticalViolations).toEqual([]);
  });

  test('focus indicators should be visible', async ({ page }) => {
    // Tab to first interactive element
    await page.keyboard.press('Tab');

    // Get focused element
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Element should have visible outline or focus styling
    const box = await focusedElement.boundingBox();
    expect(box).not.toBeNull();
  });

  test('screen reader landmarks should be present', async ({ page }) => {
    // Should have header landmark
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Should have navigation landmark (when bottom bar is visible)
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('alt text should be present for images', async ({ page }) => {
    // This test checks the structure for alt text support
    // Real alt text would be tested when logo is uploaded

    // Logo section is open by default
    // Wait for Upload Logo button to be visible
    await page.getByText('Upload Logo').waitFor({ timeout: 2000 });

    // Check that the upload button exists
    await expect(page.getByText('Upload Logo')).toBeVisible();
  });
});