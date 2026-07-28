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

    // Space stays NUMERIC.
    //
    // Tamagui's built-in components (Switch, Checkbox, RadioGroup, Slider,
    // ToggleGroup, Tabs, Select, Input) derive their own dimensions by indexing
    // and shifting along this scale. Given CSS-variable strings it can't do that
    // arithmetic, and they silently collapse — a Switch rendered 24×14, a radio
    // dot 6×6, a Select row picked up 256px of padding.
    //
    // The Spacing Scale control is applied instead through the `--space-N`
    // variables that our own components bind to (see useTokenSystem).
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

    // A COMPONENT-size ramp, not a spacing ramp. Tamagui's built-in controls
    // (Switch, Checkbox, RadioGroup, Tabs, Select) take their height from this
    // scale, and `$true` is what an unsized control falls back to. It used to
    // be 16pt, which is why every switch, checkbox and radio rendered at a
    // fraction of a tap target.
    size: {
      1: 20,
      2: 28,
      3: 36,
      4: 44,
      5: 52,
      6: 64,
      7: 74,
      8: 84,
      9: 94,
      10: 104,
      11: 124,
      12: 144,
      13: 164,
      14: 184,
      15: 204,
      16: 224,
      true: 44,
    },

    // Radius is the style preset's shape profile scaled by the Corner Radius
    // control. Component-level aliases ($card / $button / $input) let a preset
    // give cards and buttons different roundness from one another.
    radius: {
      0: 'var(--radius-none)',
      1: 'var(--radius-sm)',
      2: 'var(--radius-md)',
      3: 'var(--radius-lg)',
      4: 'var(--radius-xl)',
      5: 'var(--radius-full)',
      8: 'var(--radius-xl)',
      10: 'var(--radius-full)',
      true: 'var(--radius-md)',
      full: 'var(--radius-full)',
      round: 'var(--radius-full)',
      card: 'var(--card-radius)',
      button: 'var(--button-radius)',
      input: 'var(--input-radius)',
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
      sm: 'var(--shadow-sm)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
      true: 'var(--shadow-sm)',
    },
  });

  const animations = createAnimations({
    bouncy: 'ease-in 200ms',
    lazy: 'ease-out 400ms',
    quick: 'ease-in-out 100ms',
    fast: 'ease-in-out 150ms',
  });

  // Type tokens resolve through CSS variables written by `useTokenSystem` from
  // the Type Scale control, so changing the scale moves every surface at once.
  // Numeric keys ($1…$6) are kept for back-compat and alias the named steps.
  const fontSizes = {
    1: 'var(--font-size-caption)',
    2: 'var(--font-size-body)',
    3: 'var(--font-size-subhead)',
    4: 'var(--font-size-h2)',
    5: 'var(--font-size-h1)',
    6: 'var(--font-size-display)',
    display: 'var(--font-size-display)',
    h1: 'var(--font-size-h1)',
    h2: 'var(--font-size-h2)',
    h3: 'var(--font-size-h3)',
    subhead: 'var(--font-size-subhead)',
    body: 'var(--font-size-body)',
    caption: 'var(--font-size-caption)',
    button: 'var(--font-size-button)',
    eyebrow: 'var(--font-size-eyebrow)',
    true: 'var(--font-size-body)',
  };

  const fontLineHeights = {
    1: 'var(--line-height-caption)',
    2: 'var(--line-height-body)',
    3: 'var(--line-height-subhead)',
    4: 'var(--line-height-h2)',
    5: 'var(--line-height-h1)',
    6: 'var(--line-height-display)',
    display: 'var(--line-height-display)',
    h1: 'var(--line-height-h1)',
    h2: 'var(--line-height-h2)',
    h3: 'var(--line-height-h3)',
    subhead: 'var(--line-height-subhead)',
    body: 'var(--line-height-body)',
    caption: 'var(--line-height-caption)',
    button: 'var(--line-height-button)',
    eyebrow: 'var(--line-height-eyebrow)',
    true: 'var(--line-height-body)',
  };

  const fontWeights = {
    4: '400',
    5: '500',
    6: '600',
    7: '700',
    display: 'var(--font-weight-display)',
    h1: 'var(--font-weight-h1)',
    h2: 'var(--font-weight-h2)',
    h3: 'var(--font-weight-h3)',
    subhead: 'var(--font-weight-subhead)',
    body: 'var(--font-weight-body)',
    caption: 'var(--font-weight-caption)',
    button: 'var(--font-weight-button)',
    eyebrow: 'var(--font-weight-eyebrow)',
    true: '400',
  };

  const fontLetterSpacing = {
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    display: '-0.02em',
    h1: '-0.015em',
    h2: '-0.01em',
    h3: '-0.005em',
    subhead: 0,
    body: 0,
    caption: 0,
    button: '0.02em',
    eyebrow: '0.05em',
    true: 0,
  };

  const bodyFont = createFont({
    family: 'var(--font-family), "Plus Jakarta Sans", ui-sans-serif, system-ui',
    size: fontSizes,
    lineHeight: fontLineHeights,
    weight: { ...fontWeights, true: '400' },
    letterSpacing: fontLetterSpacing,
  });

  const headingFont = createFont({
    family: 'var(--font-display), "Plus Jakarta Sans", ui-sans-serif, system-ui',
    size: fontSizes,
    lineHeight: fontLineHeights,
    weight: { ...fontWeights, true: '700' },
    letterSpacing: fontLetterSpacing,
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
/**
 * Register the config with Tamagui's type system.
 *
 * Without this augmentation every token (`$brand`, `$4`, `$h2`) types as
 * `never`, which is why style props across the app don't type-check.
 */
export type AppConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
