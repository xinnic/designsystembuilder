/**
 * SettingsGroup Component — Composed (NativeWind + CVA)
 *
 * STRUCTURAL SPECS:
 * - MUST render as grouped settings section with header and items
 * - MUST support section header with title and optional description
 * - MUST support different item types: navigation, toggle, action
 * - Navigation items MUST show chevron right icon
 * - Toggle items MUST show Switch component
 * - Action items MUST show custom trailing content
 * - MUST use List and ListItem components
 * - MUST support dividers between items
 * - Section header MUST be visually distinct (smaller, muted)
 *
 * COMPOSITION:
 * - Uses List, ListItem, Switch components
 */

import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '@/lib/utils';
import { List, ListItem } from '../ui/ListItem';
import { Switch } from '../ui/Switch';
import { Body } from '../ui/Text';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SettingsItem {
  /** Item label */
  label: string;
  /** Item description */
  description?: string;
  /** Leading icon */
  icon?: React.ReactNode;
  /** Item type */
  type: 'navigation' | 'toggle' | 'action';
  /** For navigation: press handler */
  onPress?: () => void;
  /** For toggle: current value */
  value?: boolean;
  /** For toggle: value change handler */
  onValueChange?: (value: boolean) => void;
  /** For action: custom trailing content */
  trailing?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export interface SettingsGroupProps {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Settings items */
  items: SettingsItem[];
  /** Show dividers between items */
  dividers?: boolean;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SettingsGroup({
  title,
  description,
  items,
  dividers = true,
  className,
}: SettingsGroupProps) {
  return (
    <View className={cn('gap-2', className)}>
      {/* Header */}
      {(title || description) && (
        <View className="px-4 gap-1">
          {title && (
            <Text className="text-xs font-semibold text-on-surface-secondary uppercase tracking-wide">
              {title}
            </Text>
          )}
          {description && (
            <Text className="text-sm text-on-surface-secondary">
              {description}
            </Text>
          )}
        </View>
      )}

      {/* Items */}
      <List dividers={dividers}>
        {items.map((item, index) => {
          // Navigation item
          if (item.type === 'navigation') {
            return (
              <ListItem
                key={index}
                leading={item.icon}
                title={item.label}
                subtitle={item.description}
                trailing={<Body className="text-xl">›</Body>}
                onPress={item.onPress}
                disabled={item.disabled}
              />
            );
          }

          // Toggle item
          if (item.type === 'toggle') {
            return (
              <ListItem
                key={index}
                leading={item.icon}
                title={item.label}
                subtitle={item.description}
                trailing={
                  <Switch
                    value={item.value}
                    onValueChange={item.onValueChange}
                    disabled={item.disabled}
                  />
                }
              />
            );
          }

          // Action item
          return (
            <ListItem
              key={index}
              leading={item.icon}
              title={item.label}
              subtitle={item.description}
              trailing={item.trailing}
              onPress={item.onPress}
              disabled={item.disabled}
            />
          );
        })}
      </List>
    </View>
  );
}
