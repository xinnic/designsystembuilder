import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { PreviewPhone } from '@/components/PreviewPhone';
import DesignSystemOverview from '@/components/DesignSystemOverview';
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
    
    // Set base library data attribute for PreviewPhone
    root.setAttribute('data-base-lib', selectedBaseLib);
    
    // Toggle dark mode
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [selectedTheme, isDarkMode, selectedScale, selectedBaseLib]);

  const parseTypographyValue = (value: string) => {
    // Parse strings like "700 28px/38px" into { weight: 700, size: "28px", line: "38px" }
    const match = value.match(/(\d+)\s+(\d+px)\/(\d+px)/);
    if (match) {
      return {
        weight: parseInt(match[1]),
        size: match[2],
        line: match[3]
      };
    }
    return { weight: 400, size: "16px", line: "24px" };
  };

  const getBaseLibraryContent = (baseLib: string, fontName: string, selectedScale: string, typographyStyles: any, colorRoles: any, spacingScale: string, radii: string, shadows: string, motion: string, themeModes: string, densityModes: string) => {
    const foundationsContent = `### Foundations (Design Tokens)

• **Typography (${fontName}, ${selectedScale.charAt(0).toUpperCase() + selectedScale.slice(1)} Scale)**
  Display Large: ${typographyStyles.displayLarge.size} / ${typographyStyles.displayLarge.line} @ ${typographyStyles.displayLarge.weight}
  Display Medium: ${typographyStyles.displayMedium.size} / ${typographyStyles.displayMedium.line} @ ${typographyStyles.displayMedium.weight}
  H1: ${typographyStyles.h1.size} / ${typographyStyles.h1.line} @ ${typographyStyles.h1.weight}
  H2: ${typographyStyles.h2.size} / ${typographyStyles.h2.line} @ ${typographyStyles.h2.weight}
  Subhead: ${typographyStyles.subhead.size} / ${typographyStyles.subhead.line} @ ${typographyStyles.subhead.weight}
  Body: ${typographyStyles.body.size} / ${typographyStyles.body.line} @ ${typographyStyles.body.weight}
  Caption: ${typographyStyles.caption.size} / ${typographyStyles.caption.line} @ ${typographyStyles.caption.weight}
  Button: ${typographyStyles.button.size} / ${typographyStyles.button.line} @ ${typographyStyles.button.weight}, tracking 0.02em
  Eyebrow: ${typographyStyles.eyebrow.size} / ${typographyStyles.eyebrow.line} @ ${typographyStyles.eyebrow.weight}, tracking 0.05em

• **Color Roles (Light / Dark)**
  Text: ${colorRoles['text-primary']}, ${colorRoles['text-secondary']}
  Surfaces: ${colorRoles['bg-primary']}, ${colorRoles['bg-secondary']}, ${colorRoles.border}
  Brand: ${colorRoles.brand}, Brand-weak: ${colorRoles['brand-weak']}
  Danger: ${colorRoles.danger} · Focus ring: ${colorRoles.focus}
  *(Values are for visualization; always reference by token name.)*

• **Spacing**: ${spacingScale} (8-pt rhythm)
• **Radii**: ${radii} (sm/md/lg/full)
• **Elevation**: ${shadows} (level-1/2/3)
• **Motion**: ${motion} (fast/base/easing)
• **Theme Modes / Density**: ${themeModes}; ${densityModes} via token overrides only`;

    const componentRecipes = `### Component Recipes (token-only)

• **Buttons**: Primary / Secondary / Ghost / Destructive. States: default, hover (~90% brand), pressed (~80% brand), focus (visible ring), disabled (tokenized opacity).
• **Inputs & Forms**: text field (default/hover/focus/error/disabled), select, checkbox, radio, switch — all use surface/text/border/focus tokens.
• **Cards**: neutral bg, md radius, level-1 shadow; featured card with image + CTA uses brand tokens.
• **Dialogs/Modals**: overlay scrim, level-3 surface; header/body/actions.
• **Navigation**: bottom tabs (Home/Explore/Activities/Profile/Settings).
• **Feedback**: toast (success/error/info) and tooltip.`;

    const themingDensity = `### Theming & Density

• Light/Dark by **swapping token values only**.
• Compact/Comfortable by **overriding spacing/line-height tokens**.`;

    const accessibility = `### Accessibility & Quality

• WCAG AA; focus ring ≥ 2px (tokenized); targets ≥ 44×44; body ≥ 14px; respect reduced-motion.`;

    const assertions = `### Assertions

• No hard-coded hex/px outside token definitions.
• Theme switch = token swap only.
• States derive from tokens.
• Focus ring visible and tokenized.
• Density changes only via tokens.`;

    const stickyGuidelines = `### STICKY-GUIDELINES (remember)

Token-only styling; AA contrast; visible focus ring; 44×44 targets; reduced-motion; light/dark via token swap; density via tokens; don't introduce literals.`;

    const baseLibraryTemplates = {
      none: `### Objective

Generate a token-first, framework-agnostic design system. All visuals must come from **design tokens**. No hard-coded values.

### How to Use This Prompt

1. Create a **single source of truth**: tokens as CSS custom properties and JSON.
2. Implement all visuals by **referencing token names**, never literals.
3. Verify **Assertions** before returning work.

${foundationsContent}

${componentRecipes}

${themingDensity}

${accessibility}

${assertions}

${stickyGuidelines}`,

      tailwind: `### Objective

Generate a token-first design system wired to **Tailwind utilities**. No hard-coded values.

### How to Use This Prompt

1. **Extend Tailwind theme values** to reference tokens (colors/space/radius/shadows/motion).
2. Compose utilities to build visuals; **do not create a parallel component library**.
3. Verify **Assertions** before returning work.

${foundationsContent}

### Tailwind-specific Theming Instructions

• Map semantic **colors** to tokens (brand, text, surface, border).
• Expose **spacing/radii/shadows/motion** through Tailwind theme so utilities can consume tokens.
• Use opacity by referencing color tokens, not ad-hoc shades.

${componentRecipes}

${themingDensity}

${accessibility}

${assertions}

${stickyGuidelines}`,

      shadcn: `### Objective

Generate a token-first design system that **themes existing shadcn/ui components**. No component re-implementations.

### How to Use This Prompt

1. Keep all shadcn/Radix components and behaviors.
2. Replace any literal hex/px/shadow/duration with **token references**.
3. Verify **Assertions** before returning work.

${foundationsContent}

### shadcn-specific Theming Instructions

• Apply tokens to **component variants** (solid/outline/ghost/destructive) and **states** (hover/focus/pressed/disabled).
• Focus indicators must use the **focus token** and be ≥ 2px with offset.
• Do not change Radix interaction logic (data-state, aria, ESC handling).
• Ensure color ramps (hover/pressed) are derived from **brand/danger tokens** only.

### Component Coverage

• Buttons, Inputs, Cards, Dialog, Tabs, Tooltip, Toast — all visuals reference tokens; no literals.

${themingDensity}

${accessibility}

${assertions}

${stickyGuidelines}`,

      daisyui: `### Objective

Generate a token-first design system that **themes DaisyUI** using your tokens. **Do not redefine DaisyUI components.**

### How to Use This Prompt

1. Provide a **theme mapping** from token roles to DaisyUI theme roles.
2. Keep DaisyUI classes/logic; only supply values.
3. Verify **Assertions** before returning work.

${foundationsContent}

### DaisyUI Theme Mapping (use token names; no literals)

• \`primary\` → **brand** (${colorRoles.brand})
• \`primary-content\` → **text on brand** (choose the tokenized text color that passes AA on brand; do **not** hard-code)
• \`base-100\` → **bg-primary** (${colorRoles['bg-primary']})
• \`base-200\` → **bg-secondary** (${colorRoles['bg-secondary']})
• \`base-content\` → **text-primary** (${colorRoles['text-primary']})
• \`neutral\` → **border/neutral surface** (${colorRoles.border})
• \`info\` → **brand-weak** (${colorRoles['brand-weak']})
• \`success\` → derive from tokens (choose a green that maintains AA; if absent, keep DaisyUI default)
• \`warning\` → derive from tokens (accessible amber; if absent, keep default)
• \`error\` → **danger** (${colorRoles.danger})
• **Radii**: map DaisyUI box/field radii to tokens (sm/md/lg/full).
• **Shadows**: map DaisyUI elevations to token levels (1/2/3).
• **States**: hover ≈ brand @ 90%, pressed ≈ 80%, focus = tokenized ring.

### Component Coverage to Verify

Buttons, Inputs, Cards, Modals, Tabs, Alerts/Toasts — all visuals must read from the theme mapping (tokens), not literals.

${themingDensity}

${accessibility}

${assertions}

${stickyGuidelines}`,

      flowbite: `### Objective

Generate a token-first design system that **themes Flowbite**. **Do not redefine Flowbite components.**

### How to Use This Prompt

1. Apply tokens via Flowbite's theming/override surface.
2. Keep Flowbite classes/structure; only supply values.
3. Verify **Assertions** before returning work.

${foundationsContent}

### Flowbite Theming Instructions

• Ensure **colors/radii/shadows/spacing/motion** are sourced from tokens through Tailwind theme values used by Flowbite.
• Buttons, Forms, Modals, Navbar, Alerts must:
  • Use **brand** for primary actions; states derive from brand ramps (90%/80%).
  • Use **danger** for destructive.
  • Use tokenized focus ring and spacing/radius levels.

${componentRecipes}

${themingDensity}

${accessibility}

${assertions}

${stickyGuidelines}`,

      radix: `### Objective

Generate a token-first design system that **styles Radix primitives**. No new logic.

### How to Use This Prompt

1. Style via tokens using Radix \`data-*\` states.
2. Keep all behaviors intact.
3. Verify **Assertions** before returning work.

${foundationsContent}

### Radix Styling Instructions

• Buttons, Inputs, Dialog, Tabs, Tooltip, Toast built from primitives:
  • Visuals (colors/radii/shadows/spacing/motion) come from tokens.
  • States (open/closed, checked/unchecked, disabled) style via \`data-state\` with **brand/danger ramps**.
  • Focus = tokenized ring (≥ 2px).

${componentRecipes}

${themingDensity}

${accessibility}

${assertions}

${stickyGuidelines}`,

      chakra: `### Objective

Generate a token-first design system as a **Chakra theme override**. Do not fork Chakra components.

### How to Use This Prompt

1. Build a theme override from tokens.
2. Point components to theme tokens; no inline literals.
3. Verify **Assertions** before returning work.

${foundationsContent}

### Chakra Theme Mapping

• \`colors\` ← map token roles (text, surfaces, brand, danger, focus, brand-weak).
• \`fonts\`, \`fontSizes\`, \`lineHeights\`, \`fontWeights\` ← from Typography tokens.
• \`space\` ← from Spacing tokens.
• \`radii\` ← from Radius tokens.
• \`shadows\` ← from Elevation tokens.
• \`transition\` ← from Motion tokens.
• Ensure Button, Input, Card, Modal, Tabs, Alert variants + states read from these theme tokens.

${componentRecipes}

${themingDensity}

${accessibility}

${assertions}

${stickyGuidelines}`,

      mui: `### Objective

Generate a token-first design system as an **MUI theme**. Do not restyle components with literals.

### How to Use This Prompt

1. Create an MUI theme from tokens.
2. Make components read theme tokens.
3. Verify **Assertions** before returning work.

${foundationsContent}

### MUI Theme Mapping

• \`palette\`:
  • \`primary.main\` ← **brand**; \`primary.contrastText\` ← accessible text on brand (choose tokenized text color passing AA).
  • \`error.main\` ← **danger**.
  • \`text.primary\` / \`text.secondary\` ← text tokens.
  • \`background.default\` ← **bg-primary**; \`background.paper\` ← **bg-secondary**; \`divider\` ← **border**.
• \`typography\`: map each variant to Typography tokens (sizes/lines/weights).
• \`shape.borderRadius\` ← default radius token (md).
• \`spacing\` ← base grid (8-pt).
• \`shadows\` ← tokenized levels (1/2/3).
• \`transitions\` ← durations/easing from Motion tokens.
• Ensure Button, TextField, Card, Dialog, Tabs, Alert read only from the theme.

${componentRecipes}

${themingDensity}

${accessibility}

${assertions}

${stickyGuidelines}`
    };

    return baseLibraryTemplates[baseLib as keyof typeof baseLibraryTemplates] || baseLibraryTemplates.none;
  };

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

    // Parse typography values
    const typographyStyles = {
      displayLarge: parseTypographyValue(currentScale.fontDisplayLarge),
      displayMedium: parseTypographyValue(currentScale.fontDisplayMedium),
      h1: parseTypographyValue(currentScale.fontH1),
      h2: parseTypographyValue(currentScale.fontH2),
      subhead: parseTypographyValue(currentScale.fontSubhead),
      body: parseTypographyValue(currentScale.fontBody),
      caption: parseTypographyValue(currentScale.fontCaption),
      button: parseTypographyValue(currentScale.fontButton),
      eyebrow: parseTypographyValue(currentScale.fontEyebrow)
    };

    // Define color roles based on theme
    const colorRoles = {
      'text-primary': isDarkMode ? '#E1E1E1' : '#1C1C1E',
      'text-secondary': isDarkMode ? '#A8A8A8' : '#636366',
      'bg-primary': isDarkMode ? '#121212' : '#FFFFFF',
      'bg-secondary': isDarkMode ? '#1E1E1E' : '#F2F2F7',
      'border': isDarkMode ? '#2C2C2C' : '#C6C6C8',
      'brand': primaryColor,
      'brand-weak': isDarkMode ? `${primaryColor}40` : `${primaryColor}20`,
      'danger': '#DC2626',
      'focus': '#0066CC'
    };

    // Define other token systems
    const spacingScale = 'space-1: 4px, space-2: 8px, space-3: 12px, space-4: 16px, space-5: 20px, space-6: 24px, space-8: 32px, space-10: 40px, space-12: 48px, space-16: 64px';
    const radii = 'sm: 4px, md: 8px, lg: 12px, full: 9999px';
    const shadows = 'level-1: subtle (cards, inputs), level-2: medium (dropdowns, popovers), level-3: strong (modals, drawers)';
    const motion = 'duration-fast: 150ms, duration-medium: 300ms, duration-slow: 500ms, easing-ease-out: cubic-bezier(0, 0, 0.2, 1), easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)';
    const themeModes = isDarkMode ? 'Dark' : 'Light';
    const densityModes = 'Comfortable, Compact';

    return getBaseLibraryContent(
      selectedBaseLib,
      fontName,
      selectedScale,
      typographyStyles,
      colorRoles,
      spacingScale,
      radii,
      shadows,
      motion,
      themeModes,
      densityModes
    );
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
            <PreviewPhone
              baseLib={selectedBaseLib as any}
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
              baseLib={selectedBaseLib}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;