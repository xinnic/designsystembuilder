import React from 'react';

interface SettingsGroupProps {
  baseLib: string;
}

export const SettingsGroup = ({ baseLib }: SettingsGroupProps) => {
  if (baseLib === 'daisyui') {
    return (
      <div className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text font-medium">Gender</span>
          </label>
          <div className="flex gap-4">
            <label className="cursor-pointer label">
              <input type="radio" name="gender" className="radio radio-primary" defaultChecked />
              <span className="label-text ml-2">Female</span>
            </label>
            <label className="cursor-pointer label">
              <input type="radio" name="gender" className="radio radio-primary" />
              <span className="label-text ml-2">Male</span>
            </label>
            <label className="cursor-pointer label">
              <input type="radio" name="gender" className="radio radio-primary" />
              <span className="label-text ml-2">Other</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium">Dark Mode</span>
          <input type="checkbox" className="toggle toggle-primary" />
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium">Weekly Summary Email</span>
          <input type="checkbox" className="toggle toggle-primary" defaultChecked />
        </div>
      </div>
    );
  }

  if (baseLib === 'flowbite') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input id="female" type="radio" name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" defaultChecked />
              <label htmlFor="female" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
            </div>
            <div className="flex items-center">
              <input id="male" type="radio" name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="male" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
            </div>
            <div className="flex items-center">
              <input id="other" type="radio" name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="other" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Other</label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900 dark:text-white">Dark Mode</span>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900 dark:text-white">Weekly Summary Email</span>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    );
  }

  // Default implementation
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