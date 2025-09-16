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

// Panel Section wrapper with consistent spacing
const PanelSection = ({ 
  title, 
  subtitle, 
  children, 
  className = '' 
}: { 
  title?: string; 
  subtitle?: string; 
  children: React.ReactNode; 
  className?: string;
}) => (
  <div className={`rounded-[var(--radius-lg)] border border-[rgb(var(--color-border)/0.2)] bg-[rgb(var(--color-bg-primary))] shadow-[var(--shadow-1)] overflow-hidden ${className}`}>
    {(title || subtitle) && (
      <div className="border-b border-[rgb(var(--color-border)/0.15)] px-[var(--space-6)] py-[var(--space-4)]">
        {title && <h3 className="text-[var(--font-size-h2)] font-[var(--weight-semibold)] leading-[var(--line-h2)] text-[rgb(var(--color-text-primary))] mb-1">{title}</h3>}
        {subtitle && <p className="text-[var(--font-size-subhead)] leading-[var(--line-subhead)] text-[rgb(var(--color-text-secondary))]">{subtitle}</p>}
      </div>
    )}
    <div className="p-[var(--space-6)]">
      {children}
    </div>
  </div>
);

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
          return <Button variant={variant} size={size} className={`rounded-[var(--radius-md)] ${className}`} {...rest}>{children}</Button>;

        case 'daisyui':
          const daisyClass = variant === 'destructive' ? 'btn-error' :
                            variant === 'secondary' ? 'btn-outline' :
                            variant === 'ghost' ? 'btn-ghost' : 'btn-primary';
          return (
            <button
              className={`btn ${daisyClass} rounded-[var(--radius-md)] ${className}`}
              {...rest}
            >
              {children}
            </button>
          );

        default: // tailwind/none/flowbite/radix
          const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-focus))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
          const variantClasses = {
            default: 'bg-[rgb(var(--color-brand))] text-white hover:bg-[rgb(var(--color-brand)/0.9)]',
            secondary: 'border border-[rgb(var(--color-border))] bg-transparent hover:bg-[rgb(var(--color-bg-secondary))]',
            ghost: 'hover:bg-[rgb(var(--color-bg-secondary))] hover:text-[rgb(var(--color-text-primary))]',
            destructive: 'bg-[rgb(var(--color-danger))] text-white hover:bg-[rgb(var(--color-danger)/0.9)]'
          };
          const sizeClasses = {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 px-3',
            lg: 'h-11 px-8'
          };

          return (
            <button
              className={`${baseClasses} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default} ${sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default} rounded-[var(--radius-md)] ${className}`}
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
              className={`rounded-[var(--radius-md)] border border-[rgb(var(--color-border)/0.2)] bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-primary))] shadow-[var(--shadow-1)] overflow-hidden ${className}`}
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
              className={`flex h-10 w-full rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[rgb(var(--color-text-secondary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-focus))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
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
            <div className={`inline-flex items-center rounded-[var(--radius-full)] border border-[rgb(var(--color-border))] px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))] ${className}`}>
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
                checked ? 'bg-[rgb(var(--color-brand))]' : 'bg-[rgb(var(--color-bg-secondary))]'
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
      <PanelSection 
        title="Typography Scale" 
        subtitle="Font size, line height, and weight"
      >
        <div className={`space-y-[var(--space-4)] ${fontClass} ${isDensityCompact ? 'scale-90' : ''}`}>
          {Object.entries(typoScales).map(([name, style]) => (
            <div key={name} className="flex items-center justify-between py-[var(--space-2)]">
              <div className="flex-1">
                <p
                  className="text-[rgb(var(--color-text-primary))]"
                  style={{
                    fontSize: style.size,
                    lineHeight: style.line,
                    fontWeight: style.weight,
                    letterSpacing: (name === 'button' ? '0.02em' : name === 'eyebrow' ? '0.05em' : 'normal'),
                    textTransform: name === 'eyebrow' ? 'uppercase' : 'none'
                  }}
                >
                  {name === 'eyebrow' ? name.toUpperCase() : name.charAt(0).toUpperCase() + name.slice(1)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[rgb(var(--color-text-secondary))]">{style.size} / {style.line}</p>
                <p className="text-xs text-[rgb(var(--color-text-secondary))]">Weight: {style.weight}</p>
              </div>
            </div>
          ))}
        </div>
      </PanelSection>

      {/* Color Swatches Grid */}
      <PanelSection 
        title="Color Roles" 
        subtitle="Semantic color tokens"
      >
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
                className="w-12 h-12 rounded-[var(--radius-md)] border border-[rgb(var(--color-border)/0.25)] shadow-[var(--shadow-1)] mb-[var(--space-2)] mx-auto"
                style={{ backgroundColor: `rgb(var(${color.token}))` }}
              />
              <p className="text-xs font-medium text-[rgb(var(--color-text-primary))]">{color.name}</p>
              <p className="text-xs text-[rgb(var(--color-text-secondary))]">{color.desc}</p>
            </div>
          ))}
        </div>
      </PanelSection>

      {/* Radii, Shadows, Spacing Row */}
      <div className="grid grid-cols-3 gap-[var(--space-4)]">
        {/* Radii */}
        <PanelSection title="Radii">
          <div className="space-y-[var(--space-3)]">
            {['sm', 'md', 'lg', 'full'].map((radius) => (
              <div key={radius} className="flex items-center gap-[var(--space-3)]">
                <div
                  className={`w-8 h-8 bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border)/0.25)] shadow-[var(--shadow-1)]`}
                  style={{ borderRadius: `var(--radius-${radius})` }}
                />
                <span className="text-sm font-medium text-[rgb(var(--color-text-primary))]">{radius}</span>
              </div>
            ))}
          </div>
        </PanelSection>

        {/* Shadows */}
        <PanelSection title="Shadows">
          <div className="space-y-[var(--space-4)]">
            {['1', '2', '3'].map((level) => (
              <div key={level} className="text-center">
                <div
                  className="w-10 h-10 bg-[rgb(var(--color-bg-primary))] rounded-[var(--radius-md)] border border-[rgb(var(--color-border)/0.15)] mx-auto mb-[var(--space-2)]"
                  style={{ boxShadow: `var(--shadow-${level})` }}
                />
                <span className="text-xs font-medium text-[rgb(var(--color-text-primary))]">Level {level}</span>
              </div>
            ))}
          </div>
        </PanelSection>

        {/* Spacing Ladder */}
        <PanelSection title="Spacing">
          <div className="space-y-[var(--space-3)]">
            {[1, 2, 3, 4, 6, 8].map((space) => (
              <div key={space} className="flex items-center gap-[var(--space-3)]">
                <div
                  className="bg-[rgb(var(--color-brand))] h-3 rounded-[var(--radius-sm)]"
                  style={{ width: `${Math.min(space * 4, 32)}px` }}
                />
                <span className="text-xs font-medium text-[rgb(var(--color-text-primary))]">{space}</span>
              </div>
            ))}
          </div>
        </PanelSection>
      </div>

      {/* Density Toggle Preview */}
      <PanelSection 
        title="Density Preview" 
        subtitle="Comfortable vs Compact"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-[rgb(var(--color-text-secondary))]">Comfortable</span>
          <button
            className={`w-11 h-6 rounded-[var(--radius-full)] border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-focus))] focus-visible:ring-offset-2 ${
              isDensityCompact ? 'bg-[rgb(var(--color-brand))]' : 'bg-[rgb(var(--color-bg-secondary))]'
            }`}
            onClick={() => setIsDensityCompact(!isDensityCompact)}
          >
            <span
              className={`pointer-events-none block h-5 w-5 rounded-[var(--radius-full)] bg-white shadow-lg transition-transform ${
                isDensityCompact ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-sm text-[rgb(var(--color-text-secondary))]">Compact</span>
        </div>
      </PanelSection>
    </div>
  );
};

// Component Gallery based on selected library
const ComponentGallery = ({ baseLib }: { baseLib: string }) => {
  const components = useComponentLibrary(baseLib);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [selectedOption, setSelectedOption] = useState('option1');

  return (
    <div className="space-y-[var(--space-6)]">
      {/* Buttons */}
      <PanelSection title="Buttons" subtitle="Interactive controls">
        <div className="grid grid-cols-2 gap-[var(--space-4)]">
          <div className="space-y-[var(--space-3)]">
            <components.Button>Primary</components.Button>
            <components.Button variant="secondary">Secondary</components.Button>
            <components.Button variant="ghost">Ghost</components.Button>
            <components.Button variant="destructive">Destructive</components.Button>
          </div>
          <div className="space-y-[var(--space-3)]">
            <components.Button size="sm">Small</components.Button>
            <components.Button size="default">Default</components.Button>
            <components.Button size="lg">Large</components.Button>
            <components.Button disabled>Disabled</components.Button>
          </div>
        </div>
      </PanelSection>

      {/* Form Controls */}
      <PanelSection title="Form Controls" subtitle="Input and selection">
        <div className="space-y-[var(--space-4)]">
          <div>
            <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-[var(--space-2)]">Text Input</label>
            <components.Input placeholder="Enter your name..." />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-[var(--space-2)]">Password</label>
            <div className="relative">
              <components.Input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password..." 
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-primary))]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-[var(--space-3)]">Radio Options</label>
            <div className="space-y-[var(--space-2)]">
              {['option1', 'option2', 'option3'].map((option) => (
                <label key={option} className="flex items-center gap-[var(--space-2)] cursor-pointer">
                  <input
                    type="radio"
                    name="example"
                    value={option}
                    checked={selectedOption === option}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-4 h-4 text-[rgb(var(--color-brand))] border-[rgb(var(--color-border))] focus:ring-[rgb(var(--color-focus))] focus:ring-2"
                  />
                  <span className="text-sm text-[rgb(var(--color-text-primary))] capitalize">{option.replace('option', 'Option ')}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[rgb(var(--color-text-primary))]">Enable Notifications</p>
              <p className="text-sm text-[rgb(var(--color-text-secondary))]">Receive updates about your activity</p>
            </div>
            <components.Switch checked={notificationEnabled} onCheckedChange={setNotificationEnabled} />
          </div>
        </div>
      </PanelSection>

      {/* Cards */}
      <PanelSection title="Cards" subtitle="Content containers">
        <div className="grid grid-cols-1 gap-[var(--space-4)]">
          <components.Card>
            <div className="p-[var(--space-4)]">
              <div className="flex items-center gap-[var(--space-3)] mb-[var(--space-3)]">
                <div className="w-10 h-10 rounded-full bg-[rgb(var(--color-brand))] flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[rgb(var(--color-text-primary))]">User Profile</h4>
                  <p className="text-sm text-[rgb(var(--color-text-secondary))]">Manage your account</p>
                </div>
              </div>
              <div className="flex gap-[var(--space-2)]">
                <components.Badge>Active</components.Badge>
                <components.Badge>Premium</components.Badge>
              </div>
            </div>
          </components.Card>

          <components.Card>
            <div className="p-[var(--space-4)]">
              <div className="flex items-center justify-between mb-[var(--space-3)]">
                <div className="flex items-center gap-[var(--space-2)]">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full bg-[rgb(var(--color-brand))] flex items-center justify-center hover:bg-[rgb(var(--color-brand)/0.9)] transition-colors"
                  >
                    {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white ml-0.5" />}
                  </button>
                  <div>
                    <h4 className="font-semibold text-[rgb(var(--color-text-primary))]">Now Playing</h4>
                    <p className="text-sm text-[rgb(var(--color-text-secondary))]">Your favorite track</p>
                  </div>
                </div>
                <button className="p-1 hover:bg-[rgb(var(--color-bg-secondary))] rounded-md transition-colors">
                  <MoreHorizontal size={16} className="text-[rgb(var(--color-text-secondary))]" />
                </button>
              </div>
              <div className="w-full bg-[rgb(var(--color-bg-secondary))] rounded-[var(--radius-full)] h-2">
                <div className="bg-[rgb(var(--color-brand))] h-2 rounded-[var(--radius-full)] w-1/3"></div>
              </div>
            </div>
          </components.Card>
        </div>
      </PanelSection>

      {/* Alerts */}
      <PanelSection title="Alerts" subtitle="Status messages">
        <div className="space-y-[var(--space-3)]">
          <div className="flex items-center gap-[var(--space-3)] p-[var(--space-3)] rounded-[var(--radius-md)] bg-[rgb(var(--color-brand)/0.1)] border border-[rgb(var(--color-brand)/0.2)]">
            <Info size={16} className="text-[rgb(var(--color-brand))] flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[rgb(var(--color-text-primary))]">Information</p>
              <p className="text-sm text-[rgb(var(--color-text-secondary))]">This is an informational message</p>
            </div>
          </div>
          
          <div className="flex items-center gap-[var(--space-3)] p-[var(--space-3)] rounded-[var(--radius-md)] bg-green-50 border border-green-200">
            <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[rgb(var(--color-text-primary))]">Success</p>
              <p className="text-sm text-[rgb(var(--color-text-secondary))]">Operation completed successfully</p>
            </div>
          </div>
          
          <div className="flex items-center gap-[var(--space-3)] p-[var(--space-3)] rounded-[var(--radius-md)] bg-[rgb(var(--color-danger)/0.1)] border border-[rgb(var(--color-danger)/0.2)]">
            <AlertTriangle size={16} className="text-[rgb(var(--color-danger))] flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[rgb(var(--color-text-primary))]">Warning</p>
              <p className="text-sm text-[rgb(var(--color-text-secondary))]">Please review this action</p>
            </div>
          </div>
        </div>
      </PanelSection>
    </div>
  );
};

export const DesignSystemOverview = ({
  fontClass,
  selectedScale,
  selectedTheme,
  isDarkMode,
  baseLib = 'tailwind'
}: DesignSystemOverviewProps) => {
  const [activeTab, setActiveTab] = useState('foundations');

  return (
    <div className="h-full bg-[rgb(var(--color-bg-secondary)/0.3)] overflow-hidden">
      <div className="h-full overflow-y-auto p-[var(--space-6)] space-y-[var(--space-6)]">
        {/* Header */}
        <div className="space-y-[var(--space-2)]">
          <h1 className="text-[var(--font-size-h1)] font-[var(--weight-bold)] leading-[var(--line-h1)] text-[rgb(var(--color-text-primary))]">
            Design System Overview
          </h1>
          <p className="text-[var(--font-size-subhead)] leading-[var(--line-subhead)] text-[rgb(var(--color-text-secondary))]">
            Live tokens and component examples
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-[var(--space-1)] p-[var(--space-1)] bg-[rgb(var(--color-bg-secondary))] rounded-[var(--radius-lg)] border border-[rgb(var(--color-border)/0.2)]">
          {[
            { id: 'foundations', label: 'Foundations' },
            { id: 'components', label: 'Components' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-[var(--space-4)] py-[var(--space-2)] rounded-[var(--radius-md)] text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-primary))] shadow-[var(--shadow-1)]'
                  : 'text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-bg-primary)/0.5)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-0">
          {activeTab === 'foundations' && (
            <FoundationsSummary selectedScale={selectedScale} fontClass={fontClass} />
          )}
          {activeTab === 'components' && (
            <ComponentGallery baseLib={baseLib} />
          )}
        </div>
      </div>
    </div>
  );
};