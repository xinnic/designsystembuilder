import React, { useState } from 'react';
import { useTokenCSS, useDesignSystem } from '../state/designSystem';
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
  Menu,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Loader2,
  Download,
  Upload,
  ArrowUpDown,
  MoreHorizontal
} from 'lucide-react';

export default function TailwindShowcase() {
  // Initialize token CSS binding to ensure theme updates
  useTokenCSS();

  // Get stylePresetId from design system state
  const { stylePresetId } = useDesignSystem();

  const [activeTab, setActiveTab] = useState<'components' | 'patterns'>('components');
  const [accordionOpen, setAccordionOpen] = useState<number[]>([0]);

  const toggleAccordion = (index: number) => {
    setAccordionOpen(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className={`h-full overflow-y-auto bg-background preset-${stylePresetId}`}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="border-b border-border pb-4">
          <h2 className="text-2xl font-bold text-foreground">Component Showcase</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Browse Tailwind components and common app patterns
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          className="flex gap-2 p-1 rounded-lg"
          style={{
            backgroundColor: `rgb(var(--color-bg-secondary))`,
            border: `1px solid rgb(var(--color-border))`
          }}
        >
          <button
            onClick={() => setActiveTab('components')}
            className="flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all"
            style={{
              backgroundColor: activeTab === 'components'
                ? `rgb(var(--color-brand))`
                : 'transparent',
              color: activeTab === 'components'
                ? 'white'
                : `rgb(var(--color-text-secondary))`
            }}
          >
            Tailwind Components
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className="flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all"
            style={{
              backgroundColor: activeTab === 'patterns'
                ? `rgb(var(--color-brand))`
                : 'transparent',
              color: activeTab === 'patterns'
                ? 'white'
                : `rgb(var(--color-text-secondary))`
            }}
          >
            Complex Patterns
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'components' && (
          <div className="space-y-8">
            {/* Data Table */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Data Table</h3>
              <div
                className="rounded-lg overflow-hidden"
                style={{
                  backgroundColor: `rgb(var(--color-bg-secondary))`,
                  border: `1px solid rgb(var(--color-border))`,
                  boxShadow: `var(--shadow-md)`
                }}
              >
                <table className="w-full">
                  <thead
                    className="border-b"
                    style={{
                      backgroundColor: `rgb(var(--color-bg-primary))`,
                      borderColor: `rgb(var(--color-border))`
                    }}
                  >
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          Product
                          <ArrowUpDown size={14} />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ '--divide-color': `rgb(var(--color-border))` } as React.CSSProperties}>
                    {[
                      { name: 'Premium Plan', status: 'Active', price: '$99/mo', statusColor: 'success' },
                      { name: 'Starter Plan', status: 'Active', price: '$29/mo', statusColor: 'success' },
                      { name: 'Enterprise', status: 'Pending', price: '$299/mo', statusColor: 'warning' },
                      { name: 'Free Trial', status: 'Expired', price: '$0/mo', statusColor: 'danger' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">{row.name}</td>
                        <td className="px-4 py-3">
                          <span
                            className="px-2 py-1 text-xs font-medium rounded-full"
                            style={{
                              backgroundColor: `rgb(var(--color-${row.statusColor}) / 0.1)`,
                              color: `rgb(var(--color-${row.statusColor}))`
                            }}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{row.price}</td>
                        <td className="px-4 py-3">
                          <button className="p-1 rounded hover:bg-muted transition-colors">
                            <MoreHorizontal size={16} className="text-muted-foreground" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Pagination */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Pagination</h3>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-foreground">1-10</span> of{' '}
                  <span className="font-medium text-foreground">97</span> results
                </p>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-lg border transition-colors"
                    style={{
                      borderColor: `rgb(var(--color-border))`,
                      backgroundColor: `rgb(var(--color-bg-secondary))`,
                      color: `rgb(var(--color-text-secondary))`
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {[1, 2, 3, '...', 10].map((page, idx) => (
                    <button
                      key={idx}
                      className="px-3 py-2 text-sm font-medium rounded-lg transition-all"
                      style={{
                        backgroundColor: page === 1
                          ? `rgb(var(--color-brand))`
                          : `rgb(var(--color-bg-secondary))`,
                        color: page === 1
                          ? 'white'
                          : `rgb(var(--color-text-secondary))`,
                        border: `1px solid ${page === 1 ? 'transparent' : `rgb(var(--color-border))`}`
                      }}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="p-2 rounded-lg border transition-colors"
                    style={{
                      borderColor: `rgb(var(--color-border))`,
                      backgroundColor: `rgb(var(--color-bg-secondary))`,
                      color: `rgb(var(--color-text-secondary))`
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </section>

            {/* Progress Bars */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Progress Indicators</h3>
              <div className="space-y-6">
                {/* Linear Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">Upload Progress</span>
                    <span className="text-muted-foreground">75%</span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: `rgb(var(--color-border))` }}
                  >
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: '75%',
                        backgroundColor: `rgb(var(--color-brand))`
                      }}
                    />
                  </div>
                </div>

                {/* Stepped Progress */}
                <div className="space-y-2">
                  <p className="text-sm text-foreground font-medium">Account Setup</p>
                  <div className="flex items-center gap-2">
                    {[
                      { label: 'Profile', complete: true },
                      { label: 'Verify', complete: true },
                      { label: 'Payment', complete: false },
                      { label: 'Complete', complete: false }
                    ].map((step, idx) => (
                      <React.Fragment key={idx}>
                        <div className="flex flex-col items-center gap-1 flex-1">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                            style={{
                              backgroundColor: step.complete
                                ? `rgb(var(--color-brand))`
                                : `rgb(var(--color-border))`,
                              color: step.complete ? 'white' : `rgb(var(--color-text-disabled))`
                            }}
                          >
                            {step.complete ? <Check size={16} /> : idx + 1}
                          </div>
                          <span className="text-xs text-muted-foreground">{step.label}</span>
                        </div>
                        {idx < 3 && (
                          <div
                            className="h-0.5 flex-1 -mt-6"
                            style={{
                              backgroundColor: step.complete
                                ? `rgb(var(--color-brand))`
                                : `rgb(var(--color-border))`
                            }}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Circular Progress */}
                <div className="flex gap-4">
                  {[
                    { label: 'Storage', value: 65, color: 'brand' },
                    { label: 'Memory', value: 82, color: 'warning' },
                    { label: 'CPU', value: 45, color: 'success' }
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-2">
                      <div className="relative w-16 h-16">
                        <svg className="transform -rotate-90" viewBox="0 0 36 36">
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke={`rgb(var(--color-border))`}
                            strokeWidth="3"
                          />
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke={`rgb(var(--color-${item.color}))`}
                            strokeWidth="3"
                            strokeDasharray={`${item.value} ${100 - item.value}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground">
                          {item.value}%
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skeleton Loaders */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Skeleton Loaders</h3>
              <div className="space-y-4">
                {/* Card Skeleton */}
                <div
                  className="rounded-lg p-4 border animate-pulse"
                  style={{
                    backgroundColor: `rgb(var(--color-bg-secondary))`,
                    borderColor: `rgb(var(--color-border))`
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full"
                      style={{ backgroundColor: `rgb(var(--color-border))` }}
                    />
                    <div className="flex-1 space-y-2">
                      <div
                        className="h-4 rounded w-3/4"
                        style={{ backgroundColor: `rgb(var(--color-border))` }}
                      />
                      <div
                        className="h-3 rounded w-1/2"
                        style={{ backgroundColor: `rgb(var(--color-border))` }}
                      />
                    </div>
                  </div>
                </div>

                {/* List Skeleton */}
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 animate-pulse"
                      style={{ animationDelay: `${i * 150}ms` }}
                    >
                      <div
                        className="w-10 h-10 rounded"
                        style={{ backgroundColor: `rgb(var(--color-border))` }}
                      />
                      <div className="flex-1 space-y-2">
                        <div
                          className="h-3 rounded w-full"
                          style={{ backgroundColor: `rgb(var(--color-border))` }}
                        />
                        <div
                          className="h-3 rounded w-2/3"
                          style={{ backgroundColor: `rgb(var(--color-border))` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Tooltips */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Tooltips</h3>
              <div className="flex gap-4 items-center">
                {[
                  { label: 'Top', tooltip: 'Tooltip on top' },
                  { label: 'Right', tooltip: 'Tooltip on right' },
                  { label: 'Bottom', tooltip: 'Tooltip on bottom' },
                  { label: 'Left', tooltip: 'Tooltip on left' }
                ].map((item) => (
                  <div key={item.label} className="relative group">
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
                      style={{
                        borderColor: `rgb(var(--color-border))`,
                        backgroundColor: `rgb(var(--color-bg-secondary))`,
                        color: `rgb(var(--color-text-primary))`
                      }}
                    >
                      {item.label}
                    </button>
                    <div
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                      style={{ backgroundColor: `rgb(var(--color-text-primary))` }}
                    >
                      {item.tooltip}
                      <div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-4 border-transparent"
                        style={{ borderTopColor: `rgb(var(--color-text-primary))` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Accordion */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Accordion</h3>
              <div
                className="rounded-lg divide-y"
                style={{
                  backgroundColor: `rgb(var(--color-bg-secondary))`,
                  border: `1px solid rgb(var(--color-border))`,
                  '--divide-color': `rgb(var(--color-border))`
                } as React.CSSProperties}
              >
                {[
                  { title: 'What is your return policy?', content: 'We offer a 30-day money-back guarantee on all purchases. If you\'re not satisfied, contact our support team for a full refund.' },
                  { title: 'How do I track my order?', content: 'Once your order ships, you\'ll receive a tracking number via email. You can use this to track your package on our website or the carrier\'s site.' },
                  { title: 'Do you ship internationally?', content: 'Yes! We ship to over 100 countries worldwide. Shipping costs and delivery times vary by location.' }
                ].map((item, idx) => (
                  <div key={idx}>
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium text-foreground">{item.title}</span>
                      {accordionOpen.includes(idx) ? (
                        <ChevronUp size={18} className="text-muted-foreground" />
                      ) : (
                        <ChevronDown size={18} className="text-muted-foreground" />
                      )}
                    </button>
                    {accordionOpen.includes(idx) && (
                      <div className="px-4 pb-4">
                        <p className="text-sm text-muted-foreground">{item.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Cards & Alerts from original */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Alert Messages</h3>
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
              </div>
            </section>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-8">
            {/* Loading States */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Loading States</h3>
              <div className="space-y-4">
                {/* Spinner Variations */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Spinners</h4>
                  <div className="flex gap-6 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="animate-spin" style={{ color: `rgb(var(--color-brand))` }} size={24} />
                      <span className="text-xs text-muted-foreground">Small</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="animate-spin" style={{ color: `rgb(var(--color-brand))` }} size={32} />
                      <span className="text-xs text-muted-foreground">Medium</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="animate-spin" style={{ color: `rgb(var(--color-brand))` }} size={48} />
                      <span className="text-xs text-muted-foreground">Large</span>
                    </div>
                  </div>
                </div>

                {/* Button Loading States */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Button Loading States</h4>
                  <div className="flex gap-3">
                    <button
                      className="px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2"
                      style={{ backgroundColor: `rgb(var(--color-brand))` }}
                    >
                      <Loader2 className="animate-spin" size={16} />
                      Processing...
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg font-medium border flex items-center gap-2 opacity-60 cursor-not-allowed"
                      style={{
                        borderColor: `rgb(var(--color-border))`,
                        color: `rgb(var(--color-text-secondary))`
                      }}
                      disabled
                    >
                      <Loader2 className="animate-spin" size={16} />
                      Loading...
                    </button>
                  </div>
                </div>

                {/* Page Loading Overlay */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Page Overlay</h4>
                  <div
                    className="relative rounded-lg p-12 border"
                    style={{
                      backgroundColor: `rgb(var(--color-bg-secondary))`,
                      borderColor: `rgb(var(--color-border))`
                    }}
                  >
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin" style={{ color: `rgb(var(--color-brand))` }} size={40} />
                        <p className="text-sm font-medium text-foreground">Loading content...</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">Content behind loading overlay</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Navigation Patterns */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Navigation Patterns</h3>

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

              {/* Bottom Navigation Bar */}
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

              {/* Breadcrumb */}
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

            {/* Common UI Patterns */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Common UI Patterns</h3>

              {/* Stats Cards */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Statistics Cards</h4>
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
              </div>

              {/* User Profile Card */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Profile Card</h4>
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
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
