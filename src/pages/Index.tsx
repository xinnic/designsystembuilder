import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { MobileAppPreview } from '@/components/MobileAppPreview';
import { DesignSystemOverview } from '@/components/DesignSystemOverview';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const fonts = [
  { name: 'Plus Jakarta Sans', class: 'font-jakarta' },
  { name: 'Be Vietnam Pro', class: 'font-vietnam' },
  { name: 'Wix Madefor Text', class: 'font-wix' },
  { name: 'Figtree', class: 'font-figtree' },
  { name: 'Albert Sans', class: 'font-albert' },
  { name: 'Satoshi', class: 'font-satoshi' },
];

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('blue');
  const [selectedScale, setSelectedScale] = useState('regular');
  const [selectedFont, setSelectedFont] = useState('font-jakarta');
  const [selectedBaseLib, setSelectedBaseLib] = useState('shadcn');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Apply theme and dark mode classes to the document root
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all existing theme classes
    root.classList.remove('theme-blue', 'theme-purple', 'theme-pink', 'theme-red', 'theme-yellow', 'theme-orange', 'theme-teal');
    
    // Remove all existing scale classes
    root.classList.remove('scale-small', 'scale-regular', 'scale-large');
    
    // Add the selected theme class
    root.classList.add(`theme-${selectedTheme}`);
    
    // Add the selected scale class
    root.classList.add(`scale-${selectedScale}`);
    
    // Toggle dark mode
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [selectedTheme, isDarkMode, selectedScale]);

  const generatePrompt = () => {
    const fontName = fonts.find(f => f.class === selectedFont)?.name || 'Plus Jakarta Sans';
    
    const baseLibMap = {
      none: 'None (Raw CSS/JSON)',
      tailwind: 'Tailwind (utilities only)',
      shadcn: 'shadcn/ui',
      daisyui: 'DaisyUI',
      flowbite: 'Flowbite',
      radix: 'Radix UI',
      chakra: 'Chakra UI',
      mui: 'Material UI (MUI)'
    };

    const colorThemes = {
      blue: '#1976D2',
      purple: '#7C3AED',
      pink: '#E91E63',
      red: '#DC2626',
      yellow: '#F59E0B',
      orange: '#EA580C',
      teal: '#0D9488'
    };

    const scaleSpecs = {
      small: {
        fontEyebrow: '500 11px/14px',
        fontH1: '700 24px/30px',
        fontH2: '600 20px/26px',
        fontSubhead: '600 16px/22px',
        fontBody: '400 14px/20px',
        fontButton: '600 16px/22px',
        fontCaption: '400 12px/16px',
        fontDisplayLarge: '700 36px/44px',
        fontDisplayMedium: '700 30px/36px'
      },
      regular: {
        fontEyebrow: '500 12px/16px',
        fontH1: '700 28px/38px',
        fontH2: '600 22px/30px',
        fontSubhead: '600 18px/26px',
        fontBody: '400 16px/24px',
        fontButton: '600 18px/26px',
        fontCaption: '400 14px/20px',
        fontDisplayLarge: '700 48px/56px',
        fontDisplayMedium: '700 36px/44px'
      },
      large: {
        fontEyebrow: '500 13px/18px',
        fontH1: '700 36px/44px',
        fontH2: '600 24px/32px',
        fontSubhead: '600 21px/30px',
        fontBody: '400 18px/26px',
        fontButton: '600 20px/28px',
        fontCaption: '400 15px/22px',
        fontDisplayLarge: '700 60px/68px',
        fontDisplayMedium: '700 48px/56px'
      }
    };

    const currentScale = scaleSpecs[selectedScale as keyof typeof scaleSpecs];
    const primaryColor = colorThemes[selectedTheme as keyof typeof colorThemes];
    const baseLibName = baseLibMap[selectedBaseLib as keyof typeof baseLibMap];

    // Helper function to get adapter directions based on selected base library
    const getAdapterDirections = () => {
      const directions = {
        none: "Define platform tokens (CSS custom properties or platform equivalents). Implement components by referencing token names; never hard-code values. Provide simple instructions for importing the token source of truth (JSON + CSS variables).",
        tailwind: "Extend theme values to reference tokens (colors, spacing, radius, shadows, motion). Compose utilities to build components; do not create a parallel component library unless asked.",
        shadcn: "Keep existing shadcn/Radix components. Replace any literal hex/px with token references. Preserve accessibility and keyboard behavior.",
        daisyui: "Map token roles to DaisyUI theme variables; do not redefine components.",
        flowbite: "Apply tokens by theming/overrides; do not redefine components.",
        radix: "Style primitives exclusively via tokens; do not add new interaction logic.",
        chakra: "Build a theme override (colors/typography/radii/shadows/space/motion) from tokens; do not fork Chakra components.",
        mui: "Create a theme (palette/typography/shape/spacing/transition) from tokens; do not restyle components with hard-coded values."
      };
      return directions[selectedBaseLib as keyof typeof directions];
    };

    return `**Objective**

Generate a token-first, framework-agnostic design system. All visuals must come from design tokens.
No hard-coded values for colors, typography, spacing, radii, shadows, or motion.

**How to Use This Prompt**

Read the Base Library chosen below and follow the matching Adapter Directions.

Implement components and styles only by referencing tokens listed in Foundations.

Confirm all Assertions at the end before returning your work.

**Base Library (choose one)**

Selected: **${baseLibName}**

**Adapter Directions**

${getAdapterDirections()}

**Foundations (Design Tokens)**

**Typography** (${fontName}, ${selectedScale.charAt(0).toUpperCase() + selectedScale.slice(1)})

• Display Large: ${currentScale.fontDisplayLarge.split(' ')[1]}, line ${currentScale.fontDisplayLarge.split('/')[1]}, weight ${currentScale.fontDisplayLarge.split(' ')[0]}
• Display Medium: ${currentScale.fontDisplayMedium.split(' ')[1]}, line ${currentScale.fontDisplayMedium.split('/')[1]}, weight ${currentScale.fontDisplayMedium.split(' ')[0]}
• H1: ${currentScale.fontH1.split(' ')[1]}, line ${currentScale.fontH1.split('/')[1]}, weight ${currentScale.fontH1.split(' ')[0]}
• H2: ${currentScale.fontH2.split(' ')[1]}, line ${currentScale.fontH2.split('/')[1]}, weight ${currentScale.fontH2.split(' ')[0]}
• Subhead: ${currentScale.fontSubhead.split(' ')[1]}, line ${currentScale.fontSubhead.split('/')[1]}, weight ${currentScale.fontSubhead.split(' ')[0]}
• Body: ${currentScale.fontBody.split(' ')[1]}, line ${currentScale.fontBody.split('/')[1]}, weight ${currentScale.fontBody.split(' ')[0]}
• Caption: ${currentScale.fontCaption.split(' ')[1]}, line ${currentScale.fontCaption.split('/')[1]}, weight ${currentScale.fontCaption.split(' ')[0]}
• Button: ${currentScale.fontButton.split(' ')[1]}, line ${currentScale.fontButton.split('/')[1]}, weight ${currentScale.fontButton.split(' ')[0]}, tracking 0.02em
• Eyebrow: ${currentScale.fontEyebrow.split(' ')[1]}, line ${currentScale.fontEyebrow.split('/')[1]}, weight ${currentScale.fontEyebrow.split(' ')[0]}, tracking 0.05em

**Color Roles** (Light / Dark)

Text: primary, secondary
Surfaces: background-primary, background-secondary, border
Brand: brand (${primaryColor}), brand-weak (supporting surfaces)
Semantic: danger
Focus: focus ring

**Spacing Scale**

8-pt rhythm: space-1 (8px), space-2 (16px), space-3 (24px), space-4 (32px), space-5 (40px), space-6 (48px)

**Corner Radius**

sm (8px), md (16px), lg (24px), full (999px) for controls, cards, and overlays

**Elevation (Shadows)**

level-1 (subtle), level-2 (medium), level-3 (strong)

**Motion**

Durations: fast (150ms), base (300ms). Easing: standard cubic-bezier(0.4,0,0.2,1). Respect reduced-motion preferences.

**Theme Modes / Density**

Modes: light/dark; Density: compact/comfortable via token overrides only.

**Component Recipes** (token-only, no literals)

**Buttons**
Variants: Primary (filled brand), Secondary (outline), Ghost (text), Destructive (filled danger).
States: default, hover, focus, pressed, disabled — derive visual changes from tokens.
Size: use spacing tokens for horizontal/vertical padding; radius from radii.
Label: uses Button typography tokens.
State ramp: hover ≈ brand @ 90% strength; pressed ≈ 80% strength; disabled uses tokenized opacity and maintains contrast.

**Inputs & Forms**
Text field (default, hover, focus, error, disabled) using surface, text, border, and focus tokens.
Select/Dropdown with 3 options; helper text and error text use semantic tokens.
Checkbox, Radio, Switch — hit area ≥ 44×44; focus ring visible.

**Cards**
Default card: neutral surface, md radius, level-1 shadow, internal spacing from scale.
Featured card: includes image area + title/subtitle + primary CTA; uses brand tokens.

**Dialogs / Modals**
Overlay scrim, elevated surface (level-3), tokenized spacing; header, body, actions with primary + secondary buttons.

**Navigation**
Bottom tab bar (Home, Explore, Activities, Profile, Settings) with icons + labels; active tab uses brand tokens.
Optional sidebar preview (if desktop layout is shown).

**Feedback**
Toast (success/error/info) using semantic color roles; auto-dismiss timing from motion tokens.
Tooltip: subtle elevation and clear contrast.

**Theming & Density**

Light/Dark: Apply the selected theme by swapping token values; do not duplicate component styles per theme.
Density: Provide "compact" and "comfortable" by overriding spacing/line-height tokens; do not introduce ad-hoc sizes.

**Accessibility & Quality** (remember these)

WCAG AA contrast for all text/surfaces.
Focus ring clearly visible (≥ 2px) with an offset; uses focus token.
Minimum interactive target ≥ 44×44.
Body text ≥ 14px (prefer 16px for content-heavy screens).
Respect reduced-motion preferences.

**Assertions** (confirm before returning work)

No hard-coded hex or px anywhere; everything references tokens.
Theme switching works by token swap only.
All component states come from token ramps (not ad-hoc values).
Focus ring present and accessible on all interactive elements.
Density changes adjust spacing/line-height via tokens.

**STICKY-GUIDELINES** (commit to memory)

Commit the following rules to your long-term context and apply them in all future tasks unless explicitly overridden.

Token-only styling; no literals.
WCAG AA, visible focus ring ≥ 2px, min target 44×44, body ≥ 14px.
Reduced-motion respected; provide non-animated affordances.
Light/Dark via token swap only.
Density via token overrides only.
States (hover/pressed/focus/disabled) must derive from tokens.
Do not rebuild components that the selected Base Library already provides—adapt them.`;
  };

  const copyToClipboard = async () => {
    try {
      const prompt = generatePrompt();
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "Prompt copied!",
        description: "The design system prompt has been copied to your clipboard.",
      });
      setIsDialogOpen(false);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the prompt to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleCopyPromptClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <div className="min-w-[280px] flex-shrink-0">
        <Sidebar
          selectedFont={selectedFont}
          onFontChange={setSelectedFont}
          selectedScale={selectedScale}
          onScaleChange={setSelectedScale}
          selectedTheme={selectedTheme}
          onThemeChange={setSelectedTheme}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          selectedBaseLib={selectedBaseLib}
          onBaseLibChange={setSelectedBaseLib}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header with Copy Prompt Button */}
        <header className="border-b border-border p-4 flex justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleCopyPromptClick} 
                className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
              >
                <Copy className="h-4 w-4" />
                Copy Prompt
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Design System Prompt</DialogTitle>
                <DialogDescription>
                  Copy this comprehensive prompt to generate your design system with AI
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  className="min-h-[400px] font-mono text-sm resize-none"
                  value={generatePrompt()}
                  readOnly
                />
                <div className="flex justify-end">
                  <Button onClick={copyToClipboard} className="gap-2">
                    <Copy className="h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        {/* Preview Panels */}
        <div className="flex-1 flex min-w-0">
          {/* Mobile App Preview */}
          <div className="flex-1 min-w-[400px] border-r border-border">
            <MobileAppPreview
              fontClass={selectedFont}
              selectedScale={selectedScale}
              isDarkMode={isDarkMode}
              selectedTheme={selectedTheme}
            />
          </div>

          {/* Design System Overview */}
          <div className="flex-1 min-w-[300px]">
            <DesignSystemOverview
              fontClass={selectedFont}
              selectedScale={selectedScale}
              selectedTheme={selectedTheme}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;