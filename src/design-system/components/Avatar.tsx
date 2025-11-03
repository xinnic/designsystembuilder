import { Avatar as TamaguiAvatar, Image, GetProps, Circle } from 'tamagui';
import { createStyledComponent } from '../utils/createComponent';
import React from 'react';

/**
 * Styled Avatar component with design system tokens
 *
 * Displays user profile images with fallback to initials
 *
 * Sizes:
 * - small: 32x32px - For compact lists
 * - medium: 48x48px - Default size for most use cases
 * - large: 64x64px - Profile headers, featured users
 * - xlarge: 96x96px - Full profile pages
 *
 * @example
 * <Avatar src="https://..." fallback="JD" size="medium" />
 * <Avatar fallback="AB" size="large" circular />
 */
export const Avatar = createStyledComponent(TamaguiAvatar, 'Avatar', {
  styles: {
    borderWidth: 2,
    borderColor: '$border',
    backgroundColor: '$bgSecondary',
    overflow: 'hidden',
  },
  variants: {
    size: {
      small: { width: 32, height: 32, borderRadius: '$4' },
      medium: { width: 48, height: 48, borderRadius: '$4' },
      large: { width: 64, height: 64, borderRadius: '$4' },
      xlarge: { width: 96, height: 96, borderRadius: '$4' },
    },
    circular: {
      true: {
        borderRadius: '$4',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    circular: true,
  },
});

export const AvatarImage = createStyledComponent(TamaguiAvatar.Image, 'AvatarImage', {
  styles: {
    width: '100%',
    height: '100%',
  },
});

export const AvatarFallback = createStyledComponent(TamaguiAvatar.Fallback, 'AvatarFallback', {
  styles: {
    width: '100%',
    height: '100%',
    backgroundColor: '$brand',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
  },
});

export type AvatarProps = GetProps<typeof Avatar>;
export type AvatarImageProps = GetProps<typeof AvatarImage>;
export type AvatarFallbackProps = GetProps<typeof AvatarFallback>;
