/**
 * Image Component — NativeWind + CVA
 *
 * STRUCTURAL SPECS:
 * - MUST support loading, error, and loaded states
 * - MUST show skeleton placeholder during loading
 * - MUST show error fallback icon/text on load failure
 * - MUST support aspectRatio variants: square, video, portrait, wide
 * - MUST support objectFit: cover, contain, fill, none
 * - MUST support rounded variants: none, sm, md, lg, full
 * - MUST use accessibilityRole="image"
 * - MUST support alt text for accessibility
 * - Loading state MUST show animated pulse
 * - Error state MUST be visually distinct with icon
 * - MUST expose onLoad, onError callbacks
 */

import React, { useState } from 'react';
import {
  View,
  Image as RNImage,
  Text,
  ActivityIndicator,
  type ImageProps as RNImageProps,
} from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const imageContainerVariants = cva('bg-surface-secondary overflow-hidden', {
  variants: {
    aspectRatio: {
      square: 'aspect-square',
      video: 'aspect-video',
      portrait: 'aspect-[3/4]',
      wide: 'aspect-[21/9]',
      auto: '',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    aspectRatio: 'auto',
    rounded: 'md',
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ImageProps
  extends Omit<RNImageProps, 'style'>,
    VariantProps<typeof imageContainerVariants> {
  /** Image source URI */
  src: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Object fit mode */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  /** Show loading indicator */
  showLoading?: boolean;
  /** Custom error fallback */
  errorFallback?: React.ReactNode;
  /** Called when image loads successfully */
  onLoad?: () => void;
  /** Called when image fails to load */
  onError?: () => void;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Image({
  src,
  alt,
  aspectRatio,
  rounded,
  objectFit = 'cover',
  showLoading = true,
  errorFallback,
  onLoad,
  onError,
  className,
  ...props
}: ImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    onError?.();
  };

  const resizeModeMap = {
    cover: 'cover',
    contain: 'contain',
    fill: 'stretch',
    none: 'center',
  } as const;

  return (
    <View
      className={cn(imageContainerVariants({ aspectRatio, rounded }), className)}
      accessibilityRole="image"
      accessibilityLabel={alt}
    >
      {/* Image */}
      {!error && (
        <RNImage
          source={{ uri: src }}
          className="w-full h-full"
          resizeMode={resizeModeMap[objectFit]}
          onLoad={handleLoad}
          onError={handleError}
          accessibilityLabel={alt}
          {...props}
        />
      )}

      {/* Loading state */}
      {loading && showLoading && (
        <View className="absolute inset-0 items-center justify-center bg-surface-secondary">
          <ActivityIndicator size="small" color="#9ca3af" />
        </View>
      )}

      {/* Error state */}
      {error && (
        <View className="absolute inset-0 items-center justify-center bg-surface-secondary">
          {errorFallback || (
            <View className="items-center gap-2">
              <Text className="text-2xl text-on-surface-secondary">🖼️</Text>
              <Text className="text-xs text-on-surface-secondary">
                Failed to load
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Image with skeleton loading
// ---------------------------------------------------------------------------

export interface SkeletonImageProps extends ImageProps {
  /** Show skeleton animation during loading */
  skeleton?: boolean;
}

export function SkeletonImage({ skeleton = true, ...props }: SkeletonImageProps) {
  return <Image {...props} showLoading={skeleton} />;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { imageContainerVariants };
