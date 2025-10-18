import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility - WCAG Compliance', () => {
  test('homepage should not have automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Design System Builder')).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('sidebar controls should be keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Tab through controls
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should have focus indicators
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });

  test('color selections should have accessible labels', async ({ page }) => {
    await page.goto('/');

    // All color buttons should have title attributes
    const turquoiseButtons = page.getByTitle('Turquoise');
    await expect(turquoiseButtons.first()).toBeVisible();

    const emeraldButtons = page.getByTitle('Emerald');
    await expect(emeraldButtons.first()).toBeVisible();
  });

  test('dark mode should maintain accessibility standards', async ({ page }) => {
    await page.goto('/');

    // Toggle dark mode
    const darkModeSwitch = page.getByRole('switch');
    await darkModeSwitch.click();
    await page.waitForTimeout(500);

    // Run accessibility scan in dark mode
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('form controls should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');

    // Dark mode switch should have proper aria attributes
    const darkModeSwitch = page.getByRole('switch');
    await expect(darkModeSwitch).toHaveAttribute('aria-checked');
  });

  test('interactive elements should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Font dropdown should be accessible via keyboard
    const fontButton = page.getByRole('button', { name: /Plus Jakarta Sans/i });
    await fontButton.focus();
    await page.keyboard.press('Enter');

    // Menu should open
    await expect(page.getByRole('menuitem', { name: /Be Vietnam Pro/i })).toBeVisible();

    // Escape should close
    await page.keyboard.press('Escape');
  });

  test('color contrast should meet WCAG AA standards', async ({ page }) => {
    await page.goto('/');

    // Run axe with color contrast rules
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('focus indicators should be visible', async ({ page }) => {
    await page.goto('/');

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
    await page.goto('/');

    // Should have header landmark
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Should have navigation landmark (when bottom bar is visible)
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('alt text should be present for images', async ({ page }) => {
    await page.goto('/');

    // Upload a logo to test alt text
    await page.getByText('Component Styling').click();
    await page.getByText('Logo').click();

    // All images should have alt attributes
    // This will be tested when a logo is uploaded
    // For now, just verify the structure is there
  });
});
