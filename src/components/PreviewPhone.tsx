import React from 'react';
import { HeaderGreeting } from './preview/sections/HeaderGreeting';
import { PostCard } from './preview/sections/PostCard';
import { TrendingCarousel } from './preview/sections/TrendingCarousel';
import { NotifList } from './preview/sections/NotifList';
import { BannerCTA } from './preview/sections/BannerCTA';
import { AccountForm } from './preview/sections/AccountForm';
import { SettingsGroup } from './preview/sections/SettingsGroup';
import { BottomBarStatic } from './preview/sections/BottomBarStatic';

interface PreviewPhoneProps {
  baseLib?: "tailwind"; // Only Tailwind is supported
  fontClass?: string;
  selectedScale?: string;
  isDarkMode?: boolean;
  selectedTheme?: string;
}

const FilterChips = () => {
  const filters = ['Activity', 'Mood', 'Food', 'Sleep'];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map((filter, index) => (
        <button
          key={filter}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            index === 0
              ? 'bg-[rgb(var(--color-brand))] text-white'
              : 'bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-bg-secondary))]/80'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

const PhoneContent = ({ fontClass, selectedScale }: { 
  fontClass?: string; 
  selectedScale?: string; 
}) => (
  <div className={`flex-1 overflow-y-auto ${fontClass} scale-${selectedScale}`}>
    {/* Main content sections */}
    <div className="p-4 space-y-6">
      {/* Filter chips */}
      <FilterChips />

      {/* Post card */}
      <PostCard baseLib="tailwind" />

      {/* Trending carousel */}
      <TrendingCarousel baseLib="tailwind" />

      {/* Notifications list */}
      <NotifList baseLib="tailwind" />

      {/* Banner CTA */}
      <BannerCTA baseLib="tailwind" />

      {/* Account form */}
      <AccountForm baseLib="tailwind" />

      {/* Settings group */}
      <SettingsGroup baseLib="tailwind" />
    </div>
  </div>
);

export const PreviewPhone = ({ 
  baseLib = 'tailwind', 
  fontClass, 
  selectedScale, 
  isDarkMode, 
  selectedTheme 
}: PreviewPhoneProps) => {
  const PhoneFrame = () => (
    <div className="h-full flex items-start justify-center p-8 bg-[rgb(var(--color-bg-secondary))]/20 min-h-[600px]">
      {/* Phone Frame */}
      <div className={`w-80 h-[640px] bg-[rgb(var(--color-bg-primary))] border-8 border-[rgb(var(--color-border))] rounded-[2.5rem] shadow-[var(--shadow-level-3)] overflow-hidden flex flex-col ${fontClass}`}>

        {/* Header */}
        <HeaderGreeting baseLib="tailwind" />

        {/* Content */}
        <PhoneContent 
          fontClass={fontClass} 
          selectedScale={selectedScale} 
        />

        {/* Bottom navigation */}
        <BottomBarStatic baseLib="tailwind" />
      </div>
    </div>
  );

  return <PhoneFrame />;
};