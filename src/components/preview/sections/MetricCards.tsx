import React from 'react';
import { Clock, Smile } from 'lucide-react';

interface MetricCardsProps {
  baseLib: string;
}

export const MetricCards = ({ baseLib }: MetricCardsProps) => {
  const metrics = [
    { icon: Clock, title: 'Focus Time', value: '2h 15m today' },
    { icon: Smile, title: 'Mood Level', value: '7/10 avg' }
  ];

  if (baseLib === 'shadcn') {
    return (
      <div className="flex gap-3 overflow-x-auto">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))] shadow-[var(--shadow-level-1)] flex items-center gap-3 min-w-[140px]">
            <div className="w-10 h-10 rounded-full bg-[rgb(var(--color-brand))]/10 flex items-center justify-center">
              <metric.icon size={20} className="text-[rgb(var(--color-brand))]" />
            </div>
            <div>
              <p className="text-sm text-[rgb(var(--color-text-secondary))]">{metric.title}</p>
              <p className="font-semibold text-[rgb(var(--color-text-primary))]">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (baseLib === 'daisyui') {
    return (
      <div className="flex gap-3 overflow-x-auto">
        {metrics.map((metric, index) => (
          <div key={index} className="card bg-base-100 shadow-xl min-w-[140px]">
            <div className="card-body p-4">
              <div className="flex items-center gap-3">
                <div className="avatar placeholder">
                  <div className="bg-primary/10 text-primary rounded-full w-10 h-10">
                    <metric.icon size={20} />
                  </div>
                </div>
                <div>
                  <p className="text-sm opacity-70">{metric.title}</p>
                  <p className="font-semibold">{metric.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (baseLib === 'flowbite') {
    return (
      <div className="flex gap-3 overflow-x-auto">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center gap-3 min-w-[140px]">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full dark:bg-blue-900">
              <metric.icon size={20} className="text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{metric.title}</p>
              <p className="font-semibold text-gray-900 dark:text-white">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (baseLib === 'chakra') {
    return (
      <div className="flex gap-3 overflow-x-auto">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))] shadow-[var(--shadow-level-1)] flex items-center gap-3 min-w-[140px]">
            <div className="w-10 h-10 rounded-full bg-[rgb(var(--color-brand))]/10 flex items-center justify-center">
              <metric.icon size={20} className="text-[rgb(var(--color-brand))]" />
            </div>
            <div>
              <p className="text-sm text-[rgb(var(--color-text-secondary))]">{metric.title}</p>
              <p className="font-semibold text-[rgb(var(--color-text-primary))]">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (baseLib === 'mui') {
    return (
      <div className="flex gap-3 overflow-x-auto">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))] shadow-[var(--shadow-level-1)] flex items-center gap-3 min-w-[140px]">
            <div className="w-10 h-10 rounded-full bg-[rgb(var(--color-brand))]/10 flex items-center justify-center">
              <metric.icon size={20} className="text-[rgb(var(--color-brand))]" />
            </div>
            <div>
              <p className="text-sm text-[rgb(var(--color-text-secondary))]">{metric.title}</p>
              <p className="font-semibold text-[rgb(var(--color-text-primary))]">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (baseLib === 'radix') {
    return (
      <div className="flex gap-3 overflow-x-auto">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))] shadow-[var(--shadow-level-1)] flex items-center gap-3 min-w-[140px]">
            <div className="w-10 h-10 rounded-full bg-[rgb(var(--color-brand))]/10 flex items-center justify-center">
              <metric.icon size={20} className="text-[rgb(var(--color-brand))]" />
            </div>
            <div>
              <p className="text-sm text-[rgb(var(--color-text-secondary))]">{metric.title}</p>
              <p className="font-semibold text-[rgb(var(--color-text-primary))]">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default/Tailwind implementation
  return (
    <div className="flex gap-3 overflow-x-auto">
      {metrics.map((metric, index) => (
        <div key={index} className="p-4 rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))] shadow-[var(--shadow-level-1)] flex items-center gap-3 min-w-[140px]">
          <div className="w-10 h-10 rounded-full bg-[rgb(var(--color-brand))]/10 flex items-center justify-center">
            <metric.icon size={20} className="text-[rgb(var(--color-brand))]" />
          </div>
          <div>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">{metric.title}</p>
            <p className="font-semibold text-[rgb(var(--color-text-primary))]">{metric.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};