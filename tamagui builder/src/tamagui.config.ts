import { createTamagui, createTokens, createFont } from '@tamagui/core';
import { createAnimations } from '@tamagui/animations-css';
import type { StylePresetId } from './config/stylePresets';

// Static Tamagui configuration
// Dynamic theming happens through CSS variables, not through Tamagui tokens
export const createDynamicConfig = () => {
  // Use static token values - CSS variables will be applied at the component level
  const tokens = createTokens({
    color: {
      // Brand colors - mapped to CSS variables
      brand: 'rgb(var(--color-brand))',
      brandWeak: 'rgb(var(--color-brand-weak))',

      // Text colors
      textPrimary: 'rgb(var(--color-text-primary))',
      textSecondary: 'rgb(var(--color-text-secondary))',
      textDisabled: 'rgb(var(--color-text-disabled))',

      // Background colors
      bgPrimary: 'rgb(var(--color-bg-primary))',
      bgSecondary: 'rgb(var(--color-bg-secondary))',

      // Border
      border: 'rgb(var(--color-border))',

      // Semantic colors
      focus: 'rgb(var(--color-focus))',
      success: 'rgb(var(--color-success))',
      warning: 'rgb(var(--color-warning))',
      info: 'rgb(var(--color-info))',
      danger: 'rgb(var(--color-danger))',
    },

    space: {
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      6: 24,
      7: 32,
      8: 40,
      9: 48,
      10: 56,
      11: 64,
      12: 80,
      13: 96,
      14: 128,
      15: 256,
      16: 320,
      true: 8,
    },

    size: {
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      6: 24,
      7: 32,
      8: 40,
      9: 48,
      10: 56,
      11: 64,
      12: 80,
      13: 96,
      14: 128,
      15: 256,
      16: 320,
      true: 16,
    },

    radius: {
      0: 0,
      1: 4,
      2: 8,
      3: 12,
      4: 9999,
      true: 8,
    },

    zIndex: {
      0: 0,
      1: 100,
      2: 200,
      3: 300,
      4: 400,
      5: 500,
    },

    borderWidth: {
      0: 0,
      1: 'var(--border-thin)',
      2: 'var(--border-medium)',
      3: 'var(--border-thick)',
      4: 'var(--border-focus)',
      true: 'var(--border-thin)',
    },

    shadow: {
      none: 'none',
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      true: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    },
  });

  const animations = createAnimations({
    bouncy: 'ease-in 200ms',
    lazy: 'ease-out 400ms',
    quick: 'ease-in-out 100ms',
    fast: 'ease-in-out 150ms',
  });

  // Static font definitions - dynamic theming happens through CSS
  const bodyFont = createFont({
    family: 'var(--font-family), "Plus Jakarta Sans", ui-sans-serif, system-ui',
    size: {
      1: 14,
      2: 16,
      3: 18,
      4: 22,
      5: 28,
      6: 48,
      true: 16,
    },
    lineHeight: {
      1: 20,
      2: 24,
      3: 26,
      4: 30,
      5: 38,
      6: 56,
      true: 24,
    },
    weight: {
      4: '400',
      5: '500',
      6: '600',
      7: '700',
      true: '400',
    },
    letterSpacing: {
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      true: 0,
    },
  });

  const headingFont = createFont({
    family: 'var(--font-display), "Plus Jakarta Sans", ui-sans-serif, system-ui',
    size: {
      1: 14,
      2: 16,
      3: 18,
      4: 22,
      5: 28,
      6: 48,
      true: 28,
    },
    lineHeight: {
      1: 20,
      2: 24,
      3: 26,
      4: 30,
      5: 38,
      6: 56,
      true: 38,
    },
    weight: {
      4: '400',
      5: '500',
      6: '600',
      7: '700',
      true: '700',
    },
    letterSpacing: {
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      true: 0,
    },
  });

  const monoFont = createFont({
    family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    size: {
      1: 12,
      2: 14,
      3: 16,
      4: 18,
      5: 20,
      6: 24,
      true: 14,
    },
    lineHeight: {
      1: 18,
      2: 20,
      3: 24,
      4: 26,
      5: 28,
      6: 32,
      true: 20,
    },
    weight: {
      4: '400',
      5: '500',
      6: '600',
      7: '700',
      true: '400',
    },
    letterSpacing: {
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      true: 0,
    },
  });

  // Base theme values for light mode
  const lightThemeBase = {
    background: tokens.color.bgPrimary,
    backgroundHover: tokens.color.bgSecondary,
    backgroundStrong: tokens.color.bgSecondary,
    color: tokens.color.textPrimary,
    colorHover: tokens.color.textSecondary,
    borderColor: tokens.color.border,
    placeholderColor: tokens.color.textDisabled,
    brand: tokens.color.brand,
    brandHover: tokens.color.brandWeak,
    // Radix UI Gray scale for light mode
    gray1: 'hsl(0, 0%, 99.0%)',
    gray2: 'hsl(0, 0%, 97.3%)',
    gray3: 'hsl(0, 0%, 95.1%)',
    gray4: 'hsl(0, 0%, 93.0%)',
    gray5: 'hsl(0, 0%, 90.9%)',
    gray6: 'hsl(0, 0%, 88.7%)',
    gray7: 'hsl(0, 0%, 85.8%)',
    gray8: 'hsl(0, 0%, 78.0%)',
    gray9: 'hsl(0, 0%, 56.1%)',
    gray10: 'hsl(0, 0%, 52.3%)',
    gray11: 'hsl(0, 0%, 43.5%)',
    gray12: 'hsl(0, 0%, 9.0%)',
    // Radix UI Blue scale for light mode
    blue1: 'hsl(206, 100%, 99.2%)',
    blue2: 'hsl(210, 100%, 98.0%)',
    blue3: 'hsl(209, 100%, 96.5%)',
    blue4: 'hsl(210, 98.8%, 94.0%)',
    blue5: 'hsl(209, 95.0%, 90.1%)',
    blue6: 'hsl(209, 81.2%, 84.5%)',
    blue7: 'hsl(208, 77.5%, 76.9%)',
    blue8: 'hsl(206, 81.9%, 65.3%)',
    blue9: 'hsl(206, 100%, 50.0%)',
    blue10: 'hsl(208, 100%, 47.3%)',
    blue11: 'hsl(211, 100%, 43.2%)',
    blue12: 'hsl(211, 100%, 15.0%)',
    borderWidth: tokens.borderWidth[1],
  };

  const config = createTamagui({
    animations,
    tokens,
    fonts: {
      body: bodyFont,
      heading: headingFont,
    },
    themes: {
      light: lightThemeBase,
      dark: {
        background: tokens.color.bgPrimary,
        backgroundHover: tokens.color.bgSecondary,
        backgroundStrong: tokens.color.bgSecondary,
        color: tokens.color.textPrimary,
        colorHover: tokens.color.textSecondary,
        borderColor: tokens.color.border,
        placeholderColor: tokens.color.textDisabled,
        brand: tokens.color.brand,
        brandHover: tokens.color.brandWeak,
        // Radix UI Gray scale for dark mode
        gray1: 'hsl(0, 0%, 8.5%)',
        gray2: 'hsl(0, 0%, 11.0%)',
        gray3: 'hsl(0, 0%, 13.6%)',
        gray4: 'hsl(0, 0%, 15.8%)',
        gray5: 'hsl(0, 0%, 17.9%)',
        gray6: 'hsl(0, 0%, 20.5%)',
        gray7: 'hsl(0, 0%, 24.3%)',
        gray8: 'hsl(0, 0%, 31.2%)',
        gray9: 'hsl(0, 0%, 43.9%)',
        gray10: 'hsl(0, 0%, 49.4%)',
        gray11: 'hsl(0, 0%, 62.8%)',
        gray12: 'hsl(0, 0%, 93.0%)',
        // Radix UI Blue scale for dark mode
        blue1: 'hsl(212, 35.0%, 9.2%)',
        blue2: 'hsl(216, 50.0%, 11.8%)',
        blue3: 'hsl(214, 59.4%, 15.3%)',
        blue4: 'hsl(214, 65.8%, 17.9%)',
        blue5: 'hsl(213, 71.2%, 20.2%)',
        blue6: 'hsl(212, 77.4%, 23.1%)',
        blue7: 'hsl(211, 85.1%, 27.4%)',
        blue8: 'hsl(211, 89.7%, 34.1%)',
        blue9: 'hsl(206, 100%, 50.0%)',
        blue10: 'hsl(209, 100%, 60.6%)',
        blue11: 'hsl(210, 100%, 66.1%)',
        blue12: 'hsl(206, 98.0%, 95.8%)',
        borderWidth: tokens.borderWidth[1],
      },
      // Preset-specific themes
      modernFlat: {
        ...lightThemeBase,
        background: 'oklch(1.000 0.000 0)', // Pure white
        backgroundHover: tokens.color.bgSecondary,
        backgroundStrong: tokens.color.bgSecondary,
        color: tokens.color.textPrimary,
        colorHover: tokens.color.textSecondary,
        borderColor: tokens.color.border,
        borderWidth: tokens.borderWidth[1],
        placeholderColor: tokens.color.textDisabled,
        brand: tokens.color.brand,
        brandHover: tokens.color.brandWeak,
        shadow: tokens.shadow.sm,
      },
      softDreamy: {
        ...lightThemeBase,
        background: 'oklch(0.975 0.002 210)', // Off-white for shadow visibility
        backgroundHover: tokens.color.bgSecondary,
        backgroundStrong: tokens.color.bgSecondary,
        color: tokens.color.textPrimary,
        colorHover: tokens.color.textSecondary,
        borderColor: 'transparent', // No borders
        borderWidth: tokens.borderWidth[0],
        placeholderColor: tokens.color.textDisabled,
        brand: tokens.color.brand,
        brandHover: tokens.color.brandWeak,
        shadow: tokens.shadow.md,
      },
      minimalist: {
        ...lightThemeBase,
        background: 'oklch(1.000 0.000 0)', // Pure white
        backgroundHover: tokens.color.bgSecondary,
        backgroundStrong: tokens.color.bgSecondary,
        color: tokens.color.textPrimary,
        colorHover: tokens.color.textSecondary,
        borderColor: tokens.color.border,
        borderWidth: tokens.borderWidth[1],
        placeholderColor: tokens.color.textDisabled,
        brand: tokens.color.brand,
        brandHover: tokens.color.brandWeak,
        shadow: tokens.shadow.none,
      },
      neoBrutalism: {
        ...lightThemeBase,
        background: 'oklch(1.000 0.000 0)', // Pure white
        backgroundHover: tokens.color.bgSecondary,
        backgroundStrong: tokens.color.bgSecondary,
        color: tokens.color.textPrimary,
        colorHover: tokens.color.textSecondary,
        borderColor: 'oklch(0.000 0.000 0)', // Pure black
        borderWidth: tokens.borderWidth[3], // 3px thick borders
        placeholderColor: tokens.color.textDisabled,
        brand: tokens.color.brand,
        brandHover: tokens.color.brandWeak,
        shadow: tokens.shadow.md,
      },
    },
    media: {
      xs: { maxWidth: 660 },
      sm: { maxWidth: 800 },
      md: { maxWidth: 1020 },
      lg: { maxWidth: 1280 },
      xl: { maxWidth: 1420 },
      xxl: { maxWidth: 1600 },
      gtXs: { minWidth: 660 + 1 },
      gtSm: { minWidth: 800 + 1 },
      gtMd: { minWidth: 1020 + 1 },
      gtLg: { minWidth: 1280 + 1 },
      short: { maxHeight: 820 },
      tall: { minHeight: 820 },
      hoverNone: { hover: 'none' },
      pointerCoarse: { pointer: 'coarse' },
    },
  });

  return config;
};

export const config = createDynamicConfig();

/**
 * Map style preset IDs to Tamagui theme names
 */
export const getThemeNameFromPreset = (presetId: StylePresetId): string => {
  const themeMap: Record<StylePresetId, string> = {
    'modern-flat': 'modernFlat',
    'soft-dreamy': 'softDreamy',
    'minimalist': 'minimalist',
    'neo-brutalism': 'neoBrutalism',
  };

  return themeMap[presetId];
};