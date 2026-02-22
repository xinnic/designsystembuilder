/**
 * PreviewPanel — Builder UI (NativeWind)
 *
 * Phone mockup preview showing live-themed composed components.
 * All components react to CSS variable changes via useTokenSystem.
 * On wide screens: phone frame border. On narrow: full bleed.
 */

import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { cn } from '@/lib/utils';
import { useDesignSystem } from '../../state/designSystem';

// Composed components
import { AppBar } from '../composed/AppBar';
import { CategoryPills } from '../composed/CategoryPills';
import { FeedCard } from '../composed/FeedCard';
import { UserCard } from '../composed/UserCard';
import { BottomNav } from '../composed/BottomNav';

// Core components for filler content
import { Body } from '../ui/Text';

interface PreviewPanelProps {
  className?: string;
  showFrame?: boolean;
}

export function PreviewPanel({ className, showFrame = true }: PreviewPanelProps) {
  const { opts, renderVersion } = useDesignSystem();
  const [activeCategory, setActiveCategory] = useState<string | string[]>('all');
  const [activeNav, setActiveNav] = useState('home');

  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Popular', value: 'popular' },
    { label: 'New', value: 'new' },
    { label: 'Trending', value: 'trending' },
    { label: 'For You', value: 'foryou' },
  ];

  const phoneContent = (
    <View key={renderVersion} className="flex-1 bg-canvas">
      {/* App Bar */}
      <AppBar
        title="Discover"
        variant="default"
      />

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-4"
      >
        {/* Category Pills */}
        <View className="px-4 py-3">
          <CategoryPills
            items={categories}
            value={activeCategory}
            onValueChange={setActiveCategory}
          />
        </View>

        {/* Feed Card */}
        <View className="px-4 pb-3">
          <FeedCard
            image="https://picsum.photos/seed/preview1/400/200"
            title="Getting Started with Design Systems"
            description="Learn the fundamentals of building scalable design systems for your team."
            author={{
              name: 'Alex Chen',
              avatar: 'https://picsum.photos/seed/avatar1/100/100',
            }}
            variant="hero"
          />
        </View>

        {/* User Card */}
        <View className="px-4 pb-3">
          <UserCard
            name="Sarah Miller"
            role="Product Designer"
            avatar="https://picsum.photos/seed/avatar2/100/100"
          />
        </View>

        {/* Second Feed Card */}
        <View className="px-4 pb-3">
          <FeedCard
            image="https://picsum.photos/seed/preview2/400/200"
            title="NativeWind Best Practices"
            description="Tips and patterns for building cross-platform components."
            author={{
              name: 'Jordan Lee',
              avatar: 'https://picsum.photos/seed/avatar3/100/100',
            }}
          />
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      {opts.menuLayout === 'bottomBar' && (
        <BottomNav
          items={[
            { value: 'home', label: 'Home', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>🏠</Body> },
            { value: 'search', label: 'Search', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>🔍</Body> },
            { value: 'inbox', label: 'Inbox', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>💬</Body>, badge: 3 },
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
          className="w-[375px] h-[812px] rounded-[40px] border-4 border-on-surface/20 overflow-hidden shadow-lg bg-surface"
          style={{ maxHeight: '90%' }}
        >
          {/* Status bar area */}
          <View className="h-12 bg-surface items-center justify-center">
            <View className="w-20 h-6 rounded-full bg-on-surface/10" />
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
