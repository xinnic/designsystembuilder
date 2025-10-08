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

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-[rgb(var(--color-text-primary))]">Trending Now</h3>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory">
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
  );
};
