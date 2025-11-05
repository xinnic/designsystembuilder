/**
 * Token System Export
 *
 * This is the main entry point for the 3-tier token architecture.
 * Exports all token layers and utilities for the design system.
 */

export * from './primitives';
export * from './semantic';

import { primitiveTokens, generateColorScale, hexToOKLCH, type OKLCHColor } from './primitives';
import { semanticTokens, getSemanticValue, type SemanticToken } from './semantic';

/**
 * Generate a complete brand color palette from a single hex color
 */
export function generateBrandPalette(brandHex: string) {
  const oklch = hexToOKLCH(brandHex);
  return {
    brand: generateColorScale('brand', oklch),
    // Generate complementary colors
    accent: generateColorScale('accent', {
      ...oklch,
      h: (oklch.h + 180) % 360 // Complementary hue
    }),
    // Generate analogous colors
    analogous1: generateColorScale('analogous1', {
      ...oklch,
      h: (oklch.h + 30) % 360
    }),
    analogous2: generateColorScale('analogous2', {
      ...oklch,
      h: (oklch.h - 30 + 360) % 360
    })
  };
}

/**
 * Component Token Layer (Tier 3)
 * Optional overrides for specific components
 */
export const componentTokens = {
  // Button specific tokens
  button: {
    height: {
      xs: 24,
      sm: 32,
      md: 40,
      lg: 48,
      xl: 56
    },
    paddingX: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 24,
      xl: 32
    }
  },

  // FeedCard specific tokens
  feedCard: {
    padding: 16,
    imageAspectRatio: 1.5,
    titleSize: 18,
    titleWeight: 600,
    descriptionSize: 14,
    metaSize: 12
  },

  // TabBar specific tokens
  tabBar: {
    height: 56,
    iconSize: 24,
    labelSize: 10,
    activeScale: 1.1,
    inactiveOpacity: 0.6,
    indicatorHeight: 2
  },

  // NavHeader specific tokens
  navHeader: {
    height: 56,
    logoSize: 32,
    titleSize: 20,
    iconSize: 24,
    blurIntensity: 20
  },

  // DrawerMenu specific tokens
  drawerMenu: {
    width: 280,
    itemHeight: 48,
    sectionHeaderHeight: 32,
    iconSize: 20,
    fontSize: 16,
    activeBgOpacity: 0.1
  },

  // SegmentedControl specific tokens
  segmentedControl: {
    height: 36,
    minSegmentWidth: 60,
    borderWidth: 1,
    indicatorInset: 2,
    fontSize: 14
  },

  // SearchBar specific tokens
  searchBar: {
    height: 40,
    iconSize: 20,
    fontSize: 16,
    paddingHorizontal: 16
  }
};

/**
 * Token Resolution Utilities
 */

/**
 * Resolve a token path to its value
 * Example: resolveToken('colors.primary.default', 'light') -> 'oklch(...)'
 */
export function resolveToken(path: string, theme: 'light' | 'dark' = 'light'): any {
  const parts = path.split('.');
  let current: any = tokens;

  for (const part of parts) {
    if (current[part] !== undefined) {
      current = current[part];
    } else {
      return undefined;
    }
  }

  // If it's a semantic token, resolve for theme
  if (current && typeof current === 'object' && 'light' in current && 'dark' in current) {
    return current[theme];
  }

  return current;
}

/**
 * Complete token system export
 */
export const tokens = {
  primitive: primitiveTokens,
  semantic: semanticTokens,
  component: componentTokens,

  // Utilities
  utils: {
    generateBrandPalette,
    generateColorScale,
    hexToOKLCH,
    getSemanticValue,
    resolveToken
  }
};

/**
 * Type exports for TypeScript support
 */
export type TokenSystem = typeof tokens;
export type PrimitiveTokens = typeof primitiveTokens;
export type SemanticTokens = typeof semanticTokens;
export type ComponentTokens = typeof componentTokens;
export type Theme = 'light' | 'dark';

/**
 * Default export for convenience
 */
export default tokens;