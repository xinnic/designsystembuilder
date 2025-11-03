import { Sheet as TamaguiSheet, GetProps } from 'tamagui';
import { createStyledComponent } from '../utils/createComponent';

/**
 * Styled Sheet component with design system tokens
 *
 * Bottom sheet / drawer for mobile-friendly overlays
 *
 * @example
 * <Sheet open={isOpen} onOpenChange={setIsOpen}>
 *   <SheetOverlay />
 *   <SheetFrame>
 *     <SheetHandle />
 *     <YStack padding="$4">
 *       Content here
 *     </YStack>
 *   </SheetFrame>
 * </Sheet>
 */
export const Sheet = createStyledComponent(TamaguiSheet, 'Sheet', {
  styles: {
    zIndex: '$5',
  },
});

export const SheetOverlay = createStyledComponent(TamaguiSheet.Overlay, 'SheetOverlay', {
  styles: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    animation: 'quick',
    enterStyle: {
      opacity: 0,
    },
    exitStyle: {
      opacity: 0,
    },
  },
});

export const SheetFrame = createStyledComponent(TamaguiSheet.Frame, 'SheetFrame', {
  styles: {
    backgroundColor: '$bgPrimary',
    borderTopLeftRadius: '$3',
    borderTopRightRadius: '$3',
    borderWidth: 1,
    borderColor: '$border',
    shadowColor: '$shadowColor',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});

export const SheetHandle = createStyledComponent(TamaguiSheet.Handle, 'SheetHandle', {
  styles: {
    backgroundColor: '$border',
    width: 40,
    height: 4,
    borderRadius: '$4',
    marginVertical: '$3',
    alignSelf: 'center',
  },
});

export type SheetProps = GetProps<typeof Sheet>;
export type SheetOverlayProps = GetProps<typeof SheetOverlay>;
export type SheetFrameProps = GetProps<typeof SheetFrame>;
export type SheetHandleProps = GetProps<typeof SheetHandle>;
