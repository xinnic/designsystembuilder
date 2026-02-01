import React from 'react';
import { YStack, useTheme } from 'tamagui';

interface BuilderColorSwatchProps {
  color: string;
  isSelected: boolean;
  onPress: () => void;
  isCustom?: boolean;
}

export const BuilderColorSwatch = ({ color, isSelected, onPress, isCustom, children }: BuilderColorSwatchProps & { children?: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <YStack
      width="$7"
      height="$7"
      borderRadius="$3"
      backgroundColor={color}
      borderWidth={isSelected ? 2 : 1}
      borderColor={isSelected ? '$blue9' : '$gray8'}
      onPress={onPress}
      cursor="pointer"
      hoverStyle={{ opacity: 0.8, scale: 1.05 }}
      pressStyle={{ scale: 0.95 }}
      animation="quick"
      position="relative"
    >
      {isCustom && (
         <YStack
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          style={{ 
            background: 'linear-gradient(135deg, #ff0000 0%, #00ff00 50%, #0000ff 100%)',
            opacity: 0.5
          }}
          zIndex={0}
        />
      )}
      {children}
    </YStack>
  );
};
