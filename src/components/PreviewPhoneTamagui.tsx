import React from 'react';
import { YStack, XStack, ScrollView, Circle, Image } from 'tamagui';
import { useDesignSystem, useTokenCSS } from '../state/designSystem';
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

export const PreviewPhoneTamagui = () => {
  // Initialize token CSS binding to ensure theme updates
  useTokenCSS();

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
          boxShadow: 'var(--shadow-xl)',
          borderRadius: 'var(--radius-xl, 32px)',
          border: 'var(--border-width, 1px) solid var(--border-color)', // Ensure borders applied if needed
        }}
      >
        {/* Status Bar */}
        <XStack
          backgroundColor="$bgPrimary"
          paddingHorizontal="$4"
          paddingVertical="$1"
          justifyContent="space-between"
          alignItems="center"
        >
          <Caption fontSize={12} fontWeight="500" color="$textPrimary">
            9:41
          </Caption>
          <XStack gap="$1">
            <YStack
              width={16}
              height={12}
              borderColor="$textPrimary"
              borderWidth={1}
              borderRadius="$1"
            >
              <YStack
                width={8}
                height={6}
                backgroundColor="$textPrimary"
                marginLeft={2}
                marginTop={2}
                borderRadius={1}
              />
            </YStack>
          </XStack>
        </XStack>

        {/* App Header */}
        <XStack
          backgroundColor="$bgSecondary"
          paddingHorizontal="$4"
          paddingVertical="$3"
          zIndex={10}
          tag="header"
          style={{
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <YStack flex={1} gap="$3">
            {/* Logo and Title */}
            <XStack justifyContent="space-between" alignItems="center">
              <XStack alignItems="center" gap="$3">
                {opts.logo && (
                  <Image
                    source={{ uri: opts.logo }}
                    width={32}
                    height={32}
                    borderRadius="$1"
                    alt="App logo"
                  />
                )}
                <H2 color="$brand" fontSize={20} margin={0}>
                  Discover
                </H2>
              </XStack>
              <XStack gap="$2">
                <Button variant="ghost" size="small" padding="$2">
                  <Search size={20} color="rgb(var(--color-text-secondary))" />
                </Button>
                <Button variant="ghost" size="small" padding="$2">
                  <Bell size={20} color="rgb(var(--color-text-secondary))" />
                </Button>
              </XStack>
            </XStack>

            {/* Category Pills */}
            <XStack gap="$2" overflow="hidden">
              {['For You', 'Trending', 'News', 'Sports', 'Tech'].map((cat, idx) => (
                <Button
                  key={cat}
                  variant={idx === 0 ? 'primary' : 'secondary'}
                  size="small"
                  paddingHorizontal="$4"
                  paddingVertical="$1"
                  borderRadius="$4"
                >
                  <Caption
                    color={idx === 0 ? 'white' : '$brand'}
                    fontSize={14}
                    fontWeight="600"
                  >
                    {cat}
                  </Caption>
                </Button>
              ))}
            </XStack>
          </YStack>
        </XStack>

        {/* Scrollable Content */}
        <ScrollView flex={1}>
          <YStack padding="$4" gap="$4">
            {/* Hero Card with Gradient */}
            <Card
              variant="elevated"
              padding="none"
              style={{
                boxShadow: 'var(--card-shadow)',
                borderRadius: 'var(--card-radius)',
                border: 'var(--card-border-width, 1px) solid var(--border-color)'
              }}
            >
              <YStack
                height={128}
                backgroundColor="linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)"
                style={{
                  background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
                }}
              />
              <YStack padding="$4" gap="$3">
                <H3 margin={0}>Featured Today</H3>
                <Body color="$textSecondary">
                  Discover what's trending in your community
                </Body>
                <Button variant="primary" fullWidth>
                  Explore Now
                </Button>
              </YStack>
            </Card>

            {/* Stats Row */}
            <XStack gap="$2">
              <StatsCard
                icon={<TrendingUp size={14} color="rgb(var(--color-success))" />}
                value="124"
                label="Posts"
              />
              <StatsCard
                icon={<Heart size={14} color="rgb(var(--color-danger))" />}
                value="2.3k"
                label="Likes"
              />
              <StatsCard
                icon={<Clock size={14} color="rgb(var(--color-info))" />}
                value="3.5h"
                label="Time"
              />
            </XStack>

            {/* List Items */}
            <Card
              variant="elevated"
              padding="none"
              overflow="hidden"
              style={{
                boxShadow: 'var(--card-shadow)',
                borderRadius: 'var(--card-radius)',
                border: 'var(--card-border-width, 1px) solid var(--border-color)'
              }}
            >
              {[
                {
                  icon: <MapPin size={18} />,
                  title: 'Location Services',
                  subtitle: 'While using app',
                },
                {
                  icon: <Bell size={18} />,
                  title: 'Notifications',
                  subtitle: 'Push, Email',
                },
                {
                  icon: <Settings size={18} />,
                  title: 'Preferences',
                  subtitle: 'Customize your experience',
                },
              ].map((item, idx) => (
                <XStack
                  key={item.title}
                  padding="$4"
                  alignItems="center"
                  gap="$3"
                  borderBottomWidth={idx !== 2 ? 1 : 0}
                  borderBottomColor="$bgPrimary"
                >
                  <YStack color="$textSecondary">{item.icon}</YStack>
                  <YStack flex={1}>
                    <Body fontWeight="600">{item.title}</Body>
                    <Caption color="$textSecondary">{item.subtitle}</Caption>
                  </YStack>
                  <ChevronRight size={16} color="rgb(var(--color-text-secondary))" />
                </XStack>
              ))}
            </Card>

            {/* User Cards */}
            <XStack gap="$3">
              <YStack flex={1}>
                <UserCard
                  name="Sarah J."
                  status="Active now"
                  avatarColor="rgb(var(--color-brand))"
                  actionText="Follow"
                  layout="vertical"
                />
              </YStack>
              <YStack flex={1}>
                <UserCard
                  name="Mike D."
                  status="Active now"
                  avatarColor="rgb(var(--color-info))"
                  actionText="Follow"
                  layout="vertical"
                />
              </YStack>
            </XStack>

            {/* Action Buttons */}
            <XStack gap="$2">
              <YStack flex={1}>
                <Button variant="primary" fullWidth>
                  Get Started
                </Button>
              </YStack>
              <YStack flex={1}>
                <Button variant="secondary" fullWidth>
                  Learn More
                </Button>
              </YStack>
            </XStack>

            {/* Review Card */}
            <Card
              variant="elevated"
              padding="$4"
              style={{
                boxShadow: 'var(--card-shadow)',
                borderRadius: 'var(--card-radius)',
                border: 'var(--card-border-width, 1px) solid var(--border-color)'
              }}
            >
              <YStack gap="$3">
                <XStack justifyContent="space-between" alignItems="flex-start">
                  <YStack gap="$1">
                    <H3 fontSize={16} margin={0}>
                      Great Experience
                    </H3>
                    <XStack gap="$1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill="#facc15"
                          color="#facc15"
                        />
                      ))}
                    </XStack>
                  </YStack>
                  <Caption fontSize={12}>2h ago</Caption>
                </XStack>

                <Body color="$textSecondary" fontSize={14}>
                  "Amazing app with beautiful design and smooth performance. Highly
                  recommended!"
                </Body>

                <XStack gap="$3">
                  <Button variant="ghost" size="small" padding="$2">
                    <XStack gap="$1" alignItems="center">
                      <Heart size={14} color="rgb(var(--color-text-secondary))" />
                      <Caption>24</Caption>
                    </XStack>
                  </Button>
                  <Button variant="ghost" size="small" padding="$2">
                    <XStack gap="$1" alignItems="center">
                      <MessageCircle
                        size={14}
                        color="rgb(var(--color-text-secondary))"
                      />
                      <Caption>5</Caption>
                    </XStack>
                  </Button>
                  <Button variant="ghost" size="small" padding="$2">
                    <Share2 size={14} color="rgb(var(--color-text-secondary))" />
                  </Button>
                </XStack>
              </YStack>
            </Card>
          </YStack>
        </ScrollView>

        {/* Bottom Navigation */}
        {opts.menuLayout === 'bottomBar' && (
          <BottomNav
            items={[
              { id: 'home', label: 'Home', icon: <Home size={22} /> },
              { id: 'search', label: 'Search', icon: <Search size={22} /> },
              { id: 'create', label: 'Create', icon: <PlusCircle size={22} /> },
              { id: 'activity', label: 'Activity', icon: <Heart size={22} /> },
              { id: 'profile', label: 'Profile', icon: <User size={22} /> },
            ]}
            activeId="home"
          />
        )}
      </YStack>
    </div>
  );
};