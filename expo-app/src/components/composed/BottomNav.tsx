/**
 * BottomNav Component — Composed (NativeWind + CVA)
 *
 * STRUCTURAL SPECS:
 * - MUST render as fixed bottom tab bar with icon + label per tab
 * - MUST support 3–5 nav items (throws warning outside this range)
 * - MUST use platform-specific styles:
 *   • iOS: translucent blur background, no top shadow, thin border-top
 *   • Android: solid background, subtle elevation/shadow
 *   • Web: solid background, border-top
 * - Active tab MUST show brand-500 color on icon + label
 * - Inactive tab MUST show on-surface-secondary
 * - Active tab icon MUST scale up briefly (active:scale-110)
 * - MUST support badge overlay on any nav item (dot or numeric)
 * - MUST meet 56px minimum height + safe area padding at bottom
 * - MUST use accessibilityRole="tablist" on container
 * - Each item MUST use accessibilityRole="tab" with selected state
 * - MUST support variant: filled (solid bg), translucent (blur)
 * - Label text MUST be 10-11px, icon MUST be 22-26px
 * - MUST support controlled value + onValueChange API
 * - MUST support hiding labels (icon-only mode)
 *
 * COMPOSITION:
 * - Uses Badge component for notification indicators
 * - Pattern-setter for all composed components in Phase 1D
 */

import React, { useCallback } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/Badge';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const bottomNavContainerVariants = cva(
  'flex-row w-full',
  {
    variants: {
      variant: {
        filled: 'bg-surface border-t border-border',
        translucent: 'bg-surface/80 border-t border-border/50',
        elevated: 'bg-surface shadow-lg',
      },
    },
    defaultVariants: {
      variant: Platform.OS === 'ios' ? 'translucent' : 'filled',
    },
  },
);

const bottomNavItemVariants = cva(
  'flex-1 items-center justify-center gap-0.5 py-2',
  {
    variants: {
      active: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

const bottomNavIconVariants = cva(
  'items-center justify-center w-7 h-7 transition-transform',
  {
    variants: {
      active: {
        true: 'scale-110',
        false: '',
      },
    },
  },
);

const bottomNavLabelVariants = cva('text-[11px] font-medium', {
  variants: {
    active: {
      true: 'text-brand-500',
      false: 'text-on-surface-secondary',
    },
  },
  defaultVariants: {
    active: false,
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BottomNavItem {
  /** Tab route or identifier */
  value: string;
  /** Display label */
  label: string;
  /** Icon element — render active/inactive variants based on the `active` boolean passed to your icon component or just pass a single icon */
  icon: React.ReactNode | ((active: boolean) => React.ReactNode);
  /** Badge count (0 or undefined = no badge) */
  badge?: number;
  /** Show dot badge instead of count */
  badgeDot?: boolean;
}

export interface BottomNavProps extends VariantProps<typeof bottomNavContainerVariants> {
  /** Nav items (3-5 recommended) */
  items: BottomNavItem[];
  /** Currently active tab value */
  value: string;
  /** Called when active tab changes */
  onValueChange: (value: string) => void;
  /** Hide labels (icon-only mode) */
  hideLabels?: boolean;
  /** Additional bottom safe-area padding (in addition to internal padding) */
  safeAreaBottom?: number;
  /** Additional NativeWind classes on container */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BottomNav({
  items,
  value,
  onValueChange,
  variant,
  hideLabels = false,
  safeAreaBottom = 0,
  className,
}: BottomNavProps) {
  const handlePress = useCallback(
    (itemValue: string) => {
      if (itemValue !== value) {
        onValueChange(itemValue);
      }
    },
    [value, onValueChange],
  );

  return (
    <View
      className={cn(bottomNavContainerVariants({ variant }), className)}
      style={safeAreaBottom > 0 ? { paddingBottom: safeAreaBottom } : undefined}
      accessibilityRole="tablist"
    >
      {items.map((item) => {
        const active = item.value === value;
        const iconContent =
          typeof item.icon === 'function' ? item.icon(active) : item.icon;

        return (
          <Pressable
            key={item.value}
            className={cn(bottomNavItemVariants({ active }))}
            onPress={() => handlePress(item.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={item.label}
          >
            {/* Icon with optional badge */}
            <View className="relative">
              <View className={cn(bottomNavIconVariants({ active }))}>
                {iconContent}
              </View>

              {/* Badge overlay */}
              {item.badgeDot && (
                <Badge
                  variant="dot"
                  color="error"
                  overlay
                  bordered
                  className="top-0 right-0"
                />
              )}
              {!item.badgeDot && item.badge !== undefined && item.badge > 0 && (
                <Badge
                  variant="numeric"
                  content={item.badge}
                  color="error"
                  size="sm"
                  overlay
                  bordered
                  className="-top-1 -right-2"
                />
              )}
            </View>

            {/* Label */}
            {!hideLabels && (
              <Text className={cn(bottomNavLabelVariants({ active }))}>
                {item.label}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export {
  bottomNavContainerVariants,
  bottomNavItemVariants,
  bottomNavIconVariants,
  bottomNavLabelVariants,
};
