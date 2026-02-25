/**
 * Checkbox Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST render as Pressable box with checkmark icon
 * - MUST support checked, indeterminate, unchecked states
 * - MUST support label and helperText props
 * - MUST use brand-500 for checked background
 * - MUST use border-border for unchecked border
 * - MUST meet 44px minimum touch target
 * - MUST use accessibilityRole="checkbox"
 * - MUST support disabled state with reduced opacity
 * - Label MUST be pressable to toggle checkbox
 * - MUST support size variants: sm, md, lg
 * - Indeterminate state MUST show horizontal line icon
 */

import React from 'react';
import { View, Text, Pressable, type PressableProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const checkboxVariants = cva(
  'items-center justify-center border-2 rounded-sm',
  {
    variants: {
      checked: {
        true: 'bg-brand-500 border-brand-500',
        false: 'bg-transparent border-border',
      },
      indeterminate: {
        true: 'bg-brand-500 border-brand-500',
        false: '',
      },
      size: {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
      },
    },
    defaultVariants: {
      checked: false,
      indeterminate: false,
      size: 'md',
    },
  },
);

const checkboxContainerVariants = cva('flex-row gap-3', {
  variants: {
    size: {
      sm: 'min-h-[36px]',
      md: 'min-h-[44px]',
      lg: 'min-h-[52px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CheckboxProps
  extends Omit<PressableProps, 'children'>,
    VariantProps<typeof checkboxVariants> {
  /** Checkbox label */
  label?: string;
  /** Helper text below the checkbox */
  helperText?: string;
  /** Checked state */
  checked?: boolean;
  /** Indeterminate state (partial selection) */
  indeterminate?: boolean;
  /** Called when checkbox is toggled */
  onCheckedChange?: (checked: boolean) => void;
  /** Disable the checkbox */
  disabled?: boolean;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Check Icon
// ---------------------------------------------------------------------------

function CheckIcon({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const textSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';
  return <Text className={cn('font-body text-white font-bold leading-none', textSize)}>✓</Text>;
}

function IndeterminateIcon({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const textSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';
  return <Text className={cn('text-white font-bold leading-none', textSize)}>−</Text>;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Checkbox({
  label,
  helperText,
  checked = false,
  indeterminate = false,
  onCheckedChange,
  size,
  disabled = false,
  className,
  ...props
}: CheckboxProps) {
  const handlePress = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  return (
    <View className={cn('gap-1', className)}>
      <Pressable
        className={cn(
          checkboxContainerVariants({ size }),
          'items-start',
          disabled && 'opacity-40',
        )}
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityState={{
          checked: indeterminate ? 'mixed' : checked,
          disabled,
        }}
        accessibilityLabel={label}
        {...props}
      >
        <View
          className={cn(
            checkboxVariants({
              checked: checked && !indeterminate,
              indeterminate,
              size,
            }),
          )}
        >
          {indeterminate ? (
            <IndeterminateIcon size={size || 'md'} />
          ) : checked ? (
            <CheckIcon size={size || 'md'} />
          ) : null}
        </View>

        {label && (
          <View className="flex-1 justify-center">
            <Text className="font-body text-base text-on-surface">{label}</Text>
          </View>
        )}
      </Pressable>

      {helperText && (
        <Text className="font-body text-xs text-on-surface-secondary ml-8">
          {helperText}
        </Text>
      )}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { checkboxVariants, checkboxContainerVariants };
