import { YStack, Card } from '../components';
import { H2, Body } from '../components/Text';
import { Button } from '../components/Button';

interface HeroCardProps {
  title: string;
  description: string;
  ctaText?: string;
  onCtaPress?: () => void;
  gradient?: boolean;
}

/**
 * HeroCard - Large featured card with title, description, and CTA
 *
 * @example
 * <HeroCard
 *   title="Featured Today"
 *   description="Discover what's trending"
 *   ctaText="Explore Now"
 *   onCtaPress={() => {}}
 *   gradient
 * />
 */
export const HeroCard = ({
  title,
  description,
  ctaText = 'Learn More',
  onCtaPress,
  gradient = false,
}: HeroCardProps) => {
  return (
    <Card variant={gradient ? 'gradient' : 'elevated'} padding="large">
      <YStack gap="$3">
        <H2 color="$textPrimary" margin={0}>
          {title}
        </H2>

        <Body color="$textSecondary">{description}</Body>

        {ctaText && (
          <Button
            variant="primary"
            size="medium"
            onPress={onCtaPress}
            alignSelf="flex-start"
          >
            {ctaText}
          </Button>
        )}
      </YStack>
    </Card>
  );
};
