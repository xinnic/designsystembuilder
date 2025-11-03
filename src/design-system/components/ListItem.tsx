import { ListItem as TamaguiListItem, XStack, YStack, GetProps } from 'tamagui';
import { createStyledComponent } from '../utils/createComponent';
import React from 'react';

/**
 * Styled ListItem component with design system tokens
 *
 * Displays list rows with leading/trailing content
 * Perfect for settings menus, contact lists, navigation
 *
 * Features:
 * - Leading icon or avatar
 * - Title and subtitle text
 * - Trailing content (chevron, badge, switch)
 * - Hover and press states
 * - Optional divider
 *
 * Sizes:
 * - small: Compact lists
 * - medium: Standard list items (default)
 * - large: Featured items
 *
 * @example
 * <ListItem
 *   icon={<Settings />}
 *   title="Preferences"
 *   subtitle="Customize your experience"
 *   onPress={() => {}}
 * />
 */
export const ListItem = createStyledComponent(TamaguiListItem, 'ListItem', {
  styles: {
    backgroundColor: '$bgPrimary',
    borderRadius: 0,
    cursor: 'pointer',

    hoverStyle: {
      backgroundColor: '$bgSecondary',
    },

    pressStyle: {
      backgroundColor: '$bgSecondary',
      opacity: 0.9,
    },
  },
  variants: {
    size: {
      small: {
        paddingHorizontal: '$3',
        paddingVertical: '$2',
        gap: '$2',
      },
      medium: {
        paddingHorizontal: '$4',
        paddingVertical: '$3',
        gap: '$3',
      },
      large: {
        paddingHorizontal: '$5',
        paddingVertical: '$4',
        gap: '$4',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

/**
 * ListItemTitle - Primary text in a list item
 */
export const ListItemTitle = createStyledComponent(TamaguiListItem.Title, 'ListItemTitle', {
  styles: {
    color: '$textPrimary',
    fontSize: '$3',
    fontWeight: '600',
  },
});

/**
 * ListItemSubtitle - Secondary text in a list item
 */
export const ListItemSubtitle = createStyledComponent(TamaguiListItem.Subtitle, 'ListItemSubtitle', {
  styles: {
    color: '$textSecondary',
    fontSize: '$2',
  },
});

export type ListItemProps = GetProps<typeof ListItem>;
export type ListItemTitleProps = GetProps<typeof ListItemTitle>;
export type ListItemSubtitleProps = GetProps<typeof ListItemSubtitle>;
