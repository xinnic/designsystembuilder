/**
 * ShowcasePanel — Builder UI (NativeWind)
 *
 * Tabbed panel showing Atoms (tokens), Components, and Patterns.
 * Phase 1E.2: Full parity with old Tamagui builder.
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
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
import { Progress } from '../ui/Progress';
import { Image } from '../ui/Image';
import { List, ListItem } from '../ui/ListItem';

// Composed components
import { AppBar } from '../composed/AppBar';
import { CategoryPills } from '../composed/CategoryPills';
import { FeedCard } from '../composed/FeedCard';
import { UserCard } from '../composed/UserCard';
import { BottomNav } from '../composed/BottomNav';
import { StatsCard } from '../composed/StatsCard';
import { ReviewCard } from '../composed/ReviewCard';
import { SettingsGroup } from '../composed/SettingsGroup';
import { ProfileCard } from '../composed/ProfileCard';

interface ShowcasePanelProps {
  className?: string;
}

function SectionHeader({ title, description, icon }: { title: string; description?: string; icon?: string }) {
  const { tokens } = useDesignSystem();

  return (
    <VStack gap="xs" className="mb-4">
      <HStack gap="sm" className="items-center">
        {icon && <Text className="font-body text-on-surface-secondary text-base">{icon}</Text>}
        <Text
          className="font-body font-semibold text-on-surface"
          style={{
            fontSize: parseInt(tokens.h3.size),
            lineHeight: parseInt(tokens.h3.line),
          }}
        >
          {title}
        </Text>
      </HStack>
      {description && (
        <Caption className="text-on-surface-secondary">{description}</Caption>
      )}
    </VStack>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ATOMS TAB
// ─────────────────────────────────────────────────────────────────────────────

function AtomShowcase() {
  const { tokens, customPrimaryColor, isDarkMode, cornerRadius, haptics, setHaptics } = useDesignSystem();

  // Typography styles matching old builder: Display, H1, H2, Subhead, Body, Caption, Button, Label
  const typeStyles = [
    { key: 'displayLg', label: 'Display', token: tokens.displayLg, sample: 'Design System', useDisplayFont: true },
    { key: 'h1', label: 'H1', token: tokens.h1, sample: 'Main Heading', useDisplayFont: true },
    { key: 'h2', label: 'H2', token: tokens.h2, sample: 'Section Title', useDisplayFont: true },
    { key: 'subhead', label: 'Subhead', token: tokens.subhead, sample: 'Subheading', useDisplayFont: true },
    { key: 'body', label: 'Body', token: tokens.body, sample: 'Body text content', useDisplayFont: false },
    { key: 'caption', label: 'Caption', token: tokens.caption, sample: 'Caption', useDisplayFont: false },
    { key: 'button', label: 'Button', token: tokens.button, sample: 'Button Text', useDisplayFont: false },
    { key: 'eyebrow', label: 'Label', token: tokens.eyebrow, sample: 'Supporting text', useDisplayFont: false },
  ];

  // Semantic color roles — matching old builder names/descriptions
  const colorRoles = [
    { name: 'Brand', token: tokens.brand, usage: 'Primary actions' },
    { name: 'Accent', token: tokens.brandWeak, usage: 'Supporting surfaces' },
    { name: 'Text Primary', token: tokens.textPrimary, usage: 'Main content' },
    { name: 'Text Secondary', token: tokens.textSecondary, usage: 'Supporting text' },
    { name: 'Text Disabled', token: tokens.textDisabled, usage: 'Inactive states' },
    { name: 'BG Primary', token: tokens.bgPrimary, usage: 'Page background' },
    { name: 'BG Secondary', token: tokens.bgSecondary, usage: 'Card surfaces' },
    { name: 'Border', token: tokens.border, usage: 'Dividers' },
    { name: 'Focus', token: tokens.focus, usage: 'Focus rings' },
    { name: 'Success', token: tokens.success, usage: 'Success states' },
    { name: 'Warning', token: tokens.warning, usage: 'Warning states' },
    { name: 'Info', token: tokens.info, usage: 'Information' },
    { name: 'Danger', token: tokens.danger, usage: 'Error states' },
  ];

  // Corner radius with usage labels
  const radii = [
    { key: 'sm', value: tokens.radius.sm, usage: 'Inputs' },
    { key: 'md', value: tokens.radius.md, usage: 'Cards' },
    { key: 'lg', value: tokens.radius.lg, usage: 'Modals' },
    { key: 'full', value: tokens.radius.full, usage: 'Pills' },
  ];

  // Shadow levels with usage labels
  const shadows = [
    { level: '1', usage: 'Cards' },
    { level: '2', usage: 'Popovers' },
    { level: '3', usage: 'Modals' },
  ];

  return (
    <VStack gap="lg">
      {/* ── Tokens Header ── */}
      <VStack gap="xs">
        <Text
          className="font-body font-bold text-on-surface"
          style={{
            fontSize: parseInt(tokens.h2.size),
            lineHeight: parseInt(tokens.h2.line),
            fontWeight: tokens.h2.weight.toString() as any,
          }}
        >
          Tokens
        </Text>
        <Body className="text-on-surface-secondary">
          Foundational design elements that define your system's visual language
        </Body>
      </VStack>

      {/* ── Typography Scale ── */}
      <View>
        <VStack gap="xs" className="mb-3">
          <Text className="font-body text-2xl text-on-surface-secondary">T</Text>
          <Text className="font-body font-bold text-on-surface text-xl">
            Typography Scale
          </Text>
          <Body className="text-on-surface-secondary">
            Type styles that set hierarchy—headlines, body, captions. Change these to give your product a distinct voice.
          </Body>
        </VStack>
        <VStack gap="none" className="bg-surface rounded-lg overflow-hidden">
          {typeStyles.map((style, index) => (
            <View
              key={style.key}
              className="flex-row items-center justify-between gap-2 px-4 py-3"
            >
              <Text
                className="text-on-surface flex-1"
                style={{
                  fontSize: Math.min(parseInt(style.token.size), 32),
                  lineHeight: Math.min(parseInt(style.token.line), 40),
                  fontWeight: style.token.weight.toString() as any,
                  fontFamily: style.useDisplayFont ? 'var(--font-display)' : 'var(--font-body)',
                  letterSpacing: 'track' in style.token ? (style.token as any).track : undefined,
                  textTransform: 'uppercase' in style.token && (style.token as any).uppercase ? 'uppercase' : undefined,
                }}
              >
                {style.sample}
              </Text>
              <VStack gap="none" className="items-end flex-shrink-0">
                <Caption className="text-on-surface font-medium">{style.label}</Caption>
                <Caption className="text-on-surface-secondary">
                  {style.token.size} / {style.token.line} @ {style.token.weight}
                </Caption>
              </VStack>
            </View>
          ))}
        </VStack>
      </View>

      {/* ── Color Roles — 3-column grid matching old builder ── */}
      <View>
        <SectionHeader
          title="Color Roles"
          description="Brand and UI colors used across components. These are semantic—change the role, and the whole system updates."
        />
        <View className="bg-surface rounded-lg p-4">
          <View className="flex-row flex-wrap gap-3">
            {colorRoles.map((color) => (
              <View key={color.name} className="w-[31%] mb-2">
                <View
                  className="h-16 rounded-md border border-border mb-1.5"
                  style={{ backgroundColor: `rgb(${color.token})` }}
                />
                <Text className="font-body text-sm font-medium text-on-surface">{color.name}</Text>
                <Caption className="text-on-surface-secondary">{color.usage}</Caption>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* ── Spacing Ladder ── */}
      <View>
        <VStack gap="xs" className="mb-3">
          <Text className="font-body text-2xl text-on-surface-secondary">⊞</Text>
          <Text className="font-body font-bold text-on-surface text-xl">
            Spacing Ladder
          </Text>
          <Body className="text-on-surface-secondary">
            Consistent rhythm so screens feel intentional. Based on an 8-pt scale.
          </Body>
        </VStack>
        <VStack gap="sm" className="bg-surface rounded-lg p-4 border border-border">
          {tokens.space.map((value, index) => (
            <HStack key={index} gap="sm" className="items-center">
              <View
                className="h-6 bg-brand-500 rounded-sm"
                style={{ width: value }}
              />
              <Caption className="text-on-surface-secondary">{value}px</Caption>
            </HStack>
          ))}
        </VStack>
      </View>

      {/* ── Corner Radii ── */}
      <View>
        <VStack gap="xs" className="mb-3">
          <Text className="font-body text-2xl text-on-surface-secondary">⟲</Text>
          <Text className="font-body font-bold text-on-surface text-xl">
            Corner Radii
          </Text>
          <Body className="text-on-surface-secondary">
            How rounded surfaces are. Small for dense controls, medium for cards, large for modals, full for pills.
          </Body>
        </VStack>
        <HStack gap="md" className="items-center flex-wrap bg-surface rounded-lg p-4 border border-border">
          {radii.map((r) => (
            <VStack key={r.key} gap="xs" className="items-center">
              <View
                className="w-16 h-16 bg-brand-500"
                style={{ borderRadius: parseInt(r.value) || 0 }}
              />
              <Caption className="font-medium">{r.key} ({r.value})</Caption>
              <Caption className="text-on-surface-secondary">{r.usage}</Caption>
            </VStack>
          ))}
        </HStack>
      </View>

      {/* ── Shadows ── */}
      <View>
        <VStack gap="xs" className="mb-3">
          <Text className="font-body text-2xl text-on-surface-secondary">◇</Text>
          <Text className="font-body font-bold text-on-surface text-xl">
            Elevation (Shadows)
          </Text>
          <Body className="text-on-surface-secondary">
            Depth cues. Use subtle for resting cards, medium for interactive popovers, strong for modals.
          </Body>
        </VStack>
        <HStack gap="md" className="flex-wrap bg-surface rounded-lg p-4 border border-border">
          {shadows.map((s) => (
            <VStack key={s.level} gap="xs" className="items-center">
              <View
                className={cn(
                  'w-20 h-20 bg-canvas rounded-lg',
                  s.level === '1' && 'shadow-sm',
                  s.level === '2' && 'shadow-md',
                  s.level === '3' && 'shadow-lg',
                )}
              />
              <Caption className="font-medium">Level {s.level}</Caption>
              <Caption className="text-on-surface-secondary">{s.usage}</Caption>
            </VStack>
          ))}
        </HStack>
      </View>

      {/* ── Motion ── */}
      <View>
        <SectionHeader
          title="Motion"
          description="How fast and smooth UI moves. All demos use your duration and easing tokens."
        />
        <VStack gap="sm" className="bg-surface-secondary rounded-lg p-4">
          <HStack gap="md" className="flex-wrap">
            <VStack gap="xs" className="items-center">
              <View className="w-16 h-16 bg-brand-500 rounded-full items-center justify-center">
                <Text className="font-body text-white text-xs font-bold">Fast</Text>
              </View>
              <Caption>{tokens.motion.fast}</Caption>
            </VStack>
            <VStack gap="xs" className="items-center">
              <View className="w-16 h-16 bg-brand-500 rounded-full items-center justify-center">
                <Text className="font-body text-white text-xs font-bold">Base</Text>
              </View>
              <Caption>{tokens.motion.base}</Caption>
            </VStack>
            <VStack gap="xs" className="items-center">
              <View className="w-16 h-16 bg-brand-500 rounded-full items-center justify-center">
                <Text className="font-body text-white text-xs font-bold">Slow</Text>
              </View>
              <Caption>{tokens.motion.slow}</Caption>
            </VStack>
          </HStack>
          <Caption className="text-on-surface-secondary">
            Easing: {tokens.motion.easeStandard}
          </Caption>
        </VStack>
      </View>

      {/* ── Haptics ── */}
      <View>
        <SectionHeader
          title="Haptics"
          description="Short tactile vibrations that reinforce interactions for touch devices."
        />
        <VStack gap="md" className="bg-surface-secondary rounded-lg p-4">
          <Switch
            label="Haptics Enabled"
            value={haptics.enabled}
            onValueChange={(val) => setHaptics({ enabled: val })}
          />
          <VStack gap="xs">
            <Caption className="font-medium">Platform</Caption>
            <Caption className="text-on-surface-secondary">{haptics.stack}</Caption>
          </VStack>
          <HStack gap="sm" className="flex-wrap">
            <Button variant="outline" size="sm">Light</Button>
            <Button variant="outline" size="sm">Medium</Button>
            <Button variant="outline" size="sm">Success</Button>
            <Button variant="outline" size="sm">Error</Button>
          </HStack>
        </VStack>
      </View>
    </VStack>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS TAB
// ─────────────────────────────────────────────────────────────────────────────

function ComponentShowcase() {
  const [checked, setChecked] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');
  const [tabValue, setTabValue] = useState('tab1');

  return (
    <VStack gap="lg">
      {/* ── Buttons ── */}
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
          <VStack gap="sm">
            <Caption className="font-semibold">Full Width</Caption>
            <Button variant="primary" size="md" fullWidth>Full Width Button</Button>
            <Button variant="outline" size="md" fullWidth>Full Width Outline</Button>
          </VStack>
        </VStack>
      </View>

      {/* ── Inputs ── */}
      <View>
        <SectionHeader title="Form Controls" description="Text fields, toggles, and selectors" />
        <VStack gap="md">
          <Input placeholder="Default input" />
          <Input placeholder="With label" label="Email Address" />
          <Input placeholder="With error" error="This field is required" />
          <Input placeholder="Disabled" disabled />
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

      {/* ── Cards ── */}
      <View>
        <SectionHeader title="Cards" description="Content containers" />
        <VStack gap="md">
          <Card variant="elevated" header="Elevated Card">
            <Body>This card uses shadow elevation to create depth.</Body>
          </Card>
          <Card variant="outlined" header="Outlined Card">
            <Body>This card uses a border for definition.</Body>
          </Card>
          <Card variant="ghost" header="Ghost Card">
            <Body>This card has no border or shadow.</Body>
          </Card>
        </VStack>
      </View>

      {/* ── Avatars & Chips ── */}
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

      {/* ── Images ── */}
      <View>
        <SectionHeader title="Images" description="Different radii and aspect ratios" />
        <VStack gap="md">
          <HStack gap="sm" className="flex-wrap">
            <Image
              src="https://picsum.photos/seed/img1/200/200"
              alt="Square"
              aspectRatio="square"
              rounded="sm"
              className="w-20"
            />
            <Image
              src="https://picsum.photos/seed/img2/200/200"
              alt="Rounded"
              aspectRatio="square"
              rounded="md"
              className="w-20"
            />
            <Image
              src="https://picsum.photos/seed/img3/200/200"
              alt="Large radius"
              aspectRatio="square"
              rounded="lg"
              className="w-20"
            />
            <Image
              src="https://picsum.photos/seed/img4/200/200"
              alt="Circle"
              aspectRatio="square"
              rounded="full"
              className="w-20"
            />
          </HStack>
          <Image
            src="https://picsum.photos/seed/img5/400/200"
            alt="Video aspect"
            aspectRatio="video"
            rounded="md"
          />
        </VStack>
      </View>

      {/* ── List Items ── */}
      <View>
        <SectionHeader title="List Items" description="Navigation and settings rows" />
        <List dividers>
          <ListItem
            leading={<Text className="text-lg">📧</Text>}
            title="Email Notifications"
            subtitle="Receive email for new messages"
            trailing={<Text className="text-on-surface-secondary">›</Text>}
          />
          <ListItem
            leading={<Text className="text-lg">🔔</Text>}
            title="Push Notifications"
            subtitle="Get notified on your device"
            trailing={<Text className="text-on-surface-secondary">›</Text>}
          />
          <ListItem
            leading={<Text className="text-lg">🌐</Text>}
            title="Language"
            subtitle="English (US)"
            trailing={<Text className="text-on-surface-secondary">›</Text>}
          />
          <ListItem
            leading={<Text className="text-lg">🎨</Text>}
            title="Appearance"
            subtitle="Light mode"
            trailing={<Text className="text-on-surface-secondary">›</Text>}
          />
        </List>
      </View>

      {/* ── Tabs ── */}
      <View>
        <SectionHeader title="Tabs" description="Tab navigation styles" />
        <VStack gap="md">
          <VStack gap="xs">
            <Caption className="font-semibold">Underline</Caption>
            <Tabs
              items={[
                { label: 'Posts', value: 'tab1' },
                { label: 'Replies', value: 'tab2' },
                { label: 'Media', value: 'tab3' },
              ]}
              value={tabValue}
              onValueChange={setTabValue}
              variant="underline"
              size="sm"
            />
          </VStack>
          <VStack gap="xs">
            <Caption className="font-semibold">Pill</Caption>
            <Tabs
              items={[
                { label: 'Posts', value: 'tab1' },
                { label: 'Replies', value: 'tab2' },
                { label: 'Media', value: 'tab3' },
              ]}
              value={tabValue}
              onValueChange={setTabValue}
              variant="pill"
              size="sm"
            />
          </VStack>
          <VStack gap="xs">
            <Caption className="font-semibold">Segmented</Caption>
            <Tabs
              items={[
                { label: 'Posts', value: 'tab1' },
                { label: 'Replies', value: 'tab2' },
                { label: 'Media', value: 'tab3' },
              ]}
              value={tabValue}
              onValueChange={setTabValue}
              variant="segmented"
              size="sm"
            />
          </VStack>
        </VStack>
      </View>

      {/* ── Progress ── */}
      <View>
        <SectionHeader title="Progress" description="Loading and completion indicators" />
        <VStack gap="md">
          <VStack gap="xs">
            <Caption>25%</Caption>
            <Progress value={25} size="sm" />
          </VStack>
          <VStack gap="xs">
            <Caption>50%</Caption>
            <Progress value={50} size="md" />
          </VStack>
          <VStack gap="xs">
            <Caption>75%</Caption>
            <Progress value={75} size="lg" />
          </VStack>
          <VStack gap="xs">
            <Caption>100% (Success)</Caption>
            <Progress value={100} size="md" color="success" />
          </VStack>
        </VStack>
      </View>

      {/* ── App Components ── */}
      <View>
        <SectionHeader title="App Components" description="Composed bespoke components" />
        <VStack gap="md">
          <Caption className="font-semibold">Stats Card</Caption>
          <HStack gap="sm" className="flex-wrap">
            <StatsCard value="1,234" label="Users" variant="compact" className="flex-1" />
            <StatsCard value="98%" label="Uptime" variant="compact" className="flex-1" />
          </HStack>

          <Caption className="font-semibold">Review Card</Caption>
          <ReviewCard
            rating={5}
            review="Excellent quality and attention to detail."
            author="Jamie K."
            date="1 week ago"
          />

          <Caption className="font-semibold">Settings Group</Caption>
          <SettingsGroup
            items={[
              { label: 'Wi-Fi', icon: <Text>📶</Text>, type: 'toggle', value: true },
              { label: 'Bluetooth', icon: <Text>🎧</Text>, type: 'toggle', value: false },
            ]}
          />

          <Caption className="font-semibold">Profile Card</Caption>
          <ProfileCard
            variant="compact"
            name="Alex Chen"
            username="alexc"
            bio="Design engineer and coffee enthusiast"
            avatar="https://picsum.photos/seed/pc1/100/100"
          />
        </VStack>
      </View>
    </VStack>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PATTERNS TAB
// ─────────────────────────────────────────────────────────────────────────────

function PatternsShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeNav, setActiveNav] = useState('home');

  return (
    <VStack gap="lg">
      <View>
        <SectionHeader
          title="Composed Patterns"
          description="Higher-level UI patterns built from atoms and components"
        />
      </View>

      {/* ── App Header ── */}
      <View>
        <Caption className="font-semibold mb-2">App Header</Caption>
        <AppBar title="Discover" variant="default" />
      </View>

      {/* ── Category Pills ── */}
      <View>
        <Caption className="font-semibold mb-2">Category Pills</Caption>
        <CategoryPills
          items={[
            { label: 'All', value: 'all' },
            { label: 'Popular', value: 'popular' },
            { label: 'New', value: 'new' },
            { label: 'Trending', value: 'trending' },
          ]}
          value={activeCategory}
          onValueChange={setActiveCategory}
        />
      </View>

      {/* ── Bottom Navigation ── */}
      <View>
        <Caption className="font-semibold mb-2">Bottom Navigation</Caption>
        <BottomNav
          items={[
            { value: 'home', label: 'Home', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>🏠</Body> },
            { value: 'search', label: 'Search', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>🔍</Body> },
            { value: 'create', label: 'Create', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>➕</Body> },
            { value: 'activity', label: 'Activity', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>❤️</Body> },
            { value: 'profile', label: 'Profile', icon: (a: boolean) => <Body color={a ? 'brand' : 'on-surface-secondary'}>👤</Body> },
          ]}
          value={activeNav}
          onValueChange={setActiveNav}
          variant="filled"
        />
      </View>

      {/* ── Form Layout ── */}
      <View>
        <Caption className="font-semibold mb-2">Form Layout</Caption>
        <Card>
          <VStack gap="md">
            <Input label="Email" placeholder="you@example.com" />
            <Input label="Password" placeholder="••••••••" secureTextEntry />
            <Button variant="primary" fullWidth>Sign In</Button>
            <Caption className="text-on-surface-secondary text-center">
              Don't have an account? Sign up
            </Caption>
          </VStack>
        </Card>
      </View>

      {/* ── Card Grid ── */}
      <View>
        <Caption className="font-semibold mb-2">Card Grid</Caption>
        <View className="flex-row flex-wrap gap-2">
          {['Design', 'Code', 'Ship', 'Scale'].map((item) => (
            <Card key={item} variant="outlined" className="w-[48%]">
              <VStack gap="xs" className="items-center py-2">
                <Text className="text-2xl">
                  {item === 'Design' ? '🎨' : item === 'Code' ? '💻' : item === 'Ship' ? '🚀' : '📈'}
                </Text>
                <Body className="font-semibold">{item}</Body>
                <Caption className="text-on-surface-secondary text-center">
                  {item === 'Design' ? 'Create beautiful interfaces' :
                   item === 'Code' ? 'Build with confidence' :
                   item === 'Ship' ? 'Deploy to production' : 'Grow your product'}
                </Caption>
              </VStack>
            </Card>
          ))}
        </View>
      </View>

      {/* ── Drawer Menu ── */}
      <View>
        <Caption className="font-semibold mb-2">Drawer Menu</Caption>
        <Card className="overflow-hidden">
          <VStack gap="none">
            {/* Profile area */}
            <HStack gap="sm" className="items-center p-4 bg-brand-500/10 mb-2">
              <Avatar
                src="https://picsum.photos/seed/drawer/100/100"
                initials="JD"
                size="md"
              />
              <VStack gap="none">
                <Body className="font-semibold">Jane Doe</Body>
                <Caption className="text-on-surface-secondary">jane@example.com</Caption>
              </VStack>
            </HStack>
            {/* Menu items */}
            <List dividers>
              <ListItem leading={<Text>🏠</Text>} title="Home" />
              <ListItem leading={<Text>👤</Text>} title="Profile" />
              <ListItem leading={<Text>⚙️</Text>} title="Settings" />
              <ListItem leading={<Text>❓</Text>} title="Help & Support" />
              <ListItem leading={<Text>🚪</Text>} title="Sign Out" />
            </List>
          </VStack>
        </Card>
      </View>

      {/* ── Feed Card ── */}
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

      {/* ── User Card ── */}
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

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PANEL
// ─────────────────────────────────────────────────────────────────────────────

export function ShowcasePanel({ className }: ShowcasePanelProps) {
  const [activeTab, setActiveTab] = useState('atoms');
  const { renderVersion } = useDesignSystem();

  return (
    <View key={renderVersion} className={cn('flex-1 bg-canvas', className)}>
      <View className="px-4 pt-4 pb-2 border-b border-border bg-surface">
        <Tabs
          items={[
            { label: '⚛ Atoms', value: 'atoms' },
            { label: '▤ Components', value: 'components' },
            { label: '⊞ Patterns', value: 'patterns' },
          ]}
          value={activeTab}
          onValueChange={setActiveTab}
          variant="segmented"
          size="sm"
          fullWidth
        />
      </View>

      <ScrollView className="flex-1 bg-canvas" contentContainerClassName="p-4">
        {activeTab === 'atoms' && <AtomShowcase />}
        {activeTab === 'components' && <ComponentShowcase />}
        {activeTab === 'patterns' && <PatternsShowcase />}
      </ScrollView>
    </View>
  );
}
