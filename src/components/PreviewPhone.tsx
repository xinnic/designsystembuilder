import React from 'react';
import { HeaderGreeting } from './preview/sections/HeaderGreeting';
import { MoodChips } from './preview/sections/MoodChips';
import { MetricCards } from './preview/sections/MetricCards';
import { PostCard } from './preview/sections/PostCard';
import { TrendingCarousel } from './preview/sections/TrendingCarousel';
import { NotifList } from './preview/sections/NotifList';
import { BannerCTA } from './preview/sections/BannerCTA';
import { AccountForm } from './preview/sections/AccountForm';
import { SettingsGroup } from './preview/sections/SettingsGroup';
import { BottomBarStatic } from './preview/sections/BottomBarStatic';
import { ChakraPreviewProvider } from './preview/providers/ChakraPreviewProvider';
import { MuiPreviewProvider } from './preview/providers/MuiPreviewProvider';

interface PreviewPhoneProps {
  baseLib?: "none" | "tailwind" | "shadcn" | "daisyui" | "flowbite" | "radix" | "chakra" | "mui";
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
      {/* Subheader */}
      <h2 className="text-lg font-medium text-[rgb(var(--color-text-secondary))]">
        How are you feeling today?
      </h2>

      {/* Mood chips */}
      <MoodChips baseLib={baseLib} />

      {/* Filter chips */}
      <FilterChips baseLib={baseLib} />

      {/* Metric cards */}
      <MetricCards baseLib={baseLib} />

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
        {/* Status Bar */}
        <div className="h-6 bg-[rgb(var(--color-bg-primary))] flex items-center justify-center">
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-[rgb(var(--color-text-primary))] rounded-full"></div>
              <div className="w-1 h-1 bg-[rgb(var(--color-text-primary))] rounded-full"></div>
              <div className="w-1 h-1 bg-[rgb(var(--color-text-secondary))] rounded-full"></div>
            </div>
            <span className="text-xs font-medium mx-2 text-[rgb(var(--color-text-primary))]">9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-2 border border-[rgb(var(--color-text-primary))] rounded-sm">
                <div className="w-3 h-1 bg-[rgb(var(--color-text-primary))] rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

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

  // Wrap with providers based on baseLib
  if (effectiveBaseLib === 'chakra') {
    return (
      <ChakraPreviewProvider>
        <PhoneFrame />
      </ChakraPreviewProvider>
    );
  }

  if (effectiveBaseLib === 'mui') {
    return (
      <MuiPreviewProvider>
        <PhoneFrame />
      </MuiPreviewProvider>
    );
  }

  return <PhoneFrame />;
};