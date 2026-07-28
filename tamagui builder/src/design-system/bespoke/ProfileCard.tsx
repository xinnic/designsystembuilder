import { Circle } from 'tamagui';
import { YStack, XStack } from '../components/Stack';
import { Card } from '../components/Card';
import { Body, Caption } from '../components/Text';
import { Avatar, AvatarImage, AvatarFallback } from '../components/Avatar';
import { Button } from '../components/Button';
import { Text } from 'tamagui';

interface ProfileCardProps {
  name: string;
  handle?: string;
  status: string;
  avatar: string;
  initials: string;
  onFollow?: () => void;
}

export const ProfileCard = ({
  name,
  status,
  avatar,
  initials,
  onFollow,
}: ProfileCardProps) => {
  return (
    <Card variant="default" density="medium" width={152}>
      <YStack alignItems="center" gap="$3">
        <Avatar size="large">
          <AvatarImage src={avatar} />
          <AvatarFallback backgroundColor="$brand">
            <Text color="white" fontWeight="600">{initials}</Text>
          </AvatarFallback>
        </Avatar>

        <YStack alignItems="center" gap="$1">
          <Body fontWeight="600" margin={0} textAlign="center" numberOfLines={1}>
            {name}
          </Body>
          {/* Presence reads as a quiet status line, not a second headline */}
          <XStack alignItems="center" gap="$1">
            <Circle size={6} backgroundColor="$success" />
            <Caption color="$textSecondary">{status}</Caption>
          </XStack>
        </YStack>

        <Button
          variant="secondary"
          size="small"
          fullWidth
          onPress={onFollow}
        >
          Follow
        </Button>
      </YStack>
    </Card>
  );
};
