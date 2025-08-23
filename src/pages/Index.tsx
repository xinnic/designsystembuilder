import React, { useState, useEffect } from "react";
import { SettingsBar } from "@/components/SettingsBar";
import { FontPreviewColumn } from "@/components/FontPreviewColumn";

const fonts = [
  { name: "Plus Jakarta Sans", class: "font-jakarta" },
  { name: "Be Vietnam Pro", class: "font-vietnam" },
  { name: "Wix Madefor Text", class: "font-wix" },
  { name: "Figtree", class: "font-figtree" },
  { name: "Albert Sans", class: "font-albert" },
  { name: "Satoshi", class: "font-satoshi" },
];

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('blue');

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('theme-blue', 'theme-purple', 'theme-pink', 'theme-red', 'theme-yellow', 'theme-orange', 'theme-teal');
    
    // Apply theme
    root.classList.add(`theme-${selectedTheme}`);
    
    // Apply dark mode
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode, selectedTheme]);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
  };

  return (
    <div className="min-h-screen bg-background">
      <SettingsBar
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        selectedTheme={selectedTheme}
        onThemeChange={handleThemeChange}
      />
      
      <main className="px-6 py-8 overflow-x-auto">
        <div className="space-y-6 min-w-max">
          {fonts.map((font) => (
            <FontPreviewColumn
              key={font.name}
              fontName={font.name}
              fontClass={font.class}
              selectedTheme={selectedTheme}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;