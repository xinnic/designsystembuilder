/**
 * Token System Hook
 *
 * Bridges the 3-tier token system to CSS variables for real-time theme updates.
 * Handles theme switching, dark mode, and dynamic brand color updates.
 */

import { useEffect, useMemo } from 'react';
import { clampChroma, converter, formatRgb } from 'culori';
import {
  tokens,
  generateBrandPalette,
  getSemanticValue,
  primitiveColors,
  semanticColors,
  type Theme
} from '../design-system/tokens';
import { useDesignSystem, type CornerRadius, type BorderWeight } from '../state/designSystem';
import { getStylePreset, type StylePresetId } from '../config/stylePresets';
import { deriveShadowColor, ensureReadableOnWhite, shadowBleed } from '../utils/colorGeneration';

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
    // Reduce chroma until the colour fits in sRGB before converting. Without
    // this, wide-gamut OKLCH values produce channels outside 0–1, which used to
    // emit CSS like `rgb(-97 113 50)` — invalid, so the whole declaration was
    // dropped and the element fell back to whatever it inherited.
    const toRgb = converter('rgb');
    const rgb = toRgb(clampChroma(oklch, 'oklch'));

    if (!rgb) {
      return '128 128 128';
    }

    const channel = (value: number | undefined) =>
      Math.round(Math.max(0, Math.min(1, value ?? 0)) * 255);

    return `${channel(rgb.r)} ${channel(rgb.g)} ${channel(rgb.b)}`;
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
    spacingMode,
    stylePresetId,
    tokens: storeTokens,
    opts
  } = useDesignSystem();

  // Compute primary color from theme selection.
  // Deepened where needed so white labels on a solid brand fill stay readable —
  // several presets (turquoise, emerald, sun-flower) are otherwise too light.
  const pickedColor = selectedTheme === 'custom'
    ? customPrimaryColor || '#3498db'
    : colorThemes[selectedTheme] || '#3498db';
  const primaryColor = ensureReadableOnWhite(pickedColor);

  // Convert corner radius to roundness multiplier
  const roundnessMultipliers: Record<CornerRadius, number> = {
    none: 0,
    small: 0.5,
    medium: 1,
    large: 2
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
          let value = getSemanticValue(token, theme);

          // Override primary colors with dynamic brand palette
          if (category === 'primary') {
            const lightMap: Record<string, number | string> = {
              default: 500, hover: 600, active: 700,
              subtle: 50, subtleHover: 100, subtleActive: 200,
              text: 600, textHover: 700, border: 200, borderHover: 300,
              foreground: 'white'
            };
            const darkMap: Record<string, number | string> = {
              default: 400, hover: 300, active: 500,
              subtle: 950, subtleHover: 900, subtleActive: 800,
              text: 400, textHover: 300, border: 800, borderHover: 700,
              foreground: 'white'
            };

            const map = theme === 'dark' ? darkMap : lightMap;
            if (name in map) {
              const step = map[name];
              if (step !== 'white') {
                value = brandPalette.brand[step as number];
              }
            }
          }

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

    // Backwards compatibility - map to old variable names used by Tamagui config
    // These bridge the token system to Tamagui's rgb(var(--color-*)) pattern
    const primaryDefault = theme === 'dark' ? brandPalette.brand[400] : brandPalette.brand[500];
    const primaryRgb = oklchToRGBValues(primaryDefault);
    const textPrimary = getSemanticValue(semanticColors.text.primary, theme);
    const textSecondary = getSemanticValue(semanticColors.text.secondary, theme);
    const canvasDefault = getSemanticValue(semanticColors.canvas.default, theme);
    const surfaceDefault = getSemanticValue(semanticColors.surface.default, theme);
    const borderDefault = getSemanticValue(semanticColors.border.default, theme);

    // Brand colors - RGB triplets for use with rgb() wrapper in Tamagui config
    root.style.setProperty('--color-brand', primaryRgb);
    root.style.setProperty('--color-brand-weak', oklchToRGBValues(brandPalette.brand[100]));
    
    // Text colors
    root.style.setProperty('--color-text-primary', oklchToRGBValues(textPrimary));
    root.style.setProperty('--color-text-secondary', oklchToRGBValues(textSecondary));
    root.style.setProperty('--color-text-disabled', oklchToRGBValues(getSemanticValue(semanticColors.text.disabled, theme)));
    
    // Background colors
    root.style.setProperty('--color-bg-primary', oklchToRGBValues(canvasDefault));
    root.style.setProperty('--color-bg-secondary', oklchToRGBValues(surfaceDefault));
    
    // Border and semantic colors
    root.style.setProperty('--color-border', oklchToRGBValues(borderDefault));
    root.style.setProperty('--color-focus', oklchToRGBValues(getSemanticValue(semanticColors.focus.ring, theme)));
    root.style.setProperty('--color-success', oklchToRGBValues(getSemanticValue(semanticColors.success.default, theme)));
    root.style.setProperty('--color-warning', oklchToRGBValues(getSemanticValue(semanticColors.warning.default, theme)));
    root.style.setProperty('--color-info', oklchToRGBValues(getSemanticValue(semanticColors.info.default, theme)));
    root.style.setProperty('--color-danger', oklchToRGBValues(getSemanticValue(semanticColors.danger.default, theme)));

    // Old spacing variables for compatibility
    root.style.setProperty('--space-1', '4px');
    root.style.setProperty('--space-2', '8px');
    root.style.setProperty('--space-3', '12px');
    root.style.setProperty('--space-4', '16px');
    root.style.setProperty('--space-5', '20px');
    root.style.setProperty('--space-6', '24px');

    // Old radius variables for compatibility
    root.style.setProperty('--radius-sm', `${4 * roundness}px`);
    root.style.setProperty('--radius-md', `${8 * roundness}px`);
    root.style.setProperty('--radius-lg', `${12 * roundness}px`);
    root.style.setProperty('--radius-full', '9999px');

    // Tailwind CSS variable mappings
    // These override the static CSS values when theme changes
    // Note: Tailwind expects HSL values WITHOUT the hsl() wrapper
    // Update Tailwind variables based on current theme
    // Tailwind CSS variable mappings
    // Ensure these match standard HSL format: Hue Saturation% Lightness%
    if (theme === 'dark') {
      root.style.setProperty('--background', '222.2 84% 4.9%', 'important'); // Dark background
      root.style.setProperty('--foreground', '210 40% 98%', 'important');
      root.style.setProperty('--card', '222.2 84% 4.9%', 'important');
      root.style.setProperty('--card-foreground', '210 40% 98%', 'important');
      root.style.setProperty('--popover', '222.2 84% 4.9%', 'important');
      root.style.setProperty('--popover-foreground', '210 40% 98%', 'important');
      root.style.setProperty('--muted', '217.2 32.6% 17.5%', 'important');
      root.style.setProperty('--muted-foreground', '215 20.2% 65.1%', 'important');
      root.style.setProperty('--accent', '217.2 32.6% 17.5%', 'important');
      root.style.setProperty('--accent-foreground', '210 40% 98%', 'important');
      root.style.setProperty('--border', '217.2 32.6% 17.5%', 'important');
      root.style.setProperty('--input', '217.2 32.6% 17.5%', 'important');
      root.style.setProperty('--text-primary', '210 40% 98%', 'important');
      root.style.setProperty('--text-secondary', '215 20.2% 65.1%', 'important');
    } else {
      root.style.setProperty('--background', '0 0% 100%', 'important');
      root.style.setProperty('--foreground', '222.2 84% 4.9%', 'important');
      root.style.setProperty('--card', '0 0% 100%', 'important');
      root.style.setProperty('--card-foreground', '222.2 84% 4.9%', 'important');
      root.style.setProperty('--popover', '0 0% 100%', 'important');
      root.style.setProperty('--popover-foreground', '222.2 84% 4.9%', 'important');
      root.style.setProperty('--muted', '210 40% 96.1%', 'important');
      root.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%', 'important');
      root.style.setProperty('--accent', '210 40% 96.1%', 'important');
      root.style.setProperty('--accent-foreground', '222.2 47.4% 11.2%', 'important');
      root.style.setProperty('--border', '214.3 31.8% 91.4%', 'important');
      root.style.setProperty('--input', '214.3 31.8% 91.4%', 'important');
      root.style.setProperty('--text-primary', '222.2 84% 4.9%', 'important');
      root.style.setProperty('--text-secondary', '215.4 16.3% 46.9%', 'important');
    }

    // ──────────────────────────────────────────────────────────────────────
    // Design system layer — single source of truth.
    //
    // Written last so it wins over the primitive defaults above. Three
    // sidebar controls compose here:
    //   1. Style Preset  → shape language (shadow, border weight, radius profile)
    //   2. Corner Radius → roundness multiplier applied over the preset profile
    //   3. Spacing/Type Scale → density, straight from the store tokens
    //
    // Tamagui resolves its space/radius/font tokens from these variables, so
    // the sidebar, the phone mock and the showcase panels all move together.
    // ──────────────────────────────────────────────────────────────────────
    const preset = getStylePreset(stylePresetId as StylePresetId) || getStylePreset('modern-flat');
    const presetTokens = preset.tokens;

    // Radii — preset profile scaled by the Corner Radius control.
    // Pills (`full`) stay pills; they're a shape decision, not a roundness one.
    const scaleRadius = (value: number) => (value >= 9999 ? 9999 : Math.round(value * roundness));
    const radii = {
      none: 0,
      sm: scaleRadius(presetTokens.radius.sm),
      md: scaleRadius(presetTokens.radius.md),
      lg: scaleRadius(presetTokens.radius.lg),
      xl: scaleRadius(presetTokens.radius.xl),
      full: 9999,
    };
    Object.entries(radii).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, `${value}px`);
    });

    // Component radii — what Card / Button / Input actually bind to
    root.style.setProperty('--card-radius', `${scaleRadius(presetTokens.radius[presetTokens.card.radiusKey])}px`);
    root.style.setProperty('--button-radius', `${scaleRadius(presetTokens.radius[presetTokens.button.radiusKey])}px`);
    root.style.setProperty('--input-radius', `${scaleRadius(presetTokens.radius[presetTokens.input.radiusKey])}px`);

    // Elevation + border weight come straight from the preset.
    // `--shadow-color` has to be written before the shadows that reference it.
    const shadowColorHex = deriveShadowColor(primaryColor, theme === 'dark');
    root.style.setProperty('--shadow-color', shadowColorHex);

    // A preset that asks for 2px+ borders is going for the neo-brutalist look,
    // where the border and the hard shadow are the same colour. Leaving the
    // border on the default light grey made it read as a stray outline sitting
    // next to a heavy shadow.
    const usesBoldBorders = presetTokens.borderWidths.thin >= 2;
    if (usesBoldBorders) {
      root.style.setProperty('--color-border', oklchToRGBValues(shadowColorHex));
    }

    // The device frame in the preview follows the same logic: a bold-border
    // preset gets a heavy outline and the preset's own hard shadow, so the
    // phone doesn't sit in a soft drop shadow while everything inside it is
    // hard-edged. Everything else keeps the neutral 1px device chrome.
    root.style.setProperty(
      '--frame-border-width',
      usesBoldBorders ? `${presetTokens.borderWidths.thick}px` : '1px'
    );
    root.style.setProperty(
      '--frame-shadow',
      usesBoldBorders
        ? presetTokens.shadows.lg
        : '0 25px 50px -12px rgb(var(--color-brand) / 0.22)'
    );

    // Scroll containers reserve this much padding so hard offsets and wide
    // blurs aren't clipped at the overflow edge.
    const bleed = Math.min(
      20,
      Math.max(
        4,
        Math.ceil(
          Math.max(
            shadowBleed(presetTokens.shadows[presetTokens.card.shadowKey]),
            shadowBleed(presetTokens.shadows[presetTokens.button.shadowKey])
          )
        )
      )
    );
    root.style.setProperty('--shadow-bleed', `${bleed}px`);

    root.style.setProperty('--shadow-none', presetTokens.shadows.none);
    root.style.setProperty('--shadow-sm', presetTokens.shadows.sm);
    root.style.setProperty('--shadow-md', presetTokens.shadows.md);
    root.style.setProperty('--shadow-lg', presetTokens.shadows.lg);
    root.style.setProperty('--shadow-1', presetTokens.shadows.sm);
    root.style.setProperty('--shadow-2', presetTokens.shadows.md);
    root.style.setProperty('--shadow-3', presetTokens.shadows.lg);

    root.style.setProperty('--border-none', '0px');
    root.style.setProperty('--border-thin', `${presetTokens.borderWidths.thin}px`);
    root.style.setProperty('--border-medium', `${presetTokens.borderWidths.medium}px`);
    root.style.setProperty('--border-thick', `${presetTokens.borderWidths.thick}px`);
    root.style.setProperty('--border-focus', `${presetTokens.borderWidths.focus}px`);

    root.style.setProperty('--card-shadow', presetTokens.shadows[presetTokens.card.shadowKey]);
    root.style.setProperty('--card-border-width', `${presetTokens.borderWidths[presetTokens.card.borderWidthKey]}px`);
    root.style.setProperty('--button-shadow', presetTokens.shadows[presetTokens.button.shadowKey]);
    root.style.setProperty('--button-border-width', `${presetTokens.borderWidths[presetTokens.button.borderWidthKey]}px`);
    root.style.setProperty('--input-border-width', `${presetTokens.borderWidths[presetTokens.input.borderWidthKey]}px`);

    const presetBorderColor = theme === 'dark'
      ? presetTokens.colors.borderColorDark
      : presetTokens.colors.borderColor;
    root.style.setProperty('--border-color', presetBorderColor || `rgb(${storeTokens.border})`);

    // Spacing — Tamagui's $1..$16 ramp, scaled by the density mode
    const densityMultiplier = ({ compact: 0.75, normal: 1, comfortable: 1.25 } as const)[spacingMode] ?? 1;
    const baseSpace = [4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128, 256, 320];
    baseSpace.forEach((value, index) => {
      root.style.setProperty(`--space-${index + 1}`, `${Math.round(value * densityMultiplier)}px`);
    });
    root.style.setProperty('--space-half', `${Math.round(4 * densityMultiplier)}px`);
    root.style.setProperty('--space-true', `${Math.round(8 * densityMultiplier)}px`);

    // Type scale — drives every $display / $h1 / $body / … font token
    const typeScale = {
      display: storeTokens.displayLg,
      h1: storeTokens.h1,
      h2: storeTokens.h2,
      h3: storeTokens.h3,
      subhead: storeTokens.subhead,
      body: storeTokens.body,
      caption: storeTokens.caption,
      button: storeTokens.button,
      eyebrow: storeTokens.eyebrow,
    };
    Object.entries(typeScale).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value.size);
      root.style.setProperty(`--line-height-${key}`, value.line);
      root.style.setProperty(`--font-weight-${key}`, String(value.weight));

      // `--font-<style>-size` aliases. The plain-CSS token demos under
      // panels/TokenDemos read these; they were only ever declared in
      // styles/tokens.css under `:root.dsb-theme`, and that class is applied to
      // <body>, so the rule never matched and the demos rendered unstyled.
      root.style.setProperty(`--font-${key}-size`, value.size);
      root.style.setProperty(`--font-${key}-line`, value.line);
      root.style.setProperty(`--font-${key}-weight`, String(value.weight));
    });
  }, [
    theme,
    primaryColor,
    selectedPrimaryFont,
    selectedDisplayFont,
    roundness,
    inputBorderWidth,
    cardBorderWidth,
    brandPalette,
    spacingMode,
    stylePresetId,
    storeTokens,
  ]);

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