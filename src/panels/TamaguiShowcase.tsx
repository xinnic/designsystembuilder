import React, { useState } from 'react';
import { TamaguiProvider, View, Text, Button, XStack, YStack, Card, Input, Switch, Avatar, ScrollView, Separator, H1, H2, H3, H4, Paragraph, SizableText, Circle, Square, Tabs, Sheet, Dialog, Progress, Slider, Label, TextArea, Checkbox, RadioGroup, Select, Adapt, SelectProps, ToggleGroup, AnimatePresence } from 'tamagui';
import { config } from '../tamagui.config';
import { useDesignSystem } from '../state/designSystem';
import { ChevronDown, Check } from 'lucide-react';

export default function TamaguiShowcase() {
  const { isDarkMode } = useDesignSystem();
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('apple');
  const [sliderValue, setSliderValue] = useState([50]);
  const [toggleValue, setToggleValue] = useState('center');
  const [tabValue, setTabValue] = useState('tab1');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <TamaguiProvider config={config} defaultTheme={isDarkMode ? 'dark' : 'light'}>
      <ScrollView
        backgroundColor="$background"
        flex={1}
        padding="$4"
      >
        <YStack gap="$6">
          {/* Typography Section */}
          <YStack gap="$4">
            <H1 fontFamily={`var(--font-display)`}>React Native Components</H1>
            <Separator />

            <YStack gap="$3">
              <H2 fontFamily={`var(--font-display)`}>Typography</H2>
              <Card bordered padded>
                <YStack gap="$2">
                  <H1 fontFamily={`var(--font-display)`}>Heading 1</H1>
                  <H2 fontFamily={`var(--font-display)`}>Heading 2</H2>
                  <H3 fontFamily={`var(--font-display)`}>Heading 3</H3>
                  <H4 fontFamily={`var(--font-display)`}>Heading 4</H4>
                  <Paragraph>Regular paragraph text using primary font</Paragraph>
                  <SizableText size="$2" theme="alt2">Small muted text</SizableText>
                </YStack>
              </Card>
            </YStack>
          </YStack>

          {/* Buttons Section */}
          <YStack gap="$3">
            <H2 fontFamily={`var(--font-display)`}>Buttons</H2>
            <Card bordered padded>
              <YStack gap="$3">
                <XStack gap="$3" flexWrap="wrap">
                  <Button theme="active" backgroundColor="$brand">Primary</Button>
                  <Button variant="outlined">Secondary</Button>
                  <Button chromeless>Tertiary</Button>
                  <Button disabled>Disabled</Button>
                </XStack>

                <XStack gap="$3" flexWrap="wrap">
                  <Button size="$2" backgroundColor="$brand">Small</Button>
                  <Button size="$3" backgroundColor="$brand">Medium</Button>
                  <Button size="$4" backgroundColor="$brand">Large</Button>
                  <Button size="$5" backgroundColor="$brand">X-Large</Button>
                </XStack>

                <XStack gap="$3" flexWrap="wrap">
                  <Button circular size="$4" backgroundColor="$brand">C</Button>
                  <Button icon={Check} backgroundColor="$brand">With Icon</Button>
                  <Button iconAfter={ChevronDown} backgroundColor="$brand">Icon After</Button>
                </XStack>
              </YStack>
            </Card>
          </YStack>

          {/* Form Controls Section */}
          <YStack gap="$3">
            <H2 fontFamily={`var(--font-display)`}>Form Controls</H2>
            <Card bordered padded>
              <YStack gap="$4">
                {/* Inputs */}
                <YStack gap="$2">
                  <Label htmlFor="input1">Text Input</Label>
                  <Input id="input1" placeholder="Enter text..." />
                </YStack>

                <YStack gap="$2">
                  <Label htmlFor="textarea1">Text Area</Label>
                  <TextArea id="textarea1" placeholder="Enter multiple lines..." rows={4} />
                </YStack>

                {/* Switch */}
                <XStack gap="$3" alignItems="center">
                  <Label>Toggle Switch</Label>
                  <Switch size="$3" checked={checked} onCheckedChange={setChecked}>
                    <Switch.Thumb animation="bouncy" />
                  </Switch>
                </XStack>

                {/* Checkbox */}
                <XStack gap="$3" alignItems="center">
                  <Checkbox id="checkbox1" size="$4">
                    <Checkbox.Indicator>
                      <Check />
                    </Checkbox.Indicator>
                  </Checkbox>
                  <Label htmlFor="checkbox1">Accept terms</Label>
                </XStack>

                {/* Radio Group */}
                <YStack gap="$2">
                  <Label>Radio Options</Label>
                  <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                    <YStack gap="$2">
                      <XStack gap="$3" alignItems="center">
                        <RadioGroup.Item value="option1" id="r1" size="$3">
                          <RadioGroup.Indicator />
                        </RadioGroup.Item>
                        <Label htmlFor="r1">Option 1</Label>
                      </XStack>
                      <XStack gap="$3" alignItems="center">
                        <RadioGroup.Item value="option2" id="r2" size="$3">
                          <RadioGroup.Indicator />
                        </RadioGroup.Item>
                        <Label htmlFor="r2">Option 2</Label>
                      </XStack>
                    </YStack>
                  </RadioGroup>
                </YStack>

                {/* Slider */}
                <YStack gap="$2">
                  <Label>Slider: {sliderValue[0]}</Label>
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    value={sliderValue}
                    onValueChange={setSliderValue}
                  >
                    <Slider.Track>
                      <Slider.TrackActive />
                    </Slider.Track>
                    <Slider.Thumb index={0} circular />
                  </Slider>
                </YStack>

                {/* Toggle Group */}
                <YStack gap="$2">
                  <Label>Toggle Group</Label>
                  <ToggleGroup
                    type="single"
                    value={toggleValue}
                    onValueChange={setToggleValue}
                  >
                    <ToggleGroup.Item value="left">
                      <Text>Left</Text>
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value="center">
                      <Text>Center</Text>
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value="right">
                      <Text>Right</Text>
                    </ToggleGroup.Item>
                  </ToggleGroup>
                </YStack>
              </YStack>
            </Card>
          </YStack>

          {/* Cards Section */}
          <YStack gap="$3">
            <H2 fontFamily={`var(--font-display)`}>Cards</H2>
            <YStack gap="$3">
              <Card elevate size="$4" bordered>
                <Card.Header padded>
                  <H3>Card with Header</H3>
                </Card.Header>
                <Card.Footer padded>
                  <Paragraph>This is a card with elevation and border</Paragraph>
                </Card.Footer>
              </Card>

              <Card backgroundColor="$brand" pressStyle={{ scale: 0.98 }}>
                <Card.Header padded>
                  <H3 color="white">Branded Card</H3>
                </Card.Header>
                <Card.Footer padded>
                  <Paragraph color="white">This card uses brand colors</Paragraph>
                </Card.Footer>
              </Card>
            </YStack>
          </YStack>

          {/* Tabs Section */}
          <YStack gap="$3">
            <H2 fontFamily={`var(--font-display)`}>Tabs</H2>
            <Card bordered>
              <Tabs
                defaultValue="tab1"
                orientation="horizontal"
                flexDirection="column"
                value={tabValue}
                onValueChange={setTabValue}
              >
                <Tabs.List>
                  <Tabs.Tab value="tab1">
                    <SizableText>Tab 1</SizableText>
                  </Tabs.Tab>
                  <Tabs.Tab value="tab2">
                    <SizableText>Tab 2</SizableText>
                  </Tabs.Tab>
                  <Tabs.Tab value="tab3">
                    <SizableText>Tab 3</SizableText>
                  </Tabs.Tab>
                </Tabs.List>

                <Separator />

                <Tabs.Content value="tab1" padding="$4">
                  <Paragraph>Content for Tab 1</Paragraph>
                </Tabs.Content>
                <Tabs.Content value="tab2" padding="$4">
                  <Paragraph>Content for Tab 2</Paragraph>
                </Tabs.Content>
                <Tabs.Content value="tab3" padding="$4">
                  <Paragraph>Content for Tab 3</Paragraph>
                </Tabs.Content>
              </Tabs>
            </Card>
          </YStack>

          {/* Progress Section */}
          <YStack gap="$3">
            <H2 fontFamily={`var(--font-display)`}>Progress Indicators</H2>
            <Card bordered padded>
              <YStack gap="$3">
                <Progress value={60}>
                  <Progress.Indicator animation="bouncy" />
                </Progress>

                <Progress value={30} backgroundColor="$backgroundStrong">
                  <Progress.Indicator backgroundColor="$brand" />
                </Progress>
              </YStack>
            </Card>
          </YStack>

          {/* Dialogs & Sheets */}
          <YStack gap="$3">
            <H2 fontFamily={`var(--font-display)`}>Overlays</H2>
            <Card bordered padded>
              <XStack gap="$3">
                <Button onPress={() => setSheetOpen(true)}>Open Sheet</Button>
                <Button onPress={() => setDialogOpen(true)}>Open Dialog</Button>
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
            <Sheet.Overlay animation="lazy" />
            <Sheet.Frame padding="$4">
              <Sheet.Handle />
              <YStack gap="$4">
                <H2>Bottom Sheet</H2>
                <Paragraph>This is a modal bottom sheet component</Paragraph>
                <Button onPress={() => setSheetOpen(false)}>Close</Button>
              </YStack>
            </Sheet.Frame>
          </Sheet>

          {/* Dialog Component */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Portal>
              <Dialog.Overlay animation="quick" />
              <Dialog.Content
                bordered
                elevate
                animation="quick"
                padding="$4"
                gap="$4"
              >
                <Dialog.Title>Dialog Title</Dialog.Title>
                <Dialog.Description>
                  This is a dialog component with animation
                </Dialog.Description>
                <XStack gap="$3" justifyContent="flex-end">
                  <Button variant="outlined" onPress={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button backgroundColor="$brand" onPress={() => setDialogOpen(false)}>
                    Confirm
                  </Button>
                </XStack>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog>

          {/* Shapes Section */}
          <YStack gap="$3">
            <H2 fontFamily={`var(--font-display)`}>Shapes & Avatars</H2>
            <Card bordered padded>
              <XStack gap="$3" flexWrap="wrap" alignItems="center">
                <Circle size="$6" backgroundColor="$brand" />
                <Square size="$6" backgroundColor="$brand" />
                <Avatar circular size="$6">
                  <Avatar.Image source={{ uri: 'https://placekitten.com/200/200' }} />
                  <Avatar.Fallback backgroundColor="$brand" />
                </Avatar>
                <Avatar size="$4">
                  <Avatar.Fallback backgroundColor="$backgroundStrong">
                    <Text>JD</Text>
                  </Avatar.Fallback>
                </Avatar>
              </XStack>
            </Card>
          </YStack>
        </YStack>
      </ScrollView>
    </TamaguiProvider>
  );
}