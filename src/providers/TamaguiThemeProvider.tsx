import React, { useMemo } from 'react';
import { TamaguiProvider } from '@tamagui/core';
import { config, getThemeNameFromPreset } from '../tamagui.config';
import { useDesignSystem } from '../state/designSystem';
import type { StylePresetId } from '../config/stylePresets';

interface TamaguiThemeProviderProps {
  children: React.ReactNode;
}

/**
 * TamaguiThemeProvider
 *
 * Wraps the application with TamaguiProvider and dynamically switches themes
 * based on the selected style preset from the design system store.
 *
 * Theme mapping:
 * - 'modern-flat' → 'modernFlat'
 * - 'soft-dreamy' → 'softDreamy'
 * - 'minimalist' → 'minimalist'
 * - 'neo-brutalism' → 'neoBrutalism'
 */
export const TamaguiThemeProvider: React.FC<TamaguiThemeProviderProps> = ({ children }) => {
  const { stylePresetId, isDarkMode } = useDesignSystem();

  // Get the Tamagui theme name from the preset ID
  const themeName = useMemo(() => {
    // If we have a preset ID, use it. Otherwise, fall back to light/dark mode
    if (stylePresetId) {
      return getThemeNameFromPreset(stylePresetId as StylePresetId);
    }
    return isDarkMode ? 'dark' : 'light';
  }, [stylePresetId, isDarkMode]);

  return (
    <TamaguiProvider config={config} defaultTheme={themeName}>
      {children}
    </TamaguiProvider>
  );
};

export default TamaguiThemeProvider;
