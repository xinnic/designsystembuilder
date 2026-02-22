/**
 * Badge Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST render as small circular or rounded indicator
 * - MUST support positioning: standalone or overlay on parent (top-right)
 * - MUST support variants: dot (no content), numeric (count), icon
 * - MUST support color variants: default, brand, success, warning, error
 * - MUST support sizes: sm, md, lg (for non-dot badges)
 * - Dot variant MUST be 8px circle
 * - Numeric variant MUST show count (max 99, then "99+")
 * - MUST support absolute positioning when used as overlay
 * - MUST use accessibilityLabel for count/status
 * - Overlay badge MUST position at top-right with -2px offset
 * - MUST support border ring (white/surface) for visibility on images
 */

import React from 'react';
import { View, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const badgeVariants = cva('items-center justify-center', {
  variants: {
    variant: {
      dot: 'w-2 h-2 rounded-full',
      numeric: 'rounded-full',
      icon: 'rounded-full',
    },
    color: {
      default: 'bg-surface-secondary',
      brand: 'bg-brand-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    bordered: {
      true: 'border-2 border-surface',
      false: '',
    },
  },
  compoundVariants: [
    // Numeric sizes
    { variant: 'numeric', size: 'sm', className: 'min-w-[16px] h-4 px-1' },
    { variant: 'numeric', size: 'md', className: 'min-w-[20px] h-5 px-1.5' },
    { variant: 'numeric', size: 'lg', className: 'min-w-[24px] h-6 px-2' },
    // Icon sizes
    { variant: 'icon', size: 'sm', className: 'w-4 h-4' },
    { variant: 'icon', size: 'md', className: 'w-5 h-5' },
    { variant: 'icon', size: 'lg', className: 'w-6 h-6' },
  ],
  defaultVariants: {
    variant: 'numeric',
    color: 'brand',
    size: 'md',
    bordered: false,
  },
});

const badgeTextVariants = cva('font-bold text-white leading-none', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
    color: {
      default: 'text-on-surface',
      brand: 'text-white',
      success: 'text-white',
      warning: 'text-black',
      error: 'text-white',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'brand',
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  /** Badge content (number or string) */
  content?: number | string;
  /** Icon to display (for icon variant) */
  icon?: React.ReactNode;
  /** Maximum count to display before showing "99+" */
  max?: number;
  /** Show as overlay positioned absolutely */
  overlay?: boolean;
  /** Additional NativeWind classes */
  className?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Badge({
  variant = 'numeric',
  color,
  size,
  bordered,
  content,
  icon,
  max = 99,
  overlay = false,
  className,
  accessibilityLabel,
}: BadgeProps) {
  // Format numeric content
  const displayContent =
    variant === 'numeric' && typeof content === 'number'
      ? content > max
        ? `${max}+`
        : content.toString()
      : content;

  // Determine if badge should be shown
  const shouldShow =
    variant === 'dot' ||
    variant === 'icon' ||
    (variant === 'numeric' && (content !== undefined && content !== 0));

  if (!shouldShow) {
    return null;
  }

  const containerClass = cn(
    badgeVariants({ variant, color, size, bordered }),
    overlay && 'absolute -top-0.5 -right-0.5 z-10',
    className,
  );

  return (
    <View
      className={containerClass}
      accessibilityLabel={
        accessibilityLabel ||
        (variant === 'numeric' ? `${content} notifications` : undefined)
      }
      accessibilityRole="status"
    >
      {variant === 'numeric' && displayContent && (
        <Text className={cn(badgeTextVariants({ size, color }))}>
          {displayContent}
        </Text>
      )}
      {variant === 'icon' && icon}
    </View>
  );
}

// ---------------------------------------------------------------------------
// BadgeWrapper — helper for overlay badges
// ---------------------------------------------------------------------------

export interface BadgeWrapperProps {
  /** Child element to wrap */
  children: React.ReactNode;
  /** Badge to overlay */
  badge: React.ReactNode;
  /** Additional NativeWind classes */
  className?: string;
}

export function BadgeWrapper({ children, badge, className }: BadgeWrapperProps) {
  return (
    <View className={cn('relative', className)}>
      {children}
      {badge}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { badgeVariants, badgeTextVariants };
