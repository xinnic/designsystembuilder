import React, { useState } from 'react';
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
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MobileAppPreviewProps {
  fontClass: string;
  selectedScale: string;
  isDarkMode: boolean;
  selectedTheme: string;
}

const TabButton = ({ icon: Icon, label, isActive, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 text-xs transition-colors ${
      isActive 
        ? 'text-primary' 
        : 'text-muted-foreground hover:text-foreground'
    }`}
  >
    <Icon size={20} className="mb-1" />
    <span>{label}</span>
  </button>
);

const MoodButton = ({ emoji, isActive, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all ${
      isActive
        ? 'border-primary bg-primary/10'
        : 'border-border hover:border-primary/50'
    }`}
  >
    {emoji}
  </button>
);

const FilterChip = ({ label, isActive, onClick }: any) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'bg-muted text-muted-foreground hover:bg-muted/80'
    }`}
  >
    {label}
  </button>
);

const StatsCard = ({ icon: Icon, title, value }: any) => (
  <Card className="p-4 flex items-center gap-3 min-w-[140px]">
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
      <Icon size={20} className="text-primary" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </Card>
);

const HomeTab = () => {
  const [selectedMood, setSelectedMood] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const moods = ['🙂', '😐', '😞'];
  const filters = ['Activity', 'Mood', 'Food', 'Sleep', 'Mindfulness'];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Section */}
      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-lg font-medium text-muted-foreground">How are you feeling today?</h2>
          <div className="flex gap-3 mt-3">
            {moods.map((mood, index) => (
              <MoodButton
                key={index}
                emoji={mood}
                isActive={selectedMood === index}
                onClick={() => setSelectedMood(index)}
              />
            ))}
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter, index) => (
            <FilterChip
              key={filter}
              label={filter}
              isActive={activeFilter === index}
              onClick={() => setActiveFilter(index)}
            />
          ))}
        </div>

        {/* Stats Row */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          <StatsCard icon={Clock} title="Focus Time" value="2h 15m today" />
          <StatsCard icon={Smile} title="Mood Level" value="7/10 avg" />
        </div>

        {/* Featured Activity */}
        <Card className="p-4">
          <div className="w-full h-32 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg mb-3 flex items-center justify-center">
            <span className="text-muted-foreground">🌿 Nature Scene</span>
          </div>
          <h3 className="font-semibold mb-1">Mindful Breathing</h3>
          <p className="text-sm text-muted-foreground mb-3">Reduce stress in 5 minutes</p>
          <Button className="w-full">
            <Play size={16} className="mr-2" />
            Start
          </Button>
        </Card>

        {/* Feed Cards */}
        <div className="space-y-3">
          <Card className="p-4 flex gap-3">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <span>🥗</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Nutrition Tips</h4>
              <p className="text-sm text-muted-foreground">Daily healthy eating guide</p>
            </div>
          </Card>

          <Card className="p-4 flex gap-3">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <span>🧘</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Daily Reflection</h4>
              <p className="text-sm text-muted-foreground mb-2">Journal your thoughts</p>
              <Button variant="outline" size="sm">
                <BookOpen size={14} className="mr-1" />
                Open Journal
              </Button>
            </div>
          </Card>

          <Card className="p-4 flex gap-3">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <span>👥</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Community Challenges</h4>
              <p className="text-sm text-muted-foreground mb-2">Connect with others</p>
              <Button variant="outline" size="sm">
                <Users size={14} className="mr-1" />
                Join
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ExploreTab = () => (
  <div className="flex-1 overflow-y-auto p-4">
    <h2 className="text-xl font-semibold mb-4">Discover New Practices</h2>
    <div className="grid grid-cols-2 gap-3">
      {[
        { title: 'Morning Yoga Flow', emoji: '🧘‍♀️', bg: 'bg-pink-100 dark:bg-pink-900/30' },
        { title: 'Healthy Smoothies', emoji: '🥤', bg: 'bg-green-100 dark:bg-green-900/30' },
        { title: 'Nature Walk Meditation', emoji: '🌲', bg: 'bg-blue-100 dark:bg-blue-900/30' },
        { title: 'Breathwork Class', emoji: '💨', bg: 'bg-purple-100 dark:bg-purple-900/30' },
      ].map((item, index) => (
        <Card key={index} className="p-4 hover:shadow-md transition-all cursor-pointer">
          <div className={`w-full h-20 ${item.bg} rounded-lg mb-3 flex items-center justify-center text-2xl`}>
            {item.emoji}
          </div>
          <h3 className="font-medium text-sm">{item.title}</h3>
        </Card>
      ))}
    </div>
  </div>
);

const ActivitiesTab = () => (
  <div className="flex-1 overflow-y-auto p-4 space-y-6">
    <div>
      <h3 className="font-medium mb-3">Buttons</h3>
      <div className="space-y-2">
        <Button className="w-full">Primary Button</Button>
        <Button variant="secondary" className="w-full">Secondary Button</Button>
        <Button variant="ghost" className="w-full">Ghost Button</Button>
        <Button variant="destructive" className="w-full">Destructive Button</Button>
      </div>
    </div>

    <div>
      <h3 className="font-medium mb-3">Form Elements</h3>
      <div className="space-y-3">
        <input 
          className="w-full p-2 border border-border rounded-md bg-background" 
          placeholder="Default input" 
        />
        <input 
          className="w-full p-2 border-2 border-primary rounded-md bg-background" 
          placeholder="Focused input" 
        />
        <input 
          className="w-full p-2 border border-destructive rounded-md bg-background" 
          placeholder="Error input" 
        />
        <input 
          className="w-full p-2 border border-border rounded-md bg-muted opacity-50" 
          placeholder="Disabled input" 
          disabled 
        />
      </div>
    </div>

    <div>
      <h3 className="font-medium mb-3">Interactive Elements</h3>
      <div className="space-y-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Checkbox option</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="radio" />
          <span>Radio option 1</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="radio" />
          <span>Radio option 2</span>
        </label>
      </div>
    </div>
  </div>
);

const ProfileTab = () => (
  <div className="flex-1 overflow-y-auto p-4 space-y-6">
    {/* Profile Header */}
    <div className="text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
        <User size={32} className="text-primary" />
      </div>
      <h2 className="font-semibold">Emma Williams</h2>
      <p className="text-sm text-muted-foreground">Premium Member since 2024</p>
    </div>

    {/* Details */}
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Gender</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="gender" defaultChecked />
            <span className="text-sm">Female</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="gender" />
            <span className="text-sm">Male</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="gender" />
            <span className="text-sm">Other</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Date of Birth</label>
        <input 
          type="date" 
          className="w-full p-2 border border-border rounded-md bg-background"
          defaultValue="1990-01-15"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Daily Goal (minutes)</label>
        <input 
          type="number" 
          className="w-full p-2 border border-border rounded-md bg-background"
          defaultValue="30"
        />
      </div>
    </div>

    {/* Achievements */}
    <div>
      <h3 className="font-medium mb-3">Achievements</h3>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-2">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mx-auto mb-1 flex items-center justify-center">
            <Star size={20} className="text-yellow-600 dark:text-yellow-400" />
          </div>
          <p className="text-xs">7-day streak</p>
        </div>
        <div className="text-center p-2">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-1 flex items-center justify-center">
            <Award size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-xs">10x Breathing</p>
        </div>
        <div className="text-center p-2">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-1 flex items-center justify-center">
            <Heart size={20} className="text-green-600 dark:text-green-400" />
          </div>
          <p className="text-xs">Contributor</p>
        </div>
      </div>
    </div>

    <Button variant="destructive" className="w-full">
      <LogOut size={16} className="mr-2" />
      Logout
    </Button>
  </div>
);

const SettingsTab = ({ isDarkMode, onToggleDarkMode }: any) => (
  <div className="flex-1 overflow-y-auto p-4 space-y-6">
    <div>
      <h3 className="font-medium mb-4">Preferences</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Dark Mode</p>
            <p className="text-sm text-muted-foreground">Switch to dark theme</p>
          </div>
          <button
            onClick={onToggleDarkMode}
            className={`w-12 h-6 rounded-full transition-colors ${
              isDarkMode ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                isDarkMode ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Notifications</p>
            <p className="text-sm text-muted-foreground">Push notifications</p>
          </div>
          <button className="w-12 h-6 rounded-full bg-primary">
            <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Weekly Summary</p>
            <p className="text-sm text-muted-foreground">Email reports</p>
          </div>
          <button className="w-12 h-6 rounded-full bg-muted">
            <div className="w-5 h-5 bg-white rounded-full translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>

    <div>
      <h3 className="font-medium mb-4">Density</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input type="radio" name="density" />
          <span>Compact</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="density" defaultChecked />
          <span>Comfortable</span>
        </label>
      </div>
    </div>

    <div>
      <h3 className="font-medium mb-4">Tools</h3>
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start">
          Reset Tokens
        </Button>
        <Button variant="outline" className="w-full justify-start">
          View JSON
        </Button>
      </div>
    </div>
  </div>
);

export const MobileAppPreview = ({ fontClass, selectedScale, isDarkMode, selectedTheme }: MobileAppPreviewProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { icon: Home, label: 'Home', component: HomeTab },
    { icon: Compass, label: 'Explore', component: ExploreTab },
    { icon: Activity, label: 'Activities', component: ActivitiesTab },
    { icon: User, label: 'Profile', component: ProfileTab },
    { icon: Settings, label: 'Settings', component: SettingsTab },
  ];

  const CurrentTabComponent = tabs[activeTab].component;

  return (
    <div className="h-full flex items-start justify-center p-8 bg-muted/20 min-h-[600px]">
      {/* Phone Frame */}
      <div className={`w-80 h-[640px] bg-background border-8 border-muted rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col ${fontClass}`}>
        {/* Status Bar */}
        <div className="h-6 bg-background flex items-center justify-center">
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-foreground rounded-full"></div>
              <div className="w-1 h-1 bg-foreground rounded-full"></div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            </div>
            <span className="text-xs font-medium mx-2">9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-2 border border-foreground rounded-sm">
                <div className="w-3 h-1 bg-foreground rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* App Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
          <h1 className="text-lg font-semibold">Good morning, Emma</h1>
          <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <Bell size={16} />
          </button>
        </div>

        {/* Tab Content */}
        <CurrentTabComponent 
          isDarkMode={isDarkMode} 
          onToggleDarkMode={() => {}}
        />

        {/* Bottom Navigation */}
        <div className="border-t border-border bg-background/95 backdrop-blur-sm">
          <div className="flex justify-around py-2">
            {tabs.map((tab, index) => (
              <TabButton
                key={index}
                icon={tab.icon}
                label={tab.label}
                isActive={activeTab === index}
                onClick={() => setActiveTab(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};