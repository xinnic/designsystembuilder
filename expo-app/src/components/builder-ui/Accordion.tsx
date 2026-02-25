/**
 * Accordion — Builder UI Primitive (NativeWind + CVA)
 *
 * Collapsible section with title, Lucide icon, and animated chevron.
 * Ported from Tamagui BuilderAccordion.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { useDesignSystem } from '../../state/designSystem';

interface AccordionProps {
  title: string;
  icon?: LucideIcon;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Accordion({
  title,
  icon: Icon,
  isOpen,
  onToggle,
  children,
  className,
}: AccordionProps) {
  const { isDarkMode } = useDesignSystem();
  const iconColor = isDarkMode ? '#e1e1e1' : '#1a1a1a';

  // Animation state
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const [contentHeight, setContentHeight] = useState(0);

  // Measure content height
  const handleContentLayout = (event: LayoutChangeEvent) => {
    const { height: measuredHeight } = event.nativeEvent.layout;
    setContentHeight(measuredHeight);
  };

  // Animate on open/close
  useEffect(() => {
    if (isOpen) {
      height.value = withTiming(contentHeight, {
        duration: 250,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
    } else {
      height.value = withTiming(0, {
        duration: 200,
        easing: Easing.in(Easing.cubic),
      });
      opacity.value = withTiming(0, {
        duration: 150,
        easing: Easing.in(Easing.ease),
      });
    }
  }, [isOpen, contentHeight, height, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
    overflow: 'hidden',
  }));

  return (
    <View className={cn('w-full', className)}>
      <Pressable
        className={cn(
          'w-full flex-row items-center justify-between py-3 pr-2 active:opacity-70',
          isOpen && 'mb-2',
        )}
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <View className="flex-row items-center gap-3 flex-1">
          {Icon && <Icon size={20} color={iconColor} strokeWidth={2} />}
          <Text
            className="font-body text-lg font-semibold text-on-surface shrink"
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
        <View className="shrink-0 ml-2">
          {isOpen ? (
            <ChevronUp size={20} color={iconColor} strokeWidth={2} />
          ) : (
            <ChevronDown size={20} color={iconColor} strokeWidth={2} />
          )}
        </View>
      </Pressable>

      <Animated.View style={animatedStyle}>
        <View onLayout={handleContentLayout}>{children}</View>
      </Animated.View>
    </View>
  );
}
