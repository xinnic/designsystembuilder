import React, { useState } from 'react';
import { BUILDER_LAYOUT } from '../config/builderLayout';
import {
  XStack,
  YStack,
  ScrollView,
  Tabs,
  Sheet,
  Dialog,
  Progress,
  Slider,
  Checkbox,
  RadioGroup,
  ToggleGroup,
  Circle,
  Square,
  Label as TamaguiLabel,
  Text,
  Select,
  Adapt,
  Sheet as TamaguiSheet,
  Heading
} from 'tamagui';
import { useDesignSystem } from '../state/designSystem';
import { ChevronDown, Check, ChevronUp } from 'lucide-react';
import { ShowcaseSection } from '../components/ShowcaseSection';

// Import our design system components
import {
  Button,
  Card,
  Input,
  TextArea,
  Switch,
  Body,
  Caption,
  Label,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Image,
  ListItem,
} from '../design-system/components';

import {
  HeroCard,
  StatsCard,
  ReviewCard,
  SettingsGroup,
  ProfileCard,
} from '../design-system/bespoke';

export default function TamaguiShowcase() {
  // Note: useTokenCSS is called in PreviewPhoneTamagui, no need to duplicate here
  const { isDarkMode, selectedPrimaryFont } = useDesignSystem();
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [sliderValue, setSliderValue] = useState([50]);
  const [toggleValue, setToggleValue] = useState('center');
  const [tabValue, setTabValue] = useState('tab1');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <ScrollView
      backgroundColor="$bgPrimary"
      flex={1}
      padding={BUILDER_LAYOUT.panelPadding}
    >
      <YStack gap="$8" minHeight="100%" paddingBottom="$10">
        {/* Components Section Header */}
        <YStack gap="$2">
          <Heading fontSize="$9" fontWeight="700" color="$color">
            Components
          </Heading>
          <Text fontSize="$5" color="$color" opacity={0.6}>
            Building blocks for your application UI
          </Text>
        </YStack>

        {/* Buttons Section */}
        <ShowcaseSection title="Buttons" borderless={false}>
            <YStack gap="$4">
              {/* Button Variants */}
              <YStack gap="$2">
                <Caption fontWeight="600">Variants</Caption>
                <XStack gap="$3" flexWrap="wrap">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="tertiary">Tertiary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="primary" disabled>
                    Disabled
                  </Button>
                </XStack>
              </YStack>

              {/* Button Sizes */}
              <YStack gap="$2">
                <Caption fontWeight="600">Sizes</Caption>
                <XStack gap="$3" flexWrap="wrap" alignItems="center">
                  <Button variant="primary" size="small">
                    Small
                  </Button>
                  <Button variant="primary" size="medium">
                    Medium
                  </Button>
                  <Button variant="primary" size="large">
                    Large
                  </Button>
                </XStack>
              </YStack>

              {/* Button with Icons */}
              <YStack gap="$2">
                <Caption fontWeight="600">With Icons</Caption>
                <XStack gap="$3" flexWrap="wrap">
                  <Button variant="primary">
                    <XStack gap="$2" alignItems="center">
                      <Check size={16} />
                      <Body color="white">With Icon</Body>
                    </XStack>
                  </Button>
                  <Button variant="secondary">
                    <XStack gap="$2" alignItems="center">
                      <Body>Icon After</Body>
                      <ChevronDown size={16} />
                    </XStack>
                  </Button>
                </XStack>
              </YStack>

              {/* Full Width Button */}
              <YStack gap="$2">
                <Caption fontWeight="600">Full Width</Caption>
                <Button variant="primary" fullWidth>
                  Full Width Button
                </Button>
              </YStack>
            </YStack>
        </ShowcaseSection>

        {/* Form Controls Section */}
        <ShowcaseSection title="Form Controls" borderless={false}>
            <YStack gap="$4">
              {/* Text Input */}
              <YStack gap="$2">
                <Label>Text Input (Filled)</Label>
                <Input variant="filled" placeholder="Enter text..." fullWidth />
              </YStack>

              <YStack gap="$2">
                <Label>Text Input (Outlined)</Label>
                <Input variant="outlined" placeholder="Enter text..." fullWidth />
              </YStack>

              <YStack gap="$2">
                <Label>Text Input (Underline)</Label>
                <Input variant="underline" placeholder="Enter text..." fullWidth />
              </YStack>

              <YStack gap="$2">
                <Label>Text Input (Error State)</Label>
                <Input
                  variant="filled"
                  placeholder="Invalid input..."
                  error
                  fullWidth
                />

              </YStack>

              {/* Select Dropdown */}
              <YStack gap="$2">
                <Label>Select Dropdown</Label>
                <Select value="apple" defaultValue="apple">
                  <Select.Trigger 
                    width="100%" 
                    iconAfter={ChevronDown}
                    borderWidth={1}
                    borderColor="$border"
                    borderRadius="$3"
                    backgroundColor="$bgPrimary"
                    padding="$3"
                  >
                    <Select.Value placeholder="Select fruit" />
                  </Select.Trigger>
                  
                  <Adapt when="sm" platform="touch">
                    <TamaguiSheet modal dismissOnSnapToBottom>
                      <TamaguiSheet.Frame>
                        <TamaguiSheet.ScrollView>
                          <Adapt.Contents />
                        </TamaguiSheet.ScrollView>
                      </TamaguiSheet.Frame>
                      <TamaguiSheet.Overlay />
                    </TamaguiSheet>
                  </Adapt>

                  <Select.Content zIndex={200000} backgroundColor="$bgPrimary" borderRadius="$3" borderWidth={1} borderColor="$border">
                    <Select.ScrollUpButton alignItems="center" justifyContent="center" position="relative" width="100%" height="$3">
                      <YStack zIndex={10}>
                        <ChevronUp size={20} />
                      </YStack>
                    </Select.ScrollUpButton>

                    <Select.Viewport minWidth={200}>
                      <Select.Group>
                        <Select.Label>Fruits</Select.Label>
                        {[
                          { name: 'Apple', value: 'apple' },
                          { name: 'Pear', value: 'pear' },
                          { name: 'Blackberry', value: 'blackberry' },
                          { name: 'Peach', value: 'peach' },
                          { name: 'Apricot', value: 'apricot' },
                          { name: 'Melon', value: 'melon' },
                          { name: 'Honeydew', value: 'honeydew' },
                          { name: 'Starfruit', value: 'starfruit' },
                        ].map((item, i) => (
                          <Select.Item index={i} key={item.name} value={item.value} hoverStyle={{ backgroundColor: '$bgSecondary' }}>
                            <Select.ItemText>{item.name}</Select.ItemText>
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

              {/* Text Area */}
              <YStack gap="$2">
                <Label>Text Area</Label>
                <TextArea
                  variant="filled"
                  placeholder="Enter multiple lines..."
                  fullWidth
                />
              </YStack>

              {/* Switch */}
              <XStack gap="$3" alignItems="center" justifyContent="space-between">
                <Label>Toggle Switch</Label>
                <Switch
                  size="$4"
                  checked={checked}
                  onCheckedChange={setChecked}
                  backgroundColor={checked ? '$brand' : '$border'}
                >
                  <Switch.Thumb animation="bouncy" backgroundColor="white" />
                </Switch>
              </XStack>

              {/* Checkbox - Using Tamagui (we don't have styled version) */}
              <XStack gap="$3" alignItems="center">
                <Checkbox id="checkbox1" size="$4">
                  <Checkbox.Indicator>
                    <Check />
                  </Checkbox.Indicator>
                </Checkbox>
                <TamaguiLabel htmlFor="checkbox1" color="$textPrimary">
                  Accept terms and conditions
                </TamaguiLabel>
              </XStack>

              {/* Radio Group - Using Tamagui (we don't have styled version) */}
              <YStack gap="$2">
                <Label>Radio Options</Label>
                <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                  <YStack gap="$2">
                    <XStack gap="$3" alignItems="center">
                      <RadioGroup.Item value="option1" id="r1" size="$3">
                        <RadioGroup.Indicator />
                      </RadioGroup.Item>
                      <TamaguiLabel htmlFor="r1" color="$textPrimary">
                        Option 1
                      </TamaguiLabel>
                    </XStack>
                    <XStack gap="$3" alignItems="center">
                      <RadioGroup.Item value="option2" id="r2" size="$3">
                        <RadioGroup.Indicator />
                      </RadioGroup.Item>
                      <TamaguiLabel htmlFor="r2" color="$textPrimary">
                        Option 2
                      </TamaguiLabel>
                    </XStack>
                  </YStack>
                </RadioGroup>
              </YStack>

              {/* Slider - Using Tamagui (we don't have styled version) */}
              <YStack gap="$2">
                <Label>Slider: {sliderValue[0]}</Label>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  value={sliderValue}
                  onValueChange={setSliderValue}
                >
                  <Slider.Track backgroundColor="$border">
                    <Slider.TrackActive backgroundColor="$brand" />
                  </Slider.Track>
                  <Slider.Thumb index={0} circular backgroundColor="$brand" />
                </Slider>
              </YStack>

              {/* Toggle Group - Using Tamagui (we don't have styled version) */}
              <YStack gap="$2">
                <Label>Toggle Group</Label>
                <ToggleGroup
                  type="single"
                  value={toggleValue}
                  onValueChange={setToggleValue}
                  backgroundColor="$bgSecondary"
                  borderRadius="$2"
                >
                  <ToggleGroup.Item value="left">
                    <Body>Left</Body>
                  </ToggleGroup.Item>
                  <ToggleGroup.Item value="center">
                    <Body>Center</Body>
                  </ToggleGroup.Item>
                  <ToggleGroup.Item value="right">
                    <Body>Right</Body>
                  </ToggleGroup.Item>
                </ToggleGroup>
              </YStack>
            </YStack>
        </ShowcaseSection>

        {/* Cards Section */}
        <ShowcaseSection title="Cards" borderless={true}>
          <Text fontSize="$3" color="$color" opacity={0.6} marginBottom="$4">
             Different card variants for various contexts.
          </Text>
          <YStack gap="$3">
            <Card variant="default" padding="large">
              <YStack gap="$2">
                <Heading size="$4">Default Card</Heading>
                <Body color="$textSecondary">
                  This is a basic card with background and border
                </Body>
              </YStack>
            </Card>

            <Card variant="elevated" padding="large">
              <YStack gap="$2">
                <Heading size="$4">Elevated Card</Heading>
                <Body color="$textSecondary">
                  This card has a shadow for depth
                </Body>
              </YStack>
            </Card>

            <Card variant="branded" padding="large">
              <YStack gap="$2">
                <Heading size="$4">Branded Card</Heading>
                <Body color="$textSecondary">This card uses brand color accent</Body>
              </YStack>
            </Card>

            <Card variant="flat" padding="large">
              <YStack gap="$2">
                <Heading size="$4">Flat Card</Heading>
                <Body color="$textSecondary">
                  This card has no shadow or border
                </Body>
              </YStack>
            </Card>

            <Card variant="gradient" padding="large">
              <YStack gap="$2">
                <Heading size="$4">Gradient Card</Heading>
                <Body color="$textSecondary">This card has brand-themed background</Body>
              </YStack>
            </Card>
          </YStack>
        </ShowcaseSection>

        {/* Avatar Section */}
        <ShowcaseSection title="Avatars" borderless={false}>
            <YStack gap="$4">
              <YStack gap="$2">
                <Caption fontWeight="600">Sizes</Caption>
                <XStack gap="$3" alignItems="center">
                  <Avatar size="small">
                    <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                    <AvatarFallback><Text color="white">SM</Text></AvatarFallback>
                  </Avatar>
                  <Avatar size="medium">
                    <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                    <AvatarFallback><Text color="white">MD</Text></AvatarFallback>
                  </Avatar>
                  <Avatar size="large">
                    <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                    <AvatarFallback><Text color="white">LG</Text></AvatarFallback>
                  </Avatar>
                  <Avatar size="xlarge">
                    <AvatarImage src="https://i.pravatar.cc/150?img=4" />
                    <AvatarFallback><Text color="white">XL</Text></AvatarFallback>
                  </Avatar>
                </XStack>
              </YStack>

              <YStack gap="$2">
                <Caption fontWeight="600">With Fallback (No Image)</Caption>
                <XStack gap="$3" alignItems="center">
                  <Avatar size="medium">
                    <AvatarFallback><Text color="white">JD</Text></AvatarFallback>
                  </Avatar>
                  <Avatar size="medium">
                    <AvatarFallback><Text color="white">AB</Text></AvatarFallback>
                  </Avatar>
                  <Avatar size="medium">
                    <AvatarFallback><Text color="white">XY</Text></AvatarFallback>
                  </Avatar>
                </XStack>
              </YStack>
            </YStack>
        </ShowcaseSection>

        {/* Image Section */}
        <ShowcaseSection title="Images" borderless={false}>
            <YStack gap="$4">
              <YStack gap="$2">
                <Caption fontWeight="600">Border Radius Variants</Caption>
                <XStack gap="$3" flexWrap="wrap">
                  <Image
                    source={{ uri: 'https://picsum.photos/200/200?random=1' }}
                    width={100}
                    height={100}
                    rounded="none"
                  />
                  <Image
                    source={{ uri: 'https://picsum.photos/200/200?random=2' }}
                    width={100}
                    height={100}
                    rounded="small"
                  />
                  <Image
                    source={{ uri: 'https://picsum.photos/200/200?random=3' }}
                    width={100}
                    height={100}
                    rounded="medium"
                  />
                  <Image
                    source={{ uri: 'https://picsum.photos/200/200?random=4' }}
                    width={100}
                    height={100}
                    rounded="large"
                  />
                  <Image
                    source={{ uri: 'https://picsum.photos/200/200?random=5' }}
                    width={100}
                    height={100}
                    rounded="full"
                  />
                </XStack>
              </YStack>

              <YStack gap="$2">
                <Caption fontWeight="600">Aspect Ratios</Caption>
                <YStack gap="$3">
                  <Image
                    source={{ uri: 'https://picsum.photos/400/400?random=6' }}
                    width="100%"
                    aspectRatio="square"
                    rounded="medium"
                  />
                  <Image
                    source={{ uri: 'https://picsum.photos/800/450?random=7' }}
                    width="100%"
                    aspectRatio="video"
                    rounded="medium"
                  />
                </YStack>
              </YStack>
            </YStack>
        </ShowcaseSection>

        {/* ListItem Section */}
        <ShowcaseSection title="List Items" borderless={true}>
            <YStack backgroundColor="$bgSecondary" borderRadius="$3" borderWidth={1} borderColor="$border">
              <ListItem
                title="Profile Settings"
                subTitle="Manage your account"
                icon={<Body>👤</Body>}
                iconAfter={ChevronDown}
              />
              <YStack height={1} backgroundColor="$border" />
              <ListItem
                title="Notifications"
                subTitle="Push notifications and alerts"
                icon={<Body>🔔</Body>}
                iconAfter={ChevronDown}
              />
              <YStack height={1} backgroundColor="$border" />
              <ListItem
                title="Privacy"
                subTitle="Control your data"
                icon={<Body>🔒</Body>}
                iconAfter={ChevronDown}
              />
              <YStack height={1} backgroundColor="$border" />
              <ListItem
                title="Help & Support"
                subTitle="Get help when you need it"
                icon={<Body>❓</Body>}
                iconAfter={ChevronDown}
              />
            </YStack>
        </ShowcaseSection>

        {/* Tabs Section */}
        <ShowcaseSection title="Tabs" borderless={false}>
            <Tabs
              defaultValue="tab1"
              orientation="horizontal"
              flexDirection="column"
              value={tabValue}
              onValueChange={setTabValue}
              backgroundColor="$bgSecondary"
            >
              <Tabs.List backgroundColor="$bgSecondary" borderBottomWidth={1} borderBottomColor="$border">
                <Tabs.Tab value="tab1" flex={1}>
                  <Body>Tab 1</Body>
                </Tabs.Tab>
                <Tabs.Tab value="tab2" flex={1}>
                  <Body>Tab 2</Body>
                </Tabs.Tab>
                <Tabs.Tab value="tab3" flex={1}>
                  <Body>Tab 3</Body>
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Content value="tab1" padding="$4">
                <Body>Content for Tab 1.</Body>
              </Tabs.Content>
              <Tabs.Content value="tab2" padding="$4">
                <Body>Content for Tab 2.</Body>
              </Tabs.Content>
              <Tabs.Content value="tab3" padding="$4">
                <Body>Content for Tab 3.</Body>
              </Tabs.Content>
            </Tabs>
        </ShowcaseSection>

        {/* Progress Section */}
        <ShowcaseSection title="Progress Indicators" borderless={false}>
            <YStack gap="$4">
              <YStack gap="$2">
                <Caption fontWeight="600">Progress Bar (60%)</Caption>
                <Progress value={60} backgroundColor="$border">
                  <Progress.Indicator animation="bouncy" backgroundColor="$brand" />
                </Progress>
              </YStack>

              <YStack gap="$2">
                <Caption fontWeight="600">Progress Bar (30%)</Caption>
                <Progress value={30} backgroundColor="$border">
                  <Progress.Indicator backgroundColor="$brand" />
                </Progress>
              </YStack>

              <YStack gap="$2">
                <Caption fontWeight="600">Progress Bar (85%)</Caption>
                <Progress value={85} backgroundColor="$border">
                  <Progress.Indicator backgroundColor="$success" />
                </Progress>
              </YStack>
            </YStack>
        </ShowcaseSection>

        {/* Dialogs & Sheets */}
        <ShowcaseSection title="Overlays" borderless={false}>
            <XStack gap="$3" flexWrap="wrap">
              <Button variant="primary" onPress={() => setSheetOpen(true)}>
                Open Sheet
              </Button>
              <Button variant="secondary" onPress={() => setDialogOpen(true)}>
                Open Dialog
              </Button>
            </XStack>
        </ShowcaseSection>

        {/* Sheet Component */}
        <Sheet
          modal
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          snapPoints={[80]}
          position={0}
          dismissOnSnapToBottom
        >
          <Sheet.Overlay animation="lazy" backgroundColor="rgba(0,0,0,0.5)" />
          <Sheet.Frame padding="$4" backgroundColor="$bgPrimary">
            <Sheet.Handle backgroundColor="$border" />
            <YStack gap="$4">
              <Heading>Bottom Sheet</Heading>
              <Body>This is a modal bottom sheet component with smooth animations.</Body>
              <Button variant="primary" onPress={() => setSheetOpen(false)}>
                Close
              </Button>
            </YStack>
          </Sheet.Frame>
        </Sheet>

        {/* Dialog Component */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Dialog.Portal>
            <Dialog.Overlay animation="quick" backgroundColor="rgba(0,0,0,0.5)" />
            <Dialog.Content
              bordered
              elevate
              animation="quick"
              padding="$4"
              gap="$4"
              backgroundColor="$bgPrimary"
              borderColor="$border"
            >
              <Dialog.Title asChild>
                <Heading>Dialog Title</Heading>
              </Dialog.Title>
              <Dialog.Description asChild>
                <Body color="$textSecondary">
                  This is a dialog component with smooth animations and proper styling.
                </Body>
              </Dialog.Description>
              <XStack gap="$3" justifyContent="flex-end">
                <Button variant="secondary" onPress={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onPress={() => setDialogOpen(false)}>
                  Confirm
                </Button>
              </XStack>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>

        {/* Shapes Section */}
        <ShowcaseSection title="Shapes & Primitives" borderless={false}>
            <YStack gap="$3">
              <Caption fontWeight="600">Basic Shapes</Caption>
              <XStack gap="$3" flexWrap="wrap" alignItems="center">
                <Circle size={60} backgroundColor="$brand" />
                <Square size={60} backgroundColor="$brand" />
                <Circle size={40} backgroundColor="$success" />
                <Square size={40} backgroundColor="$info" borderRadius="$1" />
                <Circle size={30} backgroundColor="$warning" />
              </XStack>
            </YStack>
        </ShowcaseSection>

        {/* Bespoke Components Section */}
        <ShowcaseSection title="App Components" borderless={false}>
            <YStack gap="$6">
              
              <YStack gap="$2">
                <Caption fontWeight="600">Hero Card</Caption>
                <HeroCard
                  title="Featured Today"
                  description="Discover what's trending"
                  ctaText="Explore Now"
                  gradient
                />
              </YStack>

              <YStack gap="$2">
                <Caption fontWeight="600">Metric Cards</Caption>
                <XStack gap="$2">
                  <StatsCard
                    value="124"
                    label="Posts"
                    icon={<Body>📊</Body>}
                  />
                  <StatsCard
                    value="2.3k"
                    label="Likes"
                    icon={<Body>❤️</Body>}
                  />
                </XStack>
              </YStack>

              <YStack gap="$2">
                <Caption fontWeight="600">Review Card</Caption>
                <ReviewCard
                  title="Great Experience"
                  rating={5}
                  time="2h ago"
                  content="Amazing app with beautiful design."
                  likes={24}
                  comments={5}
                />
              </YStack>

              <YStack gap="$2">
                <Caption fontWeight="600">Settings Group</Caption>
                <SettingsGroup
                  items={[
                    { title: 'Privacy', subTitle: 'Control your data', icon: <Body>🔒</Body> },
                    { title: 'Notifications', subTitle: 'Manage alerts', icon: <Body>🔔</Body> },
                  ]}
                />
              </YStack>

               <YStack gap="$2">
                <Caption fontWeight="600">Profile Card</Caption>
                <XStack>
                  <ProfileCard
                    name="Sarah J."
                    status="Active now"
                    initials="SJ"
                    avatar="https://i.pravatar.cc/150?img=5"
                  />
                </XStack>
              </YStack>

            </YStack>
        </ShowcaseSection>

        {/* End Note */}
        <Card variant="gradient" padding="large">
          <YStack gap="$2" alignItems="center">
            <Heading textAlign="center" color="white">Design System Complete</Heading>
            <Body color="rgba(255,255,255,0.8)" textAlign="center">
              All components are built with Tamagui and use design tokens for consistency
            </Body>
          </YStack>
        </Card>
      </YStack>
    </ScrollView>
  );
}