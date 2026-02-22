import { View, Text, Pressable, ScrollView } from 'react-native';
import { useDesignSystem } from '../src/state/designSystem';

export default function TestTokensScreen() {
  const {
    customPrimaryColor,
    customAccentColor,
    isDarkMode,
    setDarkMode,
    cornerRadius,
    selectedPrimaryFont,
    selectedDisplayFont,
  } = useDesignSystem();

  return (
    <ScrollView className="flex-1 bg-surface">
      <View className="p-6 gap-6">
        <Text className="text-3xl font-bold text-on-surface">
          Token System Test
        </Text>

        {/* State Display */}
        <View className="bg-surface-secondary p-4 rounded-lg gap-2">
          <Text className="text-sm font-semibold text-on-surface">Current State:</Text>
          <Text className="text-xs text-on-surface-secondary">Primary: {customPrimaryColor}</Text>
          <Text className="text-xs text-on-surface-secondary">Accent: {customAccentColor}</Text>
          <Text className="text-xs text-on-surface-secondary">Mode: {isDarkMode ? 'Dark' : 'Light'}</Text>
          <Text className="text-xs text-on-surface-secondary">Corner: {cornerRadius}</Text>
          <Text className="text-xs text-on-surface-secondary">Font: {selectedPrimaryFont}</Text>
        </View>

        {/* Color Scale Test */}
        <View className="gap-2">
          <Text className="text-base font-semibold text-on-surface">Brand Scale:</Text>
          <View className="flex-row gap-1">
            <View className="w-8 h-8 bg-brand-50 rounded" />
            <View className="w-8 h-8 bg-brand-100 rounded" />
            <View className="w-8 h-8 bg-brand-200 rounded" />
            <View className="w-8 h-8 bg-brand-300 rounded" />
            <View className="w-8 h-8 bg-brand-400 rounded" />
            <View className="w-8 h-8 bg-brand-500 rounded" />
            <View className="w-8 h-8 bg-brand-600 rounded" />
            <View className="w-8 h-8 bg-brand-700 rounded" />
            <View className="w-8 h-8 bg-brand-800 rounded" />
            <View className="w-8 h-8 bg-brand-900 rounded" />
            <View className="w-8 h-8 bg-brand-950 rounded" />
          </View>
        </View>

        {/* Semantic Colors Test */}
        <View className="gap-2">
          <Text className="text-base font-semibold text-on-surface">Semantic Colors:</Text>
          <View className="gap-2">
            <View className="bg-surface p-3 rounded border border-border">
              <Text className="text-on-surface">Surface + Border</Text>
            </View>
            <View className="bg-surface-secondary p-3 rounded">
              <Text className="text-on-surface">Surface Secondary</Text>
            </View>
            <View className="bg-surface-tertiary p-3 rounded">
              <Text className="text-on-surface">Surface Tertiary</Text>
            </View>
          </View>
        </View>

        {/* Border Radius Test */}
        <View className="gap-2">
          <Text className="text-base font-semibold text-on-surface">Border Radius:</Text>
          <View className="flex-row gap-2">
            <View className="bg-brand-500 w-12 h-12 rounded-sm" />
            <View className="bg-brand-500 w-12 h-12 rounded-md" />
            <View className="bg-brand-500 w-12 h-12 rounded-lg" />
            <View className="bg-brand-500 w-12 h-12 rounded-xl" />
          </View>
        </View>

        {/* Interactive Test */}
        <Pressable
          className="bg-brand px-6 py-3 rounded-md active:scale-[0.97]"
          onPress={() => setDarkMode(!isDarkMode)}
        >
          <Text className="text-white font-semibold text-center">
            Toggle Dark Mode
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
