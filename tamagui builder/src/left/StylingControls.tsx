import React from 'react';
import { useDesignSystem } from '../state/designSystem';
import type { TechStack } from '../state/designSystem';
import { Upload, Sparkles, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { YStack, XStack, Input, useTheme } from 'tamagui';
import { Body, Caption } from '@/design-system/components/Text';
import { Button } from '@/design-system/components/Button';

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
          <XStack gap="$3" alignItems="center">
            <Sparkles size={18} color={theme.color.val} />
            <Body fontWeight="600" margin={0}>Logo</Body>
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
          <YStack gap="$3" paddingTop="$3">
            {/* Upload Logo — a real Button with the file input laid over it */}
            <XStack position="relative">
              <Button variant="secondary" size="medium" fullWidth gap="$2">
                <Upload size={16} />
                <Caption color="$brand" fontWeight="600">Upload Logo</Caption>
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                aria-label="Upload logo"
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
            <YStack gap="$2">
              <Input
                placeholder="Describe your app…"
                value={logoDescription}
                onChangeText={setLogoDescription}
                // Explicit height + body type: the old `size="$3"` left the
                // field shorter than its own placeholder, clipping the text.
                height={44}
                fontSize="$body"
                lineHeight="$body"
                paddingHorizontal="$4"
                borderWidth="var(--input-border-width, 1px)"
                borderColor="$borderColor"
                borderRadius="$input"
                backgroundColor="$bgSecondary"
                color="$color"
                placeholderTextColor="$gray10"
                focusStyle={{ borderColor: '$brand' }}
              />
              <Button
                variant="primary"
                size="medium"
                fullWidth
                gap="$2"
                onPress={handleGenerateLogo}
                disabled={isGenerating}
              >
                <Sparkles size={16} color="white" />
                <Caption color="white" fontWeight="600">
                  {isGenerating ? 'Generating…' : 'Generate Logo'}
                </Caption>
              </Button>
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