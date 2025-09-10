import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DesignSystemOverviewProps {
  fontClass: string;
  selectedScale: string;
  selectedTheme: string;
  isDarkMode: boolean;
}

export function DesignSystemOverview({ fontClass, selectedScale, selectedTheme, isDarkMode }: DesignSystemOverviewProps) {
  const colorThemes = [
    { name: 'blue', color: '#1976D2' },
    { name: 'purple', color: '#7C3AED' },
    { name: 'pink', color: '#E91E63' },
    { name: 'red', color: '#DC2626' },
    { name: 'yellow', color: '#F59E0B' },
    { name: 'orange', color: '#EA580C' },
    { name: 'teal', color: '#0D9488' },
  ];

  const currentTheme = colorThemes.find(t => t.name === selectedTheme);

  return (
    <div className="p-8 overflow-x-auto">
      <div className="min-w-max space-y-8">
        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <CardContent className={`space-y-4 ${fontClass} scale-${selectedScale}`}>
            <div>
              <p className="text-eyebrow text-secondary mb-1">EYEBROW TEXT</p>
              <p className="text-eyebrow">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div>
              <p className="text-eyebrow text-secondary mb-1">HEADING 1</p>
              <h1 className="text-heading-1">The quick brown fox jumps over the lazy dog</h1>
            </div>
            <div>
              <p className="text-eyebrow text-secondary mb-1">HEADING 2</p>
              <h2 className="text-heading-2">The quick brown fox jumps over the lazy dog</h2>
            </div>
            <div>
              <p className="text-eyebrow text-secondary mb-1">SUBHEAD</p>
              <p className="text-subhead">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div>
              <p className="text-eyebrow text-secondary mb-1">BODY</p>
              <p className="text-body">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div>
              <p className="text-eyebrow text-secondary mb-1">CAPTION</p>
              <p className="text-caption">The quick brown fox jumps over the lazy dog</p>
            </div>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-lg mb-2 mx-auto"
                  style={{ backgroundColor: currentTheme?.color }}
                ></div>
                <p className="text-sm font-medium">Primary</p>
                <p className="text-xs text-muted-foreground">{currentTheme?.color}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg mb-2 mx-auto bg-background border"></div>
                <p className="text-sm font-medium">Background</p>
                <p className="text-xs text-muted-foreground">Dynamic</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg mb-2 mx-auto bg-foreground"></div>
                <p className="text-sm font-medium">Foreground</p>
                <p className="text-xs text-muted-foreground">Dynamic</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg mb-2 mx-auto bg-muted"></div>
                <p className="text-sm font-medium">Muted</p>
                <p className="text-xs text-muted-foreground">Dynamic</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="destructive">Destructive Button</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="default" size="sm">Small</Button>
                <Button variant="default" size="default">Default</Button>
                <Button variant="default" size="lg">Large</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="default" disabled>Disabled</Button>
                <Button variant="outline" disabled>Disabled Outline</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spacing */}
        <Card>
          <CardHeader>
            <CardTitle>Spacing Scale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((space) => (
                <div key={space} className="flex items-center gap-4">
                  <span className="text-sm font-mono w-12">--space-{space}</span>
                  <div 
                    className="bg-primary h-4 rounded"
                    style={{ width: `${space * 8}px` }}
                  ></div>
                  <span className="text-xs text-muted-foreground">{space * 8}px</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Border Radius */}
        <Card>
          <CardHeader>
            <CardTitle>Border Radius</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded border mb-2"></div>
                <p className="text-sm">Small</p>
                <p className="text-xs text-muted-foreground">8px</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg border mb-2"></div>
                <p className="text-sm">Medium</p>
                <p className="text-xs text-muted-foreground">16px</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-2xl border mb-2"></div>
                <p className="text-sm">Large</p>
                <p className="text-xs text-muted-foreground">24px</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-full border mb-2"></div>
                <p className="text-sm">Full</p>
                <p className="text-xs text-muted-foreground">999px</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shadows */}
        <Card>
          <CardHeader>
            <CardTitle>Elevation System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-background rounded shadow-sm border mb-2"></div>
                <p className="text-sm">Level 1</p>
                <p className="text-xs text-muted-foreground">Subtle</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-background rounded shadow-md border mb-2"></div>
                <p className="text-sm">Level 2</p>
                <p className="text-xs text-muted-foreground">Medium</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-background rounded shadow-lg border mb-2"></div>
                <p className="text-sm">Level 3</p>
                <p className="text-xs text-muted-foreground">Strong</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}