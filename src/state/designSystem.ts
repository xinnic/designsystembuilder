import { create } from 'zustand';
import { useEffect } from 'react';

export type MenuLayout = 'bottomBar' | 'hamburger';
export type BorderWeight = 'none' | 'thin' | 'thick';
export type BorderTone = 'light' | 'ultraLight';
export type InputStyle = 'filled' | 'outlined' | 'underline' | 'none';
export type CardWidth = 'full' | 'withMargins';
export type TechStack = 'web-react' | 'react-native-expo' | 'ios-swiftui' | 'android-compose' | 'flutter';

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
  setTokens(partial: Partial<Tokens>): void;
  setOpts(partial: Partial<StylingOptions>): void;
  setHaptics(partial: Partial<HapticsConfig>): void;
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

  space: [8, 16, 24, 32, 40, 48],

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

  setTokens: (partial: Partial<Tokens>) =>
    set((state: DesignSystemState) => ({ tokens: { ...state.tokens, ...partial } })),

  setOpts: (partial: Partial<StylingOptions>) =>
    set((state: DesignSystemState) => ({ opts: { ...state.opts, ...partial } })),

  setHaptics: (partial: Partial<HapticsConfig>) =>
    set((state: DesignSystemState) => ({ haptics: { ...state.haptics, ...partial } }))
}));

// Hook to bind tokens to CSS variables
export const useTokenCSS = () => {
  const { tokens, opts } = useDesignSystem();

  useEffect(() => {
    const root = document.documentElement;

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

  }, [tokens, opts]);
};