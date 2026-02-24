/**
 * Platform-Specific Token System Tests
 *
 * Tests the platform token system including:
 * - Platform token creation
 * - Platform-specific value resolution
 * - Platform detection
 * - Component token platform overrides
 */

import { describe, it, expect, vi } from 'vitest';
import {
  platform,
  getPlatformValue,
  detectPlatform,
  platformTokens,
  platformSpacing,
  platformRadii,
  platformTypography,
  platformDimensions,
  platformElevation,
  platformAnimation,
  platformInteraction,
  type Platform,
  type PlatformToken
} from '../../design-system/tokens/platform';

describe('Platform Token System', () => {
  describe('platform() helper', () => {
    it('should create platform token with different values per platform', () => {
      const token = platform(10, 12, 14);

      expect(token.ios).toBe(10);
      expect(token.android).toBe(12);
      expect(token.web).toBe(14);
    });

    it('should create platform token with single value for all platforms', () => {
      const token = platform(16);

      expect(token.ios).toBe(16);
      expect(token.android).toBe(16);
      expect(token.web).toBe(16);
    });

    it('should work with string values', () => {
      const token = platform('ios-value', 'android-value', 'web-value');

      expect(token.ios).toBe('ios-value');
      expect(token.android).toBe('android-value');
      expect(token.web).toBe('web-value');
    });

    it('should work with object values', () => {
      const token = platform(
        { size: 10, weight: 600 },
        { size: 12, weight: 500 },
        { size: 14, weight: 600 }
      );

      expect(token.ios).toEqual({ size: 10, weight: 600 });
      expect(token.android).toEqual({ size: 12, weight: 500 });
      expect(token.web).toEqual({ size: 14, weight: 600 });
    });
  });

  describe('getPlatformValue()', () => {
    it('should get iOS value when platform is ios', () => {
      const token = platform(10, 12, 14);
      const value = getPlatformValue(token, 'ios');

      expect(value).toBe(10);
    });

    it('should get Android value when platform is android', () => {
      const token = platform(10, 12, 14);
      const value = getPlatformValue(token, 'android');

      expect(value).toBe(12);
    });

    it('should get Web value when platform is web', () => {
      const token = platform(10, 12, 14);
      const value = getPlatformValue(token, 'web');

      expect(value).toBe(14);
    });

    it('should default to web when no platform specified', () => {
      const token = platform(10, 12, 14);
      const value = getPlatformValue(token);

      expect(value).toBe(14);
    });
  });

  describe('detectPlatform()', () => {
    it('should detect web platform by default', () => {
      const platform = detectPlatform();

      expect(platform).toBe('web');
    });

    it('should detect ReactNative platform when available', () => {
      // Mock React Native environment
      const mockNavigator = {
        product: 'ReactNative'
      };
      const mockPlatform = {
        OS: 'ios'
      };

      vi.stubGlobal('navigator', mockNavigator);
      vi.stubGlobal('Platform', mockPlatform);

      const platform = detectPlatform();

      expect(['ios', 'android', 'web']).toContain(platform);

      // Cleanup
      vi.unstubAllGlobals();
    });
  });

  describe('Platform Spacing Tokens', () => {
    it('should have platform-specific list item padding', () => {
      expect(platformSpacing.listItemPadding.ios).toBe(16);
      expect(platformSpacing.listItemPadding.android).toBe(12);
      expect(platformSpacing.listItemPadding.web).toBe(16);
    });

    it('should have platform-specific tab bar padding', () => {
      expect(platformSpacing.tabBarPadding.ios).toBe(8);
      expect(platformSpacing.tabBarPadding.android).toBe(0);
      expect(platformSpacing.tabBarPadding.web).toBe(8);
    });

    it('should have platform-specific header padding', () => {
      expect(platformSpacing.headerPaddingX.ios).toBe(16);
      expect(platformSpacing.headerPaddingX.android).toBe(16);
      expect(platformSpacing.headerPaddingX.web).toBe(24);
    });

    it('should have consistent card padding across platforms', () => {
      expect(platformSpacing.cardPadding.ios).toBe(16);
      expect(platformSpacing.cardPadding.android).toBe(16);
      expect(platformSpacing.cardPadding.web).toBe(16);
    });
  });

  describe('Platform Radii Tokens', () => {
    it('should have platform-specific button radius', () => {
      expect(platformRadii.button.ios).toBe(12); // More rounded on iOS
      expect(platformRadii.button.android).toBe(8); // Material spec
      expect(platformRadii.button.web).toBe(8);
    });

    it('should have platform-specific card radius', () => {
      expect(platformRadii.card.ios).toBe(16); // Very rounded on iOS
      expect(platformRadii.card.android).toBe(12); // Material spec
      expect(platformRadii.card.web).toBe(12);
    });

    it('should have platform-specific input radius', () => {
      expect(platformRadii.input.ios).toBe(12);
      expect(platformRadii.input.android).toBe(4); // Less rounded on Android
      expect(platformRadii.input.web).toBe(8);
    });

    it('should have platform-specific tab bar item radius', () => {
      expect(platformRadii.tabBarItem.ios).toBe(12);
      expect(platformRadii.tabBarItem.android).toBe(0); // No rounding on Android
      expect(platformRadii.tabBarItem.web).toBe(8);
    });
  });

  describe('Platform Typography Tokens', () => {
    it('should have platform-specific nav title typography', () => {
      expect(platformTypography.navTitle.size.ios).toBe(20);
      expect(platformTypography.navTitle.size.android).toBe(20);
      expect(platformTypography.navTitle.size.web).toBe(18);

      expect(platformTypography.navTitle.weight.ios).toBe(600);
      expect(platformTypography.navTitle.weight.android).toBe(500);
      expect(platformTypography.navTitle.weight.web).toBe(600);
    });

    it('should have platform-specific tab bar label typography', () => {
      expect(platformTypography.tabBarLabel.size.ios).toBe(10);
      expect(platformTypography.tabBarLabel.size.android).toBe(12);
      expect(platformTypography.tabBarLabel.size.web).toBe(12);
    });

    it('should have platform-specific button typography', () => {
      expect(platformTypography.button.size.ios).toBe(16);
      expect(platformTypography.button.size.android).toBe(14); // Material spec
      expect(platformTypography.button.size.web).toBe(16);

      expect(platformTypography.button.weight.ios).toBe(600);
      expect(platformTypography.button.weight.android).toBe(500);
      expect(platformTypography.button.weight.web).toBe(600);
    });

    it('should have platform-specific body typography', () => {
      expect(platformTypography.body.size.ios).toBe(16);
      expect(platformTypography.body.size.android).toBe(14);
      expect(platformTypography.body.size.web).toBe(16);

      expect(platformTypography.body.lineHeight.ios).toBe(1.5);
      expect(platformTypography.body.lineHeight.android).toBe(1.5);
      expect(platformTypography.body.lineHeight.web).toBe(1.5);
    });
  });

  describe('Platform Dimensions Tokens', () => {
    it('should have platform-specific touch targets', () => {
      expect(platformDimensions.touchTarget.ios).toBe(44); // Apple HIG
      expect(platformDimensions.touchTarget.android).toBe(48); // Material Design
      expect(platformDimensions.touchTarget.web).toBe(40); // Web convention
    });

    it('should have platform-specific header height', () => {
      expect(platformDimensions.headerHeight.ios).toBe(44);
      expect(platformDimensions.headerHeight.android).toBe(56); // Material app bar
      expect(platformDimensions.headerHeight.web).toBe(64);
    });

    it('should have platform-specific tab bar height', () => {
      expect(platformDimensions.tabBarHeight.ios).toBe(49);
      expect(platformDimensions.tabBarHeight.android).toBe(56);
      expect(platformDimensions.tabBarHeight.web).toBe(56);
    });

    it('should have platform-specific list item height', () => {
      expect(platformDimensions.listItemHeight.ios).toBe(44);
      expect(platformDimensions.listItemHeight.android).toBe(48);
      expect(platformDimensions.listItemHeight.web).toBe(48);
    });

    it('should have consistent button heights across platforms', () => {
      expect(platformDimensions.buttonHeight.sm.ios).toBe(32);
      expect(platformDimensions.buttonHeight.sm.android).toBe(32);
      expect(platformDimensions.buttonHeight.sm.web).toBe(32);

      expect(platformDimensions.buttonHeight.md.ios).toBe(40);
      expect(platformDimensions.buttonHeight.md.android).toBe(40);
      expect(platformDimensions.buttonHeight.md.web).toBe(40);
    });
  });

  describe('Platform Elevation Tokens', () => {
    it('should have platform-specific card elevation', () => {
      expect(platformElevation.card.ios).toBeTruthy();
      expect(platformElevation.card.android).toBeTruthy();
      expect(platformElevation.card.web).toBeTruthy();

      // iOS has subtle shadows
      expect(platformElevation.card.ios).toContain('oklch');
      // Android uses elevation
      expect(platformElevation.card.android).toContain('oklch');
    });

    it('should have platform-specific modal elevation', () => {
      expect(platformElevation.modal.ios).toBeTruthy();
      expect(platformElevation.modal.android).toBeTruthy();
      expect(platformElevation.modal.web).toBeTruthy();
    });

    it('should have platform-specific button elevation', () => {
      expect(platformElevation.button.ios).toBe('none'); // iOS buttons are flat
      expect(platformElevation.button.android).toBeTruthy(); // Android has elevation
      expect(platformElevation.button.web).toBeTruthy();
    });

    it('should have platform-specific header elevation', () => {
      expect(platformElevation.header.ios).toBe('none'); // iOS uses blur/border
      expect(platformElevation.header.android).toBeTruthy(); // Android app bar elevation
      expect(platformElevation.header.web).toBeTruthy();
    });
  });

  describe('Platform Animation Tokens', () => {
    it('should have platform-specific animation durations', () => {
      expect(platformAnimation.duration.fast.ios).toBe(200);
      expect(platformAnimation.duration.fast.android).toBe(150);
      expect(platformAnimation.duration.fast.web).toBe(150);

      expect(platformAnimation.duration.normal.ios).toBe(300);
      expect(platformAnimation.duration.normal.android).toBe(250);
      expect(platformAnimation.duration.normal.web).toBe(300);
    });

    it('should have platform-specific easing curves', () => {
      expect(platformAnimation.easing.standard.ios).toBeTruthy();
      expect(platformAnimation.easing.standard.android).toBeTruthy();
      expect(platformAnimation.easing.standard.web).toBeTruthy();

      expect(typeof platformAnimation.easing.standard.ios).toBe('string');
      expect(platformAnimation.easing.standard.ios).toContain('cubic-bezier');
    });

    it('should have platform-specific spring animations', () => {
      // iOS has spring-like animations
      expect(platformAnimation.spring.ios).toContain('cubic-bezier');
      // Others use standard easing
      expect(platformAnimation.spring.android).toContain('cubic-bezier');
      expect(platformAnimation.spring.web).toContain('cubic-bezier');
    });
  });

  describe('Platform Interaction Tokens', () => {
    it('should have platform-specific haptics support', () => {
      expect(platformInteraction.haptics.ios).toBe(true);
      expect(platformInteraction.haptics.android).toBe(true);
      expect(platformInteraction.haptics.web).toBe(false);
    });

    it('should have platform-specific ripple support', () => {
      expect(platformInteraction.ripple.ios).toBe(false);
      expect(platformInteraction.ripple.android).toBe(true); // Material ripple
      expect(platformInteraction.ripple.web).toBe(false);
    });

    it('should have platform-specific blur support', () => {
      expect(platformInteraction.blur.ios).toBe(true);
      expect(platformInteraction.blur.android).toBe(false);
      expect(platformInteraction.blur.web).toBe(true);
    });

    it('should have platform-specific active opacity', () => {
      expect(platformInteraction.activeOpacity.ios).toBe(0.6);
      expect(platformInteraction.activeOpacity.android).toBe(0.7);
      expect(platformInteraction.activeOpacity.web).toBe(0.8);
    });

    it('should have platform-specific press scale', () => {
      expect(platformInteraction.pressScale.ios).toBe(0.95);
      expect(platformInteraction.pressScale.android).toBe(1.0); // No scale on Android
      expect(platformInteraction.pressScale.web).toBe(0.98);
    });
  });

  describe('Platform Token Integration', () => {
    it('should export all platform token categories', () => {
      expect(platformTokens.spacing).toBeDefined();
      expect(platformTokens.radii).toBeDefined();
      expect(platformTokens.typography).toBeDefined();
      expect(platformTokens.dimensions).toBeDefined();
      expect(platformTokens.elevation).toBeDefined();
      expect(platformTokens.animation).toBeDefined();
      expect(platformTokens.interaction).toBeDefined();
    });

    it('should export platform utilities', () => {
      expect(platformTokens.utils.platform).toBeDefined();
      expect(platformTokens.utils.getPlatformValue).toBeDefined();
      expect(platformTokens.utils.detectPlatform).toBeDefined();
    });

    it('should work with real-world component token usage', () => {
      // Simulate getting button radius for different platforms
      const buttonRadiusIOS = getPlatformValue(platformRadii.button, 'ios');
      const buttonRadiusAndroid = getPlatformValue(platformRadii.button, 'android');

      expect(buttonRadiusIOS).toBe(12);
      expect(buttonRadiusAndroid).toBe(8);
    });
  });

  describe('Type Safety', () => {
    it('should enforce platform token structure', () => {
      const token: PlatformToken<number> = {
        ios: 10,
        android: 12,
        web: 14
      };

      expect(token.ios).toBeDefined();
      expect(token.android).toBeDefined();
      expect(token.web).toBeDefined();
    });

    it('should work with platform type', () => {
      const platforms: Platform[] = ['ios', 'android', 'web'];

      platforms.forEach(platform => {
        expect(['ios', 'android', 'web']).toContain(platform);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle nested platform tokens', () => {
      const nestedToken = {
        size: platform(10, 12, 14),
        weight: platform(600, 500, 600)
      };

      expect(getPlatformValue(nestedToken.size, 'ios')).toBe(10);
      expect(getPlatformValue(nestedToken.weight, 'android')).toBe(500);
    });

    it('should handle platform token with undefined platform', () => {
      const token = platform(10, 12, 14);

      // Should default to web
      const value = getPlatformValue(token, undefined as any);
      expect(value).toBe(14);
    });

    it('should handle complex object values', () => {
      const complexToken = platform(
        { size: 16, weight: 600, lineHeight: 1.5 },
        { size: 14, weight: 500, lineHeight: 1.5 },
        { size: 16, weight: 600, lineHeight: 1.5 }
      );

      const iosValue = getPlatformValue(complexToken, 'ios');
      expect(iosValue.size).toBe(16);
      expect(iosValue.weight).toBe(600);
      expect(iosValue.lineHeight).toBe(1.5);
    });
  });

  describe('Real-World Usage Patterns', () => {
    it('should support conditional rendering based on platform', () => {
      const currentPlatform = detectPlatform();
      const shouldShowBlur = getPlatformValue(platformInteraction.blur, currentPlatform);

      expect(typeof shouldShowBlur).toBe('boolean');
    });

    it('should support dynamic styling based on platform', () => {
      const platforms: Platform[] = ['ios', 'android', 'web'];

      platforms.forEach(platform => {
        const radius = getPlatformValue(platformRadii.button, platform);
        const elevation = getPlatformValue(platformElevation.button, platform);

        expect(typeof radius).toBe('number');
        expect(typeof elevation).toBe('string');
      });
    });

    it('should support component token resolution with platform awareness', () => {
      // Example: TabBar component getting platform-specific height
      const platforms: Platform[] = ['ios', 'android', 'web'];

      platforms.forEach(platform => {
        const height = getPlatformValue(platformDimensions.tabBarHeight, platform);
        const padding = getPlatformValue(platformSpacing.tabBarPadding, platform);
        const itemRadius = getPlatformValue(platformRadii.tabBarItem, platform);

        expect(typeof height).toBe('number');
        expect(typeof padding).toBe('number');
        expect(typeof itemRadius).toBe('number');
      });
    });
  });
});
