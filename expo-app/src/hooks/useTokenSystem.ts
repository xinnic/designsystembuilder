import { useEffect } from 'react';
import { useDesignSystem } from '../state/designSystem';
import { generateColorScale, hexToOKLCH } from '../design-system/tokens/primitives';

/**
 * Hook that syncs Zustand design system state to CSS variables for NativeWind
 * This enables token-based styling via Tailwind utility classes
 */
export function useTokenSystem() {
  const state = useDesignSystem();

  useEffect(() => {
    if (typeof document === 'undefined') return; // Skip on native

    const root = document.documentElement;

    // Generate OKLCH color scales from current colors
    const brandOKLCH = hexToOKLCH(state.customPrimaryColor);
    const brandScale = generateColorScale('brand', brandOKLCH);

    const accentOKLCH = hexToOKLCH(state.customAccentColor);
    const accentScale = generateColorScale('accent', accentOKLCH);

    // Map brand color scale (50-950)
    Object.entries(brandScale).forEach(([key, value]) => {
      root.style.setProperty(`--color-brand-${key}`, value);
    });

    // Map accent color scale (50-950)
    Object.entries(accentScale).forEach(([key, value]) => {
      root.style.setProperty(`--color-accent-${key}`, value);
    });

    // Semantic surface colors (light/dark mode aware)
    if (state.isDarkMode) {
      root.style.setProperty('--color-surface', 'oklch(0.15 0.005 250)');
      root.style.setProperty('--color-surface-secondary', 'oklch(0.20 0.008 250)');
      root.style.setProperty('--color-surface-tertiary', 'oklch(0.25 0.01 250)');
      root.style.setProperty('--color-on-surface', 'oklch(0.95 0.002 250)');
      root.style.setProperty('--color-on-surface-secondary', 'oklch(0.70 0.01 250)');
      root.style.setProperty('--color-border', 'oklch(0.30 0.01 250)');
    } else {
      root.style.setProperty('--color-surface', 'oklch(1.0 0 0)');
      root.style.setProperty('--color-surface-secondary', 'oklch(0.97 0.002 250)');
      root.style.setProperty('--color-surface-tertiary', 'oklch(0.94 0.004 250)');
      root.style.setProperty('--color-on-surface', 'oklch(0.15 0.002 250)');
      root.style.setProperty('--color-on-surface-secondary', 'oklch(0.45 0.01 250)');
      root.style.setProperty('--color-border', 'oklch(0.88 0.006 250)');
    }

    // Border radius based on cornerRadius setting
    const radiusMap = {
      none: { sm: '0px', md: '0px', lg: '0px', xl: '0px' },
      small: { sm: '2px', md: '4px', lg: '6px', xl: '8px' },
      medium: { sm: '4px', md: '8px', lg: '12px', xl: '16px' },
      large: { sm: '8px', md: '12px', lg: '16px', xl: '24px' },
    };
    const radii = radiusMap[state.cornerRadius];
    root.style.setProperty('--radius-sm', radii.sm);
    root.style.setProperty('--radius-md', radii.md);
    root.style.setProperty('--radius-lg', radii.lg);
    root.style.setProperty('--radius-xl', radii.xl);

    // Fonts
    root.style.setProperty('--font-body', state.selectedPrimaryFont);
    root.style.setProperty('--font-display', state.selectedDisplayFont);

    // Dark mode class toggle
    if (state.isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [
    state.customPrimaryColor,
    state.customAccentColor,
    state.isDarkMode,
    state.cornerRadius,
    state.selectedPrimaryFont,
    state.selectedDisplayFont,
  ]);
}
