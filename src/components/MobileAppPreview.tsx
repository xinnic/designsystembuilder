import React, { useState, useEffect } from 'react';
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
    // Read from props first, then document attribute, fallback to tailwind
    return baseLib || document.documentElement.getAttribute("data-base-lib") || "tailwind";
  };

  const currentLib = getBaseLib();

  const components = {
    // Button component factory
    Button: (props: any) => {
      const { children, variant = 'default', size = 'default', className = '', ...rest } = props;

      switch (currentLib) {
        case 'shadcn':
          return <Button variant={variant} size={size} className={className} {...rest}>{children}</Button>;

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
              className={`card bg-base-100 shadow-[var(--shadow-1)] rounded-[var(--radius-md)] ${className}`}
              {...rest}
            >
              <div className="card-body">{children}</div>
            </div>
          );

        default: // tailwind/none/flowbite/radix
          return (
            <div
              className={`rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] shadow-[var(--shadow-1)] ${className}`}
              {...rest}
            >
              {children}
            </div>
          );
      }
    },

    // Avatar component factory
    Avatar: (props: any) => {
      const { src, alt, fallback, className = '', size = 'default' } = props;
      const sizeClass = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16' : 'w-10 h-10';

      switch (currentLib) {
        case 'shadcn':
          return (
            <Avatar className={`${sizeClass} ${className}`}>
              <AvatarImage src={src} alt={alt} />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
          );

        case 'daisyui':
          return (
            <div className={`avatar ${className}`}>
              <div className={`${sizeClass} rounded-[var(--radius-full)]`}>
                <img src={src} alt={alt} className="rounded-[var(--radius-full)]" />
              </div>
            </div>
          );

        default:
          return (
            <div className={`relative flex ${sizeClass} shrink-0 overflow-hidden rounded-[var(--radius-full)] ${className}`}>
              <img className="aspect-square h-full w-full" src={src} alt={alt} />
            </div>
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

// Phone layout components
const PhoneHeader = ({ components }: any) => (
  <div className="flex items-center justify-between p-[var(--space-4)] border-b border-[var(--color-border)]">
    <div className="w-8 h-8 bg-[var(--color-brand)] rounded-[var(--radius-md)] flex items-center justify-center">
      <span className="text-white font-bold text-sm">A</span>
    </div>
    <h1 className="text-lg font-semibold text-[var(--color-text-primary)]">Good morning, Emma</h1>
    <button className="w-8 h-8 rounded-[var(--radius-full)] bg-[var(--color-bg-secondary)] flex items-center justify-center hover:bg-[var(--color-bg-secondary)]/80 transition-colors">
      <Bell size={16} className="text-[var(--color-text-primary)]" />
    </button>
  </div>
);

const MoodSection = ({ components }: any) => {
  const [selectedMood, setSelectedMood] = useState(0);
  const moods = ['😊', '😐', '😞'];

  return (
    <div className="p-[var(--space-4)]">
      <h2 className="text-lg font-medium text-[var(--color-text-secondary)] mb-[var(--space-3)]">
        How are you feeling today?
      </h2>
      <div className="flex gap-[var(--space-3)]">
        {moods.map((mood, index) => (
          <button
            key={index}
            onClick={() => setSelectedMood(index)}
            className={`w-12 h-12 rounded-[var(--radius-full)] border-2 flex items-center justify-center text-xl transition-all hover:scale-105 ${
              selectedMood === index
                ? 'border-[var(--color-brand)] bg-[var(--color-brand)]/10'
                : 'border-[var(--color-border)] hover:border-[var(--color-brand)]/50'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
};

const FilterChips = ({ components }: any) => {
  const [activeFilter, setActiveFilter] = useState(0);
  const filters = ['Activity', 'Mood', 'Food', 'Sleep'];

  return (
    <div className="px-[var(--space-4)] pb-[var(--space-2)]">
      <div className="flex gap-[var(--space-2)] overflow-x-auto pb-[var(--space-2)]">
        {filters.map((filter, index) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(index)}
            className={`px-[var(--space-4)] py-[var(--space-2)] rounded-[var(--radius-full)] text-sm font-medium transition-colors whitespace-nowrap ${
              activeFilter === index
                ? 'bg-[var(--color-brand)] text-white'
                : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]/80'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

const MetricCards = ({ components }: any) => (
  <div className="px-[var(--space-4)] pb-[var(--space-4)]">
    <div className="flex gap-[var(--space-3)] overflow-x-auto pb-[var(--space-2)]">
      <components.Card className="p-[var(--space-4)] flex items-center gap-[var(--space-3)] min-w-[140px]">
        <div className="w-10 h-10 rounded-[var(--radius-full)] bg-[var(--color-brand)]/10 flex items-center justify-center">
          <Clock size={20} className="text-[var(--color-brand)]" />
        </div>
        <div>
          <p className="text-sm text-[var(--color-text-secondary)]">Focus Time</p>
          <p className="font-semibold text-[var(--color-text-primary)]">2h 15m</p>
        </div>
      </components.Card>

      <components.Card className="p-[var(--space-4)] flex items-center gap-[var(--space-3)] min-w-[140px]">
        <div className="w-10 h-10 rounded-[var(--radius-full)] bg-[var(--color-brand)]/10 flex items-center justify-center">
          <Smile size={20} className="text-[var(--color-brand)]" />
        </div>
        <div>
          <p className="text-sm text-[var(--color-text-secondary)]">Mood Level</p>
          <p className="font-semibold text-[var(--color-text-primary)]">7/10 avg</p>
        </div>
      </components.Card>
    </div>
  </div>
);

const PostCard = ({ components }: any) => (
  <div className="px-[var(--space-4)] pb-[var(--space-4)]">
    <components.Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={IMAGES.postHero}
          alt="Post hero"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-[var(--space-4)]">
        <div className="flex items-center gap-[var(--space-2)] mb-[var(--space-3)]">
          <components.Avatar src={IMAGES.avatars[0]} alt="User" fallback="U" size="sm" />
          <div className="flex-1">
            <p className="font-medium text-[var(--color-text-primary)]">Sarah Chen</p>
            <p className="text-xs text-[var(--color-text-secondary)]">2 hours ago</p>
          </div>
          <button className="p-1 hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-sm)] transition-colors">
            <MoreVertical size={16} className="text-[var(--color-text-secondary)]" />
          </button>
        </div>

        <h3 className="font-semibold text-[var(--color-text-primary)] mb-[var(--space-2)]">
          Morning Meditation in the Mountains
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-[var(--space-3)]">
          Started my day with 20 minutes of mindfulness practice. The sunrise view made it even more special.
        </p>

        <div className="flex items-center gap-[var(--space-2)] mb-[var(--space-3)]">
          <components.Badge>Mindfulness</components.Badge>
          <components.Badge>Morning</components.Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[var(--space-4)]">
            <button className="flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">
              <Heart size={16} />
              <span className="text-sm">24</span>
            </button>
            <button className="flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">
              <MessageCircle size={16} />
              <span className="text-sm">8</span>
            </button>
            <button className="flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </components.Card>
  </div>
);

const TrendingCarousel = ({ components }: any) => (
  <div className="px-[var(--space-4)] pb-[var(--space-4)]">
    <h3 className="font-medium text-[var(--color-text-primary)] mb-[var(--space-3)]">Trending</h3>
    <div className="flex gap-[var(--space-3)] overflow-x-auto pb-[var(--space-2)] snap-x snap-mandatory">
      {IMAGES.carousel.map((image, index) => (
        <div key={index} className="flex-shrink-0 w-32 snap-start">
          <components.Card className="overflow-hidden">
            <div className="aspect-square w-full overflow-hidden">
              <img
                src={image}
                alt={`Trending ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-[var(--space-2)]">
              <p className="text-xs font-medium text-[var(--color-text-primary)]">
                Trend {index + 1}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {['Yoga', 'Meditation', 'Breathing', 'Nature', 'Wellness'][index]}
              </p>
            </div>
          </components.Card>
        </div>
      ))}
    </div>
  </div>
);

const NotificationsList = ({ components }: any) => (
  <div className="px-[var(--space-4)] pb-[var(--space-4)]">
    <h3 className="font-medium text-[var(--color-text-primary)] mb-[var(--space-3)]">Recent Activity</h3>
    <div className="space-y-[var(--space-3)]">
      {[
        { avatar: IMAGES.avatars[1], name: 'Alex', action: 'liked your meditation session', time: '5m' },
        { avatar: IMAGES.avatars[2], name: 'Maya', action: 'commented on your post', time: '1h' },
        { avatar: IMAGES.avatars[0], name: 'Community', action: 'New challenge available', time: '2h' }
      ].map((item, index) => (
        <div key={index} className="flex items-center gap-[var(--space-3)]">
          <components.Avatar src={item.avatar} alt={item.name} fallback={item.name[0]} size="sm" />
          <div className="flex-1">
            <p className="text-sm text-[var(--color-text-primary)]">
              <span className="font-medium">{item.name}</span> {item.action}
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">{item.time} ago</p>
          </div>
          <ChevronRight size={16} className="text-[var(--color-text-secondary)]" />
        </div>
      ))}
    </div>
  </div>
);

const BannerCTA = ({ components }: any) => (
  <div className="px-[var(--space-4)] pb-[var(--space-4)]">
    <components.Card className="p-[var(--space-4)] bg-gradient-to-r from-[var(--color-brand)]/10 to-[var(--color-brand)]/5 border-[var(--color-brand)]/20">
      <div className="text-center">
        <h3 className="font-semibold text-[var(--color-text-primary)] mb-[var(--space-2)]">
          Upgrade to Premium
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-[var(--space-4)]">
          Unlock advanced features and personalized insights
        </p>
        <components.Button className="w-full">
          Start Free Trial
        </components.Button>
      </div>
    </components.Card>
  </div>
);

const AccountForm = ({ components }: any) => (
  <div className="px-[var(--space-4)] pb-[var(--space-4)]">
    <h3 className="font-medium text-[var(--color-text-primary)] mb-[var(--space-4)]">Account Settings</h3>
    <div className="space-y-[var(--space-4)]">
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-[var(--space-2)]">Name</label>
        <components.Input placeholder="Emma Williams" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-[var(--space-2)]">Email</label>
        <components.Input type="email" placeholder="emma@example.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-[var(--space-2)]">Country</label>
        <select className="w-full h-10 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2">
          <option>United States</option>
          <option>Canada</option>
          <option>United Kingdom</option>
        </select>
      </div>
    </div>
  </div>
);

const SettingsGroup = ({ components }: any) => {
  const [darkMode, setDarkMode] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [selectedGender, setSelectedGender] = useState('female');

  return (
    <div className="px-[var(--space-4)] pb-[var(--space-6)]">
      <h3 className="font-medium text-[var(--color-text-primary)] mb-[var(--space-4)]">Preferences</h3>

      <div className="space-y-[var(--space-4)]">
        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-[var(--space-2)]">Gender</label>
          <div className="flex gap-[var(--space-4)]">
            {['female', 'male', 'other'].map((gender) => (
              <label key={gender} className="flex items-center gap-[var(--space-2)] cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={selectedGender === gender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-4 h-4 text-[var(--color-brand)] border-[var(--color-border)] focus:ring-[var(--color-focus)] focus:ring-2"
                />
                <span className="text-sm text-[var(--color-text-primary)] capitalize">{gender}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Switches */}
        <div className="space-y-[var(--space-4)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Dark Mode</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Switch to dark theme</p>
            </div>
            <components.Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Weekly Summary</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Email reports</p>
            </div>
            <components.Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
          </div>
        </div>
      </div>
    </div>
  );
};

const BottomTabBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { icon: Home, label: 'Home' },
    { icon: Compass, label: 'Explore' },
    { icon: Activity, label: 'Activities' },
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]/95 backdrop-blur-sm">
      <div className="flex justify-around py-[var(--space-2)]">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex flex-col items-center justify-center p-[var(--space-2)] text-xs transition-colors min-w-[44px] min-h-[44px] rounded-[var(--radius-sm)] ${
                activeTab === index
                  ? 'text-[var(--color-brand)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
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
  const components = useComponentLibrary(baseLib);

  return (
    <div className="h-full flex items-start justify-center p-[var(--space-8)] bg-[var(--color-bg-secondary)]/20 min-h-[600px]">
      {/* Phone Frame with soft shadows */}
      <div className={`w-80 h-[640px] bg-[var(--color-bg-primary)] border-8 border-[var(--color-bg-secondary)] rounded-[2.5rem] shadow-[var(--shadow-3)] overflow-hidden flex flex-col ${fontClass}`}>
        {/* Status Bar */}
        <div className="h-6 bg-[var(--color-bg-primary)] flex items-center justify-center">
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-[var(--color-text-primary)] rounded-[var(--radius-full)]"></div>
              <div className="w-1 h-1 bg-[var(--color-text-primary)] rounded-[var(--radius-full)]"></div>
              <div className="w-1 h-1 bg-[var(--color-text-secondary)] rounded-[var(--radius-full)]"></div>
            </div>
            <span className="text-xs font-medium mx-2 text-[var(--color-text-primary)]">9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-2 border border-[var(--color-text-primary)] rounded-[var(--radius-sm)]">
                <div className="w-3 h-1 bg-[var(--color-text-primary)] rounded-[var(--radius-sm)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <PhoneHeader components={components} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <MoodSection components={components} />
          <FilterChips components={components} />
          <MetricCards components={components} />
          <PostCard components={components} />
          <TrendingCarousel components={components} />
          <NotificationsList components={components} />
          <BannerCTA components={components} />
          <AccountForm components={components} />
          <SettingsGroup components={components} />
        </div>

        {/* Bottom Tab Bar */}
        <BottomTabBar />
      </div>
    </div>
  );
};