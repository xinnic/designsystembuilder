import React from 'react';
import { ChevronDown, Check, Settings, Layers, Sliders, Navigation, Menu, Minimize, Maximize, RectangleHorizontal, PanelBottom, GalleryVerticalEnd, MoveDiagonal, LayoutTemplate } from 'lucide-react';
import { YStack, XStack, ScrollView, Text, Heading, Separator, Button as TamaguiButton, Select, Adapt, Sheet, useTheme } from 'tamagui';
import StylingControls from '../left/StylingControls';
import { BUILDER_LAYOUT } from '../config/builderLayout';
import { BuilderAccordion } from './builder-ui/BuilderAccordion';
import { BuilderColorSwatch } from './builder-ui/BuilderColorSwatch';
import { BuilderSectionLabel } from './builder-ui/BuilderSectionLabel';
import { BuilderOptionCard } from './builder-ui/BuilderOptionCard';
import { BuilderSwitch } from './builder-ui/BuilderSwitch';
import { useDesignSystem } from '../state/designSystem';
import { generateSecondaryColor } from '../utils/colorGeneration';
import {
  colorThemes,
  accentColors,
  RAINBOW_GRADIENT,
  DEFAULT_PRIMARY,
  DEFAULT_ACCENT,
} from '../config/colorThemes';
import { stylePresets, getStylePreset, type StylePresetId } from '../config/stylePresets';
import { useToast } from '@/hooks/use-toast';
import { usePresetTheme } from '../hooks/usePresetTheme';

interface SidebarProps {
  /** Fills the drawer when the sidebar is presented as a sheet on small screens. */
  width?: number | string;
  height?: number | string;
  /** The right-hand rule only makes sense next to the canvas, not inside a drawer. */
  bordered?: boolean;
  /** The mobile top bar already names the app, so the drawer drops the masthead. */
  showHeading?: boolean;
}

// Primary fonts (Sans-serif only - for body text)
const primaryFonts = [
  { name: 'Plus Jakarta Sans', class: 'font-jakarta' },
  { name: 'Be Vietnam Pro', class: 'font-vietnam' },
  { name: 'Wix Madefor Text', class: 'font-wix' },
  { name: 'Figtree', class: 'font-figtree' },
  { name: 'Albert Sans', class: 'font-albert' },
  { name: 'Satoshi', class: 'font-satoshi' },
  { name: 'Epilogue', class: 'font-epilogue' },
  { name: 'Manrope', class: 'font-manrope' },
  { name: 'Public Sans', class: 'font-public' },
  { name: 'Space Grotesk', class: 'font-space' },
  { name: 'Work Sans', class: 'font-work' },
  { name: 'Source Sans 3', class: 'font-source-sans' },
  { name: 'Nunito Sans', class: 'font-nunito' },
  { name: 'Arimo', class: 'font-arimo' },
  { name: 'Hanken Grotesk', class: 'font-hanken' },
  { name: 'Rubik', class: 'font-rubik' },
  { name: 'DM Sans', class: 'font-dm' },
  { name: 'IBM Plex Sans', class: 'font-ibm' },
  { name: 'Sora', class: 'font-sora' },
  { name: 'Montserrat', class: 'font-montserrat' },
];

// Display fonts (All fonts including serif - for headings and titles)
const displayFonts = [
  { name: 'Plus Jakarta Sans', class: 'font-jakarta' },
  { name: 'Be Vietnam Pro', class: 'font-vietnam' },
  { name: 'Wix Madefor Text', class: 'font-wix' },
  { name: 'Figtree', class: 'font-figtree' },
  { name: 'Albert Sans', class: 'font-albert' },
  { name: 'Satoshi', class: 'font-satoshi' },
  { name: 'Epilogue', class: 'font-epilogue' },
  { name: 'Manrope', class: 'font-manrope' },
  { name: 'Public Sans', class: 'font-public' },
  { name: 'Space Grotesk', class: 'font-space' },
  { name: 'Work Sans', class: 'font-work' },
  { name: 'Source Sans 3', class: 'font-source-sans' },
  { name: 'Nunito Sans', class: 'font-nunito' },
  { name: 'Arimo', class: 'font-arimo' },
  { name: 'Hanken Grotesk', class: 'font-hanken' },
  { name: 'Rubik', class: 'font-rubik' },
  { name: 'DM Sans', class: 'font-dm' },
  { name: 'IBM Plex Sans', class: 'font-ibm' },
  { name: 'Sora', class: 'font-sora' },
  { name: 'Montserrat', class: 'font-montserrat' },
  { name: 'Newsreader', class: 'font-newsreader' },
  { name: 'Noto Serif', class: 'font-noto' },
  { name: 'Domine', class: 'font-domine' },
  { name: 'Libre Caslon Text', class: 'font-libre' },
  { name: 'EB Garamond', class: 'font-garamond' },
  { name: 'Literata', class: 'font-literata' },
  { name: 'Source Serif 4', class: 'font-source-serif' },
];

export function Sidebar({
  width = 300,
  height = '100%',
  bordered = true,
  showHeading = true,
}: SidebarProps) {
  const {
    selectedPrimaryFont,
    setPrimaryFont,
    selectedDisplayFont,
    setDisplayFont,
    selectedScale,
    setScale,
    selectedTheme,
    setTheme,
    customPrimaryColor,
    setCustomPrimaryColor,
    selectedAccentColor,
    setAccentColor,
    customAccentColor,
    setCustomAccentColor,
    isSecondaryManual,
    setIsSecondaryManual,
    isDarkMode,
    setDarkMode,
    cornerRadius,
    setCornerRadius,
    spacingMode,
    setSpacingMode,
    stylePresetId,
    setStylePreset,
    opts,
    setOpts,
    setTokens,
    tokens,
  } = useDesignSystem();

  const { toast } = useToast();
  const { presetTokens } = usePresetTheme();
  const theme = useTheme();

  // Section states
  const [basicOptionsOpen, setBasicOptionsOpen] = React.useState(true);
  const [advancedStylingOpen, setAdvancedStylingOpen] = React.useState(false);

  // Helper function to handle primary color changes
  const handlePrimaryColorChange = (theme: string, customColor?: string) => {
    // Update Zustand store - this triggers useTokenSystem which handles CSS variable updates
    setTheme(theme);

    // Only auto-generate secondary if it wasn't manually selected
    if (!isSecondaryManual) {
      const primaryColor = theme === 'custom' && customColor
        ? customColor
        : colorThemes.find(t => t.name === theme)?.color || '#3498db';

      // Generate analogous color (30 degrees rotation for harmony)
      const generatedSecondary = generateSecondaryColor(primaryColor, 'analogous');

      // Set secondary as custom with the generated color
      setAccentColor('custom');
      setCustomAccentColor(generatedSecondary);
    }
  };

  // Helper function to handle secondary color manual selection
  const handleSecondaryColorChange = (accent: string, customColor?: string) => {
    setAccentColor(accent);
    if (customColor) {
      setCustomAccentColor(customColor);
    }
    // Mark secondary as manually selected
    setIsSecondaryManual(true);
  };

  // handleStylePresetChange now uses the Tamagui theme system
  const handleStylePresetChange = (presetId: StylePresetId) => {
    // Update the preset in Zustand store - this triggers the usePresetTheme hook
    // which handles CSS variable updates automatically
    setStylePreset(presetId);

    const preset = getStylePreset(presetId);
    if (preset) {
      const { tokens: tokens } = preset;

      // Update tokens through the store.
      // Radius is intentionally NOT set here — the store subscriber derives it
      // from (preset × cornerRadius) so the Corner Radius control isn't clobbered.
      setTokens({
        shadow: {
          '1': tokens.shadows.sm,
          '2': tokens.shadows.md,
          '3': tokens.shadows.lg
        },
        motion: {
          fast: `${tokens.animations.quick}ms`,
          base: `${tokens.animations.normal}ms`,
          slow: `${tokens.animations.slow}ms`,
          easeStandard: tokens.animations.curve
        }
      });

      // Update border weight based on preset
      const borderWidthKey = tokens.card.borderWidthKey;
      const borderWeight = borderWidthKey === 'none' ? 'none' :
        borderWidthKey === 'thin' || (tokens.borderWidths[borderWidthKey] !== undefined && tokens.borderWidths[borderWidthKey] <= 1) ? 'thin' : 'thick';

      setOpts({
        cardBorderWeight: borderWeight,
        inputBorderWeight: borderWeight
      });

      toast({
        title: `Applied ${preset.name}`,
        description: preset.description,
      });
    }
  };

  // Apply style preset on mount to ensure CSS variables are set
  React.useEffect(() => {
    if (stylePresetId) {
      const preset = getStylePreset(stylePresetId as StylePresetId);
      if (preset) {
        // Apply preset tokens without showing toast on initial load
        setStylePreset(stylePresetId as StylePresetId);
        
        const { tokens } = preset;

        setTokens({
          shadow: {
            '1': tokens.shadows.sm,
            '2': tokens.shadows.md,
            '3': tokens.shadows.lg
          },
          motion: {
            fast: `${tokens.animations.quick}ms`,
            base: `${tokens.animations.normal}ms`,
            slow: `${tokens.animations.slow}ms`,
            easeStandard: tokens.animations.curve
          }
        });
        
        // Update border weight based on preset
        const borderWidthKey = tokens.card.borderWidthKey;
        const borderWeight = borderWidthKey === 'none' ? 'none' :
          borderWidthKey === 'thin' || (tokens.borderWidths[borderWidthKey] !== undefined && tokens.borderWidths[borderWidthKey] <= 1) ? 'thin' : 'thick';

        setOpts({
          cardBorderWeight: borderWeight,
          inputBorderWeight: borderWeight
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Map border weight to pixel values - Builder UI dogfoods its own design system
  const borderWidthMap = {
    none: 0,
    thin: 1,
    thick: 2
  };

  return (
    <YStack
      width={width}
      maxWidth="100%"
      height={height}
      borderRightWidth={bordered ? borderWidthMap[opts.cardBorderWeight] : 0}
      borderRightColor="$borderColor"
      backgroundColor="$background"
    >
      <ScrollView padding={BUILDER_LAYOUT.panelPadding}>
        {showHeading && (
          <YStack marginBottom="$6">
            <Heading
              fontSize={tokens.h1.size}
              lineHeight={tokens.h1.line}
              fontWeight={tokens.h1.weight}
              marginBottom="$2"
            >
              Design System Builder
            </Heading>
            <Text
              fontSize={tokens.body.size}
              lineHeight={tokens.body.line}
              color="$gray11"
            >
              Customize your design system and generate AI-ready prompts
            </Text>
          </YStack>
        )}

      <YStack space="$4">
        {/* Basic Options Section - For Design Beginners */}
        <YStack>
          <BuilderAccordion 
            title="Basic Options" 
            icon={Layers} 
            isOpen={basicOptionsOpen} 
            onToggle={() => setBasicOptionsOpen(!basicOptionsOpen)}
          >
            <YStack space="$6">

            {/* Primary Font */}
            {/* Primary Font */}
            <YStack>
              <BuilderSectionLabel title="Primary Font" />
              <Select value={selectedPrimaryFont} onValueChange={setPrimaryFont}>
                <Select.Trigger 
                  width="100%" 
                  iconAfter={ChevronDown}
                  borderWidth="$1"
                  borderColor="$gray4"
                  borderRadius="$10"
                  backgroundColor="$background"
                  paddingHorizontal="$4"
                  paddingVertical="$3"
                  minHeight={44}
                >
                  <Select.Value placeholder="Select Font">
                    {primaryFonts.find(f => f.class === selectedPrimaryFont)?.name || 'Select Font'}
                  </Select.Value>
                </Select.Trigger>

                <Adapt when="sm" platform="touch">
                  <Sheet modal dismissOnSnapToBottom>
                    <Sheet.Frame>
                      <Sheet.ScrollView>
                        <Adapt.Contents />
                      </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay />
                  </Sheet>
                </Adapt>

                <Select.Content zIndex={200000} backgroundColor="$background" borderRadius="$3" borderWidth="$1" borderColor="$borderColor">
                  <Select.ScrollUpButton alignItems="center" justifyContent="center" position="relative" width="100%" height="$3">
                    <YStack zIndex={10}>
                      <ChevronDown size={20} />
                    </YStack>
                  </Select.ScrollUpButton>

                  <Select.Viewport minWidth={200}>
                    <Select.Group>
                      {primaryFonts.map((font, i) => (
                        <Select.Item
                          index={i}
                          key={font.class}
                          value={font.class}
                          paddingHorizontal={16}
                          paddingVertical={10}
                          minHeight={40}
                          hoverStyle={{ backgroundColor: '$gray4' }}
                        >
                          <Select.ItemText>{font.name}</Select.ItemText>
                          <Select.ItemIndicator marginLeft="auto">
                            <Check size={16} />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>

                  <Select.ScrollDownButton alignItems="center" justifyContent="center" position="relative" width="100%" height="$3">
                    <YStack zIndex={10}>
                      <ChevronDown size={20} />
                    </YStack>
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select>
            </YStack>

            {/* Primary Color */}
            <YStack>
              <BuilderSectionLabel title="Primary Color" />
              <XStack flexWrap="wrap" gap="$3" width="100%">
                {colorThemes.map((theme) => (
                  <YStack key={theme.name} position="relative">
                    {theme.isCustom ? (
                      <BuilderColorSwatch
                        color="transparent"
                        isSelected={selectedTheme === 'custom'}
                        onPress={() => handlePrimaryColorChange('custom', customPrimaryColor || DEFAULT_PRIMARY)}
                        isCustom
                        customColor={customPrimaryColor || DEFAULT_PRIMARY}
                      >
                        <input
                          type="color"
                          value={customPrimaryColor || DEFAULT_PRIMARY}
                          onChange={(e) => {
                            setCustomPrimaryColor(e.target.value);
                            handlePrimaryColorChange('custom', e.target.value);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrimaryColorChange('custom', customPrimaryColor || DEFAULT_PRIMARY);
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                            cursor: 'pointer',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 10
                          }}
                          title={theme.label}
                        />
                      </BuilderColorSwatch>
                    ) : (
                      <BuilderColorSwatch
                        color={theme.color}
                        isSelected={selectedTheme === theme.name}
                        onPress={() => handlePrimaryColorChange(theme.name)}
                      />
                    )}
                  </YStack>
                ))}
              </XStack>
            </YStack>

            {/* Dark Mode Toggle */}
            <BuilderSwitch
              label="Dark Mode"
              checked={isDarkMode}
              onCheckedChange={setDarkMode}
            />

            {/* Style Preset */}
            <YStack>
              <BuilderSectionLabel title="Style Preset" />
              <XStack flexWrap="wrap" gap="$2" width="100%">
                {stylePresets.map((preset) => (
                  <BuilderOptionCard
                    key={preset.id}
                    icon={preset.icon}
                    label={preset.name}
                    isSelected={stylePresetId === preset.id}
                    onPress={() => handleStylePresetChange(preset.id)}
                    width="47%"
                  />
                ))}
              </XStack>
            </YStack>

            {/* Menu Layout */}
            <YStack>
              <BuilderSectionLabel title="Menu Layout" />
              <XStack gap="$2" width="100%">
                <BuilderOptionCard
                  icon={PanelBottom}
                  label="Bottom Bar"
                  isSelected={opts.menuLayout === 'bottomBar'}
                  onPress={() => setOpts({ menuLayout: 'bottomBar' })}
                  width="47%"
                />
                <BuilderOptionCard
                  icon={Menu}
                  label="Hamburger"
                  isSelected={opts.menuLayout === 'hamburger'}
                  onPress={() => setOpts({ menuLayout: 'hamburger' })}
                  width="47%"
                />
              </XStack>
            </YStack>

            {/* Spacing Scale */}
            <YStack>
              <BuilderSectionLabel title="Spacing Scale" />
              <XStack gap="$2" width="100%">
                <BuilderOptionCard
                  icon={Minimize}
                  label="Compact"
                  isSelected={spacingMode === 'compact'}
                  onPress={() => setSpacingMode('compact')}
                  width="31%"
                />
                <BuilderOptionCard
                  icon={RectangleHorizontal}
                  label="Normal"
                  isSelected={spacingMode === 'normal'}
                  onPress={() => setSpacingMode('normal')}
                  width="31%"
                />
                <BuilderOptionCard
                  icon={Maximize}
                  label="Comfortable"
                  isSelected={spacingMode === 'comfortable'}
                  onPress={() => setSpacingMode('comfortable')}
                  width="31%"
                />
              </XStack>
            </YStack>

            </YStack>
          </BuilderAccordion>
        </YStack>

        {/* Advanced Styling Section - For More Control */}
        <YStack>
          <BuilderAccordion 
            title="Advanced Styling" 
            icon={Sliders} 
            isOpen={advancedStylingOpen} 
            onToggle={() => setAdvancedStylingOpen(!advancedStylingOpen)}
          >
            <YStack space="$4" padding="$3">

            {/* Corner Radius */}
            <YStack>
              <BuilderSectionLabel title="Corner Radius" />
              <XStack gap="$2" width="100%">
                {/* Fixed radii on purpose — the preview has to keep showing the
                    option it selects, not the value currently in force. */}
                <BuilderOptionCard
                  customContent={
                    <YStack width={20} height={20} borderWidth={2} borderColor="$gray11" borderRadius={0} />
                  }
                  label="None"
                  isSelected={cornerRadius === 'none'}
                  onPress={() => setCornerRadius('none')}
                  width="23.5%"
                />
                <BuilderOptionCard
                  customContent={
                    <YStack width={20} height={20} borderWidth={2} borderColor="$gray11" borderRadius={3} />
                  }
                  label="Small"
                  isSelected={cornerRadius === 'small'}
                  onPress={() => setCornerRadius('small')}
                  width="23.5%"
                />
                <BuilderOptionCard
                  customContent={
                    <YStack width={20} height={20} borderWidth={2} borderColor="$gray11" borderRadius={6} />
                  }
                  label="Medium"
                  isSelected={cornerRadius === 'medium'}
                  onPress={() => setCornerRadius('medium')}
                  width="23.5%"
                />
                <BuilderOptionCard
                  customContent={
                    <YStack width={20} height={20} borderWidth={2} borderColor="$gray11" borderRadius={10} />
                  }
                  label="Large"
                  isSelected={cornerRadius === 'large'}
                  onPress={() => setCornerRadius('large')}
                  width="23.5%"
                />
              </XStack>
            </YStack>

            {/* Display Font (for headings) */}
            <YStack>
              <BuilderSectionLabel title="Display Font" description="For headings and titles" />
              <Select value={selectedDisplayFont} onValueChange={setDisplayFont}>
                <Select.Trigger 
                  width="100%" 
                  iconAfter={ChevronDown}
                  borderWidth="$1"
                  borderColor="$borderColor"
                  borderRadius="$10"
                  backgroundColor="$background"
                  paddingHorizontal="$4"
                  paddingVertical="$3"
                  minHeight={44}
                >
                  <Select.Value placeholder="Select Font">
                    {displayFonts.find(f => f.class === selectedDisplayFont)?.name || 'Select Font'}
                  </Select.Value>
                </Select.Trigger>

                <Adapt when="sm" platform="touch">
                  <Sheet modal dismissOnSnapToBottom>
                    <Sheet.Frame>
                      <Sheet.ScrollView>
                        <Adapt.Contents />
                      </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay />
                  </Sheet>
                </Adapt>

                <Select.Content zIndex={200000} backgroundColor="$background" borderRadius="$3" borderWidth="$1" borderColor="$borderColor">
                  <Select.ScrollUpButton alignItems="center" justifyContent="center" position="relative" width="100%" height="$3">
                    <YStack zIndex={10}>
                      <ChevronDown size={20} />
                    </YStack>
                  </Select.ScrollUpButton>

                  <Select.Viewport minWidth={200}>
                    <Select.Group>
                      {displayFonts.map((font, i) => (
                        <Select.Item
                          index={i}
                          key={font.class}
                          value={font.class}
                          paddingHorizontal={16}
                          paddingVertical={10}
                          minHeight={40}
                          hoverStyle={{ backgroundColor: '$gray4' }}
                        >
                          <Select.ItemText>{font.name}</Select.ItemText>
                          <Select.ItemIndicator marginLeft="auto">
                            <Check size={16} />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>

                  <Select.ScrollDownButton alignItems="center" justifyContent="center" position="relative" width="100%" height="$3">
                    <YStack zIndex={10}>
                      <ChevronDown size={20} />
                    </YStack>
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select>
            </YStack>

            {/* Secondary Color */}
            <YStack>
              <BuilderSectionLabel title="Secondary Color" />
              <XStack flexWrap="wrap" gap="$3" width="100%">
                {accentColors.map((accent) => (
                  <YStack key={accent.name} position="relative">
                    {accent.isCustom ? (
                      <BuilderColorSwatch
                        color="transparent"
                        isSelected={selectedAccentColor === 'custom'}
                        onPress={() => handleSecondaryColorChange('custom', customAccentColor || DEFAULT_ACCENT)}
                        isCustom
                        customColor={customAccentColor || DEFAULT_ACCENT}
                      >
                         <input
                          type="color"
                          value={customAccentColor || DEFAULT_ACCENT}
                          onChange={(e) => {
                            handleSecondaryColorChange('custom', e.target.value);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSecondaryColorChange('custom', customAccentColor || DEFAULT_ACCENT);
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                            cursor: 'pointer',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 10
                          }}
                        />
                      </BuilderColorSwatch>
                    ) : (
                      <BuilderColorSwatch
                        color={accent.color}
                        isSelected={selectedAccentColor === accent.name}
                        onPress={() => handleSecondaryColorChange(accent.name)}
                      />
                    )}
                  </YStack>
                ))}
              </XStack>
            </YStack>



            {/* Type Scale */}
            <YStack>
              <BuilderSectionLabel title="Type Scale" />
              <XStack gap="$2" width="100%">
                {/* Fixed sizes on purpose: these previews illustrate the three
                    choices, so they must not resize with the scale they set. */}
                <BuilderOptionCard
                  customContent={
                    <Text fontSize={18} lineHeight={24} fontWeight="700" color="$color">Aa</Text>
                  }
                  label="Small"
                  isSelected={selectedScale === 'small'}
                  onPress={() => setScale('small')}
                  width="31%"
                />
                <BuilderOptionCard
                  customContent={
                    <Text fontSize={24} lineHeight={30} fontWeight="700" color="$color">Aa</Text>
                  }
                  label="Regular"
                  isSelected={selectedScale === 'regular'}
                  onPress={() => setScale('regular')}
                  width="31%"
                />
                <BuilderOptionCard
                  customContent={
                    <Text fontSize={30} lineHeight={36} fontWeight="700" color="$color">Aa</Text>
                  }
                  label="Large"
                  isSelected={selectedScale === 'large'}
                  onPress={() => setScale('large')}
                  width="31%"
                />
              </XStack>
            </YStack>



            </YStack>
            {/* Styling Controls Section */}
            <StylingControls />
          </BuilderAccordion>
        </YStack>

      </YStack>

      {/* Settings Button */}
        <YStack marginTop="auto" paddingTop="$4">
          {/* Matches BuilderAccordion's header exactly — same padding, icon
              size, gap and type — so it reads as a peer of the sections above. */}
          <XStack
            paddingVertical="$3"
            paddingHorizontal="$2"
            alignItems="center"
            gap="$3"
            cursor="pointer"
            hoverStyle={{ opacity: 0.7 }}
            pressStyle={{ opacity: 0.5 }}
          >
            <Settings size={18} color={theme.color?.val || '#000'} />
            <Text size="$4" fontWeight="600" color="$color">
              Settings
            </Text>
          </XStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
