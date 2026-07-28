import React from 'react';
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
const StyledAvatar = styled(TamaguiAvatar, {
    name: 'Avatar',
    circular: true,
});

/** Semantic avatar sizes, in points. */
export const AVATAR_SIZES = {
    small: 32,
    medium: 40,
    large: 56,
    xlarge: 80,
} as const;

export type AvatarSize = keyof typeof AVATAR_SIZES;

type StyledAvatarProps = Omit<React.ComponentProps<typeof StyledAvatar>, 'size' | 'children'>;

/**
 * Semantic sizes are resolved to points here rather than through a `size`
 * variant: Tamagui's own Avatar already owns `size` and expects a size *token*,
 * so a variant of the same name loses and every avatar collapses to $true (16pt).
 */
export const Avatar = ({
    size = 'medium',
    children,
    ...props
}: StyledAvatarProps & { size?: AvatarSize | number; children?: React.ReactNode }) => (
    <StyledAvatar
        size={typeof size === 'number' ? size : AVATAR_SIZES[size] ?? AVATAR_SIZES.medium}
        {...(props as any)}
    >
        {children}
    </StyledAvatar>
);

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

export type AvatarProps = React.ComponentProps<typeof Avatar>;
export type AvatarImageProps = GetProps<typeof AvatarImage>;
export type AvatarFallbackProps = GetProps<typeof AvatarFallback>;
