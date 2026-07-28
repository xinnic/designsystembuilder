import { Image } from 'tamagui';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { XStack, YStack, Card } from '../components';
import { Body, Caption, Text } from '../components/Text';
import { Avatar, AvatarImage, AvatarFallback } from '../components/Avatar';
import { Button } from '../components/Button';

interface UserCardProps {
  name: string;
  /** @ handle, shown next to the name in the feed layout */
  handle?: string;
  status?: string;
  time?: string;
  /** Avatar image URL. Falls back to initials on a brand-coloured circle. */
  avatar?: string;
  avatarColor?: string;
  /** Post body — presence of this (or `image`) is what makes it a feed card */
  content?: string;
  /** Post image URL */
  image?: string;
  likes?: number;
  comments?: number;
  onActionPress?: () => void;
  actionText?: string;
  layout?: 'feed' | 'horizontal' | 'vertical';
}

/**
 * UserCard — a person plus their content.
 *
 * Three layouts:
 * - `feed`: avatar + name/handle + timestamp, post body, optional image, engagement row
 * - `horizontal`: avatar + name/status on one row with a trailing action button
 * - `vertical`: the same, stacked and centred
 *
 * @example
 * <UserCard
 *   name="Alex Morgan"
 *   handle="@alexm"
 *   time="2h ago"
 *   content="Just explored the new design district!"
 *   image="https://…"
 *   likes={124}
 *   comments={18}
 * />
 */
export const UserCard = ({
  name,
  handle,
  status,
  time,
  avatar,
  avatarColor = '#3498db',
  content,
  image,
  likes,
  comments,
  onActionPress,
  actionText,
  layout,
}: UserCardProps) => {
  // Get initials from name
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const resolvedLayout = layout ?? (content || image ? 'feed' : 'horizontal');

  const avatarNode = (
    <Avatar size="medium">
      {avatar && <AvatarImage src={avatar} />}
      <AvatarFallback backgroundColor={avatar ? '$brand' : avatarColor}>
        <Text color="white" fontSize="$caption" fontWeight="600">
          {initials}
        </Text>
      </AvatarFallback>
    </Avatar>
  );

  if (resolvedLayout === 'feed') {
    return (
      <Card variant="default" density="none">
        <YStack>
          {/* Author row */}
          <XStack alignItems="center" gap="$3" padding="$4" paddingBottom="$3">
            {avatarNode}
            <YStack flex={1} gap={2}>
              <Body fontWeight="600" margin={0} numberOfLines={1}>
                {name}
              </Body>
              {(handle || time) && (
                <Caption color="$textSecondary" numberOfLines={1}>
                  {[handle, time].filter(Boolean).join(' · ')}
                </Caption>
              )}
            </YStack>
            {actionText && (
              <Button variant="secondary" size="small" onPress={onActionPress}>
                {actionText}
              </Button>
            )}
          </XStack>

          {content && (
            <Body color="$textPrimary" paddingHorizontal="$4" paddingBottom="$3">
              {content}
            </Body>
          )}

          {image && (
            <Image
              source={{ uri: image }}
              width="100%"
              height={180}
              resizeMode="cover"
              alt=""
            />
          )}

          {/* Engagement row */}
          {(likes !== undefined || comments !== undefined) && (
            <XStack gap="$5" alignItems="center" padding="$4" paddingTop="$3">
              {likes !== undefined && (
                <XStack gap="$1" alignItems="center">
                  <Heart size={16} color="rgb(var(--color-text-secondary))" />
                  <Caption color="$textSecondary">{likes}</Caption>
                </XStack>
              )}
              {comments !== undefined && (
                <XStack gap="$1" alignItems="center">
                  <MessageCircle size={16} color="rgb(var(--color-text-secondary))" />
                  <Caption color="$textSecondary">{comments}</Caption>
                </XStack>
              )}
              <XStack alignItems="center" marginLeft="auto">
                <Share2 size={16} color="rgb(var(--color-text-secondary))" />
              </XStack>
            </XStack>
          )}
        </YStack>
      </Card>
    );
  }

  if (resolvedLayout === 'vertical') {
    return (
      <Card variant="default" density="medium">
        <YStack alignItems="center" gap="$3">
          {avatarNode}

          <YStack alignItems="center" gap="$1">
            <Body fontWeight="600" margin={0}>
              {name}
            </Body>
            {status && <Caption color="$textSecondary">{status}</Caption>}
          </YStack>

          {actionText && (
            <Button variant="secondary" size="small" onPress={onActionPress} fullWidth>
              {actionText}
            </Button>
          )}
        </YStack>
      </Card>
    );
  }

  return (
    <Card variant="default" density="medium">
      <XStack alignItems="center" gap="$3">
        {avatarNode}

        <YStack flex={1} gap={2}>
          <Body fontWeight="600" margin={0} numberOfLines={1}>
            {name}
          </Body>
          {(status || handle) && (
            <Caption color="$textSecondary" numberOfLines={1}>
              {status || handle}
            </Caption>
          )}
        </YStack>

        {actionText && (
          <Button variant="secondary" size="small" onPress={onActionPress}>
            {actionText}
          </Button>
        )}
      </XStack>
    </Card>
  );
};
