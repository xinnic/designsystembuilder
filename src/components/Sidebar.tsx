import React from 'react';
import { ChevronDown, Settings, Layers, Sliders, Navigation, Menu } from 'lucide-react';
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
import { stylePresets, getStylePreset, getStylePresetCSSVariables, type StylePresetId } from '../config/stylePresets';
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

interface SidebarProps { }

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

export function Sidebar({ }: SidebarProps) {
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

  // handleStylePresetChange now uses the imported stylePresets config
  const handleStylePresetChange = (presetId: StylePresetId) => {
    setStylePreset(presetId);
    const preset = getStylePreset(presetId);
    if (preset) {
      // Get all CSS variables for this preset
      const cssVariables = getStylePresetCSSVariables(preset, isDarkMode);

      // Apply CSS variables to document root
      const root = document.documentElement;
      Object.entries(cssVariables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      // Update tokens through the store
      const { tokens: presetTokens } = preset;
      setTokens({
        shadow: {
          '1': presetTokens.shadows.sm,
          '2': presetTokens.shadows.md,
          '3': presetTokens.shadows.lg
        },
        radius: {
          sm: `${presetTokens.radius.sm}px`,
          md: `${presetTokens.radius.md}px`,
          lg: `${presetTokens.radius.lg}px`,
          full: `${presetTokens.radius.full}px`
        },
        motion: {
          fast: `${presetTokens.animations.quick}ms`,
          base: `${presetTokens.animations.normal}ms`,
          slow: `${presetTokens.animations.slow}ms`,
          easeStandard: presetTokens.animations.curve
        }
      });

      // Update border weight based on preset
      const borderWidthKey = presetTokens.card.borderWidthKey;
      const borderWeight = borderWidthKey === 'none' ? 'none' :
        borderWidthKey === 'thin' || presetTokens.borderWidths[borderWidthKey] <= 1 ? 'thin' : 'thick';

      setOpts({
        cardBorderWeight: borderWeight,
        inputBorderWeight: borderWeight
      });

      toast({
        title: `Applied ${preset.name}`,
        description: preset.description,
      });
    }
  };

  return (
    <div className="w-80 h-screen overflow-y-auto p-6" style={{ boxShadow: '1px 0 3px rgba(0,0,0,0.04)', backgroundColor: 'rgb(var(--color-bg-primary))' }}>
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
                          className={`w-7 h-7 rounded-full border ${selectedTheme === theme.name ? 'border-foreground shadow-sm ring-1 ring-background' : 'border-border'
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
                        className={`w-7 h-7 rounded-md border ${selectedTheme === theme.name ? 'border-foreground shadow-sm ring-1 ring-background' : 'border-border'
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
                      className={`p-3 text-sm rounded border flex flex-col items-center gap-2 transition-all ${stylePresetId === preset.id
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
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-all shadow-sm ${opts.menuLayout === 'hamburger'
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
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-all shadow-sm ${opts.menuLayout === 'bottomBar'
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
                  className={`p-3 border transition-all shadow-sm flex items-center justify-center ${cornerRadius === 'none'
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
                  className={`p-3 border transition-all shadow-sm flex items-center justify-center ${cornerRadius === 'small'
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
                  className={`p-3 border transition-all shadow-sm flex items-center justify-center ${cornerRadius === 'medium'
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
                  className={`p-3 border transition-all shadow-sm flex items-center justify-center ${cornerRadius === 'large'
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
                          className={`w-7 h-7 rounded-full border ${selectedAccentColor === accent.name ? 'border-foreground shadow-sm ring-1 ring-background' : 'border-border'
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
                        className={`w-7 h-7 rounded-md border ${selectedAccentColor === accent.name ? 'border-foreground shadow-sm ring-1 ring-background' : 'border-border'
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
                  className={`p-3 rounded-lg border transition-all shadow-sm ${spacingMode === 'compact'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-muted'
                    }`}
                  onClick={() => setSpacingMode('compact')}
                >
                  <span className="text-xs">Compact</span>
                </button>
                <button
                  className={`p-3 rounded-lg border transition-all shadow-sm ${spacingMode === 'normal'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-muted'
                    }`}
                  onClick={() => setSpacingMode('normal')}
                >
                  <span className="text-xs">Normal</span>
                </button>
                <button
                  className={`p-3 rounded-lg border transition-all shadow-sm ${spacingMode === 'comfortable'
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
                  className={`flex-1 p-3 rounded-lg border transition-all shadow-sm flex items-center justify-center ${selectedScale === 'small'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-muted'
                    }`}
                  onClick={() => setScale('small')}
                  title="Small Scale"
                >
                  <span className="text-sm font-bold text-foreground">Aa</span>
                </button>
                <button
                  className={`flex-1 p-3 rounded-lg border transition-all shadow-sm flex items-center justify-center ${selectedScale === 'regular'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-muted'
                    }`}
                  onClick={() => setScale('regular')}
                  title="Regular Scale"
                >
                  <span className="text-base font-bold text-foreground">Aa</span>
                </button>
                <button
                  className={`flex-1 p-3 rounded-lg border transition-all shadow-sm flex items-center justify-center ${selectedScale === 'large'
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

            {/* Menu Layout */}
            <div>
              <label className="text-sm font-medium mb-2 block">Menu Layout</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className={`p-3 text-sm rounded border flex flex-col items-center gap-2 ${opts.menuLayout === 'bottomBar'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:bg-muted'
                    }`}
                  onClick={() => setOpts({ menuLayout: 'bottomBar' })}
                >
                  <Navigation size={16} />
                  <span>Bottom Bar</span>
                </button>
                <button
                  className={`p-3 text-sm rounded border flex flex-col items-center gap-2 ${opts.menuLayout === 'hamburger'
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
