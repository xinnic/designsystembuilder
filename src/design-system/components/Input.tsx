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
  fontSize: '$2',
  color: '$textPrimary',
  backgroundColor: '$bgSecondary',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$2',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
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
        borderWidth: 1,
        borderColor: '$border',
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
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
        fontSize: '$1',
        paddingHorizontal: '$2',
        paddingVertical: '$1',
      },
      medium: {
        fontSize: '$2',
        paddingHorizontal: '$3',
        paddingVertical: '$2',
      },
      large: {
        fontSize: '$3',
        paddingHorizontal: '$4',
        paddingVertical: '$3',
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
        opacity: 0.5,
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
  fontSize: '$2',
  color: '$textPrimary',
  backgroundColor: '$bgSecondary',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$2',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
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
        borderWidth: 1,
        borderColor: '$border',
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
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
        opacity: 0.5,
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
