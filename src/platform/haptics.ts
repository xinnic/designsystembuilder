import { useDesignSystem } from '../state/designSystem';

export type HapticKind = 'light' | 'medium' | 'success' | 'error';

// Platform shim for haptic feedback
export function playHaptic(kind: HapticKind) {
  const { haptics } = useDesignSystem.getState();
  if (!haptics.enabled) return;

  switch (haptics.stack) {
    case 'web-react':
      return webHaptic(kind);
    case 'react-native-expo':
      return rnHaptic(kind);
    case 'ios-swiftui':
      return nativeHint('iOS uses UIFeedbackGenerator/CoreHaptics');
    case 'android-compose':
      return nativeHint('Android uses LocalHapticFeedback/Vibrator');
    case 'flutter':
      return nativeHint('Flutter uses HapticFeedback from services');
  }
}

function webHaptic(kind: HapticKind) {
  if (!navigator.vibrate) return; // not supported → no-op

  const map = {
    light: 10,
    medium: 25,
    success: [10, 0, 10],
    error: [30, 30, 30]
  } as const;

  navigator.vibrate(map[kind] as any);
}

function rnHaptic(kind: HapticKind) {
  // In web environment, just show console message - no dynamic imports
  console.info('[Haptics]', `React Native haptic: ${kind} (would use expo-haptics.${getHapticMethod(kind)})`);
}

function getHapticMethod(kind: HapticKind): string {
  switch (kind) {
    case 'light': return 'selectionAsync()';
    case 'medium': return 'impactAsync(ImpactFeedbackStyle.Medium)';
    case 'success': return 'notificationAsync(NotificationFeedbackType.Success)';
    case 'error': return 'notificationAsync(NotificationFeedbackType.Error)';
    default: return 'selectionAsync()';
  }
}

function nativeHint(msg: string) {
  console.info('[Haptics]', msg);
}