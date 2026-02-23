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

const BREAKPOINT = 768;

export default function BuilderScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= BREAKPOINT;

  const [activeTab, setActiveTab] = useState('controls');
  const [exportOpen, setExportOpen] = useState(false);

  if (isWide) {
    return (
      <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
        {/* Header row with Export button (matching old builder) */}
        <View className="px-4 py-3 flex-row justify-end items-center border-b border-border bg-surface">
          <Button variant="outline" size="sm" onPress={() => setExportOpen(true)}>
            Export
          </Button>
        </View>

        {/* 3-panel layout — left 320px, middle 420px, right flex-1 */}
        <View className="flex-1 flex-row">
          <ControlsPanel className="w-[320px] border-r border-border" />
          <PreviewPanel className="w-[420px]" showFrame />
          <ShowcasePanel className="flex-1 border-l border-border" />
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
