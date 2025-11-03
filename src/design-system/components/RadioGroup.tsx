import { RadioGroup as TamaguiRadioGroup, GetProps, Label, XStack } from 'tamagui';
import { createStyledComponent } from '../utils/createComponent';
import React from 'react';

/**
 * Styled RadioGroup component with design system tokens
 *
 * Single-choice selection from multiple options
 *
 * @example
 * <RadioGroup value={selected} onValueChange={setSelected}>
 *   <RadioGroupItem value="option1" id="opt1">
 *     <RadioGroupIndicator />
 *   </RadioGroupItem>
 *   <Label htmlFor="opt1">Option 1</Label>
 * </RadioGroup>
 */
export const RadioGroup = createStyledComponent(TamaguiRadioGroup, 'RadioGroup', {
  styles: {
    gap: '$3',
  },
});

export const RadioGroupItem = createStyledComponent(TamaguiRadioGroup.Item, 'RadioGroupItem', {
  styles: {
    width: 20,
    height: 20,
    borderRadius: '$4',
    borderWidth: 2,
    borderColor: '$border',
    backgroundColor: '$bgPrimary',

    hoverStyle: {
      borderColor: '$brand',
    },

    focusStyle: {
      outlineWidth: 2,
      outlineColor: '$focus',
      outlineStyle: 'solid',
      outlineOffset: 2,
    },
  },
  variants: {
    size: {
      small: { width: 16, height: 16 },
      medium: { width: 20, height: 20 },
      large: { width: 24, height: 24 },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export const RadioGroupIndicator = createStyledComponent(
  TamaguiRadioGroup.Indicator,
  'RadioGroupIndicator',
  {
    styles: {
      width: 12,
      height: 12,
      borderRadius: '$4',
      backgroundColor: '$brand',
    },
  }
);

/**
 * Convenience wrapper for RadioGroup with label
 */
export const RadioGroupItemWithLabel = ({
  value,
  id,
  label,
  size,
}: {
  value: string;
  id: string;
  label: string;
  size?: 'small' | 'medium' | 'large';
}) => (
  <XStack gap="$2" alignItems="center">
    <RadioGroupItem value={value} id={id} size={size}>
      <RadioGroupIndicator />
    </RadioGroupItem>
    <Label htmlFor={id} fontSize="$3" color="$textPrimary">
      {label}
    </Label>
  </XStack>
);

export type RadioGroupProps = GetProps<typeof RadioGroup>;
export type RadioGroupItemProps = GetProps<typeof RadioGroupItem>;
export type RadioGroupIndicatorProps = GetProps<typeof RadioGroupIndicator>;
