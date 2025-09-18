import React, { useState } from 'react';
import { useDesignSystem, useTokenCSS } from '../state/designSystem';
import { playHaptic } from '../platform/haptics';
import {
  Bell,
  Home,
  Compass,
  Activity,
  User,
  Settings,
  Clock,
  Smile,
  Play,
  Heart,
  Users,
  BookOpen,
  Star,
  Award,
  LogOut,
  Sun,
  Moon,
  MoreVertical,
  ChevronRight,
  Camera,
  MessageCircle,
  Share2
} from 'lucide-react';

// Import shadcn/ui components - they'll only be used when baseLib is 'shadcn'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import new layout system
import { PhoneScaffold } from './preview/layout/PhoneScaffold';
import { Section } from './preview/layout/Section';
import { CardTile } from './preview/parts/CardTile';
import { ListItem } from './preview/parts/ListItem';

interface MobileAppPreviewProps {
  fontClass: string;
  selectedScale: string;
  isDarkMode: boolean;
  selectedTheme: string;
  baseLib?: string;
}

// Base component factory based on library
const useComponentLibrary = (baseLib: string) => {
  const getBaseLib = () => {
    return baseLib || document.documentElement.getAttribute("data-base-lib") || "tailwind";
  };

  const currentLib = getBaseLib();

  const components = {
    // Button component factory
    Button: (props: any) => {
      const { children, variant = 'default', size = 'default', className = '', onClick, ...rest } = props;

      const handleClick = (e: any) => {
        if (variant === 'destructive') {
          playHaptic('error');
        } else if (variant === 'default') {
          playHaptic('medium');
        } else {
          playHaptic('light');
        }
        onClick?.(e);
      };

      switch (currentLib) {
        case 'shadcn':
          return <Button variant={variant} size={size} className={className} onClick={handleClick} {...rest}>{children}</Button>;

        case 'daisyui':
          const daisyClass = variant === 'destructive' ? 'btn-error' :
                            variant === 'secondary' ? 'btn-outline' :
                            variant === 'ghost' ? 'btn-ghost' : 'btn-primary';
          return (
            <button
              className={`btn ${daisyClass} rounded-[var(--radius-full)] ${className}`}
              onClick={handleClick}
              {...rest}
            >
              {children}
            </button>
          );

        default: // tailwind/none/flowbite/radix
          const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
          const variantClasses = {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            secondary: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
          };
          const sizeClasses = {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 px-3',
            lg: 'h-11 px-8'
          };

          return (
            <button
              className={`${baseClasses} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default} ${sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default} rounded-[var(--radius-md)] ${className}`}
              onClick={handleClick}
              {...rest}
            >
              {children}
            </button>
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
            <div className={`inline-flex items-center rounded-[var(--radius-full)] border border-input px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-secondary text-secondary-foreground ${className}`}>
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
                checked ? 'bg-primary' : 'bg-input'
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
              className={`flex h-10 w-full rounded-[var(--radius-md)] border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
              {...rest}
            />
          );
      }
    }
  };

  return components;
};

// Real image URLs
const IMAGES = {
  postHero: 'https://picsum.photos/seed/post-hero/720/480',
  carousel: [
    'https://picsum.photos/seed/trend1/600/400',
    'https://picsum.photos/seed/trend2/600/400',
    'https://picsum.photos/seed/trend3/600/400',
    'https://picsum.photos/seed/trend4/600/400',
    'https://picsum.photos/seed/trend5/600/400'
  ],
  avatars: [
    'https://picsum.photos/seed/avatar1/96',
    'https://picsum.photos/seed/avatar2/96',
    'https://picsum.photos/seed/avatar3/96'
  ]
};

const BottomTabBar = () => {
  const { opts } = useDesignSystem();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { icon: Home, label: 'Home' },
    { icon: Compass, label: 'Explore' },
    { icon: Activity, label: 'Activities' },
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' },
  ];

  if (opts.menuLayout === 'hamburger') {
    return (
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between p-4 bg-background/95 backdrop-blur-sm border-b border-border">
          <button className="p-2 hover:bg-secondary rounded-md transition-colors">
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-foreground"></div>
              <div className="w-6 h-0.5 bg-foreground"></div>
              <div className="w-6 h-0.5 bg-foreground"></div>
            </div>
          </button>
          <h1 className="text-lg font-semibold text-foreground">Good morning, Emma</h1>
          <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
            <Bell size={16} className="text-foreground" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur-sm">
      <div className="flex justify-around py-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <button
              key={index}
              onClick={() => {
                playHaptic('light');
                setActiveTab(index);
              }}
              className={`flex flex-col items-center justify-center p-2 text-xs transition-colors min-w-[44px] min-h-[44px] rounded-md ${
                activeTab === index
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const MobileAppPreview = ({
  fontClass,
  selectedScale,
  isDarkMode,
  selectedTheme,
  baseLib = 'tailwind'
}: MobileAppPreviewProps) => {
  // Initialize token CSS binding
  useTokenCSS();
  const { opts } = useDesignSystem();

  const components = useComponentLibrary(baseLib);
  const [selectedMood, setSelectedMood] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [selectedGender, setSelectedGender] = useState('female');

  const moods = ['😊', '😐', '😞'];
  const filters = ['Activity', 'Mood', 'Food', 'Sleep'];

  return (
    <div className="h-full flex items-start justify-center p-8 bg-muted/20 min-h-[600px]">
      {/* Phone Frame with soft shadows */}
      <div className={`w-80 h-[640px] bg-background border-8 border-muted rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative ${fontClass}`}>
        {/* Status Bar */}
        <div className="h-6 bg-background flex items-center justify-center">
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-foreground rounded-full"></div>
              <div className="w-1 h-1 bg-foreground rounded-full"></div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            </div>
            <span className="text-xs font-medium mx-2 text-foreground">9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-2 border border-foreground rounded-sm">
                <div className="w-3 h-1 bg-foreground rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Header - only show for bottomBar layout */}
        {opts.menuLayout === 'bottomBar' && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <h1 className="text-lg font-semibold text-foreground">Good morning, Emma</h1>
            <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <Bell size={16} className="text-foreground" />
            </button>
          </div>
        )}

        {/* Scrollable Content with new layout system */}
        <div className={`flex-1 overflow-y-auto ${opts.menuLayout === 'hamburger' ? 'pt-16' : ''}`}>
          <PhoneScaffold>

            {/* Filter Chips */}
            <Section gap="var(--tile-gap)">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {filters.map((filter, index) => (
                  <button
                    key={filter}
                    onClick={() => {
                      playHaptic('light');
                      setActiveFilter(index);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      activeFilter === index
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </Section>


            {/* Post Card */}
            <Section>
              <CardTile onClick={() => console.log('Clicked post card')}>
                <div className="rounded-[var(--radius-md)] overflow-hidden mb-3">
                  <img
                    src={IMAGES.postHero}
                    alt="Post hero"
                    className="w-full aspect-video object-cover"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={IMAGES.avatars[0]}
                    alt="User"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Sarah Chen</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <button className="p-1 hover:bg-secondary rounded-sm transition-colors">
                    <MoreVertical size={16} className="text-muted-foreground" />
                  </button>
                </div>

                <h3 className="font-semibold text-foreground mb-2">
                  New York Music Festival 2023
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Thank you new york city — an unforgettable show.
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <components.Badge>Mindfulness</components.Badge>
                  <components.Badge>Morning</components.Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                      <Heart size={16} />
                      <span className="text-sm">24</span>
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle size={16} />
                      <span className="text-sm">8</span>
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </CardTile>
            </Section>

            {/* Trending Carousel */}
            <Section title="Trending Now">
              <div className="flex gap-[var(--tile-gap)] overflow-x-auto snap-x">
                {IMAGES.carousel.map((image, index) => (
                  <div key={index} className="min-w-[240px] snap-start rounded-surface">
                    <img
                      src={image}
                      alt={`Trending ${index + 1}`}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="p-2 text-foreground">A curated moment</div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Recent Activity */}
            <Section title="Recent Activity">
              <div className="space-y-3">
                {[
                  { avatar: IMAGES.avatars[1], name: 'Alex', action: 'liked your meditation session', time: '5m' },
                  { avatar: IMAGES.avatars[2], name: 'Maya', action: 'commented on your post', time: '1h' },
                  { avatar: IMAGES.avatars[0], name: 'Community', action: 'New challenge available', time: '2h' }
                ].map((item, index) => (
                  <ListItem
                    key={index}
                    avatarUrl={item.avatar}
                    title={<><span className="font-medium">{item.name}</span> {item.action}</>}
                    subtitle={`${item.time} ago`}
                    trailing={<ChevronRight size={16} className="text-muted-foreground" />}
                    onClick={() => console.log(`Clicked ${item.name}`)}
                  />
                ))}
              </div>
            </Section>

            {/* Banner CTA */}
            <Section>
              <CardTile>
                <div className="text-center">
                  <h3 className="font-semibold text-foreground mb-2">
                    Upgrade to Premium
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Unlock advanced features and personalized insights
                  </p>
                  <components.Button className="w-full">
                    Start Free Trial
                  </components.Button>
                </div>
              </CardTile>
            </Section>

            {/* Account Form */}
            <Section title="Account Settings">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <components.Input placeholder="Emma Williams" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <components.Input type="email" placeholder="emma@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                  <select className="w-full h-10 rounded-[var(--radius-md)] border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
              </div>
            </Section>

            {/* Settings */}
            <Section title="Preferences">
              <div className="space-y-4">
                {/* Gender Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Gender</label>
                  <div className="flex gap-4">
                    {['female', 'male', 'other'].map((gender) => (
                      <label key={gender} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={selectedGender === gender}
                          onChange={(e) => setSelectedGender(e.target.value)}
                          className="w-4 h-4 text-primary border-input focus:ring-ring focus:ring-2"
                        />
                        <span className="text-sm text-foreground capitalize">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Switches */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Switch to dark theme</p>
                    </div>
                    <components.Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Weekly Summary</p>
                      <p className="text-sm text-muted-foreground">Email reports</p>
                    </div>
                    <components.Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
                  </div>
                </div>
              </div>
            </Section>
          </PhoneScaffold>
        </div>

        {/* Bottom Tab Bar */}
        <BottomTabBar />
      </div>
    </div>
  );
};