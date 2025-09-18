import React from 'react';

interface MoodChipsProps {
  baseLib: string;
}

export const MoodChips = ({ baseLib }: MoodChipsProps) => {
  const moods = ['🙂', '😐', '😞'];

  if (baseLib === 'shadcn') {
    return (
      <div className="flex gap-3">
        {moods.map((mood, index) => (
          <button
            key={index}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all focus:ring-2 focus:ring-[rgb(var(--color-focus))] focus:ring-offset-2 ${
              index === 0
                ? 'border-[rgb(var(--color-brand))] bg-[rgb(var(--color-brand))]/10'
                : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-brand))]/50'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>
    );
  }

  if (baseLib === 'daisyui') {
    return (
      <div className="flex gap-3">
        {moods.map((mood, index) => (
          <button
            key={index}
            className={`btn btn-circle ${
              index === 0 ? 'btn-primary btn-outline' : 'btn-outline'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>
    );
  }

  if (baseLib === 'flowbite') {
    return (
      <div className="flex gap-3">
        {moods.map((mood, index) => (
          <button
            key={index}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all focus:ring-4 focus:outline-none ${
              index === 0
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 focus:ring-blue-300 dark:focus:ring-blue-800'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 focus:ring-gray-200 dark:focus:ring-gray-700'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>
    );
  }

  if (baseLib === 'chakra') {
    return (
      <div className="flex gap-3">
        {moods.map((mood, index) => (
          <button
            key={index}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all ${
              index === 0
                ? 'border-[rgb(var(--color-brand))] bg-[rgb(var(--color-brand))]/10'
                : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-brand))]/50'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>
    );
  }

  if (baseLib === 'mui') {
    return (
      <div className="flex gap-3">
        {moods.map((mood, index) => (
          <button
            key={index}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all ${
              index === 0
                ? 'border-[rgb(var(--color-brand))] bg-[rgb(var(--color-brand))]/10'
                : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-brand))]/50'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>
    );
  }

  if (baseLib === 'radix') {
    return (
      <div className="flex gap-3">
        {moods.map((mood, index) => (
          <button
            key={index}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all focus:ring-2 focus:ring-[rgb(var(--color-focus))] focus:ring-offset-2 ${
              index === 0
                ? 'border-[rgb(var(--color-brand))] bg-[rgb(var(--color-brand))]/10'
                : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-brand))]/50'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>
    );
  }

  // Default/Tailwind implementation
  return (
    <div className="flex gap-3">
      {moods.map((mood, index) => (
        <button
          key={index}
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all focus:ring-2 focus:ring-[rgb(var(--color-focus))] focus:ring-offset-2 ${
            index === 0
              ? 'border-[rgb(var(--color-brand))] bg-[rgb(var(--color-brand))]/10'
              : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-brand))]/50'
          }`}
        >
          {mood}
        </button>
      ))}
    </div>
  );
};