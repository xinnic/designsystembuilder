import React from 'react';
import { XStack, YStack, Text, Switch } from 'tamagui';
import { useDesignSystem } from '../../state/designSystem';

interface BuilderSwitchProps {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

/**
 * Labelled toggle row for Builder UI controls.
 *
 * Tamagui's Switch paints its track, its border AND its thumb with
 * `$background`. Every theme in this app resolves `$background` to the page
 * surface, so an unstyled Switch is a white pill with a white thumb on a white
 * sidebar — present, tappable, and completely invisible. The track and thumb
 * colours below are therefore explicit, not inherited.
 */
export const BuilderSwitch = ({
  label,
  description,
  checked,
  onCheckedChange,
}: BuilderSwitchProps) => {
  const { tokens } = useDesignSystem();

  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      gap="$3"
      width="100%"
      cursor="pointer"
      onPress={() => onCheckedChange(!checked)}
    >
      <YStack flex={1} minWidth={0}>
        <Text
          fontSize={tokens.body.size}
          lineHeight={tokens.body.line}
          fontWeight="600"
          color="$color"
        >
          {label}
        </Text>
        {description && (
          <Text
            fontSize={tokens.caption.size}
            lineHeight={tokens.caption.line}
            color="$gray11"
            marginTop="$1"
          >
            {description}
          </Text>
        )}
      </YStack>

      <Switch
        size="$4"
        checked={checked}
        onCheckedChange={onCheckedChange}
        flexShrink={0}
        borderWidth={2}
        borderRadius="$full"
        backgroundColor={checked ? '$brand' : '$gray5'}
        borderColor={checked ? '$brand' : '$gray8'}
        hoverStyle={{
          backgroundColor: checked ? '$brand' : '$gray6',
          borderColor: checked ? '$brand' : '$gray9',
        }}
        focusVisibleStyle={{
          outlineWidth: 2,
          outlineColor: '$focus',
          outlineStyle: 'solid',
          outlineOffset: 2,
        }}
        aria-label={label}
      >
        {/* The thumb stays white in both schemes: it has to read against a
            brand-filled track when on and a grey track when off. */}
        <Switch.Thumb
          animation="quick"
          backgroundColor="white"
          borderWidth={1}
          borderColor="$gray7"
        />
      </Switch>
    </XStack>
  );
};
