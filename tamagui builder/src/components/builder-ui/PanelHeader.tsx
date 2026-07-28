import React from 'react';
import { YStack } from 'tamagui';
import { H2, Body } from '../../design-system/components/Text';

interface PanelHeaderProps {
  title: string;
  description: string;
}

/**
 * The title block at the top of Atoms / Components / Patterns.
 *
 * Shared so the three tabs can't drift: each panel previously declared its own
 * heading with a different size, colour and trailing gap, which made switching
 * tabs feel like switching apps.
 */
export const PanelHeader = ({ title, description }: PanelHeaderProps) => (
  <YStack gap="$2" marginBottom="$4">
    <H2 margin={0}>{title}</H2>
    <Body color="$textSecondary">{description}</Body>
  </YStack>
);

export default PanelHeader;
