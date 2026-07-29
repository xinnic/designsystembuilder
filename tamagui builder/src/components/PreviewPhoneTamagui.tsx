import React, { memo, useState } from 'react';
import { YStack, XStack, ScrollView, Circle, Image } from 'tamagui';
import { useDesignSystem } from '../state/designSystem';
import {
  Home,
  Search,
  PlusCircle,
  Heart,
  User,
  MapPin,
  TrendingUp,
  Clock,
  ChevronRight,
  Bell,
  Settings,
  MessageCircle,
  Share2,
  Star,
  Activity,
  Shield,
  HelpCircle,
  X,
} from 'lucide-react';

// Import our design system components
import {
  Button,
  Card,
  H2,
  H3,
  Body,
  Caption,
} from '../design-system/components';
import {
  AppBar,
  CategoryPills,
  StatsCard,
  HeroCard,
  UserCard,
  BottomNav,
  ReviewCard,
  SettingsGroup,
  ProfileCard,
} from '../design-system/bespoke';

// Icons render with `currentColor` unless told otherwise. The CSS variables
// hold bare "R G B" triplets, so they always need the rgb() wrapper.
const ICON_MUTED = 'rgb(var(--color-text-secondary))';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'add', label: 'Create', icon: PlusCircle },
  { id: 'activity', label: 'Activity', icon: Heart },
  { id: 'profile', label: 'Profile', icon: User },
] as const;

const PreviewPhoneTamaguiComponent = () => {
  const { isDarkMode, selectedPrimaryFont, opts, tokens } = useDesignSystem();

  const isHamburger = opts.menuLayout === 'hamburger';
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeNavId, setActiveNavId] = useState<string>('home');

  // Switching the layout control away from hamburger should never strand an
  // open drawer over the preview.
  React.useEffect(() => {
    if (!isHamburger) setDrawerOpen(false);
  }, [isHamburger]);

  return (
    <YStack
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="flex-start"
      // The 320pt device plus $8 on both sides is wider than a phone viewport,
      // which pushed the whole canvas into a horizontal scroll.
      padding="$4"
      $gtMd={{ padding: '$8' }}
      minHeight={600}
      // Matches the surrounding panels — the frame's border and shadow are what
      // separate the device from the canvas, not a grey backdrop.
      backgroundColor="$background"
    >
      <YStack
        className={selectedPrimaryFont}
        backgroundColor="$bgPrimary"
        width={320}
        height={640}
        overflow="hidden"
        position="relative"
        style={{
          // The device chrome follows the style preset: bold-border presets
          // (Neo-Brutalism) get a heavy outline and the preset's hard shadow,
          // everything else keeps a 1px frame and a soft brand-tinted shadow.
          boxShadow: 'var(--frame-shadow, 0 25px 50px -12px rgba(0, 0, 0, 0.22))',
          borderRadius: 32,
          borderWidth: 'var(--frame-border-width, 1px)',
          borderColor: 'rgb(var(--color-border))',
          borderStyle: 'solid',
        }}
      >
        {/* Status Bar */}
        <XStack
          height={44}
          paddingHorizontal="$4"
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="$bgPrimary"
          borderBottomWidth={1}
          borderBottomColor="$border"
        >
          <Caption fontSize={12} fontWeight="600">9:41</Caption>
          <XStack space="$1">
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </XStack>
        </XStack>

        {/* Content */}
        <ScrollView flex={1} backgroundColor="$bgPrimary">
          <YStack space="$5" paddingBottom={isHamburger ? 24 : 80}>
            {/* App Bar — the Menu Layout control decides whether it carries the
                hamburger; in bottom-bar mode navigation lives at the bottom. */}
            <AppBar
              title="Discover"
              logo={opts.logo}
              showMenu={isHamburger}
              onMenuPress={() => setDrawerOpen(true)}
            />

            {/* Categories Chips */}
            <YStack paddingBottom="$1">
              <CategoryPills
                categories={[
                  { id: '1', label: 'For You' },
                  { id: '2', label: 'Trending' },
                  { id: '3', label: 'News' },
                  { id: '4', label: 'Design' },
                  { id: '5', label: 'Tech' },
                ]}
                activeId="1"
              />
            </YStack>

            {/* Featured Section (Screenshot 2) */}
            <YStack paddingHorizontal="$4" space="$3">
              <HeroCard
                title="Featured Today"
                description="Discover what's trending in your community"
                ctaText="Explore Now"
                gradient
              />
            </YStack>

            {/* Metrics (Screenshot 2/1) */}
            <XStack paddingHorizontal="$4" space="$2">
              <StatsCard
                value="124"
                label="Posts"
                icon={<Activity size={16} color={ICON_MUTED} />}
              />
              <StatsCard
                value="2.3k"
                label="Likes"
                icon={<Heart size={16} color={ICON_MUTED} />}
              />
              <StatsCard
                value="3.5h"
                label="Time"
                icon={<Clock size={16} color={ICON_MUTED} />}
              />
            </XStack>

            {/* Settings & Preferences (Screenshot 3) */}
            <YStack paddingHorizontal="$4" space="$3">
              <H3 margin={0}>Settings</H3>
              <SettingsGroup
                items={[
                  { title: 'Location Services', subTitle: 'While using app', icon: <MapPin size={20} color={ICON_MUTED} /> },
                  { title: 'Notifications', subTitle: 'Push, Email', icon: <Bell size={20} color={ICON_MUTED} /> },
                  { title: 'Preferences', subTitle: 'Customize experience', icon: <Settings size={20} color={ICON_MUTED} /> },
                ]}
              />
            </YStack>

            {/* Suggested People (Screenshot 3) */}
            <YStack space="$3">
              <H3 margin={0} paddingHorizontal="$4">Suggested People</H3>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                // Same padding-plus-negative-margin trick as the category
                // pills: room for the shadow, no change to the row's height.
                style={{
                  marginTop: 'calc(-1 * var(--shadow-bleed, 4px))',
                  marginBottom: 'calc(-1 * var(--shadow-bleed, 4px))',
                }}
                contentContainerStyle={{
                  paddingTop: 'var(--shadow-bleed, 4px)',
                  paddingBottom: 'var(--shadow-bleed, 4px)',
                }}
              >
                <XStack space="$3" paddingHorizontal="$4" paddingRight="calc(16px + var(--shadow-bleed, 4px))">
                  <ProfileCard
                    name="Sarah J."
                    status="Active now"
                    initials="SJ"
                    avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                  />
                  <ProfileCard
                    name="Mike D."
                    status="Active now"
                    initials="MD"
                    avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  />
                  <ProfileCard
                    name="Anna K."
                    status="2h ago"
                    initials="AK"
                    avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
                  />
                </XStack>
              </ScrollView>
            </YStack>

            {/* Reviews (Screenshot 4) */}
            <YStack paddingHorizontal="$4" space="$3">
               <H3 margin={0}>Reviews</H3>
               <ReviewCard
                 title="Great Experience"
                 rating={5}
                 time="2h ago"
                 content="Amazing app with beautiful design and smooth performance. Highly recommended!"
                 likes={24}
                 comments={5}
               />
            </YStack>

            {/* Feed Section (Screenshot 1) */}
            <YStack paddingHorizontal="$4" space="$3">
              <H3 margin={0}>Your Feed</H3>
              <UserCard
                name="Alex Morgan"
                handle="@alexm"
                avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                image="https://images.unsplash.com/photo-1621600411688-4be93cd68504?w=400&h=300&fit=crop"
                content="Just explored the new design district! The architecture is absolutely stunning. 🏙️✨ #design #architecture"
                likes={124}
                comments={18}
                time="2h ago"
              />
            </YStack>
          </YStack>
        </ScrollView>

        {/* Bottom Navigation — only in bottom-bar mode */}
        {!isHamburger && (
          <BottomNav
            items={NAV_ITEMS.map(({ id, label, icon: Icon }) => ({
              id,
              label,
              icon: <Icon size={20} />,
            }))}
            activeId={activeNavId}
            onItemPress={setActiveNavId}
          />
        )}

        {/* Drawer — the hamburger's actual destination */}
        {isHamburger && drawerOpen && (
          <>
            <YStack
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              backgroundColor="rgba(0,0,0,0.4)"
              onPress={() => setDrawerOpen(false)}
              cursor="pointer"
              zIndex={10}
            />
            <YStack
              position="absolute"
              top={0}
              left={0}
              bottom={0}
              width={252}
              backgroundColor="$bgSecondary"
              borderRightWidth={1}
              borderRightColor="$border"
              zIndex={11}
              paddingTop="$5"
              style={{ boxShadow: 'var(--shadow-lg)' }}
            >
              <XStack
                alignItems="center"
                justifyContent="space-between"
                paddingHorizontal="$4"
                paddingBottom="$4"
              >
                <H3 margin={0}>Menu</H3>
                <Button
                  variant="ghost"
                  size="small"
                  padding="$2"
                  onPress={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </Button>
              </XStack>

              <YStack>
                {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
                  const isActive = id === activeNavId;
                  return (
                    <XStack
                      key={id}
                      alignItems="center"
                      gap="$3"
                      paddingHorizontal="$4"
                      paddingVertical="$3"
                      cursor="pointer"
                      // A tint of the brand, not the accent colour itself —
                      // the row has to stay a surface, not become a button.
                      backgroundColor={isActive ? 'rgb(var(--color-brand) / 0.10)' : 'transparent'}
                      hoverStyle={{ backgroundColor: 'rgb(var(--color-brand) / 0.06)' }}
                      onPress={() => {
                        setActiveNavId(id);
                        setDrawerOpen(false);
                      }}
                    >
                      <Icon
                        size={18}
                        color={isActive ? 'rgb(var(--color-brand))' : ICON_MUTED}
                      />
                      <Body
                        margin={0}
                        color={isActive ? '$brand' : '$textPrimary'}
                        fontWeight={isActive ? '600' : '400'}
                      >
                        {label}
                      </Body>
                    </XStack>
                  );
                })}
              </YStack>
            </YStack>
          </>
        )}
      </YStack>
    </YStack>
  );
};

// UI Helpers (kept local for preview wrapper)
const SignalIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" style={{ opacity: 0.8 }}>
    <path d="M1 10H3V12H1V10ZM5 7H7V12H5V7ZM9 4H11V12H9V4ZM13 1H15V12H13V1Z" />
  </svg>
);

const WifiIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" style={{ opacity: 0.8 }}>
    <path d="M8 12L1.5 4.5C3.5 2.5 5.5 1.5 8 1.5C10.5 1.5 12.5 2.5 14.5 4.5L8 12Z" />
  </svg>
);

const BatteryIcon = () => (
  <svg width="20" height="12" viewBox="0 0 20 12" fill="currentColor" style={{ opacity: 0.8 }}>
    <path d="M2 3H16V9H2V3ZM0 1V11H18V1H0ZM19 4V8H20V4H19Z" />
  </svg>
);



export const PreviewPhoneTamagui = memo(PreviewPhoneTamaguiComponent);