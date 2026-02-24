/**
 * Tamagui Configuration with 3-Tier Token System
 *
 * Maps our OKLCH-based token system to Tamagui's configuration.
 * Enables real-time theme updates through CSS variables.
 */

import { createTamagui, createTokens, createFont } from '@tamagui/core';
import { createAnimations } from '@tamagui/animations-react-native';

/**
 * Create a dynamic Tamagui config that reads from CSS variables
 * This enables real-time theme updates without rebuilding
 */
export const createDynamicConfig = () => {
  // Map our semantic tokens to Tamagui tokens through CSS variables
  const tokens = createTokens({
    color: {
      // Canvas/Background colors
      background: 'var(--color-canvas-default)',
      backgroundSubtle: 'var(--color-canvas-subtle)',
      backgroundMuted: 'var(--color-canvas-muted)',

      // Surface colors
      surface: 'var(--color-surface-default)',
      surfaceSubtle: 'var(--color-surface-subtle)',
      surfaceMuted: 'var(--color-surface-muted)',
      surfaceElevated: 'var(--color-surface-elevated)',

      // Text colors
      text: 'var(--color-text-primary)',
      textSecondary: 'var(--color-text-secondary)',
      textTertiary: 'var(--color-text-tertiary)',
      textDisabled: 'var(--color-text-disabled)',
      textInverse: 'var(--color-text-inverse)',
      textLink: 'var(--color-text-link)',

      // Border colors
      border: 'var(--color-border-default)',
      borderSubtle: 'var(--color-border-subtle)',
      borderStrong: 'var(--color-border-strong)',

      // Primary brand colors
      primary: 'var(--color-primary-default)',
      primaryHover: 'var(--color-primary-hover)',
      primaryActive: 'var(--color-primary-active)',
      primarySubtle: 'var(--color-primary-subtle)',
      primaryForeground: 'var(--color-primary-foreground)',

      // Secondary colors
      secondary: 'var(--color-secondary-default)',
      secondaryHover: 'var(--color-secondary-hover)',
      secondaryActive: 'var(--color-secondary-active)',
      secondarySubtle: 'var(--color-secondary-subtle)',
      secondaryForeground: 'var(--color-secondary-foreground)',

      // Status colors
      success: 'var(--color-success-default)',
      successSubtle: 'var(--color-success-subtle)',
      successForeground: 'var(--color-success-foreground)',

      warning: 'var(--color-warning-default)',
      warningSubtle: 'var(--color-warning-subtle)',
      warningForeground: 'var(--color-warning-foreground)',

      danger: 'var(--color-danger-default)',
      dangerSubtle: 'var(--color-danger-subtle)',
      dangerForeground: 'var(--color-danger-foreground)',

      info: 'var(--color-info-default)',
      infoSubtle: 'var(--color-info-subtle)',
      infoForeground: 'var(--color-info-foreground)',

      // Muted colors
      muted: 'var(--color-muted-default)',
      mutedSubtle: 'var(--color-muted-subtle)',
      mutedForeground: 'var(--color-muted-foreground)',

      // Focus colors
      focus: 'var(--color-focus-ring)',
      focusBorder: 'var(--color-focus-border)',

      // Overlay colors
      overlay: 'var(--color-overlay-default)',
      overlaySubtle: 'var(--color-overlay-subtle)',

      // Color scales (for advanced use)
      gray50: 'var(--color-gray-50)',
      gray100: 'var(--color-gray-100)',
      gray200: 'var(--color-gray-200)',
      gray300: 'var(--color-gray-300)',
      gray400: 'var(--color-gray-400)',
      gray500: 'var(--color-gray-500)',
      gray600: 'var(--color-gray-600)',
      gray700: 'var(--color-gray-700)',
      gray800: 'var(--color-gray-800)',
      gray900: 'var(--color-gray-900)',
      gray950: 'var(--color-gray-950)',

      // Brand color scale
      brand50: 'var(--color-brand-50)',
      brand100: 'var(--color-brand-100)',
      brand200: 'var(--color-brand-200)',
      brand300: 'var(--color-brand-300)',
      brand400: 'var(--color-brand-400)',
      brand500: 'var(--color-brand-500)',
      brand600: 'var(--color-brand-600)',
      brand700: 'var(--color-brand-700)',
      brand800: 'var(--color-brand-800)',
      brand900: 'var(--color-brand-900)',
      brand950: 'var(--color-brand-950)',
    },

    space: {
      0: 'var(--spacing-0)',
      0.5: 'var(--spacing-0-5)',
      1: 'var(--spacing-1)',
      1.5: 'var(--spacing-1-5)',
      2: 'var(--spacing-2)',
      2.5: 'var(--spacing-2-5)',
      3: 'var(--spacing-3)',
      3.5: 'var(--spacing-3-5)',
      4: 'var(--spacing-4)',
      5: 'var(--spacing-5)',
      6: 'var(--spacing-6)',
      7: 'var(--spacing-7)',
      8: 'var(--spacing-8)',
      9: 'var(--spacing-9)',
      10: 'var(--spacing-10)',
      11: 'var(--spacing-11)',
      12: 'var(--spacing-12)',
      14: 'var(--spacing-14)',
      16: 'var(--spacing-16)',
      20: 'var(--spacing-20)',
      24: 'var(--spacing-24)',
      28: 'var(--spacing-28)',
      32: 'var(--spacing-32)',
      36: 'var(--spacing-36)',
      40: 'var(--spacing-40)',
      44: 'var(--spacing-44)',
      48: 'var(--spacing-48)',
      52: 'var(--spacing-52)',
      56: 'var(--spacing-56)',
      60: 'var(--spacing-60)',
      64: 'var(--spacing-64)',
      true: 'var(--spacing-4)', // Default
    },

    size: {
      0: 'var(--spacing-0)',
      0.5: 'var(--spacing-0-5)',
      1: 'var(--spacing-1)',
      2: 'var(--spacing-2)',
      3: 'var(--spacing-3)',
      4: 'var(--spacing-4)',
      5: 'var(--spacing-5)',
      6: 'var(--spacing-6)',
      8: 'var(--spacing-8)',
      10: 'var(--spacing-10)',
      12: 'var(--spacing-12)',
      14: 'var(--spacing-14)',
      16: 'var(--spacing-16)',
      20: 'var(--spacing-20)',
      24: 'var(--spacing-24)',
      28: 'var(--spacing-28)',
      32: 'var(--spacing-32)',
      36: 'var(--spacing-36)',
      40: 'var(--spacing-40)',
      44: 'var(--spacing-44)',
      48: 'var(--spacing-48)',
      52: 'var(--spacing-52)',
      56: 'var(--spacing-56)',
      60: 'var(--spacing-60)',
      64: 'var(--spacing-64)',
      true: 'var(--spacing-12)', // Default
    },

    radius: {
      0: 'var(--radius-none)',
      1: 'var(--radius-sm)',
      2: 'var(--radius-md)',
      3: 'var(--radius-lg)',
      4: 'var(--radius-xl)',
      5: 'var(--radius-2xl)',
      6: 'var(--radius-3xl)',
      true: 'var(--radius-md)', // Default
      full: 'var(--radius-full)',
    },

    zIndex: {
      hide: 'var(--z-hide)',
      0: 'var(--z-base)',
      1: 'var(--z-dropdown)',
      2: 'var(--z-sticky)',
      3: 'var(--z-overlay)',
      4: 'var(--z-modal)',
      5: 'var(--z-popover)',
      6: 'var(--z-tooltip)',
      max: 'var(--z-max)',
    },
  });

  // Enhanced animations with our timing tokens
  const animations = createAnimations({
    instant: {
      type: 'timing',
      duration: parseInt('var(--duration-instant)'.replace(/\D/g, '') || '75'),
    },
    fast: {
      type: 'timing',
      duration: parseInt('var(--duration-fast)'.replace(/\D/g, '') || '150'),
    },
    normal: {
      type: 'timing',
      duration: parseInt('var(--duration-normal)'.replace(/\D/g, '') || '300'),
    },
    slow: {
      type: 'timing',
      duration: parseInt('var(--duration-slow)'.replace(/\D/g, '') || '500'),
    },
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

  // Font configuration using typography tokens
  const bodyFont = createFont({
    family: 'var(--font-family)',
    size: {
      xs: 'var(--font-size-xs)',
      sm: 'var(--font-size-sm)',
      md: 'var(--font-size-md)',
      lg: 'var(--font-size-lg)',
      xl: 'var(--font-size-xl)',
      '2xl': 'var(--font-size-2xl)',
      '3xl': 'var(--font-size-3xl)',
      '4xl': 'var(--font-size-4xl)',
      '5xl': 'var(--font-size-5xl)',
      '6xl': 'var(--font-size-6xl)',
      true: 'var(--font-size-md)',
    },
    lineHeight: {
      xs: 'var(--line-height-tight)',
      sm: 'var(--line-height-snug)',
      md: 'var(--line-height-normal)',
      lg: 'var(--line-height-normal)',
      xl: 'var(--line-height-relaxed)',
      '2xl': 'var(--line-height-relaxed)',
      '3xl': 'var(--line-height-loose)',
      '4xl': 'var(--line-height-loose)',
      '5xl': 'var(--line-height-loose)',
      '6xl': 'var(--line-height-loose)',
      true: 'var(--line-height-normal)',
    },
    weight: {
      thin: 'var(--font-weight-thin)',
      light: 'var(--font-weight-light)',
      normal: 'var(--font-weight-normal)',
      medium: 'var(--font-weight-medium)',
      semibold: 'var(--font-weight-semibold)',
      bold: 'var(--font-weight-bold)',
      extrabold: 'var(--font-weight-extrabold)',
      black: 'var(--font-weight-black)',
      true: 'var(--font-weight-normal)',
    },
    letterSpacing: {
      tight: 'var(--letter-spacing-tight)',
      normal: 'var(--letter-spacing-normal)',
      wide: 'var(--letter-spacing-wide)',
      true: 'var(--letter-spacing-normal)',
    },
  });

  const headingFont = createFont({
    family: 'var(--font-display)',
    size: {
      xs: 'var(--font-size-md)',
      sm: 'var(--font-size-lg)',
      md: 'var(--font-size-xl)',
      lg: 'var(--font-size-2xl)',
      xl: 'var(--font-size-3xl)',
      '2xl': 'var(--font-size-4xl)',
      '3xl': 'var(--font-size-5xl)',
      '4xl': 'var(--font-size-6xl)',
      true: 'var(--font-size-2xl)',
    },
    lineHeight: {
      xs: 'var(--line-height-tight)',
      sm: 'var(--line-height-tight)',
      md: 'var(--line-height-tight)',
      lg: 'var(--line-height-tight)',
      xl: 'var(--line-height-tight)',
      '2xl': 'var(--line-height-tight)',
      '3xl': 'var(--line-height-tight)',
      '4xl': 'var(--line-height-tight)',
      true: 'var(--line-height-tight)',
    },
    weight: {
      normal: 'var(--font-weight-medium)',
      medium: 'var(--font-weight-semibold)',
      bold: 'var(--font-weight-bold)',
      extrabold: 'var(--font-weight-extrabold)',
      true: 'var(--font-weight-bold)',
    },
    letterSpacing: {
      tight: 'var(--letter-spacing-tight)',
      normal: 'var(--letter-spacing-normal)',
      true: 'var(--letter-spacing-tight)',
    },
  });

  // Create the Tamagui config
  const config = createTamagui({
    animations,
    tokens,
    fonts: {
      body: bodyFont,
      heading: headingFont,
    },
    themes: {
      // Light theme using semantic tokens
      light: {
        background: tokens.color.background,
        backgroundHover: tokens.color.backgroundSubtle,
        backgroundPress: tokens.color.backgroundMuted,
        backgroundStrong: tokens.color.surface,

        color: tokens.color.text,
        colorHover: tokens.color.textSecondary,
        colorPress: tokens.color.text,
        colorTransparent: 'transparent',

        borderColor: tokens.color.border,
        borderColorHover: tokens.color.borderStrong,
        borderColorPress: tokens.color.borderStrong,

        placeholderColor: tokens.color.textDisabled,
        shadowColor: 'oklch(0 0 0 / 0.1)',
      },

      // Dark theme using semantic tokens (automatically switches)
      dark: {
        background: tokens.color.background,
        backgroundHover: tokens.color.backgroundSubtle,
        backgroundPress: tokens.color.backgroundMuted,
        backgroundStrong: tokens.color.surface,

        color: tokens.color.text,
        colorHover: tokens.color.textSecondary,
        colorPress: tokens.color.text,
        colorTransparent: 'transparent',

        borderColor: tokens.color.border,
        borderColorHover: tokens.color.borderStrong,
        borderColorPress: tokens.color.borderStrong,

        placeholderColor: tokens.color.textDisabled,
        shadowColor: 'oklch(0 0 0 / 0.3)',
      },

      // Component-specific theme variants
      primary: {
        background: tokens.color.primary,
        backgroundHover: tokens.color.primaryHover,
        backgroundPress: tokens.color.primaryActive,
        backgroundStrong: tokens.color.primary,
        color: tokens.color.primaryForeground,
        borderColor: tokens.color.primary,
      },

      secondary: {
        background: tokens.color.secondary,
        backgroundHover: tokens.color.secondaryHover,
        backgroundPress: tokens.color.secondaryActive,
        backgroundStrong: tokens.color.secondary,
        color: tokens.color.secondaryForeground,
        borderColor: tokens.color.secondary,
      },

      success: {
        background: tokens.color.success,
        backgroundHover: tokens.color.successSubtle,
        color: tokens.color.successForeground,
        borderColor: tokens.color.success,
      },

      danger: {
        background: tokens.color.danger,
        backgroundHover: tokens.color.dangerSubtle,
        color: tokens.color.dangerForeground,
        borderColor: tokens.color.danger,
      },

      warning: {
        background: tokens.color.warning,
        backgroundHover: tokens.color.warningSubtle,
        color: tokens.color.warningForeground,
        borderColor: tokens.color.warning,
      },

      info: {
        background: tokens.color.info,
        backgroundHover: tokens.color.infoSubtle,
        color: tokens.color.infoForeground,
        borderColor: tokens.color.info,
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

// Export the default config
export const config = createDynamicConfig();

// Export type for use in components
export type TamaguiConfig = typeof config;

export default config;