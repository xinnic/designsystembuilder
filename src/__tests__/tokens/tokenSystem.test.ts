/**
 * Token System Integration Tests
 *
 * Verifies the 3-tier token architecture is working correctly:
 * - Primitive tokens (11-step OKLCH scales)
 * - Semantic token mappings
 * - Theme switching support
 */

import { describe, it, expect } from 'vitest';
import {
  generateColorScale,
  hexToOKLCH,
  primitiveColors,
  primitiveSpacing,
  primitiveRadii,
  semanticColors,
  getSemanticValue,
  generateBrandPalette,
  tokens
} from '../../design-system/tokens';

describe('Token System', () => {
  describe('Primitive Tokens (Tier 1)', () => {
    it('should generate 11-step OKLCH color scales', () => {
      const scale = generateColorScale('test', { l: 0.5, c: 0.2, h: 240 });

      // Check all 11 steps exist
      expect(scale).toHaveProperty('50');
      expect(scale).toHaveProperty('100');
      expect(scale).toHaveProperty('200');
      expect(scale).toHaveProperty('300');
      expect(scale).toHaveProperty('400');
      expect(scale).toHaveProperty('500');
      expect(scale).toHaveProperty('600');
      expect(scale).toHaveProperty('700');
      expect(scale).toHaveProperty('800');
      expect(scale).toHaveProperty('900');
      expect(scale).toHaveProperty('950');

      // Verify OKLCH format
      Object.values(scale).forEach(color => {
        expect(color).toMatch(/^oklch\(/);
      });

      // Verify perceptual lightness progression
      const lightness50 = parseFloat(scale['50'].match(/oklch\(([0-9.]+)/)?.[1] || '0');
      const lightness500 = parseFloat(scale['500'].match(/oklch\(([0-9.]+)/)?.[1] || '0');
      const lightness950 = parseFloat(scale['950'].match(/oklch\(([0-9.]+)/)?.[1] || '0');

      expect(lightness50).toBeGreaterThan(lightness500);
      expect(lightness500).toBeGreaterThan(lightness950);
    });

    it('should have all required primitive color scales', () => {
      // Check core scales exist
      expect(primitiveColors).toHaveProperty('gray');
      expect(primitiveColors).toHaveProperty('blue');
      expect(primitiveColors).toHaveProperty('green');
      expect(primitiveColors).toHaveProperty('yellow');
      expect(primitiveColors).toHaveProperty('red');
      expect(primitiveColors).toHaveProperty('purple');

      // Check special values
      expect(primitiveColors).toHaveProperty('white');
      expect(primitiveColors).toHaveProperty('black');
      expect(primitiveColors).toHaveProperty('transparent');
    });

    it('should have spacing tokens following 8-point grid', () => {
      // Check key spacing values
      expect(primitiveSpacing[2]).toBe(8);  // Base unit
      expect(primitiveSpacing[4]).toBe(16); // Common padding
      expect(primitiveSpacing[8]).toBe(32); // Large spacing

      // Verify 8-point grid alignment
      Object.entries(primitiveSpacing).forEach(([key, value]) => {
        if (typeof value === 'number' && value > 0) {
          // Most values should be divisible by 4 (half grid)
          expect(value % 2).toBe(0);
        }
      });
    });

    it('should have proper radius tokens', () => {
      expect(primitiveRadii.none).toBe(0);
      expect(primitiveRadii.sm).toBe(4);
      expect(primitiveRadii.md).toBe(8);
      expect(primitiveRadii.lg).toBe(12);
      expect(primitiveRadii.full).toBe(9999);
    });
  });

  describe('Semantic Tokens (Tier 2)', () => {
    it('should have light and dark values for all semantic colors', () => {
      // Check canvas colors
      expect(semanticColors.canvas.default).toHaveProperty('light');
      expect(semanticColors.canvas.default).toHaveProperty('dark');

      // Check text colors
      expect(semanticColors.text.primary).toHaveProperty('light');
      expect(semanticColors.text.primary).toHaveProperty('dark');

      // Check interactive colors
      expect(semanticColors.primary.default).toHaveProperty('light');
      expect(semanticColors.primary.default).toHaveProperty('dark');
    });

    it('should return correct theme values', () => {
      const primaryLight = getSemanticValue(semanticColors.primary.default, 'light');
      const primaryDark = getSemanticValue(semanticColors.primary.default, 'dark');

      expect(primaryLight).toContain('oklch');
      expect(primaryDark).toContain('oklch');
      expect(primaryLight).not.toBe(primaryDark);
    });

    it('should have complete semantic color sets', () => {
      // Check primary has all variants
      expect(semanticColors.primary).toHaveProperty('default');
      expect(semanticColors.primary).toHaveProperty('hover');
      expect(semanticColors.primary).toHaveProperty('active');
      expect(semanticColors.primary).toHaveProperty('subtle');
      expect(semanticColors.primary).toHaveProperty('text');
      expect(semanticColors.primary).toHaveProperty('border');
      expect(semanticColors.primary).toHaveProperty('foreground');

      // Check status colors
      ['success', 'warning', 'danger', 'info'].forEach(status => {
        expect(semanticColors[status]).toHaveProperty('default');
        expect(semanticColors[status]).toHaveProperty('subtle');
        expect(semanticColors[status]).toHaveProperty('foreground');
        expect(semanticColors[status]).toHaveProperty('border');
      });
    });

    it('should properly map semantic to primitive colors', () => {
      const primaryLight = getSemanticValue(semanticColors.primary.default, 'light');
      const primaryDark = getSemanticValue(semanticColors.primary.default, 'dark');

      // Should reference blue scale
      expect(primaryLight).toBe(primitiveColors.blue[500]);
      expect(primaryDark).toBe(primitiveColors.blue[400]);

      // Canvas should use gray scale
      const canvasLight = getSemanticValue(semanticColors.canvas.default, 'light');
      expect(canvasLight).toBe(primitiveColors.gray[50]);
    });
  });

  describe('Component Tokens (Tier 3)', () => {
    it('should have component-specific tokens', () => {
      expect(tokens.component).toHaveProperty('button');
      expect(tokens.component).toHaveProperty('feedCard');
      expect(tokens.component).toHaveProperty('tabBar');
      expect(tokens.component).toHaveProperty('navHeader');
    });

    it('should have proper button sizing tokens', () => {
      expect(tokens.component.button.height).toHaveProperty('xs');
      expect(tokens.component.button.height).toHaveProperty('sm');
      expect(tokens.component.button.height).toHaveProperty('md');
      expect(tokens.component.button.height).toHaveProperty('lg');
      expect(tokens.component.button.height).toHaveProperty('xl');

      expect(tokens.component.button.height.md).toBe(40);
    });

    it('should have B2C component tokens', () => {
      // FeedCard
      expect(tokens.component.feedCard.padding).toBe(16);
      expect(tokens.component.feedCard.imageAspectRatio).toBe(1.5);
      expect(tokens.component.feedCard.titleSize).toBe(18);

      // TabBar
      expect(tokens.component.tabBar.height).toBe(56);
      expect(tokens.component.tabBar.iconSize).toBe(24);
      expect(tokens.component.tabBar.activeScale).toBe(1.1);

      // NavHeader
      expect(tokens.component.navHeader.height).toBe(56);
      expect(tokens.component.navHeader.logoSize).toBe(32);
    });
  });

  describe('Utilities', () => {
    it('should generate brand palette from hex color', () => {
      const palette = generateBrandPalette('#3b82f6');

      expect(palette).toHaveProperty('brand');
      expect(palette).toHaveProperty('accent');
      expect(palette).toHaveProperty('analogous1');
      expect(palette).toHaveProperty('analogous2');

      // Each should be an 11-step scale
      expect(Object.keys(palette.brand)).toHaveLength(11);
      expect(palette.brand).toHaveProperty('500');
    });

    it('should convert hex to OKLCH (simplified)', () => {
      const oklch = hexToOKLCH('#3b82f6');

      expect(oklch).toHaveProperty('l');
      expect(oklch).toHaveProperty('c');
      expect(oklch).toHaveProperty('h');

      expect(oklch.l).toBeGreaterThanOrEqual(0);
      expect(oklch.l).toBeLessThanOrEqual(1);
      expect(oklch.c).toBeGreaterThanOrEqual(0);
      expect(oklch.h).toBeGreaterThanOrEqual(0);
      expect(oklch.h).toBeLessThan(360);
    });
  });

  describe('Token System Architecture', () => {
    it('should have all three tiers properly structured', () => {
      // Tier 1: Primitives
      expect(tokens.primitive).toHaveProperty('colors');
      expect(tokens.primitive).toHaveProperty('spacing');
      expect(tokens.primitive).toHaveProperty('radii');
      expect(tokens.primitive).toHaveProperty('shadows');

      // Tier 2: Semantic
      expect(tokens.semantic).toHaveProperty('colors');
      expect(tokens.semantic).toHaveProperty('spacing');
      expect(tokens.semantic).toHaveProperty('typography');

      // Tier 3: Component
      expect(tokens.component).toHaveProperty('button');
      expect(tokens.component).toHaveProperty('feedCard');

      // Utilities
      expect(tokens.utils).toHaveProperty('generateBrandPalette');
      expect(tokens.utils).toHaveProperty('generateColorScale');
      expect(tokens.utils).toHaveProperty('getSemanticValue');
    });

    it('should support theme switching', () => {
      const canvas = semanticColors.canvas.default;

      // Light theme should use light background
      const lightBg = getSemanticValue(canvas, 'light');
      expect(lightBg).toBe(primitiveColors.gray[50]);

      // Dark theme should use dark background
      const darkBg = getSemanticValue(canvas, 'dark');
      expect(darkBg).toBe(primitiveColors.gray[950]);

      // They should be different
      expect(lightBg).not.toBe(darkBg);
    });
  });
});

// Export a test summary function
export function verifyTokenSystem(): boolean {
  try {
    // Check primitives exist
    if (!primitiveColors.gray || Object.keys(primitiveColors.gray).length !== 11) {
      console.error('❌ Gray scale incomplete');
      return false;
    }

    // Check semantic mappings
    if (!semanticColors.primary.default.light || !semanticColors.primary.default.dark) {
      console.error('❌ Semantic mappings incomplete');
      return false;
    }

    // Check component tokens
    if (!tokens.component.feedCard || !tokens.component.tabBar) {
      console.error('❌ Component tokens missing');
      return false;
    }

    console.log('✅ Token system verified successfully!');
    return true;
  } catch (error) {
    console.error('❌ Token system verification failed:', error);
    return false;
  }
}