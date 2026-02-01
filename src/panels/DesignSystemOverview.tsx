import React from 'react';
import { YStack, Heading, Text, ScrollView } from 'tamagui';
import { BUILDER_LAYOUT } from '../config/builderLayout';
import {
  Type,
  Palette,
  Grid,
  CornerUpRight,
  Layers,
  Play,
  Smartphone
} from 'lucide-react';
import { ShowcaseSection } from '../components/ShowcaseSection';
import { useDesignSystem } from '../state/designSystem';

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
  const { tokens } = useDesignSystem();

  return (
    <ScrollView maxHeight="100vh">
      <YStack
        padding={BUILDER_LAYOUT.panelPadding}
        backgroundColor="$background"
        minHeight="100%"
        paddingBottom="$10"
        gap="$5"
      >
        {/* TOKENS HEADER */}
        <YStack gap="$2">
          <Heading
            fontSize={tokens.h2.size}
            lineHeight={tokens.h2.line}
            fontWeight={tokens.h2.weight}
            color="$color"
          >
            Design Tokens
          </Heading>
          <Text
            fontSize={tokens.body.size}
            lineHeight={tokens.body.line}
            color="$color"
            opacity={0.6}
          >
            Foundational design elements that define your system's visual language
          </Text>
        </YStack>

        {/* Typography Scale */}
        <ShowcaseSection
          title="Typography Scale"
          description="Type styles that set hierarchy—headlines, body, captions. Change these to give your product a distinct voice."
          icon={Type}
          borderless={false}
        >
          <TypeScaleTable />
        </ShowcaseSection>

        {/* Color Roles */}
        <ShowcaseSection
          title="Color Roles"
          description="Brand and UI colors used across components. These are semantic—change the role, and the whole system updates."
          icon={Palette}
          borderless={false}
        >
          <ColorSwatch />
        </ShowcaseSection>

        {/* Spacing Ladder */}
        <ShowcaseSection
          title="Spacing Ladder"
          description="Consistent rhythm so screens feel intentional. Based on an 8-pt scale."
          icon={Grid}
          borderless={false}
        >
          <SpacingLadder />
        </ShowcaseSection>

        {/* Corner Radii */}
        <ShowcaseSection
          title="Corner Radii"
          description="How rounded surfaces are. Small for dense controls, medium for cards, large for modals, full for pills."
          icon={CornerUpRight}
          borderless={false}
        >
          <RadiiChips />
        </ShowcaseSection>

        {/* Elevation (Shadows) */}
        <ShowcaseSection
          title="Elevation (Shadows)"
          description="Depth cues. Use subtle for resting cards, medium for interactive popovers, strong for modals."
          icon={Layers}
          borderless={false}
        >
          <ElevationTiles />
        </ShowcaseSection>

        {/* Motion */}
        <ShowcaseSection
          title="Motion"
          description="How fast and smooth UI moves. All demos use your duration and easing tokens."
          icon={Play}
          borderless={false}
        >
          <YStack gap="$6">
            <EasingCurve />
            <CardEntrances />
          </YStack>
        </ShowcaseSection>

        {/* Haptics */}
        <ShowcaseSection
          title="Haptics"
          description="Short tactile vibrations that reinforce interactions for touch devices."
          icon={Smartphone}
          borderless={false}
        >
          <HapticsPreview />
        </ShowcaseSection>

      </YStack>
    </ScrollView>
  );
}
