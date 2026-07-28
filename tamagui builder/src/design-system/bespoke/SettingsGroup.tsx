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
    <Card variant="default" density="none">
      <YStack>
        {items.map((item, index) => (
          <YStack key={index}>
            <ListItem
              title={item.title}
              subTitle={item.subTitle}
              icon={item.icon}
              // The card already supplies the surface — rows sit on it, and the
              // CSS variable holds a bare "R G B" triplet so it needs rgb().
              backgroundColor="transparent"
              borderRadius={0}
              iconAfter={<ChevronRight size={16} color="rgb(var(--color-text-secondary))" />}
              onPress={item.onPress}
            />
            {index < items.length - 1 && <Separator borderColor="$border" />}
          </YStack>
        ))}
      </YStack>
    </Card>
  );
};
