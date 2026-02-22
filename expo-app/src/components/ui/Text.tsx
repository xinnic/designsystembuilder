/**
 * Text Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST support preset types: heading, body, caption, label
 * - MUST support sizes: xs, sm, md, lg, xl, 2xl, 3xl
 * - MUST support weights: normal, medium, semibold, bold
 * - MUST support colors: on-surface (default), on-surface-secondary, brand, error
 * - heading preset MUST use font-display family
 * - body/caption/label MUST use font-body family
 * - MUST support align: left, center, right
 * - MUST support numberOfLines for truncation
 * - MUST use accessible color contrast ratios (WCAG AA)
 * - MUST expose underlying Text props (onPress, selectable, etc.)
 */

import React from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const textVariants = cva('', {
  variants: {
    preset: {
      heading: 'font-display font-bold',
      body: 'font-body',
      caption: 'font-body text-on-surface-secondary',
      label: 'font-body font-medium',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      'on-surface': 'text-on-surface',
      'on-surface-secondary': 'text-on-surface-secondary',
      brand: 'text-brand-500',
      error: 'text-red-500',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    preset: 'body',
    size: 'md',
    color: 'on-surface',
    align: 'left',
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TextProps
  extends Omit<RNTextProps, 'style'>,
    VariantProps<typeof textVariants> {
  /** Text content */
  children: React.ReactNode;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Text({
  preset,
  size,
  weight,
  color,
  align,
  children,
  className,
  ...props
}: TextProps) {
  return (
    <RNText
      className={cn(
        textVariants({ preset, size, weight, color, align }),
        className,
      )}
      {...props}
    >
      {children}
    </RNText>
  );
}

// ---------------------------------------------------------------------------
// Convenience exports for common patterns
// ---------------------------------------------------------------------------

export function Heading({
  size = '2xl',
  ...props
}: Omit<TextProps, 'preset'>) {
  return <Text preset="heading" size={size} {...props} />;
}

export function Body(props: Omit<TextProps, 'preset'>) {
  return <Text preset="body" {...props} />;
}

export function Caption({ size = 'sm', ...props }: Omit<TextProps, 'preset'>) {
  return <Text preset="caption" size={size} {...props} />;
}

export function Label({ size = 'sm', ...props }: Omit<TextProps, 'preset'>) {
  return <Text preset="label" size={size} {...props} />;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { textVariants };
