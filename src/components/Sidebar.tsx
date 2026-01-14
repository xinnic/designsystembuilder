import React from 'react';
import { ChevronDown, Check, Settings, Layers, Sliders, Navigation, Menu } from 'lucide-react';
import { YStack, XStack, ScrollView, Text, Heading, Separator, Button as TamaguiButton, Switch as TamaguiSwitch, Select, Adapt, Sheet } from 'tamagui';
import StylingControls from '../left/StylingControls';
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

interface SidebarProps { }

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

export function Sidebar({ }: SidebarProps) {
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
  } = useDesignSystem();

  const { toast } = useToast();
  const { presetTokens } = usePresetTheme();

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

      // Update tokens through the store
      setTokens({
        shadow: {
          '1': tokens.shadows.sm,
          '2': tokens.shadows.md,
          '3': tokens.shadows.lg
        },
        radius: {
          sm: `${tokens.radius.sm}px`,
          md: `${tokens.radius.md}px`,
          lg: `${tokens.radius.lg}px`,
          full: `${tokens.radius.full}px`
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
        borderWidthKey === 'thin' || tokens.borderWidths[borderWidthKey] <= 1 ? 'thin' : 'thick';

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
          radius: {
            sm: `${tokens.radius.sm}px`,
            md: `${tokens.radius.md}px`,
            lg: `${tokens.radius.lg}px`,
            full: `${tokens.radius.full}px`
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
          borderWidthKey === 'thin' || tokens.borderWidths[borderWidthKey] <= 1 ? 'thin' : 'thick';

        setOpts({
          cardBorderWeight: borderWeight,
          inputBorderWeight: borderWeight
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  return (
    <YStack width={320} height="100vh" borderRightWidth={1} borderRightColor="$borderColor" backgroundColor="$background">
      <ScrollView padding="$6">
        <YStack marginBottom="$8">
          <Heading size="$6" fontWeight="bold" marginBottom="$2">Design System Builder</Heading>
          <Text size="$3" color="$colorHover">
            Customize your design system and generate AI-ready prompts
          </Text>
        </YStack>

      <YStack space="$4">
        {/* Basic Options Section - For Design Beginners */}
        <YStack>
          <XStack
            onPress={() => setBasicOptionsOpen(!basicOptionsOpen)}
            padding="$3"
            borderRadius="$3"
            borderWidth={1}
            borderColor="$borderColor"
            backgroundColor="transparent"
            hoverStyle={{ backgroundColor: '$gray4' }}
            alignItems="center"
            justifyContent="space-between"
            pressStyle={{ opacity: 0.7 }}
            cursor="pointer"
          >
            <XStack space="$3" alignItems="center">
              <Layers size={20} color="var(--color-primary)" />
              <Text size="$3" fontWeight="500" color="$color">Basic Options</Text>
            </XStack>
            <ChevronDown
              size={16}
              color="$color"
              style={{
                transition: 'transform 0.2s',
                transform: basicOptionsOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </XStack>
          {basicOptionsOpen && (
            <YStack space="$4" padding="$3">

            {/* Primary Font */}
            <YStack>
              <Text size="$3" fontWeight="500" color="$color" marginBottom="$2">Primary Font</Text>
              <Select value={selectedPrimaryFont} onValueChange={setPrimaryFont}>
                <Select.Trigger 
                  width="100%" 
                  iconAfter={ChevronDown}
                  borderWidth={1}
                  borderColor="$borderColor"
                  borderRadius="$3"
                  backgroundColor="$background"
                  padding="$3"
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

                <Select.Content zIndex={200000} backgroundColor="$background" borderRadius="$3" borderWidth={1} borderColor="$borderColor">
                  <Select.ScrollUpButton alignItems="center" justifyContent="center" position="relative" width="100%" height="$3">
                    <YStack zIndex={10}>
                      <ChevronDown size={20} />
                    </YStack>
                  </Select.ScrollUpButton>

                  <Select.Viewport minWidth={200}>
                    <Select.Group>
                      {primaryFonts.map((font, i) => (
                        <Select.Item index={i} key={font.class} value={font.class} hoverStyle={{ backgroundColor: '$gray4' }}>
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
              <Text size="$3" fontWeight="500" color="$color" marginBottom="$2">Primary Color</Text>
              <XStack flexWrap="wrap" gap={8}>
                {colorThemes.map((theme) => (
                  <YStack key={theme.name} position="relative">
                    {theme.isCustom ? (
                      <YStack
                        width={28}
                        height={28}
                        borderRadius="$2"
                        overflow="hidden"
                        borderWidth={selectedTheme === 'custom' ? 2 : 1}
                        borderColor={selectedTheme === 'custom' ? '$blue9' : '$borderColor'}
                        position="relative"
                        hoverStyle={{ opacity: 0.8 }}
                      >
                         <YStack
                          position="absolute"
                          top={0}
                          left={0}
                          right={0}
                          bottom={0}
                          style={{ background: RAINBOW_GRADIENT }}
                        />
                        <input
                          type="color"
                          value={customPrimaryColor || DEFAULT_PRIMARY}
                          onChange={(e) => {
                            setCustomPrimaryColor(e.target.value);
                            handlePrimaryColorChange('custom', e.target.value);
                          }}
                          onClick={() => {
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
                      </YStack>
                    ) : (
                      <YStack
                        width={28}
                        height={28}
                        borderRadius="$2"
                        backgroundColor={theme.color}
                        borderWidth={selectedTheme === theme.name ? 2 : 1}
                        borderColor={selectedTheme === theme.name ? '$blue9' : '$borderColor'}
                        onPress={() => handlePrimaryColorChange(theme.name)}
                        cursor="pointer"
                        hoverStyle={{ opacity: 0.8 }}
                        pressStyle={{ scale: 0.95 }}
                        // @ts-ignore
                        title={theme.label}
                      />
                    )}
                  </YStack>
                ))}
              </XStack>
            </YStack>

            {/* Dark Mode Toggle */}
            <XStack alignItems="center" justifyContent="space-between">
              <Text size="$3" fontWeight="500" color="$color">Dark Mode</Text>
              <TamaguiSwitch checked={isDarkMode} onCheckedChange={setDarkMode} size="$3" />
            </XStack>

            {/* Style Preset */}
            <YStack>
              <Text fontSize="$3" fontWeight="500" marginBottom="$2">Style Preset</Text>
              <XStack flexWrap="wrap" gap="$2" justifyContent="space-between">
                {stylePresets.map((preset) => {
                  const Icon = preset.icon;
                  const isSelected = stylePresetId === preset.id;
                  return (
                    <YStack
                      key={preset.id}
                      width={128}
                      height={80}
                      padding="$3"
                      borderRadius="$3"
                      borderWidth={isSelected ? 2 : 1}
                      borderColor={isSelected ? '$blue9' : '$gray6'}
                      backgroundColor={isSelected ? '$blue2' : '$background'}
                      alignItems="center"
                      justifyContent="center"
                      space="$2"
                      hoverStyle={{ backgroundColor: '$gray3' }}
                      pressStyle={{ opacity: 0.7 }}
                      onPress={() => handleStylePresetChange(preset.id)}
                      cursor="pointer"
                    >
                      <Icon size={24} color={isSelected ? 'var(--color-focus)' : '$gray11'} />
                      <Text fontSize="$2" textAlign="center" color={isSelected ? '$blue11' : '$gray11'}>{preset.name}</Text>
                    </YStack>
                  );
                })}
              </XStack>
            </YStack>

            {/* Menu Type */}
            <YStack>
              <Text size="$3" fontWeight="500" color="$color" marginBottom="$2">Menu Type</Text>
              <XStack gap="$2">
                <XStack
                  flex={1}
                  space="$2"
                  padding="$3"
                  borderRadius="$4"
                  borderWidth={1}
                  borderColor={opts.menuLayout === 'hamburger' ? '$blue9' : '$gray6'}
                  backgroundColor={opts.menuLayout === 'hamburger' ? '$blue2' : 'transparent'}
                  alignItems="center"
                  hoverStyle={{ backgroundColor: '$gray3' }}
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setOpts({ menuLayout: 'hamburger' })}
                  cursor="pointer"
                >
                  <svg width="16" height="14" viewBox="0 0 20 14" fill="none">
                    <rect width="20" height="2" fill="currentColor" />
                    <rect y="6" width="20" height="2" fill="currentColor" />
                    <rect y="12" width="20" height="2" fill="currentColor" />
                  </svg>
                  <Text size="$3" color="$color">Hamburger</Text>
                </XStack>
                <XStack
                  flex={1}
                  space="$2"
                  padding="$3"
                  borderRadius="$4"
                  borderWidth={1}
                  borderColor={opts.menuLayout === 'bottomBar' ? '$blue9' : '$gray6'}
                  backgroundColor={opts.menuLayout === 'bottomBar' ? '$blue2' : 'transparent'}
                  alignItems="center"
                  hoverStyle={{ backgroundColor: '$gray3' }}
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setOpts({ menuLayout: 'bottomBar' })}
                  cursor="pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 20 16" fill="none">
                    <rect y="14" width="20" height="2" fill="currentColor" />
                    <rect x="2" y="10" width="3" height="2" fill="currentColor" />
                    <rect x="8.5" y="10" width="3" height="2" fill="currentColor" />
                    <rect x="15" y="10" width="3" height="2" fill="currentColor" />
                  </svg>
                  <Text size="$3" color="$color">Bottom Bar</Text>
                </XStack>
              </XStack>
            </YStack>

            </YStack>
          )}
        </YStack>

        {/* Advanced Styling Section - For More Control */}
        <YStack>
          <XStack
            onPress={() => setAdvancedStylingOpen(!advancedStylingOpen)}
            padding="$3"
            borderRadius="$3"
            borderWidth={1}
            borderColor="$borderColor"
            backgroundColor="transparent"
            hoverStyle={{ backgroundColor: '$gray4' }}
            alignItems="center"
            justifyContent="space-between"
            pressStyle={{ opacity: 0.7 }}
            cursor="pointer"
          >
            <XStack space="$3" alignItems="center">
              <Sliders size={20} />
              <Text size="$3" fontWeight="500" color="$color">Advanced Styling</Text>
            </XStack>
            <ChevronDown
              size={16}
              color="$color"
              style={{
                transition: 'transform 0.2s',
                transform: advancedStylingOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </XStack>
          {advancedStylingOpen && (
            <YStack space="$4" padding="$3">

            {/* Corner Radius */}
            <YStack>
              <Text size="$3" fontWeight="500" color="$color" marginBottom="$2">Corner Radius</Text>
              <XStack gap="$2">
                <YStack
                  flex={1}
                  padding="$3"
                  borderWidth={1}
                  borderRadius="$3"
                  borderColor={cornerRadius === 'none' ? '$blue9' : '$gray6'}
                  backgroundColor={cornerRadius === 'none' ? '$blue2' : 'transparent'}
                  alignItems="center"
                  justifyContent="center"
                  hoverStyle={{ backgroundColor: '$gray3' }}
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setCornerRadius('none')}
                  cursor="pointer"
                >
                  <YStack width={32} height={32} borderWidth={2} borderColor="$gray11" borderRadius={0} />
                </YStack>
                <YStack
                  flex={1}
                  padding="$3"
                  borderWidth={1}
                  borderRadius="$3"
                  borderColor={cornerRadius === 'small' ? '$blue9' : '$gray6'}
                  backgroundColor={cornerRadius === 'small' ? '$blue2' : 'transparent'}
                  alignItems="center"
                  justifyContent="center"
                  hoverStyle={{ backgroundColor: '$gray3' }}
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setCornerRadius('small')}
                  cursor="pointer"
                >
                  <YStack width={32} height={32} borderWidth={2} borderColor="$gray11" borderRadius={4} />
                </YStack>
                <YStack
                  flex={1}
                  padding="$3"
                  borderWidth={1}
                  borderRadius="$3"
                  borderColor={cornerRadius === 'medium' ? '$blue9' : '$gray6'}
                  backgroundColor={cornerRadius === 'medium' ? '$blue2' : 'transparent'}
                  alignItems="center"
                  justifyContent="center"
                  hoverStyle={{ backgroundColor: '$gray3' }}
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setCornerRadius('medium')}
                  cursor="pointer"
                >
                  <YStack width={32} height={32} borderWidth={2} borderColor="$gray11" borderRadius={10} />
                </YStack>
                <YStack
                  flex={1}
                  padding="$3"
                  borderWidth={1}
                  borderRadius="$3"
                  borderColor={cornerRadius === 'large' ? '$blue9' : '$gray6'}
                  backgroundColor={cornerRadius === 'large' ? '$blue2' : 'transparent'}
                  alignItems="center"
                  justifyContent="center"
                  hoverStyle={{ backgroundColor: '$gray3' }}
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setCornerRadius('large')}
                  cursor="pointer"
                >
                  <YStack width={32} height={32} borderWidth={2} borderColor="$gray11" borderRadius={20} />
                </YStack>
              </XStack>
            </YStack>

            {/* Display Font (for headings) */}
            <YStack>
              <Text size="$3" fontWeight="500" color="$color" marginBottom="$2">Display Font</Text>
              <Text size="$2" color="$colorHover" marginBottom="$2">For headings and titles</Text>
              <Select value={selectedDisplayFont} onValueChange={setDisplayFont}>
                <Select.Trigger 
                  width="100%" 
                  iconAfter={ChevronDown}
                  borderWidth={1}
                  borderColor="$borderColor"
                  borderRadius="$3"
                  backgroundColor="$background"
                  padding="$3"
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

                <Select.Content zIndex={200000} backgroundColor="$background" borderRadius="$3" borderWidth={1} borderColor="$borderColor">
                  <Select.ScrollUpButton alignItems="center" justifyContent="center" position="relative" width="100%" height="$3">
                    <YStack zIndex={10}>
                      <ChevronDown size={20} />
                    </YStack>
                  </Select.ScrollUpButton>

                  <Select.Viewport minWidth={200}>
                    <Select.Group>
                      {displayFonts.map((font, i) => (
                        <Select.Item index={i} key={font.class} value={font.class} hoverStyle={{ backgroundColor: '$gray4' }}>
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
              <Text size="$3" fontWeight="500" color="$color" marginBottom="$2">Secondary Color</Text>
              <XStack flexWrap="wrap" gap={8}>
                {accentColors.map((accent) => (
                  <YStack key={accent.name} position="relative">
                    {accent.isCustom ? (
                      <YStack
                        width={28}
                        height={28}
                        borderRadius="$2"
                        overflow="hidden"
                        borderWidth={selectedAccentColor === 'custom' ? 2 : 1}
                        borderColor={selectedAccentColor === 'custom' ? '$blue9' : '$borderColor'}
                        position="relative"
                        hoverStyle={{ opacity: 0.8 }}
                      >
                         <YStack
                          position="absolute"
                          top={0}
                          left={0}
                          right={0}
                          bottom={0}
                          style={{ background: RAINBOW_GRADIENT }}
                        />
                        <input
                          type="color"
                          value={customAccentColor || DEFAULT_ACCENT}
                          onChange={(e) => {
                            handleSecondaryColorChange('custom', e.target.value);
                          }}
                          onClick={() => {
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
                          title={accent.label}
                        />
                      </YStack>
                    ) : (
                      <YStack
                        width={28}
                        height={28}
                        borderRadius="$2"
                        backgroundColor={accent.color}
                        borderWidth={selectedAccentColor === accent.name ? 2 : 1}
                        borderColor={selectedAccentColor === accent.name ? '$blue9' : '$borderColor'}
                        onPress={() => handleSecondaryColorChange(accent.name)}
                        cursor="pointer"
                        hoverStyle={{ opacity: 0.8 }}
                        pressStyle={{ scale: 0.95 }}
                        // @ts-ignore
                        title={accent.label}
                      />
                    )}
                  </YStack>
                ))}
              </XStack>
            </YStack>

            {/* Spacing */}
            <YStack>
              <Text size="$3" fontWeight="500" color="$color" marginBottom="$2">Spacing</Text>
              <XStack gap="$2">
                <YStack
                  flex={1}
                  padding="$3"
                  borderRadius="$4"
                  borderWidth={1}
                  borderColor={spacingMode === 'compact' ? '$blue9' : '$gray6'}
                  backgroundColor={spacingMode === 'compact' ? '$blue2' : 'transparent'}
                  alignItems="center"
                  hoverStyle={{ backgroundColor: '$gray3' }}
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setSpacingMode('compact')}
                  cursor="pointer"
                >
                  <Text size="$2" color="$color">Compact</Text>
                </YStack>
                <YStack
                  flex={1}
                  padding="$3"
                  borderRadius="$4"
                  borderWidth={1}
                  borderColor={spacingMode === 'normal' ? '$blue9' : '$gray6'}
                  backgroundColor={spacingMode === 'normal' ? '$blue2' : 'transparent'}
                  alignItems="center"
                  hoverStyle={{ backgroundColor: '$gray3' }}
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setSpacingMode('normal')}
                  cursor="pointer"
                >
                  <Text size="$2" color="$color">Normal</Text>
                </YStack>
                <YStack
                  flex={1}
                  padding="$3"
                  borderRadius="$4"
                  borderWidth={1}
                  borderColor={spacingMode === 'comfortable' ? '$blue9' : '$gray6'}
                  backgroundColor={spacingMode === 'comfortable' ? '$blue2' : 'transparent'}
                  alignItems="center"
                  hoverStyle={{ backgroundColor: '$gray3' }}
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setSpacingMode('comfortable')}
                  cursor="pointer"
                >
                  <Text size="$2" color="$color">Comfortable</Text>
                </YStack>
              </XStack>
            </YStack>

            {/* Type Scale */}
            <YStack>
              <Text size="$3" fontWeight="500" color="$color" marginBottom="$2">Type Scale</Text>
              <XStack gap="$2">
                <YStack
                  flex={1}
                  padding="$3"
                  borderRadius="$4"
                  borderWidth={1}
                  borderColor={selectedScale === 'small' ? '$blue9' : '$gray6'}
                  backgroundColor={selectedScale === 'small' ? '$blue2' : 'transparent'}
                  alignItems="center"
                  justifyContent="center"
                  hoverStyle={{ backgroundColor: '$gray3' }}
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setScale('small')}
                  cursor="pointer"
                >
                  <Text size="$3" fontWeight="bold" color="$color">Aa</Text>
                </YStack>
                <YStack
                  flex={1}
                  padding="$3"
                  borderRadius="$4"
                  borderWidth={1}
                  borderColor={selectedScale === 'regular' ? '$blue9' : '$gray6'}
                  backgroundColor={selectedScale === 'regular' ? '$blue2' : 'transparent'}
                  alignItems="center"
                  justifyContent="center"
                  hoverStyle={{ backgroundColor: '$gray3' }}
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setScale('regular')}
                  cursor="pointer"
                >
                  <Text size="$4" fontWeight="bold" color="$color">Aa</Text>
                </YStack>
                <YStack
                  flex={1}
                  padding="$3"
                  borderRadius="$4"
                  borderWidth={1}
                  borderColor={selectedScale === 'large' ? '$blue9' : '$gray6'}
                  backgroundColor={selectedScale === 'large' ? '$blue2' : 'transparent'}
                  alignItems="center"
                  justifyContent="center"
                  hoverStyle={{ backgroundColor: '$gray3' }}
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setScale('large')}
                  cursor="pointer"
                >
                  <Text size="$5" fontWeight="bold" color="$color">Aa</Text>
                </YStack>
              </XStack>
            </YStack>

            {/* Menu Layout */}
            <YStack>
              <Text size="$3" fontWeight="500" color="$color" marginBottom="$2">Menu Layout</Text>
              <XStack gap="$2">
                <YStack
                  flex={1}
                  padding="$3"
                  borderRadius="$2"
                  borderWidth={1}
                  borderColor={opts.menuLayout === 'bottomBar' ? '$blue9' : '$gray6'}
                  backgroundColor={opts.menuLayout === 'bottomBar' ? '$blue2' : 'transparent'}
                  alignItems="center"
                  space="$2"
                  hoverStyle={{ backgroundColor: '$gray3' }}
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setOpts({ menuLayout: 'bottomBar' })}
                  cursor="pointer"
                >
                  <Navigation size={16} color={opts.menuLayout === 'bottomBar' ? 'var(--color-primary)' : 'currentColor'} />
                  <Text size="$3" color="$color">Bottom Bar</Text>
                </YStack>
                <YStack
                  flex={1}
                  padding="$3"
                  borderRadius="$2"
                  borderWidth={1}
                  borderColor={opts.menuLayout === 'hamburger' ? '$blue9' : '$gray6'}
                  backgroundColor={opts.menuLayout === 'hamburger' ? '$blue2' : 'transparent'}
                  alignItems="center"
                  space="$2"
                  hoverStyle={{ backgroundColor: '$gray3' }}
                  pressStyle={{ opacity: 0.7 }}
                  onPress={() => setOpts({ menuLayout: 'hamburger' })}
                  cursor="pointer"
                >
                  <Menu size={16} color={opts.menuLayout === 'hamburger' ? 'var(--color-primary)' : 'currentColor'} />
                  <Text size="$3" color="$color">Hamburger</Text>
                </YStack>
              </XStack>
            </YStack>

            </YStack>
          )}
        </YStack>

        {/* Styling Controls Section */}
        <StylingControls />

      </YStack>

      {/* Settings Button */}
        <YStack marginTop="auto" paddingTop="$6">
          <TamaguiButton
            chromeless
            width="100%"
            justifyContent="flex-start"
            icon={<Settings size={16} />}
            paddingHorizontal="$3"
            paddingVertical="$2"
          >
            Settings
          </TamaguiButton>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
