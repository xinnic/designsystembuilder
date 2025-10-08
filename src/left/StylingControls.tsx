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
  Sparkles
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function StylingControls() {
  const { opts, setOpts, haptics, setHaptics, tokens } = useDesignSystem();
  const [open, setOpen] = React.useState(true);
  const [logoDescription, setLogoDescription] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
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