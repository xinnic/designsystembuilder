import { styled, Checkbox as TamaguiCheckbox, GetProps, XStack } from 'tamagui';
import { Check } from 'lucide-react';

/**
 * Checkbox - Styled checkbox component with design tokens
 *
 * Features:
 * - Brand color when checked
 * - Hover and focus states
 * - Accessible with labels
 * - Custom check icon
 *
 * @example
 * <Checkbox id="terms" checked={checked} onCheckedChange={setChecked}>
 *   <Checkbox.Indicator>
 *     <Check size={16} />
 *   </Checkbox.Indicator>
 * </Checkbox>
 */
export const Checkbox = styled(TamaguiCheckbox, {
  name: 'Checkbox',
  width: 24,
  height: 24,
  borderRadius: '$1',
  borderWidth: 2,
  borderColor: '$border',
  backgroundColor: 'transparent',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  hoverStyle: {
    borderColor: '$brand',
  },

  focusStyle: {
    outlineWidth: 2,
    outlineColor: '$focus',
    outlineStyle: 'solid',
    outlineOffset: 2,
  },

  pressStyle: {
    scale: 0.95,
  },

  variants: {
    checked: {
      true: {
        backgroundColor: '$brand',
        borderColor: '$brand',
      },
    },

    disabled: {
      true: {
        opacity: 0.38, // Standard disabled opacity for better accessibility
        cursor: 'not-allowed',
      },
    },

    size: {
      small: {
        width: 18,
        height: 18,
      },
      medium: {
        width: 24,
        height: 24,
      },
      large: {
        width: 32,
        height: 32,
      },
    },
  },

  defaultVariants: {
    size: 'medium',
  },
});

// Export styled indicator for custom icons
export const CheckboxIndicator = styled(TamaguiCheckbox.Indicator, {
  name: 'CheckboxIndicator',
  color: 'white',
  alignItems: 'center',
  justifyContent: 'center',
});

// Convenience wrapper for checkbox with label
export const CheckboxWithLabel = ({ label, ...props }: any) => {
  return (
    <XStack gap="$2" alignItems="center">
      <Checkbox {...props}>
        <CheckboxIndicator>
          <Check size={16} color="white" />
        </CheckboxIndicator>
      </Checkbox>
      {label && <label htmlFor={props.id}>{label}</label>}
    </XStack>
  );
};

export type CheckboxProps = GetProps<typeof Checkbox>;