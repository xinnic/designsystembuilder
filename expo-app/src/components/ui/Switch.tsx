/**
 * Switch Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST use React Native Switch component as base
 * - MUST support label and helperText props
 * - MUST use brand-500 for active track color
 * - MUST use surface-secondary for inactive track color
 * - MUST meet 44px minimum touch target
 * - MUST use accessibilityRole="switch"
 * - MUST support disabled state with reduced opacity
 * - Label MUST be pressable to toggle switch
 * - MUST support size variants: sm, md, lg
 * - MUST support labelPosition: left, right
 */

import React from 'react';
import {
  View,
  Text,
  Switch as RNSwitch,
  Pressable,
  type SwitchProps as RNSwitchProps,
} from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useDesignSystem } from '../../state/designSystem';
import { COLOR_VALUES } from '../../config/colorThemes';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const switchContainerVariants = cva('flex-row items-center gap-3', {
  variants: {
    labelPosition: {
      left: 'flex-row-reverse',
      right: 'flex-row',
    },
    size: {
      sm: 'min-h-[36px]',
      md: 'min-h-[44px]',
      lg: 'min-h-[52px]',
    },
  },
  defaultVariants: {
    labelPosition: 'right',
    size: 'md',
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SwitchProps
  extends Omit<RNSwitchProps, 'style'>,
    VariantProps<typeof switchContainerVariants> {
  /** Switch label */
  label?: string;
  /** Helper text below the switch */
  helperText?: string;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Switch({
  label,
  helperText,
  labelPosition,
  size,
  value,
  onValueChange,
  disabled,
  className,
  ...props
}: SwitchProps) {
  const { selectedTheme, customPrimaryColor, isDarkMode } = useDesignSystem();

  // Get the current brand color from the store
  const brandColor =
    selectedTheme === 'custom' && customPrimaryColor
      ? customPrimaryColor
      : COLOR_VALUES[selectedTheme] || '#1abc9c';

  const handlePress = () => {
    if (!disabled && onValueChange) {
      onValueChange(!value);
    }
  };

  return (
    <View className={cn('gap-1', className)}>
      <Pressable
        className={cn(
          switchContainerVariants({ labelPosition, size }),
          disabled && 'opacity-40',
        )}
        onPress={label ? handlePress : undefined}
        disabled={disabled}
        accessibilityRole="switch"
        accessibilityState={{ checked: value, disabled }}
        accessibilityLabel={label}
      >
        <RNSwitch
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          trackColor={{
            false: isDarkMode ? '#1e1e1e' : '#e5e7eb',
            true: brandColor,
          }}
          thumbColor="#ffffff"
          {...props}
        />

        {label ? (
          <View className="flex-1">
            <Text className="font-body text-base text-on-surface font-medium">
              {label}
            </Text>
          </View>
        ) : null}
      </Pressable>

      {helperText ? (
        <Text className="font-body text-xs text-on-surface-secondary">{helperText}</Text>
      ) : null}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { switchContainerVariants };
