import React, { useEffect, useState } from 'react';
import { Copy, Layers3, Palette, LayoutGrid, Smartphone, SlidersHorizontal, X } from 'lucide-react';
import { XStack, YStack, ScrollView, TextArea, Dialog, Adapt, Sheet, useMedia } from 'tamagui';
import { Button } from '@/design-system/components/Button';
import { Body, Caption } from '@/design-system/components/Text';
import { Sidebar } from '@/components/Sidebar';
import { PreviewPhoneTamagui } from '@/components/PreviewPhoneTamagui';
import DesignSystemOverview from '@/components/DesignSystemOverview';
import TamaguiShowcase from '@/panels/TamaguiShowcase';
import PatternsShowcase from '@/panels/PatternsShowcase';

import { useToast } from '@/hooks/use-toast';

import { useDesignSystem, fontFamilyMap } from '@/state/designSystem';
import { deriveShadowColor } from '@/utils/colorGeneration';
import { stylePresets } from '@/config/stylePresets';

const fonts = [
  { name: 'Plus Jakarta Sans', class: 'font-jakarta' },
  { name: 'Be Vietnam Pro', class: 'font-vietnam' },
  { name: 'Wix Madefor Text', class: 'font-wix' },
  { name: 'Figtree', class: 'font-figtree' },
  { name: 'Albert Sans', class: 'font-albert' },
  { name: 'Satoshi', class: 'font-satoshi' },
];

type PanelView = 'atoms' | 'components' | 'patterns';
type CompactView = 'preview' | PanelView;

const PANEL_TABS = [
  { id: 'atoms', label: 'Atoms', Icon: Palette },
  { id: 'components', label: 'Components', Icon: Layers3 },
  { id: 'patterns', label: 'Patterns', Icon: LayoutGrid },
] as const;

// The phone earns its own tab below the three-pane breakpoint, where there is
// no room to show the device and a showcase panel side by side.
const COMPACT_TABS = [
  { id: 'preview', label: 'Preview', Icon: Smartphone },
  ...PANEL_TABS,
] as const;

const Index = () => {
  const designSystem = useDesignSystem();

  const {
    isDarkMode,
    selectedTheme,
    customPrimaryColor,
    selectedAccentColor,
    customAccentColor,
    selectedScale,
    selectedPrimaryFont,
    selectedDisplayFont,
    stylePresetId: selectedStylePreset,
    spacingMode,
    cornerRadius,
    haptics,
    tokens,
    opts
  } = designSystem;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const [rightPanelView, setRightPanelView] = useState<PanelView>('atoms');

  // Below `md` the sidebar (300) + phone (420) + a usable showcase column no
  // longer fit, so the three panes collapse into one column with the controls
  // behind a drawer.
  const media = useMedia();
  const isCompact = media.md;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [compactView, setCompactView] = useState<CompactView>('preview');

  // Growing back to the wide layout has to close the drawer, otherwise the
  // sheet stays parked over a sidebar that is already on screen.
  useEffect(() => {
    if (!isCompact) setIsSidebarOpen(false);
  }, [isCompact]);

  // Map border weight to pixel values - Builder UI dogfoods its own design system
  const borderWidthMap = {
    none: 0,
    thin: 1,
    thick: 2
  };

  const colorThemes = {
    custom: customPrimaryColor,
    turquoise: '#1abc9c',
    emerald: '#2ecc71',
    'peter-river': '#3498db',
    amethyst: '#9b59b6',
    'wet-asphalt': '#34495e',
    'sun-flower': '#f1c40f',
    carrot: '#e67e22',
    alizarin: '#e74c3c',
    concrete: '#95a5a6',
    orange: '#f39c12',
    pumpkin: '#d35400',
    pomegranate: '#c0392b',
    nephritis: '#27ae60',
    'belize-hole': '#2980b9',
    wisteria: '#8e44ad',
    'midnight-blue': '#2c3e50',
    asbestos: '#7f8c8d'
  };



  // ... (inside component)

  const generatePrompt = () => {
    // 1. Get the current style preset details
    const activePreset = stylePresets.find(p => p.id === selectedStylePreset) || stylePresets[0];
    const presetTokens = activePreset.tokens;

    // Every sidebar control has to reach the prompt — a setting the user can
    // change that the megaprompt never mentions is a silently dropped decision.
    const bodyFontFamily = fontFamilyMap[selectedPrimaryFont] || tokens.fontFamily;
    const displayFontFamily = fontFamilyMap[selectedDisplayFont] || bodyFontFamily;

    // Preset shadows can reference --shadow-color; the prompt has to ship a
    // literal, since the target codebase has none of our CSS variables.
    const [r, g, b] = tokens.brand.split(' ').map(Number);
    const brandHex = '#' + [r, g, b].map((c) => (c || 0).toString(16).padStart(2, '0')).join('');
    const shadowColor = deriveShadowColor(brandHex, isDarkMode);
    const shadow = (value: string) => value.replace(/var\(--shadow-color[^)]*\)/g, shadowColor);

    // 2. Construct the Megaprompt XML
    const prompt = `<DesignSystemMegaprompt version="3.0" stack="React Native + Tamagui">
  
  <Objective>
    Generate a token-first design system using **Tamagui** for React Native.
    NO HARD-CODED VALUES. All styles must reference the Design Tokens defined below.
  </Objective>

  <ImplementationRules>
    <Rule>Use 'createTamagui' to define tokens, fonts, and themes.</Rule>
    <Rule>Use 'styled()' factory for components to ensure performant optimization. Do not use inline styles.</Rule>
    <Rule>Do NOT create a parallel component library (like raw View/Text wrappers); extend Tamagui primitives (Stack, Text).</Rule>
    <Rule>Verify ASSERTIONS before finalizing code.</Rule>
  </ImplementationRules>

  <AccessibilityGuidelines>
    <Guideline>WCAG AA standard for text contrast.</Guideline>
    <Guideline>Focus rings must be visible (use 'focusStyle' prop) and >= 2px thick.</Guideline>
    <Guideline>Touch targets must be at least 44x44 points.</Guideline>
    <Guideline>Body text must be at least 14px (16px preferred).</Guideline>
    <Guideline>Respect reduced-motion settings using Tamagui media queries or 'disableAnimations' prop.</Guideline>
  </AccessibilityGuidelines>

  <ProjectSetup>
    <Framework>React Native (Expo SDK 54+)</Framework>
    <UIFramework>Tamagui (latest)</UIFramework>
    <Language>TypeScript</Language>
    <Icons>Lucide React Native</Icons>
  </ProjectSetup>

  <Selections>
    <!-- The choices made in the builder. Honour these, don't re-derive them. -->
    <StylePreset id="${activePreset.id}" name="${activePreset.name}">${activePreset.description}</StylePreset>
    <TypeScale>${selectedScale}</TypeScale>
    <SpacingDensity>${spacingMode}</SpacingDensity>
    <CornerRadius>${cornerRadius}</CornerRadius>
    <ColorScheme>${isDarkMode ? 'dark' : 'light'}</ColorScheme>
    <PrimaryNavigation>${opts.menuLayout === 'hamburger' ? 'Hamburger drawer (no bottom tab bar)' : 'Bottom tab bar'}</PrimaryNavigation>
  </Selections>

  <DesignTokens>
    <!-- INSTRUCTION: Implement these tokens in 'tamagui.config.ts' -->
    
    <Colors format="R G B (space separated, for rgb() with alpha)">
      <!-- Base Ranges -->
      <!-- 'brand' is the picked primary, deepened where needed so white text on
           a solid brand fill clears WCAG AA. Use it as-is. -->
      <Token name="brand" value="${tokens.brand}" />
      <!-- 'brandWeak' is the secondary/accent colour from the builder -->
      <Token name="brandWeak" value="${tokens.brandWeak}" />
      <Token name="textPrimary" value="${tokens.textPrimary}" />
      <Token name="textSecondary" value="${tokens.textSecondary}" />
      <Token name="textDisabled" value="${tokens.textDisabled}" />
      <Token name="bgPrimary" value="${tokens.bgPrimary}" />
      <Token name="bgSecondary" value="${tokens.bgSecondary}" />
      <Token name="border" value="${tokens.border}" />
      
      <!-- Semantic Roles -->
      <Token name="success" value="${tokens.success}" />
      <Token name="warning" value="${tokens.warning}" />
      <Token name="danger" value="${tokens.danger}" />
      <Token name="info" value="${tokens.info}" />
      <Token name="focus" value="${tokens.focus}" />
    </Colors>

    <Typography bodyFamily="${bodyFontFamily}" displayFamily="${displayFontFamily}">
      <!-- Display/H1/H2/H3/Subhead use displayFamily; everything else uses bodyFamily -->
      <Scale>
        <Variant name="displayLg" size="${tokens.displayLg.size}" lineHeight="${tokens.displayLg.line}" weight="${tokens.displayLg.weight}" />
        <Variant name="h1" size="${tokens.h1.size}" lineHeight="${tokens.h1.line}" weight="${tokens.h1.weight}" />
        <Variant name="h2" size="${tokens.h2.size}" lineHeight="${tokens.h2.line}" weight="${tokens.h2.weight}" />
        <Variant name="h3" size="${tokens.h3.size}" lineHeight="${tokens.h3.line}" weight="${tokens.h3.weight}" />
        <Variant name="subhead" size="${tokens.subhead.size}" lineHeight="${tokens.subhead.line}" weight="${tokens.subhead.weight}" />
        <Variant name="body" size="${tokens.body.size}" lineHeight="${tokens.body.line}" weight="${tokens.body.weight}" />
        <Variant name="caption" size="${tokens.caption.size}" lineHeight="${tokens.caption.line}" weight="${tokens.caption.weight}" />
        <Variant name="button" size="${tokens.button.size}" lineHeight="${tokens.button.line}" weight="${tokens.button.weight}" letterSpacing="${tokens.button.track}" />
        <Variant name="eyebrow" size="${tokens.eyebrow.size}" lineHeight="${tokens.eyebrow.line}" weight="${tokens.eyebrow.weight}" letterSpacing="${tokens.eyebrow.track}" uppercase="${tokens.eyebrow.uppercase}" />
      </Scale>
    </Typography>

    <Spacing>
      <!-- Base 8pt Grid Scale -->
      ${tokens.space.map((s, i) => `<Space key="${i + 1}" value="${s}px" />`).join('\n      ')}
    </Spacing>

    <Radii>
      <!-- The style preset's shape profile, scaled by the Corner Radius choice -->
      <Radius name="none" value="0px" />
      <Radius name="sm" value="${tokens.radius.sm}" />
      <Radius name="md" value="${tokens.radius.md}" />
      <Radius name="lg" value="${tokens.radius.lg}" />
      <Radius name="xl" value="${tokens.radius.lg}" />
      <Radius name="full" value="${tokens.radius.full}" />
    </Radii>

    <Shadows preset="${activePreset.name}">
      <!-- ${activePreset.description} -->
      <Shadow name="sm" value="${shadow(presetTokens.shadows.sm)}" />
      <Shadow name="md" value="${shadow(presetTokens.shadows.md)}" />
      <Shadow name="lg" value="${shadow(presetTokens.shadows.lg)}" />
    </Shadows>

    <Animations>
      <Curve>${presetTokens.animations.curve}</Curve>
      <Duration name="quick" value="${presetTokens.animations.quick}ms" />
      <Duration name="normal" value="${presetTokens.animations.normal}ms" />
      <Duration name="slow" value="${presetTokens.animations.slow}ms" />
    </Animations>
  </DesignTokens>

  <ComponentRecipes>
    <!-- Use CVA (variants) in Tamagui styled() components -->
    
    <ButtonHierarchy requiredTypes="5">
      <Type name="Primary">Background: $brand, Text: $bgSecondary, Radius: $${presetTokens.button.radiusKey}</Type>
      <Type name="Secondary">Border: $brand (thin), Text: $brand, Background: transparent</Type>
      <Type name="Tertiary/Ghost">Text: $brand, Background: transparent, No border</Type>
      <Type name="Destructive">Background: $danger, Text: white</Type>
      <Type name="Disabled">Background: $bgSecondary, Text: $textDisabled, Opacity: 0.5</Type>
      
      <States>
        <State name="Hover">Opacity: 0.9</State>
        <State name="Pressed">Opacity: 0.8</State>
        <State name="Focus">Visible ring using $focus token</State>
      </States>
    </ButtonHierarchy>

    <InputsAndForms>
      <Element name="TextField">Background: $bgSecondary, Border: $border, Radius: $${presetTokens.input.radiusKey}</Element>
      <Element name="Select">Background: $bgSecondary, Border: $border</Element>
      <States>
        <State name="Focus">BorderColor: $focus, Ring: $focus (2px)</State>
        <State name="Error">BorderColor: $danger</State>
        <State name="Disabled">Opacity: 0.5, PointerEvents: none</State>
      </States>
    </InputsAndForms>

    <Surfaces>
      <Card>Background: $bgSecondary, Shadow: $${presetTokens.card.shadowKey}, Radius: $${presetTokens.card.radiusKey}</Card>
      <Dialog>Overlay: Scrim (opacity 50%), Surface: $bgSecondary, Shadow: $lg, Radius: $lg</Dialog>
    </Surfaces>

    <Navigation layout="${opts.menuLayout}">
      ${opts.menuLayout === 'hamburger'
        ? `<Element name="AppBar">Leading hamburger button opens a left drawer. No bottom tab bar.</Element>
      <Element name="Drawer">Slides from the left over a 40% scrim; active row tinted with $brand at 10% alpha.</Element>`
        : `<Element name="TabBar">Fixed bottom bar, 5 items max, icon over label. Active item uses $brand.</Element>
      <Element name="AppBar">Title plus trailing actions. No hamburger.</Element>`}
    </Navigation>
  </ComponentRecipes>

  <Haptics enabled="${haptics.enabled}" platform="${haptics.stack}">
    <!-- Map these to the platform's own haptics API -->
    <Feedback trigger="Menu / selection tap">${haptics.tapLight}</Feedback>
    <Feedback trigger="Primary action">${haptics.tapMedium}</Feedback>
    <Feedback trigger="Success">${haptics.notifySuccess}</Feedback>
    <Feedback trigger="Error">${haptics.notifyError}</Feedback>
  </Haptics>

  <Assertions>
    <Check>No hard-coded hex codes or pixels outside 'tamagui.config.ts'.</Check>
    <Check>Theme switching works by swapping Tamagui themes (light/dark) or CSS vars.</Check>
    <Check>Interactive states (hover/press/focus) derive from tokens.</Check>
    <Check>Focus rings are visible and tokenized.</Check>
    <Check>Spacing and Density changes happen via token overrides only.</Check>
  </Assertions>
  
  <StickyGuidelines>
    Token-only styling; AA contrast; visible focus ring; 44x44 targets; reduced-motion support; light/dark via token swap; do NOT introduce literals.
  </StickyGuidelines>
</DesignSystemMegaprompt>`;

    return prompt;
  };

  const copyToClipboard = async () => {
    try {
      const prompt = generatePrompt();
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "Prompt copied!",
        description: "The design system prompt has been copied to your clipboard.",
      });
      setIsDialogOpen(false);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the prompt to clipboard.",
        variant: "destructive",
      });
    }
  };

  const renderPanel = (view: PanelView) => {
    if (view === 'atoms') return <DesignSystemOverview />;
    if (view === 'components') return <TamaguiShowcase />;
    return <PatternsShowcase />;
  };

  const megapromptDialog = (
          <Dialog modal open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild>
              {/* Builder chrome uses the same Button + type tokens as everything
                  else it generates — no bespoke sizes. */}
              <Button
                variant="secondary"
                size="small"
                gap="$2"
                flexShrink={0}
                onPress={() => setIsDialogOpen(true)}
              >
                <Copy size={15} color="rgb(var(--color-brand))" />
                {/* The full label is what overflowed a phone-width header. */}
                <Caption color="$brand" fontWeight="600" numberOfLines={1}>
                  {isCompact ? 'Generate' : 'Generate Megaprompt'}
                </Caption>
              </Button>
            </Dialog.Trigger>

            <Adapt when="sm" platform="touch">
              {/* Without a snap point the sheet sizes to its content, so the
                  400pt textarea pushed the copy button off the bottom edge. */}
              <Sheet
                animation="medium"
                zIndex={200000}
                modal
                dismissOnSnapToBottom
                snapPointsMode="percent"
                snapPoints={[92]}
              >
                <Sheet.Frame padding="$4" gap="$4">
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay
                  animation="lazy"
                  backgroundColor="black"
                  opacity={0.5}
                  enterStyle={{ opacity: 0 }}
                  exitStyle={{ opacity: 0 }}
                />
              </Sheet>
            </Adapt>

            <Dialog.Portal>
              <Dialog.Overlay
                key="overlay"
                animation="quick"
                opacity={0.5}
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
                backgroundColor="black"
              />

              <Dialog.Content
                bordered
                elevate
                key="content"
                animateOnly={['transform', 'opacity']}
                animation={[
                  'quick',
                  {
                    opacity: {
                      overshootClamping: true,
                    },
                  },
                ]}
                enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                gap="$4"
                width={896}
                maxWidth="90vw"
                maxHeight="80vh"
                backgroundColor="$background"
              >
                {/* Type tokens are explicit here: the description's inherited
                    line height collapses to ~1px, so a wrapped second line
                    lands back on top of the title at narrow widths. */}
                <Dialog.Title
                  fontSize="$h2"
                  lineHeight="$h2"
                  fontWeight="700"
                  paddingRight="$8"
                >
                  React Native Design System Megaprompt
                </Dialog.Title>
                <Dialog.Description
                  fontSize="$body"
                  lineHeight="$body"
                  color="$textSecondary"
                >
                  Generate a complete React Native design system with Tamagui for cross-platform apps
                </Dialog.Description>
                <YStack gap="$4">
                  <TextArea
                    minHeight={220}
                    $gtSm={{ minHeight: 400 }}
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    fontSize={13}
                    lineHeight={20}
                    // Explicit padding: Tamagui derives an input's padding from
                    // its size token, which lands on the far end of the space
                    // ramp now that those tokens are CSS variables.
                    paddingHorizontal={16}
                    paddingVertical={12}
                    borderWidth={1}
                    borderColor="$borderColor"
                    borderRadius="$input"
                    backgroundColor="$bgSecondary"
                    value={generatePrompt()}
                    readOnly
                  />
                  <XStack justifyContent="flex-end">
                    <Button variant="primary" size="medium" gap="$2" onPress={copyToClipboard}>
                      <Copy size={16} />
                      <Body color="white" fontWeight="600">Copy to Clipboard</Body>
                    </Button>
                  </XStack>
                </YStack>

                <Dialog.Close asChild>
                  <Button
                    variant="ghost"
                    size="small"
                    position="absolute"
                    top="$3"
                    right="$3"
                    width={32}
                    minHeight={32}
                    padding={0}
                    borderRadius="$full"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </Button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog>
  );

  const tabButton = (
    id: string,
    label: string,
    Icon: typeof Palette,
    isActive: boolean,
    onPress: () => void,
  ) => (
    <Button
      key={id}
      variant={isActive ? 'primary' : 'ghost'}
      size="small"
      gap="$2"
      flexShrink={0}
      onPress={onPress}
      aria-pressed={isActive}
    >
      <Icon size={15} color={isActive ? 'white' : 'rgb(var(--color-text-secondary))'} />
      <Caption color={isActive ? 'white' : '$textSecondary'} fontWeight="600" numberOfLines={1}>
        {label}
      </Caption>
    </Button>
  );

  return (
    <XStack
      flexDirection={isCompact ? 'column' : 'row'}
      height="100vh"
      width="100%"
      maxWidth="100%"
      overflow="hidden"
      backgroundColor="$background"
      data-preset={selectedStylePreset}
    >
      {/* Left Sidebar — a drawer once the three panes stop fitting */}
      {!isCompact && (
        <XStack minWidth={280} flexShrink={0}>
          <Sidebar height="100%" />
        </XStack>
      )}

      {/* Main Content Area */}
      <YStack flex={1} minWidth={0} minHeight={0} height={isCompact ? undefined : '100%'}>
        {/* Header */}
        <XStack
          padding="$3"
          $gtMd={{ padding: '$4' }}
          alignItems="center"
          justifyContent={isCompact ? 'space-between' : 'flex-end'}
          gap="$2"
          flexShrink={0}
          borderBottomWidth={borderWidthMap[opts.cardBorderWeight]}
          borderBottomColor="$borderColor"
          backgroundColor="$background"
        >
          {isCompact && (
            <XStack alignItems="center" gap="$2" flexShrink={1} minWidth={0}>
              <Button
                variant="ghost"
                size="small"
                gap="$2"
                flexShrink={0}
                onPress={() => setIsSidebarOpen(true)}
                aria-label="Open design controls"
              >
                <SlidersHorizontal size={16} color="rgb(var(--color-text-primary))" />
                <Caption color="$textPrimary" fontWeight="600">Customize</Caption>
              </Button>
            </XStack>
          )}

          {megapromptDialog}
        </XStack>

        {isCompact ? (
          /* Single column: one pane at a time, chosen from the tab strip */
          <YStack flex={1} minHeight={0} backgroundColor="$background">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              flexGrow={0}
              flexShrink={0}
              borderBottomWidth={borderWidthMap[opts.cardBorderWeight]}
              borderBottomColor="$borderColor"
              backgroundColor="$background"
            >
              <XStack padding="$3" gap="$2">
                {COMPACT_TABS.map(({ id, label, Icon }) =>
                  tabButton(id, label, Icon, compactView === id, () => {
                    setCompactView(id);
                    if (id !== 'preview') setRightPanelView(id);
                  }),
                )}
              </XStack>
            </ScrollView>

            <YStack flex={1} minHeight={0} overflowY="auto">
              {compactView === 'preview' ? (
                <YStack alignItems="center" justifyContent="flex-start">
                  <PreviewPhoneTamagui key={selectedStylePreset} />
                </YStack>
              ) : (
                <YStack padding="$4">{renderPanel(compactView)}</YStack>
              )}
            </YStack>
          </YStack>
        ) : (
          /* Preview Panels */
          <XStack flex={1} minWidth={0} minHeight={0} overflow="hidden">
            {/* Mobile App Preview */}
            <XStack
              width={420}
              flexShrink={0}
              borderRightWidth={borderWidthMap[opts.cardBorderWeight]}
              borderRightColor="$borderColor"
              alignItems="center"
              justifyContent="center"
              backgroundColor="$background"
            >
              <PreviewPhoneTamagui key={selectedStylePreset} />
            </XStack>

            {/* Right Panel - Tailwind Components or Design Tokens */}
            <YStack flex={1} minWidth={0} backgroundColor="$background">
              <XStack
                padding="$3"
                borderBottomWidth={borderWidthMap[opts.cardBorderWeight]}
                borderBottomColor="$borderColor"
                gap="$2"
                backgroundColor="$background"
              >
                {PANEL_TABS.map(({ id, label, Icon }) =>
                  tabButton(id, label, Icon, rightPanelView === id, () => setRightPanelView(id)),
                )}
              </XStack>

              <YStack flex={1} minHeight={0} overflowY="auto" padding="$6">
                {renderPanel(rightPanelView)}
              </YStack>
            </YStack>
          </XStack>
        )}
      </YStack>

      {/* Controls drawer for the compact layout */}
      <Sheet
        modal
        open={isCompact && isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        snapPointsMode="percent"
        snapPoints={[92]}
        dismissOnSnapToBottom
        animation="medium"
        zIndex={200000}
      >
        <Sheet.Overlay
          animation="lazy"
          backgroundColor="black"
          opacity={0.4}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Sheet.Frame
          backgroundColor="$background"
          borderTopLeftRadius="$card"
          borderTopRightRadius="$card"
        >
          <XStack
            paddingHorizontal="$4"
            paddingTop="$3"
            paddingBottom="$2"
            alignItems="center"
            justifyContent="space-between"
            gap="$2"
          >
            <Body fontWeight="700" numberOfLines={1}>Design System Builder</Body>
            <Button
              variant="ghost"
              size="small"
              padding={0}
              width={32}
              minHeight={32}
              borderRadius="$full"
              onPress={() => setIsSidebarOpen(false)}
              aria-label="Close design controls"
            >
              <X size={16} color="rgb(var(--color-text-primary))" />
            </Button>
          </XStack>

          <YStack flex={1} minHeight={0}>
            <Sidebar width="100%" height="100%" bordered={false} showHeading={false} />
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </XStack>
  );
};

export default Index;