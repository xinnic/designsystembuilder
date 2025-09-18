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
  baseLib?: "none" | "tailwind" | "daisyui" | "radix" | "mui";
  fontClass?: string;
  selectedScale?: string;
  isDarkMode?: boolean;
  selectedTheme?: string;
}

const FilterChips = ({ baseLib }: { baseLib: string }) => {
  const filters = ['Activity', 'Mood', 'Food', 'Sleep'];
  
  if (baseLib === 'daisyui') {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter, index) => (
          <div key={filter} className={`tabs tabs-boxed ${index === 0 ? 'tab-active' : ''}`}>
            <span className="tab tab-sm">{filter}</span>
          </div>
        ))}
      </div>
    );
  }

  // Default/Tailwind implementation
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

const PhoneContent = ({ baseLib, fontClass, selectedScale }: { 
  baseLib: string; 
  fontClass?: string; 
  selectedScale?: string; 
}) => (
  <div className={`flex-1 overflow-y-auto ${fontClass} scale-${selectedScale}`}>
    {/* Main content sections */}
    <div className="p-4 space-y-6">
      {/* Filter chips */}
      <FilterChips baseLib={baseLib} />

      {/* Post card */}
      <PostCard baseLib={baseLib} />

      {/* Trending carousel */}
      <TrendingCarousel baseLib={baseLib} />

      {/* Notifications list */}
      <NotifList baseLib={baseLib} />

      {/* Banner CTA */}
      <BannerCTA baseLib={baseLib} />

      {/* Account form */}
      <AccountForm baseLib={baseLib} />

      {/* Settings group */}
      <SettingsGroup baseLib={baseLib} />
    </div>
  </div>
);

export const PreviewPhone = ({ 
  baseLib, 
  fontClass, 
  selectedScale, 
  isDarkMode, 
  selectedTheme 
}: PreviewPhoneProps) => {
  // Get baseLib from props or DOM attribute
  const effectiveBaseLib = baseLib || 
    (typeof document !== 'undefined' ? document.documentElement.getAttribute('data-base-lib') : null) || 
    'tailwind';

  const PhoneFrame = () => (
    <div className="h-full flex items-start justify-center p-8 bg-[rgb(var(--color-bg-secondary))]/20 min-h-[600px]">
      {/* Phone Frame */}
      <div className={`w-80 h-[640px] bg-[rgb(var(--color-bg-primary))] border-8 border-[rgb(var(--color-border))] rounded-[2.5rem] shadow-[var(--shadow-level-3)] overflow-hidden flex flex-col ${fontClass}`}>

        {/* Header */}
        <HeaderGreeting baseLib={effectiveBaseLib} />

        {/* Content */}
        <PhoneContent 
          baseLib={effectiveBaseLib} 
          fontClass={fontClass} 
          selectedScale={selectedScale} 
        />

        {/* Bottom navigation */}
        <BottomBarStatic baseLib={effectiveBaseLib} />
      </div>
    </div>
  );

  return <PhoneFrame />;
};