/**
 * Semantic Token System - Context Layer
 *
 * This is Tier 2 of the 3-tier token architecture.
 * Maps primitive values to contextual meanings that can change with themes.
 * Enables automatic dark mode and theme switching.
 */

import { primitiveColors, primitiveSpacing, primitiveFontSizes, primitiveRadii } from './primitives';

/**
 * Semantic Token Structure
 * Each token can have light and dark mode values
 */
export interface SemanticToken {
  light: string;
  dark: string;
}

/**
 * Create a semantic token with light/dark values
 */
function semantic(light: string, dark: string): SemanticToken {
  return { light, dark };
}

/**
 * Color Semantic Tokens
 * These map primitive colors to meaningful contexts
 */
export const semanticColors = {
  // Canvas Layer - The page/app background
  canvas: {
    default: semantic(primitiveColors.gray[50], primitiveColors.gray[950]),
    subtle: semantic(primitiveColors.gray[100], primitiveColors.gray[900]),
    muted: semantic(primitiveColors.gray[200], primitiveColors.gray[800])
  },

  // Surface Layer - Cards, panels, elevated content
  surface: {
    default: semantic(primitiveColors.white, primitiveColors.gray[900]),
    subtle: semantic(primitiveColors.gray[50], primitiveColors.gray[850]),
    muted: semantic(primitiveColors.gray[100], primitiveColors.gray[800]),
    elevated: semantic(primitiveColors.white, primitiveColors.gray[850])
  },

  // Text Colors
  text: {
    primary: semantic(primitiveColors.gray[900], primitiveColors.gray[50]),
    secondary: semantic(primitiveColors.gray[600], primitiveColors.gray[400]),
    tertiary: semantic(primitiveColors.gray[500], primitiveColors.gray[500]),
    disabled: semantic(primitiveColors.gray[400], primitiveColors.gray[600]),
    inverse: semantic(primitiveColors.white, primitiveColors.gray[950]),
    link: semantic(primitiveColors.blue[600], primitiveColors.blue[400]),
    linkHover: semantic(primitiveColors.blue[700], primitiveColors.blue[300])
  },

  // Icon Colors
  icon: {
    default: semantic(primitiveColors.gray[600], primitiveColors.gray[400]),
    secondary: semantic(primitiveColors.gray[500], primitiveColors.gray[500]),
    disabled: semantic(primitiveColors.gray[400], primitiveColors.gray[600]),
    inverse: semantic(primitiveColors.white, primitiveColors.gray[950]),
    interactive: semantic(primitiveColors.gray[700], primitiveColors.gray[300]),
    interactiveHover: semantic(primitiveColors.gray[900], primitiveColors.gray[100])
  },

  // Border Colors
  border: {
    default: semantic(primitiveColors.gray[200], primitiveColors.gray[800]),
    hover: semantic(primitiveColors.gray[300], primitiveColors.gray[700]),
    active: semantic(primitiveColors.gray[400], primitiveColors.gray[600]),
    subtle: semantic(primitiveColors.gray[100], primitiveColors.gray[850]),
    strong: semantic(primitiveColors.gray[300], primitiveColors.gray[700]),
    inverse: semantic(primitiveColors.white, primitiveColors.gray[950]),
    transparent: semantic('transparent', 'transparent')
  },

  // Divider Colors (for separating sections)
  divider: {
    default: semantic(primitiveColors.gray[100], primitiveColors.gray[850]),
    strong: semantic(primitiveColors.gray[200], primitiveColors.gray[800]),
    subtle: semantic(primitiveColors.gray[50], primitiveColors.gray[900])
  },

  // Primary Brand Colors
  primary: {
    default: semantic(primitiveColors.blue[500], primitiveColors.blue[400]),
    hover: semantic(primitiveColors.blue[600], primitiveColors.blue[300]),
    active: semantic(primitiveColors.blue[700], primitiveColors.blue[500]),
    subtle: semantic(primitiveColors.blue[50], primitiveColors.blue[950]),
    subtleHover: semantic(primitiveColors.blue[100], primitiveColors.blue[900]),
    subtleActive: semantic(primitiveColors.blue[200], primitiveColors.blue[800]),
    text: semantic(primitiveColors.blue[600], primitiveColors.blue[400]),
    textHover: semantic(primitiveColors.blue[700], primitiveColors.blue[300]),
    border: semantic(primitiveColors.blue[200], primitiveColors.blue[800]),
    borderHover: semantic(primitiveColors.blue[300], primitiveColors.blue[700]),
    foreground: semantic(primitiveColors.white, primitiveColors.white)
  },

  // Secondary/Accent Colors
  secondary: {
    default: semantic(primitiveColors.purple[500], primitiveColors.purple[400]),
    hover: semantic(primitiveColors.purple[600], primitiveColors.purple[300]),
    active: semantic(primitiveColors.purple[700], primitiveColors.purple[500]),
    subtle: semantic(primitiveColors.purple[50], primitiveColors.purple[950]),
    subtleHover: semantic(primitiveColors.purple[100], primitiveColors.purple[900]),
    subtleActive: semantic(primitiveColors.purple[200], primitiveColors.purple[800]),
    text: semantic(primitiveColors.purple[600], primitiveColors.purple[400]),
    textHover: semantic(primitiveColors.purple[700], primitiveColors.purple[300]),
    border: semantic(primitiveColors.purple[200], primitiveColors.purple[800]),
    borderHover: semantic(primitiveColors.purple[300], primitiveColors.purple[700]),
    foreground: semantic(primitiveColors.white, primitiveColors.white)
  },

  // Success/Positive States
  success: {
    default: semantic(primitiveColors.green[500], primitiveColors.green[400]),
    hover: semantic(primitiveColors.green[600], primitiveColors.green[300]),
    active: semantic(primitiveColors.green[700], primitiveColors.green[500]),
    subtle: semantic(primitiveColors.green[50], primitiveColors.green[950]),
    subtleHover: semantic(primitiveColors.green[100], primitiveColors.green[900]),
    subtleActive: semantic(primitiveColors.green[200], primitiveColors.green[800]),
    text: semantic(primitiveColors.green[600], primitiveColors.green[400]),
    textHover: semantic(primitiveColors.green[700], primitiveColors.green[300]),
    border: semantic(primitiveColors.green[200], primitiveColors.green[800]),
    borderHover: semantic(primitiveColors.green[300], primitiveColors.green[700]),
    foreground: semantic(primitiveColors.white, primitiveColors.white)
  },

  // Warning States
  warning: {
    default: semantic(primitiveColors.yellow[500], primitiveColors.yellow[400]),
    hover: semantic(primitiveColors.yellow[600], primitiveColors.yellow[300]),
    active: semantic(primitiveColors.yellow[700], primitiveColors.yellow[500]),
    subtle: semantic(primitiveColors.yellow[50], primitiveColors.yellow[950]),
    subtleHover: semantic(primitiveColors.yellow[100], primitiveColors.yellow[900]),
    subtleActive: semantic(primitiveColors.yellow[200], primitiveColors.yellow[800]),
    text: semantic(primitiveColors.yellow[700], primitiveColors.yellow[400]),
    textHover: semantic(primitiveColors.yellow[800], primitiveColors.yellow[300]),
    border: semantic(primitiveColors.yellow[200], primitiveColors.yellow[800]),
    borderHover: semantic(primitiveColors.yellow[300], primitiveColors.yellow[700]),
    foreground: semantic(primitiveColors.gray[900], primitiveColors.gray[900])
  },

  // Danger/Error States
  danger: {
    default: semantic(primitiveColors.red[500], primitiveColors.red[400]),
    hover: semantic(primitiveColors.red[600], primitiveColors.red[300]),
    active: semantic(primitiveColors.red[700], primitiveColors.red[500]),
    subtle: semantic(primitiveColors.red[50], primitiveColors.red[950]),
    subtleHover: semantic(primitiveColors.red[100], primitiveColors.red[900]),
    subtleActive: semantic(primitiveColors.red[200], primitiveColors.red[800]),
    text: semantic(primitiveColors.red[600], primitiveColors.red[400]),
    textHover: semantic(primitiveColors.red[700], primitiveColors.red[300]),
    border: semantic(primitiveColors.red[200], primitiveColors.red[800]),
    borderHover: semantic(primitiveColors.red[300], primitiveColors.red[700]),
    foreground: semantic(primitiveColors.white, primitiveColors.white)
  },

  // Info States
  info: {
    default: semantic(primitiveColors.blue[500], primitiveColors.blue[400]),
    hover: semantic(primitiveColors.blue[600], primitiveColors.blue[300]),
    active: semantic(primitiveColors.blue[700], primitiveColors.blue[500]),
    subtle: semantic(primitiveColors.blue[50], primitiveColors.blue[950]),
    subtleHover: semantic(primitiveColors.blue[100], primitiveColors.blue[900]),
    subtleActive: semantic(primitiveColors.blue[200], primitiveColors.blue[800]),
    text: semantic(primitiveColors.blue[600], primitiveColors.blue[400]),
    textHover: semantic(primitiveColors.blue[700], primitiveColors.blue[300]),
    border: semantic(primitiveColors.blue[200], primitiveColors.blue[800]),
    borderHover: semantic(primitiveColors.blue[300], primitiveColors.blue[700]),
    foreground: semantic(primitiveColors.white, primitiveColors.white)
  },

  // Muted/Neutral Colors
  muted: {
    default: semantic(primitiveColors.gray[500], primitiveColors.gray[400]),
    hover: semantic(primitiveColors.gray[600], primitiveColors.gray[300]),
    active: semantic(primitiveColors.gray[700], primitiveColors.gray[500]),
    subtle: semantic(primitiveColors.gray[50], primitiveColors.gray[950]),
    subtleHover: semantic(primitiveColors.gray[100], primitiveColors.gray[900]),
    subtleActive: semantic(primitiveColors.gray[200], primitiveColors.gray[800]),
    text: semantic(primitiveColors.gray[600], primitiveColors.gray[400]),
    textHover: semantic(primitiveColors.gray[700], primitiveColors.gray[300]),
    border: semantic(primitiveColors.gray[200], primitiveColors.gray[800]),
    borderHover: semantic(primitiveColors.gray[300], primitiveColors.gray[700]),
    foreground: semantic(primitiveColors.white, primitiveColors.gray[950])
  },

  // Focus State (for accessibility)
  focus: {
    ring: semantic(primitiveColors.blue[500], primitiveColors.blue[400]),
    border: semantic(primitiveColors.blue[500], primitiveColors.blue[400])
  },

  // Overlays (for modals, dropdowns)
  overlay: {
    default: semantic('oklch(0 0 0 / 0.5)', 'oklch(0 0 0 / 0.7)'),
    subtle: semantic('oklch(0 0 0 / 0.25)', 'oklch(0 0 0 / 0.5)')
  }
};

/**
 * Spacing Semantic Tokens
 * Maps primitive spacing to semantic uses
 */
export const semanticSpacing = {
  // Component padding
  padding: {
    xs: primitiveSpacing[2],    // 8px
    sm: primitiveSpacing[3],    // 12px
    md: primitiveSpacing[4],    // 16px
    lg: primitiveSpacing[6],    // 24px
    xl: primitiveSpacing[8],    // 32px
    '2xl': primitiveSpacing[12] // 48px
  },

  // Component margins
  margin: {
    xs: primitiveSpacing[2],    // 8px
    sm: primitiveSpacing[3],    // 12px
    md: primitiveSpacing[4],    // 16px
    lg: primitiveSpacing[6],    // 24px
    xl: primitiveSpacing[8],    // 32px
    '2xl': primitiveSpacing[12] // 48px
  },

  // Grid gaps
  gap: {
    xs: primitiveSpacing[2],    // 8px
    sm: primitiveSpacing[3],    // 12px
    md: primitiveSpacing[4],    // 16px
    lg: primitiveSpacing[6],    // 24px
    xl: primitiveSpacing[8],    // 32px
    '2xl': primitiveSpacing[12] // 48px
  },

  // Layout sections
  section: {
    xs: primitiveSpacing[8],    // 32px
    sm: primitiveSpacing[12],   // 48px
    md: primitiveSpacing[16],   // 64px
    lg: primitiveSpacing[20],   // 80px
    xl: primitiveSpacing[24],   // 96px
    '2xl': primitiveSpacing[32] // 128px
  }
};

/**
 * Typography Semantic Tokens
 */
export const semanticTypography = {
  // Font sizes by context
  fontSize: {
    // Text sizes
    caption: primitiveFontSizes.xs,    // 12px
    body: primitiveFontSizes.md,       // 16px
    lead: primitiveFontSizes.lg,       // 18px

    // Heading sizes
    h6: primitiveFontSizes.md,         // 16px
    h5: primitiveFontSizes.lg,         // 18px
    h4: primitiveFontSizes.xl,         // 20px
    h3: primitiveFontSizes['2xl'],     // 24px
    h2: primitiveFontSizes['3xl'],     // 30px
    h1: primitiveFontSizes['4xl'],     // 36px
    display: primitiveFontSizes['5xl'], // 48px
    hero: primitiveFontSizes['6xl']    // 60px
  },

  // Line heights by context
  lineHeight: {
    tight: 1.25,
    base: 1.5,
    relaxed: 1.75
  },

  // Font weights by context
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
};

/**
 * Border Radius Semantic Tokens
 */
export const semanticRadii = {
  // Component radii
  button: primitiveRadii.md,      // 8px
  input: primitiveRadii.md,       // 8px
  card: primitiveRadii.lg,        // 12px
  modal: primitiveRadii.xl,       // 16px
  tooltip: primitiveRadii.md,     // 8px
  badge: primitiveRadii.full,     // 9999px (pill)
  avatar: primitiveRadii.full     // 9999px (circle)
};

/**
 * Interactive States
 * Defines transformations for interactive elements
 * These are NOT color tokens but transformation rules
 */
export const interactiveStates = {
  hover: {
    opacity: 0.9,
    transform: 'translateY(-1px)',
    transition: 'all 150ms ease-out'
  },
  active: {
    opacity: 0.8,
    transform: 'scale(0.98)',
    transition: 'all 75ms ease-out'
  },
  focus: {
    outline: `2px solid`,
    outlineOffset: 2,
    transition: 'all 150ms ease-out'
  },
  disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    pointerEvents: 'none' as const
  }
};

/**
 * Get semantic token value for current theme
 */
export function getSemanticValue(
  token: SemanticToken,
  theme: 'light' | 'dark' = 'light'
): string {
  return token[theme];
}

/**
 * Export all semantic tokens
 */
export const semanticTokens = {
  colors: semanticColors,
  spacing: semanticSpacing,
  typography: semanticTypography,
  radii: semanticRadii,
  states: interactiveStates
};