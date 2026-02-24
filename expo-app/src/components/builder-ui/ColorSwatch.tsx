/**
 * ColorSwatch — Builder UI Primitive (NativeWind + CVA)
 *
 * Pressable circle with background color for color selection.
 * Selected state: ring highlight. Custom variant: rainbow gradient overlay.
 * Ported from Tamagui BuilderColorSwatch.
 *
 * Web: supports native <input type="color"> overlay for custom picker.
 * Native: accepts children for custom picker overlay.
 */

import React from 'react';
import { View, Pressable, Platform } from 'react-native';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const colorSwatchVariants = cva(
  'w-9 h-9 items-center justify-center rounded-lg',
  {
    variants: {
      selected: {
        true: 'border-[2px] border-gray-900',
        false: 'border-[0.5px] border-gray-300',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

interface ColorSwatchProps {
  color: string;
  isSelected: boolean;
  onPress: () => void;
  isCustom?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function ColorSwatch({
  color,
  isSelected,
  onPress,
  isCustom,
  children,
  className,
}: ColorSwatchProps) {
  return (
    <Pressable
      className={cn(
        colorSwatchVariants({ selected: isSelected }),
        'overflow-hidden',
        className,
      )}
      style={
        !isCustom
          ? { backgroundColor: color }
          : undefined
      }
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={isCustom ? 'Custom color' : color}
    >
      {isCustom && Platform.OS === 'web' && (
        <View
          className="absolute inset-0 rounded-full"
          style={{
            // @ts-ignore - web-only gradient (circular rainbow wheel)
            background:
              'conic-gradient(from 0deg, #ff0000 0deg, #ffff00 60deg, #00ff00 120deg, #00ffff 180deg, #0000ff 240deg, #ff00ff 300deg, #ff0000 360deg)',
          }}
        />
      )}
      {isCustom && Platform.OS !== 'web' && (
        <View className="absolute inset-0 bg-on-surface-secondary/20" />
      )}
      {children}
    </Pressable>
  );
}

export { colorSwatchVariants };
