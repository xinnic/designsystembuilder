import React from 'react';
import { Button } from '@/components/ui/button';

interface DesignSystemOverviewProps {
  fontClass: string;
  selectedScale: string;
  selectedTheme: string;
  selectedAccentColor: string;
  customPrimaryColor?: string;
  customAccentColor?: string;
  isDarkMode: boolean;
  baseLib?: string;
}

const getTypographyScales = (selectedScale: string) => {
  const scales = {
    small: {
      'DISPLAY': { size: '48px', line: '56px', weight: '700', sample: 'The quick brown fox jumps over the lazy dog' },
      'HEADING 1': { size: '24px', line: '30px', weight: '700', sample: 'The quick brown fox jumps over the lazy dog' },
      'HEADING 2': { size: '20px', line: '26px', weight: '600', sample: 'The quick brown fox jumps over the lazy dog' },
      'SUBHEAD': { size: '16px', line: '22px', weight: '600', sample: 'The quick brown fox jumps over the lazy dog' },
      'BODY': { size: '14px', line: '20px', weight: '400', sample: 'The quick brown fox jumps over the lazy dog' },
      'CAPTION': { size: '12px', line: '16px', weight: '400', sample: 'The quick brown fox jumps over the lazy dog' },
      'BUTTON TEXT': { size: '18px', line: '26px', weight: '600', sample: 'Get Started Today', letterSpacing: '0.02em' },
      'BADGE': { size: '11px', line: '14px', weight: '500', sample: 'NEW FEATURE', letterSpacing: '0.05em' }
    },
    regular: {
      'DISPLAY': { size: '48px', line: '56px', weight: '700', sample: 'The quick brown fox jumps over the lazy dog' },
      'HEADING 1': { size: '28px', line: '38px', weight: '700', sample: 'The quick brown fox jumps over the lazy dog' },
      'HEADING 2': { size: '22px', line: '30px', weight: '600', sample: 'The quick brown fox jumps over the lazy dog' },
      'SUBHEAD': { size: '18px', line: '26px', weight: '600', sample: 'The quick brown fox jumps over the lazy dog' },
      'BODY': { size: '16px', line: '24px', weight: '400', sample: 'The quick brown fox jumps over the lazy dog' },
      'CAPTION': { size: '14px', line: '20px', weight: '400', sample: 'The quick brown fox jumps over the lazy dog' },
      'BUTTON TEXT': { size: '18px', line: '26px', weight: '600', sample: 'Get Started Today', letterSpacing: '0.02em' },
      'BADGE': { size: '12px', line: '16px', weight: '500', sample: 'NEW FEATURE', letterSpacing: '0.05em' }
    },
    large: {
      'DISPLAY': { size: '48px', line: '56px', weight: '700', sample: 'The quick brown fox jumps over the lazy dog' },
      'HEADING 1': { size: '36px', line: '44px', weight: '700', sample: 'The quick brown fox jumps over the lazy dog' },
      'HEADING 2': { size: '24px', line: '32px', weight: '600', sample: 'The quick brown fox jumps over the lazy dog' },
      'SUBHEAD': { size: '21px', line: '30px', weight: '600', sample: 'The quick brown fox jumps over the lazy dog' },
      'BODY': { size: '18px', line: '26px', weight: '400', sample: 'The quick brown fox jumps over the lazy dog' },
      'CAPTION': { size: '15px', line: '22px', weight: '400', sample: 'The quick brown fox jumps over the lazy dog' },
      'BUTTON TEXT': { size: '18px', line: '26px', weight: '600', sample: 'Get Started Today', letterSpacing: '0.02em' },
      'BADGE': { size: '13px', line: '18px', weight: '500', sample: 'NEW FEATURE', letterSpacing: '0.05em' }
    }
  };

  return scales[selectedScale as keyof typeof scales] || scales.regular;
};

const DesignSystemOverview: React.FC<DesignSystemOverviewProps> = ({
  fontClass,
  selectedScale,
  selectedTheme,
  selectedAccentColor,
  customPrimaryColor,
  customAccentColor,
  isDarkMode,
  baseLib = 'tailwind'
}) => {
  const typoScales = getTypographyScales(selectedScale);

  // Get the primary color based on selected theme
  const getPrimaryColor = () => {
    if (selectedTheme === 'custom') {
      return customPrimaryColor || '#3498db';
    }
    const colorMap = {
      turquoise: '#1abc9c',
      emerald: '#2ecc71',
      'peter-river': '#3498db',
      amethyst: '#9b59b6',
      'wet-asphalt': '#34495e',
      'sun-flower': '#f1c40f',
      carrot: '#e67e22',
      alizarin: '#e74c3c',
      concrete: '#95a5a6',
      orange: '#f39c12',
      pumpkin: '#d35400',
      pomegranate: '#c0392b',
      nephritis: '#27ae60',
      'belize-hole': '#2980b9',
      wisteria: '#8e44ad',
      'midnight-blue': '#2c3e50',
      asbestos: '#7f8c8d'
    };
    return colorMap[selectedTheme as keyof typeof colorMap] || '#1abc9c';
  };

  // Get accent color based on selected accent color
  const getAccentColor = () => {
    if (selectedAccentColor === 'custom') {
      return customAccentColor || '#1abc9c';
    }
    const accentMap = {
      turquoise: '#1abc9c',
      emerald: '#2ecc71',
      'peter-river': '#3498db',
      amethyst: '#9b59b6',
      'wet-asphalt': '#34495e',
      'sun-flower': '#f1c40f',
      carrot: '#e67e22',
      alizarin: '#e74c3c',
      concrete: '#95a5a6',
      orange: '#f39c12',
      pumpkin: '#d35400',
      pomegranate: '#c0392b',
      nephritis: '#27ae60',
      'belize-hole': '#2980b9',
      wisteria: '#8e44ad',
      'midnight-blue': '#2c3e50',
      asbestos: '#7f8c8d'
    };
    return accentMap[selectedAccentColor as keyof typeof accentMap] || '#1abc9c';
  };

  const primaryColor = getPrimaryColor();
  const accentColor = getAccentColor();

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
                  letterSpacing: (style as any).letterSpacing || 'normal',
                  textTransform: name === 'BADGE' ? 'uppercase' : 'none',
                }}
                className="text-foreground"
              >
                {style.sample}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Tokens Section */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Color Tokens</h2>

        <div className="grid grid-cols-6 gap-4">
          {/* Brand Colors */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg mb-2 mx-auto border border-border" style={{ backgroundColor: primaryColor }}></div>
            <div className="text-xs font-medium">Primary</div>
            <div className="text-xs text-muted-foreground">{primaryColor}</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-lg mb-2 mx-auto border border-border" style={{ backgroundColor: '#E8EBFF' }}></div>
            <div className="text-xs font-medium">Secondary</div>
            <div className="text-xs text-muted-foreground">#E8EBFF</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-lg mb-2 mx-auto border border-border" style={{ backgroundColor: accentColor }}></div>
            <div className="text-xs font-medium">Accent</div>
            <div className="text-xs text-muted-foreground">{accentColor}</div>
          </div>

          {/* Background Colors */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg mb-2 mx-auto border border-border" style={{ backgroundColor: '#F8F9FA' }}></div>
            <div className="text-xs font-medium">BG Primary</div>
            <div className="text-xs text-muted-foreground">#F8F9FA</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-lg mb-2 mx-auto border border-border" style={{ backgroundColor: '#FFFFFF' }}></div>
            <div className="text-xs font-medium">BG Secondary</div>
            <div className="text-xs text-muted-foreground">#FFFFFF</div>
          </div>

          {/* Text Colors */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg mb-2 mx-auto border border-border" style={{ backgroundColor: '#1A1A1A' }}></div>
            <div className="text-xs font-medium">Text Primary</div>
            <div className="text-xs text-muted-foreground">#1A1A1A</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-lg mb-2 mx-auto border border-border" style={{ backgroundColor: '#6C7588' }}></div>
            <div className="text-xs font-medium">Text Secondary</div>
            <div className="text-xs text-muted-foreground">#6C7588</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-lg mb-2 mx-auto border border-border" style={{ backgroundColor: '#A1A1A1' }}></div>
            <div className="text-xs font-medium">Text Disabled</div>
            <div className="text-xs text-muted-foreground">#A1A1A1</div>
          </div>

          {/* Semantic Colors */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg mb-2 mx-auto border border-border" style={{ backgroundColor: '#22c55e' }}></div>
            <div className="text-xs font-medium">Success</div>
            <div className="text-xs text-muted-foreground">#22c55e</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-lg mb-2 mx-auto border border-border" style={{ backgroundColor: '#f59e0b' }}></div>
            <div className="text-xs font-medium">Warning</div>
            <div className="text-xs text-muted-foreground">#f59e0b</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-lg mb-2 mx-auto border border-border" style={{ backgroundColor: '#3b82f6' }}></div>
            <div className="text-xs font-medium">Info</div>
            <div className="text-xs text-muted-foreground">#3b82f6</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-lg mb-2 mx-auto border border-border" style={{ backgroundColor: '#f44444' }}></div>
            <div className="text-xs font-medium">Destructive</div>
            <div className="text-xs text-muted-foreground">#f44444</div>
          </div>
        </div>
      </div>

      {/* Button Variants Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Button Variants</h2>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="link" className="text-primary underline-offset-4 hover:underline">Tertiary Action</Button>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button disabled>Disabled</Button>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button variant="destructive">Delete Account</Button>
          </div>
        </div>
      </div>

      {/* Elevation System Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Elevation System</h2>

        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-background border border-border rounded-lg shadow-sm mb-4 mx-auto flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">Level 1</span>
            </div>
            <div className="text-sm font-semibold">Level 1</div>
            <div className="text-xs text-muted-foreground">Cards, Inputs</div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-background border border-border rounded-lg shadow-md mb-4 mx-auto flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">Level 2</span>
            </div>
            <div className="text-sm font-semibold">Level 2</div>
            <div className="text-xs text-muted-foreground">Dropdowns, Popovers</div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-background border border-border rounded-lg shadow-lg mb-4 mx-auto flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">Level 3</span>
            </div>
            <div className="text-sm font-semibold">Level 3</div>
            <div className="text-xs text-muted-foreground">Modals, Drawers</div>
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

      {/* UX Best Practices Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">UX Best Practices</h2>
        <p className="text-sm text-muted-foreground">
          These guidelines will be included in your copyable prompt to ensure accessibility and quality standards.
        </p>

        <div className="space-y-6">
          {/* Accessibility & Quality */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Accessibility & Quality</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>WCAG AA compliance</strong> for all text and background combinations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Focus ring ≥ 2px</strong> with visible offset using tokenized focus color</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Interactive targets ≥ 44×44px</strong> following Apple HIG guidelines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Body text ≥ 14px</strong> for optimal readability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Respect reduced-motion</strong> preferences for animations</span>
              </li>
            </ul>
          </div>

          {/* Design Token Standards */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Design Token Standards</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">⚡</span>
                <span><strong>No hard-coded values</strong> - all colors, spacing, and typography reference tokens</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">⚡</span>
                <span><strong>Theme switching</strong> works by token swap only, no duplicate styles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">⚡</span>
                <span><strong>Component states</strong> (hover/focus/pressed) derive from token ramps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">⚡</span>
                <span><strong>Density changes</strong> achieved via token overrides only</span>
              </li>
            </ul>
          </div>

          {/* Component Guidelines */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Component Guidelines</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">🎨</span>
                <span><strong>Button hierarchy</strong> - Clear visual distinction between Primary, Secondary, Tertiary, and Destructive actions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">🎨</span>
                <span><strong>State feedback</strong> - Hover (~90% opacity), pressed (~80% opacity), and disabled states</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">🎨</span>
                <span><strong>Consistent spacing</strong> - 8-point grid system for all layouts and components</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemOverview;