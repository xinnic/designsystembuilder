import { ScrollView, XStack } from 'tamagui';
import { Button } from '../components/Button';
import { Body } from '../components/Text';

interface CategoryPill {
  id: string;
  label: string;
}

interface CategoryPillsProps {
  categories: CategoryPill[];
  activeId?: string;
  onCategoryPress?: (id: string) => void;
}

/**
 * CategoryPills - Horizontal scrolling filter chips
 *
 * Features:
 * - Horizontal scroll on overflow
 * - Active state highlighting
 * - Pill-shaped buttons
 *
 * @example
 * <CategoryPills
 *   categories={[
 *     { id: '1', label: 'For You' },
 *     { id: '2', label: 'Trending' },
 *   ]}
 *   activeId="1"
 *   onCategoryPress={(id) => console.log(id)}
 * />
 */
export const CategoryPills = ({
  categories,
  activeId,
  onCategoryPress,
}: CategoryPillsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        gap: 8,
      }}
    >
      <XStack gap="$2">
        {categories.map((category) => {
          const isActive = category.id === activeId;

          return (
            <Button
              key={category.id}
              variant={isActive ? 'primary' : 'secondary'}
              size="small"
              paddingHorizontal="$3"
              paddingVertical="$2"
              borderRadius="$4"
              onPress={() => onCategoryPress?.(category.id)}
              accessibilityLabel={`Filter by ${category.label}`}
              accessibilityState={{ selected: isActive }}
            >
              <Body
                color={isActive ? 'white' : '$brand'}
                fontSize="$1"
                fontWeight="600"
              >
                {category.label}
              </Body>
            </Button>
          );
        })}
      </XStack>
    </ScrollView>
  );
};
