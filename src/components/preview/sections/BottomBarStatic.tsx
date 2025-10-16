import React from 'react';
import { Home, Compass, Activity, User, Settings } from 'lucide-react';

interface BottomBarStaticProps {
  baseLib: string;
}

export const BottomBarStatic = ({ baseLib }: BottomBarStaticProps) => {
  const tabs = [
    { icon: Home, label: 'Home' },
    { icon: Compass, label: 'Explore' },
    { icon: Activity, label: 'Activities' },
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))]/95 backdrop-blur-sm">
      <div className="flex justify-around py-2">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center p-2 text-xs transition-colors ${
              index === 0 
                ? 'text-[rgb(var(--color-brand))]' 
                : 'text-[rgb(var(--color-text-secondary))]'
            }`}
          >
            <tab.icon size={20} className="mb-1" />
            <span>{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
