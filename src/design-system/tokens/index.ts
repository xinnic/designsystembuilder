/**
 * Token System Export
 *
 * This is the main entry point for the 3-tier token architecture.
 * Exports all token layers and utilities for the design system.
 */

export * from './primitives';
export * from './semantic';
export * from './platform';

import { primitiveTokens, generateColorScale, hexToOKLCH, type OKLCHColor } from './primitives';
import { semanticTokens, getSemanticValue, type SemanticToken } from './semantic';
import { platformTokens, getPlatformValue, detectPlatform, type Platform, type PlatformToken } from './platform';

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
 * Optional overrides for specific components with platform-specific values
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
    },
    // Platform-specific overrides
    borderRadius: platformTokens.radii.button,
    touchTarget: platformTokens.dimensions.touchTarget,
    typography: platformTokens.typography.button,
    elevation: platformTokens.elevation.button,
    pressScale: platformTokens.interaction.pressScale
  },

  // FeedCard specific tokens
  feedCard: {
    padding: platformTokens.spacing.cardPadding,
    imageAspectRatio: 1.5,
    titleSize: 18,
    titleWeight: 600,
    descriptionSize: 14,
    metaSize: 12,
    borderRadius: platformTokens.radii.card,
    elevation: platformTokens.elevation.card
  },

  // TabBar specific tokens
  tabBar: {
    height: platformTokens.dimensions.tabBarHeight,
    iconSize: 24,
    labelSize: platformTokens.typography.tabBarLabel.size,
    activeScale: 1.1,
    inactiveOpacity: 0.6,
    indicatorHeight: 2,
    padding: platformTokens.spacing.tabBarPadding,
    itemBorderRadius: platformTokens.radii.tabBarItem
  },

  // NavHeader specific tokens
  navHeader: {
    height: platformTokens.dimensions.headerHeight,
    logoSize: 32,
    titleSize: platformTokens.typography.navTitle.size,
    titleWeight: platformTokens.typography.navTitle.weight,
    iconSize: 24,
    blurIntensity: 20,
    paddingX: platformTokens.spacing.headerPaddingX,
    elevation: platformTokens.elevation.header,
    supportsBlur: platformTokens.interaction.blur
  },

  // DrawerMenu specific tokens
  drawerMenu: {
    width: 280,
    itemHeight: platformTokens.dimensions.listItemHeight,
    sectionHeaderHeight: 32,
    iconSize: 20,
    fontSize: 16,
    activeBgOpacity: 0.1,
    padding: platformTokens.spacing.drawerPadding,
    borderRadius: platformTokens.radii.card,
    elevation: platformTokens.elevation.modal
  },

  // SegmentedControl specific tokens
  segmentedControl: {
    height: 36,
    minSegmentWidth: 60,
    borderWidth: 1,
    indicatorInset: 2,
    fontSize: 14,
    borderRadius: platformTokens.radii.button,
    animation: {
      duration: platformTokens.animation.duration.normal,
      easing: platformTokens.animation.easing.standard
    }
  },

  // SearchBar specific tokens
  searchBar: {
    height: 40,
    iconSize: 20,
    fontSize: 16,
    paddingHorizontal: platformTokens.spacing.listItemPadding,
    borderRadius: platformTokens.radii.input
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
  platform: platformTokens,

  // Utilities
  utils: {
    generateBrandPalette,
    generateColorScale,
    hexToOKLCH,
    getSemanticValue,
    resolveToken,
    getPlatformValue,
    detectPlatform
  }
};

/**
 * Type exports for TypeScript support
 */
export type TokenSystem = typeof tokens;
export type PrimitiveTokens = typeof primitiveTokens;
export type SemanticTokens = typeof semanticTokens;
export type ComponentTokens = typeof componentTokens;
export type PlatformTokens = typeof platformTokens;
export type Theme = 'light' | 'dark';

// Re-export platform types
export type { Platform, PlatformToken };

/**
 * Default export for convenience
 */
export default tokens;