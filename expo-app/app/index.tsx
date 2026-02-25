/**
 * Builder Screen — Main Entry Point (Phase 1E)
 *
 * 3-panel responsive layout for designing/customizing a design system.
 * Wide (>=768px): Side-by-side — Controls | Preview | Showcase
 * Narrow (<768px): Tab-based — one panel at a time
 */

import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ControlsPanel } from '../src/components/builder-ui/ControlsPanel';
import { PreviewPanel } from '../src/components/builder-ui/PreviewPanel';
import { ShowcasePanel } from '../src/components/builder-ui/ShowcasePanel';
import { ExportDialog } from '../src/components/builder-ui/ExportDialog';

import { Tabs } from '../src/components/ui/Tabs';
import { Button } from '../src/components/ui/Button';
import { HStack } from '../src/components/ui/Stack';
import { Text } from 'react-native';

const BREAKPOINT = 768;

export default function BuilderScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= BREAKPOINT;

  const [activeTab, setActiveTab] = useState('controls');
  const [exportOpen, setExportOpen] = useState(false);

  if (isWide) {
    return (
      <SafeAreaView className="flex-1 bg-canvas flex-row" edges={['top']}>
        {/* 3-panel layout */}
        <ControlsPanel className="w-[360px] border-r border-border shrink-0" />

        {/* Middle + Right panels with shared header */}
        <View className="flex-1 flex-col overflow-hidden">
          {/* Generate Megaprompt button spanning both middle and right */}
          <View className="px-4 py-2 border-b border-border flex-row justify-end items-center bg-surface">
            <Button
              variant="outline"
              size="sm"
              onPress={() => setExportOpen(true)}
              className="gap-2 shrink-0"
              icon={<Text className="font-body text-on-surface">⎘</Text>}
            >
              Generate Megaprompt
            </Button>
          </View>

          {/* Middle and Right panels row */}
          <View className="flex-1 flex-row">
            <PreviewPanel className="w-[420px] shrink-0" showFrame />
            <ShowcasePanel className="flex-1 border-l border-border bg-surface overflow-hidden" />
          </View>
        </View>

        <ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
      </SafeAreaView>
    );
  }

  // Narrow layout: tab-based
  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      {/* Tab bar */}
      <View className="px-4 py-2 bg-surface border-b border-border">
        <Tabs
          items={[
            { label: 'Controls', value: 'controls' },
            { label: 'Preview', value: 'preview' },
            { label: 'Showcase', value: 'showcase' },
          ]}
          value={activeTab}
          onValueChange={setActiveTab}
          variant="segmented"
          fullWidth
          size="sm"
        />
      </View>

      {/* Active panel */}
      {activeTab === 'controls' && <ControlsPanel className="flex-1" />}
      {activeTab === 'preview' && <PreviewPanel className="flex-1" showFrame={false} />}
      {activeTab === 'showcase' && <ShowcasePanel className="flex-1" />}

      <ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </SafeAreaView>
  );
}
