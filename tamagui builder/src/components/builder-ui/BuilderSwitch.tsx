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
        borderWidth={0}
        // Tamagui's Switch renders a bare <button>, so the browser's native
        // default button padding (1px 6px in Chrome) leaks through unless
        // reset. That stray padding doesn't match the thumb's own size, so
        // the thumb ends up with slack inside the track — and the wrapper
        // Tamagui measures the thumb's travel against always top-aligns it,
        // turning that slack into a lopsided gap instead of an even one.
        // With size="$4" the thumb renders at 29px; this padding (2px on
        // each of the track's 33px-tall sides) makes the track's inner
        // height exactly 29px too, leaving no slack to be lopsided about.
        padding={2}
        borderRadius="$full"
        backgroundColor={checked ? '$brand' : '$gray5'}
        hoverStyle={{
          backgroundColor: checked ? '$brand' : '$gray6',
        }}
        focusVisibleStyle={{
          outlineWidth: 2,
          outlineColor: '$focus',
          outlineStyle: 'solid',
          outlineOffset: 2,
        }}
        aria-label={label}
      >
        {/* No border on the thumb — it's not accounted for by Tamagui's
            track-vs-thumb travel-distance measurement, which left it short
            of the track edge. Stays white in both schemes since it has to
            read against a brand-filled track when on and a grey track when
            off. */}
        <Switch.Thumb animation="quick" backgroundColor="white" borderWidth={0} />
      </Switch>
    </XStack>
  );
};
