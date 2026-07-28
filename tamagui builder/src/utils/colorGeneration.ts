/**
 * Color Generation Utilities
 *
 * Functions to automatically generate secondary colors from primary
 * Supports complementary, analogous, triadic color schemes
 */

import { clampChroma, converter, formatHex, wcagContrast } from 'culori';

const toOklch = converter('oklch');

/**
 * Darken a brand color until white text sitting on it clears a WCAG contrast
 * threshold.
 *
 * Several of the preset swatches (turquoise, emerald, sun-flower) are light
 * enough that white labels on a solid fill land around 2:1 — legible-ish on a
 * big screen, unreadable on a phone. Rather than reject those hues, we keep the
 * hue and chroma and walk the lightness down until the fill is usable, so a
 * bright pick still reads as "that color", just deep enough to build on.
 *
 * Colors that already pass are returned untouched.
 */
export function ensureReadableOnWhite(hex: string, minContrast = 4.5): string {
  const base = toOklch(hex);
  if (!base) return hex;

  const chroma = base.c ?? 0;
  const hue = base.h ?? 0;

  // Step down in small increments so we stop at the first shade that passes
  // rather than over-darkening.
  for (let lightness = base.l ?? 0; lightness >= 0.3; lightness -= 0.02) {
    const candidate = clampChroma(
      { mode: 'oklch' as const, l: lightness, c: chroma, h: hue },
      'oklch'
    );
    if ((wcagContrast(candidate, '#ffffff') ?? 0) >= minContrast) {
      return formatHex(candidate) ?? hex;
    }
  }

  // Very saturated hues (pure yellow) can never reach the target against white.
  // Bottom out rather than looping to black.
  const floor = clampChroma({ mode: 'oklch' as const, l: 0.3, c: chroma, h: hue }, 'oklch');
  return formatHex(floor) ?? hex;
}


/**
 * The shadow colour for hard-offset (Neo-Brutalism) elevation.
 *
 * The canonical neobrutalist shadow is pure #000 — that's what the reference
 * libraries ship. Two problems with taking it literally here: against a light
 * surface it reads as a harsh cut-out rather than a considered choice, and in
 * dark mode a black shadow on a near-black canvas disappears entirely.
 *
 * So: keep the hard edge and the high contrast that define the style, but pull
 * the colour from the user's own brand hue at near-black (or near-white in dark
 * mode) lightness. It still reads black at a glance, it sits with whatever
 * palette is selected, and it survives the theme flip.
 */
export function deriveShadowColor(brandHex: string, isDarkMode = false): string {
  const base = toOklch(brandHex);
  const hue = base?.h ?? 0;

  // A mid-tone of the theme colour, not a near-black. Anything down around
  // L 0.3 reads as plain black however much chroma is in it, and a heavy black
  // border plus a heavy black shadow overwhelms the content it frames. Around
  // L 0.6 the shadow is unmistakably *the brand colour* while still holding a
  // crisp edge against a light surface.
  const shadow = clampChroma(
    {
      mode: 'oklch' as const,
      l: isDarkMode ? 0.72 : 0.6,
      c: Math.max(Math.min((base?.c ?? 0) * 1.05, 0.15), 0.05),
      h: hue,
    },
    'oklch'
  );

  return formatHex(shadow) ?? (isDarkMode ? '#ffffff' : '#000000');
}

/**
 * How far a CSS box-shadow bleeds past its element, in points.
 *
 * Scroll containers have to reserve this much padding or the shadow is clipped
 * at the overflow edge — visible on the category pills in every preset, worst
 * with Neo-Brutalism's hard offsets and Soft & Dreamy's wide blur.
 */
export function shadowBleed(shadow: string): number {
  if (!shadow || shadow === 'none') return 0;

  const lengths = (shadow.match(/-?[\d.]+px/g) || []).map((v) => parseFloat(v));
  if (lengths.length < 2) return 0;

  const [offsetX = 0, offsetY = 0, blur = 0, spread = 0] = lengths;
  return Math.max(Math.abs(offsetX), Math.abs(offsetY)) + blur + Math.max(spread, 0);
}

/**
 * Convert hex color to HSL
 */
export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove # if present
  hex = hex.replace('#', '');

  // Convert to RGB first
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Convert HSL to hex color
 */
export function hslToHex(h: number, s: number, l: number): string {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generate complementary color (opposite on color wheel)
 * Best for high contrast, energetic designs
 */
export function generateComplementary(primaryHex: string): string {
  const hsl = hexToHSL(primaryHex);
  // Rotate 180 degrees on color wheel
  const newHue = (hsl.h + 180) % 360;
  return hslToHex(newHue, hsl.s, hsl.l);
}

/**
 * Generate analogous color (adjacent on color wheel)
 * Best for harmonious, professional designs
 * @param degrees - Rotation amount (30-60 recommended)
 */
export function generateAnalogous(primaryHex: string, degrees: number = 30): string {
  const hsl = hexToHSL(primaryHex);
  // Rotate by specified degrees (positive or negative for different direction)
  const newHue = (hsl.h + degrees + 360) % 360;

  // Slightly adjust saturation and lightness for better harmony
  const newSaturation = Math.min(100, hsl.s + 5);
  const newLightness = hsl.l > 50 ? hsl.l - 5 : hsl.l + 5;

  return hslToHex(newHue, newSaturation, newLightness);
}

/**
 * Generate triadic color (120 degrees apart)
 * Best for vibrant, balanced designs
 */
export function generateTriadic(primaryHex: string): string {
  const hsl = hexToHSL(primaryHex);
  // Rotate 120 degrees on color wheel
  const newHue = (hsl.h + 120) % 360;
  return hslToHex(newHue, hsl.s, hsl.l);
}

/**
 * Generate split-complementary colors
 * Provides contrast with more nuance than pure complementary
 */
export function generateSplitComplementary(primaryHex: string): { color1: string; color2: string } {
  const hsl = hexToHSL(primaryHex);
  // Get colors 150 and 210 degrees away
  const hue1 = (hsl.h + 150) % 360;
  const hue2 = (hsl.h + 210) % 360;

  return {
    color1: hslToHex(hue1, hsl.s, hsl.l),
    color2: hslToHex(hue2, hsl.s, hsl.l)
  };
}

/**
 * Generate tetradic (square) color scheme
 * Four colors evenly spaced on color wheel
 */
export function generateTetradic(primaryHex: string): { secondary: string; tertiary: string; quaternary: string } {
  const hsl = hexToHSL(primaryHex);

  return {
    secondary: hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l),
    tertiary: hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
    quaternary: hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l)
  };
}

/**
 * Smart secondary color generation based on primary
 * Uses analogous by default as it's most harmonious
 */
export function generateSecondaryColor(
  primaryHex: string,
  scheme: 'analogous' | 'complementary' | 'triadic' | 'split-complementary' = 'analogous'
): string {
  switch (scheme) {
    case 'complementary':
      return generateComplementary(primaryHex);
    case 'triadic':
      return generateTriadic(primaryHex);
    case 'split-complementary':
      return generateSplitComplementary(primaryHex).color1;
    case 'analogous':
    default:
      // Use 30 degree rotation for pleasant harmony
      return generateAnalogous(primaryHex, 30);
  }
}

/**
 * Check if a color is too similar to another
 * Used to prevent auto-generation when colors are too close
 */
export function areColorsSimilar(color1: string, color2: string, threshold: number = 30): boolean {
  const hsl1 = hexToHSL(color1);
  const hsl2 = hexToHSL(color2);

  // Check hue difference
  const hueDiff = Math.abs(hsl1.h - hsl2.h);
  const adjustedHueDiff = Math.min(hueDiff, 360 - hueDiff);

  // Colors are similar if hue difference is less than threshold
  return adjustedHueDiff < threshold;
}

/**
 * Get the best color scheme based on the primary color
 * Suggests the most appropriate scheme based on color properties
 */
export function suggestColorScheme(primaryHex: string): 'analogous' | 'complementary' | 'triadic' {
  const hsl = hexToHSL(primaryHex);

  // For low saturation colors, use complementary for more contrast
  if (hsl.s < 30) {
    return 'complementary';
  }

  // For very bright colors, use analogous for harmony
  if (hsl.l > 70) {
    return 'analogous';
  }

  // For dark colors, use triadic for variety
  if (hsl.l < 30) {
    return 'triadic';
  }

  // Default to analogous for most cases
  return 'analogous';
}