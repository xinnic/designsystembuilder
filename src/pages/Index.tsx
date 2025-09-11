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

    return `**Objective**  
Generate a token-first, framework-agnostic design system. All visuals must come from CSS custom properties (design tokens).  
**No hard-coded values** for colors, fonts, spacing, radii, shadows, or motion anywhere.

---

## 0) Output format (deliverables)
Produce the following files (in this order):

1. \`design-tokens.css\` – all tokens (light) + \`[data-theme="dark"]\` overrides.  
2. \`components.css\` – base components that reference tokens only.  
3. (Optional) \`tokens.json\` – DTCG-flavored mirror of the tokens.

---

## 1) Design tokens (authoritative source)

### 1.1 Typography (Font: **${fontName}**, Scale: **${selectedScale.charAt(0).toUpperCase() + selectedScale.slice(1)}**)
Atomic tokens (no composite font shorthands):

\`\`\`css
:root {
  --font-family-sans: "${fontName}", ui-sans-serif, system-ui;

  /* sizes */
  --font-size-display-lg: ${currentScale.fontDisplayLarge.split(' ')[1]};
  --font-size-display-md: ${currentScale.fontDisplayMedium.split(' ')[1]};
  --font-size-h1: ${currentScale.fontH1.split(' ')[1]};
  --font-size-h2: ${currentScale.fontH2.split(' ')[1]};
  --font-size-subhead: ${currentScale.fontSubhead.split(' ')[1]};
  --font-size-body: ${currentScale.fontBody.split(' ')[1]};
  --font-size-caption: ${currentScale.fontCaption.split(' ')[1]};
  --font-size-button: ${currentScale.fontButton.split(' ')[1]};
  --font-size-eyebrow: ${currentScale.fontEyebrow.split(' ')[1]};

  /* line heights */
  --line-display-lg: ${currentScale.fontDisplayLarge.split('/')[1]};
  --line-display-md: ${currentScale.fontDisplayMedium.split('/')[1]};
  --line-h1: ${currentScale.fontH1.split('/')[1]};
  --line-h2: ${currentScale.fontH2.split('/')[1]};
  --line-subhead: ${currentScale.fontSubhead.split('/')[1]};
  --line-body: ${currentScale.fontBody.split('/')[1]};
  --line-caption: ${currentScale.fontCaption.split('/')[1]};
  --line-button: ${currentScale.fontButton.split('/')[1]};
  --line-eyebrow: ${currentScale.fontEyebrow.split('/')[1]};

  /* weights & tracking */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --track-button: 0.02em;
  --track-eyebrow: 0.05em;
}
\`\`\`

### 1.2 Color (RGB for opacity support; light theme defaults)

\`\`\`css
:root {
  /* text & surfaces */
  --color-text-primary: 28 28 30;
  --color-text-secondary: 99 99 102;
  --color-bg-primary: 255 255 255;
  --color-bg-secondary: 242 242 247;
  --color-border: 198 198 200;

  /* brand & semantic */
  --color-brand: ${primaryColor.replace('#', '').match(/.{2}/g).map(hex => parseInt(hex, 16)).join(' ')};
  --color-brand-weak: 227 242 253;
  --color-danger: 211 47 47;

  /* focus */
  --color-focus: 77 171 245;
}
\`\`\`

### Dark mode overrides

\`\`\`css
[data-theme="dark"] {
  --color-text-primary: 255 255 255;
  --color-text-secondary: 174 174 178;
  --color-bg-primary: 18 18 18;
  --color-bg-secondary: 28 28 30;
  --color-border: 56 56 58;

  --color-brand: 100 181 246;
  --color-brand-weak: 30 42 56;
  --color-danger: 239 83 80;
  --color-focus: 100 181 246;
}
\`\`\`

### 1.3 Spacing (8pt)

\`\`\`css
:root {
  --space-1: 8px; --space-2: 16px; --space-3: 24px;
  --space-4: 32px; --space-5: 40px; --space-6: 48px;
}
\`\`\`

### 1.4 Shape, Elevation, Motion

\`\`\`css
:root {
  --radius-sm: 8px; --radius-md: 16px; --radius-lg: 24px; --radius-full: 999px;

  --shadow-1: 0 2px 4px rgba(0,0,0,.05);
  --shadow-2: 0 4px 12px rgba(0,0,0,.10);
  --shadow-3: 0 8px 24px rgba(0,0,0,.15);

  --dur-fast: 150ms; --dur-base: 300ms;
  --ease-standard: cubic-bezier(.4,0,.2,1);
}
\`\`\`

### Reduced motion

\`\`\`css
@media (prefers-reduced-motion: reduce){
  * { animation-duration:.001ms!important; transition-duration:.001ms!important }
}
\`\`\`

---

## 2) Component recipes (token-only)

### Button
- **Variants**: primary (filled brand), secondary (outline), ghost (text), destructive (filled danger).
- **States**: default, hover, focus, pressed, disabled.
- **Sizing**: padding var(--space-1) var(--space-2), radius var(--radius-full).
- **Typography**: size var(--font-size-button), line var(--line-button), weight var(--weight-semibold), track var(--track-button).

### State algorithm
- **Hover**: rgb(var(--color-brand) / 0.9)
- **Pressed**: rgb(var(--color-brand) / 0.8)
- **Disabled**: opacity 0.4 + cursor: not-allowed.

### Input
- **Background**: rgb(var(--color-bg-secondary)); text: rgb(var(--color-text-primary)); border: 1px solid rgb(var(--color-border)).
- **States**:
  - Hover: border opacity 0.9
  - Focus: add ring 0 0 0 2px rgb(var(--color-bg-primary)), 0 0 0 4px rgb(var(--color-focus))
  - Invalid: border rgb(var(--color-danger))
  - Disabled: opacity 0.4; pointer-events none

### Card
- **Background**: rgb(var(--color-bg-secondary)); radius: var(--radius-md); shadow: var(--shadow-1);
- **Padding**: var(--space-3).

### Other components
- Select, Checkbox, Radio, Dialog/Modal, Tabs, Tooltip, Toast.
- All states reference tokens only.

---

## 3) Theming, Density, Accessibility

### Theming
- Toggle dark mode with [data-theme="dark"] only.
- Do not duplicate component CSS.

### Density
\`\`\`css
.density-compact { --space-1: 6px; --space-2: 12px; --space-3: 18px; --space-4: 24px; }
.density-comfortable { /* defaults */ }
\`\`\`

### Accessibility acceptance
- Focus ring ≥ 2px, high-contrast.
- Body text ≥ 14px (prefer 16px).
- WCAG AA for all text/background pairs.
- Minimum interactive size: 44×44 px.

---

## 4) Assertions (must pass)
- No hex or px literals outside design-tokens.css.
- All states use rgb(var(--token)/α).
- Dark theme via token overrides only.
- Focus ring visible ≥ 2px.
- Min tap target size 44×44 enforced.
- Reduced motion respected.

---

## 5) STICKY-GUIDELINES (commit to memory)

These rules must always be remembered by the coding tool for future work:

- **Token-only styling**: All styles reference tokens. No literals.
- **Accessibility**: WCAG AA, focus ring ≥ 2px with offset, body ≥14px, tap target ≥44×44.
- **Motion**: Respect prefers-reduced-motion.
- **Themability**: Light/dark via tokens only.
- **Density**: Controlled via token overrides.
- **States**: Hover/active/focus/disabled must derive from tokens.
- **Output hygiene**: No framework lock-in unless explicitly requested.

Please output the complete files as specified in the deliverables section.`;
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