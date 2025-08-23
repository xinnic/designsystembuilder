import { Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface SettingsBarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
  selectedScale: string;
  onScaleChange: (scale: string) => void;
}

const colorThemes = [
  { name: 'blue', color: '#1976D2', label: 'Blue' },
  { name: 'purple', color: '#7B1FA2', label: 'Purple' },
  { name: 'pink', color: '#C2185B', label: 'Pink' },
  { name: 'red', color: '#D32F2F', label: 'Red' },
  { name: 'yellow', color: '#FBC02D', label: 'Yellow' },
  { name: 'orange', color: '#F57C00', label: 'Orange' },
  { name: 'teal', color: '#00796B', label: 'Teal' },
];

const typographicScales = [
  { value: 'small', label: 'Small' },
  { value: 'regular', label: 'Regular' },
  { value: 'large', label: 'Large' },
];

export function SettingsBar({ isDarkMode, onToggleDarkMode, selectedTheme, onThemeChange, selectedScale, onScaleChange }: SettingsBarProps) {
  return (
    <div className="border-b bg-card">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-heading-1 font-bold text-foreground">Design System Builder</h1>
            <p className="text-subhead text-secondary">Build styles at scale.</p>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Typography Scale Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-subhead font-semibold text-foreground">Scale:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
                    {typographicScales.find(scale => scale.value === selectedScale)?.label || 'Regular'}
                    <ChevronDown className="w-3 h-3 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  {typographicScales.map((scale) => (
                    <DropdownMenuItem
                      key={scale.value}
                      onClick={() => onScaleChange(scale.value)}
                      className={selectedScale === scale.value ? "bg-accent" : ""}
                    >
                      {scale.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Color Palette Switcher */}
            <div className="flex items-center gap-3">
              <span className="text-subhead font-semibold text-foreground">Colors:</span>
              <div className="flex gap-2">
                {colorThemes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => onThemeChange(theme.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                      selectedTheme === theme.name 
                        ? 'border-ring shadow-lg scale-110' 
                        : 'border-border hover:border-ring'
                    }`}
                    style={{ backgroundColor: theme.color }}
                    title={theme.label}
                  />
                ))}
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-subhead font-semibold text-foreground">Mode:</span>
              <button
                onClick={onToggleDarkMode}
                className="relative w-16 h-8 rounded-full transition-all duration-300 ease-in-out bg-primary"
              >
                <div
                  className={`
                    absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out
                    flex items-center justify-center
                    ${isDarkMode ? 'left-1' : 'left-9'}
                  `}
                >
                  {isDarkMode ? (
                    <Moon className="w-3 h-3 fill-orange-400 text-orange-400" />
                  ) : (
                    <Sun className="w-3 h-3 fill-orange-400 text-orange-400" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}