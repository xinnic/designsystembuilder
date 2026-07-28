import React from 'react';
import { useDesignSystem } from '../../state/designSystem';
import { playHaptic } from '../../platform/haptics';
import type { TechStack } from '../../state/designSystem';
import './HapticsPreview.css';

export default function HapticsPreview() {
  const { haptics, setHaptics } = useDesignSystem();

  const stackOptions: { value: TechStack; label: string }[] = [
    { value: 'web-react', label: 'Web/React' },
    { value: 'react-native-expo', label: 'React Native (Expo)' },
    { value: 'ios-swiftui', label: 'iOS SwiftUI' },
    { value: 'android-compose', label: 'Android Compose' },
    { value: 'flutter', label: 'Flutter' }
  ];

  return (
    <div className="haptics-preview">
      <div className="haptics-controls">
        <div className="haptics-toggle">
          <label className="haptics-checkbox">
            <input
              type="checkbox"
              checked={haptics.enabled}
              onChange={(e) => setHaptics({ enabled: e.target.checked })}
            />
            <span>Enable haptics</span>
          </label>
        </div>

        <div className="haptics-field">
          <label className="haptics-field-label" htmlFor="haptics-stack">
            Platform / Stack
          </label>
          <div className="haptics-select">
            <select
              id="haptics-stack"
              value={haptics.stack}
              onChange={(e) => setHaptics({ stack: e.target.value as TechStack })}
            >
              {stackOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="haptics-test-buttons">
        <button
          className="haptics-test-button haptics-light"
          onClick={() => playHaptic('light')}
          disabled={!haptics.enabled}
        >
          Play Light (Menu Tap)
        </button>
        <button
          className="haptics-test-button haptics-medium"
          onClick={() => playHaptic('medium')}
          disabled={!haptics.enabled}
        >
          Play Medium (Primary Action)
        </button>
        <button
          className="haptics-test-button haptics-success"
          onClick={() => playHaptic('success')}
          disabled={!haptics.enabled}
        >
          Play Success
        </button>
        <button
          className="haptics-test-button haptics-error"
          onClick={() => playHaptic('error')}
          disabled={!haptics.enabled}
        >
          Play Error
        </button>
      </div>

      <p className="haptics-note">
        If unsupported (e.g., many desktop browsers), this becomes a no-op.
      </p>
    </div>
  );
}