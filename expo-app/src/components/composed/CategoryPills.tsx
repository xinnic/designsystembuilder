/**
 * CategoryPills Component — Composed (NativeWind + CVA)
 *
 * STRUCTURAL SPECS:
 * - MUST render as horizontal scrollable row of filter chips
 * - MUST support single-select or multi-select modes
 * - MUST use Chip component for each pill
 * - Selected pills MUST show filled brand color
 * - Unselected pills MUST show outlined style
 * - MUST support horizontal scroll with no scrollbar
 * - MUST support gap spacing between pills
 * - MUST use accessibilityRole="radiogroup" for single-select
 * - MUST use accessibilityRole="group" for multi-select
 * - Each pill MUST have min 32px height for touch target
 *
 * COMPOSITION:
 * - Uses Chip component from ui/Chip.tsx
 */

import React from 'react';
import { ScrollView, View } from 'react-native';
import { cn } from '@/lib/utils';
import { Chip } from '../ui/Chip';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CategoryItem {
  /** Category ID */
  value: string;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: React.ReactNode;
}

export interface CategoryPillsProps {
  /** Category items */
  items: CategoryItem[];
  /** Selected values (single or multiple) */
  value: string | string[];
  /** Called when selection changes */
  onValueChange: (value: string | string[]) => void;
  /** Allow multiple selections */
  multiSelect?: boolean;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CategoryPills({
  items,
  value,
  onValueChange,
  multiSelect = false,
  className,
}: CategoryPillsProps) {
  const selectedValues = Array.isArray(value) ? value : [value];

  const handlePress = (itemValue: string) => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(itemValue)
        ? currentValues.filter((v) => v !== itemValue)
        : [...currentValues, itemValue];
      onValueChange(newValues);
    } else {
      onValueChange(itemValue);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 px-4"
      className={cn(className)}
      accessibilityRole={multiSelect ? 'group' : 'radiogroup'}
    >
      {items.map((item) => {
        const isSelected = selectedValues.includes(item.value);
        return (
          <Chip
            key={item.value}
            variant={isSelected ? 'filled' : 'outlined'}
            color={isSelected ? 'brand' : 'default'}
            icon={item.icon}
            onPress={() => handlePress(item.value)}
          >
            {item.label}
          </Chip>
        );
      })}
    </ScrollView>
  );
}
