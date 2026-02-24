/**
 * OptionCard — Builder UI Primitive (NativeWind + CVA)
 *
 * Pressable card for grid selection. Shows icon or custom content + label.
 * Selected state: brand border + brand/10 background.
 * Ported from Tamagui BuilderOptionCard.
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useDesignSystem } from '../../state/designSystem';

const optionCardVariants = cva(
  'items-center justify-center gap-2 rounded-md border p-3 shadow-sm',
  {
    variants: {
      selected: {
        true: 'border-blue-500 bg-blue-500/10',
        false: 'border-border bg-surface active:bg-surface-secondary',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

interface OptionCardProps extends VariantProps<typeof optionCardVariants> {
  icon?: React.ReactNode;
  customContent?: React.ReactNode;
  label: string;
  isSelected: boolean;
  onPress: () => void;
  className?: string;
}

export function OptionCard({
  icon,
  customContent,
  label,
  isSelected,
  onPress,
  className,
}: OptionCardProps) {
  const { tokens } = useDesignSystem();

  return (
    <Pressable
      className={cn(
        optionCardVariants({ selected: isSelected }),
        'min-h-[80px]',
        className,
      )}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      {customContent ? customContent : icon ? icon : null}
      <Text
        className={cn(
          'text-center',
          isSelected ? 'text-blue-500' : 'text-on-surface-secondary',
        )}
        style={{
          fontSize: parseInt(tokens.caption.size),
          lineHeight: parseInt(tokens.caption.line),
          fontWeight: tokens.caption.weight.toString(),
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export { optionCardVariants };
