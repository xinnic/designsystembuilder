import { Tooltip as TamaguiTooltip, GetProps } from 'tamagui';
import { createStyledComponent } from '../utils/createComponent';

/**
 * Styled Tooltip component with design system tokens
 *
 * Displays helpful hints on hover
 *
 * @example
 * <Tooltip>
 *   <TooltipTrigger>
 *     <Button>Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     Helpful hint appears here
 *   </TooltipContent>
 * </Tooltip>
 */
export const Tooltip = createStyledComponent(TamaguiTooltip, 'Tooltip', {
  styles: {},
});

export const TooltipTrigger = createStyledComponent(TamaguiTooltip.Trigger, 'TooltipTrigger', {
  styles: {},
});

export const TooltipContent = createStyledComponent(TamaguiTooltip.Content, 'TooltipContent', {
  styles: {
    backgroundColor: '$bgSecondary',
    borderRadius: '$1',
    borderWidth: 1,
    borderColor: '$border',
    paddingHorizontal: '$3',
    paddingVertical: '$2',
    color: '$textPrimary',
    fontSize: '$2',
    maxWidth: 250,

    enterStyle: {
      opacity: 0,
      scale: 0.95,
      y: -5,
    },

    exitStyle: {
      opacity: 0,
      scale: 0.95,
      y: -5,
    },

    animation: 'quick',
  },
});

export const TooltipArrow = createStyledComponent(TamaguiTooltip.Arrow, 'TooltipArrow', {
  styles: {
    borderColor: '$border',
  },
});

export type TooltipProps = GetProps<typeof Tooltip>;
export type TooltipTriggerProps = GetProps<typeof TooltipTrigger>;
export type TooltipContentProps = GetProps<typeof TooltipContent>;
export type TooltipArrowProps = GetProps<typeof TooltipArrow>;
