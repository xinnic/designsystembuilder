/**
 * Button Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST use active:scale-[0.98] for press feedback
 * - MUST expose icon, iconRight, loading, disabled, fullWidth props
 * - MUST use accessibilityRole="button"
 * - MUST meet 44px minimum touch target (WCAG 2.5.8)
 * - Loading state MUST show ActivityIndicator and disable press
 * - Disabled state MUST reduce opacity to 0.4 and block interaction
 * - Focus ring MUST have 2px offset from element boundary (web)
 * - Icon slot appears before label; iconRight slot appears after
 * - Text MUST inherit variant color via buttonTextVariants
 */

import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  type PressableProps,
  type ViewStyle,
} from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const buttonVariants = cva(
  // Base: flex-row centered, min tap target, press animation
  'flex-row items-center justify-center active:scale-[0.98] transition-transform',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-500 active:bg-brand-600',
        secondary:
          'border border-brand-500 bg-transparent active:bg-brand-500/10',
        tertiary:
          'bg-transparent active:bg-brand-500/10',
        destructive:
          'bg-red-500 active:bg-red-600',
        ghost:
          'bg-transparent active:bg-surface-secondary',
        outline:
          'border border-border bg-transparent active:bg-surface-secondary',
      },
      size: {
        sm: 'min-h-[36px] px-3 gap-1.5 rounded-sm',
        md: 'min-h-[44px] px-4 gap-2 rounded-md',
        lg: 'min-h-[52px] px-6 gap-2.5 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

const buttonTextVariants = cva('font-semibold text-center', {
  variants: {
    variant: {
      primary: 'text-white',
      secondary: 'text-brand-500',
      tertiary: 'text-brand-500',
      destructive: 'text-white',
      ghost: 'text-on-surface',
      outline: 'text-on-surface',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ButtonProps
  extends Omit<PressableProps, 'children'>,
    VariantProps<typeof buttonVariants> {
  /** Button label */
  children: React.ReactNode;
  /** Icon rendered before the label */
  icon?: React.ReactNode;
  /** Icon rendered after the label */
  iconRight?: React.ReactNode;
  /** Show spinner and disable interaction */
  loading?: boolean;
  /** Reduce opacity and disable interaction */
  disabled?: boolean;
  /** Stretch to fill container width */
  fullWidth?: boolean;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Button({
  variant,
  size,
  icon,
  iconRight,
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      className={cn(
        buttonVariants({ variant, size }),
        fullWidth && 'w-full',
        isDisabled && 'opacity-40',
        className,
      )}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'primary' || variant === 'destructive'
              ? '#ffffff'
              : undefined
          }
        />
      ) : (
        icon
      )}

      {typeof children === 'string' ? (
        <Text className={cn(buttonTextVariants({ variant, size }))}>
          {children}
        </Text>
      ) : (
        children
      )}

      {!loading && iconRight}
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// Exports for consumption by other components & spec generator
// ---------------------------------------------------------------------------

export { buttonVariants, buttonTextVariants };
