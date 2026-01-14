
import { createTamagui } from 'tamagui'
import { config as defaultConfig } from '@tamagui/config'
import { generateBrandPalette } from '../design-system/tokens'
import { DesignSystemState } from '../state/designSystem'

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

export function createTamaguiConfig(state: DesignSystemState) {
    const { selectedTheme, customPrimaryColor, isDarkMode, stylePresetId } = state;

    const primaryColor = selectedTheme === 'custom'
        ? customPrimaryColor || '#3498db'
        : colorThemes[selectedTheme] || '#3498db';

    const palette = generateBrandPalette(primaryColor);
    const brand = palette.brand;

    // Preset Overrides
    const isModern = stylePresetId === 'modern-flat';
    const isNeo = stylePresetId === 'neo-brutalism';
    const isSoft = stylePresetId === 'soft-dreamy';
    const isMinimal = stylePresetId === 'minimalist';

    // Define shadow tokens with proper fallbacks
    const defaultShadows = {
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
    };

    const shadows = {
        ...defaultConfig.tokens.shadow,
        // Override semantic shadows based on preset
        sm: isModern ? 'none' : isNeo ? '4px 4px 0px 0px rgba(0,0,0,1)' : defaultShadows.sm,
        md: isModern ? '0px 1px 2px 0px rgba(0,0,0,0.05)' : isNeo ? '8px 8px 0px 0px rgba(0,0,0,1)' : defaultShadows.md,
        lg: isSoft ? '0 8px 24px rgba(98, 130, 227, 0.12)' : defaultShadows.lg
    };

    // Border Widths
    const borderWidth = isNeo ? 3 : 1;
    const radius = isNeo ? 0 : isSoft ? 16 : isModern ? 8 : 4;

    // Generate typography from state tokens
    const bodyFont = {
        family: state.tokens.fontFamily,
        size: {
            display: state.tokens.displayLg.size,
            h1: state.tokens.h1.size,
            h2: state.tokens.h2.size,
            h3: state.tokens.h3.size,
            subhead: state.tokens.subhead.size,
            body: state.tokens.body.size,
            caption: state.tokens.caption.size,
            small: state.tokens.caption.size,
            medium: state.tokens.body.size,
            large: state.tokens.subhead.size,
            true: state.tokens.body.size,
        },
        lineHeight: {
            display: state.tokens.displayLg.line,
            h1: state.tokens.h1.line,
            h2: state.tokens.h2.line,
            h3: state.tokens.h3.line,
            subhead: state.tokens.subhead.line,
            body: state.tokens.body.line,
            caption: state.tokens.caption.line,
            small: state.tokens.caption.line,
            medium: state.tokens.body.line,
            large: state.tokens.subhead.line,
            true: state.tokens.body.line,
        },
        weight: {
            display: state.tokens.displayLg.weight.toString(),
            h1: state.tokens.h1.weight.toString(),
            h2: state.tokens.h2.weight.toString(),
            h3: state.tokens.h3.weight.toString(),
            subhead: state.tokens.subhead.weight.toString(),
            body: state.tokens.body.weight.toString(),
            caption: state.tokens.caption.weight.toString(),
            small: state.tokens.caption.weight.toString(),
            medium: state.tokens.body.weight.toString(),
            large: state.tokens.subhead.weight.toString(),
            true: state.tokens.body.weight.toString(),
        },
        letterSpacing: {
            true: 0,
        },
    };

    return createTamagui({
        ...defaultConfig,
        fonts: {
            body: bodyFont as any,
            heading: bodyFont as any, // Use same scale for both for simplicity
        },
        tokens: {
            ...defaultConfig.tokens,
            size: {
                ...defaultConfig.tokens.size,
                // Add named size tokens that components are trying to use
                small: 14,
                medium: 16,
                large: 18,
            },
            radius: {
                ...defaultConfig.tokens.radius,
                // Override base radii if needed, but easier to just use standard keys mapped to dynamic values
                // or just rely on theme-level border-radius?
                // Let's override the 'true' key which is often default
                true: radius,
                sm: radius / 2,
                md: radius,
                lg: radius * 1.5,
            },
            shadow: {
                ...(defaultConfig.tokens as any).shadow,
                ...shadows
            },
            color: {
                ...defaultConfig.tokens.color,
                // Add missing outlineColor token
                outlineColor: brand[500],
            }
        },
        themes: {
            ...defaultConfig.themes,
            light: {
                ...defaultConfig.themes.light,
                background: '#ffffff',
                bgPrimary: '#ffffff',
                bgSecondary: '#f9fafb',
                color: '#1a1a1a',
                textPrimary: '#1a1a1a',
                textSecondary: '#6b7280',
                brand: brand[500],
                brandWeak: brand[100],
                primary: brand[500],
                primaryHover: brand[600],
                primaryPress: brand[700],
                border: isNeo ? '#000' : '#e5e7eb',
                borderColor: isNeo ? '#000' : '#e5e7eb',
                shadowColor: isNeo ? '#000' : 'rgba(0,0,0,0.1)',
                outlineColor: brand[500],
                // Map other semantic tokens
                focus: brand[500],
            },
            dark: {
                ...defaultConfig.themes.dark,
                background: '#1a1a1a',
                bgPrimary: '#1a1a1a',
                bgSecondary: '#111111',
                color: '#ffffff',
                textPrimary: '#ffffff',
                textSecondary: '#9ca3af',
                brand: brand[400],
                brandWeak: brand[900],
                primary: brand[400],
                primaryHover: brand[500],
                primaryPress: brand[600],
                border: isNeo ? '#fff' : '#333',
                borderColor: isNeo ? '#fff' : '#333',
                shadowColor: isNeo ? '#fff' : 'rgba(0,0,0,0.3)',
                outlineColor: brand[400],
                focus: brand[400],
            }
        },
        // Ensure we trigger a re-creation of the config
        // (Tamagui might cache based on valid keys, but creating a NEW object works with the Provider)
    });
}
