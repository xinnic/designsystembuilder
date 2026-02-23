/**
 * ControlsPanel — Builder UI (NativeWind)
 *
 * Full sidebar with all design system controls.
 * Two accordion sections: Basic Options (open) and Advanced Styling (closed).
 * All state from Zustand store — no prop passing.
 *
 * Ported from Tamagui Sidebar.tsx.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { cn } from '@/lib/utils';
import { useDesignSystem } from '../../state/designSystem';
import { generateSecondaryColor } from '../../utils/colorGeneration';
import { colorThemes, DEFAULT_PRIMARY, DEFAULT_ACCENT } from '../../config/colorThemes';
import { getStylePreset, type StylePresetId } from '../../config/stylePresets';

// Builder UI primitives
import { Accordion } from './Accordion';
import { SectionLabel } from './SectionLabel';
import { OptionCard } from './OptionCard';
import { ColorThemeSelector } from './ColorThemeSelector';
import { StylePresetSelector } from './StylePresetSelector';
import { FontPairSelector } from './FontPairSelector';

// Core UI components
import { Switch } from '../ui/Switch';
import { VStack, HStack } from '../ui/Stack';
import { Body } from '../ui/Text';

interface ControlsPanelProps {
  className?: string;
}

export function ControlsPanel({ className }: ControlsPanelProps) {
  const {
    tokens,
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

  // Section states
  const [basicOptionsOpen, setBasicOptionsOpen] = useState(true);
  const [advancedStylingOpen, setAdvancedStylingOpen] = useState(false);

  // Handle primary color changes with auto-generated secondary
  const handlePrimaryColorChange = (theme: string, customColor?: string) => {
    setTheme(theme);

    if (customColor) {
      setCustomPrimaryColor(customColor);
    }

    // Auto-generate secondary if not manually selected
    if (!isSecondaryManual) {
      const primaryColor =
        theme === 'custom' && customColor
          ? customColor
          : colorThemes.find((t) => t.name === theme)?.color || DEFAULT_PRIMARY;

      const generatedSecondary = generateSecondaryColor(primaryColor, 'analogous');
      setAccentColor('custom');
      setCustomAccentColor(generatedSecondary);
    }
  };

  // Handle secondary color manual selection
  const handleSecondaryColorChange = (accent: string, customColor?: string) => {
    setAccentColor(accent);
    if (customColor) {
      setCustomAccentColor(customColor);
    }
    setIsSecondaryManual(true);
  };

  // Handle style preset change
  const handleStylePresetChange = (presetId: StylePresetId) => {
    setStylePreset(presetId);

    const preset = getStylePreset(presetId);
    if (preset) {
      const { tokens } = preset;

      setTokens({
        shadow: {
          '1': tokens.shadows.sm,
          '2': tokens.shadows.md,
          '3': tokens.shadows.lg,
        },
        radius: {
          sm: `${tokens.radius.sm}px`,
          md: `${tokens.radius.md}px`,
          lg: `${tokens.radius.lg}px`,
          full: `${tokens.radius.full}px`,
        },
        motion: {
          fast: `${tokens.animations.quick}ms`,
          base: `${tokens.animations.normal}ms`,
          slow: `${tokens.animations.slow}ms`,
          easeStandard: tokens.animations.curve,
        },
      });

      const borderWidthKey = tokens.card.borderWidthKey;
      const borderWeight =
        borderWidthKey === 'none'
          ? 'none'
          : borderWidthKey === 'thin' ||
              (tokens.borderWidths[borderWidthKey] !== undefined &&
                tokens.borderWidths[borderWidthKey] <= 1)
            ? 'thin'
            : 'thick';

      setOpts({
        cardBorderWeight: borderWeight as any,
        inputBorderWeight: borderWeight as any,
      });
    }
  };

  // Apply style preset on mount
  useEffect(() => {
    if (stylePresetId) {
      handleStylePresetChange(stylePresetId as StylePresetId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      className={cn('flex-1 bg-surface', className)}
      contentContainerClassName="p-4"
    >
      {/* Header */}
      <VStack gap="xs" className="mb-6">
        <Text
          className="font-bold text-on-surface"
          style={{
            fontSize: parseInt(tokens.h1.size),
            lineHeight: parseInt(tokens.h1.line) * 0.9,
            fontWeight: tokens.h1.weight.toString(),
          }}
        >
          Design System{'\n'}Builder
        </Text>
        <Text
          className="text-on-surface-secondary/70"
          style={{
            fontSize: parseInt(tokens.body.size),
            lineHeight: parseInt(tokens.body.line),
          }}
        >
          Customize your design system and generate AI-ready prompts
        </Text>
      </VStack>

      <VStack gap="lg">
        {/* ─── Basic Options ─── */}
        <Accordion
          title="Basic Options"
          icon="☰"
          isOpen={basicOptionsOpen}
          onToggle={() => setBasicOptionsOpen(!basicOptionsOpen)}
        >
          <VStack gap="xl">
            {/* Primary Font */}
            <FontPairSelector
              mode="primary"
              selectedFont={selectedPrimaryFont}
              onSelectFont={setPrimaryFont}
            />

            {/* Primary Color */}
            <View>
              <SectionLabel title="Primary Color" />
              <ColorThemeSelector
                mode="primary"
                selectedTheme={selectedTheme}
                customColor={customPrimaryColor}
                onSelectTheme={handlePrimaryColorChange}
              />
            </View>

            {/* Dark Mode Toggle */}
            <HStack className="items-center justify-between w-full">
              <Switch
                label="Dark Mode"
                value={isDarkMode}
                onValueChange={setDarkMode}
                labelPosition="left"
              />
            </HStack>

            {/* Style Preset */}
            <View>
              <SectionLabel title="Style Preset" />
              <StylePresetSelector
                selectedPreset={stylePresetId}
                onSelectPreset={handleStylePresetChange}
              />
            </View>

            {/* Menu Layout */}
            <View>
              <SectionLabel title="Menu Layout" />
              <HStack gap="sm">
                <OptionCard
                  customContent={<Text className="text-lg text-on-surface">⊥</Text>}
                  label="Bottom Bar"
                  isSelected={opts.menuLayout === 'bottomBar'}
                  onPress={() => setOpts({ menuLayout: 'bottomBar' })}
                  className="flex-1"
                />
                <OptionCard
                  customContent={<Text className="text-lg text-on-surface">☰</Text>}
                  label="Hamburger"
                  isSelected={opts.menuLayout === 'hamburger'}
                  onPress={() => setOpts({ menuLayout: 'hamburger' })}
                  className="flex-1"
                />
              </HStack>
            </View>

            {/* Spacing Scale */}
            <View>
              <SectionLabel title="Spacing Scale" />
              <HStack gap="sm">
                <OptionCard
                  customContent={<Text className="text-lg text-on-surface">⊟</Text>}
                  label="Compact"
                  isSelected={spacingMode === 'compact'}
                  onPress={() => setSpacingMode('compact')}
                  className="flex-1"
                />
                <OptionCard
                  customContent={<Text className="text-lg text-on-surface">▬</Text>}
                  label="Normal"
                  isSelected={spacingMode === 'normal'}
                  onPress={() => setSpacingMode('normal')}
                  className="flex-1"
                />
                <OptionCard
                  customContent={<Text className="text-lg text-on-surface">⊞</Text>}
                  label="Comfortable"
                  isSelected={spacingMode === 'comfortable'}
                  onPress={() => setSpacingMode('comfortable')}
                  className="flex-1"
                />
              </HStack>
            </View>
          </VStack>
        </Accordion>

        {/* ─── Advanced Styling ─── */}
        <Accordion
          title="Advanced Styling"
          icon="⚙"
          isOpen={advancedStylingOpen}
          onToggle={() => setAdvancedStylingOpen(!advancedStylingOpen)}
        >
          <VStack gap="xl">
            {/* Corner Radius */}
            <View>
              <SectionLabel title="Corner Radius" />
              <HStack gap="sm">
                <OptionCard
                  customContent={
                    <View className="w-6 h-6 border-2 border-on-surface-secondary rounded-none" />
                  }
                  label="None"
                  isSelected={cornerRadius === 'none'}
                  onPress={() => setCornerRadius('none')}
                  className="flex-1"
                />
                <OptionCard
                  customContent={
                    <View className="w-6 h-6 border-2 border-on-surface-secondary rounded-sm" />
                  }
                  label="Small"
                  isSelected={cornerRadius === 'small'}
                  onPress={() => setCornerRadius('small')}
                  className="flex-1"
                />
                <OptionCard
                  customContent={
                    <View className="w-6 h-6 border-2 border-on-surface-secondary rounded-lg" />
                  }
                  label="Medium"
                  isSelected={cornerRadius === 'medium'}
                  onPress={() => setCornerRadius('medium')}
                  className="flex-1"
                />
                <OptionCard
                  customContent={
                    <View className="w-6 h-6 border-2 border-on-surface-secondary rounded-xl" />
                  }
                  label="Large"
                  isSelected={cornerRadius === 'large'}
                  onPress={() => setCornerRadius('large')}
                  className="flex-1"
                />
              </HStack>
            </View>

            {/* Display Font */}
            <FontPairSelector
              mode="display"
              selectedFont={selectedDisplayFont}
              onSelectFont={setDisplayFont}
            />

            {/* Secondary Color */}
            <View>
              <SectionLabel title="Secondary Color" />
              <ColorThemeSelector
                mode="secondary"
                selectedTheme={selectedAccentColor}
                customColor={customAccentColor}
                onSelectTheme={handleSecondaryColorChange}
              />
            </View>

            {/* Type Scale */}
            <View>
              <SectionLabel title="Type Scale" />
              <HStack gap="sm">
                <OptionCard
                  customContent={
                    <Text className="text-lg font-bold text-on-surface">Aa</Text>
                  }
                  label="Small"
                  isSelected={selectedScale === 'small'}
                  onPress={() => setScale('small')}
                  className="flex-1"
                />
                <OptionCard
                  customContent={
                    <Text className="text-xl font-bold text-on-surface">Aa</Text>
                  }
                  label="Regular"
                  isSelected={selectedScale === 'regular'}
                  onPress={() => setScale('regular')}
                  className="flex-1"
                />
                <OptionCard
                  customContent={
                    <Text className="text-2xl font-bold text-on-surface">Aa</Text>
                  }
                  label="Large"
                  isSelected={selectedScale === 'large'}
                  onPress={() => setScale('large')}
                  className="flex-1"
                />
              </HStack>
            </View>
          </VStack>
        </Accordion>
      </VStack>
    </ScrollView>
  );
}
