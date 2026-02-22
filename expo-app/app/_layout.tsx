import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTokenSystem } from '../src/hooks/useTokenSystem';

export default function RootLayout() {
  // Sync Zustand store to CSS variables for NativeWind
  useTokenSystem();

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
