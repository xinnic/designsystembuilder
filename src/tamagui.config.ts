import { createTamagui, createTokens, createFont } from '@tamagui/core';
import { createAnimations } from '@tamagui/animations-react-native';
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
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      true: 1,
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
    bouncy: {
      type: 'spring',
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    lazy: {
      type: 'spring',
      damping: 20,
      stiffness: 60,
    },
    quick: {
      type: 'spring',
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
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

  const config = createTamagui({
    animations,
    tokens,
    fonts: {
      body: bodyFont,
      heading: headingFont,
    },
    themes: {
      light: {
        background: tokens.color.bgPrimary,
        backgroundHover: tokens.color.bgSecondary,
        backgroundStrong: tokens.color.bgSecondary,
        color: tokens.color.textPrimary,
        colorHover: tokens.color.textSecondary,
        borderColor: tokens.color.border,
        placeholderColor: tokens.color.textDisabled,
        brand: tokens.color.brand,
        brandHover: tokens.color.brandWeak,
      },
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
      },
      // Preset-specific themes
      modernFlat: {
        background: 'oklch(1.000 0.000 0)', // Pure white
        backgroundHover: tokens.color.bgSecondary,
        backgroundStrong: tokens.color.bgSecondary,
        color: tokens.color.textPrimary,
        colorHover: tokens.color.textSecondary,
        borderColor: 'oklch(0.925 0.004 210)', // Soft grey border
        borderWidth: tokens.borderWidth[1],
        placeholderColor: tokens.color.textDisabled,
        brand: tokens.color.brand,
        brandHover: tokens.color.brandWeak,
        shadow: tokens.shadow.sm,
      },
      softDreamy: {
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
        background: 'oklch(1.000 0.000 0)', // Pure white
        backgroundHover: tokens.color.bgSecondary,
        backgroundStrong: tokens.color.bgSecondary,
        color: tokens.color.textPrimary,
        colorHover: tokens.color.textSecondary,
        borderColor: 'oklch(0.925 0.004 210)', // Very light gray
        borderWidth: tokens.borderWidth[1],
        placeholderColor: tokens.color.textDisabled,
        brand: tokens.color.brand,
        brandHover: tokens.color.brandWeak,
        shadow: tokens.shadow.none,
      },
      neoBrutalism: {
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