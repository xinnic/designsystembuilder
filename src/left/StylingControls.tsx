import React from 'react';
import { useDesignSystem } from '../state/designSystem';
import type { MenuLayout, BorderWeight, BorderTone, InputStyle, CardWidth, TechStack } from '../state/designSystem';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ChevronDown,
  Paintbrush,
  Navigation,
  Menu,
  Smartphone,
  Square,
  RectangleHorizontal,
  Circle,
  MoreHorizontal,
  Minus,
  CreditCard,
  Maximize,
  AlignLeft,
  Underline,
  Edit3,
  Vibrate
} from 'lucide-react';

export default function StylingControls() {
  const { opts, setOpts, haptics, setHaptics } = useDesignSystem();
  const [open, setOpen] = React.useState(true);

  const stackOptions: { value: TechStack; label: string }[] = [
    { value: 'web-react', label: 'Web/React' },
    { value: 'react-native-expo', label: 'React Native (Expo)' },
    { value: 'ios-swiftui', label: 'iOS SwiftUI' },
    { value: 'android-compose', label: 'Android Compose' },
    { value: 'flutter', label: 'Flutter' }
  ];

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted">
        <div className="flex items-center gap-3">
          <Paintbrush className="h-5 w-5" />
          <span className="font-medium">Component Styling</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 p-3">

        {/* Menu Layout */}
        <div>
          <label className="text-sm font-medium mb-2 block">Menu Layout</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`p-3 text-sm rounded border flex flex-col items-center gap-2 ${
                opts.menuLayout === 'bottomBar'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:bg-muted'
              }`}
              onClick={() => setOpts({ menuLayout: 'bottomBar' })}
            >
              <Navigation size={16} />
              <span>Bottom Bar</span>
            </button>
            <button
              className={`p-3 text-sm rounded border flex flex-col items-center gap-2 ${
                opts.menuLayout === 'hamburger'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:bg-muted'
              }`}
              onClick={() => setOpts({ menuLayout: 'hamburger' })}
            >
              <Menu size={16} />
              <span>Hamburger</span>
            </button>
          </div>
        </div>

        {/* Card Borders */}
        <div>
          <label className="text-sm font-medium mb-2 block">Card Borders</label>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Weight</label>
              <div className="grid grid-cols-3 gap-1">
                <button
                  className={`p-2 text-xs rounded border flex flex-col items-center gap-1 ${
                    opts.cardBorderWeight === 'none'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setOpts({ cardBorderWeight: 'none' })}
                >
                  <Square size={12} fill="currentColor" stroke="none" />
                  <span>none</span>
                </button>
                <button
                  className={`p-2 text-xs rounded border flex flex-col items-center gap-1 ${
                    opts.cardBorderWeight === 'thin'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setOpts({ cardBorderWeight: 'thin' })}
                >
                  <Square size={12} strokeWidth={1} fill="none" />
                  <span>thin</span>
                </button>
                <button
                  className={`p-2 text-xs rounded border flex flex-col items-center gap-1 ${
                    opts.cardBorderWeight === 'thick'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setOpts({ cardBorderWeight: 'thick' })}
                >
                  <Square size={12} strokeWidth={2} fill="none" />
                  <span>thick</span>
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Tone</label>
              <div className="grid grid-cols-2 gap-1">
                {(['light', 'ultraLight'] as BorderTone[]).map((tone) => (
                  <button
                    key={tone}
                    className={`p-1 text-xs rounded border ${
                      opts.cardBorderTone === tone
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                    onClick={() => setOpts({ cardBorderTone: tone })}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Input Borders */}
        <div>
          <label className="text-sm font-medium mb-2 block">Input Borders</label>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Weight</label>
              <div className="grid grid-cols-3 gap-1">
                {(['none', 'thin', 'thick'] as BorderWeight[]).map((weight) => (
                  <button
                    key={weight}
                    className={`p-1 text-xs rounded border ${
                      opts.inputBorderWeight === weight
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                    onClick={() => setOpts({ inputBorderWeight: weight })}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Tone</label>
              <div className="grid grid-cols-2 gap-1">
                {(['light', 'ultraLight'] as BorderTone[]).map((tone) => (
                  <button
                    key={tone}
                    className={`p-1 text-xs rounded border ${
                      opts.inputBorderTone === tone
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                    onClick={() => setOpts({ inputBorderTone: tone })}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Input Style */}
        <div>
          <label className="text-sm font-medium mb-2 block">Input Style</label>
          <div className="grid grid-cols-2 gap-1">
            {(['filled', 'outlined', 'underline', 'none'] as InputStyle[]).map((style) => (
              <button
                key={style}
                className={`p-2 text-xs rounded border ${
                  opts.inputStyle === style
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:bg-muted'
                }`}
                onClick={() => setOpts({ inputStyle: style })}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Card Width */}
        <div>
          <label className="text-sm font-medium mb-2 block">Card Width</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`p-2 text-sm rounded border ${
                opts.cardWidth === 'full'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:bg-muted'
              }`}
              onClick={() => setOpts({ cardWidth: 'full' })}
            >
              Full
            </button>
            <button
              className={`p-2 text-sm rounded border ${
                opts.cardWidth === 'withMargins'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:bg-muted'
              }`}
              onClick={() => setOpts({ cardWidth: 'withMargins' })}
            >
              With Margins
            </button>
          </div>
        </div>

        {/* Haptics */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Vibrate className="h-4 w-4" />
            <label className="text-sm font-medium">Haptics</label>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Enable</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={haptics.enabled}
                  onChange={(e) => setHaptics({ enabled: e.target.checked })}
                  className="w-3 h-3 accent-color: rgb(var(--color-brand))"
                />
              </label>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Platform</label>
              <select
                value={haptics.stack}
                onChange={(e) => setHaptics({ stack: e.target.value as TechStack })}
                className="w-full p-1 text-xs rounded border border-border bg-background text-foreground"
              >
                {stackOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs text-muted-foreground">
              Light = menu taps; Medium = primary actions. Uses platform-native APIs.
            </div>
          </div>
        </div>

      </CollapsibleContent>
    </Collapsible>
  );
}