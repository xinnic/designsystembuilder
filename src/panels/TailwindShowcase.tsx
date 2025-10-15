import React from 'react';
import { useTokenCSS } from '../state/designSystem';
import {
  ShoppingBag,
  Star,
  Heart,
  MessageSquare,
  User,
  ChevronRight,
  Search,
  Bell,
  Settings,
  LogOut,
  CreditCard,
  Package,
  TrendingUp,
  Calendar,
  Clock,
  Check,
  X,
  AlertCircle,
  Info,
  Home,
  Menu
} from 'lucide-react';

export default function TailwindShowcase() {
  // Initialize token CSS binding to ensure theme updates
  useTokenCSS();

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="border-b border-border pb-4">
          <h2 className="text-2xl font-bold text-foreground">Tailwind Components</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Components built with Tailwind CSS that respond to your design tokens
          </p>
        </div>

        {/* Hero Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Hero Banner</h3>
          <div
            className="rounded-lg p-8 text-center space-y-4"
            style={{
              background: `linear-gradient(135deg, rgb(var(--color-brand)) 0%, rgb(var(--color-info)) 100%)`
            }}
          >
            <h1 className="text-3xl font-bold text-white">
              Welcome to Your App
            </h1>
            <p className="text-white/90 max-w-md mx-auto">
              Experience the power of a fully customizable design system
            </p>
            <div className="flex gap-3 justify-center">
              <button
                className="px-6 py-3 bg-white text-primary rounded-full font-semibold hover:opacity-90 transition-opacity"
                style={{ color: `rgb(var(--color-brand))` }}
              >
                Get Started
              </button>
              <button className="px-6 py-3 bg-white/20 text-white rounded-full font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Cards Grid */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Product Cards</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Product Card 1 */}
            <div
              className="rounded-lg overflow-hidden border transition-shadow hover:shadow-lg"
              style={{
                borderColor: `rgb(var(--color-border))`,
                backgroundColor: `rgb(var(--color-bg-secondary))`,
                boxShadow: `var(--shadow-sm)`
              }}
            >
              <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400"></div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-foreground">Premium Package</h4>
                    <p className="text-sm text-muted-foreground">Best value for teams</p>
                  </div>
                  <button className="text-muted-foreground hover:text-danger transition-colors">
                    <Heart size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex text-warning">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(128)</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-2xl font-bold" style={{ color: `rgb(var(--color-brand))` }}>
                      $99
                    </span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <button
                    className="px-4 py-2 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: `rgb(var(--color-brand))` }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div
              className="rounded-lg overflow-hidden border transition-shadow hover:shadow-lg"
              style={{
                borderColor: `rgb(var(--color-border))`,
                backgroundColor: `rgb(var(--color-bg-secondary))`,
                boxShadow: `var(--shadow-sm)`
              }}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-cyan-400"></div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-foreground">Starter Plan</h4>
                    <p className="text-sm text-muted-foreground">Perfect for individuals</p>
                  </div>
                  <button className="text-muted-foreground hover:text-danger transition-colors">
                    <Heart size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex text-warning">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                    <Star size={14} />
                  </div>
                  <span className="text-sm text-muted-foreground">(89)</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-2xl font-bold" style={{ color: `rgb(var(--color-brand))` }}>
                      $29
                    </span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <button
                    className="px-4 py-2 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: `rgb(var(--color-brand))` }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div
              className="p-4 rounded-lg space-y-2"
              style={{
                backgroundColor: `rgb(var(--color-bg-secondary))`,
                border: `1px solid rgb(var(--color-border))`
              }}
            >
              <div className="flex items-center justify-between">
                <TrendingUp className="text-success" size={20} />
                <span className="text-xs text-success font-semibold">+12%</span>
              </div>
              <p className="text-2xl font-bold text-foreground">$12.5k</p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
            <div
              className="p-4 rounded-lg space-y-2"
              style={{
                backgroundColor: `rgb(var(--color-bg-secondary))`,
                border: `1px solid rgb(var(--color-border))`
              }}
            >
              <div className="flex items-center justify-between">
                <Package className="text-info" size={20} />
                <span className="text-xs text-info font-semibold">+8%</span>
              </div>
              <p className="text-2xl font-bold text-foreground">248</p>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </div>
            <div
              className="p-4 rounded-lg space-y-2"
              style={{
                backgroundColor: `rgb(var(--color-bg-secondary))`,
                border: `1px solid rgb(var(--color-border))`
              }}
            >
              <div className="flex items-center justify-between">
                <User className="text-warning" size={20} />
                <span className="text-xs text-danger font-semibold">-3%</span>
              </div>
              <p className="text-2xl font-bold text-foreground">1.2k</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
          </div>
        </section>

        {/* Notification Alerts */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          <div className="space-y-3">
            <div
              className="flex items-center gap-3 p-4 rounded-lg border"
              style={{
                backgroundColor: `rgb(var(--color-success) / 0.1)`,
                borderColor: `rgb(var(--color-success) / 0.3)`
              }}
            >
              <Check className="text-success" size={20} />
              <div className="flex-1">
                <p className="font-medium text-foreground">Success!</p>
                <p className="text-sm text-muted-foreground">Your changes have been saved</p>
              </div>
            </div>
            <div
              className="flex items-center gap-3 p-4 rounded-lg border"
              style={{
                backgroundColor: `rgb(var(--color-warning) / 0.1)`,
                borderColor: `rgb(var(--color-warning) / 0.3)`
              }}
            >
              <AlertCircle className="text-warning" size={20} />
              <div className="flex-1">
                <p className="font-medium text-foreground">Warning</p>
                <p className="text-sm text-muted-foreground">Please review your settings</p>
              </div>
            </div>
            <div
              className="flex items-center gap-3 p-4 rounded-lg border"
              style={{
                backgroundColor: `rgb(var(--color-info) / 0.1)`,
                borderColor: `rgb(var(--color-info) / 0.3)`
              }}
            >
              <Info className="text-info" size={20} />
              <div className="flex-1">
                <p className="font-medium text-foreground">Information</p>
                <p className="text-sm text-muted-foreground">New features are available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Form Components</h3>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search for anything..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: `rgb(var(--color-border))`,
                  '--tw-ring-color': `rgb(var(--color-brand))`
                } as React.CSSProperties}
              />
            </div>

            {/* Toggle Group */}
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-lg font-medium text-white transition-colors"
                style={{ backgroundColor: `rgb(var(--color-brand))` }}
              >
                Daily
              </button>
              <button
                className="px-4 py-2 rounded-lg font-medium transition-colors border"
                style={{
                  color: `rgb(var(--color-text-secondary))`,
                  borderColor: `rgb(var(--color-border))`,
                  backgroundColor: `rgb(var(--color-bg-secondary))`
                }}
              >
                Weekly
              </button>
              <button
                className="px-4 py-2 rounded-lg font-medium transition-colors border"
                style={{
                  color: `rgb(var(--color-text-secondary))`,
                  borderColor: `rgb(var(--color-border))`,
                  backgroundColor: `rgb(var(--color-bg-secondary))`
                }}
              >
                Monthly
              </button>
            </div>

            {/* Checkbox Group */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded accent-primary"
                  defaultChecked
                  style={{ accentColor: `rgb(var(--color-brand))` }}
                />
                <span className="text-foreground">Enable notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded accent-primary"
                  style={{ accentColor: `rgb(var(--color-brand))` }}
                />
                <span className="text-foreground">Subscribe to newsletter</span>
              </label>
            </div>
          </div>
        </section>

        {/* User Profile Card */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">User Profile</h3>
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: `rgb(var(--color-bg-secondary))`,
              border: `1px solid rgb(var(--color-border))`,
              boxShadow: `var(--shadow-md)`
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
                style={{ backgroundColor: `rgb(var(--color-brand))` }}
              >
                JD
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground">Jane Doe</h4>
                <p className="text-sm text-muted-foreground">jane.doe@example.com</p>
                <div className="flex gap-2 mt-3">
                  <button
                    className="px-3 py-1 text-sm rounded-full text-white font-medium"
                    style={{ backgroundColor: `rgb(var(--color-brand))` }}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="px-3 py-1 text-sm rounded-full border font-medium"
                    style={{
                      color: `rgb(var(--color-text-secondary))`,
                      borderColor: `rgb(var(--color-border))`
                    }}
                  >
                    Settings
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4 text-center" style={{ borderColor: `rgb(var(--color-border))` }}>
              <div>
                <p className="text-2xl font-bold" style={{ color: `rgb(var(--color-brand))` }}>128</p>
                <p className="text-sm text-muted-foreground">Posts</p>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: `rgb(var(--color-brand))` }}>3.2k</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: `rgb(var(--color-brand))` }}>256</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
            </div>
          </div>
        </section>

        {/* Complex Navigation Components */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Navigation Components</h3>

          {/* App Title Bar */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">App Title Bar</h4>
            <div
              className="rounded-lg overflow-hidden"
              style={{
                backgroundColor: `rgb(var(--color-bg-secondary))`,
                boxShadow: `var(--shadow-md)`
              }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: `rgb(var(--color-border))` }}>
                <div className="flex items-center gap-3">
                  <button className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                    <Menu size={20} className="text-foreground" />
                  </button>
                  <h1 className="text-lg font-semibold" style={{ color: `rgb(var(--color-brand))` }}>
                    App Title
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                    <Search size={20} className="text-muted-foreground" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                    <Bell size={20} className="text-muted-foreground" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                    <User size={20} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* App Bottom Bar */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Bottom Navigation Bar</h4>
            <div
              className="rounded-lg overflow-hidden"
              style={{
                backgroundColor: `rgb(var(--color-bg-secondary))`,
                boxShadow: `var(--shadow-md)`
              }}
            >
              <div className="flex justify-around py-2">
                {[
                  { icon: Home, label: 'Home', active: true },
                  { icon: Search, label: 'Explore', active: false },
                  { icon: ShoppingBag, label: 'Shop', active: false },
                  { icon: Heart, label: 'Saved', active: false },
                  { icon: User, label: 'Profile', active: false }
                ].map((item) => (
                  <button
                    key={item.label}
                    className="flex flex-col items-center gap-1 p-2 min-w-[60px] transition-colors"
                    style={{
                      color: item.active
                        ? `rgb(var(--color-brand))`
                        : `rgb(var(--color-text-secondary))`
                    }}
                  >
                    <item.icon size={22} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Side Navigation Menu */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Side Navigation Menu</h4>
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: `rgb(var(--color-bg-secondary))`,
                boxShadow: `var(--shadow-md)`
              }}
            >
              <div className="space-y-1">
                {[
                  { icon: Home, label: 'Dashboard', active: true, badge: null },
                  { icon: Package, label: 'Products', active: false, badge: '12' },
                  { icon: ShoppingBag, label: 'Orders', active: false, badge: '3' },
                  { icon: User, label: 'Customers', active: false, badge: null },
                  { icon: TrendingUp, label: 'Analytics', active: false, badge: null },
                  { icon: Settings, label: 'Settings', active: false, badge: null }
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all"
                    style={{
                      backgroundColor: item.active
                        ? `rgb(var(--color-brand) / 0.1)`
                        : 'transparent',
                      color: item.active
                        ? `rgb(var(--color-brand))`
                        : `rgb(var(--color-text-secondary))`
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className="px-2 py-0.5 text-xs rounded-full text-white font-medium"
                        style={{ backgroundColor: `rgb(var(--color-brand))` }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Tab Navigation</h4>
            <div
              className="rounded-lg p-1"
              style={{
                backgroundColor: `rgb(var(--color-bg-secondary))`,
                boxShadow: `var(--shadow-sm)`
              }}
            >
              <div className="flex gap-1">
                {['Overview', 'Analytics', 'Reports', 'Settings'].map((tab, idx) => (
                  <button
                    key={tab}
                    className="flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all"
                    style={{
                      backgroundColor: idx === 0
                        ? `rgb(var(--color-brand))`
                        : 'transparent',
                      color: idx === 0
                        ? 'white'
                        : `rgb(var(--color-text-secondary))`
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Breadcrumb Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Breadcrumb</h4>
            <div
              className="rounded-lg px-4 py-3"
              style={{
                backgroundColor: `rgb(var(--color-bg-secondary))`,
                border: `1px solid rgb(var(--color-border))`
              }}
            >
              <div className="flex items-center gap-2 text-sm">
                <button className="hover:text-primary transition-colors" style={{ color: `rgb(var(--color-text-secondary))` }}>
                  Home
                </button>
                <ChevronRight size={14} className="text-muted-foreground" />
                <button className="hover:text-primary transition-colors" style={{ color: `rgb(var(--color-text-secondary))` }}>
                  Products
                </button>
                <ChevronRight size={14} className="text-muted-foreground" />
                <span className="font-medium" style={{ color: `rgb(var(--color-brand))` }}>
                  Details
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* List Items */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">List Items</h3>
          <div
            className="rounded-lg divide-y"
            style={{
              backgroundColor: `rgb(var(--color-bg-secondary))`,
              border: `1px solid rgb(var(--color-border))`,
              '--divide-color': `rgb(var(--color-border))`
            } as React.CSSProperties}
          >
            {[
              { icon: Bell, label: 'Notifications', value: '3 new' },
              { icon: CreditCard, label: 'Payment Methods', value: '2 cards' },
              { icon: Settings, label: 'Account Settings', value: '' },
              { icon: LogOut, label: 'Sign Out', value: '' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="text-muted-foreground" size={20} />
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.value && <span className="text-sm text-muted-foreground">{item.value}</span>}
                  <ChevronRight className="text-muted-foreground" size={16} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}