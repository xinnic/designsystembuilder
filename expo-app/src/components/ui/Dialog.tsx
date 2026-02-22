/**
 * Dialog / Modal Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST support three modes: default (centered), fullscreen, bottom-sheet
 * - MUST render a semi-transparent backdrop that closes on press
 * - Default mode: centered card with rounded corners, max-width 90%
 * - Fullscreen mode: fills entire screen, no rounded corners
 * - Bottom-sheet mode: slides up from bottom, rounded top corners, handle bar
 * - MUST expose title, description, children, footer slots
 * - MUST support controlled open/onOpenChange API
 * - Close button MUST be present (X icon or explicit close)
 * - Backdrop MUST use accessibilityRole="none" (not interactive for screen readers)
 * - Dialog container MUST use accessibilityRole="dialog"
 * - MUST trap focus within dialog when open (web)
 * - Animation: fade for backdrop, slide for bottom-sheet, scale for default
 */

import React from 'react';
import {
  View,
  Text,
  Pressable,
  Modal as RNModal,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DialogProps {
  /** Whether the dialog is visible */
  open: boolean;
  /** Called when the dialog should close */
  onOpenChange: (open: boolean) => void;
  /** Display mode */
  mode?: 'default' | 'fullscreen' | 'bottom-sheet';
  /** Dialog title */
  title?: string;
  /** Dialog description / subtitle */
  description?: string;
  /** Main content */
  children?: React.ReactNode;
  /** Footer content (typically action buttons) */
  footer?: React.ReactNode;
  /** Disable closing by pressing backdrop */
  preventClose?: boolean;
  /** Additional NativeWind classes on the dialog container */
  className?: string;
}

// ---------------------------------------------------------------------------
// Close Button
// ---------------------------------------------------------------------------

function CloseButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      className="w-8 h-8 items-center justify-center rounded-full active:bg-surface-secondary"
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Close dialog"
    >
      <Text className="text-on-surface-secondary text-lg leading-none">✕</Text>
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Dialog({
  open,
  onOpenChange,
  mode = 'default',
  title,
  description,
  children,
  footer,
  preventClose = false,
  className,
}: DialogProps) {
  const handleClose = () => {
    if (!preventClose) {
      onOpenChange(false);
    }
  };

  return (
    <RNModal
      visible={open}
      transparent
      animationType={mode === 'bottom-sheet' ? 'slide' : 'fade'}
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Backdrop */}
        <Pressable
          className={cn(
            'flex-1',
            mode === 'default' && 'items-center justify-center bg-black/50',
            mode === 'fullscreen' && 'bg-black/50',
            mode === 'bottom-sheet' && 'justify-end bg-black/40',
          )}
          onPress={handleClose}
          accessibilityRole="none"
        >
          {/* Dialog Container — stops event propagation */}
          <Pressable
            className={cn(
              'bg-surface',
              // Default: centered card
              mode === 'default' &&
                'w-[90%] max-w-lg rounded-xl max-h-[85%]',
              // Fullscreen: fills all
              mode === 'fullscreen' && 'flex-1 w-full',
              // Bottom sheet: from bottom, rounded top
              mode === 'bottom-sheet' &&
                'w-full rounded-t-xl max-h-[90%]',
              className,
            )}
            accessibilityRole="dialog"
            accessibilityLabel={title}
          >
            {/* Bottom-sheet handle */}
            {mode === 'bottom-sheet' && (
              <View className="items-center pt-3 pb-1">
                <View className="w-10 h-1 rounded-full bg-border" />
              </View>
            )}

            {/* Header */}
            {(title || mode !== 'bottom-sheet') && (
              <View className="flex-row items-start justify-between px-5 pt-5 pb-2">
                <View className="flex-1 pr-2">
                  {title && (
                    <Text className="text-lg font-semibold text-on-surface">
                      {title}
                    </Text>
                  )}
                  {description && (
                    <Text className="text-sm text-on-surface-secondary mt-1">
                      {description}
                    </Text>
                  )}
                </View>
                <CloseButton onPress={handleClose} />
              </View>
            )}

            {/* Content */}
            <ScrollView
              className="px-5"
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
    </RNModal>
  );
}
