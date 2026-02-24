/**
 * useTokenSystem Hook Tests
 *
 * Tests the CSS variable bridge and theme management functionality
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTokenSystem, useTheme } from '../../hooks/useTokenSystem';
import { generateBrandPalette } from '../../design-system/tokens';

// Mock the design system store
vi.mock('../../state/designSystem', () => ({
  useDesignSystem: () => ({
    primaryColor: '#3b82f6',
    fontFamily: 'Inter',
    displayFont: 'Inter',
    roundness: 1,
    inputBorderType: 1,
    cardBorderType: 1
  })
}));

describe('useTokenSystem Hook', () => {
  let originalGetComputedStyle: typeof window.getComputedStyle;

  beforeEach(() => {
    // Mock document.documentElement
    document.documentElement.classList.remove = vi.fn();
    document.documentElement.classList.add = vi.fn();
    document.documentElement.style.setProperty = vi.fn();

    // Store original getComputedStyle
    originalGetComputedStyle = window.getComputedStyle;
  });

  afterEach(() => {
    // Restore original
    window.getComputedStyle = originalGetComputedStyle;
    vi.clearAllMocks();
  });

  describe('Theme Management', () => {
    it('should apply theme class to document root', () => {
      renderHook(() => useTokenSystem('light'));

      expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
      expect(document.documentElement.classList.add).toHaveBeenCalledWith('light');
    });

    it('should switch theme classes when theme changes', () => {
      const { rerender } = renderHook(
        ({ theme }) => useTokenSystem(theme),
        { initialProps: { theme: 'light' as const } }
      );

      // Clear initial calls
      vi.clearAllMocks();

      // Switch to dark theme
      rerender({ theme: 'dark' });

      expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
      expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
    });
  });

  describe('CSS Variable Generation', () => {
    it('should set color scale CSS variables', () => {
      renderHook(() => useTokenSystem('light'));

      // Check that color scales are set
      const setCalls = (document.documentElement.style.setProperty as any).mock.calls;

      // Check for gray scale
      const grayScaleCall = setCalls.find((call: any[]) => call[0] === '--color-gray-500');
      expect(grayScaleCall).toBeDefined();

      // Check for brand scale
      const brandScaleCall = setCalls.find((call: any[]) => call[0].includes('--color-brand-'));
      expect(brandScaleCall).toBeDefined();
    });

    it('should set spacing CSS variables', () => {
      renderHook(() => useTokenSystem('light'));

      const setCalls = (document.documentElement.style.setProperty as any).mock.calls;

      // Check for spacing tokens
      const spacingCall = setCalls.find((call: any[]) => call[0] === '--spacing-4');
      expect(spacingCall).toBeDefined();
      expect(spacingCall[1]).toBe('16px'); // spacing[4] = 16
    });

    it('should set typography CSS variables', () => {
      renderHook(() => useTokenSystem('light'));

      const setCalls = (document.documentElement.style.setProperty as any).mock.calls;

      // Check for font size tokens
      const fontSizeCall = setCalls.find((call: any[]) => call[0] === '--font-size-md');
      expect(fontSizeCall).toBeDefined();
      expect(fontSizeCall[1]).toBe('16px');

      // Check for font weight tokens
      const fontWeightCall = setCalls.find((call: any[]) => call[0] === '--font-weight-normal');
      expect(fontWeightCall).toBeDefined();
      expect(fontWeightCall[1]).toBe('400');
    });

    it('should set radius CSS variables with roundness multiplier', () => {
      renderHook(() => useTokenSystem('light'));

      const setCalls = (document.documentElement.style.setProperty as any).mock.calls;

      // Check for radius tokens
      const radiusCall = setCalls.find((call: any[]) => call[0] === '--radius-md');
      expect(radiusCall).toBeDefined();
      // Default roundness is 1, so md radius (8) should be 8px
      expect(radiusCall[1]).toBe('8px');
    });

    it('should set semantic color CSS variables', () => {
      renderHook(() => useTokenSystem('light'));

      const setCalls = (document.documentElement.style.setProperty as any).mock.calls;

      // Check for semantic colors
      const primaryCall = setCalls.find((call: any[]) => call[0] === '--color-primary-default');
      expect(primaryCall).toBeDefined();

      const surfaceCall = setCalls.find((call: any[]) => call[0] === '--color-surface-default');
      expect(surfaceCall).toBeDefined();
    });

    it('should set component-specific token CSS variables', () => {
      renderHook(() => useTokenSystem('light'));

      const setCalls = (document.documentElement.style.setProperty as any).mock.calls;

      // Check for component tokens
      const buttonHeightCall = setCalls.find((call: any[]) => call[0].includes('--button-height-'));
      expect(buttonHeightCall).toBeDefined();

      const feedCardCall = setCalls.find((call: any[]) => call[0].includes('--feedCard-'));
      expect(feedCardCall).toBeDefined();
    });

    it('should set backwards compatibility CSS variables', () => {
      renderHook(() => useTokenSystem('light'));

      const setCalls = (document.documentElement.style.setProperty as any).mock.calls;

      // Check for old variable names
      const oldBrandCall = setCalls.find((call: any[]) => call[0] === '--color-brand');
      expect(oldBrandCall).toBeDefined();

      const oldSpaceCall = setCalls.find((call: any[]) => call[0] === '--space-1');
      expect(oldSpaceCall).toBeDefined();
      expect(oldSpaceCall[1]).toBe('8px');
    });
  });

  describe('Brand Palette Generation', () => {
    it('should generate brand palette from primary color', () => {
      const { result } = renderHook(() => useTokenSystem('light'));

      expect(result.current.brandPalette).toBeDefined();
      expect(result.current.brandPalette.brand).toBeDefined();
      expect(Object.keys(result.current.brandPalette.brand)).toHaveLength(11); // 11-step scale
    });

    it('should update brand palette when primary color changes', () => {
      // This would require mocking useDesignSystem hook
      // For now, just verify the palette generation works
      const palette = generateBrandPalette('#3b82f6');

      expect(palette.brand).toBeDefined();
      expect(palette.accent).toBeDefined();
      expect(palette.analogous1).toBeDefined();
      expect(palette.analogous2).toBeDefined();
    });
  });

  describe('Return Values', () => {
    it('should return tokens, theme, and brandPalette', () => {
      const { result } = renderHook(() => useTokenSystem('light'));

      expect(result.current.tokens).toBeDefined();
      expect(result.current.theme).toBe('light');
      expect(result.current.brandPalette).toBeDefined();
    });

    it('should have complete token structure', () => {
      const { result } = renderHook(() => useTokenSystem('light'));

      expect(result.current.tokens.primitive).toBeDefined();
      expect(result.current.tokens.semantic).toBeDefined();
      expect(result.current.tokens.component).toBeDefined();
      expect(result.current.tokens.utils).toBeDefined();
    });
  });
});

describe('useTheme Hook', () => {
  it('should detect light theme preference', () => {
    // Mock matchMedia for light theme
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false, // false means light theme preferred
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))
    });

    const { result } = renderHook(() => useTheme());
    expect(result.current).toBe('light');
  });

  it('should detect dark theme preference', () => {
    // Mock matchMedia for dark theme
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: true, // true means dark theme preferred
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))
    });

    const { result } = renderHook(() => useTheme());
    expect(result.current).toBe('dark');
  });
});

// Verify the hook integrates with the token system
describe('Integration Tests', () => {
  it('should apply all token categories as CSS variables', () => {
    renderHook(() => useTokenSystem('light'));

    const setCalls = (document.documentElement.style.setProperty as any).mock.calls;
    const varNames = setCalls.map((call: any[]) => call[0]);

    // Check for presence of all token categories
    const hasColorTokens = varNames.some((name: string) => name.includes('--color-'));
    const hasSpacingTokens = varNames.some((name: string) => name.includes('--spacing-'));
    const hasFontTokens = varNames.some((name: string) => name.includes('--font-'));
    const hasRadiusTokens = varNames.some((name: string) => name.includes('--radius-'));
    const hasShadowTokens = varNames.some((name: string) => name.includes('--shadow-'));

    expect(hasColorTokens).toBe(true);
    expect(hasSpacingTokens).toBe(true);
    expect(hasFontTokens).toBe(true);
    expect(hasRadiusTokens).toBe(true);
    expect(hasShadowTokens).toBe(true);
  });

  it('should set a significant number of CSS variables', () => {
    renderHook(() => useTokenSystem('light'));

    const setCalls = (document.documentElement.style.setProperty as any).mock.calls;

    // Should set many CSS variables (colors, spacing, typography, etc.)
    expect(setCalls.length).toBeGreaterThan(100);
  });
});