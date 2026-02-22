/**
 * Tabs Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST support three visual styles: underline, pill, segmented
 * - MUST accept items as an array of { label, value, icon? }
 * - MUST expose value + onValueChange controlled API
 * - Active tab MUST have clear visual differentiation (color, indicator, background)
 * - Underline variant: 2px bottom border slides to active tab
 * - Pill variant: active tab gets filled background with rounded corners
 * - Segmented variant: contained box with sliding active background
 * - Each tab MUST meet 44px min touch target
 * - MUST use accessibilityRole="tablist" on container
 * - Each tab MUST use accessibilityRole="tab" with selected state
 * - MUST support horizontal scrolling when tabs overflow
 * - Icon renders before label text in each tab
 */

import React, { useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  /** Tab items */
  items: TabItem[];
  /** Currently active tab value */
  value: string;
  /** Called when active tab changes */
  onValueChange: (value: string) => void;
  /** Visual style */
  variant?: 'underline' | 'pill' | 'segmented';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch tabs to fill width */
  fullWidth?: boolean;
  /** Allow horizontal scroll when tabs overflow */
  scrollable?: boolean;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Container variants
// ---------------------------------------------------------------------------

const tabsContainerVariants = cva('flex-row', {
  variants: {
    variant: {
      underline: 'border-b border-border',
      pill: 'gap-1',
      segmented: 'bg-surface-secondary rounded-lg p-1 gap-0.5',
    },
  },
  defaultVariants: {
    variant: 'underline',
  },
});

// ---------------------------------------------------------------------------
// Tab item variants (inactive state)
// ---------------------------------------------------------------------------

const tabItemVariants = cva(
  'flex-row items-center justify-center gap-1.5',
  {
    variants: {
      variant: {
        underline: '',
        pill: 'rounded-md',
        segmented: 'rounded-md',
      },
      size: {
        sm: 'min-h-[36px] px-3',
        md: 'min-h-[44px] px-4',
        lg: 'min-h-[48px] px-5',
      },
      active: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Underline active → bottom border
      { variant: 'underline', active: true, className: 'border-b-2 border-brand-500' },
      // Pill active → filled bg
      { variant: 'pill', active: true, className: 'bg-brand-500' },
      // Pill inactive → transparent, pressable
      { variant: 'pill', active: false, className: 'active:bg-surface-secondary' },
      // Segmented active → white/surface bg with shadow
      { variant: 'segmented', active: true, className: 'bg-surface shadow-sm' },
      // Segmented inactive
      { variant: 'segmented', active: false, className: 'active:bg-surface-tertiary' },
    ],
    defaultVariants: {
      variant: 'underline',
      size: 'md',
      active: false,
    },
  },
);

// ---------------------------------------------------------------------------
// Tab text variants
// ---------------------------------------------------------------------------

const tabTextVariants = cva('font-medium', {
  variants: {
    variant: {
      underline: '',
      pill: '',
      segmented: '',
    },
    size: {
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
    },
    active: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    // Underline text colors
    { variant: 'underline', active: true, className: 'text-brand-500' },
    { variant: 'underline', active: false, className: 'text-on-surface-secondary' },
    // Pill text colors
    { variant: 'pill', active: true, className: 'text-white' },
    { variant: 'pill', active: false, className: 'text-on-surface-secondary' },
    // Segmented text colors
    { variant: 'segmented', active: true, className: 'text-on-surface' },
    { variant: 'segmented', active: false, className: 'text-on-surface-secondary' },
  ],
  defaultVariants: {
    variant: 'underline',
    size: 'md',
    active: false,
  },
});

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Tabs({
  items,
  value,
  onValueChange,
  variant = 'underline',
  size = 'md',
  fullWidth = false,
  scrollable = false,
  className,
}: TabsProps) {
  const handlePress = useCallback(
    (tabValue: string) => {
      if (tabValue !== value) {
        onValueChange(tabValue);
      }
    },
    [value, onValueChange],
  );

  const content = (
    <View
      className={cn(
        tabsContainerVariants({ variant }),
        fullWidth && 'w-full',
        className,
      )}
      accessibilityRole="tablist"
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <Pressable
            key={item.value}
            className={cn(
              tabItemVariants({ variant, size, active }),
              fullWidth && 'flex-1',
            )}
            onPress={() => handlePress(item.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={item.label}
          >
            {item.icon}
            <Text className={cn(tabTextVariants({ variant, size, active }))}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {content}
      </ScrollView>
    );
  }

  return content;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { tabsContainerVariants, tabItemVariants, tabTextVariants };
