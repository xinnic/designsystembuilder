import React from 'react';
import { TamaguiProvider, View, Text, Button, XStack, YStack, Card, Input, Switch, Avatar, ScrollView, Separator, H1, H2, H3, Paragraph, SizableText, Circle, Square } from 'tamagui';
import { config } from '../tamagui.config';
import { useDesignSystem } from '../state/designSystem';
import { Home, Search, User, Settings, Heart, Bell } from 'lucide-react';

export const PreviewPhoneTamagui = () => {
  const { opts, selectedPrimaryFont, selectedDisplayFont, isDarkMode } = useDesignSystem();

  return (
    <TamaguiProvider config={config} defaultTheme={isDarkMode ? 'dark' : 'light'}>
      <div className="h-full flex items-start justify-center p-8 bg-gray-100 min-h-[600px]">
        <View
          backgroundColor="$background"
          borderColor="$borderColor"
          borderWidth={8}
          borderRadius="$4"
          width={320}
          height={640}
          overflow="hidden"
        >
          {/* Status Bar */}
          <XStack
            backgroundColor="$background"
            paddingHorizontal="$3"
            paddingVertical="$1"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize={12} fontWeight="500">9:41</Text>
            <XStack gap="$1">
              <View width={16} height={12} borderColor="$color" borderWidth={1} borderRadius="$1">
                <View width={8} height={6} backgroundColor="$color" marginLeft={2} marginTop={2} borderRadius={1} />
              </View>
            </XStack>
          </XStack>

          <ScrollView flex={1}>
            {/* App Header */}
            <YStack backgroundColor="$backgroundStrong" paddingHorizontal="$4" paddingVertical="$3" borderBottomColor="$borderColor" borderBottomWidth={1}>
              <XStack justifyContent="space-between" alignItems="center" marginBottom="$3">
                <XStack alignItems="center" gap="$3">
                  {opts.logo && (
                    <Avatar circular size="$3">
                      <Avatar.Image src={opts.logo} />
                      <Avatar.Fallback backgroundColor="$brand" />
                    </Avatar>
                  )}
                  <H1 color="$brand" fontSize={20} fontFamily={`var(--font-display)`}>
                    Discover
                  </H1>
                </XStack>
                <XStack gap="$2">
                  <Button size="$2" circular chromeless icon={Search} />
                  <Button size="$2" circular chromeless icon={Bell} />
                </XStack>
              </XStack>

              {/* Category Pills */}
              <XStack gap="$2" flexWrap="nowrap">
                {['For You', 'Trending', 'News', 'Sports'].map((cat, idx) => (
                  <Button
                    key={cat}
                    size="$2"
                    theme={idx === 0 ? 'active' : undefined}
                    backgroundColor={idx === 0 ? '$brand' : '$background'}
                    color={idx === 0 ? 'white' : '$color'}
                    borderRadius="$4"
                    pressStyle={{ scale: 0.95 }}
                  >
                    {cat}
                  </Button>
                ))}
              </XStack>
            </YStack>

            {/* Content Cards */}
            <YStack padding="$4" gap="$4">
              {/* Featured Card */}
              <Card elevate bordered>
                <Card.Header padded>
                  <XStack justifyContent="space-between" alignItems="center">
                    <H2 fontSize={18} fontFamily={`var(--font-display)`}>Featured Today</H2>
                    <Circle size="$1" backgroundColor="$brand" />
                  </XStack>
                </Card.Header>
                <Separator />
                <Card.Footer padded>
                  <YStack gap="$2">
                    <Paragraph theme="alt1">
                      Explore the latest trends in mobile app design and development.
                    </Paragraph>
                    <XStack gap="$2">
                      <Button size="$3" theme="active" backgroundColor="$brand">
                        Read More
                      </Button>
                      <Button size="$3" variant="outlined">
                        Save
                      </Button>
                    </XStack>
                  </YStack>
                </Card.Footer>
              </Card>

              {/* List Items */}
              {[1, 2, 3].map((i) => (
                <Card key={i} size="$2" bordered>
                  <XStack padding="$3" alignItems="center" gap="$3">
                    <Square size="$4" backgroundColor="$brand" opacity={0.1} borderRadius="$2">
                      <Text color="$brand">{i}</Text>
                    </Square>
                    <YStack flex={1}>
                      <SizableText size="$4" fontWeight="600">
                        Item Title {i}
                      </SizableText>
                      <SizableText size="$2" theme="alt2">
                        Description text here
                      </SizableText>
                    </YStack>
                    <Button size="$1" circular chromeless icon={Heart} />
                  </XStack>
                </Card>
              ))}

              {/* Input Section */}
              <YStack gap="$3">
                <H3 fontSize={16} fontFamily={`var(--font-display)`}>Settings</H3>
                <Input placeholder="Enter your name..." />
                <XStack justifyContent="space-between" alignItems="center">
                  <Text>Enable notifications</Text>
                  <Switch size="$2">
                    <Switch.Thumb animation="bouncy" />
                  </Switch>
                </XStack>
              </YStack>
            </YStack>
          </ScrollView>

          {/* Bottom Navigation */}
          {opts.menuLayout === 'bottomBar' && (
            <XStack
              backgroundColor="$backgroundStrong"
              paddingVertical="$2"
              paddingHorizontal="$3"
              borderTopColor="$borderColor"
              borderTopWidth={1}
              justifyContent="space-around"
            >
              {[
                { icon: Home, label: 'Home', active: true },
                { icon: Search, label: 'Search', active: false },
                { icon: Heart, label: 'Saved', active: false },
                { icon: User, label: 'Profile', active: false },
                { icon: Settings, label: 'Settings', active: false },
              ].map((item) => (
                <Button
                  key={item.label}
                  size="$3"
                  chromeless
                  flexDirection="column"
                  padding="$2"
                >
                  <item.icon size={20} color={item.active ? 'var(--brand)' : undefined} />
                  <Text fontSize={10} marginTop="$1" color={item.active ? '$brand' : '$color'}>
                    {item.label}
                  </Text>
                </Button>
              ))}
            </XStack>
          )}
        </View>
      </div>
    </TamaguiProvider>
  );
};