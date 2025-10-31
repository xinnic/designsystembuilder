/**
 * Design System
 *
 * Complete React Native design system built on Tamagui.
 * All components are styled with design tokens and support theme changes.
 *
 * Architecture:
 * - Tokens: CSS variables bridged to Tamagui tokens
 * - Components: Basic styled primitives (Button, Text, Card, etc.)
 * - Bespoke: App-specific compositions (AppBar, UserCard, etc.)
 */

// Re-export all components
export * from './components';
export * from './bespoke';

// Re-export Tamagui primitives for custom layouts
export {
  YStack,
  XStack,
  ZStack,
  ScrollView,
  Stack,
  Circle,
  Square,
  Image,
} from 'tamagui';
