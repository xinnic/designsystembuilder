import React, { useState } from 'react';
import {
  TamaguiProvider,
  XStack,
  YStack,
  ScrollView,
  Circle,
  Square,
} from 'tamagui';
import { config } from '../tamagui.config';
import { useDesignSystem, useTokenCSS } from '../state/designSystem';
import { ChevronDown, Check, User, Settings, Bell } from 'lucide-react';

// Import our design system components
import {
  Button,
  Card,
  Input,
  TextArea,
  Switch,
  Display,
  H1,
  H2,
  H3,
  Body,
  Caption,
  Label,
  // New styled components
  Separator,
  Avatar,
  AvatarImage,
  AvatarFallback,
  ListItem,
  ListItemTitle,
  ListItemSubtitle,
  Slider,
  SliderTrack,
  SliderTrackActive,
  SliderThumb,
  RadioGroup,
  RadioGroupItem,
  RadioGroupIndicator,
  RadioGroupItemWithLabel,
  ToggleGroup,
  ToggleGroupItem,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionChevron,
  Sheet,
  SheetOverlay,
  SheetFrame,
  SheetHandle,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Toast,
  ToastTitle,
  ToastDescription,
  Spinner,
} from '../design-system/components';

export default function TamaguiShowcase() {
  // Initialize token CSS binding to ensure theme updates
  useTokenCSS();

  const { isDarkMode, selectedPrimaryFont } = useDesignSystem();
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [sliderValue, setSliderValue] = useState([50]);
  const [toggleValue, setToggleValue] = useState('center');
  const [tabValue, setTabValue] = useState('tab1');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <TamaguiProvider config={config} defaultTheme={isDarkMode ? 'dark' : 'light'}>
      <ScrollView
        className={selectedPrimaryFont}
        backgroundColor="$bgPrimary"
        flex={1}
        padding="$4"
      >
        <YStack gap="$6">
          {/* Typography Section */}
          <YStack gap="$4">
            <H1>React Native Components</H1>
            <Separator borderColor="$border" />

            <YStack gap="$3">
              <H2>Typography</H2>
              <Card variant="default" padding="large">
                <YStack gap="$3">
                  <Display>Display Text</Display>
                  <H1>Heading 1</H1>
                  <H2>Heading 2</H2>
                  <H3>Heading 3</H3>
                  <Body>Regular body text using primary font family</Body>
                  <Caption color="$textSecondary">
                    Small caption text with secondary color
                  </Caption>
                  <Label>Form Label Text</Label>
                </YStack>
              </Card>
            </YStack>
          </YStack>

          {/* Buttons Section */}
          <YStack gap="$3">
            <H2>Buttons</H2>
            <Card variant="default" padding="large">
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
            </Card>
          </YStack>

          {/* Form Controls Section */}
          <YStack gap="$3">
            <H2>Form Controls</H2>
            <Card variant="default" padding="large">
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

                {/* Radio Group - Styled */}
                <YStack gap="$2">
                  <Label>Radio Options</Label>
                  <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                    <RadioGroupItemWithLabel value="option1" id="r1" label="Option 1" />
                    <RadioGroupItemWithLabel value="option2" id="r2" label="Option 2" />
                    <RadioGroupItemWithLabel value="option3" id="r3" label="Option 3" />
                  </RadioGroup>
                </YStack>

                {/* Slider - Styled */}
                <YStack gap="$2">
                  <Label>Slider: {sliderValue[0]}</Label>
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    size="medium"
                  >
                    <SliderTrack>
                      <SliderTrackActive />
                    </SliderTrack>
                    <SliderThumb index={0} circular />
                  </Slider>
                </YStack>

                {/* Toggle Group - Styled */}
                <YStack gap="$2">
                  <Label>Toggle Group</Label>
                  <ToggleGroup
                    type="single"
                    value={toggleValue}
                    onValueChange={setToggleValue}
                    orientation="horizontal"
                  >
                    <ToggleGroupItem value="left" active={toggleValue === 'left'}>
                      <Body>Left</Body>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="center" active={toggleValue === 'center'}>
                      <Body>Center</Body>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="right" active={toggleValue === 'right'}>
                      <Body>Right</Body>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </YStack>
              </YStack>
            </Card>
          </YStack>

          {/* Cards Section */}
          <YStack gap="$3">
            <H2>Cards</H2>
            <YStack gap="$3">
              <Card variant="default" padding="large">
                <YStack gap="$2">
                  <H3>Default Card</H3>
                  <Body color="$textSecondary">
                    This is a basic card with background and border
                  </Body>
                </YStack>
              </Card>

              <Card variant="elevated" padding="large">
                <YStack gap="$2">
                  <H3>Elevated Card</H3>
                  <Body color="$textSecondary">
                    This card has a shadow for depth
                  </Body>
                </YStack>
              </Card>

              <Card variant="branded" padding="large">
                <YStack gap="$2">
                  <H3>Branded Card</H3>
                  <Body color="$textSecondary">This card uses brand color accent</Body>
                </YStack>
              </Card>

              <Card variant="flat" padding="large">
                <YStack gap="$2">
                  <H3>Flat Card</H3>
                  <Body color="$textSecondary">
                    This card has no shadow or border
                  </Body>
                </YStack>
              </Card>

              <Card variant="gradient" padding="large">
                <YStack gap="$2">
                  <H3>Gradient Card</H3>
                  <Body color="$textSecondary">This card has brand-themed background</Body>
                </YStack>
              </Card>
            </YStack>
          </YStack>

          {/* Tabs Section */}
          <YStack gap="$3">
            <H2>Tabs</H2>
            <Card variant="default" padding="none">
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
                  <Body>Content for Tab 1. This tab demonstrates the first panel.</Body>
                </Tabs.Content>
                <Tabs.Content value="tab2" padding="$4">
                  <Body>Content for Tab 2. This tab demonstrates the second panel.</Body>
                </Tabs.Content>
                <Tabs.Content value="tab3" padding="$4">
                  <Body>Content for Tab 3. This tab demonstrates the third panel.</Body>
                </Tabs.Content>
              </Tabs>
            </Card>
          </YStack>

          {/* Progress Section */}
          <YStack gap="$3">
            <H2>Progress Indicators</H2>
            <Card variant="default" padding="large">
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
            </Card>
          </YStack>

          {/* Dialogs & Sheets */}
          <YStack gap="$3">
            <H2>Overlays</H2>
            <Card variant="default" padding="large">
              <XStack gap="$3" flexWrap="wrap">
                <Button variant="primary" onPress={() => setSheetOpen(true)}>
                  Open Sheet
                </Button>
                <Button variant="secondary" onPress={() => setDialogOpen(true)}>
                  Open Dialog
                </Button>
              </XStack>
            </Card>
          </YStack>

          {/* Sheet Component - Styled */}
          <Sheet
            modal
            open={sheetOpen}
            onOpenChange={setSheetOpen}
            snapPoints={[80]}
            position={0}
            dismissOnSnapToBottom
          >
            <SheetOverlay />
            <SheetFrame>
              <SheetHandle />
              <YStack gap="$4" padding="$4">
                <H2>Bottom Sheet</H2>
                <Body>This is a styled bottom sheet component with smooth animations and design tokens.</Body>
                <Button variant="primary" onPress={() => setSheetOpen(false)}>
                  Close
                </Button>
              </YStack>
            </SheetFrame>
          </Sheet>

          {/* Avatar Section */}
          <YStack gap="$3">
            <H2>Avatars</H2>
            <Card variant="default" padding="large">
              <YStack gap="$4">
                <YStack gap="$2">
                  <Caption fontWeight="600">Sizes</Caption>
                  <XStack gap="$3" alignItems="center">
                    <Avatar size="small">
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <Avatar size="medium">
                      <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                    <Avatar size="large">
                      <AvatarFallback>L</AvatarFallback>
                    </Avatar>
                    <Avatar size="xlarge">
                      <AvatarFallback>XL</AvatarFallback>
                    </Avatar>
                  </XStack>
                </YStack>

                <YStack gap="$2">
                  <Caption fontWeight="600">With Initials</Caption>
                  <XStack gap="$3" alignItems="center">
                    <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
                    <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
                    <Avatar><AvatarFallback>MK</AvatarFallback></Avatar>
                  </XStack>
                </YStack>
              </YStack>
            </Card>
          </YStack>

          {/* List Items Section */}
          <YStack gap="$3">
            <H2>List Items</H2>
            <Card variant="default" padding="none">
              <YStack>
                <ListItem size="medium">
                  <XStack gap="$3" alignItems="center" flex={1}>
                    <User size={20} color="rgb(var(--color-text-secondary))" />
                    <YStack flex={1}>
                      <ListItemTitle>Profile Settings</ListItemTitle>
                      <ListItemSubtitle>Manage your account</ListItemSubtitle>
                    </YStack>
                    <ChevronDown size={16} color="rgb(var(--color-text-secondary))" />
                  </XStack>
                </ListItem>
                <Separator />
                <ListItem size="medium">
                  <XStack gap="$3" alignItems="center" flex={1}>
                    <Bell size={20} color="rgb(var(--color-text-secondary))" />
                    <YStack flex={1}>
                      <ListItemTitle>Notifications</ListItemTitle>
                      <ListItemSubtitle>Push, email, SMS</ListItemSubtitle>
                    </YStack>
                    <ChevronDown size={16} color="rgb(var(--color-text-secondary))" />
                  </XStack>
                </ListItem>
                <Separator />
                <ListItem size="medium">
                  <XStack gap="$3" alignItems="center" flex={1}>
                    <Settings size={20} color="rgb(var(--color-text-secondary))" />
                    <YStack flex={1}>
                      <ListItemTitle>Preferences</ListItemTitle>
                      <ListItemSubtitle>Customize experience</ListItemSubtitle>
                    </YStack>
                    <ChevronDown size={16} color="rgb(var(--color-text-secondary))" />
                  </XStack>
                </ListItem>
              </YStack>
            </Card>
          </YStack>

          {/* Accordion Section */}
          <YStack gap="$3">
            <H2>Accordion</H2>
            <Accordion type="single" collapsible>
              <AccordionItem value="item1">
                <AccordionTrigger>
                  <XStack justifyContent="space-between" flex={1} alignItems="center">
                    <Body fontWeight="600">What is Tamagui?</Body>
                    <AccordionChevron />
                  </XStack>
                </AccordionTrigger>
                <AccordionContent>
                  <Body color="$textSecondary">
                    Tamagui is a universal UI kit for React Native and Web with an optimizing compiler.
                  </Body>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item2">
                <AccordionTrigger>
                  <XStack justifyContent="space-between" flex={1} alignItems="center">
                    <Body fontWeight="600">How does it work?</Body>
                    <AccordionChevron />
                  </XStack>
                </AccordionTrigger>
                <AccordionContent>
                  <Body color="$textSecondary">
                    It uses a styling system that works across platforms with design tokens and variants.
                  </Body>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </YStack>

          {/* Popover & Tooltip Section */}
          <YStack gap="$3">
            <H2>Popovers & Tooltips</H2>
            <Card variant="default" padding="large">
              <XStack gap="$3" flexWrap="wrap">
                <Popover>
                  <PopoverTrigger>
                    <Button variant="secondary">Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <YStack gap="$2">
                      <H3 fontSize="$3">Quick Actions</H3>
                      <Button variant="ghost" size="small">Edit</Button>
                      <Button variant="ghost" size="small">Share</Button>
                      <Button variant="ghost" size="small">Delete</Button>
                    </YStack>
                  </PopoverContent>
                </Popover>

                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="secondary">Hover for Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Caption>This is a helpful tooltip!</Caption>
                  </TooltipContent>
                </Tooltip>
              </XStack>
            </Card>
          </YStack>

          {/* Loading States Section */}
          <YStack gap="$3">
            <H2>Loading States</H2>
            <Card variant="default" padding="large">
              <YStack gap="$4">
                <YStack gap="$2">
                  <Caption fontWeight="600">Spinner Sizes</Caption>
                  <XStack gap="$4" alignItems="center">
                    <Spinner size="small" />
                    <Spinner size="medium" />
                    <Spinner size="large" />
                  </XStack>
                </YStack>
              </YStack>
            </Card>
          </YStack>

          {/* Shapes Section */}
          <YStack gap="$3">
            <H2>Shapes & Primitives</H2>
            <Card variant="default" padding="large">
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
            </Card>
          </YStack>

          {/* End Note */}
          <Card variant="gradient" padding="large">
            <YStack gap="$2" alignItems="center">
              <H2 textAlign="center">Design System Complete</H2>
              <Body color="$textSecondary" textAlign="center">
                All components are built with Tamagui and use design tokens for consistency
              </Body>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </TamaguiProvider>
  );
}