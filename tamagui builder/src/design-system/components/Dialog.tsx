import { styled, Dialog as TamaguiDialog, GetProps, XStack, YStack } from 'tamagui';
import { X } from 'lucide-react';
import { Button } from './Button';

/**
 * Dialog - Styled dialog/modal component with design tokens
 *
 * Features:
 * - Overlay with backdrop
 * - Centered content
 * - Close button
 * - Smooth animations
 * - Accessible
 *
 * @example
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <Dialog.Portal>
 *     <Dialog.Overlay />
 *     <Dialog.Content>
 *       <Dialog.Title>Dialog Title</Dialog.Title>
 *       <Dialog.Description>Dialog description</Dialog.Description>
 *       <Dialog.Close />
 *     </Dialog.Content>
 *   </Dialog.Portal>
 * </Dialog>
 */
export const Dialog = TamaguiDialog;

// Styled overlay backdrop
export const DialogOverlay = styled(TamaguiDialog.Overlay, {
  name: 'DialogOverlay',
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  animation: 'quick',
  enterStyle: {
    opacity: 0,
  },
  exitStyle: {
    opacity: 0,
  },
});

// Styled content container
export const DialogContent = styled(TamaguiDialog.Content, {
  name: 'DialogContent',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '$bgPrimary',
  borderRadius: '$3',
  borderWidth: 1,
  borderColor: '$border',
  padding: '$6',
  width: '90%',
  maxWidth: 500,
  maxHeight: '85vh',
  shadowColor: '#475569', // Bluish-grey shadow for better depth perception
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.15,
  shadowRadius: 24,
  elevation: 3,
  animation: [
    'quick',
    {
      opacity: { overshootClamping: true },
    },
  ],
  enterStyle: {
    x: 0,
    y: -20,
    opacity: 0,
    scale: 0.9,
  },
  exitStyle: {
    x: 0,
    y: 10,
    opacity: 0,
    scale: 0.95,
  },

  variants: {
    size: {
      small: {
        maxWidth: 400,
        padding: '$4',
      },
      medium: {
        maxWidth: 500,
        padding: '$6',
      },
      large: {
        maxWidth: 700,
        padding: '$8',
      },
      full: {
        width: '95%',
        maxWidth: 900,
        height: '90vh',
        maxHeight: '90vh',
      },
    },

    variant: {
      default: {},
      elevated: {
        shadowColor: '#475569', // Bluish-grey shadow
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.2,
        shadowRadius: 40,
        elevation: 5,
      },
      flat: {
        borderWidth: 0,
        shadowOpacity: 0,
      },
    },
  },

  defaultVariants: {
    size: 'medium',
    variant: 'default',
  },
});

// Styled title
export const DialogTitle = styled(TamaguiDialog.Title, {
  name: 'DialogTitle',
  fontSize: '$5',
  fontWeight: '700',
  color: '$textPrimary',
  marginBottom: '$2',
});

// Styled description
export const DialogDescription = styled(TamaguiDialog.Description, {
  name: 'DialogDescription',
  fontSize: '$3',
  color: '$textSecondary',
  marginBottom: '$4',
  lineHeight: 1.5,
});

// Styled close button
export const DialogClose = styled(TamaguiDialog.Close, {
  name: 'DialogClose',
  position: 'absolute',
  top: '$4',
  right: '$4',
  padding: '$2',
  backgroundColor: 'transparent',
  borderWidth: 0,
  borderRadius: '$2',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',

  hoverStyle: {
    backgroundColor: '$bgSecondary',
  },

  pressStyle: {
    scale: 0.9,
  },

  focusStyle: {
    outlineWidth: 2,
    outlineColor: '$focus',
    outlineStyle: 'solid',
    outlineOffset: 2,
  },
});

// Re-export for convenience
Dialog.Portal = TamaguiDialog.Portal;
Dialog.Overlay = DialogOverlay;
Dialog.Content = DialogContent;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Close = DialogClose;

// Alert Dialog variant
export const AlertDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
  ...props
}: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent {...props}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>

          <XStack gap="$3" justifyContent="flex-end" marginTop="$4">
            <Button
              variant="secondary"
              onPress={() => {
                onCancel?.();
                onOpenChange(false);
              }}
            >
              {cancelText}
            </Button>
            <Button
              variant={variant === 'destructive' ? 'destructive' : 'primary'}
              onPress={() => {
                onConfirm?.();
                onOpenChange(false);
              }}
            >
              {confirmText}
            </Button>
          </XStack>

          <DialogClose>
            <X size={20} color="var(--color-text-secondary)" />
          </DialogClose>
        </DialogContent>
      </Dialog.Portal>
    </Dialog>
  );
};

// Simple modal wrapper
export const Modal = ({
  open,
  onClose,
  title,
  children,
  showCloseButton = true,
  ...props
}: any) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent {...props}>
          {title && <DialogTitle>{title}</DialogTitle>}
          {children}
          {showCloseButton && (
            <DialogClose>
              <X size={20} color="var(--color-text-secondary)" />
            </DialogClose>
          )}
        </DialogContent>
      </Dialog.Portal>
    </Dialog>
  );
};

export type DialogProps = GetProps<typeof Dialog>;