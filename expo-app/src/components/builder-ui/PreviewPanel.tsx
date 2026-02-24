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
import { COLOR_VALUES } from '../../config/colorThemes';
import { Search, Bell, Home, Plus, Heart, User } from 'lucide-react-native';

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
  const { opts, tokens, renderVersion, selectedTheme, customPrimaryColor, isDarkMode } = useDesignSystem();
  const [activeCategory, setActiveCategory] = useState<string | string[]>('foryou');
  const [activeNav, setActiveNav] = useState('home');

  // Get brand color for active states
  const brandColor =
    selectedTheme === 'custom' && customPrimaryColor
      ? customPrimaryColor
      : COLOR_VALUES[selectedTheme] || '#1abc9c';

  // Icon colors for dark mode
  const iconColor = isDarkMode ? '#e1e1e1' : '#1a1a1a';
  const inactiveIconColor = isDarkMode ? '#6b7280' : '#6b7280';

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
              <Search size={22} color={iconColor} strokeWidth={2} />
            </Pressable>
            <Pressable className="w-9 h-9 items-center justify-center rounded-full active:bg-surface-secondary">
              <Bell size={22} color={iconColor} strokeWidth={2} />
            </Pressable>
          </View>
        }
      />

      {/* Content — consistent 16px horizontal padding throughout */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: tokens.space[2] }}
      >
        {/* Category Pills */}
        <View className="py-3">
          <CategoryPills
            items={categories}
            value={activeCategory}
            onValueChange={setActiveCategory}
          />
        </View>

        {/* Hero Card — gradient image + text card (matches old builder) */}
        <View className="px-4 pb-3">
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
                className="items-center active:opacity-80 py-2 w-full"
                style={{
                  backgroundColor: `rgb(${tokens.brand})`,
                  borderRadius: parseInt(tokens.radius.full) || 9999,
                  marginTop: tokens.space[0] / 2,
                }}
              >
                <Text className="text-sm font-medium text-white">Explore Now</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View
          className="flex-row px-4 pb-3"
          style={{
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

        {/* Missing Circular Actions */}
        <View style={{ paddingTop: tokens.space[2] }}>
          <View className="flex-row justify-around mb-[-24px]">
            <View className="w-[84px] h-[84px] rounded-full border border-border items-center pt-4 bg-surface shadow-sm" style={{ borderWidth: 1 }}>
              <Text className="text-2xl text-on-surface">〽</Text>
            </View>
            <View className="w-[84px] h-[84px] rounded-full border border-border items-center pt-4 bg-surface shadow-sm" style={{ borderWidth: 1 }}>
              <Text className="text-2xl text-on-surface">♡</Text>
            </View>
            <View className="w-[84px] h-[84px] rounded-full border border-border items-center pt-4 bg-surface shadow-sm" style={{ borderWidth: 1 }}>
              <Text className="text-2xl text-on-surface">◷</Text>
            </View>
          </View>
        </View>

        {/* Layout Spacer */}
        <View style={{ height: 40 }} />

      </ScrollView>

      {/* Bottom Nav — 5 tabs */}
      {opts.menuLayout === 'bottomBar' && (
        <BottomNav
          items={[
            { value: 'home', label: 'Home', icon: (active: boolean) => <Home size={24} color={active ? brandColor : inactiveIconColor} strokeWidth={2} /> },
            { value: 'search', label: 'Search', icon: (active: boolean) => <Search size={24} color={active ? brandColor : inactiveIconColor} strokeWidth={2} /> },
            { value: 'create', label: 'Create', icon: (active: boolean) => <Plus size={24} color={active ? brandColor : inactiveIconColor} strokeWidth={2} /> },
            { value: 'activity', label: 'Activity', icon: (active: boolean) => <Heart size={24} color={active ? brandColor : inactiveIconColor} strokeWidth={2} />, badge: 0 },
            { value: 'profile', label: 'Profile', icon: (active: boolean) => <User size={24} color={active ? brandColor : inactiveIconColor} strokeWidth={2} /> },
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
          className="w-[320px] h-[640px] rounded-[32px] overflow-hidden bg-surface"
          style={{
            maxHeight: '90%',
            borderWidth: 1.5,
            borderColor: '#E5E7EB',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          {/* Status bar — realistic icons */}
          <View
            className="h-10 bg-surface flex-row items-center justify-between px-4"
          >
            <Text className="text-xs font-semibold text-on-surface">9:41</Text>
            <View className="flex-row items-center gap-1.5">
              {/* Signal bars */}
              <View className="flex-row items-end gap-[1px]">
                <View className="w-[3px] h-[6px] bg-on-surface/80 rounded-[0.5px]" />
                <View className="w-[3px] h-[8px] bg-on-surface/80 rounded-[0.5px]" />
                <View className="w-[3px] h-[10px] bg-on-surface/80 rounded-[0.5px]" />
                <View className="w-[3px] h-[12px] bg-on-surface/80 rounded-[0.5px]" />
              </View>
              {/* WiFi icon */}
              <View className="w-4 h-3 items-center justify-end">
                <View className="w-3 h-[2px] bg-on-surface/80 rounded-full mb-[1px]" />
                <View className="w-2 h-[2px] bg-on-surface/80 rounded-full" />
              </View>
              {/* Battery icon */}
              <View className="flex-row items-center gap-[1px]">
                <View className="w-[22px] h-[11px] border-[1.5px] border-on-surface/80 rounded-[3px] justify-center px-[2px]">
                  <View className="w-full h-[5px] bg-on-surface/80 rounded-[1px]" />
                </View>
                <View className="w-[1.5px] h-[4px] bg-on-surface/80 rounded-r-[1px]" />
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
