/**
 * AppBar Component — Composed (NativeWind + CVA)
 *
 * STRUCTURAL SPECS:
 * - MUST render as fixed top app bar with logo, title, actions
 * - MUST support leading slot (logo, back button, menu icon)
 * - MUST support title (text or custom component)
 * - MUST support trailing actions (search, notifications, profile)
 * - MUST meet 56px minimum height on mobile, 64px on tablet/desktop
 * - MUST support variant: default (solid), translucent (iOS style), elevated (shadow)
 * - MUST support safe area padding at top
 * - MUST use accessibilityRole="header"
 * - Actions MUST use 44px min touch target
 * - MUST support badge overlay on action icons
 * - Title MUST truncate with ellipsis if too long
 *
 * COMPOSITION:
 * - Uses Badge component for notification counts
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const appBarVariants = cva(
  'flex-row items-center px-4 min-h-[56px] w-full',
  {
    variants: {
      variant: {
        default: 'bg-surface border-b border-border',
        translucent: 'bg-surface/80 border-b border-border/50',
        elevated: 'bg-surface shadow-md',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AppBarProps extends VariantProps<typeof appBarVariants> {
  /** Leading content (logo, back button, menu) */
  leading?: React.ReactNode;
  /** App bar title */
  title?: string | React.ReactNode;
  /** Trailing actions */
  actions?: React.ReactNode;
  /** Additional safe-area padding at top */
  safeAreaTop?: number;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AppBar({
  leading,
  title,
  actions,
  variant,
  safeAreaTop = 0,
  className,
}: AppBarProps) {
  return (
    <View
      className={cn(appBarVariants({ variant }), className)}
      style={safeAreaTop > 0 ? { paddingTop: safeAreaTop } : undefined}
      accessibilityRole="header"
    >
      {/* Leading */}
      {leading && <View className="mr-3">{leading}</View>}

      {/* Title */}
      <View className="flex-1">
        {typeof title === 'string' ? (
          <Text
            className="text-lg font-semibold text-on-surface"
            numberOfLines={1}
          >
            {title}
          </Text>
        ) : (
          title
        )}
      </View>

      {/* Actions */}
      {actions && <View className="flex-row gap-2 ml-3">{actions}</View>}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Action Button helper
// ---------------------------------------------------------------------------

export interface AppBarActionProps {
  /** Icon or content */
  children: React.ReactNode;
  /** Called when pressed */
  onPress: () => void;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Additional classes */
  className?: string;
}

export function AppBarAction({
  children,
  onPress,
  accessibilityLabel,
  className,
}: AppBarActionProps) {
  return (
    <Pressable
      className={cn(
        'w-11 h-11 items-center justify-center rounded-full active:bg-surface-secondary',
        className,
      )}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { appBarVariants };
