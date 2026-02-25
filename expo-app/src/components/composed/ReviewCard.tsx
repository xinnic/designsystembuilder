/**
 * ReviewCard Component — Composed (NativeWind + CVA)
 *
 * STRUCTURAL SPECS:
 * - MUST render as review card with star rating, author, review text
 * - MUST support star rating (0-5, half stars supported)
 * - MUST support author info (name, avatar, date)
 * - MUST support review title and body text
 * - MUST support helpful/not helpful actions
 * - MUST use Card component as base
 * - Stars MUST render as filled, half-filled, or empty
 * - Review text MUST support truncation with "Read more"
 * - MUST show verified badge if applicable
 *
 * COMPOSITION:
 * - Uses Card, Avatar components
 */

import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

// ---------------------------------------------------------------------------
// Star Rating Component
// ---------------------------------------------------------------------------

interface StarRatingProps {
  /** Rating value (0-5) */
  rating: number;
  /** Star size */
  size?: 'sm' | 'md' | 'lg';
}

function StarRating({ rating, size = 'md' }: StarRatingProps) {
  const sizeClass = size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg';
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push('★'); // Full star
    } else if (rating >= i - 0.5) {
      stars.push('⯨'); // Half star
    } else {
      stars.push('☆'); // Empty star
    }
  }

  return (
    <View className="flex-row gap-0.5">
      {stars.map((star, index) => (
        <Text key={index} className={cn('font-body text-yellow-500', sizeClass)}>
          {star}
        </Text>
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ReviewCardProps {
  /** Star rating (0-5) */
  rating: number;
  /** Review title */
  title?: string;
  /** Review text */
  review: string;
  /** Author name */
  author: string;
  /** Author avatar URL */
  avatar?: string;
  /** Review date */
  date?: string;
  /** Verified purchase badge */
  verified?: boolean;
  /** Helpful count */
  helpfulCount?: number;
  /** Called when helpful is pressed */
  onHelpful?: () => void;
  /** Max lines for review text */
  reviewLines?: number;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ReviewCard({
  rating,
  title,
  review,
  author,
  avatar,
  date,
  verified = false,
  helpfulCount,
  onHelpful,
  reviewLines = 4,
  className,
}: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={className}>
      <View className="gap-3">
        {/* Header: Author + Rating */}
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-center gap-2 flex-1">
            {avatar && <Avatar src={avatar} initials={author} size="sm" />}
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Text className="font-body text-sm font-semibold text-on-surface">
                  {author}
                </Text>
                {verified && (
                  <Badge
                    variant="icon"
                    color="success"
                    size="sm"
                    icon={<Text className="font-body text-white text-xs">✓</Text>}
                  />
                )}
              </View>
              {date && (
                <Text className="font-body text-xs text-on-surface-secondary">
                  {date}
                </Text>
              )}
            </View>
          </View>

          <StarRating rating={rating} size="sm" />
        </View>

        {/* Title */}
        {title && (
          <Text className="font-body text-base font-semibold text-on-surface">
            {title}
          </Text>
        )}

        {/* Review text */}
        <View>
          <Text
            className="font-body text-sm text-on-surface-secondary"
            numberOfLines={expanded ? undefined : reviewLines}
          >
            {review}
          </Text>
          {review.length > 200 && (
            <Pressable onPress={() => setExpanded(!expanded)}>
              <Text className="font-body text-sm text-brand-500 font-medium mt-1">
                {expanded ? 'Show less' : 'Read more'}
              </Text>
            </Pressable>
          )}
        </View>

        {/* Helpful actions */}
        {(onHelpful || helpfulCount !== undefined) && (
          <View className="flex-row items-center gap-2 pt-2 border-t border-border">
            {onHelpful && (
              <Pressable
                onPress={onHelpful}
                className="flex-row items-center gap-1 px-3 py-1.5 rounded-full bg-surface-secondary active:bg-border"
              >
                <Text className="font-body text-sm">👍</Text>
                <Text className="font-body text-sm font-medium text-on-surface">
                  Helpful
                </Text>
              </Pressable>
            )}
            {helpfulCount !== undefined && helpfulCount > 0 && (
              <Text className="font-body text-xs text-on-surface-secondary">
                {helpfulCount} {helpfulCount === 1 ? 'person' : 'people'} found
                this helpful
              </Text>
            )}
          </View>
        )}
      </View>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { StarRating };
