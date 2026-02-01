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
 * HeroCard - Large featured card with gradient header image, title, description, and CTA
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
    <Card 
      variant="elevated" 
      padding="none"
      backgroundColor="$background"
      overflow="hidden"
    >
      {/* Full-bleed gradient image at top */}
      {gradient && (
        <YStack
          height={160}
          width="100%"
          style={{
            background: 'linear-gradient(135deg, rgb(var(--color-brand)) 0%, rgb(var(--color-brand-weak)) 100%)',
          }}
        />
      )}

      {/* Content section with padding */}
      <YStack gap="$3" padding="$5">
        <H2 color="$textPrimary" margin={0} fontWeight="700">
          {title}
        </H2>

        <Body color="$textSecondary" margin={0}>
          {description}
        </Body>

        {ctaText && (
          <Button
            variant="primary"
            size="medium"
            onPress={onCtaPress}
            alignSelf="flex-start"
            marginTop="$2"
          >
            {ctaText}
          </Button>
        )}
      </YStack>
    </Card>
  );
};
