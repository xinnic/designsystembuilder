import { XStack, YStack, Circle } from 'tamagui';
import { Card } from '../components/Card';
import { H3, Caption } from '../components/Text';
import { Button } from '../components/Button';

interface UserCardProps {
  name: string;
  status?: string;
  avatarColor?: string;
  onActionPress?: () => void;
  actionText?: string;
}

/**
 * UserCard - User profile card with avatar, name, status, and action button
 *
 * @example
 * <UserCard
 *   name="Sarah J."
 *   status="Active now"
 *   avatarColor="#3498db"
 *   actionText="Follow"
 *   onActionPress={() => {}}
 * />
 */
export const UserCard = ({
  name,
  status,
  avatarColor = '#3498db',
  onActionPress,
  actionText = 'Follow',
}: UserCardProps) => {
  // Get initials from name
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card variant="default" padding="medium">
      <XStack alignItems="center" justifyContent="space-between" gap="$3">
        {/* Left side - Avatar + Info */}
        <XStack alignItems="center" gap="$3" flex={1}>
          {/* Avatar */}
          <Circle
            size={48}
            backgroundColor={avatarColor}
            alignItems="center"
            justifyContent="center"
          >
            <H3 color="white" margin={0} fontSize="$3">
              {initials}
            </H3>
          </Circle>

          {/* Name + Status */}
          <YStack flex={1}>
            <H3 margin={0} fontSize="$3">
              {name}
            </H3>
            {status && <Caption color="$textSecondary">{status}</Caption>}
          </YStack>
        </XStack>

        {/* Right side - Action button */}
        {actionText && (
          <Button
            variant="secondary"
            size="small"
            onPress={onActionPress}
            paddingHorizontal="$3"
          >
            {actionText}
          </Button>
        )}
      </XStack>
    </Card>
  );
};
