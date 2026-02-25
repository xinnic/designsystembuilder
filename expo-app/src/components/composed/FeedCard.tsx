/**
 * FeedCard Component — Composed (NativeWind + CVA)
 *
 * STRUCTURAL SPECS:
 * - MUST render as content card with image, title, metadata, actions
 * - MUST support variant: default (vertical), horizontal, hero (large image)
 * - MUST support image at top (vertical), left (horizontal), or full-width (hero)
 * - MUST support title, subtitle, description slots
 * - MUST support metadata row (author, date, category)
 * - MUST support actions footer (like, share, bookmark)
 * - MUST use Card component as base
 * - MUST support pressable for navigation
 * - Image MUST support aspect ratio variants
 * - MUST truncate description with numberOfLines
 *
 * COMPOSITION:
 * - Uses Card, Image, Avatar, Chip components
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Card } from '../ui/Card';
import { Image } from '../ui/Image';
import { Avatar } from '../ui/Avatar';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const feedCardVariants = cva('', {
  variants: {
    variant: {
      vertical: '',
      horizontal: 'flex-row',
      hero: '',
    },
  },
  defaultVariants: {
    variant: 'vertical',
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FeedCardProps extends VariantProps<typeof feedCardVariants> {
  /** Card image URL */
  image?: string;
  /** Card title */
  title: string;
  /** Card subtitle */
  subtitle?: string;
  /** Card description */
  description?: string;
  /** Author info */
  author?: {
    name: string;
    avatar?: string;
  };
  /** Metadata (date, category, etc.) */
  metadata?: React.ReactNode;
  /** Action buttons footer */
  actions?: React.ReactNode;
  /** Called when card is pressed */
  onPress?: () => void;
  /** Max lines for description */
  descriptionLines?: number;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FeedCard({
  variant,
  image,
  title,
  subtitle,
  description,
  author,
  metadata,
  actions,
  onPress,
  descriptionLines = 3,
  className,
}: FeedCardProps) {
  const isHorizontal = variant === 'horizontal';
  const isHero = variant === 'hero';

  const content = (
    <View className={cn(feedCardVariants({ variant }))}>
      {/* Image */}
      {image && (
        <View className={cn(isHorizontal ? 'w-24 h-24' : 'w-full')}>
          <Image
            src={image}
            alt={title}
            aspectRatio={isHero ? 'wide' : isHorizontal ? 'square' : 'video'}
            rounded={isHorizontal ? 'md' : 'none'}
            objectFit="cover"
          />
        </View>
      )}

      {/* Content */}
      <View className={cn('flex-1 gap-2', isHorizontal && 'ml-3')}>
        {/* Author */}
        {author && (
          <View className="flex-row items-center gap-2">
            {author.avatar && (
              <Avatar src={author.avatar} initials={author.name} size="sm" />
            )}
            <Text className="font-body text-sm font-medium text-on-surface">
              {author.name}
            </Text>
          </View>
        )}

        {/* Title */}
        <Text
          className={cn(
            'font-body font-semibold text-on-surface',
            isHero ? 'text-2xl' : 'text-lg',
          )}
          numberOfLines={2}
        >
          {title}
        </Text>

        {/* Subtitle */}
        {subtitle && (
          <Text className="font-body text-sm text-on-surface-secondary" numberOfLines={1}>
            {subtitle}
          </Text>
        )}

        {/* Description */}
        {description && !isHorizontal && (
          <Text
            className="font-body text-sm text-on-surface-secondary"
            numberOfLines={descriptionLines}
          >
            {description}
          </Text>
        )}

        {/* Metadata */}
        {metadata && (
          <View className="flex-row items-center gap-2">{metadata}</View>
        )}

        {/* Actions */}
        {actions && (
          <View className="flex-row items-center gap-3 pt-2">{actions}</View>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button">
        <Card padding="none" className={className}>
          <View className="p-4">{content}</View>
        </Card>
      </Pressable>
    );
  }

  return (
    <Card padding="none" className={className}>
      <View className="p-4">{content}</View>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { feedCardVariants };
