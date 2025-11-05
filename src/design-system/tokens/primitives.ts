/**
 * Primitive Token System - Foundation Layer
 *
 * This is Tier 1 of the 3-tier token architecture.
 * Raw values that form the foundation of the design system.
 * Uses OKLCH color space for perceptual uniformity and wide gamut support.
 */

/**
 * OKLCH Color type
 * L: Lightness (0-1, where 0 is black and 1 is white)
 * C: Chroma (0-0.4, where 0 is gray and higher is more saturated)
 * H: Hue (0-360, angle on color wheel)
 */
export interface OKLCHColor {
  l: number; // Lightness: 0-1
  c: number; // Chroma: 0-0.4
  h: number; // Hue: 0-360
}

/**
 * Generate an 11-step color scale from a base OKLCH color
 * Creates perceptually uniform steps from very light (50) to very dark (950)
 */
export function generateColorScale(
  baseName: string,
  baseColor: OKLCHColor
): Record<string, string> {
  const scale: Record<string, string> = {};

  // Lightness adjustments for each step
  const steps = {
    50: 0.45,   // Lightest - backgrounds
    100: 0.40,  // Very light
    200: 0.30,  // Light
    300: 0.20,  // Light-medium
    400: 0.10,  // Medium-light
    500: 0,     // Base color
    600: -0.10, // Medium-dark
    700: -0.15, // Dark
    800: -0.20, // Very dark
    900: -0.25, // Darkest
    950: -0.30  // Almost black
  };

  // Chroma adjustments - less saturated at extremes
  const chromaMultipliers = {
    50: 0.3,   // Very desaturated for light backgrounds
    100: 0.4,
    200: 0.5,
    300: 0.7,
    400: 0.85,
    500: 1,    // Full saturation
    600: 1,
    700: 0.9,
    800: 0.8,
    900: 0.7,
    950: 0.6   // Less saturated when very dark
  };

  Object.entries(steps).forEach(([step, lightnessAdjust]) => {
    const stepNum = Number(step);
    const newLightness = Math.max(0, Math.min(1, baseColor.l + lightnessAdjust));
    const newChroma = baseColor.c * chromaMultipliers[stepNum];

    // Slight hue shift for more natural scales (optional, can be removed)
    // Cooler (bluer) when lighter, warmer when darker
    const hueShift = stepNum < 500 ? -2 : stepNum > 500 ? 2 : 0;
    const newHue = (baseColor.h + hueShift + 360) % 360;

    scale[step] = `oklch(${newLightness.toFixed(3)} ${newChroma.toFixed(3)} ${newHue.toFixed(1)})`;
  });

  return scale;
}

/**
 * Convert hex color to OKLCH
 * This is a simplified conversion - in production you'd use a library like culori
 */
export function hexToOKLCH(hex: string): OKLCHColor {
  // Remove # if present
  hex = hex.replace('#', '');

  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  // Simplified RGB to OKLCH conversion
  // This is approximate - use a proper color library for production
  const lightness = (0.299 * r + 0.587 * g + 0.114 * b) * 0.8;
  const chroma = Math.sqrt(
    Math.pow(r - lightness, 2) +
    Math.pow(g - lightness, 2) +
    Math.pow(b - lightness, 2)
  ) * 0.5;

  // Calculate hue from RGB (simplified)
  let hue = 0;
  if (r >= g && r >= b) {
    hue = ((g - b) / (r - Math.min(g, b))) * 60;
  } else if (g >= r && g >= b) {
    hue = (2 + (b - r) / (g - Math.min(r, b))) * 60;
  } else {
    hue = (4 + (r - g) / (b - Math.min(r, g))) * 60;
  }
  hue = (hue + 360) % 360;

  return { l: lightness, c: chroma, h: hue };
}

/**
 * Core Primitive Color Scales
 * These form the foundation of the color system
 */
export const primitiveColors = {
  // Grayscale - using OKLCH for perfect neutrals
  gray: {
    50: 'oklch(0.985 0.002 210)',  // Nearly white
    100: 'oklch(0.975 0.002 210)',
    200: 'oklch(0.925 0.004 210)',
    300: 'oklch(0.850 0.006 210)',
    400: 'oklch(0.700 0.008 210)',
    500: 'oklch(0.550 0.010 210)',  // Middle gray
    600: 'oklch(0.450 0.008 210)',
    700: 'oklch(0.350 0.006 210)',
    800: 'oklch(0.250 0.004 210)',
    900: 'oklch(0.150 0.002 210)',
    950: 'oklch(0.075 0.002 210)'   // Nearly black
  },

  // Brand colors - will be generated dynamically
  // Default to a nice teal
  blue: generateColorScale('blue', { l: 0.50, c: 0.20, h: 237 }),
  teal: generateColorScale('teal', { l: 0.50, c: 0.18, h: 185 }),
  green: generateColorScale('green', { l: 0.52, c: 0.19, h: 145 }),
  yellow: generateColorScale('yellow', { l: 0.70, c: 0.18, h: 95 }),
  orange: generateColorScale('orange', { l: 0.60, c: 0.20, h: 55 }),
  red: generateColorScale('red', { l: 0.50, c: 0.22, h: 25 }),
  purple: generateColorScale('purple', { l: 0.50, c: 0.20, h: 290 }),
  pink: generateColorScale('pink', { l: 0.55, c: 0.18, h: 350 }),

  // Special values
  white: 'oklch(1.000 0.000 0)',
  black: 'oklch(0.000 0.000 0)',
  transparent: 'transparent'
};

/**
 * Spacing Scale (8-point grid)
 * Using pixel values that will be converted to rem/em as needed
 */
export const primitiveSpacing = {
  0: 0,      // 0px
  0.5: 2,    // 2px
  1: 4,      // 4px - smallest unit
  1.5: 6,    // 6px
  2: 8,      // 8px - base unit
  2.5: 10,   // 10px
  3: 12,     // 12px
  3.5: 14,   // 14px
  4: 16,     // 16px - common padding
  5: 20,     // 20px
  6: 24,     // 24px
  7: 28,     // 28px
  8: 32,     // 32px
  9: 36,     // 36px
  10: 40,    // 40px
  11: 44,    // 44px
  12: 48,    // 48px - large spacing
  14: 56,    // 56px
  16: 64,    // 64px
  20: 80,    // 80px
  24: 96,    // 96px
  28: 112,   // 112px
  32: 128,   // 128px
  36: 144,   // 144px
  40: 160,   // 160px
  44: 176,   // 176px
  48: 192,   // 192px
  52: 208,   // 208px
  56: 224,   // 224px
  60: 240,   // 240px
  64: 256,   // 256px - maximum spacing
};

/**
 * Typography Primitives
 */
export const primitiveFontSizes = {
  xs: 12,    // Small labels, captions
  sm: 14,    // Secondary text
  md: 16,    // Body text (base)
  lg: 18,    // Emphasized body
  xl: 20,    // Small headings
  '2xl': 24, // H3
  '3xl': 30, // H2
  '4xl': 36, // H1
  '5xl': 48, // Display
  '6xl': 60, // Hero
  '7xl': 72, // Massive display
  '8xl': 96, // Extreme display
  '9xl': 128 // Maximum
};

export const primitiveLineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 1.75,
  double: 2
};

export const primitiveFontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
};

export const primitiveLetterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em'
};

/**
 * Border Radius Primitives
 */
export const primitiveRadii = {
  none: 0,
  sm: 4,     // Subtle rounding
  md: 8,     // Default buttons/inputs
  lg: 12,    // Cards
  xl: 16,    // Large cards
  '2xl': 24, // Extra rounded
  '3xl': 32, // Very rounded
  full: 9999 // Pills, circles
};

/**
 * Shadow Primitives (for elevation)
 * Defined as complete shadow strings for web
 */
export const primitiveShadows = {
  none: 'none',
  xs: '0 1px 2px 0 oklch(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 oklch(0 0 0 / 0.1), 0 1px 2px -1px oklch(0 0 0 / 0.1)',
  md: '0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px oklch(0 0 0 / 0.1), 0 4px 6px -4px oklch(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px oklch(0 0 0 / 0.1), 0 8px 10px -6px oklch(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px oklch(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 oklch(0 0 0 / 0.05)'
};

/**
 * Animation Primitives
 */
export const primitiveTransitions = {
  none: 'none',
  all: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  colors: 'color, background-color, border-color, text-decoration-color, fill, stroke 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  shadow: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)'
};

export const primitiveDurations = {
  instant: 75,
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
  slowest: 1000
};

export const primitiveEasings = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
};

/**
 * Z-Index Scale
 */
export const primitiveZIndices = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
  max: 9999
};

/**
 * Export all primitives as a single object
 */
export const primitiveTokens = {
  colors: primitiveColors,
  spacing: primitiveSpacing,
  fontSizes: primitiveFontSizes,
  lineHeights: primitiveLineHeights,
  fontWeights: primitiveFontWeights,
  letterSpacing: primitiveLetterSpacing,
  radii: primitiveRadii,
  shadows: primitiveShadows,
  transitions: primitiveTransitions,
  durations: primitiveDurations,
  easings: primitiveEasings,
  zIndices: primitiveZIndices
};