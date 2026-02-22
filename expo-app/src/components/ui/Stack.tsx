/**
 * Stack Components — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - HStack MUST use flex-row for horizontal layout
 * - VStack MUST use flex-col for vertical layout
 * - MUST support gap variants: none, xs, sm, md, lg, xl
 * - MUST support align: start, center, end, stretch
 * - MUST support justify: start, center, end, between, around
 * - Spacer MUST use flex-1 to fill available space
 * - MUST support wrap for multi-line layouts
 * - MUST support reverse for reversed direction
 * - Divider MUST render visual separator between items
 * - MUST expose View props (onLayout, testID, etc.)
 */

import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const stackVariants = cva('', {
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
      xl: 'gap-6',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    },
    wrap: {
      true: 'flex-wrap',
      false: '',
    },
  },
  defaultVariants: {
    gap: 'md',
    align: 'stretch',
    justify: 'start',
    wrap: false,
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StackProps
  extends Omit<ViewProps, 'style'>,
    VariantProps<typeof stackVariants> {
  /** Stack content */
  children?: React.ReactNode;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

export function HStack({
  gap,
  align,
  justify,
  wrap,
  children,
  className,
  ...props
}: Omit<StackProps, 'direction'>) {
  return (
    <View
      className={cn(
        stackVariants({ direction: 'row', gap, align, justify, wrap }),
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export function VStack({
  gap,
  align,
  justify,
  wrap,
  children,
  className,
  ...props
}: Omit<StackProps, 'direction'>) {
  return (
    <View
      className={cn(
        stackVariants({ direction: 'column', gap, align, justify, wrap }),
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export function Stack({
  direction = 'column',
  gap,
  align,
  justify,
  wrap,
  children,
  className,
  ...props
}: StackProps) {
  return (
    <View
      className={cn(
        stackVariants({ direction, gap, align, justify, wrap }),
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Spacer — fills available space
// ---------------------------------------------------------------------------

export function Spacer({ className }: { className?: string }) {
  return <View className={cn('flex-1', className)} />;
}

// ---------------------------------------------------------------------------
// Divider — visual separator
// ---------------------------------------------------------------------------

const dividerVariants = cva('bg-border', {
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'w-px h-full',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export interface DividerProps extends VariantProps<typeof dividerVariants> {
  className?: string;
}

export function Divider({ orientation, className }: DividerProps) {
  return <View className={cn(dividerVariants({ orientation }), className)} />;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { stackVariants, dividerVariants };
