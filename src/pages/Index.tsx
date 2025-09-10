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
        fontCaption: '400 12px/16px'
      },
      regular: {
        fontEyebrow: '500 12px/16px',
        fontH1: '700 28px/38px',
        fontH2: '600 22px/30px',
        fontSubhead: '600 18px/26px',
        fontBody: '400 16px/24px',
        fontButton: '600 18px/26px',
        fontCaption: '400 14px/20px'
      },
      large: {
        fontEyebrow: '500 13px/18px',
        fontH1: '700 36px/44px',
        fontH2: '600 24px/32px',
        fontSubhead: '600 21px/30px',
        fontBody: '400 18px/26px',
        fontButton: '600 20px/28px',
        fontCaption: '400 15px/22px'
      }
    };

    const currentScale = scaleSpecs[selectedScale as keyof typeof scaleSpecs];
    const primaryColor = colorThemes[selectedTheme as keyof typeof colorThemes];

    return `Objective: Implement a comprehensive, token-based design system for a modern application.

Core Philosophy: Token-First & Framework-Agnostic
You MUST implement all specified styles using design tokens. The primary output should be a set of CSS custom properties (variables) that can be used across any web framework. Do not use hard-coded values for colors, fonts, spacing, shadows, radii, or motion at any point.

1. Foundational Design Tokens

Generate CSS custom properties for the entire system. All subsequent components must reference these tokens.

1.1. Typography System (Font: ${fontName}, Scale: ${selectedScale.charAt(0).toUpperCase() + selectedScale.slice(1)})

--font-family-primary: '${fontName}', sans-serif
--font-eyebrow: ${currentScale.fontEyebrow} var(--font-family-primary)
--font-h1: ${currentScale.fontH1} var(--font-family-primary)
--font-h2: ${currentScale.fontH2} var(--font-family-primary)
--font-subhead: ${currentScale.fontSubhead} var(--font-family-primary)
--font-body: ${currentScale.fontBody} var(--font-family-primary)
--font-button: ${currentScale.fontButton} var(--font-family-primary)
--font-caption: ${currentScale.fontCaption} var(--font-family-primary)

1.2. Color System (Supports Light & Dark Themes)

Light Mode (default):
--color-text-primary: #1C1C1E
--color-text-secondary: #636366
--color-background-primary: #FFFFFF
--color-background-secondary: #F2F2F7
--color-brand-primary: ${primaryColor}
--color-brand-secondary: #E3F2FD
--color-destructive-primary: #D32F2F
--color-border-primary: #C6C6C8
--color-interactive-focus-ring: #4dabf5

Dark Mode (scoped under .dark-theme):
--color-text-primary: #FFFFFF
--color-text-secondary: #AEAEB2
--color-background-primary: #121212
--color-background-secondary: #1C1C1E
--color-brand-primary: #64B5F6
--color-brand-secondary: #1E2A38
--color-destructive-primary: #EF5350
--color-border-primary: #38383A
--color-interactive-focus-ring: #64B5F6

1.3. Spacing & Sizing System (8pt Grid)
--space-1: 8px
--space-2: 16px
--space-3: 24px
--space-4: 32px
--space-5: 40px
--space-6: 48px

1.4. Corner Radius System
--radius-sm: 8px
--radius-md: 16px
--radius-lg: 24px
--radius-full: 999px

1.5. Elevation (Shadow) System
--shadow-1: 0px 2px 4px rgba(0,0,0,0.05)
--shadow-2: 0px 4px 12px rgba(0,0,0,0.1)
--shadow-3: 0px 8px 24px rgba(0,0,0,0.15)

1.6. Motion System
--motion-duration-fast: 150ms
--motion-duration-moderate: 300ms
--motion-easing-standard: cubic-bezier(0.4, 0, 0.2, 1)

2. Base Component Implementation

Create styles for the following base components. All properties must use the tokens defined above.

Button:
Variants: primary (filled brand color), secondary (brand color border), ghost (brand color text), destructive (filled destructive color).
States: default, hover, focus, pressed, disabled. All states must be visually distinct and derive colors from tokens.
Padding: var(--space-1) var(--space-2)
Border Radius: var(--radius-full)

Input:
States: default, hover, focus, disabled, invalid.
Use tokens for background, text color, border color, and focus ring.

Card:
Default background: var(--color-background-secondary)
Border Radius: var(--radius-md)
Shadow: var(--shadow-1)

Other Components: Also provide token-based styles for Select, Checkbox, Radio, Dialog/Modal, Tabs, Tooltip, Toast.

3. Accessibility & Theming Mandates

Accessibility:
Focus states MUST use a visible focus ring (e.g., outline: 2px solid var(--color-interactive-focus-ring)).
Ensure all color combinations for text on backgrounds pass WCAG AA contrast ratios.

Theming:
Implement dark mode by adding a .dark-theme class to a parent container, which swaps the token values. Do not write duplicate component styles for themes.

Motion:
Wrap all transitions and animations in a @media (prefers-reduced-motion: no-preference) media query.

Density:
Create .density-compact and .density-comfortable utility classes that adjust spacing and line-height tokens for components.

Please provide the complete CSS with the token definitions and component styles.`;
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
      <Sidebar
        selectedFont={selectedFont}
        onFontChange={setSelectedFont}
        selectedScale={selectedScale}
        onScaleChange={setSelectedScale}
        selectedTheme={selectedTheme}
        onThemeChange={setSelectedTheme}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

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
        <div className="flex-1 flex">
          {/* Mobile App Preview */}
          <div className="flex-1 border-r border-border">
            <MobileAppPreview
              fontClass={selectedFont}
              selectedScale={selectedScale}
              isDarkMode={isDarkMode}
              selectedTheme={selectedTheme}
            />
          </div>

          {/* Design System Overview */}
          <div className="flex-1">
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