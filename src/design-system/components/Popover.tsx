import { Popover as TamaguiPopover, GetProps } from 'tamagui';
import { createStyledComponent } from '../utils/createComponent';

/**
 * Styled Popover component with design system tokens
 *
 * Floating content anchored to a trigger element
 * Perfect for dropdowns, context menus, action sheets
 *
 * @example
 * <Popover>
 *   <PopoverTrigger>
 *     <Button>Open Menu</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <YStack gap="$2" padding="$3">
 *       <Button variant="ghost">Action 1</Button>
 *       <Button variant="ghost">Action 2</Button>
 *     </YStack>
 *   </PopoverContent>
 * </Popover>
 */
export const Popover = createStyledComponent(TamaguiPopover, 'Popover', {
  styles: {},
});

export const PopoverTrigger = createStyledComponent(TamaguiPopover.Trigger, 'PopoverTrigger', {
  styles: {},
});

export const PopoverContent = createStyledComponent(TamaguiPopover.Content, 'PopoverContent', {
  styles: {
    backgroundColor: '$bgPrimary',
    borderRadius: '$2',
    borderWidth: 1,
    borderColor: '$border',
    padding: '$3',
    shadowColor: '$shadowColor',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,

    enterStyle: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },

    exitStyle: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },

    animation: 'quick',
  },
});

export const PopoverArrow = createStyledComponent(TamaguiPopover.Arrow, 'PopoverArrow', {
  styles: {
    borderColor: '$border',
  },
});

export const PopoverClose = createStyledComponent(TamaguiPopover.Close, 'PopoverClose', {
  styles: {},
});

export type PopoverProps = GetProps<typeof Popover>;
export type PopoverTriggerProps = GetProps<typeof PopoverTrigger>;
export type PopoverContentProps = GetProps<typeof PopoverContent>;
export type PopoverArrowProps = GetProps<typeof PopoverArrow>;
export type PopoverCloseProps = GetProps<typeof PopoverClose>;
