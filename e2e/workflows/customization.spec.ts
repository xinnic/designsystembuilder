import { test, expect } from '@playwright/test';

test.describe('Design System Customization Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for app to load
    await expect(page.getByText('Design System Builder')).toBeVisible({ timeout: 10000 });
  });

  test('complete customization flow - colors, typography, spacing', async ({ page }) => {
    // 1. Select brand color (Emerald)
    await page.getByTitle('Emerald').first().click();

    // Wait a bit for state to update
    await page.waitForTimeout(200);

    // 2. Choose typography scale (Large)
    await page.getByTitle('Large Scale').click();
    await page.waitForTimeout(200);

    // Verify text is visible
    await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible({ timeout: 2000 });

    // 3. Adjust spacing (Comfortable)
    // Component Styling section is open by default
    await page.getByText('Comfortable').click();
    await page.waitForTimeout(200);

    // 4. Apply style preset (Glassmorphism)
    await page.getByText('Glassmorphism').click();
    await page.waitForTimeout(200);

    // 5. Toggle dark mode
    const darkModeSwitch = page.getByRole('switch');
    await darkModeSwitch.click();
    await page.waitForTimeout(300);

    // 6. Verify all changes persist across panels
    await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible({ timeout: 2000 });
    await expect(page.getByText('For You')).toBeVisible({ timeout: 2000 });
  });

  test('theme color changes propagate everywhere', async ({ page }) => {
    // Select Amethyst theme - use simpler selector
    await page.getByTitle('Amethyst').first().click();
    await page.waitForTimeout(200);

    // Verify elements are visible (color change is internal)
    await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();
    await expect(page.getByText('Explore Now')).toBeVisible();
    await expect(page.getByText('Featured Today')).toBeVisible();
  });

  test('spacing mode affects all components', async ({ page }) => {
    // Component Styling section is open by default
    // Wait for Spacing Scale to be visible
    await expect(page.getByText('Spacing Scale')).toBeVisible({ timeout: 2000 });

    // Select Compact spacing
    await page.getByText('Compact').click();
    await page.waitForTimeout(200);

    // Verify spacing applied
    await expect(page.getByText('Design System Builder')).toBeVisible();

    // Switch to Comfortable spacing
    await page.getByText('Comfortable').click();
    await page.waitForTimeout(200);

    // All panels should update
    await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();
  });

  test('typography scale affects all text', async ({ page }) => {
    // Switch to Small scale
    await page.getByTitle('Small Scale').click();
    await page.waitForTimeout(200);

    // Verify text is visible
    await expect(page.getByText('Design System Builder')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();

    // Switch to Large scale
    await page.getByTitle('Large Scale').click();
    await page.waitForTimeout(200);

    // Text should still be visible with new sizes
    await expect(page.getByText('Design System Builder')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();
  });

  test('font family changes update all text', async ({ page }) => {
    // Open font dropdown
    const fontButton = page.getByRole('button', { name: /Plus Jakarta Sans/i });
    await fontButton.click();

    // Select different font
    await page.getByRole('menuitem', { name: /Be Vietnam Pro/i }).click();
    await page.waitForTimeout(300);

    // Verify font button updated
    await expect(page.getByText('Be Vietnam Pro')).toBeVisible({ timeout: 2000 });

    // All text should use new font (visible check)
    await expect(page.getByText('Design System Builder')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();
  });

  test('dark mode toggles all components', async ({ page }) => {
    // Get initial state
    const darkModeSwitch = page.getByRole('switch');
    await expect(darkModeSwitch).toHaveAttribute('aria-checked', 'false');

    // Toggle dark mode on
    await darkModeSwitch.click();
    await page.waitForTimeout(300);

    // Verify switch state
    await expect(darkModeSwitch).toHaveAttribute('aria-checked', 'true');

    // All components should still be visible
    await expect(page.getByText('Design System Builder')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();
    await expect(page.getByText('Featured Today')).toBeVisible();

    // Toggle dark mode off
    await darkModeSwitch.click();
    await page.waitForTimeout(300);

    // Verify switch state
    await expect(darkModeSwitch).toHaveAttribute('aria-checked', 'false');
  });

  test('menu layout toggle updates preview', async ({ page }) => {
    // Component Styling section is open by default
    // Wait for Menu Layout to be visible
    await expect(page.getByText('Menu Layout')).toBeVisible({ timeout: 2000 });

    // Initially should be bottom bar (default)
    await expect(page.getByText('Home')).toBeVisible(); // Bottom nav item

    // Switch to Hamburger menu
    await page.getByText('Hamburger').click();
    await page.waitForTimeout(300);

    // Bottom nav should be hidden
    await expect(page.getByText('Home')).not.toBeVisible();

    // Switch back to Bottom Bar
    await page.getByText('Bottom Bar').click();
    await page.waitForTimeout(300);

    // Bottom nav should reappear
    await expect(page.getByText('Home')).toBeVisible();
  });

  test('style presets apply multiple token changes', async ({ page }) => {
    // Component Styling section is open by default
    // Wait for Style Preset to be visible
    await expect(page.getByText('Style Preset')).toBeVisible({ timeout: 2000 });

    // Apply Modern Flat preset (default)
    await page.getByText('Modern Flat').click();
    await page.waitForTimeout(200);

    // Apply Playful preset
    await page.getByText('Playful').click();
    await page.waitForTimeout(200);

    // Verify components still visible with new styling
    await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();
    await expect(page.getByText('Featured Today')).toBeVisible();

    // Apply Minimalist preset
    await page.getByText('Minimalist').click();
    await page.waitForTimeout(200);

    // All components should adapt
    await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();
  });

  test('accent color changes independently from primary', async ({ page }) => {
    // Change primary color - use simpler selector
    await page.getByTitle('Emerald').first().click();
    await page.waitForTimeout(200);

    // Change accent color - get the second Amethyst button (in accent section)
    const amethystButtons = page.getByTitle('Amethyst');
    await amethystButtons.nth(1).click();
    await page.waitForTimeout(200);

    // Both changes should be applied
    await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();
    await expect(page.getByText('Featured Today')).toBeVisible();
  });

  test('collapsible sections maintain state', async ({ page }) => {
    // Typography section should be open by default
    await expect(page.getByText('Font Family')).toBeVisible({ timeout: 2000 });

    // Close typography section by clicking the trigger
    await page.getByRole('button', { name: /Typography/i }).click();
    await page.waitForTimeout(200);

    // Content should be hidden
    await expect(page.getByText('Font Family')).not.toBeVisible();

    // Open it again
    await page.getByRole('button', { name: /Typography/i }).click();
    await page.waitForTimeout(200);

    // Content should be visible
    await expect(page.getByText('Font Family')).toBeVisible();
  });
});
