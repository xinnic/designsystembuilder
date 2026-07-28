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
  fontSize: '$button',
  lineHeight: '$button',
  fontWeight: '600',
  cursor: 'pointer',
  borderWidth: 0,
  borderRadius: '$button',
  minHeight: 44, // Minimum tap target for accessibility
  userSelect: 'none', // Prevent text selection for better UX
  letterSpacing: '0.02em', // Improve button text readability

  // Accessibility
  focusable: true,

  // Default: Primary variant
  backgroundColor: '$brand',
  color: 'white',

  // Every hoverStyle below restates backgroundColor and color. Tamagui's Button
  // falls back to the theme's `backgroundHover` (white) for anything a variant
  // doesn't pin down, which turned hovered buttons into blank white pills.
  hoverStyle: {
    backgroundColor: '$brand',
    color: 'white',
    opacity: 0.9,
  },

  pressStyle: {
    backgroundColor: '$brand',
    color: 'white',
    opacity: 0.85,
    scale: 0.98,
  },

  focusVisibleStyle: {
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
        // No border on a filled button — the preset's button border weight is
        // meant for outline styles, and on a solid fill it reads as a grey halo.
        borderWidth: 0,
        boxShadow: 'var(--button-shadow, none)',
        hoverStyle: {
          backgroundColor: '$brand',
          color: 'white',
          opacity: 0.88,
        },
        pressStyle: {
          backgroundColor: '$brand',
          color: 'white',
          opacity: 0.8,
        },
      },
      // Tints use the brand at low alpha rather than $brandWeak — that token is
      // the accent colour, a different hue, so it read as a colour change.
      secondary: {
        backgroundColor: 'transparent',
        borderWidth: 'var(--button-border-width, 1px)',
        borderColor: '$brand',
        color: '$brand',
        boxShadow: 'var(--button-shadow, none)',
        hoverStyle: {
          backgroundColor: 'rgb(var(--color-brand) / 0.08)',
          borderColor: '$brand',
          color: '$brand',
        },
        pressStyle: {
          backgroundColor: 'rgb(var(--color-brand) / 0.16)',
          borderColor: '$brand',
          color: '$brand',
        },
      },
      tertiary: {
        backgroundColor: 'transparent',
        color: '$brand',
        hoverStyle: {
          backgroundColor: 'rgb(var(--color-brand) / 0.08)',
          color: '$brand',
        },
        pressStyle: {
          backgroundColor: 'rgb(var(--color-brand) / 0.16)',
          color: '$brand',
        },
      },
      destructive: {
        backgroundColor: '$danger',
        color: 'white',
        borderWidth: 0,
        hoverStyle: {
          backgroundColor: '$danger',
          color: 'white',
          opacity: 0.88,
        },
        pressStyle: {
          backgroundColor: '$danger',
          color: 'white',
          opacity: 0.8,
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$textPrimary',
        hoverStyle: {
          backgroundColor: 'rgb(var(--color-text-primary) / 0.06)',
          color: '$textPrimary',
        },
        pressStyle: {
          backgroundColor: 'rgb(var(--color-text-primary) / 0.12)',
          color: '$textPrimary',
        },
      },
    },

    // Sizes shift the padding ramp and step the label down for dense controls;
    // radius always comes from the preset so every button matches.
    size: {
      small: {
        fontSize: '$caption',
        paddingHorizontal: 'var(--space-3)',
        paddingVertical: 'var(--space-2)',
        borderRadius: '$button',
        minHeight: 34,
      },
      medium: {
        fontSize: '$button',
        paddingHorizontal: 'var(--space-4)',
        paddingVertical: 'var(--space-3)',
        borderRadius: '$button',
        minHeight: 44, // Standard touch target
      },
      large: {
        fontSize: '$button',
        paddingHorizontal: 'var(--space-6)',
        paddingVertical: 'var(--space-4)',
        borderRadius: '$button',
        minHeight: 52,
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
