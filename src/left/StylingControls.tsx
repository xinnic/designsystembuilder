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
  const { opts, setOpts, haptics, setHaptics } = useDesignSystem();
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
      const { data, error } = await supabase.functions.invoke('generate-logo', {
        body: { description: logoDescription }
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

  return (
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

        {/* Card Borders */}
        <div>
          <label className="text-sm font-medium mb-2 block">Card Borders</label>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Weight</label>
              <div className="grid grid-cols-3 gap-1">
                <button
                  className={`p-2 text-xs rounded border flex flex-col items-center gap-1 ${
                    opts.cardBorderWeight === 'none'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setOpts({ cardBorderWeight: 'none' })}
                >
                  <Square size={12} fill="currentColor" stroke="none" />
                  <span>none</span>
                </button>
                <button
                  className={`p-2 text-xs rounded border flex flex-col items-center gap-1 ${
                    opts.cardBorderWeight === 'thin'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setOpts({ cardBorderWeight: 'thin' })}
                >
                  <Square size={12} strokeWidth={1} fill="none" />
                  <span>thin</span>
                </button>
                <button
                  className={`p-2 text-xs rounded border flex flex-col items-center gap-1 ${
                    opts.cardBorderWeight === 'thick'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setOpts({ cardBorderWeight: 'thick' })}
                >
                  <Square size={12} strokeWidth={2} fill="none" />
                  <span>thick</span>
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Tone</label>
              <div className="grid grid-cols-2 gap-1">
                {(['light', 'ultraLight'] as BorderTone[]).map((tone) => (
                  <button
                    key={tone}
                    className={`p-1 text-xs rounded border ${
                      opts.cardBorderTone === tone
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                    onClick={() => setOpts({ cardBorderTone: tone })}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Input Borders */}
        <div>
          <label className="text-sm font-medium mb-2 block">Input Borders</label>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Weight</label>
              <div className="grid grid-cols-3 gap-1">
                {(['none', 'thin', 'thick'] as BorderWeight[]).map((weight) => (
                  <button
                    key={weight}
                    className={`p-1 text-xs rounded border ${
                      opts.inputBorderWeight === weight
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                    onClick={() => setOpts({ inputBorderWeight: weight })}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Tone</label>
              <div className="grid grid-cols-2 gap-1">
                {(['light', 'ultraLight'] as BorderTone[]).map((tone) => (
                  <button
                    key={tone}
                    className={`p-1 text-xs rounded border ${
                      opts.inputBorderTone === tone
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                    onClick={() => setOpts({ inputBorderTone: tone })}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Input Style */}
        <div>
          <label className="text-sm font-medium mb-2 block">Input Style</label>
          <div className="grid grid-cols-2 gap-1">
            {(['filled', 'outlined', 'underline', 'none'] as InputStyle[]).map((style) => (
              <button
                key={style}
                className={`p-2 text-xs rounded border ${
                  opts.inputStyle === style
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:bg-muted'
                }`}
                onClick={() => setOpts({ inputStyle: style })}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Card Width */}
        <div>
          <label className="text-sm font-medium mb-2 block">Card Width</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`p-2 text-sm rounded border ${
                opts.cardWidth === 'full'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:bg-muted'
              }`}
              onClick={() => setOpts({ cardWidth: 'full' })}
            >
              Full
            </button>
            <button
              className={`p-2 text-sm rounded border ${
                opts.cardWidth === 'withMargins'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:bg-muted'
              }`}
              onClick={() => setOpts({ cardWidth: 'withMargins' })}
            >
              With Margins
            </button>
          </div>
        </div>

        {/* Logo */}
        <div>
          <label className="text-sm font-medium mb-2 block">Logo</label>
          
          {opts.logo && (
            <div className="mb-3 flex justify-center">
              <img 
                src={opts.logo} 
                alt="App logo" 
                className="w-20 h-20 object-contain rounded-lg border border-border"
              />
            </div>
          )}

          <div className="space-y-2">
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
          </div>
        </div>

        {/* Haptics */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Vibrate className="h-4 w-4" />
            <label className="text-sm font-medium">Haptics</label>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Enable</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={haptics.enabled}
                  onChange={(e) => setHaptics({ enabled: e.target.checked })}
                  className="w-3 h-3 accent-color: rgb(var(--color-brand))"
                />
              </label>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Platform</label>
              <select
                value={haptics.stack}
                onChange={(e) => setHaptics({ stack: e.target.value as TechStack })}
                className="w-full p-1 text-xs rounded border border-border bg-background text-foreground"
              >
                {stackOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs text-muted-foreground">
              Light = menu taps; Medium = primary actions. Uses platform-native APIs.
            </div>
          </div>
        </div>

      </CollapsibleContent>
    </Collapsible>
  );
}