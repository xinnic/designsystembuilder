/**
 * PreviewPanel — Builder UI (NativeWind)
 *
 * Phone mockup preview showing live-themed composed components.
 * All components react to CSS variable changes via useTokenSystem.
 * On wide screens: phone frame border. On narrow: full bleed.
 */

import React, { useState } from 'react';
import { View, ScrollView, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';
import { useDesignSystem } from '../../state/designSystem';

// Composed components
import { AppBar } from '../composed/AppBar';
import { CategoryPills } from '../composed/CategoryPills';
import { StatsCard } from '../composed/StatsCard';
import { SettingsGroup } from '../composed/SettingsGroup';
import { ProfileCard } from '../composed/ProfileCard';
import { ReviewCard } from '../composed/ReviewCard';
import { UserCard } from '../composed/UserCard';
import { BottomNav } from '../composed/BottomNav';

// Core components
import { Body, Caption } from '../ui/Text';

interface PreviewPanelProps {
  className?: string;
  showFrame?: boolean;
}

export function PreviewPanel({ className, showFrame = true }: PreviewPanelProps) {
  const { opts, tokens, renderVersion } = useDesignSystem();
  const [activeCategory, setActiveCategory] = useState<string | string[]>('foryou');
  const [activeNav, setActiveNav] = useState('home');

  const categories = [
    { label: 'For You', value: 'foryou' },
    { label: 'Trending', value: 'trending' },
    { label: 'News', value: 'news' },
    { label: 'Design', value: 'design' },
    { label: 'Tech', value: 'tech' },
  ];

  const phoneContent = (
    <View key={renderVersion} className="flex-1 bg-canvas">
      {/* App Bar — with hamburger menu (if menuLayout is hamburger) + search + notification */}
      <AppBar
        title="Discover"
        variant="default"
        leading={
          opts.menuLayout === 'hamburger' ? (
            <Pressable className="w-9 h-9 items-center justify-center rounded-full active:bg-surface-secondary">
              <Text className="text-on-surface-secondary text-lg">☰</Text>
            </Pressable>
          ) : undefined
        }
        actions={
          <View className="flex-row gap-1">
            <Pressable className="w-9 h-9 items-center justify-center rounded-full active:bg-surface-secondary">
              <Text className="text-on-surface-secondary text-base">🔍</Text>
            </Pressable>
            <Pressable className="w-9 h-9 items-center justify-center rounded-full active:bg-surface-secondary">
              <Text className="text-on-surface-secondary text-base">🔔</Text>
            </Pressable>
          </View>
        }
      />

      {/* Content — spacing values from tokens for reactivity */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: tokens.space[2] }}
      >
        {/* Category Pills */}
        <View style={{ paddingHorizontal: tokens.space[1], paddingVertical: tokens.space[0] }}>
          <CategoryPills
            items={categories}
            value={activeCategory}
            onValueChange={setActiveCategory}
          />
        </View>

        {/* Hero Card — gradient image + text card (matches old builder) */}
        <View style={{ paddingHorizontal: tokens.space[1], paddingBottom: tokens.space[0] }}>
          <View className="rounded-lg overflow-hidden bg-surface border border-border shadow-sm">
            {/* Gradient image area — uses inline style for brand color gradient */}
            <View
              className="h-32"
              style={{ backgroundColor: `rgb(${tokens.brand})`, opacity: 0.85 }}
            />
            {/* Text content */}
            <View style={{ padding: tokens.space[1], gap: tokens.space[0] }}>
              <Text className="text-base font-bold text-on-surface">Featured Today</Text>
              <Text className="text-sm text-on-surface-secondary">
                Discover what's trending in your community
              </Text>
              <Pressable
                className="self-stretch items-center active:opacity-80"
                style={{
                  backgroundColor: `rgb(${tokens.brand})`,
                  borderRadius: parseInt(tokens.radius.full) || 9999,
                  marginTop: tokens.space[0] / 2,
                  paddingVertical: tokens.space[0],
                }}
              >
                <Text className="text-sm font-medium text-white">Explore Now</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View
          className="flex-row"
          style={{
            paddingHorizontal: tokens.space[1],
            paddingBottom: tokens.space[0],
            gap: tokens.space[0],
          }}
        >
          <StatsCard
            value="124"
            label="Posts"
            variant="compact"
            className="flex-1"
          />
          <StatsCard
            value="2.3k"
            label="Likes"
            variant="compact"
            className="flex-1"
          />
          <StatsCard
            value="3.5h"
            label="Time"
            variant="compact"
            className="flex-1"
          />
        </View>

        {/* Settings Section */}
        <View style={{ paddingHorizontal: tokens.space[1], paddingBottom: tokens.space[0] }}>
          <Caption
            className="font-semibold text-on-surface"
            style={{ marginBottom: tokens.space[0] }}
          >
            Settings
          </Caption>
          <SettingsGroup
            items={[
              {
                label: 'Notifications',
                icon: <Text>🔔</Text>,
                type: 'toggle',
                value: true,
              },
              {
                label: 'Dark Mode',
                icon: <Text>🌙</Text>,
                type: 'toggle',
                value: false,
              },
              {
                label: 'Privacy',
                icon: <Text>🔒</Text>,
                type: 'navigation',
              },
            ]}
          />
        </View>

        {/* Suggested People */}
        <View style={{ paddingBottom: tokens.space[0] }}>
          <Caption
            className="font-semibold text-on-surface"
            style={{ marginBottom: tokens.space[0], paddingHorizontal: tokens.space[1] }}
          >
            Suggested People
          </Caption>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: tokens.space[1],
              gap: tokens.space[0],
            }}
          >
            <ProfileCard
              variant="default"
              name="Alex Chen"
              username="alexchen"
              avatar="https://picsum.photos/seed/p1/100/100"
              avatarSize="lg"
              className="w-[160px]"
            />
            <ProfileCard
              variant="default"
              name="Maya Patel"
              username="mayap"
              avatar="https://picsum.photos/seed/p2/100/100"
              avatarSize="lg"
              className="w-[160px]"
            />
            <ProfileCard
              variant="default"
              name="Sam Rivera"
              username="samr"
              avatar="https://picsum.photos/seed/p3/100/100"
              avatarSize="lg"
              className="w-[160px]"
            />
          </ScrollView>
        </View>

        {/* Review Card */}
        <View style={{ paddingHorizontal: tokens.space[1], paddingBottom: tokens.space[0] }}>
          <ReviewCard
            rating={4.5}
            title="Amazing experience"
            review="The design system makes it incredibly easy to maintain consistency across all our products. Highly recommend!"
            author="Jordan Lee"
            avatar="https://picsum.photos/seed/r1/100/100"
            date="2 days ago"
            verified
            helpfulCount={12}
          />
        </View>

        {/* Your Feed */}
        <View style={{ paddingHorizontal: tokens.space[1], paddingBottom: tokens.space[0] }}>
          <Caption
            className="font-semibold text-on-surface"
            style={{ marginBottom: tokens.space[0] }}
          >
            Your Feed
          </Caption>
          <UserCard
            name="Sarah Miller"
            role="Product Designer"
            avatar="https://picsum.photos/seed/avatar2/100/100"
          />
        </View>
      </ScrollView>

      {/* Bottom Nav — 5 tabs */}
      {opts.menuLayout === 'bottomBar' && (
        <BottomNav
          items={[
            { value: 'home', label: 'Home', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>🏠</Body> },
            { value: 'search', label: 'Search', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>🔍</Body> },
            { value: 'create', label: 'Create', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>➕</Body> },
            { value: 'activity', label: 'Activity', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>❤️</Body>, badge: 3 },
            { value: 'profile', label: 'Profile', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>👤</Body> },
          ]}
          value={activeNav}
          onValueChange={setActiveNav}
          variant="filled"
        />
      )}
    </View>
  );

  if (showFrame) {
    return (
      <View className={cn('flex-1 items-center justify-center bg-canvas p-8', className)}>
        {/* Phone frame */}
        <View
          className="w-[320px] h-[640px] rounded-[32px] border border-on-surface/20 overflow-hidden shadow-lg bg-surface"
          style={{ maxHeight: '90%' }}
        >
          {/* Status bar — simple text icons like old builder */}
          <View
            className="h-10 bg-surface flex-row items-center justify-between"
            style={{ paddingHorizontal: tokens.space[2] }}
          >
            <Text className="text-xs font-semibold text-on-surface">9:41</Text>
            <View className="flex-row items-center gap-1.5">
              <Text className="text-[10px] text-on-surface">▂▄▆█</Text>
              <Text className="text-[10px] text-on-surface">♥</Text>
              <View className="w-5 h-2.5 border border-on-surface rounded-sm justify-center px-0.5">
                <View className="w-2.5 h-1.5 bg-on-surface rounded-[1px]" />
              </View>
            </View>
          </View>
          {phoneContent}
        </View>
      </View>
    );
  }

  return (
    <View className={cn('flex-1', className)}>
      {phoneContent}
    </View>
  );
}
