# Platform-Specific Token System

> Complete guide to the platform-aware token system supporting iOS, Android, and Web

## 📋 Overview

The platform-specific token system extends the 3-tier token architecture with platform-aware values. This allows components to automatically adapt to platform conventions while maintaining a unified codebase.

## 🎯 Key Features

- **Platform-Aware Tokens**: Different values for iOS, Android, and Web
- **Automatic Detection**: Runtime platform detection
- **Type Safety**: Full TypeScript support
- **Seamless Integration**: Works with existing token system
- **50+ Comprehensive Tests**: Full test coverage

## 🏗️ Architecture

### Platform Token Structure

```typescript
interface PlatformToken<T> {
  ios: T;
  android: T;
  web: T;
}
```

Every platform token contains three values, one for each platform.

### Creating Platform Tokens

```typescript
import { platform } from '@/design-system/tokens/platform';

// Different values per platform
const buttonRadius = platform(
  12,  // iOS: More rounded
  8,   // Android: Material Design spec
  8    // Web: Standard
);

// Same value for all platforms
const spacing = platform(16);
```

## 📐 Token Categories

### 1. Spacing Tokens

Platform-specific spacing that respects each platform's design language:

```typescript
platformSpacing = {
  listItemPadding: platform(16, 12, 16),    // iOS/Web more spacious
  tabBarPadding: platform(8, 0, 8),         // Android uses no padding
  headerPaddingX: platform(16, 16, 24),     // Web has more space
  drawerPadding: platform(16, 16, 24),
  cardPadding: platform(16, 16, 16)         // Consistent across platforms
}
```

**Usage:**
- iOS: Generally more spacious
- Android: Follows Material Design specs (often tighter)
- Web: Most spacious for desktop interaction

### 2. Border Radius Tokens

Each platform has distinct rounding preferences:

```typescript
platformRadii = {
  button: platform(12, 8, 8),      // iOS prefers rounded
  card: platform(16, 12, 12),      // iOS very rounded
  input: platform(12, 4, 8),       // Android minimal rounding
  modal: platform(16, 16, 12),
  tabBarItem: platform(12, 0, 8)   // Android uses sharp edges
}
```

**Platform Conventions:**
- **iOS**: Rounded corners (12-16px)
- **Android**: Material Design specs (4-12px)
- **Web**: Middle ground (8-12px)

### 3. Typography Tokens

Platform-specific font sizes and weights:

```typescript
platformTypography = {
  navTitle: {
    size: platform(20, 20, 18),
    weight: platform(600, 500, 600)
  },
  tabBarLabel: {
    size: platform(10, 12, 12),      // iOS uses smaller labels
    weight: platform(500, 500, 500)
  },
  button: {
    size: platform(16, 14, 16),      // Android uses 14px (Material spec)
    weight: platform(600, 500, 600)  // Android uses medium weight
  },
  body: {
    size: platform(16, 14, 16),
    lineHeight: platform(1.5, 1.5, 1.5)
  }
}
```

**Design Rationale:**
- **iOS**: Uses San Francisco font, prefers semibold (600)
- **Android**: Uses Roboto, prefers medium (500), slightly smaller
- **Web**: Similar to iOS for readability

### 4. Dimension Tokens

Touch targets and component sizes:

```typescript
platformDimensions = {
  touchTarget: platform(44, 48, 40),        // Apple HIG vs Material Design
  headerHeight: platform(44, 56, 64),       // Platform nav bar standards
  tabBarHeight: platform(49, 56, 56),       // iOS tab bar vs Android bottom nav
  listItemHeight: platform(44, 48, 48),
  buttonHeight: {
    sm: platform(32, 32, 32),
    md: platform(40, 40, 40),
    lg: platform(48, 48, 48)
  }
}
```

**Critical for Usability:**
- **iOS**: 44px minimum (Apple HIG)
- **Android**: 48dp minimum (Material Design)
- **Web**: 40px minimum (WCAG compliance)

### 5. Elevation/Shadow Tokens

Platform-specific shadow styles:

```typescript
platformElevation = {
  card: platform(
    '0 2px 8px 0 oklch(0 0 0 / 0.08)',      // iOS: Subtle
    '0 2px 4px 0 oklch(0 0 0 / 0.14)',      // Android: Elevation 2dp
    '0 1px 3px 0 oklch(0 0 0 / 0.1)'        // Web: Light
  ),
  modal: platform(
    '0 10px 40px 0 oklch(0 0 0 / 0.15)',    // iOS: Medium shadow
    '0 24px 38px 0 oklch(0 0 0 / 0.14)',    // Android: Elevation 24dp
    '0 20px 25px -5px oklch(0 0 0 / 0.1)'   // Web: Larger shadow
  ),
  button: platform(
    'none',                                   // iOS: Flat by default
    '0 2px 4px 0 oklch(0 0 0 / 0.14)',      // Android: Elevation
    '0 1px 2px 0 oklch(0 0 0 / 0.05)'       // Web: Subtle
  ),
  header: platform(
    'none',                                   // iOS: Uses blur/border
    '0 2px 4px 0 oklch(0 0 0 / 0.14)',      // Android: App bar elevation
    '0 1px 3px 0 oklch(0 0 0 / 0.1)'        // Web: Subtle
  )
}
```

**Platform Patterns:**
- **iOS**: Subtle shadows, relies on blur effects
- **Android**: Material elevation system (dp-based)
- **Web**: Traditional box shadows

### 6. Animation Tokens

Platform-specific motion:

```typescript
platformAnimation = {
  duration: {
    fast: platform(200, 150, 150),          // iOS slightly slower
    normal: platform(300, 250, 300),
    slow: platform(500, 400, 500)
  },
  easing: {
    standard: platform(
      'cubic-bezier(0.4, 0.0, 0.2, 1)',
      'cubic-bezier(0.4, 0.0, 0.2, 1)',
      'cubic-bezier(0.4, 0.0, 0.2, 1)'
    ),
    enter: platform(
      'cubic-bezier(0.0, 0.0, 0.2, 1)',     // Ease-out
      'cubic-bezier(0.0, 0.0, 0.2, 1)',
      'cubic-bezier(0.0, 0.0, 0.2, 1)'
    ),
    exit: platform(
      'cubic-bezier(0.4, 0.0, 1, 1)',       // Ease-in
      'cubic-bezier(0.4, 0.0, 1, 1)',
      'cubic-bezier(0.4, 0.0, 1, 1)'
    )
  },
  spring: platform(
    'cubic-bezier(0.175, 0.885, 0.32, 1.275)',  // iOS spring-like
    'cubic-bezier(0.4, 0.0, 0.2, 1)',           // Android standard
    'cubic-bezier(0.4, 0.0, 0.2, 1)'            // Web standard
  )
}
```

**Animation Philosophy:**
- **iOS**: Spring animations, slightly slower for smoothness
- **Android**: Material motion specs (faster, snappier)
- **Web**: Similar to Android for responsiveness

### 7. Interaction Tokens

Platform-specific interaction patterns:

```typescript
platformInteraction = {
  haptics: platform(true, true, false),        // Mobile only
  ripple: platform(false, true, false),        // Material Design only
  blur: platform(true, false, true),           // iOS/Web support
  activeOpacity: platform(0.6, 0.7, 0.8),
  pressScale: platform(0.95, 1.0, 0.98)        // Android no scale
}
```

**Interaction Patterns:**
- **iOS**: Haptics, blur, scale feedback
- **Android**: Haptics, ripple effect, no scale
- **Web**: Visual feedback only

## 🔧 Usage Examples

### Basic Usage

```typescript
import { getPlatformValue, platformRadii } from '@/design-system/tokens';

// Get value for current platform
const currentPlatform = detectPlatform(); // 'ios' | 'android' | 'web'
const radius = getPlatformValue(platformRadii.button, currentPlatform);
```

### In Components

```typescript
import { platformTokens } from '@/design-system/tokens';

const Button = styled.button`
  border-radius: ${getPlatformValue(platformTokens.radii.button)}px;
  height: ${getPlatformValue(platformTokens.dimensions.touchTarget)}px;
  box-shadow: ${getPlatformValue(platformTokens.elevation.button)};
`;
```

### With React Native

```typescript
import { Platform } from 'react-native';
import { platformTokens, getPlatformValue } from '@/design-system/tokens';

const styles = StyleSheet.create({
  button: {
    borderRadius: getPlatformValue(platformTokens.radii.button, Platform.OS),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
```

### Dynamic Platform Switching

```typescript
function TabBar() {
  const platform = detectPlatform();
  const height = getPlatformValue(platformTokens.dimensions.tabBarHeight, platform);
  const padding = getPlatformValue(platformTokens.spacing.tabBarPadding, platform);
  const itemRadius = getPlatformValue(platformTokens.radii.tabBarItem, platform);

  return (
    <div style={{ height, padding }}>
      <TabItem style={{ borderRadius: itemRadius }} />
    </div>
  );
}
```

## 🧪 Testing

The platform token system includes 50+ comprehensive tests covering:

- ✅ Token creation and structure
- ✅ Platform value resolution
- ✅ Platform detection
- ✅ All token categories (spacing, radii, typography, etc.)
- ✅ Type safety
- ✅ Edge cases
- ✅ Real-world usage patterns

Run tests:
```bash
npm test -- platformTokens.test.ts
```

## 🎨 Integration with Component Tokens

Platform tokens are integrated into the component token layer:

```typescript
componentTokens = {
  button: {
    // Static values
    height: { xs: 24, sm: 32, md: 40 },

    // Platform-specific overrides
    borderRadius: platformTokens.radii.button,
    touchTarget: platformTokens.dimensions.touchTarget,
    typography: platformTokens.typography.button,
    elevation: platformTokens.elevation.button,
    pressScale: platformTokens.interaction.pressScale
  },

  tabBar: {
    height: platformTokens.dimensions.tabBarHeight,
    labelSize: platformTokens.typography.tabBarLabel.size,
    padding: platformTokens.spacing.tabBarPadding,
    itemBorderRadius: platformTokens.radii.tabBarItem
  }
}
```

## 📱 Platform Detection

The system includes automatic platform detection:

```typescript
export function detectPlatform(): Platform {
  // In React Native environment
  if (navigator.product === 'ReactNative') {
    return Platform.OS; // 'ios' or 'android'
  }

  // Default to web
  return 'web';
}
```

For React Native apps, use:
```typescript
import { Platform } from 'react-native';

const currentPlatform = Platform.OS as 'ios' | 'android';
```

## 🎯 Design Principles

### 1. **Respect Platform Conventions**
Each platform has established design guidelines:
- iOS: Apple Human Interface Guidelines
- Android: Material Design
- Web: WCAG and web standards

### 2. **Maintain Consistency**
Platform differences should enhance UX, not fragment it:
- Same semantic meaning
- Similar visual hierarchy
- Consistent component behavior

### 3. **Performance First**
Platform-specific values enable performance optimizations:
- Native-feeling animations
- Appropriate touch targets
- Platform-specific features (blur, ripple)

### 4. **Accessibility**
All platforms meet or exceed accessibility standards:
- WCAG 2.1 AA compliance (web)
- Apple Accessibility Guidelines (iOS)
- Material Accessibility (Android)

## 📚 Reference

### Token Coverage

| Category | iOS | Android | Web |
|----------|-----|---------|-----|
| Spacing | ✅ | ✅ | ✅ |
| Border Radius | ✅ | ✅ | ✅ |
| Typography | ✅ | ✅ | ✅ |
| Dimensions | ✅ | ✅ | ✅ |
| Elevation | ✅ | ✅ | ✅ |
| Animation | ✅ | ✅ | ✅ |
| Interaction | ✅ | ✅ | ✅ |

### API Reference

```typescript
// Create platform token
platform<T>(ios: T, android: T, web: T): PlatformToken<T>
platform<T>(value: T): PlatformToken<T>

// Get platform value
getPlatformValue<T>(token: PlatformToken<T>, platform?: Platform): T

// Detect platform
detectPlatform(): Platform

// Types
type Platform = 'ios' | 'android' | 'web'
interface PlatformToken<T> {
  ios: T;
  android: T;
  web: T;
}
```

## 🚀 Benefits

1. **Single Codebase**: Write once, adapts to all platforms
2. **Native Feel**: Components feel native to each platform
3. **Maintainable**: Centralized platform-specific logic
4. **Type-Safe**: Full TypeScript support
5. **Testable**: Comprehensive test coverage
6. **Performant**: Platform-optimized values

## 📖 Next Steps

- **Component Migration**: Update components to use platform tokens
- **Tamagui Integration**: Map platform tokens to Tamagui
- **Documentation**: Add usage examples for each component
- **Storybook**: Add platform switcher for component previews

---

**Status**: ✅ Complete
**Tests**: 50/50 passing
**Coverage**: 100%
**Version**: 1.0.0
