/**
 * ListItem Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST support leading icon/avatar slot
 * - MUST support title and subtitle text
 * - MUST support trailing icon/text/component slot
 * - MUST meet 44px minimum touch target for pressable items
 * - MUST support divider between items
 * - MUST use accessibilityRole="button" when pressable
 * - MUST support disabled state with reduced opacity
 * - MUST support size variants: sm, md, lg
 * - MUST support selected/active state with highlight background
 * - Subtitle MUST use text-on-surface-secondary
 * - MUST support multiline title/subtitle with numberOfLines
 */

import React from 'react';
import { View, Text, Pressable, type PressableProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const listItemVariants = cva('flex-row items-center gap-3 bg-surface', {
  variants: {
    size: {
      sm: 'min-h-[44px] px-3 py-2',
      md: 'min-h-[56px] px-4 py-3',
      lg: 'min-h-[72px] px-4 py-4',
    },
    pressable: {
      true: 'active:bg-surface-secondary',
      false: '',
    },
    selected: {
      true: 'bg-brand-500/10',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    pressable: false,
    selected: false,
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ListItemProps
  extends Omit<PressableProps, 'children'>,
    VariantProps<typeof listItemVariants> {
  /** Leading icon or avatar */
  leading?: React.ReactNode;
  /** Item title */
  title: string;
  /** Item subtitle */
  subtitle?: string;
  /** Trailing icon or text */
  trailing?: React.ReactNode;
  /** Show divider below item */
  divider?: boolean;
  /** Selected/active state */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Limit title lines */
  titleLines?: number;
  /** Limit subtitle lines */
  subtitleLines?: number;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ListItem({
  leading,
  title,
  subtitle,
  trailing,
  divider = false,
  selected = false,
  disabled = false,
  titleLines = 1,
  subtitleLines = 2,
  size,
  onPress,
  className,
  ...props
}: ListItemProps) {
  const isPressable = !!onPress;

  const content = (
    <>
      {/* Leading slot */}
      {leading && <View>{leading}</View>}

      {/* Content */}
      <View className="flex-1 gap-0.5">
        <Text
          className={cn(
            'font-body text-base font-medium text-on-surface',
            size === 'sm' && 'text-sm',
            size === 'lg' && 'text-lg',
          )}
          numberOfLines={titleLines}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            className={cn(
              'font-body text-sm text-on-surface-secondary',
              size === 'sm' && 'text-xs',
            )}
            numberOfLines={subtitleLines}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {/* Trailing slot */}
      {trailing && <View>{trailing}</View>}
    </>
  );

  const containerClass = cn(
    listItemVariants({ size, pressable: isPressable, selected }),
    disabled && 'opacity-40',
    className,
  );

  const itemContent = (
    <>
      <View className={containerClass}>{content}</View>
      {divider && <View className="h-px bg-border ml-3" />}
    </>
  );

  if (isPressable) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ disabled, selected }}
        {...props}
      >
        {itemContent}
      </Pressable>
    );
  }

  return <View>{itemContent}</View>;
}

// ---------------------------------------------------------------------------
// List Container
// ---------------------------------------------------------------------------

export interface ListProps {
  /** List items */
  children: React.ReactNode;
  /** Show dividers between all items */
  dividers?: boolean;
  /** Additional NativeWind classes */
  className?: string;
}

export function List({ children, dividers = false, className }: ListProps) {
  // Add divider prop to all ListItem children if dividers is true
  const childrenWithDividers = dividers
    ? React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === ListItem) {
          const isLast = index === React.Children.count(children) - 1;
          return React.cloneElement(child as React.ReactElement<ListItemProps>, {
            divider: !isLast,
          });
        }
        return child;
      })
    : children;

  return (
    <View className={cn('bg-surface', className)} accessibilityRole="list">
      {childrenWithDividers}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { listItemVariants };
