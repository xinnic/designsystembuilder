import { create } from 'zustand';
import { useEffect } from 'react';
import { generateSecondaryColor } from '../utils/colorGeneration';
import { COLOR_VALUES } from '../config/colorThemes';
import { getStylePreset, getStylePresetCSSVariables, type StylePresetId } from '../config/stylePresets';

export type MenuLayout = 'bottomBar' | 'hamburger';
export type BorderWeight = 'none' | 'thin' | 'thick';
export type BorderTone = 'light' | 'ultraLight';
export type InputStyle = 'filled' | 'outlined' | 'underline' | 'none';
export type CardWidth = 'full' | 'withMargins';
export type TechStack = 'web-react' | 'react-native-expo' | 'ios-swiftui' | 'android-compose' | 'flutter';
export type CornerRadius = 'none' | 'small' | 'medium' | 'large';

export interface HapticsConfig {
  enabled: boolean;
  stack: TechStack;
  tapLight: 'selection' | 'impactLight';
  tapMedium: 'impactMedium';
  notifySuccess: 'notificationSuccess';
  notifyError: 'notificationError';
}

export interface Tokens {
  // Colors (RGB triplets for alpha support)
  brand: string;        // e.g. "26 188 156"
  brandWeak: string;    // supporting surface
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  bgPrimary: string;
  bgSecondary: string;
  border: string;
  focus: string;
  success: string;
  warning: string;
  info: string;
  danger: string;

  // Typography (atomic)
  fontFamily: string; // e.g., "Plus Jakarta Sans, ui-sans-serif, system-ui"
  displayLg: { size: string; line: string; weight: number };
  h1: { size: string; line: string; weight: number };
  h2: { size: string; line: string; weight: number };
  h3: { size: string; line: string; weight: number };
  subhead: { size: string; line: string; weight: number };
  body: { size: string; line: string; weight: number };
  caption: { size: string; line: string; weight: number };
  button: { size: string; line: string; weight: number; track: string };
  eyebrow: { size: string; line: string; weight: number; track: string; uppercase: boolean };

  // Spacing (8-pt basis)
  space: number[]; // e.g., [8,16,24,32,40,48]

  // Radii
  radius: { sm: string; md: string; lg: string; full: string };

  // Elevation (shadows as CSS)
  shadow: { '1': string; '2': string; '3': string };

  // Motion
  motion: { fast: string; base: string; slow: string; easeStandard: string };
}

export interface StylingOptions {
  menuLayout: MenuLayout;
  cardBorderWeight: BorderWeight;
  cardBorderTone: BorderTone;
  inputBorderWeight: BorderWeight;
  inputBorderTone: BorderTone;
  inputStyle: InputStyle;
  cardWidth: CardWidth;
  logo?: string;
}

export interface DesignSystemState {
  tokens: Tokens;
  opts: StylingOptions;
  haptics: HapticsConfig;

  // UI Settings
  isDarkMode: boolean;
  selectedTheme: string;
  customPrimaryColor: string;
  selectedAccentColor: string;
  customAccentColor: string;
  isSecondaryManual: boolean; // Track if secondary was manually selected
  selectedScale: 'small' | 'regular' | 'large';
  selectedPrimaryFont: string;
  selectedDisplayFont: string;
  stylePresetId: string;
  spacingMode: 'compact' | 'normal' | 'comfortable';
  cornerRadius: CornerRadius;

  // Render version - incremented on every design system change to force rerenders
  renderVersion: number;

  // Setters
  setTokens(partial: Partial<Tokens>): void;
  setOpts(partial: Partial<StylingOptions>): void;
  setHaptics(partial: Partial<HapticsConfig>): void;
  setDarkMode(enabled: boolean): void;
  setTheme(theme: string): void;
  setCustomPrimaryColor(color: string): void;
  setAccentColor(accent: string): void;
  setCustomAccentColor(color: string): void;
  setIsSecondaryManual(isManual: boolean): void;
  setScale(scale: 'small' | 'regular' | 'large'): void;
  setPrimaryFont(font: string): void;
  setDisplayFont(font: string): void;
  setStylePreset(presetId: string): void;
  setSpacingMode(mode: 'compact' | 'normal' | 'comfortable'): void;
  setCornerRadius(radius: CornerRadius): void;
}

// Default values
const defaultTokens: Tokens = {
  // Colors as RGB triplets
  brand: "26 188 156",
  brandWeak: "233 246 243",
  textPrimary: "26 26 26",
  textSecondary: "108 117 136",
  textDisabled: "161 161 161",
  bgPrimary: "248 249 250",
  bgSecondary: "255 255 255",
  border: "229 231 235",  // Tailwind Gray 200
  focus: "0 102 204",
  success: "34 197 94",
  warning: "245 158 11",
  info: "59 130 246",
  danger: "244 68 68",

  fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui",
  displayLg: { size: "48px", line: "56px", weight: 700 },
  h1: { size: "28px", line: "38px", weight: 700 },
  h2: { size: "22px", line: "30px", weight: 600 },
  h3: { size: "20px", line: "28px", weight: 600 },
  subhead: { size: "18px", line: "26px", weight: 600 },
  body: { size: "16px", line: "24px", weight: 400 },
  caption: { size: "14px", line: "20px", weight: 400 },
  button: { size: "18px", line: "26px", weight: 600, track: "0.02em" },
  eyebrow: { size: "12px", line: "16px", weight: 500, track: "0.05em", uppercase: true },

  space: [8, 16, 24, 32, 40, 48, 64, 80],

  radius: { sm: "4px", md: "8px", lg: "12px", full: "9999px" },

  shadow: {
    '1': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '2': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '3': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
  },

  motion: {
    fast: "150ms",
    base: "300ms",
    slow: "500ms",
    easeStandard: "cubic-bezier(0.4, 0, 0.2, 1)"
  }
};

const defaultStylingOptions: StylingOptions = {
  menuLayout: 'bottomBar',
  cardBorderWeight: 'thin',
  cardBorderTone: 'light',
  inputBorderWeight: 'thin',
  inputBorderTone: 'light',
  inputStyle: 'filled',
  cardWidth: 'full'
};

const defaultHapticsConfig: HapticsConfig = {
  enabled: true,
  stack: 'web-react',
  tapLight: 'selection',
  tapMedium: 'impactMedium',
  notifySuccess: 'notificationSuccess',
  notifyError: 'notificationError'
};

export const useDesignSystem = create<DesignSystemState>((set) => ({
  tokens: defaultTokens,
  opts: defaultStylingOptions,
  haptics: defaultHapticsConfig,

  // UI Settings defaults
  isDarkMode: false,
  selectedTheme: 'custom',  // Select rainbow picker by default
  customPrimaryColor: '#1abc9c',  // Turquoise/green - first color swatch
  selectedAccentColor: 'turquoise',
  customAccentColor: '#1abc9c',
  isSecondaryManual: false, // Default to auto-generated
  selectedScale: 'regular',
  selectedPrimaryFont: 'font-jakarta',
  selectedDisplayFont: 'font-jakarta',
  stylePresetId: 'modern-flat',
  spacingMode: 'normal',
  cornerRadius: 'medium',
  renderVersion: 0,

  setTokens: (partial: Partial<Tokens>) =>
    set((state: DesignSystemState) => ({
      tokens: { ...state.tokens, ...partial },
      renderVersion: state.renderVersion + 1
    })),

  setOpts: (partial: Partial<StylingOptions>) =>
    set((state: DesignSystemState) => ({
      opts: { ...state.opts, ...partial },
      renderVersion: state.renderVersion + 1
    })),

  setHaptics: (partial: Partial<HapticsConfig>) =>
    set((state: DesignSystemState) => ({
      haptics: { ...state.haptics, ...partial },
      renderVersion: state.renderVersion + 1
    })),

  setDarkMode: (enabled: boolean) =>
    set((state) => ({ isDarkMode: enabled, renderVersion: state.renderVersion + 1 })),
  setTheme: (theme: string) =>
    set((state) => ({ selectedTheme: theme, renderVersion: state.renderVersion + 1 })),
  setCustomPrimaryColor: (color: string) =>
    set((state) => ({ customPrimaryColor: color, renderVersion: state.renderVersion + 1 })),
  setAccentColor: (accent: string) =>
    set((state) => ({ selectedAccentColor: accent, renderVersion: state.renderVersion + 1 })),
  setCustomAccentColor: (color: string) =>
    set((state) => ({ customAccentColor: color, renderVersion: state.renderVersion + 1 })),
  setIsSecondaryManual: (isManual: boolean) =>
    set((state) => ({ isSecondaryManual: isManual, renderVersion: state.renderVersion + 1 })),
  setScale: (scale: 'small' | 'regular' | 'large') =>
    set((state) => ({ selectedScale: scale, renderVersion: state.renderVersion + 1 })),
  setPrimaryFont: (font: string) =>
    set((state) => ({ selectedPrimaryFont: font, renderVersion: state.renderVersion + 1 })),
  setDisplayFont: (font: string) =>
    set((state) => ({ selectedDisplayFont: font, renderVersion: state.renderVersion + 1 })),
  setStylePreset: (presetId: string) =>
    set((state) => ({ stylePresetId: presetId, renderVersion: state.renderVersion + 1 })),
  setSpacingMode: (mode: 'compact' | 'normal' | 'comfortable') =>
    set((state) => ({ spacingMode: mode, renderVersion: state.renderVersion + 1 })),
  setCornerRadius: (radius: CornerRadius) =>
    set((state) => ({ cornerRadius: radius, renderVersion: state.renderVersion + 1 }))
}));

// Helper function to convert hex to RGB triplet
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '26 188 156'; // fallback to turquoise
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ].join(' ');
};

// Typography scale definitions
const typographyScales = {
  small: {
    displayLg: { size: '48px', line: '56px', weight: 700 },
    h1: { size: '24px', line: '30px', weight: 700 },
    h2: { size: '20px', line: '26px', weight: 600 },
    h3: { size: '18px', line: '26px', weight: 600 },
    subhead: { size: '16px', line: '22px', weight: 600 },
    body: { size: '14px', line: '20px', weight: 400 },
    caption: { size: '12px', line: '16px', weight: 400 },
    button: { size: '18px', line: '26px', weight: 600, track: '0.02em' },
    eyebrow: { size: '11px', line: '14px', weight: 500, track: '0.05em', uppercase: true }
  },
  regular: {
    displayLg: { size: '48px', line: '56px', weight: 700 },
    h1: { size: '28px', line: '38px', weight: 700 },
    h2: { size: '22px', line: '30px', weight: 600 },
    h3: { size: '20px', line: '28px', weight: 600 },
    subhead: { size: '18px', line: '26px', weight: 600 },
    body: { size: '16px', line: '24px', weight: 400 },
    caption: { size: '14px', line: '20px', weight: 400 },
    button: { size: '18px', line: '26px', weight: 600, track: '0.02em' },
    eyebrow: { size: '12px', line: '16px', weight: 500, track: '0.05em', uppercase: true }
  },
  large: {
    displayLg: { size: '48px', line: '56px', weight: 700 },
    h1: { size: '36px', line: '44px', weight: 700 },
    h2: { size: '24px', line: '32px', weight: 600 },
    h3: { size: '22px', line: '30px', weight: 600 },
    subhead: { size: '21px', line: '30px', weight: 600 },
    body: { size: '18px', line: '26px', weight: 400 },
    caption: { size: '15px', line: '22px', weight: 400 },
    button: { size: '18px', line: '26px', weight: 600, track: '0.02em' },
    eyebrow: { size: '13px', line: '18px', weight: 500, track: '0.05em', uppercase: true }
  }
};

// Font family map
const fontFamilyMap: Record<string, string> = {
  // Existing fonts
  'font-jakarta': 'Plus Jakarta Sans, ui-sans-serif, system-ui',
  'font-vietnam': 'Be Vietnam Pro, ui-sans-serif, system-ui',
  'font-wix': 'Wix Madefor Text, ui-sans-serif, system-ui',
  'font-figtree': 'Figtree, ui-sans-serif, system-ui',
  'font-albert': 'Albert Sans, ui-sans-serif, system-ui',
  'font-satoshi': 'Satoshi, ui-sans-serif, system-ui',

  // New Sans Serif fonts
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

  // New Serif fonts
  'font-newsreader': 'Newsreader, ui-serif, serif',
  'font-noto': 'Noto Serif, ui-serif, serif',
  'font-domine': 'Domine, ui-serif, serif',
  'font-libre': 'Libre Caslon Text, ui-serif, serif',
  'font-garamond': 'EB Garamond, ui-serif, serif',
  'font-literata': 'Literata, ui-serif, serif',
  'font-source-serif': 'Source Serif 4, ui-serif, serif',
  'font-montserrat': 'Montserrat, ui-sans-serif, system-ui'
};

// Spacing scale definitions
const spacingScales = {
  compact: [4, 8, 12, 16, 20, 24, 32, 40],
  normal: [8, 16, 24, 32, 40, 48, 64, 80],
  comfortable: [12, 24, 36, 48, 60, 72, 96, 120]
};

// Corner radius scale definitions
const cornerRadiusScales = {
  none: { sm: '0px', md: '0px', lg: '0px', full: '9999px' },
  small: { sm: '4px', md: '6px', lg: '8px', full: '9999px' },
  medium: { sm: '6px', md: '10px', lg: '16px', full: '9999px' },
  large: { sm: '12px', md: '20px', lg: '28px', full: '9999px' }
};

// Track the last update to prevent infinite loops
let lastUpdate = {
  theme: 'turquoise',
  accent: 'turquoise',
  customPrimary: '#3498db',
  customAccent: '#1abc9c',
  isDarkMode: false,
  scale: 'regular',
  primaryFont: 'font-jakarta',
  displayFont: 'font-jakarta',
  spacingMode: 'normal',
  cornerRadius: 'medium' as CornerRadius
};

// Subscribe to changes and auto-update tokens
useDesignSystem.subscribe((state) => {
  // Check if relevant properties have actually changed
  const hasChanged =
    state.selectedTheme !== lastUpdate.theme ||
    state.selectedAccentColor !== lastUpdate.accent ||
    state.customPrimaryColor !== lastUpdate.customPrimary ||
    state.customAccentColor !== lastUpdate.customAccent ||
    state.isDarkMode !== lastUpdate.isDarkMode ||
    state.selectedScale !== lastUpdate.scale ||
    state.selectedPrimaryFont !== lastUpdate.primaryFont ||
    state.selectedDisplayFont !== lastUpdate.displayFont ||
    state.spacingMode !== lastUpdate.spacingMode ||
    state.cornerRadius !== lastUpdate.cornerRadius;

  if (!hasChanged) return;

  // Update last values
  lastUpdate = {
    theme: state.selectedTheme,
    accent: state.selectedAccentColor,
    customPrimary: state.customPrimaryColor,
    customAccent: state.customAccentColor,
    isDarkMode: state.isDarkMode,
    scale: state.selectedScale,
    primaryFont: state.selectedPrimaryFont,
    displayFont: state.selectedDisplayFont,
    spacingMode: state.spacingMode,
    cornerRadius: state.cornerRadius
  };

  // Use centralized color configuration
  const colorMap = COLOR_VALUES;

  const primaryColor = state.selectedTheme === 'custom' && state.customPrimaryColor
    ? state.customPrimaryColor
    : colorMap[state.selectedTheme] || '#1abc9c';

  const accentColor = state.selectedAccentColor === 'custom' && state.customAccentColor
    ? state.customAccentColor
    : colorMap[state.selectedAccentColor] || '#1abc9c';

  // Get current typography scale
  const currentScale = typographyScales[state.selectedScale] || typographyScales.regular;

  // Get current font families
  const primaryFontFamily = fontFamilyMap[state.selectedPrimaryFont] || fontFamilyMap['font-jakarta'];
  const displayFontFamily = fontFamilyMap[state.selectedDisplayFont] || fontFamilyMap['font-jakarta'];

  // Get current spacing scale
  const currentSpacing = spacingScales[state.spacingMode] || spacingScales.normal;

  // Get current corner radius scale
  const currentRadius = cornerRadiusScales[state.cornerRadius] || cornerRadiusScales.medium;

  // Update tokens - using simple hex-based colors only
  state.setTokens({
    // Colors
    brand: hexToRgb(primaryColor),
    brandWeak: hexToRgb(accentColor),
    textPrimary: state.isDarkMode ? '225 225 225' : '26 26 26',
    textSecondary: state.isDarkMode ? '168 168 168' : '108 117 136',
    textDisabled: state.isDarkMode ? '102 102 102' : '161 161 161',
    bgPrimary: state.isDarkMode ? '18 18 18' : '248 249 250',
    bgSecondary: state.isDarkMode ? '30 30 30' : '255 255 255',
    border: state.isDarkMode ? '44 44 44' : '229 231 235',
    focus: hexToRgb('#0066CC'),
    success: hexToRgb('#22c55e'),
    warning: hexToRgb('#f59e0b'),
    info: hexToRgb('#3b82f6'),
    danger: hexToRgb('#f44444'),
    // Typography
    fontFamily: primaryFontFamily,
    ...currentScale,
    // Spacing
    space: currentSpacing,
    // Corner radius
    radius: currentRadius
  });
});

// Manually trigger initial token update to ensure colors load correctly on first render
// The subscription won't fire until a state change, so we need to manually set tokens once
setTimeout(() => {
  const state = useDesignSystem.getState();

  // Use centralized color configuration
  const colorMap = COLOR_VALUES;

  const primaryColor = state.selectedTheme === 'custom' && state.customPrimaryColor
    ? state.customPrimaryColor
    : colorMap[state.selectedTheme] || '#1abc9c';

  const accentColor = state.selectedAccentColor === 'custom' && state.customAccentColor
    ? state.customAccentColor
    : colorMap[state.selectedAccentColor] || '#1abc9c';

  state.setTokens({
    brand: hexToRgb(primaryColor),
    brandWeak: hexToRgb(accentColor),
  });
}, 0);