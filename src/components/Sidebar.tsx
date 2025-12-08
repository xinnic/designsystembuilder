import React from 'react';
import { ChevronDown, Settings, Layers, Sliders, Square, Minus, Cloud, Gamepad2 } from 'lucide-react';
import StylingControls from '../left/StylingControls';
import { useDesignSystem } from '../state/designSystem';
import { generateSecondaryColor } from '../utils/colorGeneration';
import {
  colorThemes,
  accentColors,
  RAINBOW_GRADIENT,
  DEFAULT_PRIMARY,
  DEFAULT_ACCENT,
} from '../config/colorThemes';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface SidebarProps {}

// Primary fonts (Sans-serif only - for body text)
const primaryFonts = [
  { name: 'Plus Jakarta Sans', class: 'font-jakarta' },
  { name: 'Be Vietnam Pro', class: 'font-vietnam' },
  { name: 'Wix Madefor Text', class: 'font-wix' },
  { name: 'Figtree', class: 'font-figtree' },
  { name: 'Albert Sans', class: 'font-albert' },
  { name: 'Satoshi', class: 'font-satoshi' },
  { name: 'Epilogue', class: 'font-epilogue' },
  { name: 'Manrope', class: 'font-manrope' },
  { name: 'Public Sans', class: 'font-public' },
  { name: 'Space Grotesk', class: 'font-space' },
  { name: 'Work Sans', class: 'font-work' },
  { name: 'Source Sans 3', class: 'font-source-sans' },
  { name: 'Nunito Sans', class: 'font-nunito' },
  { name: 'Arimo', class: 'font-arimo' },
  { name: 'Hanken Grotesk', class: 'font-hanken' },
  { name: 'Rubik', class: 'font-rubik' },
  { name: 'DM Sans', class: 'font-dm' },
  { name: 'IBM Plex Sans', class: 'font-ibm' },
  { name: 'Sora', class: 'font-sora' },
  { name: 'Montserrat', class: 'font-montserrat' },
];

// Display fonts (All fonts including serif - for headings and titles)
const displayFonts = [
  { name: 'Plus Jakarta Sans', class: 'font-jakarta' },
  { name: 'Be Vietnam Pro', class: 'font-vietnam' },
  { name: 'Wix Madefor Text', class: 'font-wix' },
  { name: 'Figtree', class: 'font-figtree' },
  { name: 'Albert Sans', class: 'font-albert' },
  { name: 'Satoshi', class: 'font-satoshi' },
  { name: 'Epilogue', class: 'font-epilogue' },
  { name: 'Manrope', class: 'font-manrope' },
  { name: 'Public Sans', class: 'font-public' },
  { name: 'Space Grotesk', class: 'font-space' },
  { name: 'Work Sans', class: 'font-work' },
  { name: 'Source Sans 3', class: 'font-source-sans' },
  { name: 'Nunito Sans', class: 'font-nunito' },
  { name: 'Arimo', class: 'font-arimo' },
  { name: 'Hanken Grotesk', class: 'font-hanken' },
  { name: 'Rubik', class: 'font-rubik' },
  { name: 'DM Sans', class: 'font-dm' },
  { name: 'IBM Plex Sans', class: 'font-ibm' },
  { name: 'Sora', class: 'font-sora' },
  { name: 'Montserrat', class: 'font-montserrat' },
  { name: 'Newsreader', class: 'font-newsreader' },
  { name: 'Noto Serif', class: 'font-noto' },
  { name: 'Domine', class: 'font-domine' },
  { name: 'Libre Caslon Text', class: 'font-libre' },
  { name: 'EB Garamond', class: 'font-garamond' },
  { name: 'Literata', class: 'font-literata' },
  { name: 'Source Serif 4', class: 'font-source-serif' },
];

export function Sidebar({}: SidebarProps) {
  const {
    selectedPrimaryFont,
    setPrimaryFont,
    selectedDisplayFont,
    setDisplayFont,
    selectedScale,
    setScale,
    selectedTheme,
    setTheme,
    customPrimaryColor,
    setCustomPrimaryColor,
    selectedAccentColor,
    setAccentColor,
    customAccentColor,
    setCustomAccentColor,
    isSecondaryManual,
    setIsSecondaryManual,
    isDarkMode,
    setDarkMode,
    cornerRadius,
    setCornerRadius,
    spacingMode,
    setSpacingMode,
    stylePresetId,
    setStylePreset,
    opts,
    setOpts,
    setTokens,
  } = useDesignSystem();

  const { toast } = useToast();

  // Section states
  const [basicOptionsOpen, setBasicOptionsOpen] = React.useState(true);
  const [advancedStylingOpen, setAdvancedStylingOpen] = React.useState(false);

  // Helper function to handle primary color changes
  const handlePrimaryColorChange = (theme: string, customColor?: string) => {
    setTheme(theme);

    // Only auto-generate secondary if it wasn't manually selected
    if (!isSecondaryManual) {
      const primaryColor = theme === 'custom' && customColor
        ? customColor
        : colorThemes.find(t => t.name === theme)?.color || '#3498db';

      // Generate analogous color (30 degrees rotation for harmony)
      const generatedSecondary = generateSecondaryColor(primaryColor, 'analogous');

      // Set secondary as custom with the generated color
      setAccentColor('custom');
      setCustomAccentColor(generatedSecondary);
    }
  };

  // Helper function to handle secondary color manual selection
  const handleSecondaryColorChange = (accent: string, customColor?: string) => {
    setAccentColor(accent);
    if (customColor) {
      setCustomAccentColor(customColor);
    }
    // Mark secondary as manually selected
    setIsSecondaryManual(true);
  };

  // Style presets (using existing presets)
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
    setStylePreset(presetId);
    const preset = stylePresets.find(p => p.id === presetId);
    if (preset) {
      // Update tokens through the store
      setTokens({
        shadow: {
          '1': preset.styles.shadows.sm,
          '2': preset.styles.shadows.md,
          '3': preset.styles.shadows.lg
        },
        radius: {
          sm: preset.styles.radii.sm,
          md: preset.styles.radii.md,
          lg: preset.styles.radii.lg,
          full: '9999px'
        }
      });

      // Update border weight if specified
      if (preset.styles.borders?.width) {
        const borderWeight = preset.styles.borders.width === '0px' ? 'none' :
                            preset.styles.borders.width === '1px' ? 'thin' : 'thick';
        setOpts({
          cardBorderWeight: borderWeight,
          inputBorderWeight: borderWeight
        });
      }

      toast({
        title: `Applied ${preset.name}`,
        description: preset.description,
      });
    }
  };

  return (
    <div className="w-80 bg-background h-screen overflow-y-auto p-6" style={{ boxShadow: '1px 0 3px rgba(0,0,0,0.04)' }}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Design System Builder</h1>
        <p className="text-sm text-muted-foreground">
          Customize your design system and generate AI-ready prompts
        </p>
      </div>

      <div className="space-y-4">
        {/* Basic Options Section - For Design Beginners */}
        <Collapsible open={basicOptionsOpen} onOpenChange={setBasicOptionsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted bg-primary/5">
            <div className="flex items-center gap-3">
              <Layers className="h-5 w-5 text-primary" />
              <span className="font-medium">Basic Options</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${basicOptionsOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 p-3">

            {/* Primary Font */}
            <div>
              <label className="text-sm font-medium mb-2 block">Primary Font</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className={`w-full justify-between ${selectedPrimaryFont}`}>
                    {primaryFonts.find(f => f.class === selectedPrimaryFont)?.name || 'Select Font'}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] text-base max-h-[300px] overflow-y-auto" align="start">
                  {primaryFonts.map((font) => (
                    <DropdownMenuItem
                      key={font.class}
                      onClick={() => setPrimaryFont(font.class)}
                      className={`${font.class} text-base`}
                    >
                      {font.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Primary Color */}
            <div>
              <label className="text-sm font-medium mb-2 block">Primary Color</label>
              <div className="grid grid-cols-6 gap-1">
                {colorThemes.map((theme) => (
                  <div key={theme.name} className="relative">
                    {theme.isCustom ? (
                      <div className="relative">
                        <input
                          type="color"
                          value={customPrimaryColor || DEFAULT_PRIMARY}
                          onChange={(e) => {
                            setCustomPrimaryColor(e.target.value);
                            handlePrimaryColorChange('custom', e.target.value);
                          }}
                          className="w-7 h-7 rounded-full border cursor-pointer opacity-0 absolute inset-0"
                          title={theme.label}
                        />
                        <div
                          className={`w-7 h-7 rounded-full border ${
                            selectedTheme === theme.name ? 'border-foreground border-2' : 'border-border'
                          } cursor-pointer`}
                          style={{
                            background: RAINBOW_GRADIENT
                          }}
                          onClick={() => {
                            const color = customPrimaryColor || DEFAULT_PRIMARY;
                            if (!customPrimaryColor) {
                              setCustomPrimaryColor(color);
                            }
                            handlePrimaryColorChange('custom', color);
                          }}
                          title={theme.label}
                        />
                      </div>
                    ) : (
                      <button
                        className={`w-7 h-7 rounded-md border ${
                          selectedTheme === theme.name ? 'border-foreground border-2' : 'border-border'
                        }`}
                        style={{ backgroundColor: theme.color }}
                        onClick={() => handlePrimaryColorChange(theme.name)}
                        title={theme.label}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Dark Mode</label>
              <Switch checked={isDarkMode} onCheckedChange={setDarkMode} />
            </div>

            {/* Style Preset */}
            <div>
              <label className="text-sm font-medium mb-2 block">Style Preset</label>
              <div className="grid grid-cols-2 gap-2">
                {stylePresets.map((preset) => {
                  const Icon = preset.icon;
                  return (
                    <button
                      key={preset.id}
                      className={`p-3 text-sm rounded border flex flex-col items-center gap-2 transition-all ${
                        stylePresetId === preset.id
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:bg-muted'
                      }`}
                      onClick={() => handleStylePresetChange(preset.id)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs">{preset.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Menu Type */}
            <div>
              <label className="text-sm font-medium mb-2 block">Menu Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                    opts.menuLayout === 'hamburger'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setOpts({ menuLayout: 'hamburger' })}
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 14" fill="none">
                    <rect width="20" height="2" fill="currentColor" />
                    <rect y="6" width="20" height="2" fill="currentColor" />
                    <rect y="12" width="20" height="2" fill="currentColor" />
                  </svg>
                  <span className="text-sm">Hamburger</span>
                </button>
                <button
                  className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                    opts.menuLayout === 'bottomBar'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setOpts({ menuLayout: 'bottomBar' })}
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 16" fill="none">
                    <rect y="14" width="20" height="2" fill="currentColor" />
                    <rect x="2" y="10" width="3" height="2" fill="currentColor" />
                    <rect x="8.5" y="10" width="3" height="2" fill="currentColor" />
                    <rect x="15" y="10" width="3" height="2" fill="currentColor" />
                  </svg>
                  <span className="text-sm">Bottom Bar</span>
                </button>
              </div>
            </div>

          </CollapsibleContent>
        </Collapsible>

        {/* Advanced Styling Section - For More Control */}
        <Collapsible open={advancedStylingOpen} onOpenChange={setAdvancedStylingOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted">
            <div className="flex items-center gap-3">
              <Sliders className="h-5 w-5" />
              <span className="font-medium">Advanced Styling</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${advancedStylingOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 p-3">

            {/* Corner Radius */}
            <div>
              <label className="text-sm font-medium mb-2 block">Corner Radius</label>
              <div className="grid grid-cols-4 gap-2">
                <button
                  className={`p-3 border-2 transition-colors flex items-center justify-center ${
                    cornerRadius === 'none'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted'
                  }`}
                  style={{ borderRadius: '8px' }}
                  onClick={() => setCornerRadius('none')}
                  title="None"
                >
                  <div className="w-8 h-8 border-2 border-foreground" style={{ borderRadius: '0px' }} />
                </button>
                <button
                  className={`p-3 border-2 transition-colors flex items-center justify-center ${
                    cornerRadius === 'small'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted'
                  }`}
                  style={{ borderRadius: '8px' }}
                  onClick={() => setCornerRadius('small')}
                  title="Small"
                >
                  <div className="w-8 h-8 border-2 border-foreground" style={{ borderRadius: '4px' }} />
                </button>
                <button
                  className={`p-3 border-2 transition-colors flex items-center justify-center ${
                    cornerRadius === 'medium'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted'
                  }`}
                  style={{ borderRadius: '8px' }}
                  onClick={() => setCornerRadius('medium')}
                  title="Medium"
                >
                  <div className="w-8 h-8 border-2 border-foreground" style={{ borderRadius: '10px' }} />
                </button>
                <button
                  className={`p-3 border-2 transition-colors flex items-center justify-center ${
                    cornerRadius === 'large'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted'
                  }`}
                  style={{ borderRadius: '8px' }}
                  onClick={() => setCornerRadius('large')}
                  title="Large"
                >
                  <div className="w-8 h-8 border-2 border-foreground" style={{ borderRadius: '20px' }} />
                </button>
              </div>
            </div>

            {/* Display Font (for headings) */}
            <div>
              <label className="text-sm font-medium mb-2 block">Display Font</label>
              <p className="text-xs text-muted-foreground mb-2">For headings and titles</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className={`w-full justify-between ${selectedDisplayFont}`}>
                    {displayFonts.find(f => f.class === selectedDisplayFont)?.name || 'Select Font'}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] text-base max-h-[300px] overflow-y-auto" align="start">
                  {displayFonts.map((font) => (
                    <DropdownMenuItem
                      key={font.class}
                      onClick={() => setDisplayFont(font.class)}
                      className={`${font.class} text-base`}
                    >
                      {font.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Secondary Color */}
            <div>
              <label className="text-sm font-medium mb-2 block">Secondary Color</label>
              <div className="grid grid-cols-6 gap-1">
                {accentColors.map((accent) => (
                  <div key={accent.name} className="relative">
                    {accent.isCustom ? (
                      <div className="relative">
                        <input
                          type="color"
                          value={customAccentColor || DEFAULT_ACCENT}
                          onChange={(e) => {
                            handleSecondaryColorChange('custom', e.target.value);
                          }}
                          className="w-7 h-7 rounded-full border cursor-pointer opacity-0 absolute inset-0"
                          title={accent.label}
                        />
                        <div
                          className={`w-7 h-7 rounded-full border ${
                            selectedAccentColor === accent.name ? 'border-foreground border-2' : 'border-border'
                          } cursor-pointer`}
                          style={{
                            background: RAINBOW_GRADIENT
                          }}
                          onClick={() => {
                            const color = customAccentColor || DEFAULT_ACCENT;
                            if (!customAccentColor) {
                              setCustomAccentColor(color);
                            }
                            handleSecondaryColorChange('custom', color);
                          }}
                          title={accent.label}
                        />
                      </div>
                    ) : (
                      <button
                        className={`w-7 h-7 rounded-md border ${
                          selectedAccentColor === accent.name ? 'border-foreground border-2' : 'border-border'
                        }`}
                        style={{ backgroundColor: accent.color }}
                        onClick={() => handleSecondaryColorChange(accent.name)}
                        title={accent.label}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Spacing */}
            <div>
              <label className="text-sm font-medium mb-2 block">Spacing</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    spacingMode === 'compact'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setSpacingMode('compact')}
                >
                  <span className="text-xs">Compact</span>
                </button>
                <button
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    spacingMode === 'normal'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setSpacingMode('normal')}
                >
                  <span className="text-xs">Normal</span>
                </button>
                <button
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    spacingMode === 'comfortable'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setSpacingMode('comfortable')}
                >
                  <span className="text-xs">Comfortable</span>
                </button>
              </div>
            </div>

            {/* Type Scale */}
            <div>
              <label className="text-sm font-medium mb-2 block">Type Scale</label>
              <div className="flex gap-2">
                <button
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors flex items-center justify-center ${
                    selectedScale === 'small'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setScale('small')}
                  title="Small Scale"
                >
                  <span className="text-sm font-bold text-foreground">Aa</span>
                </button>
                <button
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors flex items-center justify-center ${
                    selectedScale === 'regular'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setScale('regular')}
                  title="Regular Scale"
                >
                  <span className="text-base font-bold text-foreground">Aa</span>
                </button>
                <button
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors flex items-center justify-center ${
                    selectedScale === 'large'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setScale('large')}
                  title="Large Scale"
                >
                  <span className="text-lg font-bold text-foreground">Aa</span>
                </button>
              </div>
            </div>

          </CollapsibleContent>
        </Collapsible>

        {/* Styling Controls Section */}
        <StylingControls />

      </div>

      {/* Settings Button */}
      <div className="mt-auto pt-8 border-t border-border">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
}
