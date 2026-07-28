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

      {/* Content always sits on its own surface, one step lighter than the
          panel, so each section reads as a distinct block. `borderless` is kept
          for callers but no longer removes the container — sections that opted
          out were the ones floating on the page with no boundary. */}
      <YStack
        padding="$5"
        backgroundColor="$bgSecondary"
        borderRadius="$card"
        borderWidth="var(--card-border-width, 1px)"
        borderColor="$border"
        // No shadow: this is a grouping frame, and the cards it contains carry
        // the preset's elevation. Stacking one inside the other read as noise.
      >
        {children}
      </YStack>
    </YStack>
  );
};
