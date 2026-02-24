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
      gap="$2"
      padding="$4"
      backgroundColor="$bgSecondary" // Changed to bgSecondary to clearly stand out
      borderRadius="$4"
      borderWidth={1}
      borderColor="$border"
      hoverStyle={{
        backgroundColor: '$bgPrimary',
        borderColor: '$brand',
      }}
      flex={1}
    >
      {icon && <YStack paddingBottom="$2">{icon}</YStack>}
      <H2 size="$6" margin={0} color="$textPrimary">
        {value}
      </H2>
      <Caption color="$textSecondary" fontWeight="600">{label}</Caption>
    </YStack>
  );
};
