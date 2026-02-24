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
    <Card variant="elevated" padding="large">
      <YStack gap="$2">
        <XStack justifyContent="space-between" alignItems="center">
          <H3 size="$5" margin={0} color="$textPrimary">{title}</H3>
          <Caption color="$textSecondary">{time}</Caption>
        </XStack>
        
        <XStack gap="$1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={16}
              fill={i <= rating ? '#FFD700' : 'transparent'} // Gold or transparent
              color={i <= rating ? '#FFD700' : 'var(--color-border)'}
              strokeWidth={i <= rating ? 0 : 2}
            />
          ))}
        </XStack>

        <Body color="$textSecondary" size="$4">
          "{content}"
        </Body>

        <XStack gap="$4" marginTop="$2" alignItems="center">
          <XStack gap="$1.5" alignItems="center">
            <Heart size={18} color="var(--color-text-secondary)" />
            <Caption color="$textSecondary">{likes}</Caption>
          </XStack>
          <XStack gap="$1.5" alignItems="center">
            <MessageCircle size={18} color="var(--color-text-secondary)" />
            <Caption color="$textSecondary">{comments}</Caption>
          </XStack>
          <XStack gap="$1.5" alignItems="center" marginLeft="auto">
            <Share2 size={18} color="var(--color-text-secondary)" />
          </XStack>
        </XStack>
      </YStack>
    </Card>
  );
};
