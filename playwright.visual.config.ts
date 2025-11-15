import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Visual Regression Testing
 *
 * This config is optimized for visual testing with:
 * - Screenshot capture
 * - CSS variable inspection
 * - Computed style verification
 */

export default defineConfig({
  testDir: './e2e/visual-regression',
  fullyParallel: false, // Run sequentially for consistent screenshots
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Single worker for consistent screenshots
  reporter: [
    ['html', { outputFolder: 'playwright-report-visual' }],
    ['list']
  ],

  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
