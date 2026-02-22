/**
 * FontPairSelector — Builder UI (NativeWind)
 *
 * Two Select components for Primary and Display font selection.
 * Font lists ported from old Sidebar.tsx.
 */

import React from 'react';
import { View } from 'react-native';
import { Select } from '../ui/Select';
import { SectionLabel } from './SectionLabel';

// Primary fonts (Sans-serif only - for body text)
export const primaryFonts = [
  { label: 'Plus Jakarta Sans', value: 'font-jakarta' },
  { label: 'Be Vietnam Pro', value: 'font-vietnam' },
  { label: 'Wix Madefor Text', value: 'font-wix' },
  { label: 'Figtree', value: 'font-figtree' },
  { label: 'Albert Sans', value: 'font-albert' },
  { label: 'Satoshi', value: 'font-satoshi' },
  { label: 'Epilogue', value: 'font-epilogue' },
  { label: 'Manrope', value: 'font-manrope' },
  { label: 'Public Sans', value: 'font-public' },
  { label: 'Space Grotesk', value: 'font-space' },
  { label: 'Work Sans', value: 'font-work' },
  { label: 'Source Sans 3', value: 'font-source-sans' },
  { label: 'Nunito Sans', value: 'font-nunito' },
  { label: 'Arimo', value: 'font-arimo' },
  { label: 'Hanken Grotesk', value: 'font-hanken' },
  { label: 'Rubik', value: 'font-rubik' },
  { label: 'DM Sans', value: 'font-dm' },
  { label: 'IBM Plex Sans', value: 'font-ibm' },
  { label: 'Sora', value: 'font-sora' },
  { label: 'Montserrat', value: 'font-montserrat' },
];

// Display fonts (All fonts including serif - for headings and titles)
export const displayFonts = [
  ...primaryFonts,
  { label: 'Newsreader', value: 'font-newsreader' },
  { label: 'Noto Serif', value: 'font-noto' },
  { label: 'Domine', value: 'font-domine' },
  { label: 'Libre Caslon Text', value: 'font-libre' },
  { label: 'EB Garamond', value: 'font-garamond' },
  { label: 'Literata', value: 'font-literata' },
  { label: 'Source Serif 4', value: 'font-source-serif' },
];

interface FontPairSelectorProps {
  mode: 'primary' | 'display';
  selectedFont: string;
  onSelectFont: (font: string) => void;
  className?: string;
}

export function FontPairSelector({
  mode,
  selectedFont,
  onSelectFont,
  className,
}: FontPairSelectorProps) {
  const fonts = mode === 'primary' ? primaryFonts : displayFonts;
  const label = mode === 'primary' ? 'Primary Font' : 'Display Font';
  const description = mode === 'display' ? 'For headings and titles' : undefined;

  return (
    <View className={className}>
      <SectionLabel title={label} description={description} />
      <Select
        label=""
        options={fonts}
        value={selectedFont}
        onValueChange={onSelectFont}
        placeholder="Select font..."
      />
    </View>
  );
}
