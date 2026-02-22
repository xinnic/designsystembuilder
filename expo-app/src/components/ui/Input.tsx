/**
 * Input Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST support label, helper text, and error message slots
 * - MUST expose leading icon and trailing icon slots
 * - MUST use accessibilityLabel (from label prop or explicit)
 * - Error state MUST show red border + error message text
 * - Disabled state MUST reduce opacity to 0.4 and block interaction
 * - Focus state MUST show brand-colored ring (2px, web)
 * - Min touch target 44px height for all sizes
 * - TextInput MUST fill available horizontal space (flex-1)
 * - Label MUST be rendered above the input container
 * - Error/helper text MUST be rendered below the input container
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  type TextInputProps,
} from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const inputContainerVariants = cva(
  // Base: row layout, border, rounded, items centered
  'flex-row items-center border bg-surface',
  {
    variants: {
      variant: {
        default: 'border-border',
        error: 'border-red-500',
        filled: 'border-transparent bg-surface-secondary',
      },
      size: {
        sm: 'min-h-[36px] px-2.5 gap-1.5 rounded-sm',
        md: 'min-h-[44px] px-3 gap-2 rounded-md',
        lg: 'min-h-[52px] px-4 gap-2.5 rounded-lg',
      },
      focused: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'opacity-40',
        false: '',
      },
    },
    compoundVariants: [
      // Focused + default → brand border
      {
        variant: 'default',
        focused: true,
        className: 'border-brand-500',
      },
      // Focused + filled → brand border + keep bg
      {
        variant: 'filled',
        focused: true,
        className: 'border-brand-500',
      },
      // Error always keeps red regardless of focus
      {
        variant: 'error',
        focused: true,
        className: 'border-red-500',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      focused: false,
      disabled: false,
    },
  },
);

const inputTextVariants = cva('flex-1 text-on-surface', {
  variants: {
    size: {
      sm: 'text-sm py-1.5',
      md: 'text-base py-2',
      lg: 'text-lg py-2.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface InputProps
  extends Omit<TextInputProps, 'editable'>,
    Omit<VariantProps<typeof inputContainerVariants>, 'focused' | 'disabled'> {
  /** Label displayed above the input */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message — also switches variant to error */
  error?: string;
  /** Icon rendered at the start of the input */
  leadingIcon?: React.ReactNode;
  /** Icon rendered at the end of the input */
  trailingIcon?: React.ReactNode;
  /** Disable the input */
  disabled?: boolean;
  /** Additional NativeWind classes on the outer wrapper */
  className?: string;
  /** Additional NativeWind classes on the input container */
  containerClassName?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Input({
  label,
  helperText,
  error,
  leadingIcon,
  trailingIcon,
  disabled = false,
  variant: variantProp,
  size,
  className,
  containerClassName,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);

  // Error prop overrides variant
  const variant = error ? 'error' : (variantProp ?? 'default');

  return (
    <View className={cn('gap-1.5', className)}>
      {/* Label */}
      {label && (
        <Text className="text-sm font-medium text-on-surface">
          {label}
        </Text>
      )}

      {/* Input Container */}
      <View
        className={cn(
          inputContainerVariants({
            variant,
            size,
            focused,
            disabled,
          }),
          containerClassName,
        )}
      >
        {leadingIcon}

        <TextInput
          className={cn(inputTextVariants({ size }))}
          placeholderTextColor="var(--color-on-surface-secondary)"
          editable={!disabled}
          accessibilityLabel={label}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />

        {trailingIcon}
      </View>

      {/* Error / Helper */}
      {error ? (
        <Text className="text-xs text-red-500">{error}</Text>
      ) : helperText ? (
        <Text className="text-xs text-on-surface-secondary">{helperText}</Text>
      ) : null}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { inputContainerVariants, inputTextVariants };
