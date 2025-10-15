import React from 'react';
import { useDesignSystem } from '../state/designSystem';
import type { MenuLayout, BorderWeight, BorderTone, InputStyle, CardWidth, TechStack } from '../state/designSystem';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ChevronDown,
  Paintbrush,
  Navigation,
  Menu,
  Smartphone,
  Square,
  RectangleHorizontal,
  Circle,
  MoreHorizontal,
  Minus,
  CreditCard,
  Maximize,
  AlignLeft,
  Underline,
  Edit3,
  Vibrate,
  Upload,
  Sparkles,
  Layers,
  Cloud,
  Gamepad2,
  Flower2,
  Zap
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function StylingControls() {
  const { opts, setOpts, haptics, setHaptics, tokens } = useDesignSystem();
  const [open, setOpen] = React.useState(true);
  const [logoDescription, setLogoDescription] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [selectedStylePreset, setSelectedStylePreset] = React.useState('modern');
  const { toast } = useToast();

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

  const stylePresets = [
    {
      id: 'modern',
      name: 'Modern Flat',
      icon: Square,
      description: 'Clean, minimal shadows',
      styles: {
        shadows: { sm: '0 1px 3px rgba(0,0,0,0.05)', md: '0 4px 6px rgba(0,0,0,0.07)', lg: '0 10px 20px rgba(0,0,0,0.1)' },
        radii: { sm: '4px', md: '8px', lg: '12px' },
        borders: { width: '0px' }
      }
    },
    {
      id: 'glass',
      name: 'Glassmorphism',
      icon: Layers,
      description: 'Frosted glass effects',
      styles: {
        shadows: { sm: '0 4px 6px rgba(0,0,0,0.1)', md: '0 8px 16px rgba(0,0,0,0.15)', lg: '0 20px 40px rgba(0,0,0,0.2)' },
        radii: { sm: '8px', md: '12px', lg: '20px' },
        borders: { width: '1px' },
        effects: { backdropBlur: '8px', opacity: '0.9' }
      }
    },
    {
      id: 'playful',
      name: 'Playful',
      icon: Gamepad2,
      description: 'Bold, colorful shadows',
      styles: {
        shadows: { sm: '2px 2px 0 #000', md: '4px 4px 0 #000', lg: '8px 8px 0 #000' },
        radii: { sm: '12px', md: '20px', lg: '32px' },
        borders: { width: '3px' }
      }
    },
    {
      id: 'dreamy',
      name: 'Soft & Dreamy',
      icon: Cloud,
      description: 'Gentle, diffused look',
      styles: {
        shadows: { sm: '0 4px 12px rgba(0,0,0,0.08)', md: '0 8px 24px rgba(0,0,0,0.12)', lg: '0 16px 48px rgba(0,0,0,0.16)' },
        radii: { sm: '16px', md: '24px', lg: '32px' },
        borders: { width: '0px' }
      }
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      icon: Minus,
      description: 'No shadows, thin borders',
      styles: {
        shadows: { sm: 'none', md: 'none', lg: 'none' },
        radii: { sm: '0px', md: '0px', lg: '0px' },
        borders: { width: '1px' }
      }
    }
  ];

  const handleStylePresetChange = (presetId: string) => {
    setSelectedStylePreset(presetId);
    const preset = stylePresets.find(p => p.id === presetId);
    if (preset) {
      // Apply the preset styles
      const root = document.documentElement;

      // Apply shadow tokens
      root.style.setProperty('--shadow-sm', preset.styles.shadows.sm);
      root.style.setProperty('--shadow-md', preset.styles.shadows.md);
      root.style.setProperty('--shadow-lg', preset.styles.shadows.lg);

      // Apply radius tokens
      root.style.setProperty('--radius-sm', preset.styles.radii.sm);
      root.style.setProperty('--radius-md', preset.styles.radii.md);
      root.style.setProperty('--radius-lg', preset.styles.radii.lg);

      // Apply border tokens
      root.style.setProperty('--border-width', preset.styles.borders.width);

      // Apply effects if they exist
      if (preset.styles.effects) {
        root.style.setProperty('--effect-backdrop-blur', preset.styles.effects.backdropBlur || '0px');
        root.style.setProperty('--effect-opacity', preset.styles.effects.opacity || '1');
      }

      toast({
        title: `Applied ${preset.name}`,
        description: preset.description,
      });
    }
  };

  return (
    <>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted">
          <div className="flex items-center gap-3">
            <Paintbrush className="h-5 w-5" />
            <span className="font-medium">Component Styling</span>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 p-3">

        {/* Style Presets */}
        <div>
          <label className="text-sm font-medium mb-2 block">Style Preset</label>
          <div className="grid grid-cols-3 gap-2">
            {stylePresets.map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.id}
                  className={`p-3 text-sm rounded border flex flex-col items-center gap-2 transition-all ${
                    selectedStylePreset === preset.id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => handleStylePresetChange(preset.id)}
                  title={preset.description}
                >
                  <Icon size={20} />
                  <span className="text-xs text-center leading-tight">{preset.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Layout */}
        <div>
          <label className="text-sm font-medium mb-2 block">Menu Layout</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`p-3 text-sm rounded border flex flex-col items-center gap-2 ${
                opts.menuLayout === 'bottomBar'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:bg-muted'
              }`}
              onClick={() => setOpts({ menuLayout: 'bottomBar' })}
            >
              <Navigation size={16} />
              <span>Bottom Bar</span>
            </button>
            <button
              className={`p-3 text-sm rounded border flex flex-col items-center gap-2 ${
                opts.menuLayout === 'hamburger'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:bg-muted'
              }`}
              onClick={() => setOpts({ menuLayout: 'hamburger' })}
            >
              <Menu size={16} />
              <span>Hamburger</span>
            </button>
          </div>
        </div>

      </CollapsibleContent>
      </Collapsible>

      <Collapsible open={logoOpen} onOpenChange={setLogoOpen} className="mt-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">Logo</span>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${logoOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 p-3">
          <label className="flex items-center justify-center gap-2 p-3 rounded border border-border hover:bg-muted cursor-pointer text-sm">
            <Upload className="h-4 w-4" />
            <span>Upload Logo</span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Describe your app..."
              value={logoDescription}
              onChange={(e) => setLogoDescription(e.target.value)}
              className="w-full p-2 text-sm rounded border border-border bg-background text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={handleGenerateLogo}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 p-2 text-sm rounded border border-primary bg-primary/5 text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isGenerating ? 'Generating...' : 'Generate Logo'}</span>
            </button>
          </div>

          {opts.logo && (
            <div className="flex justify-center p-4 border border-border rounded-lg bg-muted/30">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
                <img 
                  src={opts.logo} 
                  alt="App logo" 
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}