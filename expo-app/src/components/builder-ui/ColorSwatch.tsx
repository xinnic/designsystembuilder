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
  'w-8 h-8 items-center justify-center rounded-md',
  {
    variants: {
      selected: {
        true: 'border-2 border-blue-500',
        false: 'border border-on-surface/10',
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
            // @ts-ignore - web-only gradient (soft color mesh)
            background:
              'radial-gradient(circle at top left, #a18cd1, transparent 80%), radial-gradient(circle at bottom right, #fbc2eb, transparent 80%), radial-gradient(circle at bottom left, #84fab0, transparent 80%), radial-gradient(circle at top right, #8fd3f4, transparent 80%), #ffdfba',
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
