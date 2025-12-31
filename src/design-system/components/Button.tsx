import { styled, Button as TamaguiButton, GetProps } from 'tamagui';

/**
 * Styled Button component with design system tokens
 *
 * Variants:
 * - primary: Brand color background, white text
 * - secondary: Transparent background, brand border and text
 * - tertiary: Transparent background, brand text, no border
 * - destructive: Danger color background, white text
 *
 * Sizes:
 * - small: Compact size for tight spaces
 * - medium: Default size for most use cases
 * - large: Prominent size for primary actions
 *
 * @example
 * <Button variant="primary" size="medium">Click me</Button>
 * <Button variant="secondary" size="small">Cancel</Button>
 * <Button variant="destructive" disabled>Delete</Button>
 */
export const Button = styled(TamaguiButton, {
  name: 'Button',
  fontFamily: '$body',
  fontWeight: '600',
  cursor: 'pointer',
  borderWidth: 0,
  minHeight: 44, // Minimum tap target for accessibility
  userSelect: 'none', // Prevent text selection for better UX
  letterSpacing: 0.02, // Improve button text readability

  // Accessibility
  focusable: true,

  // Default: Primary variant
  backgroundColor: '$brand',
  color: 'white',

  hoverStyle: {
    opacity: 0.9,
    scale: 1.02,
  },

  pressStyle: {
    opacity: 0.85,
    scale: 0.98,
  },

  focusStyle: {
    outlineWidth: 2,
    outlineColor: '$focus',
    outlineStyle: 'solid',
    outlineOffset: 2,
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$brand',
        color: 'white',
        borderWidth: 'var(--button-border-width, 0px)',
        borderColor: 'var(--border-color)',
        boxShadow: 'var(--button-shadow, none)',
        hoverStyle: {
          opacity: 0.9,
        },
      },
      secondary: {
        backgroundColor: 'transparent',
        borderWidth: 'var(--button-border-width, 1px)',
        borderColor: '$brand',
        color: '$brand',
        boxShadow: 'var(--button-shadow, none)',
        hoverStyle: {
          backgroundColor: '$brandWeak',
        },
      },
      tertiary: {
        backgroundColor: 'transparent',
        color: '$brand',
        hoverStyle: {
          backgroundColor: '$brandWeak',
        },
      },
      destructive: {
        backgroundColor: '$danger',
        color: 'white',
        hoverStyle: {
          opacity: 0.9,
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$textPrimary',
        hoverStyle: {
          backgroundColor: '$bgSecondary',
        },
      },
    },

    size: {
      small: {
        fontSize: '$1',
        paddingHorizontal: '$3',
        paddingVertical: '$2',
        borderRadius: '$1',
      },
      medium: {
        fontSize: '$2',
        paddingHorizontal: '$4',
        paddingVertical: '$3',
        borderRadius: '$2',
      },
      large: {
        fontSize: '$3',
        paddingHorizontal: '$5',
        paddingVertical: '$4',
        borderRadius: '$2',
      },
    },

    disabled: {
      true: {
        opacity: 0.38, // Standard disabled opacity for better accessibility
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },

    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

export type ButtonProps = GetProps<typeof Button>;
