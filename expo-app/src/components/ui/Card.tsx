/**
 * Card Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST provide header, children, footer slots
 * - MUST support elevated (shadow) and outlined (border) variants
 * - MUST use bg-surface as base background
 * - MUST support padding variants: none, sm, md, lg
 * - Header MUST use text-on-surface font-semibold
 * - Footer MUST appear below content with optional top border
 * - MUST use accessibilityRole="group" for semantic grouping
 * - Pressable variant MUST add active:scale-[0.99] press feedback
 * - MUST meet 8px minimum border radius for elevated variant
 */

import React from 'react';
import { View, Text, Pressable, type ViewProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const cardVariants = cva('bg-surface rounded-lg', {
  variants: {
    variant: {
      elevated: 'shadow-md',
      outlined: 'border border-border',
      ghost: '',
    },
    padding: {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
    pressable: {
      true: 'active:scale-[0.99] transition-transform',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'elevated',
    padding: 'md',
    pressable: false,
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CardProps extends VariantProps<typeof cardVariants> {
  /** Card header content */
  header?: React.ReactNode;
  /** Card main content */
  children?: React.ReactNode;
  /** Card footer content */
  footer?: React.ReactNode;
  /** Make card pressable */
  onPress?: () => void;
  /** Additional NativeWind classes */
  className?: string;
  /** Show border between sections */
  dividers?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Card({
  variant,
  padding,
  header,
  children,
  footer,
  onPress,
  className,
  dividers = false,
}: CardProps) {
  const content = (
    <>
      {header && (
        <View
          className={cn(
            'gap-1',
            padding !== 'none' && 'pb-3',
            dividers && 'border-b border-border',
          )}
        >
          {typeof header === 'string' ? (
            <Text className="text-lg font-semibold text-on-surface">
              {header}
            </Text>
          ) : (
            header
          )}
        </View>
      )}

      {children && (
        <View className={cn(header && padding !== 'none' && 'pt-3')}>
          {children}
        </View>
      )}

      {footer && (
        <View
          className={cn(
            'gap-2',
            padding !== 'none' && 'pt-3',
            dividers && 'border-t border-border',
          )}
        >
          {footer}
        </View>
      )}
    </>
  );

  const containerClass = cn(
    cardVariants({ variant, padding, pressable: !!onPress }),
    className,
  );

  if (onPress) {
    return (
      <Pressable
        className={containerClass}
        onPress={onPress}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View className={containerClass} accessibilityRole="group">
      {content}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { cardVariants };
