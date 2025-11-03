import { ToggleGroup as TamaguiToggleGroup, GetProps } from 'tamagui';
import { createStyledComponent } from '../utils/createComponent';

/**
 * Styled ToggleGroup component with design system tokens
 *
 * Multi-state button group for switching between options
 *
 * @example
 * <ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
 *   <ToggleGroupItem value="left">Left</ToggleGroupItem>
 *   <ToggleGroupItem value="center">Center</ToggleGroupItem>
 *   <ToggleGroupItem value="right">Right</ToggleGroupItem>
 * </ToggleGroup>
 */
export const ToggleGroup = createStyledComponent(TamaguiToggleGroup, 'ToggleGroup', {
  styles: {
    backgroundColor: '$bgSecondary',
    borderRadius: '$2',
    padding: '$1',
    gap: '$1',
  },
  variants: {
    orientation: {
      horizontal: {
        flexDirection: 'row',
      },
      vertical: {
        flexDirection: 'column',
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export const ToggleGroupItem = createStyledComponent(TamaguiToggleGroup.Item, 'ToggleGroupItem', {
  styles: {
    backgroundColor: 'transparent',
    borderRadius: '$1',
    paddingHorizontal: '$3',
    paddingVertical: '$2',
    color: '$textSecondary',
    fontWeight: '500',
    cursor: 'pointer',

    hoverStyle: {
      backgroundColor: '$bgPrimary',
      color: '$textPrimary',
    },

    pressStyle: {
      backgroundColor: '$bgPrimary',
    },

    focusStyle: {
      outlineWidth: 2,
      outlineColor: '$focus',
      outlineStyle: 'solid',
    },
  },
  variants: {
    active: {
      true: {
        backgroundColor: '$bgPrimary',
        color: '$brand',
        fontWeight: '600',
      },
    },
  },
});

export type ToggleGroupProps = GetProps<typeof ToggleGroup>;
export type ToggleGroupItemProps = GetProps<typeof ToggleGroupItem>;
