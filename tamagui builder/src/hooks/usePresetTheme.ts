/**
 * usePresetTheme Hook
 *
 * Manages Tamagui theme switching based on style presets.
 * Bridges the gap between Zustand store and Tamagui's theme system.
 */

import { useMemo } from 'react';
import { useDesignSystem } from '../state/designSystem';
import { getStylePreset, type StylePresetId } from '../config/stylePresets';
import { getThemeNameFromPreset } from '../tamagui.config';

export interface PresetThemeReturn {
  /** The Tamagui theme name for the current preset */
  currentThemeName: string;

  /** The raw preset tokens */
  presetTokens: ReturnType<typeof getStylePreset>['tokens'] | null;

  /** Function to switch presets */
  setPreset: (presetId: StylePresetId) => void;

  /** The current preset ID */
  currentPresetId: string;
}

/**
 * Hook to manage Tamagui theme switching based on style presets
 */
export function usePresetTheme(): PresetThemeReturn {
  const { stylePresetId, setStylePreset } = useDesignSystem();

  // Get the current preset data
  const preset = useMemo(() => {
    return getStylePreset(stylePresetId as StylePresetId);
  }, [stylePresetId]);

  // Get the Tamagui theme name for the current preset
  const currentThemeName = useMemo(() => {
    return getThemeNameFromPreset(stylePresetId as StylePresetId);
  }, [stylePresetId]);

  // NOTE: CSS variables are written exclusively by `useTokenSystem`, which
  // composes the preset with the Corner Radius / Spacing / Type Scale controls.
  // Writing them here too would race with that hook and make the winner depend
  // on effect order.

  return {
    currentThemeName,
    presetTokens: preset?.tokens || null,
    setPreset: setStylePreset,
    currentPresetId: stylePresetId,
  };
}

/**
 * Helper hook to get just the theme name (for TamaguiProvider)
 */
export function usePresetThemeName(): string {
  const { stylePresetId, isDarkMode } = useDesignSystem();

  // If dark mode is enabled, return 'dark', otherwise return the preset theme
  if (isDarkMode) {
    return 'dark';
  }

  return getThemeNameFromPreset(stylePresetId as StylePresetId);
}
