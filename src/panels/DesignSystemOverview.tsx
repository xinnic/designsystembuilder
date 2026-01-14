import React from 'react';
import { YStack, XStack, Text, Heading, ScrollView } from 'tamagui';
import {
  Type,
  Palette,
  Grid,
  CornerUpRight,
  Layers,
  Play,
  Smartphone
} from 'lucide-react';

// Token demos
import ColorSwatch from './TokenDemos/ColorSwatch';
import SpacingLadder from './TokenDemos/SpacingLadder';
import RadiiChips from './TokenDemos/RadiiChips';
import ElevationTiles from './TokenDemos/ElevationTiles';
import EasingCurve from './TokenDemos/motion/EasingCurve';
import CardEntrances from './TokenDemos/motion/CardEntrances';
import './TokenDemos/motion/motion-demos.css';
import TypeScaleTable from './TokenDemos/TypeScaleTable';
import HapticsPreview from './TokenDemos/HapticsPreview';

export default function DesignSystemOverview() {
  // Note: useTokenCSS is called in PreviewPhoneTamagui, no need to duplicate here

  return (
    <ScrollView maxHeight="100vh">
      <YStack
        padding="$6"
        backgroundColor="$background"
        color="$color"
      >
        {/* TOKENS SECTION */}
        <YStack marginBottom="$6">
          <YStack
            marginBottom="$5"
            paddingBottom="$3"
            borderBottomWidth={1}
            borderBottomColor="$borderColor"
            opacity={0.2}
          >
            <Heading
              marginBottom="$2"
              fontSize="$8"
              lineHeight="$8"
              fontWeight="600"
              color="$color"
            >
              Tokens
            </Heading>
            <Text
              fontSize="$4"
              lineHeight="$4"
              fontWeight="400"
              color="$color"
              opacity={0.7}
            >
              Foundational design elements that define your system's visual language
            </Text>
          </YStack>

          {/* Typography Scale */}
          <YStack
            marginBottom="$5"
            padding="$4"
            backgroundColor="$background"
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
            opacity={0.1}
          >
            <YStack marginBottom="$4">
              <XStack marginBottom="$2" space="$2" alignItems="center">
                <Type size={20} color="currentColor" />
                <Heading
                  fontSize="$6"
                  lineHeight="$6"
                  fontWeight="600"
                  color="$color"
                >
                  Typography Scale
                </Heading>
              </XStack>
              <Text
                fontSize="$3"
                lineHeight="$3"
                fontWeight="400"
                color="$color"
                opacity={0.7}
              >
                Type styles that set hierarchy—headlines, body, captions. Change these to give your product a distinct voice.
              </Text>
            </YStack>
            <TypeScaleTable />
          </YStack>

          {/* Color Roles */}
          <YStack
            marginBottom="$5"
            padding="$4"
            backgroundColor="$background"
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
            opacity={0.1}
          >
            <YStack marginBottom="$4">
              <XStack marginBottom="$2" space="$2" alignItems="center">
                <Palette size={20} color="currentColor" />
                <Heading
                  fontSize="$6"
                  lineHeight="$6"
                  fontWeight="600"
                  color="$color"
                >
                  Color Roles
                </Heading>
              </XStack>
              <Text
                fontSize="$3"
                lineHeight="$3"
                fontWeight="400"
                color="$color"
                opacity={0.7}
              >
                Brand and UI colors used across components. These are semantic—change the role, and the whole system updates.
              </Text>
            </YStack>
            <ColorSwatch />
          </YStack>

          {/* Spacing Ladder */}
          <YStack
            marginBottom="$5"
            padding="$4"
            backgroundColor="$background"
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
            opacity={0.1}
          >
            <YStack marginBottom="$4">
              <XStack marginBottom="$2" space="$2" alignItems="center">
                <Grid size={20} color="currentColor" />
                <Heading
                  fontSize="$6"
                  lineHeight="$6"
                  fontWeight="600"
                  color="$color"
                >
                  Spacing Ladder
                </Heading>
              </XStack>
              <Text
                fontSize="$3"
                lineHeight="$3"
                fontWeight="400"
                color="$color"
                opacity={0.7}
              >
                Consistent rhythm so screens feel intentional. Based on an 8-pt scale.
              </Text>
            </YStack>
            <SpacingLadder />
          </YStack>

          {/* Corner Radii */}
          <YStack
            marginBottom="$5"
            padding="$4"
            backgroundColor="$background"
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
            opacity={0.1}
          >
            <YStack marginBottom="$4">
              <XStack marginBottom="$2" space="$2" alignItems="center">
                <CornerUpRight size={20} color="currentColor" />
                <Heading
                  fontSize="$6"
                  lineHeight="$6"
                  fontWeight="600"
                  color="$color"
                >
                  Corner Radii
                </Heading>
              </XStack>
              <Text
                fontSize="$3"
                lineHeight="$3"
                fontWeight="400"
                color="$color"
                opacity={0.7}
              >
                How rounded surfaces are. Small for dense controls, medium for cards, large for modals, full for pills.
              </Text>
            </YStack>
            <RadiiChips />
          </YStack>

          {/* Elevation (Shadows) */}
          <YStack
            marginBottom="$5"
            padding="$4"
            backgroundColor="$background"
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
            opacity={0.1}
          >
            <YStack marginBottom="$4">
              <XStack marginBottom="$2" space="$2" alignItems="center">
                <Layers size={20} color="currentColor" />
                <Heading
                  fontSize="$6"
                  lineHeight="$6"
                  fontWeight="600"
                  color="$color"
                >
                  Elevation (Shadows)
                </Heading>
              </XStack>
              <Text
                fontSize="$3"
                lineHeight="$3"
                fontWeight="400"
                color="$color"
                opacity={0.7}
              >
                Depth cues. Use subtle for resting cards, medium for interactive popovers, strong for modals.
              </Text>
            </YStack>
            <ElevationTiles />
          </YStack>

          {/* Motion */}
          <YStack
            marginBottom="$5"
            padding="$4"
            backgroundColor="$background"
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
            opacity={0.1}
          >
            <YStack marginBottom="$4">
              <XStack marginBottom="$2" space="$2" alignItems="center">
                <Play size={20} color="currentColor" />
                <Heading
                  fontSize="$6"
                  lineHeight="$6"
                  fontWeight="600"
                  color="$color"
                >
                  Motion
                </Heading>
              </XStack>
              <Text
                fontSize="$3"
                lineHeight="$3"
                fontWeight="400"
                color="$color"
                opacity={0.7}
              >
                How fast and smooth UI moves. All demos use your duration and easing tokens and respect reduced motion.
              </Text>
            </YStack>
            <XStack space="$4" flexWrap="wrap">
              <EasingCurve />
              <CardEntrances />
            </XStack>
          </YStack>

          {/* Haptics */}
          <YStack
            marginBottom="$5"
            padding="$4"
            backgroundColor="$background"
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
            opacity={0.1}
          >
            <YStack marginBottom="$4">
              <XStack marginBottom="$2" space="$2" alignItems="center">
                <Smartphone size={20} color="currentColor" />
                <Heading
                  fontSize="$6"
                  lineHeight="$6"
                  fontWeight="600"
                  color="$color"
                >
                  Haptics
                </Heading>
              </XStack>
              <Text
                fontSize="$3"
                lineHeight="$3"
                fontWeight="400"
                color="$color"
                opacity={0.7}
              >
                Short tactile vibrations that reinforce interactions. Use <Text fontWeight="600">light</Text> feedback for low-risk taps (like menu tabs) and <Text fontWeight="600">medium</Text> feedback for primary actions (like cards or main buttons). Use <Text fontWeight="600">success/error</Text> notifications for confirmations.
              </Text>
            </YStack>
            <HapticsPreview />
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
