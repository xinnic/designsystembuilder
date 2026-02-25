/**
 * CodePanel — Builder UI (NativeWind)
 *
 * Code/spec viewer with tabs: Config | Tokens | Components.
 * Read-only ScrollView with monospace text and copy button per section.
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { cn } from '@/lib/utils';
import { useDesignSystem } from '../../state/designSystem';
import { Tabs } from '../ui/Tabs';
import { VStack, HStack } from '../ui/Stack';
import { Button } from '../ui/Button';

interface CodePanelProps {
  className?: string;
}

function copyToClipboard(text: string) {
  if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <VStack gap="sm" className="mb-4">
      <HStack className="items-center justify-between">
        <Text className="font-body text-xs font-semibold text-on-surface-secondary uppercase tracking-wide">
          {title}
        </Text>
        <Pressable onPress={handleCopy}>
          <Text className="font-body text-xs text-brand-500 font-medium">
            {copied ? 'Copied!' : 'Copy'}
          </Text>
        </Pressable>
      </HStack>
      <ScrollView
        horizontal
        className="bg-on-surface/5 rounded-lg p-3"
      >
        <Text
          className="font-body text-xs text-on-surface"
          style={{ fontFamily: Platform.OS === 'web' ? 'monospace' : 'Courier' }}
        >
          {code}
        </Text>
      </ScrollView>
    </VStack>
  );
}

export function CodePanel({ className }: CodePanelProps) {
  const [activeTab, setActiveTab] = useState('config');
  const {
    tokens,
    selectedPrimaryFont,
    selectedDisplayFont,
    cornerRadius,
    spacingMode,
    stylePresetId,
    customPrimaryColor,
    selectedTheme,
    isDarkMode,
  } = useDesignSystem();

  const configCode = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          500: '${customPrimaryColor || '#3498db'}',
        },
      },
      fontFamily: {
        sans: ['${tokens.fontFamily.split(',')[0]}'],
      },
      borderRadius: {
        sm: '${tokens.radius.sm}',
        md: '${tokens.radius.md}',
        lg: '${tokens.radius.lg}',
      },
    },
  },
};`;

  const tokensCode = JSON.stringify(
    {
      colors: {
        brand: tokens.brand,
        brandWeak: tokens.brandWeak,
      },
      typography: {
        fontFamily: tokens.fontFamily,
        h1: tokens.h1,
        body: tokens.body,
        caption: tokens.caption,
      },
      spacing: tokens.space,
      radius: tokens.radius,
      shadow: tokens.shadow,
      motion: tokens.motion,
    },
    null,
    2,
  );

  const settingsCode = JSON.stringify(
    {
      theme: selectedTheme,
      primaryColor: customPrimaryColor,
      primaryFont: selectedPrimaryFont,
      displayFont: selectedDisplayFont,
      cornerRadius,
      spacingMode,
      stylePreset: stylePresetId,
      darkMode: isDarkMode,
    },
    null,
    2,
  );

  return (
    <View className={cn('flex-1 bg-surface', className)}>
      <View className="px-4 pt-4 pb-2">
        <Tabs
          items={[
            { label: 'Config', value: 'config' },
            { label: 'Tokens', value: 'tokens' },
            { label: 'Settings', value: 'settings' },
          ]}
          value={activeTab}
          onValueChange={setActiveTab}
          variant="segmented"
          size="sm"
          fullWidth
        />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="p-4"
      >
        {activeTab === 'config' && (
          <CodeBlock title="Tailwind Config" code={configCode} />
        )}

        {activeTab === 'tokens' && (
          <CodeBlock title="Design Tokens (JSON)" code={tokensCode} />
        )}

        {activeTab === 'settings' && (
          <CodeBlock title="Current Settings" code={settingsCode} />
        )}
      </ScrollView>
    </View>
  );
}
