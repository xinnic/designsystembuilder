import { styled, Select as TamaguiSelect, GetProps } from 'tamagui';
import { ChevronDown, Check } from 'lucide-react';

/**
 * Select - Styled select/dropdown component with design tokens
 *
 * Features:
 * - Design system colors and spacing
 * - Hover and focus states
 * - Custom chevron icon
 * - Accessible dropdown
 *
 * @example
 * <Select value={value} onValueChange={setValue}>
 *   <Select.Trigger>
 *     <Select.Value placeholder="Select an option" />
 *   </Select.Trigger>
 *   <Select.Content>
 *     <Select.Item value="option1">
 *       <Select.ItemText>Option 1</Select.ItemText>
 *     </Select.Item>
 *   </Select.Content>
 * </Select>
 */
export const Select = TamaguiSelect;

// Styled trigger button
export const SelectTrigger = styled(TamaguiSelect.Trigger, {
  name: 'SelectTrigger',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  backgroundColor: '$bgSecondary',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$2',
  minHeight: 44,
  cursor: 'pointer',

  hoverStyle: {
    borderColor: '$brand',
    backgroundColor: '$bgSecondary',
  },

  focusStyle: {
    borderColor: '$focus',
    outlineWidth: 2,
    outlineColor: '$focus',
    outlineStyle: 'solid',
    outlineOffset: 2,
  },

  pressStyle: {
    backgroundColor: '$bgSecondary',
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.38, // Standard disabled opacity for better accessibility
        cursor: 'not-allowed',
      },
    },

    error: {
      true: {
        borderColor: '$danger',
      },
    },

    size: {
      small: {
        paddingHorizontal: '$2',
        paddingVertical: '$1',
        minHeight: 36,
        fontSize: '$2',
      },
      medium: {
        paddingHorizontal: '$3',
        paddingVertical: '$2',
        minHeight: 44,
        fontSize: '$3',
      },
      large: {
        paddingHorizontal: '$4',
        paddingVertical: '$3',
        minHeight: 52,
        fontSize: '$4',
      },
    },
  },

  defaultVariants: {
    size: 'medium',
  },
});

// Styled value display
export const SelectValue = styled(TamaguiSelect.Value, {
  name: 'SelectValue',
  color: '$textPrimary',
  fontSize: '$3',
});

// Styled content container
export const SelectContent = styled(TamaguiSelect.Content, {
  name: 'SelectContent',
  backgroundColor: '$bgPrimary',
  borderRadius: '$2',
  borderWidth: 1,
  borderColor: '$border',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 5,
  zIndex: 1000,
});

// Styled viewport
export const SelectViewport = styled(TamaguiSelect.Viewport, {
  name: 'SelectViewport',
  padding: '$2',
});

// Styled item
export const SelectItem = styled(TamaguiSelect.Item, {
  name: 'SelectItem',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  borderRadius: '$1',
  cursor: 'pointer',

  hoverStyle: {
    backgroundColor: '$bgSecondary',
  },

  focusStyle: {
    backgroundColor: '$bgSecondary',
  },

  pressStyle: {
    backgroundColor: '$bgSecondary',
  },
});

// Styled item text
export const SelectItemText = styled(TamaguiSelect.ItemText, {
  name: 'SelectItemText',
  color: '$textPrimary',
  fontSize: '$3',
});

// Styled item indicator
export const SelectItemIndicator = styled(TamaguiSelect.ItemIndicator, {
  name: 'SelectItemIndicator',
  marginLeft: 'auto',
  alignItems: 'center',
  justifyContent: 'center',
});

// Custom select with all styled parts
export const StyledSelect = ({
  placeholder = "Select an option",
  options = [],
  value,
  onValueChange,
  ...props
}: any) => {
  return (
    <Select value={value} onValueChange={onValueChange} {...props}>
      <SelectTrigger iconAfter={<ChevronDown size={20} />}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectViewport>
          {options.map((option: any) => (
            <SelectItem key={option.value} value={option.value}>
              <SelectItemText>{option.label}</SelectItemText>
              <SelectItemIndicator>
                <Check size={16} />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectViewport>
      </SelectContent>
    </Select>
  );
};

export type SelectProps = GetProps<typeof Select>;