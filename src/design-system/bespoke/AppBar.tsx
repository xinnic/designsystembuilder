import { Image } from 'tamagui';
import { XStack } from '../components/Stack';
import { H2 } from '../components/Text';
import { Button } from '../components/Button';
import { Search, Bell, Menu as MenuIcon } from 'lucide-react';

interface AppBarProps {
  title?: string;
  logo?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showMenu?: boolean;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  onMenuPress?: () => void;
}

/**
 * AppBar - Top navigation bar for mobile apps
 *
 * Features:
 * - Optional logo image
 * - Title text
 * - Search, notification, and menu icons
 * - Customizable action buttons
 *
 * @example
 * <AppBar
 *   title="Discover"
 *   logo={logoUrl}
 *   showSearch
 *   showNotifications
 * />
 */
export const AppBar = ({
  title = 'App',
  logo,
  showSearch = true,
  showNotifications = true,
  showMenu = false,
  onSearchPress,
  onNotificationPress,
  onMenuPress,
}: AppBarProps) => {
  return (
    <XStack
      backgroundColor="$bgPrimary"
      paddingHorizontal="$4"
      paddingVertical="$3"
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor="$border"
      tag="header"
    >
      {/* Left side - Menu + Logo/Title */}
      <XStack alignItems="center" gap="$3" flex={1}>
        {showMenu && (
          <Button
            variant="ghost"
            size="small"
            padding="$2"
            onPress={onMenuPress}
            accessibilityLabel="Open menu"
          >
            <MenuIcon size={20} />
          </Button>
        )}

        {logo && (
          <Image
            source={{ uri: logo }}
            width={32}
            height={32}
            borderRadius="$1"
            alt="App logo"
          />
        )}

        <H2 margin={0}>{title}</H2>
      </XStack>

      {/* Right side - Actions */}
      <XStack alignItems="center" gap="$2">
        {showSearch && (
          <Button
            variant="ghost"
            size="small"
            padding="$2"
            onPress={onSearchPress}
            accessibilityLabel="Search"
          >
            <Search size={20} />
          </Button>
        )}

        {showNotifications && (
          <Button
            variant="ghost"
            size="small"
            padding="$2"
            onPress={onNotificationPress}
            accessibilityLabel="Notifications"
          >
            <Bell size={20} />
          </Button>
        )}
      </XStack>
    </XStack>
  );
};
