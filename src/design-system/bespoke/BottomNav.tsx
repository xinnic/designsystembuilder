import { ReactNode } from 'react';
import { XStack, YStack } from '../components/Stack';
import { Button } from '../components/Button';
import { Caption } from '../components/Text';

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

interface BottomNavProps {
  items: NavItem[];
  activeId?: string;
  onItemPress?: (id: string) => void;
}

/**
 * BottomNav - Bottom navigation bar with icons and labels
 *
 * @example
 * <BottomNav
 *   items={[
 *     { id: 'home', label: 'Home', icon: <Home size={20} /> },
 *     { id: 'search', label: 'Search', icon: <Search size={20} /> },
 *   ]}
 *   activeId="home"
 * />
 */
export const BottomNav = ({ items, activeId, onItemPress }: BottomNavProps) => {
  return (
    <XStack
      backgroundColor="$bgPrimary"
      borderTopWidth={1}
      borderTopColor="$border"
      paddingVertical="$2"
      paddingHorizontal="$2"
      justifyContent="space-around"
      alignItems="center"
      tag="nav"
    >
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <Button
            key={item.id}
            variant="ghost"
            padding="$2"
            onPress={() => onItemPress?.(item.id)}
            flex={1}
            accessibilityLabel={item.label}
            accessibilityState={{ selected: isActive }}
          >
            <YStack alignItems="center" gap="$1">
              <YStack color={isActive ? '$brand' : '$textSecondary'}>
                {item.icon}
              </YStack>
              <Caption
                color={isActive ? '$brand' : '$textSecondary'}
                fontSize={10}
                fontWeight={isActive ? '600' : '400'}
              >
                {item.label}
              </Caption>
            </YStack>
          </Button>
        );
      })}
    </XStack>
  );
};
