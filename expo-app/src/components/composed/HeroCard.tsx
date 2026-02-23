/**
 * HeroCard Component — Composed (NativeWind + CVA)
 *
 * Gradient hero card with title, description, and CTA button.
 * Uses brand color for gradient background.
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

export interface HeroCardProps {
  /** Eyebrow/overline text */
  eyebrow?: string;
  /** Main title */
  title: string;
  /** Description text */
  description?: string;
  /** CTA button label */
  ctaLabel?: string;
  /** CTA press handler */
  onCtaPress?: () => void;
  /** Additional NativeWind classes */
  className?: string;
}

export function HeroCard({
  eyebrow,
  title,
  description,
  ctaLabel = 'Explore Now',
  onCtaPress,
  className,
}: HeroCardProps) {
  return (
    <View
      className={cn(
        'rounded-lg overflow-hidden bg-brand-500 p-5 gap-3',
        className,
      )}
    >
      {eyebrow && (
        <Text className="text-xs font-semibold text-white/70 uppercase tracking-wide">
          {eyebrow}
        </Text>
      )}
      <Text className="text-xl font-bold text-white">
        {title}
      </Text>
      {description && (
        <Text className="text-sm text-white/80">
          {description}
        </Text>
      )}
      {ctaLabel && (
        <Pressable
          onPress={onCtaPress}
          className="self-start mt-1 px-4 py-2 rounded-full bg-white/20 active:bg-white/30"
        >
          <Text className="text-sm font-semibold text-white">
            {ctaLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
