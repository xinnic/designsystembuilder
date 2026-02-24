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
  borderRadius: '$2',
  borderWidth: 1,
  borderColor: '$border',
  overflow: 'hidden',

  variants: {
    variant: {
      default: {
        backgroundColor: '$bgSecondary',
        borderWidth: 1,
        borderColor: '$border',
      },
      elevated: {
        backgroundColor: '$bgSecondary',
        borderWidth: 'var(--card-border-width, 0px)',
        borderColor: '$border',
        shadowColor: '$shadowColor',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        // Web override for semantic shadows
        boxShadow: 'var(--card-shadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      },
      branded: {
        backgroundColor: '$bgSecondary',
        borderWidth: 2,
        borderColor: '$brand',
      },
      flat: {
        backgroundColor: '$bgSecondary',
        borderWidth: 0,
      },
      gradient: {
        backgroundColor: '$brandWeak',
        borderWidth: 1,
        borderColor: '$brand',
      },
    },

    padding: {
      none: {
        padding: 0,
      },
      small: {
        padding: '$2',
      },
      medium: {
        padding: '$3',
      },
      large: {
        padding: '$4',
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
        focusStyle: {
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
    padding: 'medium',
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
