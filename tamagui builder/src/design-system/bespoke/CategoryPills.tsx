import { ScrollView } from 'tamagui';
import { XStack } from '../components/Stack';
import { Button } from '../components/Button';
import { Caption } from '../components/Text';

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
      // A horizontal scroller clips at its overflow edge, which cut the bottom
      // off every pill's shadow. Pad the scroll area by however far the active
      // preset's shadow reaches, then pull the same amount back off the outside
      // with a negative margin — the shadow gets its room without the row
      // changing height from one preset to the next.
      style={{
        marginTop: 'calc(-1 * var(--shadow-bleed, 4px))',
        marginBottom: 'calc(-1 * var(--shadow-bleed, 4px))',
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        gap: 8,
        paddingTop: 'var(--shadow-bleed, 4px)',
        paddingBottom: 'var(--shadow-bleed, 4px)',
        paddingRight: 'calc(16px + var(--shadow-bleed, 4px))',
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
              // Pills are always fully rounded — a shape choice, not the
              // preset's card radius.
              borderRadius="$full"
              onPress={() => onCategoryPress?.(category.id)}
              aria-label={`Filter by ${category.label}`}
              aria-pressed={isActive}
            >
              <Caption
                color={isActive ? 'white' : '$brand'}
                fontWeight="600"
              >
                {category.label}
              </Caption>
            </Button>
          );
        })}
      </XStack>
    </ScrollView>
  );
};
