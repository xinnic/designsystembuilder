import { styled, Input as TamaguiInput, TextArea as TamaguiTextArea, GetProps } from 'tamagui';

/**
 * Styled Input component with design system tokens
 *
 * Variants:
 * - filled: Filled background with border
 * - outlined: Transparent background with border
 * - underline: Transparent background with bottom border only
 *
 * States:
 * - default: Normal state
 * - focus: Focused state with brand color
 * - error: Error state with danger color
 * - disabled: Disabled state with reduced opacity
 *
 * @example
 * <Input variant="filled" placeholder="Enter your email" />
 * <Input variant="outlined" error />
 * <Input variant="underline" disabled />
 */
export const Input = styled(TamaguiInput, {
  name: 'Input',
  fontFamily: '$body',
  // Named type tokens only. Numeric ones ($1…$6) are ambiguous here — Tamagui
  // resolves them against the `size` scale for inputs, which silently rendered
  // the field at 8px.
  fontSize: '$body',
  lineHeight: '$body',
  color: '$textPrimary',
  backgroundColor: '$bgSecondary',
  borderWidth: 'var(--input-border-width, 1px)',
  borderColor: '$border',
  borderRadius: '$input',
  paddingHorizontal: 'var(--space-4)',
  paddingVertical: 'var(--space-3)',
  minHeight: 44, // Minimum tap target for accessibility
  outlineWidth: 0,

  placeholderTextColor: '$textDisabled',

  focusStyle: {
    borderColor: '$brand',
    outlineWidth: 2,
    outlineColor: '$focus',
    outlineStyle: 'solid',
    outlineOffset: 0,
  },

  hoverStyle: {
    borderColor: '$brand',
  },

  variants: {
    variant: {
      filled: {
        backgroundColor: '$bgSecondary',
        borderWidth: 'var(--input-border-width, 1px)',
        borderColor: '$border',
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 'var(--input-border-width, 1px)',
        borderColor: '$border',
      },
      underline: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '$border',
        borderRadius: 0,
        paddingHorizontal: 0,
      },
    },

    size: {
      small: {
        fontSize: '$caption',
        lineHeight: '$caption',
        paddingHorizontal: 'var(--space-3)',
        paddingVertical: 'var(--space-2)',
        minHeight: 36,
      },
      medium: {
        fontSize: '$body',
        lineHeight: '$body',
        paddingHorizontal: '$4',
        paddingVertical: '$3',
      },
      large: {
        fontSize: '$subhead',
        lineHeight: '$subhead',
        paddingHorizontal: 'var(--space-5)',
        paddingVertical: 'var(--space-4)',
        minHeight: 52,
      },
    },

    error: {
      true: {
        borderColor: '$danger',
        focusStyle: {
          borderColor: '$danger',
          outlineColor: '$danger',
        },
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
    variant: 'filled',
    size: 'medium',
  },
});

/**
 * Styled TextArea component with design system tokens
 *
 * @example
 * <TextArea placeholder="Enter your message" rows={4} />
 */
export const TextArea = styled(TamaguiTextArea, {
  name: 'TextArea',
  fontFamily: '$body',
  fontSize: '$body',
  lineHeight: '$body',
  color: '$textPrimary',
  backgroundColor: '$bgSecondary',
  borderWidth: 'var(--input-border-width, 1px)',
  borderColor: '$border',
  borderRadius: '$input',
  paddingHorizontal: 'var(--space-4)',
  paddingVertical: 'var(--space-3)',
  outlineWidth: 0,
  minHeight: 100,

  placeholderTextColor: '$textDisabled',

  focusStyle: {
    borderColor: '$brand',
    outlineWidth: 2,
    outlineColor: '$focus',
    outlineStyle: 'solid',
    outlineOffset: 0,
  },

  hoverStyle: {
    borderColor: '$brand',
  },

  variants: {
    variant: {
      filled: {
        backgroundColor: '$bgSecondary',
        borderWidth: 'var(--input-border-width, 1px)',
        borderColor: '$border',
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 'var(--input-border-width, 1px)',
        borderColor: '$border',
      },
    },

    error: {
      true: {
        borderColor: '$danger',
        focusStyle: {
          borderColor: '$danger',
          outlineColor: '$danger',
        },
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
    variant: 'filled',
  },
});

export type InputProps = GetProps<typeof Input>;
export type TextAreaProps = GetProps<typeof TextArea>;
