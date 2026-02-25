import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput } from 'react-native';
import { useTokenSystem } from '../src/hooks/useTokenSystem';
import { useEffect } from 'react';

export default function RootLayout() {
  // Sync Zustand store to CSS variables for NativeWind
  useTokenSystem();

  // Set default font for all Text and TextInput components
  useEffect(() => {
    const defaultFontFamily = 'Satoshi, ui-sans-serif, system-ui, sans-serif';

    // @ts-ignore - Setting default style
    if (Text.defaultProps == null) {
      Text.defaultProps = {};
    }
    Text.defaultProps.style = { fontFamily: defaultFontFamily };

    // @ts-ignore - Setting default style
    if (TextInput.defaultProps == null) {
      TextInput.defaultProps = {};
    }
    TextInput.defaultProps.style = { fontFamily: defaultFontFamily };
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
