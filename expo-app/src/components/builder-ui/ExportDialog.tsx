/**
 * ExportDialog — Builder UI (NativeWind)
 *
 * Export dialog showing folder structure tree preview.
 * "Copy SKILL.md" and "Download ZIP" buttons.
 * This is the UI shell — actual generation is Phase 1F.
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import { cn } from '@/lib/utils';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { VStack, HStack } from '../ui/Stack';
import { Body, Caption } from '../ui/Text';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function copyToClipboard(text: string) {
  if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
}

const FOLDER_TREE = `design-system/
├── SKILL.md
├── tokens.json
├── tailwind.config.js
├── global.css
├── components/
│   ├── Button.md
│   ├── Card.md
│   ├── Input.md
│   ├── Select.md
│   ├── Tabs.md
│   ├── Dialog.md
│   ├── Switch.md
│   ├── Avatar.md
│   ├── Badge.md
│   ├── Chip.md
│   └── ...
└── rules.md`;

const SKILL_PLACEHOLDER = `# Design System SKILL

> Auto-generated design system specification.
> Use this file to instruct AI assistants about your design system.

## Tokens
<!-- Tokens will be generated in Phase 1F -->

## Components
<!-- Component specs will be generated in Phase 1F -->

## Rules
<!-- Design rules will be generated in Phase 1F -->
`;

export function ExportDialog({ open, onOpenChange }: ExportDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySKILL = () => {
    copyToClipboard(SKILL_PLACEHOLDER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Export Design System"
      description="Download your design system as AI-ready files"
      footer={
        <HStack gap="sm">
          <Button variant="ghost" onPress={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="outline" onPress={handleCopySKILL}>
            {copied ? 'Copied!' : 'Copy SKILL.md'}
          </Button>
          <Button onPress={() => { /* Phase 1F: ZIP generation */ }}>
            Download ZIP
          </Button>
        </HStack>
      }
    >
      <VStack gap="md" className="py-4">
        <Body>
          Your design system will be exported as the following file structure:
        </Body>

        {/* Folder tree preview */}
        <ScrollView
          horizontal
          className="bg-on-surface/5 rounded-lg p-4"
        >
          <Text
            className="text-xs text-on-surface"
            style={{ fontFamily: Platform.OS === 'web' ? 'monospace' : 'Courier' }}
          >
            {FOLDER_TREE}
          </Text>
        </ScrollView>

        <Caption>
          The SKILL.md file contains a complete specification that AI assistants
          can use to generate code matching your design system. ZIP download
          will be available in a future update.
        </Caption>
      </VStack>
    </Dialog>
  );
}
