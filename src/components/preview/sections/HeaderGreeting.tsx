import React from 'react';
import { Bell } from 'lucide-react';
import { useDesignSystem } from '@/state/designSystem';

interface HeaderGreetingProps {
  baseLib: string;
}

export const HeaderGreeting = ({ baseLib }: HeaderGreetingProps) => {
  const { opts } = useDesignSystem();

  if (baseLib === 'daisyui') {
    return (
      <div className="navbar bg-base-100 border-b border-base-300">
        <div className="navbar-start">
          {opts.logo ? (
            <img src={opts.logo} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
          ) : (
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-lg w-8 h-8">
                <span className="text-sm font-bold">A</span>
              </div>
            </div>
          )}
        </div>
        <div className="navbar-center">
          <h1 className="text-lg font-semibold">Good morning, Emma</h1>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <Bell size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (baseLib === 'flowbite') {
    return (
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        {opts.logo ? (
          <img src={opts.logo} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
        ) : (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
        )}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Good morning, Emma</h1>
        <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <Bell size={16} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    );
  }

  if (baseLib === 'chakra') {
    return (
      <div className="flex items-center justify-between p-4 border-b border-[rgb(var(--color-border))]">
        {opts.logo ? (
          <img src={opts.logo} alt="Logo" className="w-8 h-8 rounded-[var(--radius-md)] object-cover" />
        ) : (
          <div className="w-8 h-8 bg-[rgb(var(--color-brand))] rounded-[var(--radius-md)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
        )}
        <h1 className="text-lg font-semibold text-[rgb(var(--color-text-primary))]">Good morning, Emma</h1>
        <button className="w-8 h-8 rounded-full bg-[rgb(var(--color-bg-secondary))] flex items-center justify-center hover:bg-[rgb(var(--color-bg-secondary))]/80 transition-colors">
          <Bell size={16} className="text-[rgb(var(--color-text-secondary))]" />
        </button>
      </div>
    );
  }

  if (baseLib === 'mui') {
    return (
      <div className="flex items-center justify-between p-4 border-b border-[rgb(var(--color-border))]">
        {opts.logo ? (
          <img src={opts.logo} alt="Logo" className="w-8 h-8 rounded-[var(--radius-md)] object-cover" />
        ) : (
          <div className="w-8 h-8 bg-[rgb(var(--color-brand))] rounded-[var(--radius-md)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
        )}
        <h1 className="text-lg font-semibold text-[rgb(var(--color-text-primary))]">Good morning, Emma</h1>
        <button className="w-8 h-8 rounded-full bg-[rgb(var(--color-bg-secondary))] flex items-center justify-center hover:bg-[rgb(var(--color-bg-secondary))]/80 transition-colors">
          <Bell size={16} className="text-[rgb(var(--color-text-secondary))]" />
        </button>
      </div>
    );
  }

  if (baseLib === 'radix') {
    return (
      <div className="flex items-center justify-between p-4 border-b border-[rgb(var(--color-border))]">
        {opts.logo ? (
          <img src={opts.logo} alt="Logo" className="w-8 h-8 rounded-[var(--radius-md)] object-cover" />
        ) : (
          <div className="w-8 h-8 bg-[rgb(var(--color-brand))] rounded-[var(--radius-md)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
        )}
        <h1 className="text-lg font-semibold text-[rgb(var(--color-text-primary))]">Good morning, Emma</h1>
        <button className="w-8 h-8 rounded-full bg-[rgb(var(--color-bg-secondary))] flex items-center justify-center hover:bg-[rgb(var(--color-bg-secondary))]/80 transition-colors focus:ring-2 focus:ring-[rgb(var(--color-focus))] focus:ring-offset-2">
          <Bell size={16} className="text-[rgb(var(--color-text-secondary))]" />
        </button>
      </div>
    );
  }

  // Default/Tailwind implementation
  return (
    <div className="flex items-center justify-between p-4 border-b border-[rgb(var(--color-border))]">
      {opts.logo ? (
        <img src={opts.logo} alt="Logo" className="w-8 h-8 rounded-[var(--radius-md)] object-cover" />
      ) : (
        <div className="w-8 h-8 bg-[rgb(var(--color-brand))] rounded-[var(--radius-md)] flex items-center justify-center">
          <span className="text-white font-bold text-sm">A</span>
        </div>
      )}
      <h1 className="text-lg font-semibold text-[rgb(var(--color-text-primary))]">Good morning, Emma</h1>
      <button className="w-8 h-8 rounded-full bg-[rgb(var(--color-bg-secondary))] flex items-center justify-center hover:bg-[rgb(var(--color-bg-secondary))]/80 transition-colors focus:ring-2 focus:ring-[rgb(var(--color-focus))] focus:ring-offset-2">
        <Bell size={16} className="text-[rgb(var(--color-text-secondary))]" />
      </button>
    </div>
  );
};