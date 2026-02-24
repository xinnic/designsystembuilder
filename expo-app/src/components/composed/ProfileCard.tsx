/**
 * ProfileCard Component — Composed (NativeWind + CVA)
 *
 * STRUCTURAL SPECS:
 * - MUST render as user profile card with avatar, name, bio, stats
 * - MUST support variant: default (vertical), compact (horizontal)
 * - MUST support avatar with optional status indicator
 * - MUST support name, username, bio text slots
 * - MUST support stats row (followers, following, posts)
 * - MUST support action buttons (follow, message)
 * - MUST use Card component as base
 * - Avatar MUST be centered in default variant, left in compact
 * - Stats MUST show as horizontal row with dividers
 * - MUST truncate bio with numberOfLines
 *
 * COMPOSITION:
 * - Uses Card, Avatar, Button components
 */

import React from 'react';
import { View, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Divider } from '../ui/Stack';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const profileCardVariants = cva('gap-4', {
  variants: {
    variant: {
      default: 'items-center',
      compact: 'flex-row items-start',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProfileStat {
  label: string;
  value: number | string;
}

export interface ProfileCardProps extends VariantProps<typeof profileCardVariants> {
  /** Avatar image URL */
  avatar?: string;
  /** User name */
  name: string;
  /** Username or handle */
  username?: string;
  /** Text status like 'Active now' */
  statusText?: string;
  /** Bio text */
  bio?: string;
  /** Stats (followers, following, posts) */
  stats?: ProfileStat[];
  /** Action buttons */
  actions?: React.ReactNode;
  /** Avatar size */
  avatarSize?: 'md' | 'lg' | 'xl' | '2xl';
  /** Status indicator */
  status?: 'online' | 'offline' | 'busy';
  /** Max lines for bio */
  bioLines?: number;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ProfileCard({
  variant,
  avatar,
  name,
  username,
  statusText,
  bio,
  stats,
  actions,
  avatarSize = variant === 'compact' ? 'lg' : 'xl',
  status,
  bioLines = 3,
  className,
}: ProfileCardProps) {
  const isCompact = variant === 'compact';

  return (
    <Card className={className}>
      <View className={cn(profileCardVariants({ variant }))}>
        {/* Avatar */}
        <Avatar
          src={avatar}
          initials={name}
          size={avatarSize}
          status={status}
        />

        {/* Content */}
        <View className={cn('flex-1 gap-2', isCompact ? '' : 'items-center')}>
          {/* Name */}
          <Text
            className={cn(
              'font-bold text-on-surface',
              isCompact ? 'text-lg' : 'text-xl',
            )}
          >
            {name}
          </Text>

          {/* Username or Status Text */}
          {statusText ? (
            <Text className="text-xs font-semibold text-green-500">
              {statusText}
            </Text>
          ) : username ? (
            <Text className="text-sm text-on-surface-secondary">
              @{username}
            </Text>
          ) : null}

          {/* Bio */}
          {bio && (
            <Text
              className={cn(
                'text-sm text-on-surface-secondary',
                !isCompact && 'text-center',
              )}
              numberOfLines={bioLines}
            >
              {bio}
            </Text>
          )}

          {/* Stats */}
          {stats && stats.length > 0 && (
            <View className="flex-row items-center gap-4 py-2">
              {stats.map((stat, index) => (
                <React.Fragment key={stat.label}>
                  {index > 0 && (
                    <Divider orientation="vertical" className="h-8" />
                  )}
                  <View className="items-center">
                    <Text className="text-lg font-bold text-on-surface">
                      {stat.value}
                    </Text>
                    <Text className="text-xs text-on-surface-secondary">
                      {stat.label}
                    </Text>
                  </View>
                </React.Fragment>
              ))}
            </View>
          )}

          {/* Actions */}
          {actions && (
            <View
              className={cn(
                'flex-row gap-2',
                !isCompact && 'w-full justify-center',
              )}
            >
              {actions}
            </View>
          )}
        </View>
      </View>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { profileCardVariants };
