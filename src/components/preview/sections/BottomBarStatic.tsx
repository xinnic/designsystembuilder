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

  if (baseLib === 'daisyui') {
    return (
      <div className="btm-nav btm-nav-sm bg-base-100 border-t border-base-300">
        {tabs.map((tab, index) => (
          <div key={index} className={`${index === 0 ? 'active' : ''}`}>
            <tab.icon size={18} />
            <span className="btm-nav-label text-xs">{tab.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (baseLib === 'flowbite') {
    return (
      <div className="bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          {tabs.map((tab, index) => (
            <button key={index} type="button" className={`inline-flex flex-col items-center justify-center px-5 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 group ${
              index === 0 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'
            }`}>
              <tab.icon size={18} className="mb-1" />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Default implementation
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