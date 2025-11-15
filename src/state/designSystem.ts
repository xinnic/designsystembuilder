import { create } from 'zustand';
import { useEffect } from 'react';
import { generateSecondaryColor } from '../utils/colorGeneration';
import { converter, formatRgb } from 'culori';
import {
  getSemanticValue,
  semanticColors
} from '../design-system/tokens';

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
  h1:        { size: string; line: string; weight: number };
  h2:        { size: string; line: string; weight: number };
  subhead:   { size: string; line: string; weight: number };
  body:      { size: string; line: string; weight: number };
  caption:   { size: string; line: string; weight: number };
  button:    { size: string; line: string; weight: number; track: string };
  eyebrow:   { size: string; line: string; weight: number; track: string; uppercase: boolean };

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
  border: "229 231 235",
  focus: "0 102 204",
  success: "34 197 94",
  warning: "245 158 11",
  info: "59 130 246",
  danger: "244 68 68",

  fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui",
  displayLg: { size: "48px", line: "56px", weight: 700 },
  h1: { size: "28px", line: "38px", weight: 700 },
  h2: { size: "22px", line: "30px", weight: 600 },
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
  selectedTheme: 'turquoise',
  customPrimaryColor: '#3498db',
  selectedAccentColor: 'turquoise',
  customAccentColor: '#1abc9c',
  isSecondaryManual: false, // Default to auto-generated
  selectedScale: 'regular',
  selectedPrimaryFont: 'font-jakarta',
  selectedDisplayFont: 'font-jakarta',
  stylePresetId: 'modern',
  spacingMode: 'normal',
  cornerRadius: 'medium',

  setTokens: (partial: Partial<Tokens>) =>
    set((state: DesignSystemState) => ({ tokens: { ...state.tokens, ...partial } })),

  setOpts: (partial: Partial<StylingOptions>) =>
    set((state: DesignSystemState) => ({ opts: { ...state.opts, ...partial } })),

  setHaptics: (partial: Partial<HapticsConfig>) =>
    set((state: DesignSystemState) => ({ haptics: { ...state.haptics, ...partial } })),

  setDarkMode: (enabled: boolean) => set({ isDarkMode: enabled }),
  setTheme: (theme: string) => set({ selectedTheme: theme }),
  setCustomPrimaryColor: (color: string) => set({ customPrimaryColor: color }),
  setAccentColor: (accent: string) => set({ selectedAccentColor: accent }),
  setCustomAccentColor: (color: string) => set({ customAccentColor: color }),
  setIsSecondaryManual: (isManual: boolean) => set({ isSecondaryManual: isManual }),
  setScale: (scale: 'small' | 'regular' | 'large') => set({ selectedScale: scale }),
  setPrimaryFont: (font: string) => set({ selectedPrimaryFont: font }),
  setDisplayFont: (font: string) => set({ selectedDisplayFont: font }),
  setStylePreset: (presetId: string) => set({ stylePresetId: presetId }),
  setSpacingMode: (mode: 'compact' | 'normal' | 'comfortable') => set({ spacingMode: mode }),
  setCornerRadius: (radius: CornerRadius) => set({ cornerRadius: radius })
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

// Proper OKLCH to RGB conversion using culori
const oklchToRgb = (oklchString: string): string => {
  try {
    // Parse OKLCH color using culori
    const rgb = converter('rgb')(oklchString);

    if (!rgb) {
      console.warn('Failed to convert OKLCH:', oklchString);
      return '128 128 128'; // fallback to gray
    }

    // Convert to 0-255 range and format as "R G B"
    const r = Math.round((rgb.r || 0) * 255);
    const g = Math.round((rgb.g || 0) * 255);
    const b = Math.round((rgb.b || 0) * 255);

    return `${r} ${g} ${b}`;
  } catch (error) {
    console.error('Error converting OKLCH to RGB:', error);
    return '128 128 128'; // fallback to gray
  }
};

// Typography scale definitions
const typographyScales = {
  small: {
    displayLg: { size: '48px', line: '56px', weight: 700 },
    h1: { size: '24px', line: '30px', weight: 700 },
    h2: { size: '20px', line: '26px', weight: 600 },
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

  const colorMap: Record<string, string> = {
    turquoise: '#1abc9c',
    emerald: '#2ecc71',
    'peter-river': '#3498db',
    amethyst: '#9b59b6',
    'wet-asphalt': '#34495e',
    'sun-flower': '#f1c40f',
    carrot: '#e67e22',
    alizarin: '#e74c3c',
    concrete: '#95a5a6',
    orange: '#f39c12',
    pumpkin: '#d35400',
    pomegranate: '#c0392b',
    nephritis: '#27ae60',
    'belize-hole': '#2980b9',
    wisteria: '#8e44ad',
    'midnight-blue': '#2c3e50',
    asbestos: '#7f8c8d'
  };

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

  // Determine theme mode for semantic tokens
  const theme = state.isDarkMode ? 'dark' : 'light';

  // Use semantic OKLCH tokens with proper culori conversion
  const textPrimaryColor = oklchToRgb(getSemanticValue(semanticColors.text.primary, theme));
  const textSecondaryColor = oklchToRgb(getSemanticValue(semanticColors.text.secondary, theme));
  const textDisabledColor = oklchToRgb(getSemanticValue(semanticColors.text.disabled, theme));
  const bgPrimaryColor = oklchToRgb(getSemanticValue(semanticColors.canvas.default, theme));
  const bgSecondaryColor = oklchToRgb(getSemanticValue(semanticColors.surface.default, theme));
  const borderColor = oklchToRgb(getSemanticValue(semanticColors.border.default, theme));

  // Update tokens using OKLCH semantic system
  state.setTokens({
    // Colors - brand colors stay hex-based, UI colors use OKLCH semantics
    brand: hexToRgb(primaryColor),
    brandWeak: hexToRgb(accentColor),
    textPrimary: textPrimaryColor,
    textSecondary: textSecondaryColor,
    textDisabled: textDisabledColor,
    bgPrimary: bgPrimaryColor,
    bgSecondary: bgSecondaryColor,
    border: borderColor,
    // Semantic colors for states using OKLCH
    focus: oklchToRgb(getSemanticValue(semanticColors.primary.default, theme)),
    success: oklchToRgb(getSemanticValue(semanticColors.success.default, theme)),
    warning: oklchToRgb(getSemanticValue(semanticColors.warning.default, theme)),
    info: oklchToRgb(getSemanticValue(semanticColors.primary.default, theme)),
    danger: oklchToRgb(getSemanticValue(semanticColors.danger.default, theme)),
    // Typography
    fontFamily: primaryFontFamily,
    ...currentScale,
    // Spacing
    space: currentSpacing,
    // Corner radius
    radius: currentRadius
  });
});

// Trigger initial update to sync tokens with initial state
// This ensures the UI matches the default selectedTheme on first load
const initialState = useDesignSystem.getState();
const colorMap: Record<string, string> = {
  turquoise: '#1abc9c',
  emerald: '#2ecc71',
  'peter-river': '#3498db',
  amethyst: '#9b59b6',
  'wet-asphalt': '#34495e',
  'sun-flower': '#f1c40f',
  carrot: '#e67e22',
  alizarin: '#e74c3c',
  concrete: '#95a5a6',
  orange: '#f39c12',
  pumpkin: '#d35400',
  pomegranate: '#c0392b',
  nephritis: '#27ae60',
  'belize-hole': '#2980b9',
  wisteria: '#8e44ad',
  'midnight-blue': '#2c3e50',
  asbestos: '#7f8c8d'
};

const initialPrimaryColor = initialState.selectedTheme === 'custom' && initialState.customPrimaryColor
  ? initialState.customPrimaryColor
  : colorMap[initialState.selectedTheme] || '#1abc9c';

const initialAccentColor = initialState.selectedAccentColor === 'custom' && initialState.customAccentColor
  ? initialState.customAccentColor
  : colorMap[initialState.selectedAccentColor] || '#1abc9c';

initialState.setTokens({
  brand: hexToRgb(initialPrimaryColor),
  brandWeak: hexToRgb(initialAccentColor),
});

// Update lastUpdate to match initial state to prevent first-click issues
lastUpdate.theme = initialState.selectedTheme;
lastUpdate.accent = initialState.selectedAccentColor;

// Hook to bind tokens to CSS variables
export const useTokenCSS = () => {
  const { tokens, opts, isDarkMode, selectedPrimaryFont, selectedDisplayFont, selectedScale, selectedTheme, stylePresetId, cornerRadius } = useDesignSystem();

  useEffect(() => {
    const root = document.documentElement;

    // Handle dark mode
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Handle primary font class (for body text)
    const fontClasses = [
      'font-jakarta', 'font-vietnam', 'font-wix', 'font-figtree', 'font-albert', 'font-satoshi',
      'font-epilogue', 'font-manrope', 'font-public', 'font-space', 'font-work', 'font-source-sans',
      'font-nunito', 'font-arimo', 'font-hanken', 'font-rubik', 'font-dm', 'font-ibm', 'font-sora',
      'font-newsreader', 'font-noto', 'font-domine', 'font-libre', 'font-garamond', 'font-literata',
      'font-source-serif', 'font-montserrat'
    ];
    fontClasses.forEach(fc => root.classList.remove(fc));
    root.classList.add(selectedPrimaryFont);

    // Set display font CSS variable for headings
    const displayFontFamily = fontFamilyMap[selectedDisplayFont] || fontFamilyMap['font-jakarta'];
    root.style.setProperty('--font-display', displayFontFamily);

    // Handle scale class
    root.classList.remove('scale-small', 'scale-regular', 'scale-large');
    root.classList.add(`scale-${selectedScale}`);

    // Handle theme class
    const themeClasses = ['theme-blue', 'theme-purple', 'theme-pink', 'theme-red', 'theme-yellow',
                         'theme-orange', 'theme-teal', 'theme-turquoise', 'theme-emerald',
                         'theme-peter-river', 'theme-amethyst', 'theme-wet-asphalt',
                         'theme-sun-flower', 'theme-carrot', 'theme-alizarin',
                         'theme-concrete', 'theme-pumpkin', 'theme-pomegranate',
                         'theme-nephritis', 'theme-belize-hole', 'theme-wisteria',
                         'theme-midnight-blue', 'theme-asbestos', 'theme-custom'];
    themeClasses.forEach(tc => root.classList.remove(tc));
    root.classList.add(`theme-${selectedTheme}`);

    // Bind all tokens to CSS variables
    root.style.setProperty('--color-brand', tokens.brand);
    root.style.setProperty('--color-brand-weak', tokens.brandWeak);
    root.style.setProperty('--color-text-primary', tokens.textPrimary);
    root.style.setProperty('--color-text-secondary', tokens.textSecondary);
    root.style.setProperty('--color-text-disabled', tokens.textDisabled);
    root.style.setProperty('--color-bg-primary', tokens.bgPrimary);
    root.style.setProperty('--color-bg-secondary', tokens.bgSecondary);
    root.style.setProperty('--color-border', tokens.border);
    root.style.setProperty('--color-focus', tokens.focus);
    root.style.setProperty('--color-success', tokens.success);
    root.style.setProperty('--color-warning', tokens.warning);
    root.style.setProperty('--color-info', tokens.info);
    root.style.setProperty('--color-danger', tokens.danger);

    root.style.setProperty('--font-family', tokens.fontFamily);

    // Typography
    root.style.setProperty('--font-display-size', tokens.displayLg.size);
    root.style.setProperty('--font-display-line', tokens.displayLg.line);
    root.style.setProperty('--font-display-weight', tokens.displayLg.weight.toString());

    root.style.setProperty('--font-h1-size', tokens.h1.size);
    root.style.setProperty('--font-h1-line', tokens.h1.line);
    root.style.setProperty('--font-h1-weight', tokens.h1.weight.toString());

    root.style.setProperty('--font-h2-size', tokens.h2.size);
    root.style.setProperty('--font-h2-line', tokens.h2.line);
    root.style.setProperty('--font-h2-weight', tokens.h2.weight.toString());

    root.style.setProperty('--font-subhead-size', tokens.subhead.size);
    root.style.setProperty('--font-subhead-line', tokens.subhead.line);
    root.style.setProperty('--font-subhead-weight', tokens.subhead.weight.toString());

    root.style.setProperty('--font-body-size', tokens.body.size);
    root.style.setProperty('--font-body-line', tokens.body.line);
    root.style.setProperty('--font-body-weight', tokens.body.weight.toString());

    root.style.setProperty('--font-caption-size', tokens.caption.size);
    root.style.setProperty('--font-caption-line', tokens.caption.line);
    root.style.setProperty('--font-caption-weight', tokens.caption.weight.toString());

    root.style.setProperty('--font-button-size', tokens.button.size);
    root.style.setProperty('--font-button-line', tokens.button.line);
    root.style.setProperty('--font-button-weight', tokens.button.weight.toString());
    root.style.setProperty('--font-button-track', tokens.button.track);

    root.style.setProperty('--font-eyebrow-size', tokens.eyebrow.size);
    root.style.setProperty('--font-eyebrow-line', tokens.eyebrow.line);
    root.style.setProperty('--font-eyebrow-weight', tokens.eyebrow.weight.toString());
    root.style.setProperty('--font-eyebrow-track', tokens.eyebrow.track);

    // Spacing
    tokens.space.forEach((space: number, index: number) => {
      root.style.setProperty(`--space-${index + 1}`, `${space}px`);
    });

    // Radii
    root.style.setProperty('--radius-sm', tokens.radius.sm);
    root.style.setProperty('--radius-md', tokens.radius.md);
    root.style.setProperty('--radius-lg', tokens.radius.lg);
    root.style.setProperty('--radius-full', tokens.radius.full);

    // Shadows
    root.style.setProperty('--shadow-1', tokens.shadow['1']);
    root.style.setProperty('--shadow-2', tokens.shadow['2']);
    root.style.setProperty('--shadow-3', tokens.shadow['3']);

    // Motion
    root.style.setProperty('--motion-fast', tokens.motion.fast);
    root.style.setProperty('--motion-base', tokens.motion.base);
    root.style.setProperty('--motion-slow', tokens.motion.slow);
    root.style.setProperty('--ease-standard', tokens.motion.easeStandard);

    // Styling options as CSS vars
    if (opts.inputBorderWeight === 'none') root.style.setProperty('--inputBorder', '0px');
    if (opts.inputBorderWeight === 'thin') root.style.setProperty('--inputBorder', '1px');
    if (opts.inputBorderWeight === 'thick') root.style.setProperty('--inputBorder', '2px');

    root.style.setProperty('--inputBorderAlpha', opts.inputBorderTone === 'light' ? '.25' : '.12');

    if (opts.cardBorderWeight === 'none') root.style.setProperty('--cardBorder', '0px');
    if (opts.cardBorderWeight === 'thin') root.style.setProperty('--cardBorder', '1px');
    if (opts.cardBorderWeight === 'thick') root.style.setProperty('--cardBorder', '2px');

    root.style.setProperty('--cardBorderAlpha', opts.cardBorderTone === 'light' ? '.18' : '.10');

  }, [tokens, opts, isDarkMode, selectedPrimaryFont, selectedDisplayFont, selectedScale, selectedTheme, stylePresetId, cornerRadius]);
};