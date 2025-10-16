export interface StylePreset {
  id: string;
  name: string;
  description: string;
  tokens: {
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      none?: string;
    };
    radii: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    borders: {
      width: string;
      style: string;
      color?: string;
    };
    effects?: {
      blur?: string;
      backdropBlur?: string;
      opacity?: string;
    };
  };
}

export const stylePresets: StylePreset[] = [
  {
    id: 'modern-flat',
    name: 'Modern Flat',
    description: 'Clean and tangible with soft shadows and generous spacing',
    tokens: {
      shadows: {
        sm: '0 1px 3px rgba(0,0,0,0.05)',
        md: '0 4px 6px rgba(0,0,0,0.07)',
        lg: '0 10px 20px rgba(0,0,0,0.1)',
        xl: '0 20px 40px rgba(0,0,0,0.15)',
      },
      radii: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '999px',
      },
      borders: {
        width: '0px',
        style: 'none',
      },
    },
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Ethereal frosted glass effects with transparency',
    tokens: {
      shadows: {
        sm: '0 2px 8px rgba(0,0,0,0.04)',
        md: '0 4px 16px rgba(0,0,0,0.08)',
        lg: '0 8px 32px rgba(0,0,0,0.12)',
        xl: '0 12px 48px rgba(0,0,0,0.16)',
      },
      radii: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        full: '999px',
      },
      borders: {
        width: '1px',
        style: 'solid',
        color: 'rgba(255,255,255,0.2)',
      },
      effects: {
        blur: '8px',
        backdropBlur: '12px',
        opacity: '0.85',
      },
    },
  },
  {
    id: 'playful',
    name: 'Playful',
    description: 'Bold and fun with thick borders and no shadows',
    tokens: {
      shadows: {
        sm: 'none',
        md: 'none',
        lg: 'none',
        xl: 'none',
        none: 'none',
      },
      radii: {
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        full: '999px',
      },
      borders: {
        width: '3px',
        style: 'solid',
        color: 'currentColor',
      },
    },
  },
  {
    id: 'soft-dreamy',
    name: 'Soft & Dreamy',
    description: 'Gentle and whimsical with clay-morphic effects',
    tokens: {
      shadows: {
        sm: '0 2px 4px rgba(0,0,0,0.04), inset 0 1px 2px rgba(255,255,255,0.5)',
        md: '0 4px 6px rgba(0,0,0,0.05), inset 0 2px 4px rgba(255,255,255,0.5)',
        lg: '0 8px 16px rgba(0,0,0,0.08), inset 0 4px 8px rgba(255,255,255,0.6)',
        xl: '0 12px 24px rgba(0,0,0,0.1), inset 0 6px 12px rgba(255,255,255,0.7)',
      },
      radii: {
        sm: '16px',
        md: '20px',
        lg: '28px',
        xl: '36px',
        full: '999px',
      },
      borders: {
        width: '0px',
        style: 'none',
      },
      effects: {
        opacity: '0.95',
      },
    },
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Content-first with minimal decoration',
    tokens: {
      shadows: {
        sm: 'none',
        md: 'none',
        lg: '0 1px 2px rgba(0,0,0,0.05)',
        xl: '0 2px 4px rgba(0,0,0,0.06)',
      },
      radii: {
        sm: '0px',
        md: '4px',
        lg: '8px',
        xl: '8px',
        full: '999px',
      },
      borders: {
        width: '1px',
        style: 'solid',
        color: 'rgba(0,0,0,0.1)',
      },
    },
  },
];

export function getPresetById(id: string): StylePreset | undefined {
  return stylePresets.find(preset => preset.id === id);
}