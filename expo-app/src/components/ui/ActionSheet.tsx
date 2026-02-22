/**
 * ActionSheet Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST render as Modal with action list sliding up from bottom
 * - MUST support actions array with label, icon, onPress, destructive flag
 * - MUST show title and description (optional)
 * - MUST include Cancel button at bottom (iOS pattern)
 * - MUST separate destructive actions visually (red text)
 * - MUST meet 56px minimum touch target for each action
 * - MUST use dividers between action groups
 * - MUST support disabled actions with reduced opacity
 * - MUST use accessibilityRole="menu" on container
 * - MUST use accessibilityRole="menuitem" on actions
 * - Backdrop press MUST close sheet
 * - MUST show handle bar at top
 */

import React from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const actionItemVariants = cva(
  'flex-row items-center gap-3 min-h-[56px] px-5 active:bg-surface-secondary',
  {
    variants: {
      destructive: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'opacity-40',
        false: '',
      },
    },
    defaultVariants: {
      destructive: false,
      disabled: false,
    },
  },
);

const actionTextVariants = cva('text-base font-medium', {
  variants: {
    destructive: {
      true: 'text-red-500',
      false: 'text-on-surface',
    },
  },
  defaultVariants: {
    destructive: false,
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ActionItem {
  /** Action label */
  label: string;
  /** Action icon (leading) */
  icon?: React.ReactNode;
  /** Called when action is pressed */
  onPress: () => void;
  /** Mark as destructive (red text) */
  destructive?: boolean;
  /** Disable the action */
  disabled?: boolean;
}

export interface ActionSheetProps {
  /** Whether the sheet is visible */
  open: boolean;
  /** Called when the sheet should close */
  onOpenChange: (open: boolean) => void;
  /** Sheet title */
  title?: string;
  /** Sheet description */
  description?: string;
  /** Array of actions */
  actions: ActionItem[];
  /** Show cancel button */
  showCancel?: boolean;
  /** Cancel button label */
  cancelLabel?: string;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ActionSheet({
  open,
  onOpenChange,
  title,
  description,
  actions,
  showCancel = true,
  cancelLabel = 'Cancel',
  className,
}: ActionSheetProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  const handleActionPress = (action: ActionItem) => {
    if (!action.disabled) {
      action.onPress();
      handleClose();
    }
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Pressable
        className="flex-1 justify-end bg-black/40"
        onPress={handleClose}
        accessibilityRole="none"
      >
        {/* Sheet Container */}
        <Pressable
          className={cn('bg-surface rounded-t-2xl w-full max-h-[80%]', className)}
          accessibilityRole="menu"
        >
          {/* Handle bar */}
          <View className="items-center pt-3 pb-2">
            <View className="w-10 h-1 rounded-full bg-border" />
          </View>

          {/* Header */}
          {(title || description) && (
            <View className="px-5 pb-3 gap-1">
              {title && (
                <Text className="text-base font-semibold text-on-surface text-center">
                  {title}
                </Text>
              )}
              {description && (
                <Text className="text-sm text-on-surface-secondary text-center">
                  {description}
                </Text>
              )}
            </View>
          )}

          {/* Actions */}
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
          >
            {actions.map((action, index) => (
              <View key={index}>
                {index > 0 && <View className="h-px bg-border mx-5" />}
                <Pressable
                  className={cn(
                    actionItemVariants({
                      destructive: action.destructive,
                      disabled: action.disabled,
                    }),
                  )}
                  onPress={() => handleActionPress(action)}
                  disabled={action.disabled}
                  accessibilityRole="menuitem"
                  accessibilityState={{ disabled: action.disabled }}
                  accessibilityLabel={action.label}
                >
                  {action.icon && <View>{action.icon}</View>}
                  <Text
                    className={cn(
                      actionTextVariants({ destructive: action.destructive }),
                      'flex-1',
                    )}
                  >
                    {action.label}
                  </Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>

          {/* Cancel button */}
          {showCancel && (
            <View className="border-t-8 border-surface-secondary">
              <Pressable
                className="flex-row items-center justify-center min-h-[56px] px-5 active:bg-surface-secondary"
                onPress={handleClose}
                accessibilityRole="button"
                accessibilityLabel={cancelLabel}
              >
                <Text className="text-base font-semibold text-brand-500">
                  {cancelLabel}
                </Text>
              </Pressable>
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { actionItemVariants, actionTextVariants };
