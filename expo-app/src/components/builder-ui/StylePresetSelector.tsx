/**
 * StylePresetSelector — Builder UI (NativeWind)
 *
 * 2x2 grid of OptionCards for the 4 style presets.
 */

import React from 'react';
import { View, Text } from 'react-native';
import { OptionCard } from './OptionCard';
import { stylePresets, type StylePresetId } from '../../config/stylePresets';

interface StylePresetSelectorProps {
  selectedPreset: string;
  onSelectPreset: (presetId: StylePresetId) => void;
  className?: string;
}

// Emoji icons since we can't use lucide-react LucideIcon in NativeWind context easily
const presetIcons: Record<string, string> = {
  'modern-flat': '▢',
  'soft-dreamy': '☁',
  'minimalist': '—',
  'neo-brutalism': '✦',
};

export function StylePresetSelector({
  selectedPreset,
  onSelectPreset,
  className,
}: StylePresetSelectorProps) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {stylePresets.map((preset) => (
        <OptionCard
          key={preset.id}
          customContent={
            <Text className="text-xl text-on-surface">{presetIcons[preset.id] || '●'}</Text>
          }
          label={preset.name}
          isSelected={selectedPreset === preset.id}
          onPress={() => onSelectPreset(preset.id)}
          className="w-[48%]"
        />
      ))}
    </View>
  );
}
