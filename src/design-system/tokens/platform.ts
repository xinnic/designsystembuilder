/**
 * Platform-Specific Token System
 *
 * Extends the token system to support platform-specific values for iOS, Android, and Web.
 * This allows components to render with platform-appropriate styling while maintaining
 * a unified token architecture.
 */

import { primitiveSpacing, primitiveRadii, primitiveFontSizes } from './primitives';

/**
 * Supported platforms
 */
export type Platform = 'ios' | 'android' | 'web';

/**
 * Platform-specific token structure
 * Each token can have different values per platform
 */
export interface PlatformToken<T = any> {
  ios: T;
  android: T;
  web: T;
}

/**
 * Create a platform-specific token with per-platform values
 * If a single value is provided, it's used for all platforms
 */
export function platform<T>(ios: T, android: T, web: T): PlatformToken<T>;
export function platform<T>(value: T): PlatformToken<T>;
export function platform<T>(iosOrValue: T, android?: T, web?: T): PlatformToken<T> {
  if (android === undefined && web === undefined) {
    // Single value for all platforms
    return {
      ios: iosOrValue,
      android: iosOrValue,
      web: iosOrValue
    };
  }
  return {
    ios: iosOrValue,
    android: android!,
    web: web!
  };
}

/**
 * Platform-specific spacing tokens
 * iOS and Android have different spacing conventions
 */
export const platformSpacing = {
  // iOS tends to use slightly more spacious layouts
  listItemPadding: platform(
    primitiveSpacing[4],  // iOS: 16px
    primitiveSpacing[3],  // Android: 12px
    primitiveSpacing[4]   // Web: 16px
  ),

  // Tab bar spacing differs by platform
  tabBarPadding: platform(
    primitiveSpacing[2],  // iOS: 8px (minimal)
    primitiveSpacing[0],  // Android: 0px
    primitiveSpacing[2]   // Web: 8px
  ),

  // Navigation header padding
  headerPaddingX: platform(
    primitiveSpacing[4],  // iOS: 16px
    primitiveSpacing[4],  // Android: 16px
    primitiveSpacing[6]   // Web: 24px (more spacious)
  ),

  // Bottom sheet/drawer padding
  drawerPadding: platform(
    primitiveSpacing[4],  // iOS: 16px
    primitiveSpacing[4],  // Android: 16px
    primitiveSpacing[6]   // Web: 24px
  ),

  // Card padding
  cardPadding: platform(
    primitiveSpacing[4],  // iOS: 16px
    primitiveSpacing[4],  // Android: 16px
    primitiveSpacing[4]   // Web: 16px (consistent)
  )
};

/**
 * Platform-specific border radius tokens
 * iOS prefers more rounded corners, Android uses material design specs
 */
export const platformRadii = {
  // Button radius
  button: platform(
    primitiveRadii.lg,    // iOS: 12px (rounded)
    primitiveRadii.md,    // Android: 8px (material)
    primitiveRadii.md     // Web: 8px
  ),

  // Card radius
  card: platform(
    primitiveRadii.xl,    // iOS: 16px (very rounded)
    primitiveRadii.lg,    // Android: 12px (material)
    primitiveRadii.lg     // Web: 12px
  ),

  // Input radius
  input: platform(
    primitiveRadii.lg,    // iOS: 12px
    primitiveRadii.sm,    // Android: 4px (material)
    primitiveRadii.md     // Web: 8px
  ),

  // Modal/Sheet radius
  modal: platform(
    primitiveRadii.xl,    // iOS: 16px (rounded corners)
    primitiveRadii.xl,    // Android: 16px (material bottom sheet)
    primitiveRadii.lg     // Web: 12px
  ),

  // Tab bar item radius
  tabBarItem: platform(
    primitiveRadii.lg,    // iOS: 12px (rounded)
    0,                    // Android: 0px (no rounding)
    primitiveRadii.md     // Web: 8px
  )
};

/**
 * Platform-specific typography tokens
 * Each platform has preferred font sizes and weights
 */
export const platformTypography = {
  // Navigation title
  navTitle: {
    size: platform(
      primitiveFontSizes.xl,   // iOS: 20px (San Francisco)
      primitiveFontSizes.xl,   // Android: 20px (Roboto)
      primitiveFontSizes.lg    // Web: 18px
    ),
    weight: platform(
      600,  // iOS: Semibold
      500,  // Android: Medium
      600   // Web: Semibold
    )
  },

  // Tab bar label
  tabBarLabel: {
    size: platform(
      10,   // iOS: 10px (small)
      12,   // Android: 12px (slightly larger)
      12    // Web: 12px
    ),
    weight: platform(
      500,  // iOS: Medium
      500,  // Android: Medium
      500   // Web: Medium
    )
  },

  // Button text
  button: {
    size: platform(
      primitiveFontSizes.md,   // iOS: 16px
      primitiveFontSizes.sm,   // Android: 14px (material spec)
      primitiveFontSizes.md    // Web: 16px
    ),
    weight: platform(
      600,  // iOS: Semibold
      500,  // Android: Medium
      600   // Web: Semibold
    )
  },

  // Body text
  body: {
    size: platform(
      primitiveFontSizes.md,   // iOS: 16px
      primitiveFontSizes.sm,   // Android: 14px
      primitiveFontSizes.md    // Web: 16px
    ),
    lineHeight: platform(
      1.5,  // iOS: 1.5
      1.5,  // Android: 1.5
      1.5   // Web: 1.5
    )
  }
};

/**
 * Platform-specific component dimensions
 */
export const platformDimensions = {
  // Touch target sizes (minimum tappable area)
  touchTarget: platform(
    44,   // iOS: 44px (Apple HIG)
    48,   // Android: 48dp (Material Design)
    40    // Web: 40px (more compact)
  ),

  // Navigation header height
  headerHeight: platform(
    44,   // iOS: 44px (standard nav bar)
    56,   // Android: 56dp (app bar)
    64    // Web: 64px (more spacious)
  ),

  // Tab bar height
  tabBarHeight: platform(
    49,   // iOS: 49px (standard tab bar)
    56,   // Android: 56dp (bottom nav)
    56    // Web: 56px
  ),

  // List item height
  listItemHeight: platform(
    44,   // iOS: 44px (standard cell)
    48,   // Android: 48dp (list item)
    48    // Web: 48px
  ),

  // Button height
  buttonHeight: {
    sm: platform(32, 32, 32),
    md: platform(40, 40, 40),
    lg: platform(48, 48, 48)
  }
};

/**
 * Platform-specific elevation/shadow tokens
 * Material Design uses elevation, iOS uses subtle shadows
 */
export const platformElevation = {
  // Card elevation
  card: platform(
    '0 2px 8px 0 oklch(0 0 0 / 0.08)',        // iOS: subtle shadow
    '0 2px 4px 0 oklch(0 0 0 / 0.14)',        // Android: elevation 2dp
    '0 1px 3px 0 oklch(0 0 0 / 0.1)'          // Web: light shadow
  ),

  // Modal/Dialog elevation
  modal: platform(
    '0 10px 40px 0 oklch(0 0 0 / 0.15)',      // iOS: medium shadow
    '0 24px 38px 0 oklch(0 0 0 / 0.14)',      // Android: elevation 24dp
    '0 20px 25px -5px oklch(0 0 0 / 0.1)'     // Web: larger shadow
  ),

  // Button elevation (raised buttons)
  button: platform(
    'none',                                     // iOS: flat by default
    '0 2px 4px 0 oklch(0 0 0 / 0.14)',        // Android: elevation 2dp
    '0 1px 2px 0 oklch(0 0 0 / 0.05)'         // Web: subtle
  ),

  // Navigation bar elevation
  header: platform(
    'none',                                     // iOS: uses border/blur
    '0 2px 4px 0 oklch(0 0 0 / 0.14)',        // Android: elevation 4dp
    '0 1px 3px 0 oklch(0 0 0 / 0.1)'          // Web: subtle shadow
  )
};

/**
 * Platform-specific animation/motion tokens
 * Each platform has characteristic animation curves and durations
 */
export const platformAnimation = {
  // Transition duration
  duration: {
    fast: platform(200, 150, 150),              // iOS slightly slower
    normal: platform(300, 250, 300),
    slow: platform(500, 400, 500)
  },

  // Easing curves
  easing: {
    // Standard easing for most animations
    standard: platform(
      'cubic-bezier(0.4, 0.0, 0.2, 1)',        // iOS: ease-in-out
      'cubic-bezier(0.4, 0.0, 0.2, 1)',        // Android: material standard
      'cubic-bezier(0.4, 0.0, 0.2, 1)'         // Web: same
    ),

    // Entrance animations
    enter: platform(
      'cubic-bezier(0.0, 0.0, 0.2, 1)',        // iOS: ease-out
      'cubic-bezier(0.0, 0.0, 0.2, 1)',        // Android: material deceleration
      'cubic-bezier(0.0, 0.0, 0.2, 1)'         // Web: ease-out
    ),

    // Exit animations
    exit: platform(
      'cubic-bezier(0.4, 0.0, 1, 1)',          // iOS: ease-in
      'cubic-bezier(0.4, 0.0, 1, 1)',          // Android: material acceleration
      'cubic-bezier(0.4, 0.0, 1, 1)'           // Web: ease-in
    )
  },

  // Spring animations (iOS specific, approximated elsewhere)
  spring: platform(
    'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // iOS: spring-like
    'cubic-bezier(0.4, 0.0, 0.2, 1)',          // Android: standard
    'cubic-bezier(0.4, 0.0, 0.2, 1)'           // Web: standard
  )
};

/**
 * Platform-specific interaction patterns
 */
export const platformInteraction = {
  // Haptic feedback support
  haptics: platform(true, true, false),

  // Ripple effect (Material Design)
  ripple: platform(false, true, false),

  // Blur effects
  blur: platform(true, false, true),

  // Active state opacity
  activeOpacity: platform(0.6, 0.7, 0.8),

  // Scale on press
  pressScale: platform(0.95, 1.0, 0.98)
};

/**
 * Utility function to get platform-specific value
 */
export function getPlatformValue<T>(
  token: PlatformToken<T>,
  platform: Platform = 'web'
): T {
  return token[platform];
}

/**
 * Utility to detect current platform (simplified)
 * In a real React Native app, you'd use Platform.OS
 */
export function detectPlatform(): Platform {
  if (typeof window === 'undefined') {
    return 'web';
  }

  // Check for React Native
  // @ts-ignore - RN global
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    // In RN, you'd check Platform.OS
    // @ts-ignore
    const os = globalThis.Platform?.OS;
    if (os === 'ios' || os === 'android') {
      return os;
    }
  }

  // Default to web
  return 'web';
}

/**
 * Export all platform tokens
 */
export const platformTokens = {
  spacing: platformSpacing,
  radii: platformRadii,
  typography: platformTypography,
  dimensions: platformDimensions,
  elevation: platformElevation,
  animation: platformAnimation,
  interaction: platformInteraction,

  // Utilities
  utils: {
    platform,
    getPlatformValue,
    detectPlatform
  }
};

/**
 * Type exports
 */
export type PlatformTokens = typeof platformTokens;
export type PlatformSpacing = typeof platformSpacing;
export type PlatformRadii = typeof platformRadii;
export type PlatformTypography = typeof platformTypography;
