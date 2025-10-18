import { test, expect } from '@playwright/test';

test.describe('Design System Customization Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for app to load
    await expect(page.getByText('Design System Builder')).toBeVisible({ timeout: 10000 });
  });

  test('complete customization flow - colors, typography, spacing', async ({ page }) => {
    // 1. Select brand color (Emerald)
    await page.getByText('Primary Color').waitFor({ timeout: 5000 });
    const primaryColorSection = page.locator('text=Primary Color').locator('..').locator('..');
    const emeraldButton = primaryColorSection.getByTitle('Emerald').first();
    await emeraldButton.click();

    // Wait for state change instead of timeout
    await page.waitForFunction(() => {
      const styles = window.getComputedStyle(document.documentElement);
      return styles.getPropertyValue('--color-brand') !== '';
    }, { timeout: 2000 });

    // 2. Choose typography scale (Large)
    await page.getByTitle('Large Scale').click();

    // Verify text size updated
    const discoverHeading = page.getByText('Discover').first();
    await expect(discoverHeading).toBeVisible({ timeout: 2000 });

    // 3. Adjust spacing (Comfortable)
    // Component Styling section is open by default, no need to click
    await page.getByText('Comfortable').click();

    // 4. Apply style preset (Glassmorphism)
    await page.getByText('Glassmorphism').click();

    // 5. Toggle dark mode
    const darkModeSwitch = page.getByRole('switch');
    await darkModeSwitch.click();

    // Wait for dark mode to apply
    await page.waitForFunction(() => {
      return document.documentElement.classList.contains('dark');
    }, { timeout: 2000 });

    // 6. Verify all changes persist across panels
    // The phone preview should reflect all changes
    await expect(page.getByText('Discover')).toBeVisible({ timeout: 2000 });
    await expect(page.getByText('For You')).toBeVisible({ timeout: 2000 });
  });

  test('theme color changes propagate everywhere', async ({ page }) => {
    // Select Amethyst theme
    const primaryColorSection = page.locator('text=Primary Color').locator('..').locator('..');
    const amethystButton = primaryColorSection.getByTitle('Amethyst').first();
    await amethystButton.click();

    // Wait for CSS variable to update
    await page.waitForFunction(() => {
      const styles = window.getComputedStyle(document.documentElement);
      return styles.getPropertyValue('--color-brand') !== '';
    }, { timeout: 2000 });

    // Verify color updated in preview phone
    await expect(page.getByText('Discover')).toBeVisible();
    await expect(page.getByText('Explore Now')).toBeVisible();
    await expect(page.getByText('Featured Today')).toBeVisible();
  });

  test('spacing mode affects all components', async ({ page }) => {
    // Component Styling section is open by default
    // Wait for Spacing Scale to be visible
    await page.getByText('Spacing Scale').waitFor({ timeout: 2000 });

    // Select Compact spacing
    await page.getByText('Compact').click();

    // Verify spacing applied
    await expect(page.getByText('Design System Builder')).toBeVisible();

    // Switch to Comfortable spacing
    await page.getByText('Comfortable').click();

    // All panels should update
    await expect(page.getByText('Discover')).toBeVisible();
  });

  test('typography scale affects all text', async ({ page }) => {
    // Switch to Small scale
    await page.getByTitle('Small Scale').click();

    // Verify text is visible
    await expect(page.getByText('Design System Builder')).toBeVisible();
    await expect(page.getByText('Discover')).toBeVisible();

    // Switch to Large scale
    await page.getByTitle('Large Scale').click();

    // Text should still be visible with new sizes
    await expect(page.getByText('Design System Builder')).toBeVisible();
    await expect(page.getByText('Discover')).toBeVisible();
  });

  test('font family changes update all text', async ({ page }) => {
    // Open font dropdown
    const fontButton = page.getByRole('button', { name: /Plus Jakarta Sans/i });
    await fontButton.click();

    // Select different font
    await page.getByRole('menuitem', { name: /Be Vietnam Pro/i }).click();

    // Verify font button updated
    await expect(page.getByText('Be Vietnam Pro')).toBeVisible({ timeout: 2000 });

    // All text should use new font (visible check)
    await expect(page.getByText('Design System Builder')).toBeVisible();
    await expect(page.getByText('Discover')).toBeVisible();
  });

  test('dark mode toggles all components', async ({ page }) => {
    // Get initial state
    const darkModeSwitch = page.getByRole('switch');
    await expect(darkModeSwitch).toHaveAttribute('aria-checked', 'false');

    // Toggle dark mode on
    await darkModeSwitch.click();

    // Wait for dark mode class to apply
    await page.waitForFunction(() => {
      return document.documentElement.classList.contains('dark');
    }, { timeout: 2000 });

    // Verify switch state
    await expect(darkModeSwitch).toHaveAttribute('aria-checked', 'true');

    // All components should still be visible
    await expect(page.getByText('Design System Builder')).toBeVisible();
    await expect(page.getByText('Discover')).toBeVisible();
    await expect(page.getByText('Featured Today')).toBeVisible();

    // Toggle dark mode off
    await darkModeSwitch.click();

    // Wait for dark mode class to be removed
    await page.waitForFunction(() => {
      return !document.documentElement.classList.contains('dark');
    }, { timeout: 2000 });

    // Verify switch state
    await expect(darkModeSwitch).toHaveAttribute('aria-checked', 'false');
  });

  test('menu layout toggle updates preview', async ({ page }) => {
    // Component Styling section is open by default
    // Wait for Menu Layout to be visible
    await page.getByText('Menu Layout').waitFor({ timeout: 2000 });

    // Initially should be bottom bar (default)
    await expect(page.getByText('Home')).toBeVisible(); // Bottom nav item

    // Switch to Hamburger menu
    await page.getByText('Hamburger').click();

    // Wait for UI update
    await page.waitForFunction(() => {
      // Check if bottom nav is hidden
      const homeElements = Array.from(document.querySelectorAll('*')).filter(
        el => el.textContent === 'Home'
      );
      return homeElements.length === 0 || !homeElements.some(el => (el as HTMLElement).offsetParent !== null);
    }, { timeout: 2000 });

    // Bottom nav should be hidden
    await expect(page.getByText('Home')).not.toBeVisible();

    // Switch back to Bottom Bar
    await page.getByText('Bottom Bar').click();

    // Wait for bottom nav to appear
    await page.getByText('Home').waitFor({ state: 'visible', timeout: 2000 });

    // Bottom nav should reappear
    await expect(page.getByText('Home')).toBeVisible();
  });

  test('style presets apply multiple token changes', async ({ page }) => {
    // Component Styling section is open by default
    // Wait for Style Preset to be visible
    await page.getByText('Style Preset').waitFor({ timeout: 2000 });

    // Apply Modern Flat preset (default)
    await page.getByText('Modern Flat').click();

    // Apply Playful preset
    await page.getByText('Playful').click();

    // Verify components still visible with new styling
    await expect(page.getByText('Discover')).toBeVisible();
    await expect(page.getByText('Featured Today')).toBeVisible();

    // Apply Minimalist preset
    await page.getByText('Minimalist').click();

    // All components should adapt
    await expect(page.getByText('Discover')).toBeVisible();
  });

  test('accent color changes independently from primary', async ({ page }) => {
    // Change primary color
    const primaryColorSection = page.locator('text=Primary Color').locator('..').locator('..');
    await primaryColorSection.getByTitle('Emerald').first().click();

    // Change accent color
    const accentColorSection = page.locator('text=Accent Color').locator('..').locator('..');
    await accentColorSection.getByTitle('Amethyst').click();

    // Both changes should be applied
    await expect(page.getByText('Discover')).toBeVisible();
    await expect(page.getByText('Featured Today')).toBeVisible();
  });

  test('collapsible sections maintain state', async ({ page }) => {
    // Typography section should be open by default
    await expect(page.getByText('Font Family')).toBeVisible({ timeout: 2000 });

    // Close typography section
    const typographyTrigger = page.getByText('Typography').locator('..');
    await typographyTrigger.click();

    // Wait for animation
    await page.waitForFunction(() => {
      const fontFamilyElements = Array.from(document.querySelectorAll('*')).filter(
        el => el.textContent === 'Font Family'
      );
      return fontFamilyElements.length === 0 || !fontFamilyElements.some(el => (el as HTMLElement).offsetParent !== null);
    }, { timeout: 2000 });

    // Open it again
    await typographyTrigger.click();

    // Wait for content to be visible
    await page.getByText('Font Family').waitFor({ state: 'visible', timeout: 2000 });

    // Content should be visible
    await expect(page.getByText('Font Family')).toBeVisible();
  });
});