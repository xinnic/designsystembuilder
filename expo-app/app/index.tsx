import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useDesignSystem } from '../src/state/designSystem';
import {
  // Opus components (pattern-setters)
  Button,
  Input,
  Select,
  Tabs,
  Dialog,
  // Sonnet components (pattern-followers)
  Card,
  Heading,
  Body,
  Caption,
  Label,
  HStack,
  VStack,
  Spacer,
  Divider,
  Switch,
  Checkbox,
  Avatar,
  AvatarGroup,
  Progress,
  ListItem,
  List,
  Image,
  // Bespoke components
  BottomSheet,
  Chip,
  Badge,
  BadgeWrapper,
  Toast,
  ToastIcons,
  ActionSheet,
} from '../src/components/ui';

export default function HomeScreen() {
  const { isDarkMode, setDarkMode } = useDesignSystem();
  const [selectValue, setSelectValue] = useState('');
  const [tabValue, setTabValue] = useState('home');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'default' | 'fullscreen' | 'bottom-sheet'>('default');
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  return (
    <ScrollView className="flex-1 bg-surface">
      <VStack gap="xl" className="p-6 max-w-lg mx-auto w-full">
        {/* Header */}
        <VStack gap="xs" className="pt-8">
          <Heading size="3xl">Component Showcase</Heading>
          <Body color="on-surface-secondary">
            NativeWind + CVA • 14 components (5 Opus + 9 Sonnet)
          </Body>
        </VStack>

        {/* ─── Text & Typography ─── */}
        <Card header="Text & Typography" dividers>
          <VStack gap="md">
            <Heading size="2xl">Heading 2xl</Heading>
            <Heading size="xl">Heading xl</Heading>
            <Body>This is body text with default styling</Body>
            <Caption>This is caption text with secondary color</Caption>
            <Label>This is label text with medium weight</Label>
          </VStack>
        </Card>

        {/* ─── Button ─── */}
        <Card header="Button" dividers>
          <VStack gap="md">
            <VStack gap="sm">
              <Label size="xs">Variants</Label>
              <HStack gap="sm" wrap>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline">Outline</Button>
              </HStack>
            </VStack>

            <VStack gap="sm">
              <Label size="xs">Sizes</Label>
              <HStack gap="sm" align="end">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </HStack>
            </VStack>

            <VStack gap="sm">
              <Label size="xs">States</Label>
              <HStack gap="sm" wrap>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button fullWidth>Full Width</Button>
              </HStack>
            </VStack>
          </VStack>
        </Card>

        {/* ─── Input ─── */}
        <Card header="Input" dividers>
          <VStack gap="md">
            <Input label="Email" placeholder="you@example.com" helperText="We won't share your email" />
            <Input label="Password" placeholder="Enter password" secureTextEntry />
            <Input label="Username" placeholder="taken_name" error="This username is already taken" />
            <Input label="Bio" placeholder="Tell us about yourself" variant="filled" />
            <Input label="Disabled" placeholder="Can't edit this" disabled />
            <HStack gap="md">
              <Input label="Small" placeholder="sm" size="sm" className="flex-1" />
              <Input label="Large" placeholder="lg" size="lg" className="flex-1" />
            </HStack>
          </VStack>
        </Card>

        {/* ─── Select ─── */}
        <Card header="Select" dividers>
          <VStack gap="md">
            <Select
              label="Country"
              placeholder="Choose a country"
              options={[
                { label: 'United States', value: 'us' },
                { label: 'United Kingdom', value: 'uk' },
                { label: 'Canada', value: 'ca' },
                { label: 'Australia', value: 'au' },
                { label: 'Germany', value: 'de' },
              ]}
              value={selectValue}
              onValueChange={setSelectValue}
            />
            <Select
              label="Disabled"
              placeholder="Can't select"
              options={[]}
              disabled
            />
          </VStack>
        </Card>

        {/* ─── Switch & Checkbox ─── */}
        <Card header="Switch & Checkbox" dividers>
          <VStack gap="md">
            <Switch
              label="Enable notifications"
              helperText="Get updates about your account"
              value={switchValue}
              onValueChange={setSwitchValue}
            />
            <Checkbox
              label="I agree to the terms and conditions"
              helperText="You must accept to continue"
              checked={checkboxValue}
              onCheckedChange={setCheckboxValue}
            />
          </VStack>
        </Card>

        {/* ─── Tabs ─── */}
        <Card header="Tabs" dividers>
          <VStack gap="md">
            <VStack gap="xs">
              <Label size="xs">Underline</Label>
              <Tabs
                items={[
                  { label: 'Home', value: 'home' },
                  { label: 'Search', value: 'search' },
                  { label: 'Profile', value: 'profile' },
                ]}
                value={tabValue}
                onValueChange={setTabValue}
                variant="underline"
                fullWidth
              />
            </VStack>

            <VStack gap="xs">
              <Label size="xs">Pill</Label>
              <Tabs
                items={[
                  { label: 'Home', value: 'home' },
                  { label: 'Search', value: 'search' },
                  { label: 'Profile', value: 'profile' },
                ]}
                value={tabValue}
                onValueChange={setTabValue}
                variant="pill"
              />
            </VStack>

            <VStack gap="xs">
              <Label size="xs">Segmented</Label>
              <Tabs
                items={[
                  { label: 'Home', value: 'home' },
                  { label: 'Search', value: 'search' },
                  { label: 'Profile', value: 'profile' },
                ]}
                value={tabValue}
                onValueChange={setTabValue}
                variant="segmented"
                fullWidth
              />
            </VStack>
          </VStack>
        </Card>

        {/* ─── Avatar ─── */}
        <Card header="Avatar" dividers>
          <VStack gap="md">
            <HStack gap="md" align="center">
              <Avatar size="xs" initials="XS" />
              <Avatar size="sm" initials="SM" />
              <Avatar size="md" initials="MD" />
              <Avatar size="lg" initials="LG" />
              <Avatar size="xl" initials="XL" />
              <Avatar size="2xl" initials="2X" />
            </HStack>
            <Divider />
            <VStack gap="sm">
              <Label size="xs">With Status</Label>
              <HStack gap="md" align="center">
                <Avatar initials="ON" status="online" />
                <Avatar initials="OF" status="offline" />
                <Avatar initials="BY" status="busy" />
              </HStack>
            </VStack>
            <Divider />
            <VStack gap="sm">
              <Label size="xs">Avatar Group</Label>
              <AvatarGroup max={3}>
                <Avatar initials="AB" />
                <Avatar initials="CD" />
                <Avatar initials="EF" />
                <Avatar initials="GH" />
                <Avatar initials="IJ" />
              </AvatarGroup>
            </VStack>
          </VStack>
        </Card>

        {/* ─── Progress ─── */}
        <Card header="Progress" dividers>
          <VStack gap="md">
            <Progress value={25} label="Upload progress" showPercentage />
            <Progress value={50} color="success" />
            <Progress value={75} color="warning" size="lg" />
            <Progress value={100} color="error" />
            <Progress indeterminate label="Loading..." />
          </VStack>
        </Card>

        {/* ─── List ─── */}
        <Card header="List" padding="none">
          <List dividers>
            <ListItem
              title="Inbox"
              subtitle="12 new messages"
              leading={<Body>📥</Body>}
              trailing={<Caption>2m</Caption>}
              onPress={() => {}}
            />
            <ListItem
              title="Starred"
              subtitle="Important items"
              leading={<Body>⭐</Body>}
              trailing={<Caption>5m</Caption>}
              onPress={() => {}}
            />
            <ListItem
              title="Drafts"
              subtitle="3 unsent drafts"
              leading={<Body>📝</Body>}
              trailing={<Caption>1h</Caption>}
              selected
              onPress={() => {}}
            />
            <ListItem
              title="Spam"
              subtitle="Keep your inbox clean"
              leading={<Body>🗑️</Body>}
              disabled
            />
          </List>
        </Card>

        {/* ─── Image ─── */}
        <Card header="Image" dividers>
          <VStack gap="md">
            <Image
              src="https://picsum.photos/400/300"
              alt="Random landscape"
              aspectRatio="video"
              rounded="lg"
            />
            <HStack gap="md">
              <Image
                src="https://picsum.photos/200/200"
                alt="Square image"
                aspectRatio="square"
                rounded="full"
                className="flex-1"
              />
              <Image
                src="https://invalid-url.example/image.jpg"
                alt="Error example"
                aspectRatio="square"
                rounded="md"
                className="flex-1"
              />
            </HStack>
          </VStack>
        </Card>

        {/* ─── Dialog ─── */}
        <Card header="Dialog" dividers>
          <HStack gap="sm" wrap>
            <Button
              variant="outline"
              onPress={() => { setDialogMode('default'); setDialogOpen(true); }}
            >
              Default
            </Button>
            <Button
              variant="outline"
              onPress={() => { setDialogMode('bottom-sheet'); setDialogOpen(true); }}
            >
              Bottom Sheet
            </Button>
            <Button
              variant="outline"
              onPress={() => { setDialogMode('fullscreen'); setDialogOpen(true); }}
            >
              Fullscreen
            </Button>
          </HStack>
        </Card>

        <Dialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          mode={dialogMode}
          title="Example Dialog"
          description={`This is a ${dialogMode} dialog with title, description, content, and footer.`}
          footer={
            <>
              <Button variant="ghost" onPress={() => setDialogOpen(false)}>Cancel</Button>
              <Button onPress={() => setDialogOpen(false)}>Confirm</Button>
            </>
          }
        >
          <VStack gap="md" className="py-4">
            <Body>
              This is the dialog content area. It scrolls if the content is longer
              than the available space.
            </Body>
            <Input label="Your feedback" placeholder="Type something..." />
          </VStack>
        </Dialog>

        {/* ─── Chip ─── */}
        <Card header="Chip" dividers>
          <VStack gap="md">
            <VStack gap="sm">
              <Label size="xs">Filled Variants</Label>
              <HStack gap="sm" wrap>
                <Chip variant="filled" color="default">Default</Chip>
                <Chip variant="filled" color="brand">Brand</Chip>
                <Chip variant="filled" color="success">Success</Chip>
                <Chip variant="filled" color="warning">Warning</Chip>
                <Chip variant="filled" color="error">Error</Chip>
              </HStack>
            </VStack>

            <VStack gap="sm">
              <Label size="xs">Outlined & Light</Label>
              <HStack gap="sm" wrap>
                <Chip variant="outlined" color="brand">Outlined</Chip>
                <Chip variant="light" color="brand">Light</Chip>
                <Chip variant="filled" color="brand" onDelete={() => {}}>With Delete</Chip>
                <Chip variant="outlined" color="success" onPress={() => alert('Pressed!')}>
                  Pressable
                </Chip>
              </HStack>
            </VStack>
          </VStack>
        </Card>

        {/* ─── Badge ─── */}
        <Card header="Badge" dividers>
          <VStack gap="md">
            <VStack gap="sm">
              <Label size="xs">Standalone</Label>
              <HStack gap="md" align="center">
                <Badge variant="dot" color="brand" />
                <Badge variant="numeric" content={5} color="brand" />
                <Badge variant="numeric" content={99} color="error" />
                <Badge variant="numeric" content={150} max={99} color="success" />
              </HStack>
            </VStack>

            <VStack gap="sm">
              <Label size="xs">Overlay on Icons</Label>
              <HStack gap="lg" align="center">
                <BadgeWrapper badge={<Badge variant="dot" color="error" overlay />}>
                  <Body className="text-3xl">🔔</Body>
                </BadgeWrapper>
                <BadgeWrapper badge={<Badge variant="numeric" content={3} color="brand" overlay />}>
                  <Body className="text-3xl">💬</Body>
                </BadgeWrapper>
                <BadgeWrapper badge={<Badge variant="numeric" content={12} color="success" overlay bordered />}>
                  <Avatar initials="AB" size="lg" />
                </BadgeWrapper>
              </HStack>
            </VStack>
          </VStack>
        </Card>

        {/* ─── BottomSheet & ActionSheet ─── */}
        <Card header="BottomSheet & ActionSheet" dividers>
          <HStack gap="sm" wrap>
            <Button variant="outline" onPress={() => setBottomSheetOpen(true)}>
              Open BottomSheet
            </Button>
            <Button variant="outline" onPress={() => setActionSheetOpen(true)}>
              Open ActionSheet
            </Button>
            <Button variant="outline" onPress={() => setToastVisible(true)}>
              Show Toast
            </Button>
          </HStack>
        </Card>

        <BottomSheet
          open={bottomSheetOpen}
          onOpenChange={setBottomSheetOpen}
          title="Example BottomSheet"
          description="This is a bottom sheet with auto height"
          snapPoint="auto"
          footer={
            <>
              <Button variant="ghost" onPress={() => setBottomSheetOpen(false)}>
                Cancel
              </Button>
              <Button onPress={() => setBottomSheetOpen(false)}>Confirm</Button>
            </>
          }
        >
          <VStack gap="md" className="py-4">
            <Body>BottomSheet slides up from the bottom with a handle bar for drag affordance.</Body>
            <Input label="Name" placeholder="Enter your name" />
            <Switch label="Enable notifications" />
          </VStack>
        </BottomSheet>

        <ActionSheet
          open={actionSheetOpen}
          onOpenChange={setActionSheetOpen}
          title="Choose an action"
          description="Select one of the options below"
          actions={[
            { label: 'Share', icon: <Body>📤</Body>, onPress: () => alert('Share') },
            { label: 'Edit', icon: <Body>✏️</Body>, onPress: () => alert('Edit') },
            { label: 'Download', icon: <Body>⬇️</Body>, onPress: () => alert('Download') },
            { label: 'Delete', icon: <Body>🗑️</Body>, onPress: () => alert('Delete'), destructive: true },
          ]}
        />

        {toastVisible && (
          <Toast
            variant="success"
            title="Success!"
            description="Your changes have been saved successfully."
            icon={ToastIcons.success}
            duration={3000}
            onDismiss={() => setToastVisible(false)}
            position="top"
          />
        )}

        {/* ─── Dark Mode Toggle ─── */}
        <Button
          variant="secondary"
          fullWidth
          onPress={() => setDarkMode(!isDarkMode)}
        >
          {isDarkMode ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
        </Button>

        <Spacer />
      </VStack>
    </ScrollView>
  );
}
