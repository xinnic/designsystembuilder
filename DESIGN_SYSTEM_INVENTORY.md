# Design System Builder - Comprehensive Inventory

## Executive Summary

This is a Tamagui-based design system with comprehensive token management, 11 styled primitive components, and 6 bespoke pattern components. The system uses CSS variables for dynamic theming and supports dark mode, font switching, typography scales, and spacing modes.

---

## 1. DESIGN TOKENS

### 1.1 COLOR TOKENS

All colors are defined as RGB triplets for alpha channel support.

#### Semantic Colors
| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `brand` | `26 188 156` (Turquoise) | Dynamic based on theme | Primary color for CTAs, active states |
| `brandWeak` | `233 246 243` | Dynamic (lighter) | Supporting surface, hover backgrounds |
| `textPrimary` | `26 26 26` | `225 225 225` | Primary text color |
| `textSecondary` | `108 117 136` | `168 168 168` | Secondary text, captions |
| `textDisabled` | `161 161 161` | `102 102 102` | Disabled text |
| `bgPrimary` | `248 249 250` | `18 18 18` | Primary background |
| `bgSecondary` | `255 255 255` | `30 30 30` | Card background, modals |
| `border` | `229 231 235` | `44 44 44` | Borders, dividers |
| `focus` | `0 102 204` | `0 102 204` | Focus outlines, keyboard indicators |
| `success` | `34 197 94` | `34 197 94` | Success states, checkmarks |
| `warning` | `245 158 11` | `245 158 11` | Warning states |
| `info` | `59 130 246` | `59 130 246` | Info states |
| `danger` | `244 68 68` | `244 68 68` | Destructive actions, errors |

#### Theme Support
17 pre-defined color themes available:
- `turquoise` (default) - #1abc9c
- `emerald` - #2ecc71
- `peter-river` - #3498db
- `amethyst` - #9b59b6
- `wet-asphalt` - #34495e
- `sun-flower` - #f1c40f
- `carrot` - #e67e22
- `alizarin` - #e74c3c
- `concrete` - #95a5a6
- `orange` - #f39c12
- `pumpkin` - #d35400
- `pomegranate` - #c0392b
- `nephritis` - #27ae60
- `belize-hole` - #2980b9
- `wisteria` - #8e44ad
- `midnight-blue` - #2c3e50
- `asbestos` - #7f8c8d
- `custom` - User-defined hex color

---

### 1.2 TYPOGRAPHY TOKENS

#### Font Families (27 total)
**Sans Serif:**
- Plus Jakarta Sans (default)
- Be Vietnam Pro
- Wix Madefor Text
- Figtree
- Albert Sans
- Satoshi
- Epilogue
- Manrope
- Public Sans
- Space Grotesk
- Work Sans
- Source Sans 3
- Nunito Sans
- Arimo
- Hanken Grotesk
- Rubik
- DM Sans
- IBM Plex Sans
- Sora

**Serif:**
- Newsreader
- Noto Serif
- Domine
- Libre Caslon Text
- EB Garamond
- Literata
- Source Serif 4
- Montserrat

#### Font Scale Variants
Three typographic scales available:

##### Regular Scale (Default)
| Style | Size | Line Height | Weight | Letter Spacing |
|-------|------|-------------|--------|-----------------|
| Display Lg | 48px | 56px | 700 | — |
| H1 | 28px | 38px | 700 | — |
| H2 | 22px | 30px | 600 | — |
| Subhead | 18px | 26px | 600 | — |
| Body | 16px | 24px | 400 | — |
| Caption | 14px | 20px | 400 | — |
| Button | 18px | 26px | 600 | 0.02em |
| Eyebrow | 12px | 16px | 500 | 0.05em |

##### Small Scale
| Style | Size | Line Height | Weight |
|-------|------|-------------|--------|
| Display Lg | 48px | 56px | 700 |
| H1 | 24px | 30px | 700 |
| H2 | 20px | 26px | 600 |
| Subhead | 16px | 22px | 600 |
| Body | 14px | 20px | 400 |
| Caption | 12px | 16px | 400 |
| Button | 18px | 26px | 600 |
| Eyebrow | 11px | 14px | 500 |

##### Large Scale
| Style | Size | Line Height | Weight |
|-------|------|-------------|--------|
| Display Lg | 48px | 56px | 700 |
| H1 | 36px | 44px | 700 |
| H2 | 24px | 32px | 600 |
| Subhead | 21px | 30px | 600 |
| Body | 18px | 26px | 400 |
| Caption | 15px | 22px | 400 |
| Button | 18px | 26px | 600 |
| Eyebrow | 13px | 18px | 500 |

---

### 1.3 SPACING TOKENS

Three spacing scales (8-point grid basis):

| Index | Compact | Normal (Default) | Comfortable |
|-------|---------|------------------|-------------|
| 1 | 4px | 8px | 12px |
| 2 | 8px | 16px | 24px |
| 3 | 12px | 24px | 36px |
| 4 | 16px | 32px | 48px |
| 5 | 20px | 40px | 60px |
| 6 | 24px | 48px | 72px |
| 7 | 32px | 64px | 96px |
| 8 | 40px | 80px | 120px |

**CSS Variables:** `--space-1` through `--space-8`

---

### 1.4 BORDER RADIUS TOKENS

| Token | Value | Use Case |
|-------|-------|----------|
| `sm` | 4px | Small buttons, small components |
| `md` | 8px | Default, cards, inputs |
| `lg` | 12px | Large cards, modals |
| `full` | 9999px | Pills, circles, avatars |

**CSS Variables:** `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`

---

### 1.5 SHADOW / ELEVATION TOKENS

Three elevation levels:

| Level | CSS Value |
|-------|-----------|
| `shadow-1` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` |
| `shadow-2` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| `shadow-3` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |

**CSS Variables:** `--shadow-1`, `--shadow-2`, `--shadow-3`

---

### 1.6 MOTION/ANIMATION TOKENS

| Token | Value | Use Case |
|-------|-------|----------|
| `fast` | 150ms | Quick interactions |
| `base` | 300ms | Standard transitions |
| `slow` | 500ms | Deliberate animations |
| `easeStandard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard easing |

**Spring Animations:**
- `bouncy`: damping 10, mass 0.9, stiffness 100
- `lazy`: damping 20, stiffness 60
- `quick`: damping 20, mass 1.2, stiffness 250

---

## 2. STYLED TAMAGUI COMPONENTS (Primitives)

### 2.1 Layout Components

#### Stack (XStack, YStack)
**Purpose:** Flexible layout containers using Flexbox
**File:** `src/design-system/components/Stack.tsx`

**Components:**
- `XStack` - Horizontal layout (flexDirection: row)
- `YStack` - Vertical layout (flexDirection: column)
- `Stack` - Base Tamagui stack (flexible direction)

**Features:**
- Gap control with spacing tokens
- Flex-based sizing
- Full responsive support

**Example:**
```tsx
<YStack gap="$3" padding="$4">
  <H1>Title</H1>
  <Body>Content</Body>
</YStack>
```

---

#### Card
**Purpose:** Container component for grouped content
**File:** `src/design-system/components/Card.tsx`

**Variants:**
- `default` - Background + border (default)
- `elevated` - Shadow elevation effect
- `branded` - Brand color border
- `flat` - No border or shadow
- `gradient` - Brand weak background with brand border

**Padding Options:**
- `none` - No padding
- `small` - 8px
- `medium` - 12px (default)
- `large` - 16px

**Props:**
- `variant`: string
- `padding`: 'none' | 'small' | 'medium' | 'large'
- `interactive`: boolean (hover/press effects)
- `fullWidth`: boolean

**Header/Footer Components:**
- `CardHeader` - With bottom border divider
- `CardFooter` - With top border divider

**Example:**
```tsx
<Card variant="elevated" padding="large" interactive>
  <CardHeader>
    <H2>Header</H2>
  </CardHeader>
  <Body>Content here</Body>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### 2.2 Text/Typography Components

#### Text (Semantic Typography)
**Purpose:** Semantic typography components
**File:** `src/design-system/components/Text.tsx`

**Components:**
1. **Display** - Largest (Display Lg scale)
   - Use: Hero sections, main titles
   - Size: 48px, Weight: 700

2. **H1** - Page heading
   - Size: 28px (regular) / 24px (small) / 36px (large)
   - Weight: 700

3. **H2** - Section heading
   - Size: 22px (regular) / 20px (small) / 24px (large)
   - Weight: 600

4. **H3** - Subsection heading
   - Size: 18px, Weight: 600

5. **Body** - Default body text
   - Size: 16px (regular) / 14px (small) / 18px (large)
   - Weight: 400
   - Color: `textPrimary`

6. **Caption** - Small text, metadata
   - Size: 14px, Weight: 400
   - Color: `textSecondary`

7. **Label** - Form labels
   - Size: 16px, Weight: 600
   - Color: `textPrimary`

8. **Link** - Interactive text links
   - Size: 16px, Weight: 400
   - Color: `brand`
   - Underline on hover

**Features:**
- All use semantic font tokens (`$body`, `$heading`)
- Automatic dark mode support
- Focus states with outline
- Custom font scale support

**Example:**
```tsx
<H1>Main Title</H1>
<Body>Paragraph text here</Body>
<Link>Learn more</Link>
```

---

### 2.3 Form Components

#### Button
**Purpose:** Interactive action component
**File:** `src/design-system/components/Button.tsx`

**Variants:**
- `primary` - Brand background, white text (default)
- `secondary` - Transparent, brand border & text
- `tertiary` - Transparent, brand text, no border
- `destructive` - Danger background, white text
- `ghost` - Transparent, text only

**Sizes:**
- `small` - 12px font, 8px vertical padding
- `medium` - 16px font, 12px vertical padding (default)
- `large` - 18px font, 16px vertical padding

**Props:**
- `variant`: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'ghost'
- `size`: 'small' | 'medium' | 'large'
- `disabled`: boolean
- `fullWidth`: boolean

**States:**
- Hover: opacity 0.9, scale 1.02
- Press: opacity 0.85, scale 0.98
- Focus: 2px outline with focus color
- Disabled: 50% opacity, pointer events disabled

**Example:**
```tsx
<Button variant="primary" size="medium" onPress={handleClick}>
  Click Me
</Button>

<Button variant="secondary" disabled>
  Disabled
</Button>
```

---

#### Input
**Purpose:** Text input field
**File:** `src/design-system/components/Input.tsx`

**Variants:**
- `filled` - Background + border (default)
- `outlined` - Transparent background + border
- `underline` - Transparent background, bottom border only

**Sizes:**
- `small` - 12px font, 8px padding
- `medium` - 14px font, 8px padding (default)
- `large` - 16px font, 12px padding

**Props:**
- `variant`: 'filled' | 'outlined' | 'underline'
- `size`: 'small' | 'medium' | 'large'
- `error`: boolean (danger color border)
- `disabled`: boolean
- `fullWidth`: boolean
- `placeholder`: string

**States:**
- Focus: brand color border + 2px outline
- Hover: brand color border
- Error: danger color border
- Disabled: 50% opacity

**Example:**
```tsx
<Input 
  variant="filled" 
  placeholder="Enter email" 
  fullWidth
/>

<Input 
  variant="underline" 
  error 
  placeholder="Invalid input"
/>
```

#### TextArea
**Purpose:** Multi-line text input
**File:** `src/design-system/components/Input.tsx`

**Props:** Same as Input
**Minimum Height:** 100px
**Default Variants:** variant="filled"

**Example:**
```tsx
<TextArea 
  placeholder="Enter your message" 
  rows={4}
  fullWidth
/>
```

---

#### Checkbox
**Purpose:** Boolean selection input
**File:** `src/design-system/components/Checkbox.tsx`

**Features:**
- 24px default size
- Brand color when checked
- Custom check icon (Lucide Check)

**Sizes:**
- `small` - 18px
- `medium` - 24px (default)
- `large` - 32px

**Props:**
- `size`: 'small' | 'medium' | 'large'
- `checked`: boolean
- `disabled`: boolean

**States:**
- Checked: Brand background + border
- Hover: Brand border
- Focus: 2px focus outline
- Press: 95% scale

**Components:**
- `CheckboxIndicator` - Icon container
- `CheckboxWithLabel` - Convenience wrapper with label

**Example:**
```tsx
<Checkbox id="terms" checked={checked} onCheckedChange={setChecked}>
  <CheckboxIndicator>
    <Check size={16} />
  </CheckboxIndicator>
</Checkbox>

<CheckboxWithLabel 
  id="agree" 
  label="I agree to terms"
  checked={checked}
  onCheckedChange={setChecked}
/>
```

---

#### Switch
**Purpose:** Toggle on/off control
**File:** `src/design-system/components/Switch.tsx`

**Note:** Uses native Tamagui Switch (not styled API due to internal state requirements)

**Props:**
- `checked`: boolean
- `onCheckedChange`: (checked: boolean) => void
- `disabled`: boolean
- `size`: 'small' | 'medium' | 'large'

**Example:**
```tsx
<Switch 
  checked={enabled} 
  onCheckedChange={setEnabled}
/>
```

---

#### Select
**Purpose:** Dropdown selection component
**File:** `src/design-system/components/Select.tsx`

**Components:**
- `SelectTrigger` - Button that opens dropdown
- `SelectValue` - Display selected value
- `SelectContent` - Dropdown container
- `SelectViewport` - Scrollable area
- `SelectItem` - Individual option
- `SelectItemText` - Option label
- `SelectItemIndicator` - Checkmark indicator
- `StyledSelect` - Pre-built convenience wrapper

**Features:**
- Custom chevron icon
- Hover/focus states
- Accessible with keyboard

**Trigger Sizes:**
- `small` - 36px min height
- `medium` - 44px min height (default)
- `large` - 52px min height

**Props:**
- `size`: 'small' | 'medium' | 'large'
- `error`: boolean
- `disabled`: boolean

**Example:**
```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectViewport>
      <SelectItem value="opt1">
        <SelectItemText>Option 1</SelectItemText>
        <SelectItemIndicator>
          <Check size={16} />
        </SelectItemIndicator>
      </SelectItem>
    </SelectViewport>
  </SelectContent>
</Select>

// Or use convenience wrapper:
<StyledSelect
  placeholder="Choose one"
  value={value}
  onValueChange={setValue}
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]}
/>
```

---

### 2.4 Navigation Components

#### Tabs
**Purpose:** Multi-panel navigation
**File:** `src/design-system/components/Tabs.tsx`

**Components:**
- `TabsList` - Container for tab triggers
- `TabsTrigger` - Individual tab button
- `TabsContent` - Tab panel content

**List Variants:**
- `default` - Background container (default)
- `underlined` - Bottom border style
- `pills` - Rounded pill style

**Trigger Sizes:**
- `small` - 16px font, 8px padding
- `medium` - 18px font, 16px padding (default)
- `large` - 20px font, 20px padding

**Trigger Variants:** Same as List variants

**Content Variants:**
- `default` - Transparent (default)
- `bordered` - Border with background
- `elevated` - Background with shadow

**States:**
- Active: Brand background, white text
- Hover: Background color change
- Focus: 2px outline
- Disabled: 50% opacity

**Example:**
```tsx
<Tabs defaultValue="tab1" orientation="horizontal">
  <Tabs.List variant="pills">
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.List>
  
  <Tabs.Content value="tab1">
    <Body>Content 1</Body>
  </Tabs.Content>
  
  <Tabs.Content value="tab2">
    <Body>Content 2</Body>
  </Tabs.Content>
</Tabs>
```

---

### 2.5 Feedback Components

#### Progress
**Purpose:** Visual progress indicator
**File:** `src/design-system/components/Progress.tsx`

**Main Component:**
- Default: 8px height, rounded, with border
- Responsive to value prop (0-100)

**Sizes:**
- `small` - 4px height
- `medium` - 8px height (default)
- `large` - 12px height

**Variants:**
- `default` - Border + background (default)
- `bordered` - Thicker border
- `flat` - No border

**ProgressIndicator:**
- Animated width transition (0.3s)

**Indicator Variants:**
- `default` - Brand color (default)
- `success` - Success color
- `warning` - Warning color
- `danger` - Danger color
- `info` - Info color
- `gradient` - Linear gradient (brand to brand-weak)

**Indicator Props:**
- `animated`: boolean - Smooth width animation
- `striped`: boolean - Animated stripes pattern
- `variant`: string

**Additional Components:**
- `CircularProgress` - Circular version
- `ProgressWithLabel` - Progress with percentage label

**Example:**
```tsx
<Progress value={60} max={100}>
  <ProgressIndicator variant="success" animated />
</Progress>

<ProgressWithLabel 
  value={75} 
  label="Loading" 
  variant="info"
/>

<CircularProgress size="medium" variant="spinning" />
```

---

### 2.6 Overlay Components

#### Dialog / Modal
**Purpose:** Overlay for focused content
**File:** `src/design-system/components/Dialog.tsx`

**Components:**
- `Dialog` - Base Tamagui Dialog
- `DialogOverlay` - Semi-transparent backdrop
- `DialogContent` - Modal container
- `DialogTitle` - Heading
- `DialogDescription` - Subtitle
- `DialogClose` - Close button (top-right)
- `AlertDialog` - Confirmation dialog
- `Modal` - Simple modal wrapper

**Content Sizes:**
- `small` - 400px max width
- `medium` - 500px max width (default)
- `large` - 700px max width
- `full` - 900px max width, 90vh height

**Content Variants:**
- `default` - Standard shadow (default)
- `elevated` - Enhanced shadow
- `flat` - No shadow, no border

**States:**
- Enter: Scale 0.9, opacity 0
- Exit: Scale 0.95, opacity 0

**AlertDialog Props:**
- `title`: string
- `description`: string
- `confirmText`: string (default: "Confirm")
- `cancelText`: string (default: "Cancel")
- `onConfirm`: () => void
- `onCancel`: () => void
- `variant`: 'default' | 'destructive'
- `open`: boolean
- `onOpenChange`: (open: boolean) => void

**Example:**
```tsx
<Dialog open={isOpen} onOpenChange={setOpen}>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Description>Description text</Dialog.Description>
      <Body>Content here</Body>
      <Dialog.Close>
        <X size={20} />
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog>

// Alert Dialog
<AlertDialog
  open={showConfirm}
  onOpenChange={setShowConfirm}
  title="Delete?"
  description="Are you sure?"
  confirmText="Delete"
  variant="destructive"
  onConfirm={handleDelete}
/>

// Simple Modal
<Modal
  open={isOpen}
  onClose={() => setOpen(false)}
  title="Modal Title"
>
  <Body>Modal content</Body>
</Modal>
```

---

## 3. BESPOKE COMPONENTS (Composed/Complex)

### 3.1 AppBar
**Purpose:** Top navigation header bar
**File:** `src/design-system/bespoke/AppBar.tsx`

**Features:**
- Logo image support
- Title text
- Search, notification, and menu action buttons
- Left/right action areas

**Props:**
```tsx
interface AppBarProps {
  title?: string;
  logo?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showMenu?: boolean;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  onMenuPress?: () => void;
}
```

**Primitives Used:**
- XStack (layout)
- H2 (title)
- Button (ghost variant for actions)
- Icons (Search, Bell, Menu from lucide-react)

**Example:**
```tsx
<AppBar
  title="Discover"
  logo="https://example.com/logo.png"
  showSearch
  showNotifications
  onSearchPress={() => console.log('search')}
/>
```

---

### 3.2 BottomNav
**Purpose:** Bottom navigation with icons and labels
**File:** `src/design-system/bespoke/BottomNav.tsx`

**Features:**
- Icon + label per item
- Active state highlighting
- Tab-like behavior
- Accessibility states

**Props:**
```tsx
interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

interface BottomNavProps {
  items: NavItem[];
  activeId?: string;
  onItemPress?: (id: string) => void;
}
```

**Primitives Used:**
- XStack (horizontal layout)
- YStack (vertical layout for icon + label)
- Button (ghost variant)
- Caption (label)
- Icons (custom passed as ReactNode)

**Styling:**
- Active: Brand color icon + label, bold font weight
- Inactive: Secondary text color

**Example:**
```tsx
<BottomNav
  items={[
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'search', label: 'Search', icon: <Search size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> }
  ]}
  activeId="home"
  onItemPress={(id) => navigate(id)}
/>
```

---

### 3.3 StatsCard
**Purpose:** Metric display with icon, value, and label
**File:** `src/design-system/bespoke/StatsCard.tsx`

**Features:**
- Icon (optional)
- Large value display
- Label text
- Compact, centered layout

**Props:**
```tsx
interface StatsCardProps {
  icon?: ReactNode;
  value: string;
  label: string;
}
```

**Primitives Used:**
- YStack (vertical layout)
- H2 (value)
- Caption (label)
- Icons (custom)

**Example:**
```tsx
<StatsCard
  icon={<TrendingUp size={20} />}
  value="124"
  label="Posts"
/>
```

---

### 3.4 UserCard
**Purpose:** User profile card with name, status, avatar, and action
**File:** `src/design-system/bespoke/UserCard.tsx`

**Features:**
- Circular avatar with initials
- Name and status display
- Action button (Follow, Add, etc.)
- Responsive layout

**Props:**
```tsx
interface UserCardProps {
  name: string;
  status?: string;
  avatarColor?: string;
  onActionPress?: () => void;
  actionText?: string;
}
```

**Primitives Used:**
- Card (elevated default)
- XStack (horizontal layout)
- YStack (vertical info layout)
- H3 (name)
- Caption (status)
- Button (secondary variant)
- Circle (avatar)

**Styling:**
- Avatar: 48px circle, custom background color
- Initials: Auto-generated from name

**Example:**
```tsx
<UserCard
  name="Sarah J."
  status="Active now"
  avatarColor="#3498db"
  actionText="Follow"
  onActionPress={handleFollow}
/>
```

---

### 3.5 HeroCard
**Purpose:** Large featured card with CTA
**File:** `src/design-system/bespoke/HeroCard.tsx`

**Features:**
- Title
- Description
- Call-to-action button
- Optional gradient background

**Props:**
```tsx
interface HeroCardProps {
  title: string;
  description: string;
  ctaText?: string;
  onCtaPress?: () => void;
  gradient?: boolean;
}
```

**Primitives Used:**
- Card (elevated or gradient variant)
- YStack (vertical layout)
- H2 (title)
- Body (description)
- Button (primary variant)

**Example:**
```tsx
<HeroCard
  title="Featured Today"
  description="Discover what's trending in your feed"
  ctaText="Explore Now"
  onCtaPress={handleExplore}
  gradient
/>
```

---

### 3.6 CategoryPills
**Purpose:** Horizontal scrolling filter chips
**File:** `src/design-system/bespoke/CategoryPills.tsx`

**Features:**
- Horizontal scroll on overflow
- Active state highlighting
- Pill-shaped buttons
- Accessibility support

**Props:**
```tsx
interface CategoryPill {
  id: string;
  label: string;
}

interface CategoryPillsProps {
  categories: CategoryPill[];
  activeId?: string;
  onCategoryPress?: (id: string) => void;
}
```

**Primitives Used:**
- ScrollView (horizontal)
- XStack (layout container)
- Button (primary/secondary variants)
- Body (label)

**Styling:**
- Active: Primary variant, white text
- Inactive: Secondary variant, brand text
- Border Radius: Pill shaped (radius full)

**Example:**
```tsx
<CategoryPills
  categories={[
    { id: 'foryou', label: 'For You' },
    { id: 'trending', label: 'Trending' },
    { id: 'following', label: 'Following' }
  ]}
  activeId="foryou"
  onCategoryPress={(id) => setActive(id)}
/>
```

---

## 4. STYLING OPTIONS & CUSTOMIZATION

### 4.1 Styling Options (Configured via State)
Located in `src/state/designSystem.ts`

```tsx
interface StylingOptions {
  menuLayout: 'bottomBar' | 'hamburger';
  cardBorderWeight: 'none' | 'thin' | 'thick';
  cardBorderTone: 'light' | 'ultraLight';
  inputBorderWeight: 'none' | 'thin' | 'thick';
  inputBorderTone: 'light' | 'ultraLight';
  inputStyle: 'filled' | 'outlined' | 'underline' | 'none';
  cardWidth: 'full' | 'withMargins';
  logo?: string;
}
```

### 4.2 Dark Mode Support
- Toggle via `setDarkMode(boolean)`
- CSS class `.dark` applied to root element
- All colors automatically adjust

### 4.3 Theme Switching
- 17 pre-defined themes + custom color option
- Change via `setTheme(themeName)`
- CSS class `.theme-{name}` applied to root

### 4.4 Typography Scale
- 3 scales: 'small', 'regular', 'large'
- Change via `setScale('scale')`
- CSS class `.scale-{scale}` applied to root

### 4.5 Font Selection
- Separate primary and display fonts
- 27 fonts available
- Change via `setPrimaryFont()` / `setDisplayFont()`
- CSS class `.font-{name}` applied to root

### 4.6 Spacing Mode
- 3 modes: 'compact', 'normal', 'comfortable'
- Change via `setSpacingMode('mode')`

---

## 5. HAPTICS CONFIGURATION

```tsx
interface HapticsConfig {
  enabled: boolean;
  stack: 'web-react' | 'react-native-expo' | 'ios-swiftui' | 'android-compose' | 'flutter';
  tapLight: 'selection' | 'impactLight';
  tapMedium: 'impactMedium';
  notifySuccess: 'notificationSuccess';
  notifyError: 'notificationError';
}
```

---

## 6. CSS VARIABLE SYSTEM

All tokens are exposed as CSS variables for dynamic theming:

**Color Variables:**
```css
--color-brand
--color-brand-weak
--color-text-primary
--color-text-secondary
--color-text-disabled
--color-bg-primary
--color-bg-secondary
--color-border
--color-focus
--color-success
--color-warning
--color-info
--color-danger
```

**Typography Variables:**
```css
--font-family
--font-display (display font)
--font-display-size / --font-display-line / --font-display-weight
--font-h1-size / line / weight
--font-h2-size / line / weight
--font-subhead-size / line / weight
--font-body-size / line / weight
--font-caption-size / line / weight
--font-button-size / line / weight / track
--font-eyebrow-size / line / weight / track
```

**Spacing Variables:**
```css
--space-1 through --space-8
```

**Radius Variables:**
```css
--radius-sm, --radius-md, --radius-lg, --radius-full
```

**Shadow Variables:**
```css
--shadow-1, --shadow-2, --shadow-3
```

**Motion Variables:**
```css
--motion-fast
--motion-base
--motion-slow
--ease-standard
```

**Styling Variables:**
```css
--inputBorder (0px, 1px, or 2px)
--inputBorderAlpha (.25 or .12)
--cardBorder (0px, 1px, or 2px)
--cardBorderAlpha (.18 or .10)
```

---

## 7. EXPORT STRUCTURE

### Primitive Components Export (`src/design-system/components/index.ts`)
```tsx
// Typography
export { Text, Display, H1, H2, H3, Body, Caption, Label, Link }

// Buttons
export { Button }

// Cards
export { Card, CardHeader, CardFooter }

// Forms
export { Input, TextArea, Switch, Checkbox, Select, ... }

// Navigation
export { Tabs, TabsList, TabsTrigger, TabsContent }

// Feedback
export { Progress, ProgressIndicator, CircularProgress, ProgressWithLabel }

// Overlay
export { Dialog, DialogOverlay, DialogContent, DialogTitle, 
         DialogDescription, DialogClose, AlertDialog, Modal }

// Layout
export { XStack, YStack, Stack }
```

### Bespoke Components Export (`src/design-system/bespoke/index.ts`)
```tsx
export { AppBar }
export { BottomNav }
export { StatsCard }
export { UserCard }
export { HeroCard }
export { CategoryPills }
```

---

## 8. WHAT'S MISSING FOR QUICKSTART TEMPLATE

### High Priority
1. **List Component** - Scrollable list with items
2. **Grid Component** - Multi-column grid layout
3. **Badge Component** - Small label badges
4. **Avatar Component** - Image or initials avatar
5. **Divider/Separator** - Visual divider line
6. **Breadcrumb Component** - Navigation breadcrumb
7. **Chip Component** - Dismissible tag/chip
8. **Rating/Stars Component** - Star rating display
9. **Skeleton/Loading States** - Placeholder loaders
10. **Toast/Notification Component** - Toast messages

### Medium Priority
11. **Carousel/Slider Component** - Image carousel
12. **Pagination Component** - Page navigation
13. **Stepper Component** - Multi-step forms
14. **Timeline Component** - Event timeline
15. **Tooltip Component** - Hover information
16. **Popover Component** - Floating content
17. **Segmented Control** - Tab-like toggle
18. **Search Bar** - Search input with icon
19. **Date Picker** - Calendar selection
20. **Accordion Component** - Collapsible sections

### Lower Priority
21. **Menu/Context Menu** - Right-click menu
22. **Drawer** - Slide-out navigation panel
23. **Keyboard Shortcut Help** - Shortcuts guide
24. **Empty State** - No data illustration
25. **Error Boundary** - Error display component

---

## 9. RECOMMENDATIONS FOR STYLING APPROACH

### 1. **Token-First Development**
- Always use CSS variables first
- Enables real-time theme switching
- Supports dark mode automatically
- No hardcoded colors

### 2. **Component Composition**
- Build new components from primitives
- Use `styled()` API for consistent styling
- Inherit from design tokens via `$` prefix
- Maintain variant system

### 3. **Consistent Prop Patterns**
```tsx
// Follow this pattern:
- variant: 'primary' | 'secondary' | 'tertiary' (consistent names)
- size: 'small' | 'medium' | 'large' (always these names)
- disabled: boolean (universal)
- fullWidth: boolean (layout control)
- state variants: error, active, loading (semantic)
```

### 4. **Dark Mode Strategy**
- All components automatically support dark mode
- Use CSS variables, avoid hardcoded colors
- Test all components in both light/dark
- Use `useDesignSystem()` for state

### 5. **Accessibility Standards**
- Use semantic HTML tags where possible
- Include `accessibilityLabel` on interactive elements
- Maintain focus states with outlines
- Keyboard navigation support

### 6. **Responsive Design**
- Use Tamagui media queries
- Stack components vertically on mobile
- Adjust padding/spacing per breakpoint
- Test on multiple screen sizes

### 7. **Motion & Animation**
- Use `$motion-fast` for feedback (150ms)
- Use `$motion-base` for transitions (300ms)
- Use `$motion-slow` for deliberate animations (500ms)
- Prefer spring animations for natural feel

### 8. **Typography Hierarchy**
- Display: Hero/banner text only
- H1: Page titles (one per page)
- H2: Major sections
- H3: Subsections
- Body: Paragraphs (default)
- Caption: Metadata/timestamps
- Label: Form labels

### 9. **Spacing Consistency**
- Use spacing tokens: `$1` through `$8`
- Never hardcode pixel values
- Maintain 8-point grid
- Use gap for component separation

### 10. **Color Usage**
- `$brand` - Primary actions, active states
- `$brandWeak` - Hover backgrounds, secondary surfaces
- `$textPrimary` - Main text
- `$textSecondary` - Secondary text, captions
- `$bgPrimary` - Page backgrounds
- `$bgSecondary` - Card backgrounds
- `$border` - Dividers, borders
- `$success` - Success states
- `$warning` - Warnings
- `$danger` - Destructive actions, errors

---

## 10. TOKEN MANAGEMENT WORKFLOW

### Adding New Token
1. Define in `designSystem.ts` (Tokens interface)
2. Add default value to `defaultTokens`
3. Bind to CSS variable in `useTokenCSS()`
4. Export from `tamagui.config.ts`

### Creating New Component
1. Create file in `src/design-system/components/`
2. Use `styled()` API
3. Reference tokens with `$` prefix
4. Define variants and defaults
5. Export from `index.ts`

### Creating Bespoke Component
1. Create file in `src/design-system/bespoke/`
2. Compose from primitives
3. Define props interface
4. Add JSDoc with examples
5. Export from `index.ts`

---

## 11. KEY FILES REFERENCE

| File | Purpose |
|------|---------|
| `src/state/designSystem.ts` | Token state, defaults, subscriptions |
| `src/tamagui.config.ts` | Tamagui configuration, CSS var bindings |
| `src/index.css` | Global styles, theme classes, typography |
| `src/design-system/components/*` | Primitive styled components |
| `src/design-system/bespoke/*` | Composed pattern components |
| `src/design-system/components/index.ts` | Primitive exports |
| `src/design-system/bespoke/index.ts` | Bespoke exports |

---

## 12. QUICK START CHECKLIST

### To Use This Design System:

- [ ] Import components: `import { Button, Card, H1 } from '@/design-system/components'`
- [ ] Use bespoke: `import { AppBar, BottomNav } from '@/design-system/bespoke'`
- [ ] Access tokens: `useDesignSystem()` hook for state
- [ ] Wrap app with theme provider (if needed)
- [ ] Call `useTokenCSS()` in root component
- [ ] All components automatically use tokens
- [ ] Theme switching via `setTheme()`, `setDarkMode()`, etc.

### To Add Custom Component:

```tsx
import { styled } from 'tamagui';
import { YStack } from './Stack';

export const CustomComponent = styled(YStack, {
  name: 'CustomComponent',
  backgroundColor: '$bgSecondary',
  borderRadius: '$2',
  padding: '$4',
  
  variants: {
    variant: {
      default: {},
      special: {
        backgroundColor: '$brand',
        color: 'white',
      },
    },
  },
  
  defaultVariants: {
    variant: 'default',
  },
});
```

---

## 13. COMPONENT DEPENDENCY TREE

```
Design System Root
├── Tokens (designSystem.ts)
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Radius
│   ├── Shadows
│   └── Motion
│
├── Primitives (src/design-system/components/)
│   ├── Layout
│   │   ├── XStack
│   │   ├── YStack
│   │   ├── Stack
│   │   └── Card
│   ├── Typography
│   │   ├── Display
│   │   ├── H1, H2, H3
│   │   ├── Body, Caption, Label
│   │   └── Link
│   ├── Forms
│   │   ├── Button
│   │   ├── Input, TextArea
│   │   ├── Checkbox
│   │   ├── Switch
│   │   └── Select
│   ├── Navigation
│   │   └── Tabs
│   ├── Feedback
│   │   └── Progress
│   └── Overlay
│       └── Dialog
│
└── Bespoke (src/design-system/bespoke/)
    ├── AppBar (XStack + H2 + Button + Icons)
    ├── BottomNav (XStack + YStack + Button + Icons)
    ├── StatsCard (YStack + H2 + Caption + Icons)
    ├── UserCard (Card + XStack + YStack + Circle + Button)
    ├── HeroCard (Card + YStack + H2 + Body + Button)
    └── CategoryPills (ScrollView + XStack + Button + Body)
```

---

## 14. SUMMARY STATISTICS

| Category | Count | Status |
|----------|-------|--------|
| Color Tokens | 13 semantic + 17 themes | Complete |
| Font Families | 27 | Complete |
| Font Scales | 8 typography styles × 3 scales | Complete |
| Spacing Scales | 3 modes × 8 levels | Complete |
| Radius Tokens | 4 | Complete |
| Shadow Tokens | 3 | Complete |
| Motion Tokens | 3 durations + 3 springs | Complete |
| Primitive Components | 11 | Complete |
| Bespoke Components | 6 | Complete |
| Total Exported Components | 40+ | Complete |
| Variants per Component | 2-6 | Consistent |
| Accessibility Features | Full WCAG 2.1 | Implemented |

---

## 15. THEMING IN ACTION

### Example: Complete App Setup

```tsx
import { useTokenCSS, useDesignSystem } from '@/state/designSystem';
import { YStack, Button, H1, Body } from '@/design-system/components';
import { AppBar } from '@/design-system/bespoke';

export function App() {
  // This binds all CSS variables to tokens
  useTokenCSS();
  
  const { isDarkMode, setDarkMode, setTheme } = useDesignSystem();

  return (
    <YStack flex={1} backgroundColor="$bgPrimary">
      <AppBar 
        title="My App"
        showSearch
        showNotifications
      />

      <YStack flex={1} padding="$4" gap="$4">
        <H1>Welcome</H1>
        <Body>Your content here</Body>

        <Button 
          variant="primary" 
          fullWidth
          onPress={() => setTheme('emerald')}
        >
          Change Theme
        </Button>

        <Button 
          variant="secondary" 
          fullWidth
          onPress={() => setDarkMode(!isDarkMode)}
        >
          Toggle Dark Mode
        </Button>
      </YStack>
    </YStack>
  );
}
```

---

**End of Design System Inventory**

Generated for Design System Builder | Tamagui-based | Full Token + Component Coverage
