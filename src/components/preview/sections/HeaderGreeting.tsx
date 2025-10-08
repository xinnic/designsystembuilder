import React from 'react';
import { Bell } from 'lucide-react';
import { useDesignSystem } from '@/state/designSystem';

interface HeaderGreetingProps {
  baseLib: string;
}

export const HeaderGreeting = ({ baseLib }: HeaderGreetingProps) => {
  const { opts } = useDesignSystem();

  return (
    <div className="flex items-center justify-between p-4 border-b border-[rgb(var(--color-border))]">
      {opts.logo ? (
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
          <img src={opts.logo} alt="Logo" className="w-8 h-8 object-contain" />
        </div>
      ) : (
        <div className="w-10 h-10 bg-[rgb(var(--color-brand))] rounded-full flex items-center justify-center">
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
