import { styled, XStack as TamaguiXStack, YStack as TamaguiYStack, Stack as TamaguiStack } from 'tamagui';

/**
 * XStack - Horizontal stack layout component
 * Ensures proper flexDirection: 'row' for React Native Web
 */
export const XStack = styled(TamaguiXStack, {
  name: 'XStack',
  flexDirection: 'row',
  display: 'flex',
});

/**
 * YStack - Vertical stack layout component
 * Ensures proper flexDirection: 'column' for React Native Web
 */
export const YStack = styled(TamaguiYStack, {
  name: 'YStack',
  flexDirection: 'column',
  display: 'flex',
});

/**
 * Stack - Base stack layout component
 */
export const Stack = TamaguiStack;