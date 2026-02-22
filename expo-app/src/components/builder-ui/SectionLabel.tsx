/**
 * SectionLabel — Builder UI Primitive (NativeWind)
 *
 * Section header with title and optional description.
 * Ported from Tamagui BuilderSectionLabel.
 */

import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '@/lib/utils';
import { useDesignSystem } from '../../state/designSystem';

interface SectionLabelProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionLabel({ title, description, className }: SectionLabelProps) {
  const { tokens } = useDesignSystem();

  return (
    <View className={cn('mb-3', className)}>
      <Text
        className="text-on-surface-secondary"
        style={{
          fontSize: parseInt(tokens.caption.size),
          lineHeight: parseInt(tokens.caption.line),
          fontWeight: '600',
          letterSpacing: 0,
        }}
      >
        {title}
      </Text>
      {description && (
        <Text
          className="text-on-surface-secondary/70 mt-1"
          style={{
            fontSize: parseInt(tokens.caption.size),
            lineHeight: parseInt(tokens.caption.line),
            fontWeight: tokens.caption.weight.toString(),
          }}
        >
          {description}
        </Text>
      )}
    </View>
  );
}
