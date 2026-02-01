import React from 'react';
import { YStack, Text, useTheme } from 'tamagui';
import { useDesignSystem } from '../../state/designSystem';
import type { LucideIcon } from 'lucide-react';

interface BuilderOptionCardProps {
  icon?: LucideIcon;
  customContent?: React.ReactNode; // For visual representations like "Aa" or corner boxes
  label: string;
  isSelected: boolean;
  onPress: () => void;
  width?: string | number; // For grid layouts: "48%" for 2x2, "32%" for 1x3, "100%" for full width
}

/**
 * Standardized option card for Builder UI controls.
 * Automatically responds to design system settings (borders, radii, spacing).
 * Used for Style Presets, Menu Layout, Spacing Scale, Corner Radius, Type Scale, etc.
 */
export const BuilderOptionCard = ({
  icon: Icon,
  customContent,
  label,
  isSelected,
  onPress,
  width = "100%"
}: BuilderOptionCardProps) => {
  const { opts, tokens } = useDesignSystem();
  const theme = useTheme();

  // Map border weight to actual pixel values for Tamagui
  const borderWidthMap = {
    none: 0,
    thin: 1,
    thick: 2
  };

  const borderWidth = isSelected
    ? Math.max(borderWidthMap[opts.cardBorderWeight] + 1, 2) // Selected is always thicker
    : borderWidthMap[opts.cardBorderWeight];

  return (
    <YStack
      width={width}
      padding="$3"
      borderRadius="$2"
      borderWidth={borderWidth}
      borderColor={isSelected ? '$blue9' : '$gray4'}
      backgroundColor={isSelected ? '$blue2' : '$background'}
      alignItems="center"
      justifyContent="center"
      gap="$2"
      minHeight={80}
      hoverStyle={{
        backgroundColor: isSelected ? '$blue3' : '$gray3',
        borderColor: isSelected ? '$blue9' : '$gray8'
      }}
      pressStyle={{
        opacity: 0.9,
        backgroundColor: isSelected ? '$blue3' : '$gray4'
      }}
      onPress={onPress}
      cursor="pointer"
      animation="fast"
    >
      {customContent ? (
        customContent
      ) : Icon ? (
        <Icon
          size={24}
          color={isSelected ? (theme.blue9?.val || '#3B82F6') : (theme.gray11?.val || '#71717A')}
          strokeWidth={2}
        />
      ) : null}
      <Text
        fontSize={tokens.caption.size}
        lineHeight={tokens.caption.line}
        fontWeight={tokens.caption.weight}
        textAlign="center"
        color={isSelected ? '$blue11' : '$gray11'}
      >
        {label}
      </Text>
    </YStack>
  );
};
