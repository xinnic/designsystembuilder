/**
 * ShowcasePanel — Builder UI (NativeWind)
 *
 * Tabbed panel showing Atoms (tokens), Components, and Patterns.
 * Replaces the old DesignSystemOverview/TamaguiShowcase/PatternsShowcase split.
 */

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { cn } from '@/lib/utils';
import { useDesignSystem } from '../../state/designSystem';
import { Tabs } from '../ui/Tabs';
import { VStack, HStack } from '../ui/Stack';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';
import { Checkbox } from '../ui/Checkbox';
import { Select } from '../ui/Select';
import { Heading, Body, Caption } from '../ui/Text';
import { Avatar } from '../ui/Avatar';
import { Chip } from '../ui/Chip';
import { Badge } from '../ui/Badge';

interface ShowcasePanelProps {
  className?: string;
}

function SectionHeader({ title, description }: { title: string; description?: string }) {
  const { tokens } = useDesignSystem();

  return (
    <VStack gap="xs" className="mb-4">
      <Text
        className="font-semibold text-on-surface"
        style={{
          fontSize: parseInt(tokens.h3.size),
          lineHeight: parseInt(tokens.h3.line),
        }}
      >
        {title}
      </Text>
      {description && (
        <Caption className="text-on-surface-secondary">{description}</Caption>
      )}
    </VStack>
  );
}

function AtomShowcase() {
  const { tokens, customPrimaryColor, isDarkMode, cornerRadius } = useDesignSystem();

  return (
    <VStack gap="lg">
      {/* Typography */}
      <View>
        <SectionHeader
          title="Typography"
          description="Type scale defining hierarchy across your interface"
        />
        <VStack gap="md" className="bg-surface-secondary rounded-lg p-4">
          <VStack gap="xs">
            <Caption className="text-on-surface-secondary">Display Large</Caption>
            <Text
              className="text-on-surface"
              style={{
                fontSize: parseInt(tokens.displayLg.size),
                lineHeight: parseInt(tokens.displayLg.line),
                fontWeight: tokens.displayLg.weight.toString(),
              }}
            >
              Design System
            </Text>
          </VStack>
          <VStack gap="xs">
            <Caption className="text-on-surface-secondary">Heading 1</Caption>
            <Text
              className="text-on-surface"
              style={{
                fontSize: parseInt(tokens.h1.size),
                lineHeight: parseInt(tokens.h1.line),
                fontWeight: tokens.h1.weight.toString(),
              }}
            >
              The quick brown fox
            </Text>
          </VStack>
          <VStack gap="xs">
            <Caption className="text-on-surface-secondary">Body</Caption>
            <Text
              className="text-on-surface"
              style={{
                fontSize: parseInt(tokens.body.size),
                lineHeight: parseInt(tokens.body.line),
                fontWeight: tokens.body.weight.toString(),
              }}
            >
              The quick brown fox jumps over the lazy dog
            </Text>
          </VStack>
          <VStack gap="xs">
            <Caption className="text-on-surface-secondary">Caption</Caption>
            <Text
              className="text-on-surface-secondary"
              style={{
                fontSize: parseInt(tokens.caption.size),
                lineHeight: parseInt(tokens.caption.line),
                fontWeight: tokens.caption.weight.toString(),
              }}
            >
              Secondary metadata and hints
            </Text>
          </VStack>
        </VStack>
      </View>

      {/* Colors */}
      <View>
        <SectionHeader
          title="Brand Colors"
          description="Primary brand color and its generated scale"
        />
        <HStack gap="sm" className="flex-wrap">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
            <VStack key={shade} gap="xs" className="items-center">
              <View
                className={`w-12 h-12 rounded-md border border-border`}
                style={{ backgroundColor: `rgb(var(--color-brand-${shade}))` }}
              />
              <Caption className="text-on-surface-secondary">{shade}</Caption>
            </VStack>
          ))}
        </HStack>
      </View>

      {/* Border Radius */}
      <View>
        <SectionHeader
          title="Border Radius"
          description={`Current setting: ${cornerRadius}`}
        />
        <HStack gap="md" className="items-center flex-wrap">
          <VStack gap="xs" className="items-center">
            <View className="w-16 h-16 bg-brand-500 rounded-sm" />
            <Caption>Small ({tokens.radius.sm})</Caption>
          </VStack>
          <VStack gap="xs" className="items-center">
            <View className="w-16 h-16 bg-brand-500 rounded-md" />
            <Caption>Medium ({tokens.radius.md})</Caption>
          </VStack>
          <VStack gap="xs" className="items-center">
            <View className="w-16 h-16 bg-brand-500 rounded-lg" />
            <Caption>Large ({tokens.radius.lg})</Caption>
          </VStack>
          <VStack gap="xs" className="items-center">
            <View className="w-16 h-16 bg-brand-500 rounded-full" />
            <Caption>Full</Caption>
          </VStack>
        </HStack>
      </View>

      {/* Shadows */}
      <View>
        <SectionHeader
          title="Shadows"
          description="Elevation levels for creating depth"
        />
        <HStack gap="md" className="flex-wrap">
          <VStack gap="xs" className="items-center">
            <View className="w-20 h-20 bg-surface rounded-lg shadow-sm" />
            <Caption>Shadow 1</Caption>
          </VStack>
          <VStack gap="xs" className="items-center">
            <View className="w-20 h-20 bg-surface rounded-lg shadow-md" />
            <Caption>Shadow 2</Caption>
          </VStack>
          <VStack gap="xs" className="items-center">
            <View className="w-20 h-20 bg-surface rounded-lg shadow-lg" />
            <Caption>Shadow 3</Caption>
          </VStack>
        </HStack>
      </View>
    </VStack>
  );
}

function ComponentShowcase() {
  const [checked, setChecked] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');

  return (
    <VStack gap="lg">
      {/* Buttons */}
      <View>
        <SectionHeader title="Buttons" description="Primary actions and controls" />
        <VStack gap="md">
          <VStack gap="sm">
            <Caption className="font-semibold">Variants</Caption>
            <HStack gap="sm" className="flex-wrap">
              <Button variant="primary" size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="tertiary" size="sm">Tertiary</Button>
              <Button variant="destructive" size="sm">Destructive</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
              <Button variant="outline" size="sm">Outline</Button>
            </HStack>
          </VStack>
          <VStack gap="sm">
            <Caption className="font-semibold">Sizes</Caption>
            <HStack gap="sm" className="items-center flex-wrap">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </HStack>
          </VStack>
        </VStack>
      </View>

      {/* Inputs */}
      <View>
        <SectionHeader title="Inputs" description="Text fields and controls" />
        <VStack gap="md">
          <Input placeholder="Default input" />
          <Input placeholder="With label" label="Email Address" />
          <Input placeholder="With error" error="This field is required" />
          <Input placeholder="Disabled" disabled />
        </VStack>
      </View>

      {/* Cards */}
      <View>
        <SectionHeader title="Cards" description="Content containers" />
        <VStack gap="md">
          <Card variant="elevated" header="Elevated Card">
            <Body>This card uses shadow elevation to create depth.</Body>
          </Card>
          <Card variant="outlined" header="Outlined Card">
            <Body>This card uses a border for definition.</Body>
          </Card>
        </VStack>
      </View>

      {/* Controls */}
      <View>
        <SectionHeader title="Controls" description="Interactive elements" />
        <VStack gap="md">
          <Checkbox
            checked={checked}
            onCheckedChange={setChecked}
            label="Checkbox control"
          />
          <Switch
            value={switchValue}
            onValueChange={setSwitchValue}
            label="Switch control"
          />
          <VStack gap="sm">
            <Caption>Select Dropdown</Caption>
            <Select
              value={selectedOption}
              onValueChange={setSelectedOption}
              options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ]}
            />
          </VStack>
        </VStack>
      </View>

      {/* Avatars & Chips */}
      <View>
        <SectionHeader title="Avatars & Chips" description="User representation and tags" />
        <VStack gap="md">
          <HStack gap="sm" className="items-center flex-wrap">
            <Avatar initials="AB" size="sm" />
            <Avatar initials="CD" size="md" />
            <Avatar initials="EF" size="lg" />
            <Avatar
              src="https://picsum.photos/seed/avatar/100/100"
              initials="GH"
              size="md"
            />
          </HStack>
          <HStack gap="sm" className="flex-wrap">
            <Chip label="Default" />
            <Chip label="Selected" selected />
            <Chip label="With Badge" badge={5} />
            <Badge count={3} />
            <Badge count={99} max={99} />
          </HStack>
        </VStack>
      </View>
    </VStack>
  );
}

function PatternsShowcase() {
  // Import composed components
  const AppBar = require('../composed/AppBar').AppBar;
  const CategoryPills = require('../composed/CategoryPills').CategoryPills;
  const FeedCard = require('../composed/FeedCard').FeedCard;
  const UserCard = require('../composed/UserCard').UserCard;

  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <VStack gap="lg">
      <View>
        <SectionHeader
          title="Composed Patterns"
          description="Higher-level components built from atoms and core components"
        />
      </View>

      {/* App Bar */}
      <View>
        <Caption className="font-semibold mb-2">App Bar</Caption>
        <AppBar title="Discover" variant="default" />
      </View>

      {/* Category Pills */}
      <View>
        <Caption className="font-semibold mb-2">Category Pills</Caption>
        <CategoryPills
          items={[
            { label: 'All', value: 'all' },
            { label: 'Popular', value: 'popular' },
            { label: 'New', value: 'new' },
          ]}
          value={activeCategory}
          onValueChange={setActiveCategory}
        />
      </View>

      {/* Feed Card */}
      <View>
        <Caption className="font-semibold mb-2">Feed Card</Caption>
        <FeedCard
          image="https://picsum.photos/seed/pattern1/400/200"
          title="Design System Best Practices"
          description="Learn how to build scalable, maintainable design systems"
          author={{
            name: 'Jane Doe',
            avatar: 'https://picsum.photos/seed/avatar4/100/100',
          }}
          variant="hero"
        />
      </View>

      {/* User Card */}
      <View>
        <Caption className="font-semibold mb-2">User Card</Caption>
        <UserCard
          name="John Smith"
          role="Product Designer"
          avatar="https://picsum.photos/seed/avatar5/100/100"
        />
      </View>
    </VStack>
  );
}

export function ShowcasePanel({ className }: ShowcasePanelProps) {
  const [activeTab, setActiveTab] = useState('atoms');
  const { renderVersion } = useDesignSystem();

  return (
    <View key={renderVersion} className={cn('flex-1 bg-surface', className)}>
      <View className="px-4 pt-4 pb-2 border-b border-border">
        <Tabs
          items={[
            { label: 'Atoms', value: 'atoms' },
            { label: 'Components', value: 'components' },
            { label: 'Patterns', value: 'patterns' },
          ]}
          value={activeTab}
          onValueChange={setActiveTab}
          variant="segmented"
          size="sm"
          fullWidth
        />
      </View>

      <ScrollView className="flex-1" contentContainerClassName="p-4">
        {activeTab === 'atoms' && <AtomShowcase />}
        {activeTab === 'components' && <ComponentShowcase />}
        {activeTab === 'patterns' && <PatternsShowcase />}
      </ScrollView>
    </View>
  );
}
