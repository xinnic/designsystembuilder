import { styled, Avatar as TamaguiAvatar, GetProps } from 'tamagui';

/**
 * Avatar component for user profile images
 * 
 * Features:
 * - Automatic fallback to initials
 * - Circular by default
 * - Multiple sizes
 * - Works with images or text
 * 
 * @example
 * <Avatar circular size="$4">
 *   <Avatar.Image src="https://..." />
 *   <Avatar.Fallback>JD</Avatar.Fallback>
 * </Avatar>
 */
export const Avatar = styled(TamaguiAvatar, {
    name: 'Avatar',
    circular: true,

    variants: {
        size: {
            small: {
                width: 32,
                height: 32,
            },
            medium: {
                width: 40,
                height: 40,
            },
            large: {
                width: 56,
                height: 56,
            },
            xlarge: {
                width: 80,
                height: 80,
            },
        },
    },

    defaultVariants: {
        size: 'medium',
    },
});

/**
 * Avatar Image - The actual image inside the avatar
 */
export const AvatarImage = styled(TamaguiAvatar.Image, {
    name: 'AvatarImage',
});

/**
 * Avatar Fallback - Shown when image fails to load
 * Typically displays user initials
 */
export const AvatarFallback = styled(TamaguiAvatar.Fallback, {
    name: 'AvatarFallback',
    backgroundColor: '$brand',
    color: 'white',
    fontFamily: '$body',
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
});

export type AvatarProps = GetProps<typeof Avatar>;
export type AvatarImageProps = GetProps<typeof AvatarImage>;
export type AvatarFallbackProps = GetProps<typeof AvatarFallback>;
