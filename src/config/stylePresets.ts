/**
 * Style Presets Configuration
 * 
 * Defines the four main design styles with their complete token specifications:
 * - Modern Flat (Linear/Stripe Aesthetic)
 * - Soft & Dreamy (Calm/Headspace Aesthetic)
 * - Minimalist (Swiss/Apple/Claude.ai Aesthetic)
 * - Neo-Brutalism (Gumroad/CRED Aesthetic)
 */

import { Square, Cloud, Minus, Sparkles, LucideIcon } from 'lucide-react';

export type StylePresetId = 'modern-flat' | 'soft-dreamy' | 'minimalist' | 'neo-brutalism';

export interface StylePresetTokens {
    radius: {
        none: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        full: number;
    };
    shadows: {
        none: string;
        sm: string;
        md: string;
        lg: string;
    };
    borderWidths: {
        none: number;
        thin: number;
        medium: number;
        thick: number;
        focus: number;
    };
    space: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
    };
    animations: {
        quick: number;
        normal: number;
        slow: number;
        curve: string;
    };
    colors: {
        borderColor: string;
        borderColorDark: string;
        saturation: number;
        background?: string;
    };
    // Component-specific tokens
    button: {
        height: number;
        paddingHorizontal: number;
        paddingVertical: number;
        radiusKey: 'sm' | 'md' | 'lg' | 'xl' | 'full';
        borderWidthKey: 'none' | 'thin' | 'medium' | 'thick';
        shadowKey: 'none' | 'sm' | 'md' | 'lg';
        fontSize: number;
        fontWeight: number;
    };
    card: {
        padding: number;
        radiusKey: 'none' | 'sm' | 'md' | 'lg' | 'xl';
        borderWidthKey: 'none' | 'thin' | 'medium' | 'thick';
        shadowKey: 'none' | 'sm' | 'md' | 'lg';
    };
    input: {
        height: number;
        padding: number;
        radiusKey: 'sm' | 'md' | 'lg' | 'xl';
        borderWidthKey: 'none' | 'thin' | 'medium' | 'thick';
    };
}

export interface StylePreset {
    id: StylePresetId;
    name: string;
    icon: LucideIcon;
    description: string;
    tokens: StylePresetTokens;
}

// Modern Flat (Linear/Stripe Aesthetic)
const modernFlatTokens: StylePresetTokens = {
    radius: {
        none: 0,
        sm: 4,    // Chips, tags
        md: 6,    // Buttons, inputs
        lg: 8,    // Cards, modals
        xl: 12,   // Sheets
        full: 9999
    },
    shadows: {
        none: 'none',
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    borderWidths: {
        none: 0,
        thin: 1,      // All borders are 1px
        medium: 1,    // Still 1px for this style
        thick: 1,     // Maintains consistency
        focus: 2      // Focus rings only
    },
    space: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        xxl: 32
    },
    animations: {
        quick: 150,
        normal: 200,
        slow: 300,
        curve: 'cubic-bezier(0.4, 0, 0.2, 1)'  // Standard ease
    },
    colors: {
        borderColor: 'rgba(0, 0, 0, 0.08)',
        borderColorDark: 'rgba(255, 255, 255, 0.08)',
        saturation: 55
    },
    button: {
        height: 40,
        paddingHorizontal: 16,
        paddingVertical: 8,
        radiusKey: 'md',
        borderWidthKey: 'thin',
        shadowKey: 'none',
        fontSize: 14,
        fontWeight: 500
    },
    card: {
        padding: 16,
        radiusKey: 'lg',
        borderWidthKey: 'thin',
        shadowKey: 'sm'
    },
    input: {
        height: 40,
        padding: 12,
        radiusKey: 'md',
        borderWidthKey: 'thin'
    }
};

// Soft & Dreamy (Calm/Headspace Aesthetic)
const softDreamyTokens: StylePresetTokens = {
    radius: {
        none: 0,
        sm: 12,   // Even small elements are very rounded
        md: 16,   // Inputs
        lg: 24,   // Cards - very rounded
        xl: 32,   // Large containers
        full: 9999  // Pills/buttons
    },
    shadows: {
        none: 'none',
        sm: '0 4px 12px rgba(98, 130, 227, 0.08)',
        md: '0 8px 24px rgba(98, 130, 227, 0.12)',
        lg: '0 20px 40px rgba(27, 34, 80, 0.15)'
    },
    borderWidths: {
        none: 0,      // NO BORDERS on containers
        thin: 0,      // Still none
        medium: 0,    // None
        thick: 0,     // None
        focus: 0      // Use shadow/glow for focus
    },
    space: {
        xs: 8,
        sm: 16,   // More generous than Modern Flat
        md: 24,
        lg: 32,
        xl: 48,
        xxl: 64
    },
    animations: {
        quick: 300,
        normal: 400,
        slow: 600,
        curve: 'cubic-bezier(0.34, 1.56, 0.64, 1)'  // Spring with overshoot
    },
    colors: {
        borderColor: 'transparent',
        borderColorDark: 'transparent',
        saturation: 35,
        background: '#F5F7FA'  // Off-white required for shadow visibility
    },
    button: {
        height: 48,
        paddingHorizontal: 24,
        paddingVertical: 12,
        radiusKey: 'full',
        borderWidthKey: 'none',
        shadowKey: 'sm',
        fontSize: 16,
        fontWeight: 600
    },
    card: {
        padding: 24,
        radiusKey: 'lg',
        borderWidthKey: 'none',
        shadowKey: 'md'
    },
    input: {
        height: 48,
        padding: 16,
        radiusKey: 'md',
        borderWidthKey: 'none'
    }
};

// Minimalist (Swiss/Apple/Claude.ai Aesthetic)
const minimalistTokens: StylePresetTokens = {
    radius: {
        none: 0,      // Often completely sharp
        sm: 2,        // Micro rounding only
        md: 4,        // Subtle
        lg: 4,        // Maintains sharpness
        xl: 6,        // Maximum roundness
        full: 9999
    },
    shadows: {
        none: 'none',   // Default for most elements
        sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
        md: '0 2px 4px rgba(0, 0, 0, 0.06)',
        lg: 'none'  // Rarely used, only for modals
    },
    borderWidths: {
        none: 0,
        thin: 1,  // Hairline on iOS would be 0.5px
        medium: 1,
        thick: 1,
        focus: 2
    },
    space: {
        xs: 8,
        sm: 16,
        md: 24,
        lg: 40,   // Larger gaps
        xl: 64,   // Maximum whitespace
        xxl: 96   // Extreme spacing for sections
    },
    animations: {
        quick: 100,   // Nearly instant
        normal: 150,
        slow: 200,
        curve: 'linear'  // No easing, mechanical
    },
    colors: {
        borderColor: '#E5E5E5',  // Very light gray
        borderColorDark: 'rgba(255, 255, 255, 0.06)',
        saturation: 40  // 30-50% muted colors
    },
    button: {
        height: 44,
        paddingHorizontal: 24,
        paddingVertical: 10,
        radiusKey: 'sm',
        borderWidthKey: 'thin',
        shadowKey: 'none',
        fontSize: 15,
        fontWeight: 600
    },
    card: {
        padding: 24,
        radiusKey: 'none',
        borderWidthKey: 'thin',
        shadowKey: 'none'
    },
    input: {
        height: 44,
        padding: 12,
        radiusKey: 'sm',
        borderWidthKey: 'thin'
    }
};

// Neo-Brutalism (Gumroad/CRED Aesthetic)
const neoBrutalismTokens: StylePresetTokens = {
    radius: {
        none: 0,    // Sharp edges common
        sm: 0,      // Often completely sharp
        md: 4,      // Slightly blunt when used
        lg: 8,      // Occasional roundness
        xl: 12,     // For specific elements
        full: 9999
    },
    shadows: {
        none: 'none',
        sm: '2px 2px 0px #000000',  // NO BLUR - critical!
        md: '4px 4px 0px #000000',
        lg: '6px 6px 0px #000000'
    },
    borderWidths: {
        none: 0,
        thin: 2,      // Minimum 2px
        medium: 3,    // Standard
        thick: 4,     // Bold borders
        focus: 5      // Extra thick on focus
    },
    space: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48
    },
    animations: {
        quick: 150,
        normal: 150,  // All animations snappy
        slow: 200,
        curve: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'  // Bounce
    },
    colors: {
        borderColor: '#000000',  // Pure black
        borderColorDark: '#FFFFFF',  // Pure white in dark mode
        saturation: 95  // 90-100% ultra saturated
    },
    button: {
        height: 44,
        paddingHorizontal: 20,
        paddingVertical: 10,
        radiusKey: 'md',
        borderWidthKey: 'medium',
        shadowKey: 'sm',
        fontSize: 16,
        fontWeight: 700  // Bold
    },
    card: {
        padding: 20,
        radiusKey: 'none',
        borderWidthKey: 'thin',
        shadowKey: 'md'
    },
    input: {
        height: 44,
        padding: 12,
        radiusKey: 'md',
        borderWidthKey: 'thin'
    }
};

// Export all style presets
export const stylePresets: StylePreset[] = [
    {
        id: 'modern-flat',
        name: 'Modern Flat',
        icon: Square,
        description: 'Clean, minimal shadows (Linear/Stripe)',
        tokens: modernFlatTokens
    },
    {
        id: 'soft-dreamy',
        name: 'Soft & Dreamy',
        icon: Cloud,
        description: 'Gentle, diffused look (Headspace)',
        tokens: softDreamyTokens
    },
    {
        id: 'minimalist',
        name: 'Minimalist',
        icon: Minus,
        description: 'Sharp, minimal design (Apple/Claude)',
        tokens: minimalistTokens
    },
    {
        id: 'neo-brutalism',
        name: 'Neo-Brutalism',
        icon: Sparkles,
        description: 'Bold, hard shadows (Gumroad)',
        tokens: neoBrutalismTokens
    }
];

// Helper function to get a style preset by id
export function getStylePreset(id: StylePresetId): StylePreset | undefined {
    return stylePresets.find(preset => preset.id === id);
}

// Helper function to get computed CSS variables from a style preset
export function getStylePresetCSSVariables(preset: StylePreset, isDarkMode: boolean): Record<string, string> {
    const { tokens } = preset;

    return {
        // Radii
        '--radius-none': `${tokens.radius.none}px`,
        '--radius-sm': `${tokens.radius.sm}px`,
        '--radius-md': `${tokens.radius.md}px`,
        '--radius-lg': `${tokens.radius.lg}px`,
        '--radius-xl': `${tokens.radius.xl}px`,
        '--radius-full': `${tokens.radius.full}px`,

        // Shadows
        '--shadow-none': tokens.shadows.none,
        '--shadow-sm': tokens.shadows.sm,
        '--shadow-md': tokens.shadows.md,
        '--shadow-lg': tokens.shadows.lg,
        '--shadow-1': tokens.shadows.sm,
        '--shadow-2': tokens.shadows.md,
        '--shadow-3': tokens.shadows.lg,

        // Border widths
        '--border-none': `${tokens.borderWidths.none}px`,
        '--border-thin': `${tokens.borderWidths.thin}px`,
        '--border-medium': `${tokens.borderWidths.medium}px`,
        '--border-thick': `${tokens.borderWidths.thick}px`,
        '--border-focus': `${tokens.borderWidths.focus}px`,

        // Spacing
        '--space-xs': `${tokens.space.xs}px`,
        '--space-sm': `${tokens.space.sm}px`,
        '--space-md': `${tokens.space.md}px`,
        '--space-lg': `${tokens.space.lg}px`,
        '--space-xl': `${tokens.space.xl}px`,
        '--space-xxl': `${tokens.space.xxl}px`,

        // Animation
        '--animation-quick': `${tokens.animations.quick}ms`,
        '--animation-normal': `${tokens.animations.normal}ms`,
        '--animation-slow': `${tokens.animations.slow}ms`,
        '--animation-curve': tokens.animations.curve,
        '--motion-fast': `${tokens.animations.quick}ms`,
        '--motion-base': `${tokens.animations.normal}ms`,
        '--motion-slow': `${tokens.animations.slow}ms`,
        '--ease-standard': tokens.animations.curve,

        // Colors
        '--style-border-color': isDarkMode ? tokens.colors.borderColorDark : tokens.colors.borderColor,

        // Button component tokens
        '--button-height': `${tokens.button.height}px`,
        '--button-padding-x': `${tokens.button.paddingHorizontal}px`,
        '--button-padding-y': `${tokens.button.paddingVertical}px`,
        '--button-radius': `${tokens.radius[tokens.button.radiusKey]}px`,
        '--button-border-width': `${tokens.borderWidths[tokens.button.borderWidthKey]}px`,
        '--button-shadow': tokens.shadows[tokens.button.shadowKey],
        '--button-font-size': `${tokens.button.fontSize}px`,
        '--button-font-weight': `${tokens.button.fontWeight}`,

        // Card component tokens
        '--card-padding': `${tokens.card.padding}px`,
        '--card-radius': `${tokens.radius[tokens.card.radiusKey]}px`,
        '--card-border-width': `${tokens.borderWidths[tokens.card.borderWidthKey]}px`,
        '--card-shadow': tokens.shadows[tokens.card.shadowKey],

        // Input component tokens
        '--input-height': `${tokens.input.height}px`,
        '--input-padding': `${tokens.input.padding}px`,
        '--input-radius': `${tokens.radius[tokens.input.radiusKey]}px`,
        '--input-border-width': `${tokens.borderWidths[tokens.input.borderWidthKey]}px`,
    };
}

export default stylePresets;
