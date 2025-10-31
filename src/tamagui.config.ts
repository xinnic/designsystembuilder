import { createTamagui, createTokens } from '@tamagui/core';
import { createAnimations } from '@tamagui/animations-react-native';
import { createInterFont } from '@tamagui/font-inter';
import { useDesignSystem } from './state/designSystem';

// This will be dynamically updated based on our design system
export const createDynamicConfig = () => {
  const designSystem = useDesignSystem.getState();

  // Convert our tokens to Tamagui format
  const tokens = createTokens({
    color: {
      // Brand colors
      brand: `rgb(${designSystem.tokens.brand})`,
      brandWeak: `rgb(${designSystem.tokens.brandWeak})`,

      // Text colors
      textPrimary: `rgb(${designSystem.tokens.textPrimary})`,
      textSecondary: `rgb(${designSystem.tokens.textSecondary})`,
      textDisabled: `rgb(${designSystem.tokens.textDisabled})`,

      // Background colors
      bgPrimary: `rgb(${designSystem.tokens.bgPrimary})`,
      bgSecondary: `rgb(${designSystem.tokens.bgSecondary})`,

      // Border
      border: `rgb(${designSystem.tokens.border})`,

      // Semantic colors
      focus: `rgb(${designSystem.tokens.focus})`,
      success: `rgb(${designSystem.tokens.success})`,
      warning: `rgb(${designSystem.tokens.warning})`,
      info: `rgb(${designSystem.tokens.info})`,
      danger: `rgb(${designSystem.tokens.danger})`,
    },

    space: designSystem.tokens.space.reduce((acc, val, i) => {
      acc[i] = val;
      return acc;
    }, {} as Record<number, number>),

    size: designSystem.tokens.space.reduce((acc, val, i) => {
      acc[i] = val;
      return acc;
    }, {} as Record<number, number>),

    radius: {
      0: 0,
      1: parseInt(designSystem.tokens.radius.sm),
      2: parseInt(designSystem.tokens.radius.md),
      3: parseInt(designSystem.tokens.radius.lg),
      4: parseInt(designSystem.tokens.radius.full),
      true: parseInt(designSystem.tokens.radius.md),
    },

    zIndex: {
      0: 0,
      1: 100,
      2: 200,
      3: 300,
      4: 400,
      5: 500,
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

  const interFont = createInterFont();

  const config = createTamagui({
    animations,
    tokens,
    fonts: {
      body: interFont,
      heading: interFont,
    },
    themes: {
      light: {
        background: tokens.color.bgPrimary,
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
        backgroundStrong: tokens.color.bgSecondary,
        color: tokens.color.textPrimary,
        colorHover: tokens.color.textSecondary,
        borderColor: tokens.color.border,
        placeholderColor: tokens.color.textDisabled,
        brand: tokens.color.brand,
        brandHover: tokens.color.brandWeak,
      }
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