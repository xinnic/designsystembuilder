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
              <Text className="text-on-surface-secondary text-xl">⌕</Text>
            </Pressable>
            <Pressable className="w-9 h-9 items-center justify-center rounded-full active:bg-surface-secondary">
              <Text className="text-on-surface-secondary text-xl">🔔</Text>
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
                className="self-start items-center active:opacity-80 px-6"
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
            { value: 'home', label: 'Home', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>⌂</Body> },
            { value: 'search', label: 'Search', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>⌕</Body> },
            { value: 'create', label: 'Create', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>+</Body> },
            { value: 'activity', label: 'Activity', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>♡</Body>, badge: 0 },
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
          className="w-[320px] h-[640px] rounded-[32px] border border-on-surface/5 overflow-hidden shadow-sm bg-surface"
          style={{ maxHeight: '90%' }}
        >
          {/* Status bar — simple text icons like old builder */}
          <View
            className="h-10 bg-surface flex-row items-center justify-between"
            style={{ paddingHorizontal: tokens.space[2] }}
          >
            <Text className="text-xs font-semibold text-on-surface">9:41</Text>
            <View className="flex-row items-center gap-1.5 opacity-60">
              <Text className="text-[10px] text-on-surface tracking-tighter">||||</Text>
              <Text className="text-[10px] text-on-surface">ᯤ</Text>
              <View className="w-5 h-2.5 border border-on-surface rounded-[3px] justify-center px-0.5 flex-row items-center" style={{ borderWidth: 1 }}>
                <View className="w-3 h-1 bg-on-surface rounded-[1px]" />
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
