/**
 * StatsCard Component — Composed (NativeWind + CVA)
 *
 * STRUCTURAL SPECS:
 * - MUST render as metric display card with icon, value, label
 * - MUST support variant: default, compact, horizontal
 * - MUST support icon/emoji leading slot
 * - MUST support value (number or string)
 * - MUST support label text
 * - MUST support optional trend indicator (+/- percentage)
 * - MUST support color variants for trend: success (green), error (red)
 * - MUST use Card component as base
 * - Value MUST be prominent (larger font)
 * - MUST support pressable for drill-down
 *
 * COMPOSITION:
 * - Uses Card component
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Card } from '../ui/Card';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const statsCardVariants = cva('gap-2', {
  variants: {
    variant: {
      default: '',
      compact: '',
      horizontal: 'flex-row items-center justify-between',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StatsCardProps extends VariantProps<typeof statsCardVariants> {
  /** Icon or emoji */
  icon?: React.ReactNode;
  /** Stat value */
  value: number | string;
  /** Stat label */
  label: string;
  /** Trend percentage (e.g., "+12.5" or "-3.2") */
  trend?: string;
  /** Trend direction */
  trendDirection?: 'up' | 'down';
  /** Called when card is pressed */
  onPress?: () => void;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function StatsCard({
  variant,
  icon,
  value,
  label,
  trend,
  trendDirection,
  onPress,
  className,
}: StatsCardProps) {
  const isHorizontal = variant === 'horizontal';
  const isCompact = variant === 'compact';

  const content = (
    <View className={cn(statsCardVariants({ variant }))}>
      {/* Icon + Content */}
      <View className={cn('gap-2', isHorizontal && 'flex-1')}>
        {/* Icon */}
        {icon && !isHorizontal && (
          <View className="w-10 h-10 items-center justify-center rounded-full bg-brand-500/10">
            {icon}
          </View>
        )}

        {/* Value + Label */}
        <View className={cn(isHorizontal && 'flex-row items-baseline gap-2')}>
          <Text
            className={cn(
              'font-bold text-on-surface',
              isCompact ? 'text-2xl' : 'text-3xl',
            )}
          >
            {value}
          </Text>
          <Text
            className={cn(
              'text-on-surface-secondary',
              isCompact ? 'text-xs' : 'text-sm',
            )}
          >
            {label}
          </Text>
        </View>

        {/* Trend */}
        {trend && (
          <View className="flex-row items-center gap-1">
            <Text
              className={cn(
                'text-xs font-semibold',
                trendDirection === 'up' && 'text-green-500',
                trendDirection === 'down' && 'text-red-500',
                !trendDirection && 'text-on-surface-secondary',
              )}
            >
              {trendDirection === 'up' && '↑ '}
              {trendDirection === 'down' && '↓ '}
              {trend}
            </Text>
            <Text className="text-xs text-on-surface-secondary">
              vs last period
            </Text>
          </View>
        )}
      </View>

      {/* Icon (horizontal only) */}
      {icon && isHorizontal && (
        <View className="w-12 h-12 items-center justify-center rounded-full bg-brand-500/10">
          {icon}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button">
        <Card variant="outlined" className={className}>
          {content}
        </Card>
      </Pressable>
    );
  }

  return (
    <Card variant="outlined" className={className}>
      {content}
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { statsCardVariants };
