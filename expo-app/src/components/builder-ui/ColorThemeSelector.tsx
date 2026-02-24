/**
 * ColorThemeSelector — Builder UI (NativeWind)
 *
 * Grid of ColorSwatch components (18 preset colors + 1 custom).
 * Supports primary and secondary color modes.
 * Web: native <input type="color"> for custom picker.
 * Native: TextInput for hex entry.
 */

import React, { useRef } from 'react';
import { View, Platform, TextInput, Text } from 'react-native';
import { ColorSwatch } from './ColorSwatch';
import {
  colorThemes,
  DEFAULT_PRIMARY,
  DEFAULT_ACCENT,
} from '../../config/colorThemes';

interface ColorThemeSelectorProps {
  mode: 'primary' | 'secondary';
  selectedTheme: string;
  customColor: string;
  onSelectTheme: (theme: string, customColor?: string) => void;
  className?: string;
}

export function ColorThemeSelector({
  mode,
  selectedTheme,
  customColor,
  onSelectTheme,
  className,
}: ColorThemeSelectorProps) {
  const defaultColor = mode === 'primary' ? DEFAULT_PRIMARY : DEFAULT_ACCENT;
  const colorInputRef = useRef<HTMLInputElement>(null);

  return (
    <View className="flex-row flex-wrap gap-2">
      {colorThemes.map((theme) => (
        <View key={theme.name}>
          {theme.isCustom ? (
            <ColorSwatch
              color="transparent"
              isSelected={selectedTheme === 'custom'}
              onPress={() => {
                onSelectTheme('custom', customColor || defaultColor);
                // On web, programmatically click the hidden color input
                if (Platform.OS === 'web' && colorInputRef.current) {
                  colorInputRef.current.click();
                }
              }}
              isCustom
            >
              {Platform.OS === 'web' && (
                <input
                  ref={colorInputRef as any}
                  type="color"
                  value={customColor || defaultColor}
                  onChange={(e: any) => {
                    onSelectTheme('custom', e.target.value);
                  }}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    onSelectTheme('custom', customColor || defaultColor);
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 10,
                  }}
                />
              )}
            </ColorSwatch>
          ) : (
            <ColorSwatch
              color={theme.color}
              isSelected={selectedTheme === theme.name}
              onPress={() => onSelectTheme(theme.name)}
            />
          )}
        </View>
      ))}
    </View>
  );
}
