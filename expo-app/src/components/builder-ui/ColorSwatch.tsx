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
  'w-8 h-8 items-center justify-center',
  {
    variants: {
      selected: {
        true: 'border-2 border-brand-500 rounded-xl',
        false: 'border border-border/40 rounded-xl',
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
          className="absolute inset-0"
          style={{
            // @ts-ignore - web-only gradient
            background:
              'conic-gradient(from 0deg, #e74c3c 0deg, #f39c12 45deg, #f1c40f 90deg, #2ecc71 135deg, #1abc9c 180deg, #3498db 225deg, #9b59b6 270deg, #e91e63 315deg, #e74c3c 360deg)',
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
