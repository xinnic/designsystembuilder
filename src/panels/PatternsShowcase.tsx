import React from 'react';
import { YStack, XStack, Text, Heading, ScrollView } from 'tamagui';
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

import { Button, Input } from '../design-system/components';

/**
 * Patterns Showcase - Displays composed UI patterns that combine multiple components
 * Converted to use Tamagui components exclusively
 */
export default function PatternsShowcase() {
    return (
        <ScrollView maxHeight="100vh">
            <YStack padding="$6" gap="$8">
                {/* Intro */}
                <YStack gap="$2">
                    <Heading fontSize="$8" fontWeight="600" marginBottom="$2" color="$color">
                        Patterns
                    </Heading>
                    <Text fontSize="$3" color="$color" opacity={0.7}>
                        Composed layouts that combine multiple components for common use cases
                    </Text>
                </YStack>

                {/* App Header Pattern */}
                <YStack gap="$4">
                    <YStack gap="$1">
                        <XStack gap="$2" alignItems="center">
                            <Layout size={18} color="var(--color-brand)" />
                            <Heading fontSize="$5" fontWeight="600" color="$color">
                                App Header
                            </Heading>
                        </XStack>
                        <Text fontSize="$3" color="$color" opacity={0.7}>
                            Logo, title, and action buttons for top navigation
                        </Text>
                    </YStack>
                    <YStack
                        backgroundColor="$background"
                        borderRadius="$4"
                        padding="$4"
                        borderWidth={1}
                        borderColor="$borderColor"
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
                                    <Text fontSize="$3" fontWeight="600" color="white">
                                        L
                                    </Text>
                                </YStack>
                                <Text fontWeight="600" fontSize="$5" color="$color">
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
                    </YStack>
                </YStack>

                {/* Bottom Navigation Pattern */}
                <YStack gap="$4">
                    <YStack gap="$1">
                        <XStack gap="$2" alignItems="center">
                            <Navigation size={18} color="var(--color-brand)" />
                            <Heading fontSize="$5" fontWeight="600" color="$color">
                                Bottom Navigation
                            </Heading>
                        </XStack>
                        <Text fontSize="$3" color="$color" opacity={0.7}>
                            Tab bar for primary mobile navigation
                        </Text>
                    </YStack>
                    <YStack
                        backgroundColor="$background"
                        borderRadius="$4"
                        padding="$4"
                        borderWidth={1}
                        borderColor="$borderColor"
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
                                <Home size={20} color="var(--color-brand)" />
                                <Text fontSize="$1" color="$brand">
                                    Home
                                </Text>
                            </YStack>
                            <YStack alignItems="center" gap="$1" padding="$2" opacity={0.5}>
                                <Heart size={20} color="currentColor" />
                                <Text fontSize="$1" color="$color">
                                    Favorites
                                </Text>
                            </YStack>
                            <YStack alignItems="center" gap="$1" padding="$2" opacity={0.5}>
                                <MessageCircle size={20} color="currentColor" />
                                <Text fontSize="$1" color="$color">
                                    Messages
                                </Text>
                            </YStack>
                            <YStack alignItems="center" gap="$1" padding="$2" opacity={0.5}>
                                <Settings size={20} color="currentColor" />
                                <Text fontSize="$1" color="$color">
                                    Settings
                                </Text>
                            </YStack>
                        </XStack>
                    </YStack>
                </YStack>

                {/* Form Layout Pattern */}
                <YStack gap="$4">
                    <YStack gap="$1">
                        <XStack gap="$2" alignItems="center">
                            <FormInput size={18} color="var(--color-brand)" />
                            <Heading fontSize="$5" fontWeight="600" color="$color">
                                Form Layout
                            </Heading>
                        </XStack>
                        <Text fontSize="$3" color="$color" opacity={0.7}>
                            Label, input, and validation message composition
                        </Text>
                    </YStack>
                    <YStack
                        backgroundColor="$background"
                        borderRadius="$4"
                        padding="$4"
                        borderWidth={1}
                        borderColor="$borderColor"
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
                                <Text fontWeight="500" fontSize="$3" color="$color">
                                    Email Address
                                </Text>
                                <Input
                                    variant="filled"
                                    placeholder="you@example.com"
                                    fullWidth
                                />
                                <Text fontSize="$2" color="$color" opacity={0.7}>
                                    We'll never share your email.
                                </Text>
                            </YStack>
                            <YStack gap="$2">
                                <Text fontWeight="500" fontSize="$3" color="$color">
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
                    </YStack>
                </YStack>

                {/* Card Grid Pattern */}
                <YStack gap="$4">
                    <YStack gap="$1">
                        <XStack gap="$2" alignItems="center">
                            <Grid3X3 size={18} color="var(--color-brand)" />
                            <Heading fontSize="$5" fontWeight="600" color="$color">
                                Card Grid
                            </Heading>
                        </XStack>
                        <Text fontSize="$3" color="$color" opacity={0.7}>
                            Responsive grid layout for content cards
                        </Text>
                    </YStack>
                    <YStack
                        backgroundColor="$background"
                        borderRadius="$4"
                        padding="$4"
                        borderWidth={1}
                        borderColor="$borderColor"
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
                                        <Text fontSize="$3" fontWeight="600" color="$color">
                                            Card Title {i}
                                        </Text>
                                        <Text fontSize="$2" color="$color" opacity={0.7}>
                                            Brief description of this card's content.
                                        </Text>
                                    </YStack>
                                </YStack>
                            ))}
                        </XStack>
                    </YStack>
                </YStack>

                {/* Drawer Menu Pattern */}
                <YStack gap="$4">
                    <YStack gap="$1">
                        <XStack gap="$2" alignItems="center">
                            <Menu size={18} color="var(--color-brand)" />
                            <Heading fontSize="$5" fontWeight="600" color="$color">
                                Drawer Menu
                            </Heading>
                        </XStack>
                        <Text fontSize="$3" color="$color" opacity={0.7}>
                            Side navigation with sections and user profile
                        </Text>
                    </YStack>
                    <YStack
                        backgroundColor="$background"
                        borderRadius="$4"
                        padding="$4"
                        borderWidth={1}
                        borderColor="$borderColor"
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
                                    <Text fontWeight="600" fontSize="$3" color="$color">
                                        John Doe
                                    </Text>
                                    <Text fontSize="$2" color="$color" opacity={0.7}>
                                        john@example.com
                                    </Text>
                                </YStack>
                            </XStack>

                            {/* Menu Items */}
                            <YStack gap="$1">
                                <Text
                                    fontSize="$1"
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
                                    <Text fontSize="$3" color="$color">
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
                                    <Text fontSize="$3" color="$color">
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
                                    <Text fontSize="$3" color="$color">
                                        Messages
                                    </Text>
                                </XStack>
                            </YStack>

                            <YStack gap="$1">
                                <Text
                                    fontSize="$1"
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
                                    <Text fontSize="$3" color="$color">
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
                                    <Text fontSize="$3" color="$color">
                                        Settings
                                    </Text>
                                </XStack>
                            </YStack>
                        </YStack>
                    </YStack>
                </YStack>
            </YStack>
        </ScrollView>
    );
}
