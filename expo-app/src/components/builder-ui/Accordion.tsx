/**
 * Accordion — Builder UI Primitive (NativeWind + CVA)
 *
 * Collapsible section with title, optional icon, and animated chevron.
 * Ported from Tamagui BuilderAccordion.
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';

interface AccordionProps {
  title: string;
  icon?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Accordion({
  title,
  icon,
  isOpen,
  onToggle,
  children,
  className,
}: AccordionProps) {
  return (
    <View className={cn('', className)}>
      <Pressable
        className={cn(
          'flex-row items-center justify-between py-3 px-2 active:opacity-70 active:opacity-50',
          isOpen && 'mb-2',
        )}
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <View className="flex-row items-center gap-3">
          {icon && <Text className="text-on-surface text-[18px]">{icon}</Text>}
          <Text className="text-base font-semibold text-on-surface">
            {title}
          </Text>
        </View>
        <Text
          className="text-on-surface text-sm"
          style={{
            transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
          }}
        >
          ˅
        </Text>
      </Pressable>

      {isOpen && children}
    </View>
  );
}
