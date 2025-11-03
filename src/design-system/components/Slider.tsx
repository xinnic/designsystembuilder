import { Slider as TamaguiSlider, GetProps } from 'tamagui';
import { createStyledComponent } from '../utils/createComponent';

/**
 * Styled Slider component with design system tokens
 *
 * Range input control for selecting values
 *
 * Sizes:
 * - small: Compact slider
 * - medium: Standard size (default)
 * - large: Prominent slider
 *
 * @example
 * <Slider
 *   value={[50]}
 *   onValueChange={(val) => setValue(val)}
 *   min={0}
 *   max={100}
 *   step={1}
 * />
 */
export const Slider = createStyledComponent(TamaguiSlider, 'Slider', {
  styles: {
    backgroundColor: '$bgSecondary',
    borderRadius: '$4',
  },
  variants: {
    size: {
      small: {
        height: 4,
      },
      medium: {
        height: 6,
      },
      large: {
        height: 8,
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export const SliderTrack = createStyledComponent(TamaguiSlider.Track, 'SliderTrack', {
  styles: {
    backgroundColor: '$bgSecondary',
    borderRadius: '$4',
  },
});

export const SliderTrackActive = createStyledComponent(TamaguiSlider.TrackActive, 'SliderTrackActive', {
  styles: {
    backgroundColor: '$brand',
  },
});

export const SliderThumb = createStyledComponent(TamaguiSlider.Thumb, 'SliderThumb', {
  styles: {
    width: 20,
    height: 20,
    backgroundColor: '$brand',
    borderRadius: '$4',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '$shadowColor',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    hoverStyle: {
      scale: 1.1,
    },

    focusStyle: {
      outlineWidth: 2,
      outlineColor: '$focus',
      outlineStyle: 'solid',
      outlineOffset: 2,
    },
  },
});

export type SliderProps = GetProps<typeof Slider>;
export type SliderTrackProps = GetProps<typeof SliderTrack>;
export type SliderTrackActiveProps = GetProps<typeof SliderTrackActive>;
export type SliderThumbProps = GetProps<typeof SliderThumb>;
