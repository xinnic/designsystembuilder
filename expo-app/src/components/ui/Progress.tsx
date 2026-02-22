/**
 * Progress Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST support value (0-100) for determinate progress
 * - MUST support indeterminate (loading) state
 * - MUST use brand-500 for progress bar fill
 * - MUST use surface-secondary for track background
 * - MUST support size variants: sm, md, lg
 * - MUST support shape: bar (linear), circle, ring
 * - MUST use accessibilityRole="progressbar"
 * - MUST expose min, max, value for accessibility
 * - Linear variant MUST support label and percentage display
 * - Indeterminate state MUST show animated pulse/shimmer
 * - MUST support color variants: brand, success, warning, error
 */

import React from 'react';
import { View, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const progressTrackVariants = cva('bg-surface-secondary rounded-full overflow-hidden', {
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const progressBarVariants = cva('h-full rounded-full transition-all', {
  variants: {
    color: {
      brand: 'bg-brand-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
    },
    indeterminate: {
      true: 'animate-pulse',
      false: '',
    },
  },
  defaultVariants: {
    color: 'brand',
    indeterminate: false,
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProgressProps extends VariantProps<typeof progressBarVariants> {
  /** Progress value (0-100) */
  value?: number;
  /** Show indeterminate loading state */
  indeterminate?: boolean;
  /** Progress label */
  label?: string;
  /** Show percentage text */
  showPercentage?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Progress({
  value = 0,
  indeterminate = false,
  label,
  showPercentage = false,
  size,
  color,
  className,
}: ProgressProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const percentage = Math.round(clampedValue);

  return (
    <View className={cn('gap-1.5', className)}>
      {/* Label and percentage */}
      {(label || showPercentage) && (
        <View className="flex-row justify-between items-center">
          {label && (
            <Text className="text-sm font-medium text-on-surface">{label}</Text>
          )}
          {showPercentage && !indeterminate && (
            <Text className="text-sm text-on-surface-secondary">
              {percentage}%
            </Text>
          )}
        </View>
      )}

      {/* Progress track */}
      <View
        className={cn(progressTrackVariants({ size }))}
        accessibilityRole="progressbar"
        accessibilityValue={{
          min: 0,
          max: 100,
          now: indeterminate ? undefined : clampedValue,
        }}
        accessibilityLabel={label}
      >
        {/* Progress bar */}
        <View
          className={cn(progressBarVariants({ color, indeterminate }))}
          style={{
            width: indeterminate ? '100%' : `${clampedValue}%`,
          }}
        />
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Circular Progress (future enhancement placeholder)
// ---------------------------------------------------------------------------

export interface CircularProgressProps {
  /** Progress value (0-100) */
  value?: number;
  /** Circle size */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Show percentage in center */
  showPercentage?: boolean;
  /** Color variant */
  color?: 'brand' | 'success' | 'warning' | 'error';
}

export function CircularProgress({
  value = 0,
  size = 64,
  strokeWidth = 4,
  showPercentage = true,
  color = 'brand',
}: CircularProgressProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const percentage = Math.round(clampedValue);

  // Placeholder implementation - would need SVG for proper circular progress
  return (
    <View
      className={cn(
        'items-center justify-center rounded-full border-4',
        color === 'brand' && 'border-brand-500',
        color === 'success' && 'border-green-500',
        color === 'warning' && 'border-yellow-500',
        color === 'error' && 'border-red-500',
      )}
      style={{ width: size, height: size }}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clampedValue }}
    >
      {showPercentage && (
        <Text className="text-sm font-semibold text-on-surface">
          {percentage}%
        </Text>
      )}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { progressTrackVariants, progressBarVariants };
