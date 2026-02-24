import { Plus } from 'lucide-react';
import { YStack } from '../components/Stack';
import { Card } from '../components/Card';
import { H3, Caption } from '../components/Text';
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
    <Card variant="default" padding="medium" style={{ width: 140 }}>
      <YStack alignItems="center" gap="$3">
        <Avatar size="large">
          <AvatarImage src={avatar} />
          <AvatarFallback backgroundColor="$brand">
            <Text color="white">{initials}</Text>
          </AvatarFallback>
        </Avatar>
        
        <YStack alignItems="center" gap="$0.5">
          <H3 size="$5" margin={0} textAlign="center">{name}</H3>
          <Caption color="$success" fontWeight="600">{status}</Caption>
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
