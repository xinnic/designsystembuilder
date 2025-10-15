import React from 'react';
import {
  Home,
  Search,
  PlusCircle,
  Heart,
  User,
  MoreHorizontal,
  MapPin,
  TrendingUp,
  Clock,
  ChevronRight,
  Bell,
  Settings,
  Bookmark,
  MessageCircle,
  Share2,
  Star
} from 'lucide-react';

interface PreviewPhoneProps {
  baseLib?: "tailwind"; // Only Tailwind is supported
  fontClass?: string;
  selectedScale?: string;
  isDarkMode?: boolean;
  selectedTheme?: string;
}

export const PreviewPhone = ({
  fontClass,
  selectedScale,
  isDarkMode,
  selectedTheme
}: PreviewPhoneProps) => {
  return (
    <div className="h-full flex items-start justify-center p-8 bg-[rgb(var(--color-bg-secondary))]/20 min-h-[600px]">
      {/* Phone Frame */}
      <div className={`w-80 h-[640px] bg-[rgb(var(--color-bg-primary))] border-8 border-[rgb(var(--color-border))] rounded-[2.5rem] shadow-[var(--shadow-level-3)] overflow-hidden flex flex-col ${fontClass}`}>

        {/* Status Bar */}
        <div className="bg-[rgb(var(--color-bg-primary))] px-4 py-1 flex justify-between items-center text-xs">
          <span className="font-medium">9:41</span>
          <div className="flex gap-1">
            <div className="w-4 h-3 border border-current rounded-sm">
              <div className="w-2 h-1.5 bg-current ml-0.5 mt-0.5 rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* App Header */}
        <header className="bg-[rgb(var(--color-bg-secondary))] px-4 py-3 border-b border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--color-brand))' }}>
              Discover
            </h1>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-[rgb(var(--color-bg-primary))] transition-colors">
                <Search size={20} className="text-[rgb(var(--color-text-secondary))]" />
              </button>
              <button className="p-2 rounded-full hover:bg-[rgb(var(--color-bg-primary))] transition-colors">
                <Bell size={20} className="text-[rgb(var(--color-text-secondary))]" />
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto">
            {['For You', 'Trending', 'News', 'Sports', 'Tech'].map((cat, idx) => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  idx === 0
                    ? 'bg-[rgb(var(--color-brand))] text-white'
                    : 'bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-secondary))]'
                }`}
                style={{
                  borderRadius: 'var(--radius-full)',
                  boxShadow: idx === 0 ? 'var(--shadow-sm)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">

            {/* Hero Card */}
            <div
              className="rounded-lg overflow-hidden"
              style={{
                backgroundColor: 'rgb(var(--color-bg-secondary))',
                boxShadow: 'var(--shadow-md)',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div className="h-32 bg-gradient-to-br from-purple-400 to-pink-400"></div>
              <div className="p-4">
                <h3 className="font-bold mb-2 text-[rgb(var(--color-text-primary))]">
                  Featured Today
                </h3>
                <p className="text-sm text-[rgb(var(--color-text-secondary))] mb-3">
                  Discover what's trending in your community
                </p>
                <button
                  className="w-full py-2 rounded-full text-white font-medium text-sm"
                  style={{
                    backgroundColor: 'rgb(var(--color-brand))',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  Explore Now
                </button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Posts', value: '124', icon: <TrendingUp size={14} />, color: 'var(--color-success)' },
                { label: 'Likes', value: '2.3k', icon: <Heart size={14} />, color: 'var(--color-danger)' },
                { label: 'Time', value: '3.5h', icon: <Clock size={14} />, color: 'var(--color-info)' }
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 rounded-lg text-center"
                  style={{
                    backgroundColor: 'rgb(var(--color-bg-secondary))',
                    border: '1px solid rgb(var(--color-border))',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div className="flex justify-center mb-1" style={{ color: `rgb(${stat.color})` }}>
                    {stat.icon}
                  </div>
                  <div className="text-lg font-bold text-[rgb(var(--color-text-primary))]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[rgb(var(--color-text-secondary))]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* List Items */}
            <div
              className="rounded-lg overflow-hidden"
              style={{
                backgroundColor: 'rgb(var(--color-bg-secondary))',
                border: '1px solid rgb(var(--color-border))',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              {[
                { icon: <MapPin size={18} />, title: 'Location Services', subtitle: 'While using app' },
                { icon: <Bell size={18} />, title: 'Notifications', subtitle: 'Push, Email' },
                { icon: <Settings size={18} />, title: 'Preferences', subtitle: 'Customize your experience' }
              ].map((item, idx) => (
                <div
                  key={item.title}
                  className={`flex items-center p-4 ${
                    idx !== 2 ? 'border-b border-[rgb(var(--color-border))]' : ''
                  }`}
                >
                  <div className="mr-3 text-[rgb(var(--color-text-secondary))]">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-[rgb(var(--color-text-primary))]">
                      {item.title}
                    </div>
                    <div className="text-sm text-[rgb(var(--color-text-secondary))]">
                      {item.subtitle}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[rgb(var(--color-text-secondary))]" />
                </div>
              ))}
            </div>

            {/* User Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              {['Sarah J.', 'Mike D.'].map((name, idx) => (
                <div
                  key={name}
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: 'rgb(var(--color-bg-secondary))',
                    border: '1px solid rgb(var(--color-border))',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: idx === 0 ? 'rgb(var(--color-brand))' : 'rgb(var(--color-info))' }}
                  >
                    {name[0]}
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm text-[rgb(var(--color-text-primary))]">{name}</div>
                    <div className="text-xs text-[rgb(var(--color-text-secondary))]">Active now</div>
                  </div>
                  <button
                    className="w-full mt-2 py-1 rounded-full text-xs font-medium border"
                    style={{
                      borderColor: 'rgb(var(--color-brand))',
                      color: 'rgb(var(--color-brand))',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    Follow
                  </button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                className="flex-1 py-3 rounded-lg font-medium text-white"
                style={{
                  backgroundColor: 'rgb(var(--color-brand))',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                Get Started
              </button>
              <button
                className="flex-1 py-3 rounded-lg font-medium border"
                style={{
                  borderColor: 'rgb(var(--color-border))',
                  color: 'rgb(var(--color-text-secondary))',
                  backgroundColor: 'rgb(var(--color-bg-secondary))',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                Learn More
              </button>
            </div>

            {/* Review Card */}
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: 'rgb(var(--color-bg-secondary))',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-[rgb(var(--color-text-primary))]">Great Experience</h4>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-[rgb(var(--color-text-secondary))]">2h ago</span>
              </div>
              <p className="text-sm text-[rgb(var(--color-text-secondary))] mb-3">
                "Amazing app with beautiful design and smooth performance. Highly recommended!"
              </p>
              <div className="flex gap-3 text-sm">
                <button className="flex items-center gap-1 text-[rgb(var(--color-text-secondary))]">
                  <Heart size={14} />
                  <span>24</span>
                </button>
                <button className="flex items-center gap-1 text-[rgb(var(--color-text-secondary))]">
                  <MessageCircle size={14} />
                  <span>5</span>
                </button>
                <button className="flex items-center gap-1 text-[rgb(var(--color-text-secondary))]">
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav
          className="border-t flex justify-around py-2"
          style={{
            backgroundColor: 'rgb(var(--color-bg-secondary))',
            borderColor: 'rgb(var(--color-border))'
          }}
        >
          {[
            { icon: <Home size={22} />, label: 'Home', active: true },
            { icon: <Search size={22} />, label: 'Search' },
            { icon: <PlusCircle size={22} />, label: 'Create' },
            { icon: <Heart size={22} />, label: 'Activity' },
            { icon: <User size={22} />, label: 'Profile' }
          ].map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-1 p-2"
              style={{
                color: item.active
                  ? 'rgb(var(--color-brand))'
                  : 'rgb(var(--color-text-secondary))'
              }}
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};