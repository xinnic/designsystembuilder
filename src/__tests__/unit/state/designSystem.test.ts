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
    store.setFont('font-jakarta');
    store.setStylePreset('modern');
    store.setSpacingMode('normal');

    // Wait for any subscribers to finish
    await waitForUpdate();
  });

  describe('Store Initialization', () => {
    it('should initialize with default values', () => {
      const state = useDesignSystem.getState();

      expect(state.isDarkMode).toBe(false);
      expect(state.selectedTheme).toBe('turquoise');
      expect(state.selectedScale).toBe('regular');
      expect(state.selectedFont).toBe('font-jakarta');
      expect(state.stylePresetId).toBe('modern');
      expect(state.spacingMode).toBe('normal');
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
      const { setFont } = useDesignSystem.getState();

      setFont('font-vietnam');
      await waitForUpdate();

      const state = useDesignSystem.getState();
      expect(state.selectedFont).toBe('font-vietnam');
      expect(state.tokens.fontFamily).toBe('Be Vietnam Pro, ui-sans-serif, system-ui');
    });

    it('should handle multiple font families', async () => {
      const { setFont } = useDesignSystem.getState();

      const fontTests = [
        { id: 'font-jakarta', family: 'Plus Jakarta Sans, ui-sans-serif, system-ui' },
        { id: 'font-wix', family: 'Wix Madefor Text, ui-sans-serif, system-ui' },
        { id: 'font-figtree', family: 'Figtree, ui-sans-serif, system-ui' },
        { id: 'font-albert', family: 'Albert Sans, ui-sans-serif, system-ui' },
        { id: 'font-satoshi', family: 'Satoshi, ui-sans-serif, system-ui' }
      ];

      for (const { id, family } of fontTests) {
        setFont(id);
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
});
