/**
 * BottomSheet Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST render as Modal that slides up from bottom
 * - MUST support snap points (heights: auto, 50%, 75%, 90%)
 * - MUST show handle bar at top for drag affordance
 * - MUST support drag-to-dismiss gesture
 * - MUST dim background with semi-transparent backdrop
 * - MUST support header, children, footer slots
 * - MUST use accessibilityRole="dialog"
 * - MUST trap focus within sheet when open
 * - Backdrop press MUST close sheet unless preventClose is true
 * - MUST support controlled open/onOpenChange API
 * - Rounded top corners MUST be visible (16px minimum)
 * - MUST support scrollable content with ScrollView
 */

import React from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const bottomSheetVariants = cva('bg-surface rounded-t-2xl w-full', {
  variants: {
    snapPoint: {
      auto: 'max-h-[90%]',
      half: 'h-[50%]',
      'three-quarters': 'h-[75%]',
      full: 'h-[90%]',
    },
  },
  defaultVariants: {
    snapPoint: 'auto',
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BottomSheetProps extends VariantProps<typeof bottomSheetVariants> {
  /** Whether the sheet is visible */
  open: boolean;
  /** Called when the sheet should close */
  onOpenChange: (open: boolean) => void;
  /** Sheet header content */
  header?: React.ReactNode;
  /** Sheet title (alternative to header) */
  title?: string;
  /** Sheet description */
  description?: string;
  /** Main content */
  children?: React.ReactNode;
  /** Footer content (typically action buttons) */
  footer?: React.ReactNode;
  /** Disable closing by pressing backdrop or dragging */
  preventClose?: boolean;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BottomSheet({
  open,
  onOpenChange,
  snapPoint,
  header,
  title,
  description,
  children,
  footer,
  preventClose = false,
  className,
}: BottomSheetProps) {
  const handleClose = () => {
    if (!preventClose) {
      onOpenChange(false);
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
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Backdrop */}
        <Pressable
          className="flex-1 justify-end bg-black/40"
          onPress={handleClose}
          accessibilityRole="none"
        >
          {/* Sheet Container — stops event propagation */}
          <Pressable
            className={cn(bottomSheetVariants({ snapPoint }), className)}
            accessibilityRole="dialog"
            accessibilityLabel={title}
          >
            {/* Handle bar */}
            <View className="items-center pt-3 pb-2">
              <View className="w-10 h-1 rounded-full bg-border" />
            </View>

            {/* Header */}
            {(header || title) && (
              <View className="px-5 pb-3">
                {header || (
                  <View className="gap-1">
                    {title && (
                      <Text className="text-lg font-semibold text-on-surface">
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
              </View>
            )}

            {/* Content */}
            <ScrollView
              className="flex-1 px-5"
              contentContainerClassName="pb-4"
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>

            {/* Footer */}
            {footer && (
              <View className="flex-row justify-end gap-2 px-5 py-4 border-t border-border">
                {footer}
              </View>
            )}
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { bottomSheetVariants };
