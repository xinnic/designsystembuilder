import { Separator as TamaguiSeparator, GetProps } from 'tamagui';
import { createStyledComponent } from '../utils/createComponent';

/**
 * Styled Separator component with design system tokens
 *
 * Creates visual hierarchy with horizontal or vertical dividers
 *
 * Orientations:
 * - horizontal: Full-width divider (default)
 * - vertical: Full-height divider
 *
 * @example
 * <YStack gap="$4">
 *   <Section />
 *   <Separator />
 *   <Section />
 * </YStack>
 *
 * <XStack gap="$4">
 *   <Item />
 *   <Separator orientation="vertical" />
 *   <Item />
 * </XStack>
 */
export const Separator = createStyledComponent(TamaguiSeparator, 'Separator', {
  styles: {
    backgroundColor: '$border',
    borderRadius: 0,
  },
  variants: {
    orientation: {
      horizontal: {
        height: 1,
        width: '100%',
      },
      vertical: {
        width: 1,
        height: '100%',
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export type SeparatorProps = GetProps<typeof Separator>;
