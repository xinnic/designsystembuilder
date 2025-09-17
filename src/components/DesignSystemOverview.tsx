import React from 'react';
import { Button } from '@/components/ui/button';

interface DesignSystemOverviewProps {
  fontClass: string;
  selectedScale: string;
  selectedTheme: string;
  isDarkMode: boolean;
  baseLib?: string;
}

const getTypographyScales = (selectedScale: string) => {
  const scales = {
    small: {
      'EYEBROW TEXT': { size: '11px', line: '14px', weight: '500', sample: 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG' },
      'HEADING 1': { size: '24px', line: '30px', weight: '700', sample: 'The quick brown fox jumps over the lazy dog' },
      'HEADING 2': { size: '20px', line: '26px', weight: '600', sample: 'The quick brown fox jumps over the lazy dog' },
      'SUBHEAD': { size: '16px', line: '22px', weight: '600', sample: 'The quick brown fox jumps over the lazy dog' },
      'BODY': { size: '14px', line: '20px', weight: '400', sample: 'The quick brown fox jumps over the lazy dog' },
      'CAPTION': { size: '12px', line: '16px', weight: '400', sample: 'The quick brown fox jumps over the lazy dog' }
    },
    regular: {
      'EYEBROW TEXT': { size: '12px', line: '16px', weight: '500', sample: 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG' },
      'HEADING 1': { size: '28px', line: '38px', weight: '700', sample: 'The quick brown fox jumps over the lazy dog' },
      'HEADING 2': { size: '22px', line: '30px', weight: '600', sample: 'The quick brown fox jumps over the lazy dog' },
      'SUBHEAD': { size: '18px', line: '26px', weight: '600', sample: 'The quick brown fox jumps over the lazy dog' },
      'BODY': { size: '16px', line: '24px', weight: '400', sample: 'The quick brown fox jumps over the lazy dog' },
      'CAPTION': { size: '14px', line: '20px', weight: '400', sample: 'The quick brown fox jumps over the lazy dog' }
    },
    large: {
      'EYEBROW TEXT': { size: '13px', line: '18px', weight: '500', sample: 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG' },
      'HEADING 1': { size: '36px', line: '44px', weight: '700', sample: 'The quick brown fox jumps over the lazy dog' },
      'HEADING 2': { size: '24px', line: '32px', weight: '600', sample: 'The quick brown fox jumps over the lazy dog' },
      'SUBHEAD': { size: '21px', line: '30px', weight: '600', sample: 'The quick brown fox jumps over the lazy dog' },
      'BODY': { size: '18px', line: '26px', weight: '400', sample: 'The quick brown fox jumps over the lazy dog' },
      'CAPTION': { size: '15px', line: '22px', weight: '400', sample: 'The quick brown fox jumps over the lazy dog' }
    }
  };

  return scales[selectedScale as keyof typeof scales] || scales.regular;
};

const DesignSystemOverview: React.FC<DesignSystemOverviewProps> = ({
  fontClass,
  selectedScale,
  selectedTheme,
  isDarkMode,
  baseLib = 'shadcn'
}) => {
  const typoScales = getTypographyScales(selectedScale);

  return (
    <div className="p-8 space-y-12 bg-background text-foreground overflow-y-auto max-h-full">
      {/* Typography Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Typography</h2>
        
        <div className={`space-y-6 ${fontClass}`}>
          {Object.entries(typoScales).map(([name, style]) => (
            <div key={name} className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {name}
              </div>
              <div
                style={{
                  fontSize: style.size,
                  lineHeight: style.line,
                  fontWeight: style.weight,
                  letterSpacing: name === 'EYEBROW TEXT' ? '0.05em' : 'normal',
                }}
                className="text-foreground"
              >
                {style.sample}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Color Palette</h2>
        
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-24 h-24 rounded-2xl bg-primary mb-4 mx-auto"></div>
            <div className="text-lg font-semibold">Primary</div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-2xl bg-background border-2 border-border mb-4 mx-auto"></div>
            <div className="text-lg font-semibold">Background</div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-2xl bg-foreground mb-4 mx-auto"></div>
            <div className="text-lg font-semibold">Foreground</div>
          </div>
        </div>
      </div>

      {/* Button Variants Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Button Variants</h2>
        
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>Disabled Outline</Button>
          </div>
        </div>
      </div>

      {/* Spacing Scale Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Spacing Scale</h2>
        
        <div className="space-y-4">
          {[
            { name: 'space-1', size: '8px', width: 8 },
            { name: 'space-2', size: '16px', width: 16 },
            { name: 'space-3', size: '24px', width: 24 },
            { name: 'space-4', size: '32px', width: 32 },
            { name: 'space-5', size: '40px', width: 40 }
          ].map((space) => (
            <div key={space.name} className="flex items-center gap-4">
              <div
                className="bg-primary rounded h-4"
                style={{ width: `${space.width}px` }}
              />
              <div className="text-sm font-medium text-muted-foreground">
                {space.size}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignSystemOverview;