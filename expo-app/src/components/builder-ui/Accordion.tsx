/**
 * Accordion — Builder UI Primitive (NativeWind + CVA)
 *
 * Collapsible section with title, Lucide icon, and animated chevron.
 * Ported from Tamagui BuilderAccordion.
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react-native';
import { ChevronDown } from 'lucide-react-native';
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

  return (
    <View className={cn('', className)}>
      <Pressable
        className={cn(
          'flex-row items-center justify-between py-3 pr-2 active:opacity-70',
          isOpen && 'mb-2',
        )}
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <View className="flex-row items-center gap-3 flex-1">
          {Icon && <Icon size={20} color={iconColor} strokeWidth={2} />}
          <Text className="font-body text-lg font-semibold text-on-surface">
            {title}
          </Text>
        </View>
        <View className="flex-shrink-0 ml-2">
          <ChevronDown
            size={20}
            color={iconColor}
            strokeWidth={2}
            style={{
              transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
            }}
          />
        </View>
      </Pressable>

      {isOpen && children}
    </View>
  );
}
