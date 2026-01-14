import { styled, Image as TamaguiImage, GetProps } from 'tamagui';

/**
 * Optimized Image component for React Native and Web
 * 
 * Features:
 * - Automatic optimization
 * - Lazy loading support
 * - Aspect ratio control
 * - Border radius variants
 * 
 * @example
 * <Image 
 *   source={{ uri: 'https://...' }} 
 *   width={200} 
 *   height={200}
 *   borderRadius="$2"
 * />
 */
export const Image = styled(TamaguiImage, {
    name: 'Image',

    variants: {
        rounded: {
            none: {
                borderRadius: 0,
            },
            small: {
                borderRadius: '$1',
            },
            medium: {
                borderRadius: '$2',
            },
            large: {
                borderRadius: '$3',
            },
            full: {
                borderRadius: '$4',
            },
        },

        aspectRatio: {
            square: {
                aspectRatio: 1,
            },
            video: {
                aspectRatio: 16 / 9,
            },
            portrait: {
                aspectRatio: 3 / 4,
            },
        },
    },

    defaultVariants: {
        rounded: 'medium',
    },
});

export type ImageProps = GetProps<typeof Image>;
