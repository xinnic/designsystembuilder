import React from 'react';
import { useDesignSystem } from '../state/designSystem';
import type { TechStack } from '../state/designSystem';
import { Upload, Sparkles, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { YStack, XStack, Text, Input, useTheme } from 'tamagui';

export default function StylingControls() {
  const { opts, setOpts, tokens, setTokens } = useDesignSystem();
  const [logoDescription, setLogoDescription] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const { toast } = useToast();
  const theme = useTheme();

  const stackOptions: { value: TechStack; label: string }[] = [
    { value: 'web-react', label: 'Web/React' },
    { value: 'react-native-expo', label: 'React Native (Expo)' },
    { value: 'ios-swiftui', label: 'iOS SwiftUI' },
    { value: 'android-compose', label: 'Android Compose' },
    { value: 'flutter', label: 'Flutter' }
  ];

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setOpts({ logo: result });
      toast({
        title: "Logo uploaded",
        description: "Your logo has been set successfully"
      });
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateLogo = async () => {
    if (!logoDescription.trim()) {
      toast({
        title: "Description required",
        description: "Please describe your app to generate a logo",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Convert RGB string to hex for the AI prompt
      const rgbToHex = (rgb: string) => {
        const [r, g, b] = rgb.split(' ').map(n => parseInt(n));
        return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
      };

      const primaryColor = rgbToHex(tokens.brand);
      const accentColor = rgbToHex(tokens.info);

      const { data, error } = await supabase.functions.invoke('generate-logo', {
        body: {
          description: logoDescription,
          primaryColor,
          accentColor
        }
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setOpts({ logo: data.imageUrl });
        toast({
          title: "Logo generated",
          description: "Your AI-generated logo is ready!"
        });
        setLogoDescription('');
      }
    } catch (error) {
      console.error('Error generating logo:', error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate logo",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const [logoOpen, setLogoOpen] = React.useState(true);

  return (
    <YStack space="$4">
      {/* Logo Section */}
      <YStack>
        <XStack
          onPress={() => setLogoOpen(!logoOpen)}
          padding="$3"
          borderRadius="$3"
          borderWidth={1}
          borderColor="$borderColor"
          backgroundColor="transparent"
          hoverStyle={{ backgroundColor: '$gray4' }}
          alignItems="center"
          justifyContent="space-between"
          pressStyle={{ opacity: 0.7 }}
          cursor="pointer"
        >
          <XStack space="$3" alignItems="center">
            <Sparkles size={20} color={theme.color.val} />
            <Text size="$3" fontWeight="500" color="$color">Logo</Text>
          </XStack>
          <ChevronDown
            size={16}
            color={theme.color.val}
            style={{
              transition: 'transform 0.2s',
              transform: logoOpen ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
          />
        </XStack>
        
        {logoOpen && (
          <YStack space="$3" padding="$3">
            {/* Upload Logo Button */}
            <XStack
              position="relative"
              alignItems="center"
              justifyContent="center"
              gap="$2"
              padding="$3"
              borderRadius="$3"
              borderWidth={1}
              borderColor="$borderColor"
              backgroundColor="$background"
              hoverStyle={{ backgroundColor: '$gray3' }}
              cursor="pointer"
            >
              <Upload size={16} color={theme.color.val} />
              <Text size="$3" color="$color">Upload Logo</Text>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer'
                }}
              />
            </XStack>

            {/* Generate Logo Section */}
            <YStack space="$2">
              <Input
                placeholder="Describe your app..."
                value={logoDescription}
                onChangeText={setLogoDescription}
                size="$3"
                borderWidth={1}
                borderColor="$borderColor"
                borderRadius="$3"
                backgroundColor="$background"
                color="$color"
                placeholderTextColor="$gray10"
              />
              <XStack
                alignItems="center"
                justifyContent="center"
                gap="$2"
                padding="$3"
                borderRadius="$3"
                borderWidth={1}
                borderColor="$blue9"
                backgroundColor="$blue2"
                hoverStyle={{ backgroundColor: '$blue3' }}
                pressStyle={{ opacity: 0.7 }}
                onPress={handleGenerateLogo}
                cursor="pointer"
                opacity={isGenerating ? 0.5 : 1}
                pointerEvents={isGenerating ? 'none' : 'auto'}
              >
                <Sparkles size={16} color={theme.blue9.val} />
                <Text size="$3" color="$blue11" fontWeight="500">
                  {isGenerating ? 'Generating...' : 'Generate Logo'}
                </Text>
              </XStack>
            </YStack>

            {/* Logo Preview */}
            {opts.logo && (
              <XStack
                justifyContent="center"
                padding="$4"
                borderWidth={1}
                borderColor="$borderColor"
                borderRadius="$3"
                backgroundColor="$gray2"
              >
                <YStack
                  width={80}
                  height={80}
                  borderRadius="$round"
                  backgroundColor="$background"
                  alignItems="center"
                  justifyContent="center"
                  overflow="hidden"
                >
                  <img
                    src={opts.logo}
                    alt="App logo"
                    style={{
                      width: '64px',
                      height: '64px',
                      objectFit: 'contain'
                    }}
                  />
                </YStack>
              </XStack>
            )}
          </YStack>
        )}
      </YStack>
    </YStack>
  );
}