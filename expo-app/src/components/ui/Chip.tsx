/**
 * Chip Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST render as compact pill-shaped container
 * - MUST support variants: filled, outlined, light (subtle background)
 * - MUST support sizes: sm, md, lg
 * - MUST support color variants: default, brand, success, warning, error
 * - MUST support leading icon slot
 * - MUST support onPress for interactive chips
 * - MUST support onDelete with X icon (dismiss action)
 * - MUST use rounded-full for pill shape
 * - MUST meet 32px minimum touch target for interactive chips
 * - Delete button MUST be visually distinct (right side, smaller)
 * - MUST use accessibilityRole="button" when pressable
 * - Disabled state MUST reduce opacity to 0.4
 */

import React from 'react';
import { View, Text, Pressable, type PressableProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const chipVariants = cva(
  'flex-row items-center rounded-full active:scale-95 transition-transform',
  {
    variants: {
      variant: {
        filled: '',
        outlined: 'border-2 bg-transparent',
        light: '',
      },
      color: {
        default: '',
        brand: '',
        success: '',
        warning: '',
        error: '',
      },
      size: {
        sm: 'min-h-[28px] px-2 gap-1',
        md: 'min-h-[32px] px-3 gap-1.5',
        lg: 'min-h-[36px] px-4 gap-2',
      },
    },
    compoundVariants: [
      // Filled variants
      { variant: 'filled', color: 'default', className: 'bg-surface-secondary' },
      { variant: 'filled', color: 'brand', className: 'bg-brand-500' },
      { variant: 'filled', color: 'success', className: 'bg-green-500' },
      { variant: 'filled', color: 'warning', className: 'bg-yellow-500' },
      { variant: 'filled', color: 'error', className: 'bg-red-500' },
      // Outlined variants
      { variant: 'outlined', color: 'default', className: 'border-border' },
      { variant: 'outlined', color: 'brand', className: 'border-brand-500' },
      { variant: 'outlined', color: 'success', className: 'border-green-500' },
      { variant: 'outlined', color: 'warning', className: 'border-yellow-500' },
      { variant: 'outlined', color: 'error', className: 'border-red-500' },
      // Light variants
      { variant: 'light', color: 'default', className: 'bg-surface-secondary/30' },
      { variant: 'light', color: 'brand', className: 'bg-brand-500/10' },
      { variant: 'light', color: 'success', className: 'bg-green-500/10' },
      { variant: 'light', color: 'warning', className: 'bg-yellow-500/10' },
      { variant: 'light', color: 'error', className: 'bg-red-500/10' },
    ],
    defaultVariants: {
      variant: 'filled',
      color: 'default',
      size: 'md',
    },
  },
);

const chipTextVariants = cva('font-medium', {
  variants: {
    variant: {
      filled: '',
      outlined: '',
      light: '',
    },
    color: {
      default: '',
      brand: '',
      success: '',
      warning: '',
      error: '',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  compoundVariants: [
    // Filled text colors
    { variant: 'filled', color: 'default', className: 'text-on-surface' },
    { variant: 'filled', color: 'brand', className: 'text-white' },
    { variant: 'filled', color: 'success', className: 'text-white' },
    { variant: 'filled', color: 'warning', className: 'text-black' },
    { variant: 'filled', color: 'error', className: 'text-white' },
    // Outlined text colors
    { variant: 'outlined', color: 'default', className: 'text-on-surface' },
    { variant: 'outlined', color: 'brand', className: 'text-brand-500' },
    { variant: 'outlined', color: 'success', className: 'text-green-500' },
    { variant: 'outlined', color: 'warning', className: 'text-yellow-600' },
    { variant: 'outlined', color: 'error', className: 'text-red-500' },
    // Light text colors
    { variant: 'light', color: 'default', className: 'text-on-surface' },
    { variant: 'light', color: 'brand', className: 'text-brand-600' },
    { variant: 'light', color: 'success', className: 'text-green-600' },
    { variant: 'light', color: 'warning', className: 'text-yellow-700' },
    { variant: 'light', color: 'error', className: 'text-red-600' },
  ],
  defaultVariants: {
    variant: 'filled',
    color: 'default',
    size: 'md',
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ChipProps
  extends Omit<PressableProps, 'children'>,
    VariantProps<typeof chipVariants> {
  /** Chip label */
  children: string;
  /** Leading icon */
  icon?: React.ReactNode;
  /** Called when chip is pressed */
  onPress?: () => void;
  /** Called when delete button is pressed */
  onDelete?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Delete Button
// ---------------------------------------------------------------------------

function DeleteButton({ onPress, size }: { onPress: () => void; size: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6';
  return (
    <Pressable
      className={cn('items-center justify-center rounded-full active:bg-black/10', sizeClass)}
      onPress={(e) => {
        e.stopPropagation();
        onPress();
      }}
      accessibilityRole="button"
      accessibilityLabel="Delete"
    >
      <Text className="text-xs leading-none">✕</Text>
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Chip({
  variant,
  color,
  size,
  icon,
  onPress,
  onDelete,
  disabled = false,
  children,
  className,
  ...props
}: ChipProps) {
  const content = (
    <>
      {icon && <View>{icon}</View>}
      <Text className={cn(chipTextVariants({ variant, color, size }))}>{children}</Text>
      {onDelete && <DeleteButton onPress={onDelete} size={size || 'md'} />}
    </>
  );

  const containerClass = cn(
    chipVariants({ variant, color, size }),
    disabled && 'opacity-40',
    className,
  );

  if (onPress) {
    return (
      <Pressable
        className={containerClass}
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        {...props}
      >
        {content}
      </Pressable>
    );
  }

  return <View className={containerClass}>{content}</View>;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { chipVariants, chipTextVariants };
