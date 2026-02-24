import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { Card } from '../components/Card';
import { YStack } from '../components/Stack';
import { ListItem } from '../components/ListItem';
import { Separator } from 'tamagui';

interface SettingsItem {
  icon: ReactNode;
  title: string;
  subTitle?: string;
  onPress?: () => void;
}

interface SettingsGroupProps {
  items: SettingsItem[];
}

export const SettingsGroup = ({ items }: SettingsGroupProps) => {
  return (
    <Card variant="elevated" padding="none">
      <YStack>
        {items.map((item, index) => (
          <YStack key={index}>
            <ListItem
              title={item.title}
              subTitle={item.subTitle}
              icon={item.icon}
              iconAfter={<ChevronRight size={16} color="var(--color-text-secondary)" />}
              onPress={item.onPress}
            />
            {index < items.length - 1 && <Separator borderColor="$border" />}
          </YStack>
        ))}
      </YStack>
    </Card>
  );
};
