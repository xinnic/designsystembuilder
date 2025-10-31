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
      padding="$3"
      backgroundColor="$bgSecondary"
      borderRadius="$2"
      borderWidth={1}
      borderColor="$border"
      flex={1}
    >
      {icon && <YStack color="$brand">{icon}</YStack>}
      <H2 margin={0} color="$textPrimary">
        {value}
      </H2>
      <Caption color="$textSecondary">{label}</Caption>
    </YStack>
  );
};
