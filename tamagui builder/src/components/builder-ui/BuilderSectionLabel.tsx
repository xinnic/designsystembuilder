import React from 'react';
import { Text, YStack } from 'tamagui';
import { useDesignSystem } from '../../state/designSystem';

interface BuilderSectionLabelProps {
  title: string;
  description?: string;
}

export const BuilderSectionLabel = ({ title, description }: BuilderSectionLabelProps) => {
  const { tokens } = useDesignSystem();

  return (
    <YStack marginBottom="$3">
      <Text
        fontSize={tokens.caption.size}
        lineHeight={tokens.caption.line}
        fontWeight="600"
        color="$gray11"
        letterSpacing={0}
      >
        {title}
      </Text>
      {description && (
        <Text
          fontSize={tokens.caption.size}
          lineHeight={tokens.caption.line}
          fontWeight={tokens.caption.weight}
          color="$gray10"
          marginTop="$1"
        >
          {description}
        </Text>
      )}
    </YStack>
  );
};
