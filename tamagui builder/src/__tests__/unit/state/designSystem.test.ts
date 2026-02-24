import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useDesignSystem } from '@/state/designSystem';
import type { Tokens, StylingOptions, HapticsConfig } from '@/state/designSystem';

// Helper to wait for async updates
const waitForUpdate = () => new Promise(resolve => setTimeout(resolve, 0));

describe('DesignSystem Store', () => {
  beforeEach(async () => {
    // Reset store to initial state before each test
    const store = useDesignSystem.getState();

    // Reset to defaults synchronously to avoid triggering subscriber loops
    store.setDarkMode(false);
    store.setTheme('turquoise');
    store.setCustomPrimaryColor('#3498db');
    store.setAccentColor('turquoise');
    store.setCustomAccentColor('#1abc9c');
    store.setScale('regular');
    store.setPrimaryFont('font-jakarta');
    store.setDisplayFont('font-jakarta');
    store.setStylePreset('modern');
    store.setSpacingMode('normal');
    store.setCornerRadius('medium');

    // Wait for any subscribers to finish
    await waitForUpdate();
  });

  describe('Store Initialization', () => {
    it('should initialize with default values', () => {
      const state = useDesignSystem.getState();

      expect(state.isDarkMode).toBe(false);
      expect(state.selectedTheme).toBe('turquoise');
      expect(state.selectedScale).toBe('regular');
      expect(state.selectedPrimaryFont).toBe('font-jakarta');
      expect(state.selectedDisplayFont).toBe('font-jakarta');
      expect(state.stylePresetId).toBe('modern');
      expect(state.spacingMode).toBe('normal');
      expect(state.cornerRadius).toBe('medium');
    });

    it('should have valid default tokens', () => {
      const state = useDesignSystem.getState();
      const { tokens } = state;

      expect(tokens.brand).toBeDefined();
      expect(tokens.fontFamily).toBe('Plus Jakarta Sans, ui-sans-serif, system-ui');
      expect(tokens.space).toHaveLength(8);
      expect(tokens.space).toEqual([8, 16, 24, 32, 40, 48, 64, 80]);
    });

    it('should have valid default styling options', () => {
      const state = useDesignSystem.getState();
      const { opts } = state;

      expect(opts.menuLayout).toBe('bottomBar');
      expect(opts.cardBorderWeight).toBe('thin');
      expect(opts.inputStyle).toBe('filled');
    });

    it('should have valid default haptics config', () => {
      const state = useDesignSystem.getState();
      const { haptics } = state;

      expect(haptics.enabled).toBe(true);
      expect(haptics.stack).toBe('web-react');
      expect(haptics.tapLight).toBe('selection');
    });
  });

  describe('Token Setters', () => {
    it('should update tokens partially', () => {
      const { setTokens } = useDesignSystem.getState();

      setTokens({ brand: '255 0 0' });

      const state = useDesignSystem.getState();
      expect(state.tokens.brand).toBe('255 0 0');
      expect(state.tokens.fontFamily).toBeDefined(); // Other tokens unchanged
    });

    it('should merge multiple token updates', () => {
      const { setTokens } = useDesignSystem.getState();

      setTokens({
        brand: '100 100 100',
        success: '0 255 0'
      });

      const state = useDesignSystem.getState();
      expect(state.tokens.brand).toBe('100 100 100');
      expect(state.tokens.success).toBe('0 255 0');
    });

    it('should update typography tokens', () => {
      const { setTokens } = useDesignSystem.getState();

      setTokens({
        h1: { size: '32px', line: '40px', weight: 800 }
      });

      const state = useDesignSystem.getState();
      expect(state.tokens.h1.size).toBe('32px');
      expect(state.tokens.h1.line).toBe('40px');
      expect(state.tokens.h1.weight).toBe(800);
    });
  });

  describe('Options Setters', () => {
    it('should update styling options partially', () => {
      const { setOpts } = useDesignSystem.getState();

      setOpts({ menuLayout: 'hamburger' });

      const state = useDesignSystem.getState();
      expect(state.opts.menuLayout).toBe('hamburger');
      expect(state.opts.cardBorderWeight).toBe('thin'); // Unchanged
    });

    it('should update multiple options', () => {
      const { setOpts } = useDesignSystem.getState();

      setOpts({
        cardBorderWeight: 'thick',
        inputStyle: 'outlined'
      });

      const state = useDesignSystem.getState();
      expect(state.opts.cardBorderWeight).toBe('thick');
      expect(state.opts.inputStyle).toBe('outlined');
    });

    it('should handle logo upload', () => {
      const { setOpts } = useDesignSystem.getState();
      const logoUrl = 'data:image/png;base64,test';

      setOpts({ logo: logoUrl });

      const state = useDesignSystem.getState();
      expect(state.opts.logo).toBe(logoUrl);
    });
  });

  describe('Haptics Setters', () => {
    it('should update haptics configuration', () => {
      const { setHaptics } = useDesignSystem.getState();

      setHaptics({ enabled: false });

      const state = useDesignSystem.getState();
      expect(state.haptics.enabled).toBe(false);
    });

    it('should update haptics stack', () => {
      const { setHaptics } = useDesignSystem.getState();

      setHaptics({ stack: 'react-native-expo' });

      const state = useDesignSystem.getState();
      expect(state.haptics.stack).toBe('react-native-expo');
    });
  });

  describe('Theme Management', () => {
    it('should change theme color', () => {
      const { setTheme } = useDesignSystem.getState();

      setTheme('emerald');

      const state = useDesignSystem.getState();
      expect(state.selectedTheme).toBe('emerald');
    });

    it('should handle custom theme color', () => {
      const { setTheme, setCustomPrimaryColor } = useDesignSystem.getState();

      setTheme('custom');
      setCustomPrimaryColor('#ff0000');

      const state = useDesignSystem.getState();
      expect(state.selectedTheme).toBe('custom');
      expect(state.customPrimaryColor).toBe('#ff0000');
    });

    it('should update accent color', () => {
      const { setAccentColor } = useDesignSystem.getState();

      setAccentColor('emerald');

      const state = useDesignSystem.getState();
      expect(state.selectedAccentColor).toBe('emerald');
    });

    it('should handle custom accent color', () => {
      const { setAccentColor, setCustomAccentColor } = useDesignSystem.getState();

      setAccentColor('custom');
      setCustomAccentColor('#00ff00');

      const state = useDesignSystem.getState();
      expect(state.selectedAccentColor).toBe('custom');
      expect(state.customAccentColor).toBe('#00ff00');
    });
  });

  describe('Dark Mode', () => {
    it('should toggle dark mode on', () => {
      const { setDarkMode } = useDesignSystem.getState();

      setDarkMode(true);

      const state = useDesignSystem.getState();
      expect(state.isDarkMode).toBe(true);
    });

    it('should toggle dark mode off', () => {
      const { setDarkMode } = useDesignSystem.getState();

      setDarkMode(true);
      setDarkMode(false);

      const state = useDesignSystem.getState();
      expect(state.isDarkMode).toBe(false);
    });

    it('should update text colors in dark mode', async () => {
      // Get initial light mode colors
      const lightTextPrimary = useDesignSystem.getState().tokens.textPrimary;

      // Switch to dark mode
      const { setDarkMode } = useDesignSystem.getState();
      setDarkMode(true);

      // Wait for subscriber to run
      await waitForUpdate();

      const state = useDesignSystem.getState();
      const darkTextPrimary = state.tokens.textPrimary;

      expect(darkTextPrimary).not.toBe(lightTextPrimary);
      expect(darkTextPrimary).toBe('225 225 225'); // Dark mode text color
    });

    it('should update background colors in dark mode', async () => {
      const { setDarkMode } = useDesignSystem.getState();

      setDarkMode(true);

      // Wait for subscriber to run
      await waitForUpdate();

      const state = useDesignSystem.getState();
      expect(state.tokens.bgPrimary).toBe('18 18 18');
      expect(state.tokens.bgSecondary).toBe('30 30 30');
    });
  });

  describe('Typography Scale', () => {
    it('should change to small scale', async () => {
      const { setScale } = useDesignSystem.getState();

      setScale('small');
      await waitForUpdate();

      const state = useDesignSystem.getState();
      expect(state.selectedScale).toBe('small');
      expect(state.tokens.h1.size).toBe('24px');
      expect(state.tokens.body.size).toBe('14px');
    });

    it('should change to large scale', async () => {
      const { setScale } = useDesignSystem.getState();

      setScale('large');
      await waitForUpdate();

      const state = useDesignSystem.getState();
      expect(state.selectedScale).toBe('large');
      expect(state.tokens.h1.size).toBe('36px');
      expect(state.tokens.body.size).toBe('18px');
    });

    it('should maintain regular scale', async () => {
      const { setScale } = useDesignSystem.getState();

      setScale('regular');
      await waitForUpdate();

      const state = useDesignSystem.getState();
      expect(state.selectedScale).toBe('regular');
      expect(state.tokens.h1.size).toBe('28px');
      expect(state.tokens.body.size).toBe('16px');
    });

    it('should update all typography levels when scale changes', async () => {
      const { setScale } = useDesignSystem.getState();

      setScale('small');
      await waitForUpdate();

      const state = useDesignSystem.getState();
      expect(state.tokens.h1.size).toBe('24px');
      expect(state.tokens.h2.size).toBe('20px');
      expect(state.tokens.subhead.size).toBe('16px');
      expect(state.tokens.caption.size).toBe('12px');
    });
  });

  describe('Font Family', () => {
    it('should change font family', async () => {
      const { setPrimaryFont } = useDesignSystem.getState();

      setPrimaryFont('font-vietnam');
      await waitForUpdate();

      const state = useDesignSystem.getState();
      expect(state.selectedPrimaryFont).toBe('font-vietnam');
      expect(state.tokens.fontFamily).toBe('Be Vietnam Pro, ui-sans-serif, system-ui');
    });

    it('should handle multiple font families', async () => {
      const { setPrimaryFont } = useDesignSystem.getState();

      const fontTests = [
        { id: 'font-jakarta', family: 'Plus Jakarta Sans, ui-sans-serif, system-ui' },
        { id: 'font-wix', family: 'Wix Madefor Text, ui-sans-serif, system-ui' },
        { id: 'font-figtree', family: 'Figtree, ui-sans-serif, system-ui' },
        { id: 'font-albert', family: 'Albert Sans, ui-sans-serif, system-ui' },
        { id: 'font-satoshi', family: 'Satoshi, ui-sans-serif, system-ui' }
      ];

      for (const { id, family } of fontTests) {
        setPrimaryFont(id);
        await waitForUpdate();
        const state = useDesignSystem.getState();
        expect(state.tokens.fontFamily).toBe(family);
      }
    });
  });

  describe('Spacing Mode', () => {
    it('should change to compact spacing', async () => {
      const { setSpacingMode } = useDesignSystem.getState();

      setSpacingMode('compact');
      await waitForUpdate();

      const state = useDesignSystem.getState();
      expect(state.spacingMode).toBe('compact');
      expect(state.tokens.space).toEqual([4, 8, 12, 16, 20, 24, 32, 40]);
    });

    it('should change to comfortable spacing', async () => {
      const { setSpacingMode } = useDesignSystem.getState();

      setSpacingMode('comfortable');
      await waitForUpdate();

      const state = useDesignSystem.getState();
      expect(state.spacingMode).toBe('comfortable');
      expect(state.tokens.space).toEqual([12, 24, 36, 48, 60, 72, 96, 120]);
    });

    it('should maintain normal spacing', async () => {
      const { setSpacingMode } = useDesignSystem.getState();

      setSpacingMode('normal');
      await waitForUpdate();

      const state = useDesignSystem.getState();
      expect(state.spacingMode).toBe('normal');
      expect(state.tokens.space).toEqual([8, 16, 24, 32, 40, 48, 64, 80]);
    });
  });

  describe('Style Presets', () => {
    it('should change style preset', () => {
      const { setStylePreset } = useDesignSystem.getState();

      setStylePreset('minimal');

      const state = useDesignSystem.getState();
      expect(state.stylePresetId).toBe('minimal');
    });

    it('should handle different preset IDs', () => {
      const { setStylePreset } = useDesignSystem.getState();

      const presets = ['modern', 'minimal', 'bold', 'soft'];

      presets.forEach(preset => {
        setStylePreset(preset);
        const state = useDesignSystem.getState();
        expect(state.stylePresetId).toBe(preset);
      });
    });
  });

  describe('Color System Updates', () => {
    it('should update brand color when theme changes', async () => {
      const { setTheme } = useDesignSystem.getState();

      setTheme('emerald');
      await waitForUpdate();

      const state = useDesignSystem.getState();
      // The subscriber should update the brand token
      expect(state.tokens.brand).toBeDefined();
      expect(typeof state.tokens.brand).toBe('string');
      expect(state.tokens.brand.split(' ')).toHaveLength(3); // RGB triplet
    });

    it('should use custom color when theme is custom', async () => {
      const { setTheme, setCustomPrimaryColor } = useDesignSystem.getState();

      setTheme('custom');
      setCustomPrimaryColor('#ff0000');

      // Wait for subscriber to run
      await waitForUpdate();

      const state = useDesignSystem.getState();
      const brand = state.tokens.brand;
      expect(brand).toBe('255 0 0'); // Red in RGB triplet
    });
  });

  describe('Regression Tests - Tab Switching Color Consistency', () => {
    it('should not change colors when re-rendering (tab switch simulation)', async () => {
      const { setTheme, setTokens } = useDesignSystem.getState();

      // Set teal theme
      setTheme('turquoise');
      await waitForUpdate();

      const brandAfterThemeChange = useDesignSystem.getState().tokens.brand;

      // Simulate tab switch - this used to cause colors to revert to blue
      // due to conflicting CSS variables in index.css
      setTokens({}); // Empty update to trigger a re-render
      await waitForUpdate();

      const state = useDesignSystem.getState();

      // Color should remain the same
      expect(state.tokens.brand).toBe(brandAfterThemeChange);
      expect(state.selectedTheme).toBe('turquoise');
    });

    it('should maintain theme color after multiple token updates', async () => {
      const { setTheme, setTokens } = useDesignSystem.getState();

      setTheme('emerald');
      await waitForUpdate();

      const initialBrand = useDesignSystem.getState().tokens.brand;

      // Trigger multiple token updates (simulating complex UI interactions)
      setTokens({ textPrimary: '100 100 100' });
      await waitForUpdate();

      setTokens({ bgSecondary: '200 200 200' });
      await waitForUpdate();

      const state = useDesignSystem.getState();

      // Brand color should not have been affected by unrelated token updates
      expect(state.tokens.brand).toBe(initialBrand);
    });

    it('should keep teal color and not revert to blue on state changes', async () => {
      const { setTheme, setDarkMode, setScale } = useDesignSystem.getState();

      // Set turquoise (teal) theme
      setTheme('turquoise');
      await waitForUpdate();

      const tealBrand = useDesignSystem.getState().tokens.brand;

      // Make various state changes that used to trigger color reversion
      setDarkMode(true);
      await waitForUpdate();

      setScale('large');
      await waitForUpdate();

      setDarkMode(false);
      await waitForUpdate();

      const state = useDesignSystem.getState();

      // Should still be teal, not blue
      expect(state.tokens.brand).toBe(tealBrand);
      expect(state.selectedTheme).toBe('turquoise');

      // Verify it's NOT blue (221 83% 53% HSL = ~66 141 238 RGB)
      expect(state.tokens.brand).not.toBe('66 141 238');
    });
  });

  describe('Regression Tests - Border Color Consistency', () => {
    it('should have soft gray borders in light mode, not black', async () => {
      const { setDarkMode } = useDesignSystem.getState();

      setDarkMode(false);
      await waitForUpdate();

      const state = useDesignSystem.getState();

      // Light mode border should be soft gray (229 231 235)
      expect(state.tokens.border).toBe('229 231 235');

      // Should NOT be black (0 0 0)
      expect(state.tokens.border).not.toBe('0 0 0');

      // Verify it's actually gray, not dark
      const [r, g, b] = state.tokens.border.split(' ').map(Number);
      expect(r).toBeGreaterThan(200);
      expect(g).toBeGreaterThan(200);
      expect(b).toBeGreaterThan(200);
    });

    it('should have dark gray borders in dark mode, not black', async () => {
      const { setDarkMode } = useDesignSystem.getState();

      setDarkMode(true);
      await waitForUpdate();

      const state = useDesignSystem.getState();

      // Dark mode border should be dark gray (44 44 44)
      expect(state.tokens.border).toBe('44 44 44');

      // Should NOT be black (0 0 0)
      expect(state.tokens.border).not.toBe('0 0 0');

      // Verify it's not too dark
      const [r, g, b] = state.tokens.border.split(' ').map(Number);
      expect(r).toBeGreaterThan(0);
      expect(g).toBeGreaterThan(0);
      expect(b).toBeGreaterThan(0);
    });

    it('should maintain border color across theme changes', async () => {
      const { setTheme, setDarkMode } = useDesignSystem.getState();

      setDarkMode(false);
      await waitForUpdate();

      const lightBorder = useDesignSystem.getState().tokens.border;

      // Change theme colors
      setTheme('emerald');
      await waitForUpdate();

      setTheme('amethyst');
      await waitForUpdate();

      const state = useDesignSystem.getState();

      // Border should remain the same soft gray
      expect(state.tokens.border).toBe(lightBorder);
      expect(state.tokens.border).toBe('229 231 235');
    });

    it('should not use OKLCH conversion that produces black borders', async () => {
      const { setTheme, setDarkMode } = useDesignSystem.getState();

      // Test various theme and mode combinations
      const combinations = [
        { theme: 'turquoise', dark: false },
        { theme: 'emerald', dark: false },
        { theme: 'amethyst', dark: true },
        { theme: 'peter-river', dark: true }
      ];

      for (const { theme, dark } of combinations) {
        setTheme(theme);
        setDarkMode(dark);
        await waitForUpdate();

        const state = useDesignSystem.getState();

        // Border should NEVER be black regardless of theme
        expect(state.tokens.border).not.toBe('0 0 0');

        // Verify RGB values are reasonable
        const [r, g, b] = state.tokens.border.split(' ').map(Number);
        expect(r + g + b).toBeGreaterThan(0); // Not all zeros
      }
    });
  });

  describe('Regression Tests - Accent Color Independence', () => {
    it('should update accent color without affecting primary', async () => {
      const { setTheme, setAccentColor } = useDesignSystem.getState();

      setTheme('turquoise');
      await waitForUpdate();

      const primaryBrand = useDesignSystem.getState().tokens.brand;

      // Change accent color
      setAccentColor('amethyst');
      await waitForUpdate();

      const state = useDesignSystem.getState();

      // Primary brand should be unchanged
      expect(state.tokens.brand).toBe(primaryBrand);

      // Accent (brandWeak) should be different
      expect(state.tokens.brandWeak).not.toBe(state.tokens.brand);
    });

    it('should update primary color without affecting accent', async () => {
      const { setTheme, setAccentColor } = useDesignSystem.getState();

      setAccentColor('emerald');
      await waitForUpdate();

      const accentColor = useDesignSystem.getState().tokens.brandWeak;

      // Change primary theme
      setTheme('amethyst');
      await waitForUpdate();

      const state = useDesignSystem.getState();

      // Accent should be unchanged
      expect(state.tokens.brandWeak).toBe(accentColor);

      // Primary should be different
      expect(state.tokens.brand).not.toBe(state.tokens.brandWeak);
    });
  });

  describe('State Subscription Performance', () => {
    it('should not trigger infinite update loops', async () => {
      let updateCount = 0;
      const maxUpdates = 10;

      const unsubscribe = useDesignSystem.subscribe(() => {
        updateCount++;
        if (updateCount > maxUpdates) {
          throw new Error('Infinite loop detected in store subscriptions');
        }
      });

      try {
        const { setTheme } = useDesignSystem.getState();
        setTheme('emerald');
        await waitForUpdate();

        // Should have triggered a few updates (theme change + token update)
        // but definitely not an infinite loop
        expect(updateCount).toBeLessThanOrEqual(maxUpdates);
        expect(updateCount).toBeGreaterThan(0);
      } finally {
        unsubscribe();
      }
    });

    it('should batch updates efficiently', async () => {
      let updateCount = 0;

      const unsubscribe = useDesignSystem.subscribe(() => {
        updateCount++;
      });

      try {
        const { setTheme, setDarkMode, setScale } = useDesignSystem.getState();

        // Make multiple changes
        setTheme('emerald');
        setDarkMode(true);
        setScale('large');

        await waitForUpdate();

        // Should not trigger excessive updates (each setter + one subscriber update)
        expect(updateCount).toBeLessThan(20);
      } finally {
        unsubscribe();
      }
    });
  });
});
