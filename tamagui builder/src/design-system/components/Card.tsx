import { styled, YStack, GetProps } from 'tamagui';

/**
 * Styled Card component with design system tokens
 *
 * Variants:
 * - default: Basic card with background and border
 * - elevated: Card with shadow for depth
 * - branded: Card with brand color accent
 * - flat: Card without shadow or border
 *
 * @example
 * <Card variant="elevated" padding="$4">
 *   <H3>Card Title</H3>
 *   <Body>Card content</Body>
 * </Card>
 */
export const Card = styled(YStack, {
  name: 'Card',
  backgroundColor: '$bgSecondary',
  // Radius, border weight and elevation all come from the active style preset
  // (scaled by the Corner Radius control) — never hard-coded here.
  borderRadius: '$card',
  borderWidth: 'var(--card-border-width, 1px)',
  borderColor: '$border',
  overflow: 'hidden',

  variants: {
    variant: {
      // The preset's own card treatment — border weight and shadow together, so
      // borderless presets (Soft & Dreamy) still read as a surface.
      default: {
        backgroundColor: '$bgSecondary',
        borderWidth: 'var(--card-border-width, 1px)',
        borderColor: '$border',
        boxShadow: 'var(--card-shadow, none)',
      },
      elevated: {
        backgroundColor: '$bgSecondary',
        borderWidth: 'var(--card-border-width, 0px)',
        borderColor: '$border',
        boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      },
      branded: {
        backgroundColor: '$bgSecondary',
        borderWidth: 'var(--border-medium, 2px)',
        borderColor: '$brand',
      },
      flat: {
        backgroundColor: '$bgSecondary',
        borderWidth: 0,
        boxShadow: 'none',
      },
      // A tint of the brand rather than $brandWeak. That token is the user's
      // accent colour and can be any lightness, so text on it had no
      // predictable contrast; a low-alpha brand wash is always light enough for
      // $textPrimary to sit on.
      gradient: {
        backgroundColor: 'rgb(var(--color-brand) / 0.10)',
        borderWidth: 'var(--card-border-width, 1px)',
        borderColor: 'rgb(var(--color-brand) / 0.35)',
      },
    },

    // Named `density`, not `padding`: `padding` is a real Tamagui style prop,
    // so a variant of that name never runs — "medium" is read as a padding
    // *value*, fails to resolve, and every card renders flush to its edges.
    density: {
      none: {
        padding: 0,
      },
      small: {
        padding: 'var(--space-3)',
      },
      medium: {
        padding: 'var(--space-4)',
      },
      large: {
        padding: 'var(--space-5)',
      },
    },

    interactive: {
      true: {
        cursor: 'pointer',
        hoverStyle: {
          scale: 1.02,
          borderColor: '$brand',
        },
        pressStyle: {
          scale: 0.98,
        },
        focusVisibleStyle: {
          outlineWidth: 2,
          outlineColor: '$focus',
          outlineStyle: 'solid',
          outlineOffset: 2,
        },
      },
    },

    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },

  defaultVariants: {
    variant: 'default',
    density: 'medium',
  },
});

/**
 * Card Header - Semantic component for card headers
 */
export const CardHeader = styled(YStack, {
  name: 'CardHeader',
  paddingBottom: '$2',
  borderBottomWidth: 1,
  borderBottomColor: '$border',
  marginBottom: '$3',
});

/**
 * Card Footer - Semantic component for card footers
 */
export const CardFooter = styled(YStack, {
  name: 'CardFooter',
  paddingTop: '$2',
  borderTopWidth: 1,
  borderTopColor: '$border',
  marginTop: '$3',
});

export type CardProps = GetProps<typeof Card>;
export type CardHeaderProps = GetProps<typeof CardHeader>;
export type CardFooterProps = GetProps<typeof CardFooter>;
