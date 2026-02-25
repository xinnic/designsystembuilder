/**
 * UserCard Component — Composed (NativeWind + CVA)
 *
 * STRUCTURAL SPECS:
 * - MUST render as user info card with avatar, name, role
 * - MUST support variant: horizontal (default), vertical
 * - MUST support avatar with optional status indicator
 * - MUST support name, role/title, description
 * - MUST support action buttons (follow, message, etc.)
 * - MUST use Card component as base
 * - MUST support pressable for navigation
 * - Horizontal: avatar left, content center, actions right
 * - Vertical: avatar top-center, content below, actions bottom
 *
 * COMPOSITION:
 * - Uses Card, Avatar, Button components
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const userCardVariants = cva('gap-3', {
  variants: {
    variant: {
      horizontal: 'flex-row items-center',
      vertical: 'items-center',
    },
  },
  defaultVariants: {
    variant: 'horizontal',
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UserCardProps extends VariantProps<typeof userCardVariants> {
  /** Avatar image URL */
  avatar?: string;
  /** User name */
  name: string;
  /** Role or title */
  role?: string;
  /** Additional description */
  description?: string;
  /** Action buttons */
  actions?: React.ReactNode;
  /** Avatar size */
  avatarSize?: 'sm' | 'md' | 'lg' | 'xl';
  /** Status indicator */
  status?: 'online' | 'offline' | 'busy';
  /** Called when card is pressed */
  onPress?: () => void;
  /** Additional NativeWind classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function UserCard({
  variant,
  avatar,
  name,
  role,
  description,
  actions,
  avatarSize = variant === 'vertical' ? 'lg' : 'md',
  status,
  onPress,
  className,
}: UserCardProps) {
  const isVertical = variant === 'vertical';

  const content = (
    <View className={cn(userCardVariants({ variant }))}>
      {/* Avatar */}
      <Avatar src={avatar} initials={name} size={avatarSize} status={status} />

      {/* Content */}
      <View
        className={cn(
          'flex-1 gap-0.5',
          isVertical ? 'items-center' : 'justify-center',
        )}
      >
        <Text
          className={cn(
            'font-body font-semibold text-on-surface',
            isVertical ? 'text-center text-lg' : 'text-base',
          )}
        >
          {name}
        </Text>
        {role && (
          <Text
            className={cn(
              'font-body text-on-surface-secondary',
              isVertical ? 'text-center text-sm' : 'text-xs',
            )}
          >
            {role}
          </Text>
        )}
        {description && (
          <Text
            className={cn(
              'font-body text-on-surface-secondary',
              isVertical ? 'text-center text-sm' : 'text-xs',
            )}
            numberOfLines={2}
          >
            {description}
          </Text>
        )}
      </View>

      {/* Actions */}
      {actions && (
        <View
          className={cn(
            'flex-row gap-2',
            isVertical && 'w-full justify-center',
          )}
        >
          {actions}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button">
        <Card className={className}>{content}</Card>
      </Pressable>
    );
  }

  return <Card className={className}>{content}</Card>;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { userCardVariants };
