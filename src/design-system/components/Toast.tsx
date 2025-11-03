import { Toast as TamaguiToast, GetProps } from 'tamagui';
import { createStyledComponent } from '../utils/createComponent';

/**
 * Styled Toast component with design system tokens
 *
 * Notification banners for user feedback
 *
 * Variants:
 * - default: Neutral notification
 * - success: Success message
 * - warning: Warning message
 * - danger: Error message
 * - info: Informational message
 *
 * @example
 * <Toast variant="success">
 *   <ToastTitle>Success!</ToastTitle>
 *   <ToastDescription>Your changes have been saved</ToastDescription>
 * </Toast>
 */
export const Toast = createStyledComponent(TamaguiToast, 'Toast', {
  styles: {
    backgroundColor: '$bgPrimary',
    borderRadius: '$2',
    borderWidth: 1,
    borderColor: '$border',
    padding: '$4',
    shadowColor: '$shadowColor',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    minWidth: 300,

    enterStyle: {
      opacity: 0,
      scale: 0.9,
      y: -20,
    },

    exitStyle: {
      opacity: 0,
      scale: 0.9,
      y: -20,
    },

    animation: 'quick',
  },
  variants: {
    variant: {
      default: {
        borderColor: '$border',
      },
      success: {
        borderColor: '$success',
        borderLeftWidth: 4,
      },
      warning: {
        borderColor: '$warning',
        borderLeftWidth: 4,
      },
      danger: {
        borderColor: '$danger',
        borderLeftWidth: 4,
      },
      info: {
        borderColor: '$info',
        borderLeftWidth: 4,
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const ToastTitle = createStyledComponent(TamaguiToast.Title, 'ToastTitle', {
  styles: {
    color: '$textPrimary',
    fontSize: '$3',
    fontWeight: '600',
    marginBottom: '$1',
  },
});

export const ToastDescription = createStyledComponent(TamaguiToast.Description, 'ToastDescription', {
  styles: {
    color: '$textSecondary',
    fontSize: '$2',
  },
});

export type ToastProps = GetProps<typeof Toast>;
export type ToastTitleProps = GetProps<typeof ToastTitle>;
export type ToastDescriptionProps = GetProps<typeof ToastDescription>;
