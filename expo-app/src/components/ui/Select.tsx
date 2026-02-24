/**
 * Select Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST render as a Pressable trigger that opens a list of options
 * - On web: overlay dropdown positioned below trigger
 * - On native: Modal bottom sheet with scrollable option list
 * - MUST expose label, placeholder, error, disabled props
 * - MUST show chevron icon in trigger (trailing slot)
 * - Selected value MUST display in trigger text
 * - Each option MUST meet 44px min touch target
 * - MUST use accessibilityRole="combobox" on trigger
 * - Options MUST support accessibilityRole="option"
 * - Disabled state MUST reduce opacity to 0.4
 * - Error state MUST show red border + error text
 * - Backdrop press MUST close the dropdown/sheet
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  Platform,
  type LayoutRectangle,
} from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronDown as ChevronDownIcon } from 'lucide-react-native';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const selectTriggerVariants = cva(
  'flex-row items-center justify-between border bg-surface',
  {
    variants: {
      variant: {
        default: 'border-border',
        error: 'border-red-500',
      },
      size: {
        sm: 'min-h-[36px] px-2.5 rounded-sm',
        md: 'min-h-[44px] px-3 rounded-md',
        lg: 'min-h-[52px] px-4 rounded-lg',
      },
      disabled: {
        true: 'opacity-40',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      disabled: false,
    },
  },
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<VariantProps<typeof selectTriggerVariants>, 'disabled'> {
  /** Available options */
  options: SelectOption[];
  /** Currently selected value */
  value?: string;
  /** Called when selection changes */
  onValueChange?: (value: string) => void;
  /** Placeholder when no value selected */
  placeholder?: string;
  /** Label above the select */
  label?: string;
  /** Error message — switches to error variant */
  error?: string;
  /** Helper text below the select */
  helperText?: string;
  /** Disable the select */
  disabled?: boolean;
  /** Additional NativeWind classes */
  className?: string;
  /** Additional NativeWind classes for the trigger */
  triggerClassName?: string;
}

// ---------------------------------------------------------------------------
// Chevron Icon
// ---------------------------------------------------------------------------

function ChevronDown({ isSelected }: { isSelected?: boolean }) {
  return (
    <ChevronDownIcon
      size={18}
      color="#6B7280"
      strokeWidth={2}
    />
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Select({
  options,
  value,
  onValueChange,
  placeholder = 'Select...',
  label,
  error,
  helperText,
  disabled = false,
  variant: variantProp,
  size,
  className,
  triggerClassName,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<View>(null);
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);

  const resolvedVariant = error ? 'error' : (variantProp ?? 'default');
  const selectedOption = options.find((o) => o.value === value);

  const handleOpen = useCallback(() => {
    if (disabled) return;
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
      setOpen(true);
    });
  }, [disabled]);

  const handleSelect = useCallback(
    (optionValue: string) => {
      onValueChange?.(optionValue);
      setOpen(false);
    },
    [onValueChange],
  );

  return (
    <View className={cn('gap-1.5', className)}>
      {/* Label */}
      {label && (
        <Text className="text-sm font-medium text-on-surface">{label}</Text>
      )}

      {/* Trigger */}
      <Pressable
        ref={triggerRef}
        className={cn(
          selectTriggerVariants({
            variant: resolvedVariant,
            size,
            disabled,
          }),
          selectedOption && 'border-brand',
          triggerClassName
        )}
        onPress={handleOpen}
        disabled={disabled}
        accessibilityRole="combobox"
        accessibilityState={{ disabled, expanded: open }}
        accessibilityLabel={label}
      >
        <Text
          className={cn(
            'flex-1',
            selectedOption
              ? 'text-on-surface font-medium'
              : 'text-on-surface-secondary',
            size === 'sm' && 'text-sm',
            size === 'lg' && 'text-lg',
          )}
        >
          {selectedOption?.label ?? placeholder}
        </Text>
        <ChevronDown isSelected={!!selectedOption} />
      </Pressable>

      {/* Error / Helper */}
      {error ? (
        <Text className="text-xs text-red-500">{error}</Text>
      ) : helperText ? (
        <Text className="text-xs text-on-surface-secondary">{helperText}</Text>
      ) : null}

      {/* Dropdown / Bottom Sheet */}
      <Modal
        visible={open}
        transparent
        animationType={Platform.OS === 'web' ? 'none' : 'slide'}
        onRequestClose={() => setOpen(false)}
      >
        {/* Backdrop */}
        <Pressable
          className="flex-1"
          onPress={() => setOpen(false)}
          accessibilityRole="none"
        >
          {Platform.OS === 'web' && triggerLayout ? (
            /* Web: positioned dropdown below trigger */
            <View
              style={{
                position: 'absolute',
                top: triggerLayout.y + triggerLayout.height + 4,
                left: triggerLayout.x,
                width: triggerLayout.width,
              }}
              className="bg-surface border border-border rounded-md shadow-lg overflow-hidden max-h-64"
            >
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <OptionItem
                    option={item}
                    selected={item.value === value}
                    onSelect={handleSelect}
                  />
                )}
              />
            </View>
          ) : (
            /* Native: bottom sheet */
            <View className="flex-1 justify-end bg-black/40">
              <Pressable>
                <View className="bg-surface rounded-t-xl max-h-[50%] pb-8">
                  {/* Handle bar */}
                  <View className="items-center py-3">
                    <View className="w-10 h-1 rounded-full bg-border" />
                  </View>
                  {/* Title */}
                  {label && (
                    <Text className="text-base font-semibold text-on-surface px-4 pb-2">
                      {label}
                    </Text>
                  )}
                  {/* Options */}
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                      <OptionItem
                        option={item}
                        selected={item.value === value}
                        onSelect={handleSelect}
                      />
                    )}
                  />
                </View>
              </Pressable>
            </View>
          )}
        </Pressable>
      </Modal>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Option Item
// ---------------------------------------------------------------------------

function OptionItem({
  option,
  selected,
  onSelect,
}: {
  option: SelectOption;
  selected: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <Pressable
      className={cn(
        'min-h-[44px] px-4 justify-center active:bg-surface-secondary',
        selected && 'bg-brand-500/10',
        option.disabled && 'opacity-40',
      )}
      onPress={() => !option.disabled && onSelect(option.value)}
      disabled={option.disabled}
      accessibilityRole="option"
      accessibilityState={{ selected, disabled: option.disabled }}
    >
      <Text
        className={cn(
          'text-base',
          selected ? 'text-brand-500 font-medium' : 'text-on-surface',
        )}
      >
        {option.label}
      </Text>
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { selectTriggerVariants };
