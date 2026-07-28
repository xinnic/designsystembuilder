import { Star, Heart, MessageCircle, Share2 } from 'lucide-react';
import { YStack, XStack } from '../components/Stack';
import { Card } from '../components/Card';
import { H3, Body, Caption } from '../components/Text';

interface ReviewCardProps {
  title: string;
  rating: number;
  content: string;
  time: string;
  likes: number;
  comments: number;
}

export const ReviewCard = ({
  title,
  rating,
  content,
  time,
  likes,
  comments,
}: ReviewCardProps) => {
  return (
    <Card variant="default" density="medium">
      <YStack gap="$3">
        <XStack justifyContent="space-between" alignItems="flex-start" gap="$3">
          <H3 margin={0} color="$textPrimary" flex={1}>{title}</H3>
          <Caption color="$textSecondary">{time}</Caption>
        </XStack>

        <XStack gap="$1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={15}
              fill={i <= rating ? '#F5A623' : 'transparent'}
              // Icon colours must be wrapped in rgb() — the CSS variables hold
              // bare "R G B" triplets, which is not a valid colour on its own.
              color={i <= rating ? '#F5A623' : 'rgb(var(--color-border))'}
              strokeWidth={i <= rating ? 0 : 1.5}
            />
          ))}
        </XStack>

        {/* User-written content, same treatment as a feed post — $textPrimary.
            Secondary is for metadata (timestamps, counts), not for the copy. */}
        <Body color="$textPrimary">
          “{content}”
        </Body>

        <XStack
          gap="$5"
          paddingTop="$3"
          alignItems="center"
          borderTopWidth={1}
          borderTopColor="$border"
        >
          <XStack gap="$1" alignItems="center">
            <Heart size={16} color="rgb(var(--color-text-secondary))" />
            <Caption color="$textSecondary">{likes}</Caption>
          </XStack>
          <XStack gap="$1" alignItems="center">
            <MessageCircle size={16} color="rgb(var(--color-text-secondary))" />
            <Caption color="$textSecondary">{comments}</Caption>
          </XStack>
          <XStack alignItems="center" marginLeft="auto">
            <Share2 size={16} color="rgb(var(--color-text-secondary))" />
          </XStack>
        </XStack>
      </YStack>
    </Card>
  );
};
