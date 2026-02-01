import React, { memo } from 'react';
import { YStack, XStack, ScrollView, Circle, Image } from 'tamagui';
import { useDesignSystem } from '../state/designSystem';
import {
  Home,
  Search,
  PlusCircle,
  Heart,
  User,
  MapPin,
  TrendingUp,
  Clock,
  ChevronRight,
  Bell,
  Settings,
  MessageCircle,
  Share2,
  Star,
  Activity,
  Shield,
  HelpCircle,
} from 'lucide-react';

// Import our design system components
import {
  Button,
  Card,
  H2,
  H3,
  Body,
  Caption,
} from '../design-system/components';
import {
  AppBar,
  CategoryPills,
  StatsCard,
  HeroCard,
  UserCard,
  BottomNav,
  ReviewCard,
  SettingsGroup,
  ProfileCard,
} from '../design-system/bespoke';

const PreviewPhoneTamaguiComponent = () => {
  const { isDarkMode, selectedPrimaryFont, opts, tokens } = useDesignSystem();

  return (
    <YStack 
      height="100%" 
      alignItems="center" 
      justifyContent="flex-start" 
      padding="$8" 
      minHeight={600} 
      backgroundColor={isDarkMode ? '$gray1' : '$gray2'} // approximating bg-gray-900 / 100
    >
      <YStack
        className={selectedPrimaryFont}
        backgroundColor="$bgPrimary"
        width={320}
        height={640}
        overflow="hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          borderRadius: 32,
          borderWidth: 1,
          borderColor: `rgb(${tokens.border})`,
        }}
      >
        {/* Status Bar */}
        <XStack
          height={44}
          paddingHorizontal="$4"
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="$bgPrimary"
          borderBottomWidth={1}
          borderBottomColor="$border"
        >
          <Caption fontSize={12} fontWeight="600">9:41</Caption>
          <XStack space="$1">
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </XStack>
        </XStack>

        {/* Content */}
        <ScrollView flex={1} backgroundColor="$bgPrimary">
          <YStack space="$5" paddingBottom={80}>
            {/* App Bar */}
            <AppBar title="Discover" logo={opts.logo} />

            {/* Categories Chips */}
            <YStack paddingBottom="$1">
              <CategoryPills
                categories={[
                  { id: '1', label: 'For You' },
                  { id: '2', label: 'Trending' },
                  { id: '3', label: 'News' },
                  { id: '4', label: 'Design' },
                  { id: '5', label: 'Tech' },
                ]}
                activeId="1"
              />
            </YStack>

            {/* Featured Section (Screenshot 2) */}
            <YStack paddingHorizontal="$4" space="$3">
              <HeroCard
                title="Featured Today"
                description="Discover what's trending in your community"
                ctaText="Explore Now"
                gradient
              />
            </YStack>

            {/* Metrics (Screenshot 2/1) */}
            <XStack paddingHorizontal="$4" space="$2">
              <StatsCard
                value="124"
                label="Posts"
                icon={<Activity size={16} color="var(--color)" />}
              />
              <StatsCard
                value="2.3k"
                label="Likes"
                icon={<Heart size={16} color="var(--color)" />}
              />
              <StatsCard
                value="3.5h"
                label="Time"
                icon={<Clock size={16} color="var(--color)" />}
              />
            </XStack>

            {/* Settings & Preferences (Screenshot 3) */}
            <YStack paddingHorizontal="$4" space="$3">
              <H2 size="$5" margin={0}>Settings</H2>
              <SettingsGroup
                items={[
                  { title: 'Location Services', subTitle: 'While using app', icon: <MapPin size={20} color="var(--color)" /> },
                  { title: 'Notifications', subTitle: 'Push, Email', icon: <Bell size={20} color="var(--color)" /> },
                  { title: 'Preferences', subTitle: 'Customize experience', icon: <Settings size={20} color="var(--color)" /> },
                ]}
              />
            </YStack>

            {/* Suggested People (Screenshot 3) */}
            <YStack paddingHorizontal="$4" space="$3">
              <H2 size="$5" margin={0}>Suggested People</H2>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} marginHorizontal="$-4" paddingHorizontal="$4">
                <XStack space="$3">
                  <ProfileCard
                    name="Sarah J."
                    status="Active now"
                    initials="SJ"
                    avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                  />
                  <ProfileCard
                    name="Mike D."
                    status="Active now"
                    initials="MD"
                    avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  />
                  <ProfileCard
                    name="Anna K."
                    status="2h ago"
                    initials="AK"
                    avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
                  />
                </XStack>
              </ScrollView>
            </YStack>

            {/* Reviews (Screenshot 4) */}
            <YStack paddingHorizontal="$4" space="$3">
               <H2 size="$5" margin={0}>Reviews</H2>
               <ReviewCard
                 title="Great Experience"
                 rating={5}
                 time="2h ago"
                 content="Amazing app with beautiful design and smooth performance. Highly recommended!"
                 likes={24}
                 comments={5}
               />
            </YStack>

            {/* Feed Section (Screenshot 1) */}
            <YStack paddingHorizontal="$4" space="$3">
              <H2 size="$5" margin={0}>Your Feed</H2>
              <UserCard
                name="Alex Morgan"
                handle="@alexm"
                avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                image="https://images.unsplash.com/photo-1621600411688-4be93cd68504?w=400&h=300&fit=crop"
                content="Just explored the new design district! The architecture is absolutely stunning. 🏙️✨ #design #architecture"
                likes={124}
                comments={18}
                time="2h ago"
              />
            </YStack>
          </YStack>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNav
          items={[
            { id: 'home', label: 'Home', icon: <Home size={20} /> },
            { id: 'search', label: 'Search', icon: <Search size={20} /> },
            { id: 'add', label: 'Create', icon: <PlusCircle size={20} /> },
            { id: 'activity', label: 'Activity', icon: <Heart size={20} /> },
            { id: 'profile', label: 'Profile', icon: <User size={20} /> },
          ]}
          activeId="home"
        />
      </YStack>
    </YStack>
  );
};

// UI Helpers (kept local for preview wrapper)
const SignalIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" style={{ opacity: 0.8 }}>
    <path d="M1 10H3V12H1V10ZM5 7H7V12H5V7ZM9 4H11V12H9V4ZM13 1H15V12H13V1Z" />
  </svg>
);

const WifiIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" style={{ opacity: 0.8 }}>
    <path d="M8 12L1.5 4.5C3.5 2.5 5.5 1.5 8 1.5C10.5 1.5 12.5 2.5 14.5 4.5L8 12Z" />
  </svg>
);

const BatteryIcon = () => (
  <svg width="20" height="12" viewBox="0 0 20 12" fill="currentColor" style={{ opacity: 0.8 }}>
    <path d="M2 3H16V9H2V3ZM0 1V11H18V1H0ZM19 4V8H20V4H19Z" />
  </svg>
);



export const PreviewPhoneTamagui = memo(PreviewPhoneTamaguiComponent);