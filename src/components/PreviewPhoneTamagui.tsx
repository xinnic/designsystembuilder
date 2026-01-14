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
} from '../design-system/bespoke';

const PreviewPhoneTamaguiComponent = () => {
  // useTokenCSS() removed - handled by TamaguiProvider in Index.tsx

  const { opts, selectedPrimaryFont, isDarkMode } = useDesignSystem();

  return (
    <div className={`h-full flex items-start justify-center p-8 min-h-[600px] ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <YStack
        className={selectedPrimaryFont}
        backgroundColor="$bgPrimary"
        width={320}
        height={640}
        overflow="hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // Fixed shadow instead of var
          borderRadius: 32,
          borderWidth: 1,
          borderColor: isDarkMode ? '#333' : '#e5e5e5',
        }}
      >
        {/* Status Bar */}
        <XStack
          height={44}
          paddingHorizontal="$4"
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="$bgPrimary"
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
          <YStack space="$4" paddingBottom={80}>
            {/* App Bar */}
            <AppBar />

            {/* Stories / Highlights */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} paddingHorizontal="$4">
              <XStack space="$3">
                <StoryItem image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" name="Your Story" isUser />
                <StoryItem image="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" name="Sarah" hasStory />
                <StoryItem image="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop" name="Mike" hasStory />
                <StoryItem image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" name="Anna" />
                <StoryItem image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" name="James" />
              </XStack>
            </ScrollView>

            {/* Featured Section */}
            <YStack paddingHorizontal="$4" space="$3">
              <XStack justifyContent="space-between" alignItems="center">
                <H2 size="$5">Trending Now</H2>
                <Button variant="ghost" size="small" icon={<ChevronRight size={16} />}>See All</Button>
              </XStack>
              <HeroCard />
            </YStack>

            {/* Categories */}
            <YStack paddingHorizontal="$4" space="$2">
              <H3>Categories</H3>
              <CategoryPills
                categories={[
                  { id: '1', label: 'For You' },
                  { id: '2', label: 'Trending' },
                  { id: '3', label: 'Design' },
                  { id: '4', label: 'Tech' },
                  { id: '5', label: 'Lifestyle' },
                ]}
                activeId="1"
              />
            </YStack>

            {/* Stats Overview */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} paddingHorizontal="$4">
              <XStack space="$3">
                <StatsCard
                  title="Total Views"
                  value="24.5k"
                  change="+12%"
                  icon={<TrendingUp size={16} color="white" />}
                  accent="primary"
                />
                <StatsCard
                  title="Likes"
                  value="8.2k"
                  change="+5%"
                  icon={<Heart size={16} color="white" />}
                  accent="secondary"
                />
                <StatsCard
                  title="Time"
                  value="14h"
                  change="-2%"
                  icon={<Clock size={16} color="white" />}
                  accent="tertiary"
                />
              </XStack>
            </ScrollView>

            {/* Feed Section */}
            <YStack paddingHorizontal="$4" space="$3">
              <H3>Your Feed</H3>
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
              <UserCard
                name="Jessica Lee"
                handle="@jesslee"
                avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop"
                content="Minimalism is not about having less. It's about making room for more of what matters. 🤍"
                likes={89}
                comments={12}
                time="5h ago"
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
    </div>
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

const StoryItem = ({ image, name, isUser, hasStory }: { image: string; name: string; isUser?: boolean; hasStory?: boolean }) => (
  <YStack alignItems="center" space="$2">
    <Circle
      size={64}
      borderWidth={hasStory ? 2 : 0}
      borderColor="$brand"
      padding={hasStory ? 2 : 0}
    >
      <Image
        source={{ uri: image }}
        width="100%"
        height="100%"
        borderRadius={32}
        style={{ width: '100%', height: '100%' }}
      />
      {isUser && (
        <Circle
          size={20}
          backgroundColor="$brand"
          position="absolute"
          bottom={0}
          right={0}
          borderWidth={2}
          borderColor="$bgPrimary"
          alignItems="center"
          justifyContent="center"
        >
          <PlusCircle size={12} color="white" />
        </Circle>
      )}
    </Circle>
    <Caption fontSize={11}>{name}</Caption>
  </YStack>
);

export const PreviewPhoneTamagui = memo(PreviewPhoneTamaguiComponent);