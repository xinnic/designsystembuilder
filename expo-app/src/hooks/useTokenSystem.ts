import { useEffect } from 'react';
import { useDesignSystem } from '../state/designSystem';
import { generateColorScale, hexToOKLCH } from '../design-system/tokens/primitives';
import { COLOR_VALUES } from '../config/colorThemes';

// Font family map — must match the one in designSystem.ts
const fontFamilyMap: Record<string, string> = {
  'font-jakarta': 'Plus Jakarta Sans, ui-sans-serif, system-ui',
  'font-vietnam': 'Be Vietnam Pro, ui-sans-serif, system-ui',
  'font-wix': 'Wix Madefor Text, ui-sans-serif, system-ui',
  'font-figtree': 'Figtree, ui-sans-serif, system-ui',
  'font-albert': 'Albert Sans, ui-sans-serif, system-ui',
  'font-satoshi': 'Satoshi, ui-sans-serif, system-ui',
  'font-epilogue': 'Epilogue, ui-sans-serif, system-ui',
  'font-manrope': 'Manrope, ui-sans-serif, system-ui',
  'font-public': 'Public Sans, ui-sans-serif, system-ui',
  'font-space': 'Space Grotesk, ui-sans-serif, system-ui',
  'font-work': 'Work Sans, ui-sans-serif, system-ui',
  'font-source-sans': 'Source Sans 3, ui-sans-serif, system-ui',
  'font-nunito': 'Nunito Sans, ui-sans-serif, system-ui',
  'font-arimo': 'Arimo, ui-sans-serif, system-ui',
  'font-hanken': 'Hanken Grotesk, ui-sans-serif, system-ui',
  'font-rubik': 'Rubik, ui-sans-serif, system-ui',
  'font-dm': 'DM Sans, ui-sans-serif, system-ui',
  'font-ibm': 'IBM Plex Sans, ui-sans-serif, system-ui',
  'font-sora': 'Sora, ui-sans-serif, system-ui',
  'font-newsreader': 'Newsreader, ui-serif, serif',
  'font-noto': 'Noto Serif, ui-serif, serif',
  'font-domine': 'Domine, ui-serif, serif',
  'font-libre': 'Libre Caslon Text, ui-serif, serif',
  'font-garamond': 'EB Garamond, ui-serif, serif',
  'font-literata': 'Literata, ui-serif, serif',
  'font-source-serif': 'Source Serif 4, ui-serif, serif',
  'font-montserrat': 'Montserrat, ui-sans-serif, system-ui',
};

/**
 * Hook that syncs Zustand design system state to CSS variables for NativeWind
 * This enables token-based styling via Tailwind utility classes
 *
 * IMPORTANT: Uses renderVersion as dependency to ensure CSS vars update
 * on ANY store change (color, font, theme, preset, spacing, etc.)
 */
export function useTokenSystem() {
  const state = useDesignSystem();

  useEffect(() => {
    if (typeof document === 'undefined') return; // Skip on native

    const root = document.documentElement;

    // Resolve actual primary color from theme name + COLOR_VALUES
    // (same logic as the Zustand subscriber in designSystem.ts)
    const colorMap = COLOR_VALUES as Record<string, string>;
    const resolvedPrimary =
      state.selectedTheme === 'custom' && state.customPrimaryColor
        ? state.customPrimaryColor
        : colorMap[state.selectedTheme] || '#1abc9c';

    const resolvedAccent =
      state.selectedAccentColor === 'custom' && state.customAccentColor
        ? state.customAccentColor
        : colorMap[state.selectedAccentColor] || '#1abc9c';

    // Generate OKLCH color scales from resolved colors
    const brandOKLCH = hexToOKLCH(resolvedPrimary);
    const brandScale = generateColorScale('brand', brandOKLCH);

    const accentOKLCH = hexToOKLCH(resolvedAccent);
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

    // Fonts — resolve class name to actual font family string
    const bodyFont = fontFamilyMap[state.selectedPrimaryFont] || fontFamilyMap['font-jakarta'];
    const displayFont = fontFamilyMap[state.selectedDisplayFont] || fontFamilyMap['font-jakarta'];
    root.style.setProperty('--font-body', bodyFont);
    root.style.setProperty('--font-display', displayFont);

    // Dark mode class toggle
    if (state.isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [
    // Use renderVersion to catch ALL store changes
    state.renderVersion,
    state.selectedTheme,
    state.customPrimaryColor,
    state.selectedAccentColor,
    state.customAccentColor,
    state.isDarkMode,
    state.cornerRadius,
    state.selectedPrimaryFont,
    state.selectedDisplayFont,
  ]);
}
