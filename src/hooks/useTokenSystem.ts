/**
 * Token System Hook
 *
 * Bridges the 3-tier token system to CSS variables for real-time theme updates.
 * Handles theme switching, dark mode, and dynamic brand color updates.
 */

import { useEffect, useMemo } from 'react';
import { converter, formatRgb } from 'culori';
import {
  tokens,
  generateBrandPalette,
  getSemanticValue,
  primitiveColors,
  semanticColors,
  type Theme
} from '../design-system/tokens';
import { useDesignSystem, type CornerRadius, type BorderWeight } from '../state/designSystem';

/**
 * Convert OKLCH string to RGB for CSS variables
 * CSS variables need RGB values for alpha channel support
 */
function oklchToRGB(oklch: string): string {
  // This is a simplified conversion - in production use a library like culori
  // For now, return a fallback RGB value
  // The browser will handle OKLCH natively if supported

  // Check if it's actually an OKLCH value
  if (!oklch.startsWith('oklch(')) {
    return oklch; // Return as-is if not OKLCH
  }

  // For now, we'll use OKLCH directly in modern browsers
  // and provide a fallback for older browsers
  return oklch;
}

/**
 * Extract RGB values from OKLCH for use with alpha
 * Returns format like "26 188 156" for rgb(26 188 156)
 */
function oklchToRGBValues(oklch: string): string {
  // Handle null/undefined values
  if (!oklch || typeof oklch !== 'string') {
    return '128 128 128'; // Default gray
  }

  try {
    // Use culori to convert OKLCH to RGB
    const toRgb = converter('rgb');
    const rgb = toRgb(oklch);

    if (!rgb) {
      return '128 128 128';
    }

    // Convert to 0-255 range and format as space-separated values
    const r = Math.round((rgb.r || 0) * 255);
    const g = Math.round((rgb.g || 0) * 255);
    const b = Math.round((rgb.b || 0) * 255);

    return `${r} ${g} ${b}`;
  } catch (error) {
    console.error('Error converting OKLCH to RGB:', oklch, error);
    return '128 128 128';
  }
}

// Color theme mappings
const colorThemes: Record<string, string> = {
  turquoise: '#1abc9c',
  emerald: '#2ecc71',
  nephritis: '#27ae60',
  'peter-river': '#3498db',
  'belize-hole': '#2980b9',
  amethyst: '#9b59b6',
  wisteria: '#8e44ad',
  'wet-asphalt': '#34495e',
  'midnight-blue': '#2c3e50',
  'sun-flower': '#f1c40f',
  orange: '#f39c12',
  carrot: '#e67e22',
  pumpkin: '#d35400',
  alizarin: '#e74c3c',
  pomegranate: '#c0392b',
  concrete: '#95a5a6',
  asbestos: '#7f8c8d'
};

/**
 * Hook to apply token system to CSS variables
 */
export function useTokenSystem(theme: Theme = 'light') {
  const {
    selectedTheme,
    customPrimaryColor,
    selectedPrimaryFont,
    selectedDisplayFont,
    cornerRadius,
    opts
  } = useDesignSystem();

  // Compute primary color from theme selection
  const primaryColor = selectedTheme === 'custom'
    ? customPrimaryColor || '#3498db'
    : colorThemes[selectedTheme] || '#3498db';

  // Convert corner radius to roundness multiplier
  const roundnessMultipliers: Record<CornerRadius, number> = {
    none: 0,
    small: 0.5,
    medium: 1,
    large: 1.5
  };
  const roundness = roundnessMultipliers[cornerRadius] || 1;

  // Convert border weight to pixel values
  const borderWeightMap: Record<BorderWeight, number> = {
    none: 0,
    thin: 1,
    thick: 2
  };
  const inputBorderWidth = borderWeightMap[opts.inputBorderWeight] || 1;
  const cardBorderWidth = borderWeightMap[opts.cardBorderWeight] || 0;

  // Generate brand palette from primary color
  const brandPalette = useMemo(() => {
    return generateBrandPalette(primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    const root = document.documentElement;

    // Add theme class
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Apply primitive color scales as CSS variables
    Object.entries(primitiveColors).forEach(([colorName, scale]) => {
      if (typeof scale === 'object' && !Array.isArray(scale)) {
        Object.entries(scale).forEach(([step, value]) => {
          root.style.setProperty(`--color-${colorName}-${step}`, value);
        });
      } else if (typeof scale === 'string') {
        root.style.setProperty(`--color-${colorName}`, scale);
      }
    });

    // Apply brand palette
    Object.entries(brandPalette.brand).forEach(([step, value]) => {
      root.style.setProperty(`--color-brand-${step}`, value);
    });

    // Apply semantic colors for current theme
    Object.entries(semanticColors).forEach(([category, tokens]) => {
      Object.entries(tokens).forEach(([name, token]) => {
        if (token && typeof token === 'object' && 'light' in token && 'dark' in token) {
          const value = getSemanticValue(token, theme);
          root.style.setProperty(`--color-${category}-${name}`, value);

          // Also set RGB values for alpha support
          const rgbValues = oklchToRGBValues(value);
          root.style.setProperty(`--color-${category}-${name}-rgb`, rgbValues);
        }
      });
    });

    // Apply spacing tokens
    Object.entries(tokens.primitive.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, `${value}px`);
    });

    // Apply typography tokens
    Object.entries(tokens.primitive.fontSizes).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, `${value}px`);
    });

    Object.entries(tokens.primitive.lineHeights).forEach(([key, value]) => {
      root.style.setProperty(`--line-height-${key}`, String(value));
    });

    Object.entries(tokens.primitive.fontWeights).forEach(([key, value]) => {
      root.style.setProperty(`--font-weight-${key}`, String(value));
    });

    // Apply radius tokens with roundness multiplier
    Object.entries(tokens.primitive.radii).forEach(([key, value]) => {
      const adjustedValue = key === 'full' ? value : value * roundness;
      root.style.setProperty(`--radius-${key}`, `${adjustedValue}px`);
    });

    // Apply shadow tokens
    Object.entries(tokens.primitive.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // Apply font families
    // Convert font class names to actual font family names
    const fontFamilyMap: Record<string, string> = {
      'font-jakarta': 'Plus Jakarta Sans',
      'font-vietnam': 'Be Vietnam Pro',
      'font-wix': 'Wix Madefor Text',
      'font-figtree': 'Figtree',
      'font-albert': 'Albert Sans',
      'font-satoshi': 'Satoshi',
      'font-epilogue': 'Epilogue',
      'font-manrope': 'Manrope',
      'font-public': 'Public Sans',
      'font-space': 'Space Grotesk',
      'font-work': 'Work Sans',
      'font-source-sans': 'Source Sans 3',
      'font-nunito': 'Nunito Sans',
      'font-arimo': 'Arimo',
      'font-hanken': 'Hanken Grotesk',
      'font-rubik': 'Rubik',
      'font-dm': 'DM Sans',
      'font-ibm': 'IBM Plex Sans',
      'font-sora': 'Sora',
      'font-montserrat': 'Montserrat',
      'font-newsreader': 'Newsreader',
      'font-noto': 'Noto Serif',
      'font-domine': 'Domine',
      'font-libre': 'Libre Caslon Text',
      'font-garamond': 'EB Garamond',
      'font-literata': 'Literata',
      'font-source-serif': 'Source Serif 4'
    };

    const primaryFont = fontFamilyMap[selectedPrimaryFont] || 'Plus Jakarta Sans';
    const displayFont = fontFamilyMap[selectedDisplayFont] || 'Plus Jakarta Sans';

    root.style.setProperty('--font-family', primaryFont.includes(' ') ? `"${primaryFont}"` : primaryFont);
    root.style.setProperty('--font-display', displayFont.includes(' ') ? `"${displayFont}"` : displayFont);

    // Apply component-specific tokens
    Object.entries(tokens.component).forEach(([component, componentTokens]) => {
      Object.entries(componentTokens).forEach(([prop, value]) => {
        if (typeof value === 'object') {
          Object.entries(value).forEach(([size, sizeValue]) => {
            root.style.setProperty(`--${component}-${prop}-${size}`, `${sizeValue}px`);
          });
        } else {
          root.style.setProperty(`--${component}-${prop}`, String(value));
        }
      });
    });

    // Apply border styles
    root.style.setProperty('--input-border-width', `${inputBorderWidth}px`);
    root.style.setProperty('--card-border-width', `${cardBorderWidth}px`);

    // Apply transition tokens
    Object.entries(tokens.primitive.transitions).forEach(([key, value]) => {
      root.style.setProperty(`--transition-${key}`, value);
    });

    // Apply duration tokens
    Object.entries(tokens.primitive.durations).forEach(([key, value]) => {
      root.style.setProperty(`--duration-${key}`, `${value}ms`);
    });

    // Apply easing tokens
    Object.entries(tokens.primitive.easings).forEach(([key, value]) => {
      root.style.setProperty(`--easing-${key}`, value);
    });

    // Apply z-index tokens
    Object.entries(tokens.primitive.zIndices).forEach(([key, value]) => {
      root.style.setProperty(`--z-${key}`, String(value));
    });

    // Backwards compatibility - map to old variable names
    // These can be removed once all components are migrated
    const primaryDefault = getSemanticValue(semanticColors.primary.default, theme);
    const textPrimary = getSemanticValue(semanticColors.text.primary, theme);
    const textSecondary = getSemanticValue(semanticColors.text.secondary, theme);
    const canvasDefault = getSemanticValue(semanticColors.canvas.default, theme);
    const surfaceDefault = getSemanticValue(semanticColors.surface.default, theme);
    const borderDefault = getSemanticValue(semanticColors.border.default, theme);

    root.style.setProperty('--color-brand', oklchToRGBValues(primaryDefault));
    root.style.setProperty('--color-brand-weak', oklchToRGBValues(brandPalette.brand[100]));
    root.style.setProperty('--color-text-primary', oklchToRGBValues(textPrimary));
    root.style.setProperty('--color-text-secondary', oklchToRGBValues(textSecondary));
    root.style.setProperty('--color-text-disabled', oklchToRGBValues(getSemanticValue(semanticColors.text.disabled, theme)));
    root.style.setProperty('--color-bg-primary', oklchToRGBValues(canvasDefault));
    root.style.setProperty('--color-bg-secondary', oklchToRGBValues(surfaceDefault));
    root.style.setProperty('--color-border', oklchToRGBValues(borderDefault));
    root.style.setProperty('--color-focus', oklchToRGBValues(getSemanticValue(semanticColors.focus.ring, theme)));
    root.style.setProperty('--color-success', oklchToRGBValues(getSemanticValue(semanticColors.success.default, theme)));
    root.style.setProperty('--color-warning', oklchToRGBValues(getSemanticValue(semanticColors.warning.default, theme)));
    root.style.setProperty('--color-info', oklchToRGBValues(getSemanticValue(semanticColors.info.default, theme)));
    root.style.setProperty('--color-danger', oklchToRGBValues(getSemanticValue(semanticColors.danger.default, theme)));

    // Old spacing variables for compatibility
    root.style.setProperty('--space-1', '8px');
    root.style.setProperty('--space-2', '16px');
    root.style.setProperty('--space-3', '24px');
    root.style.setProperty('--space-4', '32px');
    root.style.setProperty('--space-5', '40px');
    root.style.setProperty('--space-6', '48px');

    // Old radius variables for compatibility
    root.style.setProperty('--radius-sm', `${4 * roundness}px`);
    root.style.setProperty('--radius-md', `${8 * roundness}px`);
    root.style.setProperty('--radius-lg', `${12 * roundness}px`);
    root.style.setProperty('--radius-full', '9999px');

    // Tailwind CSS variable mappings
    // These override the static CSS values when theme changes
    // Note: Tailwind expects HSL values WITHOUT the hsl() wrapper
    // Update Tailwind variables based on current theme
    if (theme === 'dark') {
      root.style.setProperty('--background', '0 0% 7%');
      root.style.setProperty('--foreground', '0 0% 88%');
      root.style.setProperty('--card', '0 0% 12%');
      root.style.setProperty('--card-foreground', '0 0% 88%');
      root.style.setProperty('--popover', '0 0% 12%');
      root.style.setProperty('--popover-foreground', '0 0% 88%');
      root.style.setProperty('--muted', '0 0% 17%');
      root.style.setProperty('--muted-foreground', '0 0% 66%');
      root.style.setProperty('--accent', '0 0% 17%');
      root.style.setProperty('--accent-foreground', '0 0% 88%');
      root.style.setProperty('--border', '0 0% 17%');
      root.style.setProperty('--input', '0 0% 17%');
      root.style.setProperty('--text-primary', '0 0% 88%');
      root.style.setProperty('--text-secondary', '0 0% 66%');
    } else {
      root.style.setProperty('--background', '0 0% 100%');
      root.style.setProperty('--foreground', '240 10% 3.9%');
      root.style.setProperty('--card', '0 0% 100%');
      root.style.setProperty('--card-foreground', '240 10% 3.9%');
      root.style.setProperty('--popover', '0 0% 100%');
      root.style.setProperty('--popover-foreground', '240 10% 3.9%');
      root.style.setProperty('--muted', '210 40% 96%');
      root.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%');
      root.style.setProperty('--accent', '210 40% 96%');
      root.style.setProperty('--accent-foreground', '222.2 84% 4.9%');
      root.style.setProperty('--border', '214.3 31.8% 91.4%');
      root.style.setProperty('--input', '214.3 31.8% 91.4%');
      root.style.setProperty('--text-primary', '210 11% 11%');
      root.style.setProperty('--text-secondary', '210 6% 39%');
    }

  }, [theme, primaryColor, selectedPrimaryFont, selectedDisplayFont, roundness, inputBorderWidth, cardBorderWidth, brandPalette]);

  return {
    tokens,
    theme,
    brandPalette
  };
}

/**
 * Hook to get current theme from system preference or user setting
 */
export function useTheme(): Theme {
  const { isDarkMode } = useDesignSystem();
  return isDarkMode ? 'dark' : 'light';
}