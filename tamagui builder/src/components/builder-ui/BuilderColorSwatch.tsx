import React from 'react';
import { YStack } from 'tamagui';
import { RAINBOW_GRADIENT, DEFAULT_PRIMARY } from '../../config/colorThemes';

interface BuilderColorSwatchProps {
  color: string;
  isSelected: boolean;
  onPress: () => void;
  /** Renders the colour-wheel picker chip instead of a flat swatch */
  isCustom?: boolean;
  /** The currently picked custom colour, shown in the centre of the wheel */
  customColor?: string;
}

export const BuilderColorSwatch = ({
  color,
  isSelected,
  onPress,
  isCustom,
  customColor,
  children,
}: BuilderColorSwatchProps & { children?: React.ReactNode }) => {
  return (
    <YStack
      width={32}
      height={32}
      borderRadius="$3"
      // Once a custom colour is actually chosen the chip becomes that colour,
      // so the swatch always shows what it currently means.
      backgroundColor={isCustom ? (isSelected ? customColor || DEFAULT_PRIMARY : 'transparent') : color}
      borderWidth={isSelected ? 2 : 1}
      borderColor={isSelected ? '$blue9' : '$gray8'}
      // Without this the wheel layer paints square corners over the radius.
      overflow="hidden"
      onPress={onPress}
      cursor="pointer"
      hoverStyle={{ opacity: 0.9, scale: 1.05 }}
      pressStyle={{ scale: 0.95 }}
      animation="quick"
      position="relative"
    >
      {/* Unpicked, the chip is a hue wheel — a conic sweep through the spectrum
          with a radial white core, so it reads as "choose any colour". */}
      {isCustom && !isSelected && (
        <YStack
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={0}
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0) 62%), ${RAINBOW_GRADIENT}`,
          }}
        />
      )}
      {children}
    </YStack>
  );
};
