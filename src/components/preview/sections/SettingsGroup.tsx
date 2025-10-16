import React from 'react';

interface SettingsGroupProps {
  baseLib: string;
}

export const SettingsGroup = ({ baseLib }: SettingsGroupProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-2">Gender</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="gender" className="w-4 h-4 text-[rgb(var(--color-brand))] border-[rgb(var(--color-border))] focus:ring-2 focus:ring-[rgb(var(--color-focus))]" defaultChecked />
            <span className="text-sm text-[rgb(var(--color-text-primary))]">Female</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="gender" className="w-4 h-4 text-[rgb(var(--color-brand))] border-[rgb(var(--color-border))] focus:ring-2 focus:ring-[rgb(var(--color-focus))]" />
            <span className="text-sm text-[rgb(var(--color-text-primary))]">Male</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="gender" className="w-4 h-4 text-[rgb(var(--color-brand))] border-[rgb(var(--color-border))] focus:ring-2 focus:ring-[rgb(var(--color-focus))]" />
            <span className="text-sm text-[rgb(var(--color-text-primary))]">Other</span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-medium text-[rgb(var(--color-text-primary))]">Dark Mode</span>
        <div className="relative">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-[rgb(var(--color-bg-secondary))] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-focus))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-brand))]"></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-medium text-[rgb(var(--color-text-primary))]">Weekly Summary Email</span>
        <div className="relative">
          <input type="checkbox" className="sr-only peer" defaultChecked />
          <div className="w-11 h-6 bg-[rgb(var(--color-bg-secondary))] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgb(var(--color-focus))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--color-brand))]"></div>
        </div>
      </div>
    </div>
  );
};
