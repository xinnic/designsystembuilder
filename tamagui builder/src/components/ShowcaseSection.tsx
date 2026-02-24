import React from 'react';
import { YStack, XStack, Heading, Text, useTheme } from 'tamagui';
import { useDesignSystem } from '../state/designSystem';

interface ShowcaseSectionProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  borderless?: boolean;
}

export const ShowcaseSection = ({
  title,
  description,
  icon: Icon,
  children,
  borderless = true
}: ShowcaseSectionProps) => {
  const { tokens } = useDesignSystem();
  const theme = useTheme();

  return (
    <YStack gap="$3" marginBottom="$4">
      <YStack gap="$2">
        <XStack gap="$2" alignItems="center">
          {Icon && <Icon size={18} color={theme.textSecondary?.val || '#6C7588'} />}
          <Heading
            fontSize={tokens.subhead.size}
            lineHeight={tokens.subhead.line}
            fontWeight={tokens.subhead.weight}
            color="$color"
          >
            {title}
          </Heading>
        </XStack>

        {description && (
          <Text
            fontSize={tokens.body.size}
            lineHeight={tokens.body.line}
            color="$color"
            opacity={0.6}
            maxWidth="90%"
          >
            {description}
          </Text>
        )}
      </YStack>

      <YStack
        // improved container visuals
        padding={borderless ? 0 : "$5"}
        backgroundColor={borderless ? 'transparent' : "$bgSecondary"}
        borderRadius={borderless ? 0 : "$3"}
        borderWidth={0}
      >
        {children}
      </YStack>
    </YStack>
  );
};
