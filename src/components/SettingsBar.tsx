import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsBarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const colorThemes = [
  { name: 'blue', color: 'hsl(221, 83%, 53%)', label: 'Blue' },
  { name: 'purple', color: 'hsl(262, 83%, 58%)', label: 'Purple' },
  { name: 'green', color: 'hsl(142, 71%, 45%)', label: 'Green' },
  { name: 'orange', color: 'hsl(25, 95%, 53%)', label: 'Orange' },
  { name: 'pink', color: 'hsl(330, 81%, 60%)', label: 'Pink' },
];

export function SettingsBar({ isDarkMode, onToggleDarkMode, selectedTheme, onThemeChange }: SettingsBarProps) {
  return (
    <div className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-heading-1 font-bold">Font Harmony Palette</h1>
            <p className="text-subhead-regular text-muted-foreground">Professional typography preview tool</p>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Color Palette Switcher */}
            <div className="flex items-center gap-3">
              <span className="text-subhead-bold text-foreground">Colors:</span>
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
              <span className="text-subhead-bold text-foreground">Mode:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={onToggleDarkMode}
                className="w-20 justify-center"
              >
                {isDarkMode ? (
                  <>
                    <Moon className="w-4 h-4 mr-2" />
                    Dark
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 mr-2" />
                    Light
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}