import React, { useState } from 'react';
import {
  TamaguiProvider,
  XStack,
  YStack,
  ScrollView,
  Separator,
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
} from 'tamagui';
import { config } from '../tamagui.config';
import { useDesignSystem } from '../state/designSystem';
import { ChevronDown, Check } from 'lucide-react';

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
} from '@/design-system/components';

export default function TamaguiShowcase() {
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
                  <Switch size="medium" checked={checked} onCheckedChange={setChecked}>
                    <Switch.Thumb animation="bouncy" />
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
                <H2>Bottom Sheet</H2>
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
                  <H3>Dialog Title</H3>
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