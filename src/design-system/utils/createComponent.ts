import { styled, GetProps } from 'tamagui';

/**
 * Default styles applied to all components created with the factory
 * These ensure consistency across the design system
 */
export const defaultStyles = {
  fontFamily: '$body',
  borderRadius: '$2',

  // Focus styles for accessibility
  focusStyle: {
    outlineWidth: 2,
    outlineColor: '$focus',
    outlineStyle: 'solid',
    outlineOffset: 2,
  },
};

/**
 * Standard variant definitions that work across most components
 * Individual components can override or extend these
 */
export const defaultVariants = {
  size: {
    small: {
      padding: '$2',
      fontSize: '$2',
    },
    medium: {
      padding: '$3',
      fontSize: '$3',
    },
    large: {
      padding: '$4',
      fontSize: '$4',
    },
  },

  disabled: {
    true: {
      opacity: 0.5,
      pointerEvents: 'none',
      cursor: 'not-allowed',
    },
  },
};

/**
 * Component style factory
 *
 * Creates styled Tamagui components with consistent defaults and patterns
 *
 * @param Component - The base Tamagui component to style
 * @param name - Component name for debugging
 * @param custom - Custom styles and variants to merge with defaults
 *
 * @example
 * ```tsx
 * import { Avatar as TamaguiAvatar } from 'tamagui'
 * import { createStyledComponent } from '../utils/createComponent'
 *
 * export const Avatar = createStyledComponent(TamaguiAvatar, 'Avatar', {
 *   styles: {
 *     borderWidth: 2,
 *     borderColor: '$border',
 *   },
 *   variants: {
 *     size: {
 *       small: { width: 32, height: 32 },
 *       medium: { width: 48, height: 48 },
 *       large: { width: 64, height: 64 },
 *     },
 *   },
 * })
 * ```
 */
export const createStyledComponent = <T extends any>(
  Component: T,
  name: string,
  custom: {
    styles?: Record<string, any>;
    variants?: Record<string, any>;
    defaultVariants?: Record<string, any>;
  } = {}
) => {
  return styled(Component, {
    name,
    ...defaultStyles,
    ...custom.styles,

    variants: {
      ...defaultVariants,
      ...custom.variants,
    },

    defaultVariants: {
      ...custom.defaultVariants,
    },
  });
};

/**
 * Type helper to extract props from a styled component
 */
export type StyledComponentProps<T> = GetProps<T>;
