import React from 'react';
import { Leaf } from 'lucide-react';

interface BannerCTAProps {
  baseLib: string;
}

export const BannerCTA = ({ baseLib }: BannerCTAProps) => {
  if (baseLib === 'daisyui') {
    return (
      <div className="alert bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 border-0">
        <Leaf className="w-6 h-6 text-green-600" />
        <span className="font-medium">Nature Scene</span>
      </div>
    );
  }

  if (baseLib === 'flowbite') {
    return (
      <div className="flex items-center gap-3 p-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800">
        <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
        <span className="font-medium">Nature Scene</span>
      </div>
    );
  }

  if (baseLib === 'shadcn') {
    return (
      <div className="p-4 rounded-[var(--radius-md)] bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-[rgb(var(--color-border))]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <span className="font-medium text-[rgb(var(--color-text-primary))]">Nature Scene</span>
        </div>
      </div>
    );
  }

  // Default implementation
  return (
    <div className="p-4 rounded-[var(--radius-md)] bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-[rgb(var(--color-border))]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <Leaf className="w-4 h-4 text-green-600 dark:text-green-400" />
        </div>
        <span className="font-medium text-[rgb(var(--color-text-primary))]">Nature Scene</span>
      </div>
    </div>
  );
};