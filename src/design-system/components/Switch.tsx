import { styled, Switch as TamaguiSwitch, GetProps } from 'tamagui';

/**
 * Styled Switch component with design system tokens
 *
 * @example
 * <Switch checked={value} onCheckedChange={setValue} />
 * <Switch size="small" disabled />
 */
export const Switch = styled(TamaguiSwitch, {
  name: 'Switch',
  backgroundColor: '$border',
  borderRadius: '$4',

  // Thumb (the moving circle)
  '$thumb': {
    backgroundColor: 'white',
  },

  // When checked
  checkedStyle: {
    backgroundColor: '$brand',
  },

  focusStyle: {
    outlineWidth: 2,
    outlineColor: '$focus',
    outlineStyle: 'solid',
    outlineOffset: 2,
  },

  hoverStyle: {
    opacity: 0.9,
  },

  variants: {
    size: {
      small: {
        width: 36,
        height: 20,
        '$thumb': {
          width: 16,
          height: 16,
        },
      },
      medium: {
        width: 44,
        height: 24,
        '$thumb': {
          width: 20,
          height: 20,
        },
      },
      large: {
        width: 52,
        height: 28,
        '$thumb': {
          width: 24,
          height: 24,
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
  },

  defaultVariants: {
    size: 'medium',
  },
});

export type SwitchProps = GetProps<typeof Switch>;
