import React from 'react';
import { Home, Search, Activity, User, Play, Heart, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MobileAppPreviewProps {
  fontClass: string;
  selectedScale: string;
  isDarkMode: boolean;
  selectedTheme: string;
}

export function MobileAppPreview({ fontClass, selectedScale, isDarkMode, selectedTheme }: MobileAppPreviewProps) {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="relative">
        {/* Phone Frame */}
        <div className="w-80 h-[640px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
          <div className="w-full h-full bg-background rounded-[2rem] overflow-hidden relative">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 py-3 text-xs">
              <span className="font-semibold">9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-2 bg-foreground rounded-sm"></div>
                <div className="w-6 h-3 border border-foreground rounded-sm">
                  <div className="w-4 h-2 bg-foreground rounded-sm m-0.5"></div>
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className={`px-6 pb-20 ${fontClass} scale-${selectedScale}`}>
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-heading-1 mb-1">Good morning, Emma</h1>
                <p className="text-body text-secondary">How are you feeling today?</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 mb-6 overflow-x-auto">
                {['Activity', 'Mood', 'Food', 'Sleep'].map((tab, index) => (
                  <Button
                    key={tab}
                    variant={index === 0 ? 'default' : 'secondary'}
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    {tab}
                  </Button>
                ))}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-eyebrow text-secondary">FOCUS TIME</span>
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Play className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <p className="text-heading-2">2h 15m</p>
                    <p className="text-caption text-secondary">+25% from yesterday</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-eyebrow text-secondary">MOOD LEVEL</span>
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <Sun className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                    <p className="text-heading-2">Energetic</p>
                    <p className="text-caption text-secondary">Great day so far</p>
                  </CardContent>
                </Card>
              </div>

              {/* Action Card */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-subhead mb-1">Mindful Breathing</h3>
                      <p className="text-caption text-secondary">5 min session</p>
                    </div>
                    <Button size="sm">Start</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <div>
                <h2 className="text-subhead mb-4">Recent Check-ins</h2>
                <div className="space-y-3">
                  {[
                    { time: '2:30 PM', activity: 'Gratitude Journal', mood: '😊' },
                    { time: '11:45 AM', activity: 'Walking Meditation', mood: '🌱' },
                    { time: '9:15 AM', activity: 'Morning Stretch', mood: '💪' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.mood}</span>
                        <div>
                          <p className="text-body">{item.activity}</p>
                          <p className="text-caption text-secondary">{item.time}</p>
                        </div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-border">
              <div className="flex items-center justify-around py-3">
                {[
                  { icon: Home, label: 'Home', active: true },
                  { icon: Search, label: 'Explore', active: false },
                  { icon: Activity, label: 'Activities', active: false },
                  { icon: User, label: 'Profile', active: false },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1">
                    <item.icon className={`w-5 h-5 ${item.active ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-xs ${item.active ? 'text-primary' : 'text-muted-foreground'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}