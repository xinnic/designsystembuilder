import { Spinner as TamaguiSpinner, GetProps } from 'tamagui';
import { createStyledComponent } from '../utils/createComponent';

/**
 * Styled Spinner component with design system tokens
 *
 * Loading indicator
 *
 * Sizes:
 * - small: 16px - Inline with text
 * - medium: 24px - Default (buttons, cards)
 * - large: 48px - Full-screen loaders
 *
 * @example
 * <Spinner size="medium" color="$brand" />
 */
export const Spinner = createStyledComponent(TamaguiSpinner, 'Spinner', {
  styles: {
    color: '$brand',
  },
  variants: {
    size: {
      small: {
        width: 16,
        height: 16,
      },
      medium: {
        width: 24,
        height: 24,
      },
      large: {
        width: 48,
        height: 48,
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export type SpinnerProps = GetProps<typeof Spinner>;
