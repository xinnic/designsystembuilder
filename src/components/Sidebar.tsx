import React from 'react';
import { ChevronDown, Settings, Palette, Type, Grid } from 'lucide-react';
import StylingControls from '../left/StylingControls';
import { useDesignSystem } from '../state/designSystem';
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

// Import logos - Tailwind only
import tailwindLogo from '@/assets/logos/tailwind.png';

interface SidebarProps {}

const fonts = [
  { name: 'Plus Jakarta Sans', class: 'font-jakarta' },
  { name: 'Be Vietnam Pro', class: 'font-vietnam' },
  { name: 'Wix Madefor Text', class: 'font-wix' },
  { name: 'Figtree', class: 'font-figtree' },
  { name: 'Albert Sans', class: 'font-albert' },
  { name: 'Satoshi', class: 'font-satoshi' },
];

const scales = [
  { value: 'small', label: 'Small' },
  { value: 'regular', label: 'Regular' },
  { value: 'large', label: 'Large' },
];

const colorThemes = [
  { name: 'custom', color: 'rainbow', label: 'Custom', isCustom: true },
  { name: 'turquoise', color: '#1abc9c', label: 'Turquoise' },
  { name: 'emerald', color: '#2ecc71', label: 'Emerald' },
  { name: 'nephritis', color: '#27ae60', label: 'Nephritis' },
  { name: 'peter-river', color: '#3498db', label: 'Peter River' },
  { name: 'belize-hole', color: '#2980b9', label: 'Belize Hole' },
  { name: 'amethyst', color: '#9b59b6', label: 'Amethyst' },
  { name: 'wisteria', color: '#8e44ad', label: 'Wisteria' },
  { name: 'wet-asphalt', color: '#34495e', label: 'Wet Asphalt' },
  { name: 'midnight-blue', color: '#2c3e50', label: 'Midnight Blue' },
  { name: 'sun-flower', color: '#f1c40f', label: 'Sun Flower' },
  { name: 'orange', color: '#f39c12', label: 'Orange' },
  { name: 'carrot', color: '#e67e22', label: 'Carrot' },
  { name: 'pumpkin', color: '#d35400', label: 'Pumpkin' },
  { name: 'alizarin', color: '#e74c3c', label: 'Alizarin' },
  { name: 'pomegranate', color: '#c0392b', label: 'Pomegranate' },
  { name: 'concrete', color: '#95a5a6', label: 'Concrete' },
  { name: 'asbestos', color: '#7f8c8d', label: 'Asbestos' },
];

const accentColors = [
  { name: 'custom', color: 'rainbow', label: 'Custom', isCustom: true },
  { name: 'turquoise', color: '#1abc9c', label: 'Turquoise' },
  { name: 'emerald', color: '#2ecc71', label: 'Emerald' },
  { name: 'nephritis', color: '#27ae60', label: 'Nephritis' },
  { name: 'peter-river', color: '#3498db', label: 'Peter River' },
  { name: 'belize-hole', color: '#2980b9', label: 'Belize Hole' },
  { name: 'amethyst', color: '#9b59b6', label: 'Amethyst' },
  { name: 'wisteria', color: '#8e44ad', label: 'Wisteria' },
  { name: 'wet-asphalt', color: '#34495e', label: 'Wet Asphalt' },
  { name: 'midnight-blue', color: '#2c3e50', label: 'Midnight Blue' },
  { name: 'sun-flower', color: '#f1c40f', label: 'Sun Flower' },
  { name: 'orange', color: '#f39c12', label: 'Orange' },
  { name: 'carrot', color: '#e67e22', label: 'Carrot' },
  { name: 'pumpkin', color: '#d35400', label: 'Pumpkin' },
  { name: 'alizarin', color: '#e74c3c', label: 'Alizarin' },
  { name: 'pomegranate', color: '#c0392b', label: 'Pomegranate' },
  { name: 'concrete', color: '#95a5a6', label: 'Concrete' },
  { name: 'asbestos', color: '#7f8c8d', label: 'Asbestos' },
];

// Tailwind is the only supported library

export function Sidebar({}: SidebarProps) {
  const {
    selectedFont,
    setFont,
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
    isDarkMode,
    setDarkMode
  } = useDesignSystem();
  const [typographyOpen, setTypographyOpen] = React.useState(true);
  const [colorsOpen, setColorsOpen] = React.useState(true);

  return (
    <div className="w-80 bg-background border-r border-border h-screen overflow-y-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Design System Builder</h1>
        <p className="text-sm text-muted-foreground">
          Customize your design system and generate AI-ready prompts
        </p>
      </div>

      <div className="space-y-4">
        {/* Typography Section */}
        <Collapsible open={typographyOpen} onOpenChange={setTypographyOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted">
            <div className="flex items-center gap-3">
              <Type className="h-5 w-5" />
              <span className="font-medium">Typography</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${typographyOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 p-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Font Family</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className={`w-full justify-between ${selectedFont}`}>
                    {fonts.find(f => f.class === selectedFont)?.name || 'Select Font'}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] text-base" align="start">
                  {fonts.map((font) => (
                    <DropdownMenuItem
                      key={font.class}
                      onClick={() => setFont(font.class)}
                      className={`${font.class} text-base`}
                    >
                      {font.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

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

        {/* Colors Section */}
        <Collapsible open={colorsOpen} onOpenChange={setColorsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted">
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5" />
              <span className="font-medium">Colors</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${colorsOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 p-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Primary Color</label>
              <div className="grid grid-cols-6 gap-1">
                {colorThemes.map((theme) => (
                  <div key={theme.name} className="relative">
                    {theme.isCustom ? (
                      <div className="relative">
                        <input
                          type="color"
                          value={customPrimaryColor || '#3498db'}
                          onChange={(e) => {
                            setTheme('custom');
                            setCustomPrimaryColor(e.target.value);
                          }}
                          className="w-7 h-7 rounded-full border cursor-pointer opacity-0 absolute inset-0"
                          title={theme.label}
                        />
                        <div
                          className={`w-7 h-7 rounded-full border ${
                            selectedTheme === theme.name ? 'border-foreground border-2' : 'border-border'
                          } cursor-pointer`}
                          style={{
                            background: 'conic-gradient(from 0deg, #e74c3c 0deg, #f39c12 45deg, #f1c40f 90deg, #2ecc71 135deg, #1abc9c 180deg, #3498db 225deg, #9b59b6 270deg, #e91e63 315deg, #e74c3c 360deg)'
                          }}
                          onClick={() => {
                            setTheme('custom');
                            if (!customPrimaryColor) {
                              setCustomPrimaryColor('#3498db');
                            }
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
                        onClick={() => setTheme(theme.name)}
                        title={theme.label}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Accent Color</label>
              <div className="grid grid-cols-6 gap-1">
                {accentColors.map((accent) => (
                  <div key={accent.name} className="relative">
                    {accent.isCustom ? (
                      <div className="relative">
                        <input
                          type="color"
                          value={customAccentColor || '#1abc9c'}
                          onChange={(e) => {
                            setAccentColor('custom');
                            setCustomAccentColor(e.target.value);
                          }}
                          className="w-7 h-7 rounded-full border cursor-pointer opacity-0 absolute inset-0"
                          title={accent.label}
                        />
                        <div
                          className={`w-7 h-7 rounded-full border ${
                            selectedAccentColor === accent.name ? 'border-foreground border-2' : 'border-border'
                          } cursor-pointer`}
                          style={{
                            background: 'conic-gradient(from 0deg, #e74c3c 0deg, #f39c12 45deg, #f1c40f 90deg, #2ecc71 135deg, #1abc9c 180deg, #3498db 225deg, #9b59b6 270deg, #e91e63 315deg, #e74c3c 360deg)'
                          }}
                          onClick={() => {
                            setAccentColor('custom');
                            if (!customAccentColor) {
                              setCustomAccentColor('#1abc9c');
                            }
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
                        onClick={() => setAccentColor(accent.name)}
                        title={accent.label}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Dark Mode</label>
              <Switch checked={isDarkMode} onCheckedChange={setDarkMode} />
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