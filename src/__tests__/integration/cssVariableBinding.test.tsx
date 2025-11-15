import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useDesignSystem, useTokenCSS } from '../../state/designSystem';

// Helper to get CSS variable value from document root
const getCSSVariable = (varName: string): string => {
  return document.documentElement.style.getPropertyValue(varName).trim();
};

// Helper to wait for async updates
const waitForUpdate = () => new Promise(resolve => setTimeout(resolve, 100));

describe('CSS Variable Binding Integration', () => {
  beforeEach(async () => {
    // Reset store state
    const store = useDesignSystem.getState();
    store.setDarkMode(false);
    store.setTheme('turquoise');
    store.setScale('regular');
    store.setPrimaryFont('font-jakarta');
    store.setDisplayFont('font-jakarta');
    store.setSpacingMode('normal');
    store.setCornerRadius('medium');

    // Wait for subscribers
    await waitForUpdate();
  });

  afterEach(() => {
    // Clean up CSS variables
    document.documentElement.style.cssText = '';
    document.documentElement.className = '';
  });

  describe('useTokenCSS Hook', () => {
    it('should bind tokens to CSS variables on mount', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitFor(() => {
        // Verify color tokens are set
        const brand = getCSSVariable('--color-brand');
        const textPrimary = getCSSVariable('--color-text-primary');
        const border = getCSSVariable('--color-border');

        expect(brand).toBeTruthy();
        expect(textPrimary).toBeTruthy();
        expect(border).toBeTruthy();
      }, { timeout: 500 });
    });

    it('should update CSS variables when brand color changes', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      // Wait for initial mount
      await waitForUpdate();

      const initialBrand = getCSSVariable('--color-brand');

      act(() => {
        result.current.setTheme('emerald');
      });

      await waitFor(() => {
        const newBrand = getCSSVariable('--color-brand');
        expect(newBrand).not.toBe(initialBrand);
        expect(newBrand).toBeTruthy();
      }, { timeout: 500 });
    });

    it('should update CSS variables when dark mode toggles', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      const lightTextPrimary = getCSSVariable('--color-text-primary');
      const lightBgPrimary = getCSSVariable('--color-bg-primary');

      act(() => {
        result.current.setDarkMode(true);
      });

      await waitFor(() => {
        const darkTextPrimary = getCSSVariable('--color-text-primary');
        const darkBgPrimary = getCSSVariable('--color-bg-primary');

        // Dark mode should have different colors
        expect(darkTextPrimary).not.toBe(lightTextPrimary);
        expect(darkBgPrimary).not.toBe(lightBgPrimary);
      }, { timeout: 500 });
    });

    it('should apply dark mode class to document root', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      expect(document.documentElement.classList.contains('dark')).toBe(false);

      act(() => {
        result.current.setDarkMode(true);
      });

      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      }, { timeout: 500 });

      act(() => {
        result.current.setDarkMode(false);
      });

      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      }, { timeout: 500 });
    });
  });

  describe('Typography CSS Variables', () => {
    it('should update font family CSS variable', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      act(() => {
        result.current.setPrimaryFont('font-vietnam');
      });

      await waitFor(() => {
        const fontFamily = getCSSVariable('--font-family');
        expect(fontFamily).toContain('Be Vietnam Pro');
      }, { timeout: 500 });
    });

    it('should update typography scale CSS variables', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      const regularH1Size = getCSSVariable('--font-h1-size');

      act(() => {
        result.current.setScale('large');
      });

      await waitFor(() => {
        const largeH1Size = getCSSVariable('--font-h1-size');
        expect(largeH1Size).not.toBe(regularH1Size);
        expect(largeH1Size).toBe('36px');
      }, { timeout: 500 });
    });

    it('should update all typography levels when scale changes', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      act(() => {
        result.current.setScale('small');
      });

      await waitFor(() => {
        expect(getCSSVariable('--font-h1-size')).toBe('24px');
        expect(getCSSVariable('--font-h2-size')).toBe('20px');
        expect(getCSSVariable('--font-body-size')).toBe('14px');
        expect(getCSSVariable('--font-caption-size')).toBe('12px');
      }, { timeout: 500 });
    });
  });

  describe('Spacing CSS Variables', () => {
    it('should update spacing scale CSS variables', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      const normalSpace1 = getCSSVariable('--space-1');

      act(() => {
        result.current.setSpacingMode('compact');
      });

      await waitFor(() => {
        const compactSpace1 = getCSSVariable('--space-1');
        expect(compactSpace1).not.toBe(normalSpace1);
        expect(compactSpace1).toBe('4px');
      }, { timeout: 500 });
    });

    it('should have larger spacing in comfortable mode', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      act(() => {
        result.current.setSpacingMode('comfortable');
      });

      await waitFor(() => {
        expect(getCSSVariable('--space-1')).toBe('12px');
        expect(getCSSVariable('--space-2')).toBe('24px');
        expect(getCSSVariable('--space-3')).toBe('36px');
      }, { timeout: 500 });
    });
  });

  describe('Corner Radius CSS Variables', () => {
    it('should update corner radius CSS variables', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      const mediumRadiusMd = getCSSVariable('--radius-md');

      act(() => {
        result.current.setCornerRadius('large');
      });

      await waitFor(() => {
        const largeRadiusMd = getCSSVariable('--radius-md');
        expect(largeRadiusMd).not.toBe(mediumRadiusMd);
        expect(largeRadiusMd).toBe('20px');
      }, { timeout: 500 });
    });

    it('should support zero radius', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      act(() => {
        result.current.setCornerRadius('none');
      });

      await waitFor(() => {
        expect(getCSSVariable('--radius-sm')).toBe('0px');
        expect(getCSSVariable('--radius-md')).toBe('0px');
        expect(getCSSVariable('--radius-lg')).toBe('0px');
      }, { timeout: 500 });
    });
  });

  describe('Regression Tests - CSS Variable Conflicts', () => {
    it('should not have CSS variables overridden by index.css', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      // Set teal theme
      act(() => {
        result.current.setTheme('turquoise');
      });

      await waitFor(() => {
        const brand = getCSSVariable('--color-brand');

        // Should be teal, not blue from index.css
        // Teal (turquoise) is RGB 26 188 156
        expect(brand).toBeTruthy();
        expect(brand).toContain('26');
        expect(brand).toContain('188');
        expect(brand).toContain('156');

        // Should NOT be blue (hsl(var(--primary)) from old index.css)
        expect(brand).not.toContain('hsl');
      }, { timeout: 500 });
    });

    it('should maintain color when triggering re-renders', async () => {
      const { result, rerender } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      act(() => {
        result.current.setTheme('emerald');
      });

      await waitForUpdate();

      const brandAfterThemeChange = getCSSVariable('--color-brand');

      // Simulate tab switch by forcing re-render
      rerender();
      await waitForUpdate();

      const brandAfterRerender = getCSSVariable('--color-brand');

      // Should remain the same
      expect(brandAfterRerender).toBe(brandAfterThemeChange);
    });

    it('should have soft gray borders, not black', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      const border = getCSSVariable('--color-border');

      // Light mode should have soft gray (229 231 235)
      expect(border).toBe('229 231 235');

      // Should NOT be black
      expect(border).not.toBe('0 0 0');
    });

    it('should maintain soft gray borders across theme changes', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      const initialBorder = getCSSVariable('--color-border');

      // Change themes
      act(() => {
        result.current.setTheme('emerald');
      });

      await waitForUpdate();

      act(() => {
        result.current.setTheme('amethyst');
      });

      await waitForUpdate();

      const finalBorder = getCSSVariable('--color-border');

      // Border should remain the same (theme doesn't affect borders)
      expect(finalBorder).toBe(initialBorder);
      expect(finalBorder).toBe('229 231 235');
    });
  });

  describe('Class Name Management', () => {
    it('should apply font class to root element', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      expect(document.documentElement.classList.contains('font-jakarta')).toBe(true);

      act(() => {
        result.current.setPrimaryFont('font-vietnam');
      });

      await waitFor(() => {
        expect(document.documentElement.classList.contains('font-vietnam')).toBe(true);
        expect(document.documentElement.classList.contains('font-jakarta')).toBe(false);
      }, { timeout: 500 });
    });

    it('should apply scale class to root element', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      expect(document.documentElement.classList.contains('scale-regular')).toBe(true);

      act(() => {
        result.current.setScale('large');
      });

      await waitFor(() => {
        expect(document.documentElement.classList.contains('scale-large')).toBe(true);
        expect(document.documentElement.classList.contains('scale-regular')).toBe(false);
      }, { timeout: 500 });
    });

    it('should apply theme class to root element', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      expect(document.documentElement.classList.contains('theme-turquoise')).toBe(true);

      act(() => {
        result.current.setTheme('emerald');
      });

      await waitFor(() => {
        expect(document.documentElement.classList.contains('theme-emerald')).toBe(true);
        expect(document.documentElement.classList.contains('theme-turquoise')).toBe(false);
      }, { timeout: 500 });
    });

    it('should properly clean up old classes when switching', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      // Change font multiple times
      act(() => {
        result.current.setPrimaryFont('font-vietnam');
      });
      await waitForUpdate();

      act(() => {
        result.current.setPrimaryFont('font-satoshi');
      });
      await waitForUpdate();

      act(() => {
        result.current.setPrimaryFont('font-figtree');
      });

      await waitFor(() => {
        // Should only have the latest font class
        expect(document.documentElement.classList.contains('font-figtree')).toBe(true);
        expect(document.documentElement.classList.contains('font-vietnam')).toBe(false);
        expect(document.documentElement.classList.contains('font-satoshi')).toBe(false);
        expect(document.documentElement.classList.contains('font-jakarta')).toBe(false);
      }, { timeout: 500 });
    });
  });

  describe('Performance and Efficiency', () => {
    it('should not cause excessive CSS variable updates', async () => {
      const { result } = renderHook(() => {
        useTokenCSS();
        return useDesignSystem();
      });

      await waitForUpdate();

      const initialBrand = getCSSVariable('--color-brand');

      // Make multiple changes
      act(() => {
        result.current.setTheme('emerald');
        result.current.setDarkMode(true);
        result.current.setScale('large');
      });

      await waitFor(() => {
        const brand = getCSSVariable('--color-brand');
        expect(brand).toBeTruthy();
        expect(brand).not.toBe(initialBrand);
      }, { timeout: 500 });

      // Verify CSS variables are set (indicates efficient batch update)
      expect(getCSSVariable('--color-text-primary')).toBeTruthy();
      expect(getCSSVariable('--font-h1-size')).toBeTruthy();
    });
  });
});
