import { ReactNode } from 'react';
import { YStack } from '../components/Stack';
import { H2, Caption } from '../components/Text';

interface StatsCardProps {
  icon?: ReactNode;
  value: string;
  label: string;
}

/**
 * StatsCard - Display metric with icon, value, and label
 *
 * @example
 * <StatsCard
 *   icon={<TrendingUp size={20} />}
 *   value="124"
 *   label="Posts"
 * />
 */
export const StatsCard = ({ icon, value, label }: StatsCardProps) => {
  return (
    <YStack
      alignItems="center"
      justifyContent="center"
      gap="$1"
      paddingVertical="$4"
      paddingHorizontal="$3"
      backgroundColor="$bgSecondary"
      // Card shape comes from the preset — never a pill, which is what "$4"
      // (the full-radius token) used to give it.
      borderRadius="$card"
      borderWidth="var(--card-border-width, 1px)"
      borderColor="$border"
      boxShadow="var(--card-shadow, none)"
      hoverStyle={{
        borderColor: '$brand',
      }}
      flex={1}
    >
      {icon && <YStack opacity={0.55} marginBottom="$1">{icon}</YStack>}
      <H2 margin={0} color="$textPrimary">
        {value}
      </H2>
      <Caption color="$textSecondary" fontWeight="600">{label}</Caption>
    </YStack>
  );
};
