import React, { useState } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Settings,
  ChevronDown,
  Play,
  Pause,
  MoreHorizontal,
  Bell,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

// Import shadcn/ui components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface DesignSystemOverviewProps {
  fontClass: string;
  selectedScale: string;
  selectedTheme: string;
  isDarkMode: boolean;
  baseLib?: string;
}

// Component factory similar to MobileAppPreview
const useComponentLibrary = (baseLib: string) => {
  const getBaseLib = () => {
    return baseLib || document.documentElement.getAttribute("data-base-lib") || "tailwind";
  };

  const currentLib = getBaseLib();

  const components = {
    // Button component factory
    Button: (props: any) => {
      const { children, variant = 'default', size = 'default', className = '', ...rest } = props;

      switch (currentLib) {
        case 'shadcn':
          return <Button variant={variant} size={size} className={`rounded-[var(--radius-full)] ${className}`} {...rest}>{children}</Button>;

        case 'daisyui':
          const daisyClass = variant === 'destructive' ? 'btn-error' :
                            variant === 'secondary' ? 'btn-outline' :
                            variant === 'ghost' ? 'btn-ghost' : 'btn-primary';
          return (
            <button
              className={`btn ${daisyClass} rounded-[var(--radius-full)] ${className}`}
              {...rest}
            >
              {children}
            </button>
          );

        default: // tailwind/none/flowbite/radix
          const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
          const variantClasses = {
            default: 'bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand)]/90',
            secondary: 'border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-bg-secondary)]',
            ghost: 'hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]',
            destructive: 'bg-[var(--color-danger)] text-white hover:bg-[var(--color-danger)]/90'
          };
          const sizeClasses = {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 px-3',
            lg: 'h-11 px-8'
          };

          return (
            <button
              className={`${baseClasses} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default} ${sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default} rounded-[var(--radius-full)] ${className}`}
              {...rest}
            >
              {children}
            </button>
          );
      }
    },

    // Card component factory
    Card: (props: any) => {
      const { children, className = '', ...rest } = props;

      switch (currentLib) {
        case 'shadcn':
          return <Card className={`rounded-[var(--radius-md)] shadow-[var(--shadow-1)] ${className}`} {...rest}>{children}</Card>;

        case 'daisyui':
          return (
            <div
              className={`card bg-base-100 shadow-[var(--shadow-1)] rounded-[var(--radius-md)] overflow-hidden ${className}`}
              {...rest}
            >
              <div className="card-body p-[var(--space-4)]">{children}</div>
            </div>
          );

        default:
          return (
            <div
              className={`rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] shadow-[var(--shadow-1)] overflow-hidden ${className}`}
              {...rest}
            >
              {children}
            </div>
          );
      }
    },

    // Input component factory
    Input: (props: any) => {
      const { className = '', ...rest } = props;

      switch (currentLib) {
        case 'shadcn':
          return <Input className={`rounded-[var(--radius-md)] ${className}`} {...rest} />;

        case 'daisyui':
          return <input className={`input input-bordered rounded-[var(--radius-md)] ${className}`} {...rest} />;

        default:
          return (
            <input
              className={`flex h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
              {...rest}
            />
          );
      }
    },

    // Badge component factory
    Badge: (props: any) => {
      const { children, variant = 'default', className = '' } = props;

      switch (currentLib) {
        case 'shadcn':
          return <Badge variant={variant} className={`rounded-[var(--radius-full)] ${className}`}>{children}</Badge>;

        case 'daisyui':
          return <div className={`badge badge-outline rounded-[var(--radius-full)] ${className}`}>{children}</div>;

        default:
          return (
            <div className={`inline-flex items-center rounded-[var(--radius-full)] border border-[var(--color-border)] px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] ${className}`}>
              {children}
            </div>
          );
      }
    },

    // Switch component factory
    Switch: (props: any) => {
      const { checked, onCheckedChange, className = '' } = props;

      switch (currentLib) {
        case 'shadcn':
          return <Switch checked={checked} onCheckedChange={onCheckedChange} className={className} />;

        case 'daisyui':
          return (
            <input
              type="checkbox"
              className={`toggle toggle-primary ${className}`}
              checked={checked}
              onChange={(e) => onCheckedChange?.(e.target.checked)}
            />
          );

        default:
          return (
            <button
              type="button"
              className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-[var(--radius-full)] border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                checked ? 'bg-[var(--color-brand)]' : 'bg-[var(--color-bg-secondary)]'
              } ${className}`}
              onClick={() => onCheckedChange?.(!checked)}
            >
              <span
                className={`pointer-events-none block h-5 w-5 rounded-[var(--radius-full)] bg-background shadow-lg ring-0 transition-transform ${
                  checked ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          );
      }
    }
  };

  return components;
};

// Typography scale data
const getTypographyScales = (selectedScale: string) => {
  const scales = {
    small: {
      displayLarge: { size: '36px', line: '44px', weight: '700' },
      displayMedium: { size: '30px', line: '36px', weight: '700' },
      h1: { size: '24px', line: '30px', weight: '700' },
      h2: { size: '20px', line: '26px', weight: '600' },
      subhead: { size: '16px', line: '22px', weight: '600' },
      body: { size: '14px', line: '20px', weight: '400' },
      caption: { size: '12px', line: '16px', weight: '400' },
      button: { size: '16px', line: '22px', weight: '600', tracking: '0.02em' },
      eyebrow: { size: '11px', line: '14px', weight: '500', tracking: '0.05em' }
    },
    regular: {
      displayLarge: { size: '48px', line: '56px', weight: '700' },
      displayMedium: { size: '36px', line: '44px', weight: '700' },
      h1: { size: '28px', line: '38px', weight: '700' },
      h2: { size: '22px', line: '30px', weight: '600' },
      subhead: { size: '18px', line: '26px', weight: '600' },
      body: { size: '16px', line: '24px', weight: '400' },
      caption: { size: '14px', line: '20px', weight: '400' },
      button: { size: '18px', line: '26px', weight: '600', tracking: '0.02em' },
      eyebrow: { size: '12px', line: '16px', weight: '500', tracking: '0.05em' }
    },
    large: {
      displayLarge: { size: '60px', line: '68px', weight: '700' },
      displayMedium: { size: '48px', line: '56px', weight: '700' },
      h1: { size: '36px', line: '44px', weight: '700' },
      h2: { size: '24px', line: '32px', weight: '600' },
      subhead: { size: '21px', line: '30px', weight: '600' },
      body: { size: '18px', line: '26px', weight: '400' },
      caption: { size: '15px', line: '22px', weight: '400' },
      button: { size: '20px', line: '28px', weight: '600', tracking: '0.02em' },
      eyebrow: { size: '13px', line: '18px', weight: '500', tracking: '0.05em' }
    }
  };

  return scales[selectedScale as keyof typeof scales] || scales.regular;
};

// Foundations Summary Component
const FoundationsSummary = ({ selectedScale, fontClass }: any) => {
  const [isDensityCompact, setIsDensityCompact] = useState(false);
  const typoScales = getTypographyScales(selectedScale);

  return (
    <div className="space-y-[var(--space-6)]">
      {/* Typography Scale Table */}
      <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] overflow-hidden">
        <div className="border-b border-[var(--color-border)] p-[var(--space-4)]">
          <h3 className="font-semibold text-[var(--color-text-primary)]">Typography Scale</h3>
          <p className="text-sm text-[var(--color-text-secondary)]">Font size, line height, and weight</p>
        </div>
        <div className="p-[var(--space-4)]">
          <div className={`space-y-[var(--space-3)] ${fontClass} ${isDensityCompact ? 'scale-90' : ''}`}>
            {Object.entries(typoScales).map(([name, style]) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex-1">
                  <p
                    className="text-[var(--color-text-primary)]"
                    style={{
                      fontSize: style.size,
                      lineHeight: style.line,
                      fontWeight: style.weight,
                      letterSpacing: style.tracking || 'normal',
                      textTransform: name === 'eyebrow' ? 'uppercase' : 'none'
                    }}
                  >
                    {name === 'eyebrow' ? name.toUpperCase() : name.charAt(0).toUpperCase() + name.slice(1)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[var(--color-text-secondary)]">{style.size} / {style.line}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Weight: {style.weight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Color Swatches Grid */}
      <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] overflow-hidden">
        <div className="border-b border-[var(--color-border)] p-[var(--space-4)]">
          <h3 className="font-semibold text-[var(--color-text-primary)]">Color Roles</h3>
          <p className="text-sm text-[var(--color-text-secondary)]">Semantic color tokens</p>
        </div>
        <div className="p-[var(--space-4)]">
          <div className="grid grid-cols-3 gap-[var(--space-4)]">
            {[
              { name: 'Brand', token: '--color-brand', desc: 'Primary actions' },
              { name: 'Brand Weak', token: '--color-brand-weak', desc: 'Supporting' },
              { name: 'Text Primary', token: '--color-text-primary', desc: 'Main content' },
              { name: 'Text Secondary', token: '--color-text-secondary', desc: 'Supporting text' },
              { name: 'BG Primary', token: '--color-bg-primary', desc: 'Main surfaces' },
              { name: 'BG Secondary', token: '--color-bg-secondary', desc: 'Cards, inputs' },
              { name: 'Border', token: '--color-border', desc: 'Dividers' },
              { name: 'Focus', token: '--color-focus', desc: 'Focus rings' },
              { name: 'Danger', token: '--color-danger', desc: 'Destructive' }
            ].map((color) => (
              <div key={color.name} className="text-center">
                <div
                  className="w-12 h-12 rounded-[var(--radius-md)] border border-[var(--color-border)] mb-[var(--space-2)] mx-auto"
                  style={{ backgroundColor: `var(${color.token})` }}
                />
                <p className="text-xs font-medium text-[var(--color-text-primary)]">{color.name}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{color.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Radii, Shadows, Spacing Row */}
      <div className="grid grid-cols-3 gap-[var(--space-4)]">
        {/* Radii */}
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-[var(--space-4)]">
          <h4 className="font-medium text-[var(--color-text-primary)] mb-[var(--space-3)]">Radii</h4>
          <div className="space-y-[var(--space-2)]">
            {['sm', 'md', 'lg', 'full'].map((radius) => (
              <div key={radius} className="flex items-center gap-[var(--space-2)]">
                <div
                  className={`w-6 h-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)]`}
                  style={{ borderRadius: `var(--radius-${radius})` }}
                />
                <span className="text-sm text-[var(--color-text-primary)]">{radius}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shadows */}
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-[var(--space-4)]">
          <h4 className="font-medium text-[var(--color-text-primary)] mb-[var(--space-3)]">Shadows</h4>
          <div className="space-y-[var(--space-3)]">
            {['1', '2', '3'].map((level) => (
              <div key={level} className="text-center">
                <div
                  className="w-8 h-8 bg-[var(--color-bg-primary)] rounded-[var(--radius-sm)] border border-[var(--color-border)] mx-auto mb-1"
                  style={{ boxShadow: `var(--shadow-${level})` }}
                />
                <span className="text-xs text-[var(--color-text-primary)]">Level {level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spacing Ladder */}
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-[var(--space-4)]">
          <h4 className="font-medium text-[var(--color-text-primary)] mb-[var(--space-3)]">Spacing</h4>
          <div className="space-y-[var(--space-2)]">
            {[1, 2, 3, 4, 6, 8].map((space) => (
              <div key={space} className="flex items-center gap-[var(--space-2)]">
                <div
                  className="bg-[var(--color-brand)] h-2 rounded-[var(--radius-sm)]"
                  style={{ width: `${space * 4}px` }}
                />
                <span className="text-xs text-[var(--color-text-primary)]">{space}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Density Toggle Preview */}
      <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-[var(--space-4)]">
        <div className="flex items-center justify-between mb-[var(--space-4)]">
          <div>
            <h4 className="font-medium text-[var(--color-text-primary)]">Density Preview</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">Comfortable vs Compact</p>
          </div>
          <div className="flex items-center gap-[var(--space-2)]">
            <span className="text-sm text-[var(--color-text-secondary)]">Comfortable</span>
            <button
              className={`w-11 h-6 rounded-[var(--radius-full)] border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 ${
                isDensityCompact ? 'bg-[var(--color-brand)]' : 'bg-[var(--color-bg-secondary)]'
              }`}
              onClick={() => setIsDensityCompact(!isDensityCompact)}
            >
              <span
                className={`pointer-events-none block h-5 w-5 rounded-[var(--radius-full)] bg-white shadow-lg transition-transform ${
                  isDensityCompact ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-sm text-[var(--color-text-secondary)]">Compact</span>
          </div>
        </div>
        <div className={`transition-all duration-200 ${isDensityCompact ? 'scale-90 space-y-1' : 'space-y-2'}`}>
          <div className="p-[var(--space-3)] bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)]">
            <p className={`font-medium text-[var(--color-text-primary)] ${isDensityCompact ? 'text-sm' : ''}`}>Sample Card</p>
            <p className={`text-[var(--color-text-secondary)] ${isDensityCompact ? 'text-xs' : 'text-sm'}`}>Content adjusts with density</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component Gallery per library
const ComponentGallery = ({ baseLib, components }: any) => {
  const [activeTab, setActiveTab] = useState('buttons');
  const [switchChecked, setSwitchChecked] = useState(true);
  const [radioValue, setRadioValue] = useState('option1');

  const getLibraryNote = () => {
    switch (baseLib) {
      case 'shadcn':
        return "Using shadcn components; visuals themed via tokens.";
      case 'daisyui':
        return "Components are native DaisyUI; theme values come from tokens (rounded-box/btn/badge, shadows, colors).";
      case 'tailwind':
        return "Utility-composed components with tokenized classes.";
      case 'none':
        return "Framework-agnostic components using CSS custom properties.";
      case 'flowbite':
        return "Flowbite components with tokenized Tailwind theming.";
      case 'radix':
        return "Radix primitives styled with tokens and data-state attributes.";
      case 'chakra':
        return "Chakra UI with theme radii/shadows/colors mapped to tokens.";
      case 'mui':
        return "Material UI with theme configured from design tokens.";
      default:
        return "Custom components using design tokens.";
    }
  };

  return (
    <div className="space-y-[var(--space-4)]">
      <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] overflow-hidden">
        <div className="border-b border-[var(--color-border)] p-[var(--space-4)]">
          <h3 className="font-semibold text-[var(--color-text-primary)]">Component Gallery</h3>
          <p className="text-sm text-[var(--color-text-secondary)]">{getLibraryNote()}</p>
        </div>

        <div className="p-[var(--space-4)]">
          {/* Tab Navigation */}
          <div className="flex gap-[var(--space-2)] mb-[var(--space-6)] overflow-x-auto pb-[var(--space-2)]">
            {['buttons', 'inputs', 'cards', 'feedback', 'forms'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-[var(--space-4)] py-[var(--space-2)] rounded-[var(--radius-full)] text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-[var(--color-brand)] text-white'
                    : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]/80'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-[var(--space-6)]">
            {activeTab === 'buttons' && (
              <div className="space-y-[var(--space-4)]">
                <div>
                  <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-[var(--space-3)]">Button Variants</h4>
                  <div className="flex flex-wrap gap-[var(--space-3)]">
                    <components.Button variant="default">Primary</components.Button>
                    <components.Button variant="secondary">Secondary</components.Button>
                    <components.Button variant="ghost">Ghost</components.Button>
                    <components.Button variant="destructive">Destructive</components.Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-[var(--space-3)]">Button States</h4>
                  <div className="flex flex-wrap gap-[var(--space-3)]">
                    <components.Button variant="default">Default</components.Button>
                    <components.Button variant="default" className="hover:bg-[var(--color-brand)]/90">Hover</components.Button>
                    <components.Button variant="default" className="bg-[var(--color-brand)]/80">Pressed</components.Button>
                    <components.Button variant="default" className="ring-2 ring-[var(--color-focus)] ring-offset-2">Focused</components.Button>
                    <components.Button variant="default" disabled>Disabled</components.Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-[var(--space-3)]">Button Sizes</h4>
                  <div className="flex flex-wrap items-center gap-[var(--space-3)]">
                    <components.Button size="sm">Small</components.Button>
                    <components.Button size="default">Default</components.Button>
                    <components.Button size="lg">Large</components.Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inputs' && (
              <div className="space-y-[var(--space-4)]">
                <div>
                  <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-[var(--space-3)]">Text Inputs</h4>
                  <div className="space-y-[var(--space-3)] max-w-sm">
                    <components.Input placeholder="Default input" />
                    <components.Input placeholder="Focused input" className="ring-2 ring-[var(--color-focus)] ring-offset-2" />
                    <components.Input placeholder="Error input" className="border-[var(--color-danger)] ring-2 ring-[var(--color-danger)]/20" />
                    <components.Input placeholder="Disabled input" disabled />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-[var(--space-3)]">Select & Textarea</h4>
                  <div className="space-y-[var(--space-3)] max-w-sm">
                    <select className="w-full h-10 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2">
                      <option>Choose option...</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm placeholder:text-[var(--color-text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2"
                      placeholder="Type your message here..."
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cards' && (
              <div className="space-y-[var(--space-4)]">
                <div>
                  <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-[var(--space-3)]">Card Variants</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-4)]">
                    <components.Card>
                      <div className="p-[var(--space-4)]">
                        <h5 className="font-medium text-[var(--color-text-primary)] mb-[var(--space-2)]">Default Card</h5>
                        <p className="text-sm text-[var(--color-text-secondary)]">Simple card with border and shadow using tokens.</p>
                      </div>
                    </components.Card>

                    <components.Card>
                      <div className="aspect-video w-full bg-gradient-to-br from-[var(--color-brand)]/20 to-[var(--color-brand)]/5 rounded-t-[var(--radius-md)] flex items-center justify-center overflow-hidden">
                        <span className="text-2xl">🖼️</span>
                      </div>
                      <div className="p-[var(--space-4)]">
                        <h5 className="font-medium text-[var(--color-text-primary)] mb-[var(--space-2)]">Featured Card</h5>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-[var(--space-3)]">Card with media area and action.</p>
                        <components.Button size="sm" className="w-full">Learn More</components.Button>
                      </div>
                    </components.Card>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="space-y-[var(--space-4)]">
                <div>
                  <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-[var(--space-3)]">Badges & Tags</h4>
                  <div className="flex flex-wrap gap-[var(--space-2)]">
                    <components.Badge>Default</components.Badge>
                    <components.Badge className="bg-[var(--color-brand)] text-white">Primary</components.Badge>
                    <components.Badge className="bg-[var(--color-danger)] text-white">Error</components.Badge>
                    <components.Badge className="bg-green-500 text-white">Success</components.Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-[var(--space-3)]">Alerts</h4>
                  <div className="space-y-[var(--space-3)]">
                    <div className="flex items-center gap-[var(--space-3)] p-[var(--space-4)] bg-blue-50 border border-blue-200 rounded-[var(--radius-md)]">
                      <Info size={16} className="text-blue-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-900">Information</p>
                        <p className="text-sm text-blue-700">This is an informational alert with rounded corners.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-[var(--space-3)] p-[var(--space-4)] bg-green-50 border border-green-200 rounded-[var(--radius-md)]">
                      <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-900">Success</p>
                        <p className="text-sm text-green-700">Operation completed successfully.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-[var(--space-3)] p-[var(--space-4)] bg-red-50 border border-red-200 rounded-[var(--radius-md)]">
                      <AlertTriangle size={16} className="text-red-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-900">Error</p>
                        <p className="text-sm text-red-700">Something went wrong. Please try again.</p>
                      </div>
                      <button className="p-1 hover:bg-red-100 rounded-[var(--radius-sm)] transition-colors">
                        <X size={14} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'forms' && (
              <div className="space-y-[var(--space-4)]">
                <div>
                  <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-[var(--space-3)]">Form Controls</h4>
                  <div className="space-y-[var(--space-4)] max-w-sm">
                    <div className="space-y-[var(--space-3)]">
                      <label className="flex items-center gap-[var(--space-2)] cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded-[var(--radius-sm)] border-[var(--color-border)] text-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-focus)]" />
                        <span className="text-sm text-[var(--color-text-primary)]">Checkbox option</span>
                      </label>

                      <label className="flex items-center gap-[var(--space-2)] cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded-[var(--radius-sm)] border-[var(--color-border)] text-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-focus)]" checked />
                        <span className="text-sm text-[var(--color-text-primary)]">Checked checkbox</span>
                      </label>
                    </div>

                    <div className="space-y-[var(--space-3)]">
                      <label className="flex items-center gap-[var(--space-2)] cursor-pointer">
                        <input
                          type="radio"
                          name="radio-example"
                          value="option1"
                          checked={radioValue === 'option1'}
                          onChange={(e) => setRadioValue(e.target.value)}
                          className="w-4 h-4 border-[var(--color-border)] text-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-focus)]"
                        />
                        <span className="text-sm text-[var(--color-text-primary)]">Radio option 1</span>
                      </label>

                      <label className="flex items-center gap-[var(--space-2)] cursor-pointer">
                        <input
                          type="radio"
                          name="radio-example"
                          value="option2"
                          checked={radioValue === 'option2'}
                          onChange={(e) => setRadioValue(e.target.value)}
                          className="w-4 h-4 border-[var(--color-border)] text-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-focus)]"
                        />
                        <span className="text-sm text-[var(--color-text-primary)]">Radio option 2</span>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text-primary)]">Enable notifications</p>
                        <p className="text-xs text-[var(--color-text-secondary)]">Receive email updates</p>
                      </div>
                      <components.Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export function DesignSystemOverview({
  fontClass,
  selectedScale,
  selectedTheme,
  isDarkMode,
  baseLib = 'tailwind'
}: DesignSystemOverviewProps) {
  const components = useComponentLibrary(baseLib);

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-[var(--space-8)] space-y-[var(--space-8)]">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-[var(--space-2)]">
            Design System Overview
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Live tokens and components for {baseLib === 'shadcn' ? 'shadcn/ui' : baseLib === 'daisyui' ? 'DaisyUI' : baseLib.charAt(0).toUpperCase() + baseLib.slice(1)}
          </p>
        </div>

        {/* Foundations Summary */}
        <FoundationsSummary selectedScale={selectedScale} fontClass={fontClass} />

        {/* Component Gallery */}
        <ComponentGallery baseLib={baseLib} components={components} />
      </div>
    </div>
  );
}