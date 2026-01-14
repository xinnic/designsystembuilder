import { createTamagui, createTokens, createFont } from '@tamagui/core';
import { createAnimations } from '@tamagui/animations-react-native';
import type { StylePresetId } from './config/stylePresets';

// Bridge our CSS variables to Tamagui tokens
// This makes Tamagui reactive - when CSS variables change, components update automatically
export const createDynamicConfig = () => {
  // Map our CSS variables to Tamagui tokens
  const tokens = createTokens({
    color: {
      // Brand colors
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
      1: 'var(--space-1)',
      2: 'var(--space-2)',
      3: 'var(--space-3)',
      4: 'var(--space-4)',
      5: 'var(--space-5)',
      6: 'var(--space-6)',
      7: 'var(--space-7, 64px)',
      8: 'var(--space-8, 80px)',
      true: 'var(--space-2)',
    },

    size: {
      1: 'var(--space-1)',
      2: 'var(--space-2)',
      3: 'var(--space-3)',
      4: 'var(--space-4)',
      5: 'var(--space-5)',
      6: 'var(--space-6)',
      7: 'var(--space-7, 64px)',
      8: 'var(--space-8, 80px)',
      true: 'var(--space-4)',
    },

    radius: {
      0: '0px',
      1: 'var(--radius-sm)',
      2: 'var(--radius-md)',
      3: 'var(--radius-lg)',
      4: 'var(--radius-full)',
      true: 'var(--radius-md)',
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
      0: '0px',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      true: '1px',
    },

    shadow: {
      none: 'none',
      sm: 'var(--shadow-sm)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
      true: 'var(--shadow-sm)',
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

  // Map our typography CSS variables to Tamagui fonts
  const bodyFont = createFont({
    family: 'var(--font-family)',
    size: {
      1: 'var(--font-caption-size)',
      2: 'var(--font-body-size)',
      3: 'var(--font-subhead-size)',
      4: 'var(--font-h2-size)',
      5: 'var(--font-h1-size)',
      6: 'var(--font-display-size)',
      true: 'var(--font-body-size)',
    },
    lineHeight: {
      1: 'var(--font-caption-line)',
      2: 'var(--font-body-line)',
      3: 'var(--font-subhead-line)',
      4: 'var(--font-h2-line)',
      5: 'var(--font-h1-line)',
      6: 'var(--font-display-line)',
      true: 'var(--font-body-line)',
    },
    weight: {
      4: '400',
      5: '500',
      6: '600',
      7: '700',
      true: '400',
    },
    letterSpacing: {
      4: '0',
      5: '0',
      6: '0',
      7: '0',
      true: '0',
    },
  });

  const headingFont = createFont({
    family: 'var(--font-display)',
    size: {
      1: 'var(--font-caption-size)',
      2: 'var(--font-body-size)',
      3: 'var(--font-subhead-size)',
      4: 'var(--font-h2-size)',
      5: 'var(--font-h1-size)',
      6: 'var(--font-display-size)',
      true: 'var(--font-h1-size)',
    },
    lineHeight: {
      1: 'var(--font-caption-line)',
      2: 'var(--font-body-line)',
      3: 'var(--font-subhead-line)',
      4: 'var(--font-h2-line)',
      5: 'var(--font-h1-line)',
      6: 'var(--font-display-line)',
      true: 'var(--font-h1-line)',
    },
    weight: {
      4: '400',
      5: '500',
      6: '600',
      7: '700',
      true: '700',
    },
    letterSpacing: {
      4: '0',
      5: '0',
      6: '0',
      7: '0',
      true: '0',
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