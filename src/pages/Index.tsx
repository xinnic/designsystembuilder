import React, { useState } from 'react';
import { Copy, Layers3, Palette, LayoutGrid, X } from 'lucide-react';
import { XStack, YStack, Button as TamaguiButton, Text, TextArea, Dialog, Adapt, Sheet } from 'tamagui';
import { Sidebar } from '@/components/Sidebar';
import { PreviewPhoneTamagui } from '@/components/PreviewPhoneTamagui';
import DesignSystemOverview from '@/components/DesignSystemOverview';
import TamaguiShowcase from '@/panels/TamaguiShowcase';
import PatternsShowcase from '@/panels/PatternsShowcase';

import { useToast } from '@/hooks/use-toast';

import { useDesignSystem } from '@/state/designSystem';
import { stylePresets } from '@/config/stylePresets';

const fonts = [
  { name: 'Plus Jakarta Sans', class: 'font-jakarta' },
  { name: 'Be Vietnam Pro', class: 'font-vietnam' },
  { name: 'Wix Madefor Text', class: 'font-wix' },
  { name: 'Figtree', class: 'font-figtree' },
  { name: 'Albert Sans', class: 'font-albert' },
  { name: 'Satoshi', class: 'font-satoshi' },
];

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
    tokens,
    opts
  } = designSystem;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const [rightPanelView, setRightPanelView] = useState<'atoms' | 'components' | 'patterns'>('atoms');

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
    <Framework>React Native (Expo SDK 50+)</Framework>
    <UIFramework>Tamagui (latest)</UIFramework>
    <Language>TypeScript</Language>
    <Icons>Lucide React Native</Icons>
  </ProjectSetup>

  <DesignTokens>
    <!-- INSTRUCTION: Implement these tokens in 'tamagui.config.ts' -->
    
    <Colors>
      <!-- Base Ranges -->
      <Token name="brand" value="${tokens.brand}" />
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

    <Typography family="${tokens.fontFamily}">
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
      <Radius name="sm" value="${tokens.radius.sm}" />
      <Radius name="md" value="${tokens.radius.md}" />
      <Radius name="lg" value="${tokens.radius.lg}" />
      <Radius name="full" value="${tokens.radius.full}" />
    </Radii>

    <Shadows preset="${activePreset.name}">
      <!-- ${activePreset.description} -->
      <Shadow name="sm" value="${presetTokens.shadows.sm}" />
      <Shadow name="md" value="${presetTokens.shadows.md}" />
      <Shadow name="lg" value="${presetTokens.shadows.lg}" />
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
  </ComponentRecipes>

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

  return (
    <XStack
      height="100vh"
      width="100vw"
      overflow="hidden"
      backgroundColor="$background"
      data-preset={selectedStylePreset}
    >
      {/* Left Sidebar */}
      <XStack minWidth={280} flexShrink={0}>
        <Sidebar />
      </XStack>

      {/* Main Content Area */}
      <YStack flex={1} height="100%">
        {/* Header */}
        <XStack
          padding="$4"
          justifyContent="flex-end"
          borderBottomWidth={borderWidthMap[opts.cardBorderWeight]}
          borderBottomColor="$borderColor"
          backgroundColor="$background"
        >
          <Dialog modal open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild>
              <TamaguiButton theme="active" icon={<Copy size={16} />} onPress={() => setIsDialogOpen(true)} size="$3">Generate Megaprompt</TamaguiButton>
            </Dialog.Trigger>
            
            <Adapt when="sm" platform="touch">
              <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
                <Sheet.Frame padding="$4" gap="$5">
                  <Adapt.Contents />
                </Sheet.Frame>
                <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
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
                <Dialog.Title>React Native Design System Megaprompt</Dialog.Title>
                <Dialog.Description>
                  Generate a complete React Native design system with Tamagui for cross-platform apps
                </Dialog.Description>
                <YStack gap="$4">
                  <TextArea
                    minHeight={400}
                    fontFamily="$mono"
                    fontSize="$3"
                    value={generatePrompt()}
                    readOnly
                  />
                  <XStack justifyContent="flex-end">
                    <TamaguiButton onPress={copyToClipboard} size="$3" icon={<Copy size={16} />}>
                      Copy to Clipboard
                    </TamaguiButton>
                  </XStack>
                </YStack>
                
                <Dialog.Close asChild>
                  <TamaguiButton
                    position="absolute"
                    top="$3"
                    right="$3"
                    size="$2"
                    circular
                    icon={<X size={16} />}
                  />
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog>
        </XStack>

        {/* Preview Panels */}
        <XStack flex={1} minWidth={0} overflow="hidden">
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
          <YStack flex={1} backgroundColor="$background">
            <XStack
              padding="$3"
              borderBottomWidth={borderWidthMap[opts.cardBorderWeight]}
              borderBottomColor="$borderColor"
              gap="$2"
              backgroundColor="$background"
            >
              <TamaguiButton
                theme={rightPanelView === 'atoms' ? 'active' : undefined}
                chromeless={rightPanelView !== 'atoms'}
                onPress={() => setRightPanelView('atoms')}
                size="$3"
              >
                <XStack gap="$2" alignItems="center">
                  <Palette size={12} />
                  <Text size="$1">Atoms</Text>
                </XStack>
              </TamaguiButton>
              <TamaguiButton
                theme={rightPanelView === 'components' ? 'active' : undefined}
                chromeless={rightPanelView !== 'components'}
                onPress={() => setRightPanelView('components')}
                size="$3"
              >
                <XStack gap="$2" alignItems="center">
                  <Layers3 size={12} />
                  <Text size="$1">Components</Text>
                </XStack>
              </TamaguiButton>
              <TamaguiButton
                theme={rightPanelView === 'patterns' ? 'active' : undefined}
                chromeless={rightPanelView !== 'patterns'}
                onPress={() => setRightPanelView('patterns')}
                size="$3"
              >
                <XStack gap="$2" alignItems="center">
                  <LayoutGrid size={12} />
                  <Text size="$1">Patterns</Text>
                </XStack>
              </TamaguiButton>
            </XStack>

            <YStack flex={1} overflowY="auto" padding="$6">
              {rightPanelView === 'atoms' && <DesignSystemOverview />}
              {rightPanelView === 'components' && <TamaguiShowcase />}
              {rightPanelView === 'patterns' && <PatternsShowcase />}
            </YStack>
          </YStack>
        </XStack>

      </YStack>
    </XStack>
  );
};

export default Index;