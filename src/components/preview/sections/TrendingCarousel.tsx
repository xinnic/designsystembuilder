import React from 'react';

interface TrendingCarouselProps {
  baseLib: string;
}

export const TrendingCarousel = ({ baseLib }: TrendingCarouselProps) => {
  const trendingItems = [
    { image: 'https://picsum.photos/seed/trend1/600/400', title: 'Mountain Views', subtitle: 'Nature escape' },
    { image: 'https://picsum.photos/seed/trend2/600/400', title: 'City Lights', subtitle: 'Urban adventure' },
    { image: 'https://picsum.photos/seed/trend3/600/400', title: 'Ocean Waves', subtitle: 'Coastal journey' },
    { image: 'https://picsum.photos/seed/trend4/600/400', title: 'Forest Path', subtitle: 'Woodland trek' },
    { image: 'https://picsum.photos/seed/trend5/600/400', title: 'Desert Sunset', subtitle: 'Golden hour' },
  ];

  if (baseLib === 'daisyui') {
    return (
      <div className="space-y-3">
        <h3 className="font-semibold text-[rgb(var(--color-text-primary))]">Trending Now</h3>
        <div className="carousel carousel-center max-w-full p-4 space-x-4 bg-neutral rounded-box">
          {trendingItems.map((item, index) => (
            <div key={index} className="carousel-item">
              <div className="card w-40 bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-24 object-cover"
                  />
                </figure>
                <div className="card-body p-3">
                  <h4 className="card-title text-sm">{item.title}</h4>
                  <p className="text-xs opacity-70">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (baseLib === 'flowbite') {
    return (
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 dark:text-white">Trending Now</h3>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {trendingItems.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-40 snap-start">
              <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-24 object-cover"
                />
                <div className="p-3">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (baseLib === 'radix') {
    return (
      <div className="space-y-3">
        <h3 className="font-semibold text-[rgb(var(--color-text-primary))]">Trending Now</h3>
        <div className="overflow-hidden">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {trendingItems.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-40 snap-start">
                <div className="rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))] shadow-[var(--shadow-level-1)] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="font-semibold text-sm text-[rgb(var(--color-text-primary))]">{item.title}</h4>
                    <p className="text-xs text-[rgb(var(--color-text-secondary))]">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default/Tailwind/shadcn/chakra/mui implementation
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-[rgb(var(--color-text-primary))]">Trending Now</h3>
      <div className="overflow-hidden">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {trendingItems.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-40 snap-start">
              <div className="rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))] shadow-[var(--shadow-level-1)] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-24 object-cover"
                />
                <div className="p-3">
                  <h4 className="font-semibold text-sm text-[rgb(var(--color-text-primary))]">{item.title}</h4>
                  <p className="text-xs text-[rgb(var(--color-text-secondary))]">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};