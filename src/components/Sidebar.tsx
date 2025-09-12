import React from 'react';
import { ChevronDown, Settings, Palette, Type, Grid, CornerDownLeft, Layers } from 'lucide-react';
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

interface SidebarProps {
  selectedFont: string;
  onFontChange: (font: string) => void;
  selectedScale: string;
  onScaleChange: (scale: string) => void;
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  selectedBaseLib: string;
  onBaseLibChange: (lib: string) => void;
}

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
  { name: 'blue', color: '#1976D2', label: 'Blue' },
  { name: 'purple', color: '#7C3AED', label: 'Purple' },
  { name: 'pink', color: '#E91E63', label: 'Pink' },
  { name: 'red', color: '#DC2626', label: 'Red' },
  { name: 'yellow', color: '#F59E0B', label: 'Yellow' },
  { name: 'orange', color: '#EA580C', label: 'Orange' },
  { name: 'teal', color: '#0D9488', label: 'Teal' },
];

const baseLibraries = [
  { value: 'none', label: 'None (Raw CSS/JSON)', logo: '🎨' },
  { value: 'tailwind', label: 'Tailwind CSS', logo: '💨' },
  { value: 'shadcn', label: 'shadcn/ui', logo: '🎯' },
  { value: 'daisyui', label: 'DaisyUI', logo: '🌼' },
  { value: 'flowbite', label: 'Flowbite', logo: '🌊' },
  { value: 'radix', label: 'Radix UI', logo: '⚡' },
  { value: 'chakra', label: 'Chakra UI', logo: '⚡' },
  { value: 'mui', label: 'Material UI (MUI)', logo: '📱' },
];

export function Sidebar({
  selectedFont,
  onFontChange,
  selectedScale,
  onScaleChange,
  selectedTheme,
  onThemeChange,
  isDarkMode,
  onToggleDarkMode,
  selectedBaseLib,
  onBaseLibChange,
}: SidebarProps) {
  const [baseLibOpen, setBaseLibOpen] = React.useState(true);
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
        {/* Base Library Section */}
        <Collapsible open={baseLibOpen} onOpenChange={setBaseLibOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted">
            <div className="flex items-center gap-3">
              <Grid className="h-5 w-5" />
              <span className="font-medium">Base Library</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${baseLibOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 p-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Component Framework</label>
              <div className="space-y-2">
                {baseLibraries.map((lib) => (
                  <button
                    key={lib.value}
                    className={`w-full p-3 text-left rounded-lg border transition-colors ${
                      selectedBaseLib === lib.value 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:bg-muted'
                    }`}
                    onClick={() => onBaseLibChange(lib.value)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{lib.logo}</span>
                      <span className="text-sm font-medium">{lib.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

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
                  <Button variant="outline" className="w-full justify-between">
                    {fonts.find(f => f.class === selectedFont)?.name || 'Select Font'}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {fonts.map((font) => (
                    <DropdownMenuItem key={font.class} onClick={() => onFontChange(font.class)}>
                      {font.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Type Scale</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {scales.find(s => s.value === selectedScale)?.label || 'Select Scale'}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {scales.map((scale) => (
                    <DropdownMenuItem key={scale.value} onClick={() => onScaleChange(scale.value)}>
                      {scale.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
              <div className="grid grid-cols-4 gap-2">
                {colorThemes.map((theme) => (
                  <button
                    key={theme.name}
                    className={`w-10 h-10 rounded-lg border-2 ${
                      selectedTheme === theme.name ? 'border-foreground' : 'border-border'
                    }`}
                    style={{ backgroundColor: theme.color }}
                    onClick={() => onThemeChange(theme.name)}
                    title={theme.label}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Dark Mode</label>
              <Switch checked={isDarkMode} onCheckedChange={onToggleDarkMode} />
            </div>
          </CollapsibleContent>
        </Collapsible>

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