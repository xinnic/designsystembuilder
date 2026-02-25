/**
 * Avatar Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST support image source with fallback to initials
 * - MUST render initials centered with fallback background color
 * - MUST support size variants: xs, sm, md, lg, xl, 2xl
 * - MUST be perfectly circular (rounded-full)
 * - MUST support loading and error states
 * - MUST use accessibilityRole="image"
 * - Fallback background MUST use brand-500 or custom color
 * - Initials MUST be uppercase and limited to 2 characters
 * - MUST support status indicator (online, offline, busy)
 * - Status indicator MUST position at bottom-right with border ring
 */

import React, { useState } from 'react';
import { View, Text, Image, type ImageProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const avatarVariants = cva(
  'items-center justify-center rounded-full bg-brand-500 overflow-hidden',
  {
    variants: {
      size: {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
        '2xl': 'w-24 h-24',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const avatarTextVariants = cva('font-body text-white font-semibold', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-xl',
      '2xl': 'text-3xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const statusIndicatorVariants = cva(
  'absolute bottom-0 right-0 rounded-full border-2 border-surface',
  {
    variants: {
      status: {
        online: 'bg-green-500',
        offline: 'bg-gray-400',
        busy: 'bg-red-500',
      },
      size: {
        xs: 'w-1.5 h-1.5',
        sm: 'w-2 h-2',
        md: 'w-2.5 h-2.5',
        lg: 'w-3 h-3',
        xl: 'w-4 h-4',
        '2xl': 'w-6 h-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  /** Image source */
  src?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Fallback initials (max 2 characters) */
  initials?: string;
  /** Status indicator */
  status?: 'online' | 'offline' | 'busy';
  /** Custom fallback background color */
  fallbackColor?: string;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Avatar({
  src,
  alt,
  initials,
  status,
  size,
  fallbackColor,
  className,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const showImage = src && !imageError;
  const displayInitials = initials
    ? initials.slice(0, 2).toUpperCase()
    : alt
    ? alt.slice(0, 2).toUpperCase()
    : '?';

  return (
    <View className="relative">
      <View
        className={cn(
          avatarVariants({ size }),
          fallbackColor && `bg-[${fallbackColor}]`,
          className,
        )}
        accessibilityRole="image"
        accessibilityLabel={alt || `Avatar for ${initials}`}
      >
        {showImage ? (
          <Image
            source={{ uri: src }}
            className="w-full h-full"
            onError={() => setImageError(true)}
            onLoadEnd={() => setImageLoading(false)}
            accessibilityLabel={alt}
          />
        ) : (
          <Text className={cn(avatarTextVariants({ size }))}>
            {displayInitials}
          </Text>
        )}
      </View>

      {status && (
        <View
          className={cn(statusIndicatorVariants({ status, size }))}
          accessibilityLabel={`Status: ${status}`}
        />
      )}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Avatar Group — for stacked avatars
// ---------------------------------------------------------------------------

export interface AvatarGroupProps {
  /** Maximum avatars to show before +N */
  max?: number;
  /** Avatar components */
  children: React.ReactNode;
  /** Additional NativeWind classes */
  className?: string;
}

export function AvatarGroup({ max = 3, children, className }: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const displayAvatars = max ? childArray.slice(0, max) : childArray;
  const remainingCount = childArray.length - displayAvatars.length;

  return (
    <View className={cn('flex-row', className)}>
      {displayAvatars.map((child, index) => (
        <View
          key={index}
          className={cn(index > 0 && '-ml-2', 'border-2 border-surface rounded-full')}
        >
          {child}
        </View>
      ))}
      {remainingCount > 0 && (
        <View className="-ml-2">
          <Avatar
            initials={`+${remainingCount}`}
            fallbackColor="#6b7280"
            size="md"
          />
        </View>
      )}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { avatarVariants, avatarTextVariants, statusIndicatorVariants };
