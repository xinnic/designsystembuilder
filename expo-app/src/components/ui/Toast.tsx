/**
 * Toast Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST render as temporary notification overlay
 * - MUST support variants: default, success, warning, error, info
 * - MUST support positions: top, bottom, top-center, bottom-center
 * - MUST auto-dismiss after duration (default 3000ms)
 * - MUST support manual dismiss with X button
 * - MUST support title and description
 * - MUST support leading icon slot
 * - MUST use absolute positioning with safe area insets
 * - MUST animate in/out (slide + fade)
 * - MUST use accessibilityRole="alert" for screen readers
 * - MUST support action button (optional)
 * - Multiple toasts MUST stack vertically
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const toastVariants = cva(
  'flex-row items-start gap-3 rounded-lg shadow-lg p-4 mx-4 max-w-md',
  {
    variants: {
      variant: {
        default: 'bg-surface border border-border',
        success: 'bg-green-500 border border-green-600',
        warning: 'bg-yellow-500 border border-yellow-600',
        error: 'bg-red-500 border border-red-600',
        info: 'bg-brand-500 border border-brand-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const toastTextVariants = cva('', {
  variants: {
    variant: {
      default: 'text-on-surface',
      success: 'text-white',
      warning: 'text-black',
      error: 'text-white',
      info: 'text-white',
    },
    weight: {
      normal: 'font-normal',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: {
    variant: 'default',
    weight: 'normal',
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ToastProps extends VariantProps<typeof toastVariants> {
  /** Toast ID (for managing multiple toasts) */
  id?: string;
  /** Toast title */
  title?: string;
  /** Toast description */
  description?: string;
  /** Leading icon */
  icon?: React.ReactNode;
  /** Action button text */
  actionText?: string;
  /** Called when action button is pressed */
  onAction?: () => void;
  /** Auto-dismiss duration in ms (0 = no auto-dismiss) */
  duration?: number;
  /** Called when toast is dismissed */
  onDismiss?: () => void;
  /** Position on screen */
  position?: 'top' | 'bottom' | 'top-center' | 'bottom-center';
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Toast({
  id,
  variant,
  title,
  description,
  icon,
  actionText,
  onAction,
  duration = 3000,
  onDismiss,
  position = 'bottom',
  className,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  if (!visible) {
    return null;
  }

  const positionClass =
    position === 'top'
      ? 'top-4'
      : position === 'bottom'
      ? 'bottom-4'
      : position === 'top-center'
      ? 'top-4 left-0 right-0 items-center'
      : 'bottom-4 left-0 right-0 items-center';

  return (
    <View
      className={cn('absolute z-50', positionClass)}
      accessibilityRole="alert"
      accessibilityLive="polite"
    >
      <View className={cn(toastVariants({ variant }), className)}>
        {/* Icon */}
        {icon && <View className="pt-0.5">{icon}</View>}

        {/* Content */}
        <View className="flex-1 gap-1">
          {title && (
            <Text
              className={cn(toastTextVariants({ variant, weight: 'semibold' }), 'text-sm')}
            >
              {title}
            </Text>
          )}
          {description && (
            <Text className={cn(toastTextVariants({ variant }), 'text-sm')}>
              {description}
            </Text>
          )}
          {actionText && onAction && (
            <Pressable onPress={onAction} className="mt-2">
              <Text
                className={cn(
                  toastTextVariants({ variant, weight: 'semibold' }),
                  'text-sm underline',
                )}
              >
                {actionText}
              </Text>
            </Pressable>
          )}
        </View>

        {/* Dismiss button */}
        <Pressable
          className="w-6 h-6 items-center justify-center rounded active:bg-black/10"
          onPress={handleDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
        >
          <Text className={cn(toastTextVariants({ variant }), 'text-sm leading-none')}>
            ✕
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Toast Manager (simple implementation)
// ---------------------------------------------------------------------------

export interface ToastManagerProps {
  /** Array of toasts to display */
  toasts: ToastProps[];
  /** Called when a toast is dismissed */
  onDismiss?: (id: string) => void;
}

export function ToastManager({ toasts, onDismiss }: ToastManagerProps) {
  return (
    <>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id || index}
          {...toast}
          onDismiss={() => onDismiss?.(toast.id || index.toString())}
        />
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Default toast icons
// ---------------------------------------------------------------------------

export const ToastIcons = {
  success: <Text className="text-lg leading-none">✓</Text>,
  warning: <Text className="text-lg leading-none">⚠</Text>,
  error: <Text className="text-lg leading-none">✕</Text>,
  info: <Text className="text-lg leading-none">ℹ</Text>,
};

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { toastVariants, toastTextVariants };
