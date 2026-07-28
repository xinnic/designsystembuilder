import React from 'react';
import { YStack, XStack, ScrollView } from 'tamagui';
import {
    Layout,
    Navigation,
    FormInput,
    Grid3X3,
    Menu,
    Search,
    Bell,
    User,
    Home,
    Heart,
    MessageCircle,
    Settings
} from 'lucide-react';
import { ShowcaseSection } from '../components/ShowcaseSection';
import { PanelHeader } from '../components/builder-ui/PanelHeader';
import { BUILDER_LAYOUT } from '../config/builderLayout';
import { Button, Input, Text, H2 as Heading } from '../design-system/components';

/**
 * Patterns Showcase - Displays composed UI patterns that combine multiple components
 * Converted to use Tamagui components exclusively
 */
export default function PatternsShowcase() {
    return (
        <ScrollView maxHeight="100vh" backgroundColor="transparent">
            <YStack padding={BUILDER_LAYOUT.panelPadding} gap="$6" minHeight="100%" paddingBottom="$10">
                <PanelHeader
                    title="Patterns"
                    description="Composed layouts that combine multiple components for common use cases"
                />

                {/* App Header Pattern */}
                <ShowcaseSection
                    title="App Header"
                    description="Logo, title, and action buttons for top navigation"
                    icon={Layout}
                    borderless={false}
                >
                        <XStack
                            justifyContent="space-between"
                            alignItems="center"
                            backgroundColor="$background"
                            padding="$3"
                            borderRadius="$3"
                            borderWidth={1}
                            borderColor="$borderColor"
                        >
                            <XStack alignItems="center" gap="$3">
                                <YStack
                                    width={32}
                                    height={32}
                                    backgroundColor="$brand"
                                    borderRadius="$2"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Text fontSize="$subhead" fontWeight="600" color="white">
                                        L
                                    </Text>
                                </YStack>
                                <Text fontWeight="600" fontSize="$h3" lineHeight="$h3" color="$color">
                                    App Name
                                </Text>
                            </XStack>
                            <XStack gap="$2">
                                <XStack
                                    padding="$2"
                                    borderRadius="$3"
                                    hoverStyle={{ backgroundColor: '$background' }}
                                    pressStyle={{ backgroundColor: '$background' }}
                                    cursor="pointer"
                                >
                                    <Search size={18} color="currentColor" />
                                </XStack>
                                <XStack
                                    padding="$2"
                                    borderRadius="$3"
                                    hoverStyle={{ backgroundColor: '$background' }}
                                    pressStyle={{ backgroundColor: '$background' }}
                                    cursor="pointer"
                                >
                                    <Bell size={18} color="currentColor" />
                                </XStack>
                                <XStack
                                    padding="$2"
                                    borderRadius="$3"
                                    hoverStyle={{ backgroundColor: '$background' }}
                                    pressStyle={{ backgroundColor: '$background' }}
                                    cursor="pointer"
                                >
                                    <User size={18} color="currentColor" />
                                </XStack>
                            </XStack>
                        </XStack>
                </ShowcaseSection>

                {/* Bottom Navigation Pattern */}
                <ShowcaseSection
                    title="Bottom Navigation"
                    description="Tab bar for primary mobile navigation"
                    icon={Navigation}
                    borderless={false}
                >
                        <XStack
                            justifyContent="space-around"
                            alignItems="center"
                            backgroundColor="$background"
                            padding="$2"
                            paddingHorizontal="$4"
                            borderRadius="$3"
                            borderWidth={1}
                            borderColor="$borderColor"
                        >
                            <YStack alignItems="center" gap="$1" padding="$2" opacity={1}>
                                <Home size={20} color="rgb(var(--color-brand))" />
                                <Text fontSize="$caption" color="$brand">
                                    Home
                                </Text>
                            </YStack>
                            <YStack alignItems="center" gap="$1" padding="$2" opacity={0.5}>
                                <Heart size={20} color="currentColor" />
                                <Text fontSize="$caption" color="$color">
                                    Favorites
                                </Text>
                            </YStack>
                            <YStack alignItems="center" gap="$1" padding="$2" opacity={0.5}>
                                <MessageCircle size={20} color="currentColor" />
                                <Text fontSize="$caption" color="$color">
                                    Messages
                                </Text>
                            </YStack>
                            <YStack alignItems="center" gap="$1" padding="$2" opacity={0.5}>
                                <Settings size={20} color="currentColor" />
                                <Text fontSize="$caption" color="$color">
                                    Settings
                                </Text>
                            </YStack>
                        </XStack>
                </ShowcaseSection>

                {/* Form Layout Pattern */}
                <ShowcaseSection
                    title="Form Layout"
                    description="Label, input, and validation message composition"
                    icon={FormInput}
                    borderless={false}
                >
                        <YStack
                            gap="$4"
                            backgroundColor="$background"
                            padding="$5"
                            borderRadius="$3"
                            borderWidth={1}
                            borderColor="$borderColor"
                        >
                            <YStack gap="$2">
                                <Text fontWeight="500" fontSize="$subhead" color="$color">
                                    Email Address
                                </Text>
                                <Input
                                    variant="filled"
                                    placeholder="you@example.com"
                                    fullWidth
                                />
                                <Text fontSize="$body" color="$color" opacity={0.7}>
                                    We'll never share your email.
                                </Text>
                            </YStack>
                            <YStack gap="$2">
                                <Text fontWeight="500" fontSize="$subhead" color="$color">
                                    Password
                                </Text>
                                <Input
                                    variant="filled"
                                    placeholder="Enter password"
                                    secureTextEntry
                                    fullWidth
                                />
                            </YStack>
                            <Button variant="primary" fullWidth>
                                Sign In
                            </Button>
                        </YStack>
                </ShowcaseSection>

                {/* Card Grid Pattern */}
                <ShowcaseSection
                    title="Card Grid"
                    description="Responsive grid layout for content cards"
                    icon={Grid3X3}
                    borderless={false}
                >
                        <XStack gap="$4" flexWrap="wrap">
                            {[1, 2, 3, 4].map((i) => (
                                <YStack
                                    key={i}
                                    flex={1}
                                    minWidth={140}
                                    backgroundColor="$background"
                                    borderRadius="$3"
                                    overflow="hidden"
                                    borderWidth={1}
                                    borderColor="$borderColor"
                                >
                                    <YStack
                                        width="100%"
                                        height={80}
                                        backgroundColor="$background"
                                    />
                                    <YStack padding="$3" gap="$1">
                                        <Text fontSize="$subhead" fontWeight="600" color="$color">
                                            Card Title {i}
                                        </Text>
                                        <Text fontSize="$body" color="$color" opacity={0.7}>
                                            Brief description of this card's content.
                                        </Text>
                                    </YStack>
                                </YStack>
                            ))}
                        </XStack>
                </ShowcaseSection>

                {/* Drawer Menu Pattern */}
                <ShowcaseSection
                    title="Drawer Menu"
                    description="Side navigation with sections and user profile"
                    icon={Menu}
                    borderless={false}
                >
                        <YStack
                            width={260}
                            backgroundColor="$background"
                            padding="$4"
                            borderRadius="$3"
                            borderWidth={1}
                            borderColor="$borderColor"
                            gap="$4"
                        >
                            {/* User Section */}
                            <XStack
                                alignItems="center"
                                gap="$3"
                                paddingBottom="$4"
                                borderBottomWidth={1}
                                borderBottomColor="$borderColor"
                            >
                                <YStack
                                    width={40}
                                    height={40}
                                    backgroundColor="$brand"
                                    borderRadius="$10"
                                />
                                <YStack gap="$1">
                                    <Text fontWeight="600" fontSize="$subhead" color="$color">
                                        John Doe
                                    </Text>
                                    <Text fontSize="$body" color="$color" opacity={0.7}>
                                        john@example.com
                                    </Text>
                                </YStack>
                            </XStack>

                            {/* Menu Items */}
                            <YStack gap="$1">
                                <Text
                                    fontSize="$caption"
                                    fontWeight="500"
                                    color="$color"
                                    opacity={0.7}
                                    paddingLeft="$2"
                                    marginBottom="$1"
                                    textTransform="uppercase"
                                    letterSpacing={0.5}
                                >
                                    MAIN
                                </Text>
                                <XStack
                                    alignItems="center"
                                    gap="$3"
                                    padding="$2"
                                    paddingHorizontal="$2"
                                    borderRadius="$2"
                                    backgroundColor="$background"
                                    cursor="pointer"
                                >
                                    <Home size={18} color="currentColor" />
                                    <Text fontSize="$subhead" color="$color">
                                        Home
                                    </Text>
                                </XStack>
                                <XStack
                                    alignItems="center"
                                    gap="$3"
                                    padding="$2"
                                    paddingHorizontal="$2"
                                    borderRadius="$2"
                                    cursor="pointer"
                                    hoverStyle={{ backgroundColor: '$background' }}
                                >
                                    <Heart size={18} color="currentColor" />
                                    <Text fontSize="$subhead" color="$color">
                                        Favorites
                                    </Text>
                                </XStack>
                                <XStack
                                    alignItems="center"
                                    gap="$3"
                                    padding="$2"
                                    paddingHorizontal="$2"
                                    borderRadius="$2"
                                    cursor="pointer"
                                    hoverStyle={{ backgroundColor: '$background' }}
                                >
                                    <MessageCircle size={18} color="currentColor" />
                                    <Text fontSize="$subhead" color="$color">
                                        Messages
                                    </Text>
                                </XStack>
                            </YStack>

                            <YStack gap="$1">
                                <Text
                                    fontSize="$caption"
                                    fontWeight="500"
                                    color="$color"
                                    opacity={0.7}
                                    paddingLeft="$2"
                                    marginBottom="$1"
                                    textTransform="uppercase"
                                    letterSpacing={0.5}
                                >
                                    SETTINGS
                                </Text>
                                <XStack
                                    alignItems="center"
                                    gap="$3"
                                    padding="$2"
                                    paddingHorizontal="$2"
                                    borderRadius="$2"
                                    cursor="pointer"
                                    hoverStyle={{ backgroundColor: '$background' }}
                                >
                                    <User size={18} color="currentColor" />
                                    <Text fontSize="$subhead" color="$color">
                                        Profile
                                    </Text>
                                </XStack>
                                <XStack
                                    alignItems="center"
                                    gap="$3"
                                    padding="$2"
                                    paddingHorizontal="$2"
                                    borderRadius="$2"
                                    cursor="pointer"
                                    hoverStyle={{ backgroundColor: '$background' }}
                                >
                                    <Settings size={18} color="currentColor" />
                                    <Text fontSize="$subhead" color="$color">
                                        Settings
                                    </Text>
                                </XStack>
                            </YStack>
                        </YStack>
                </ShowcaseSection>
            </YStack>
        </ScrollView>
    );
}
