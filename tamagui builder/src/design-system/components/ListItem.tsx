import React from 'react';
import { styled, ListItem as TamaguiListItem, GetProps } from 'tamagui';
import { Caption } from './Text';

/**
 * ListItem component for lists, settings, menus
 * 
 * Features:
 * - Interactive states (hover, press)
 * - Icon support (left and right)
 * - Subtitle support
 * - Chevron indicator
 * 
 * @example
 * <ListItem 
 *   title="Settings"
 *   subTitle="Manage your preferences"
 *   icon={Settings}
 *   iconAfter={ChevronRight}
 *   onPress={() => navigate('/settings')}
 * />
 */
const StyledListItem = styled(TamaguiListItem, {
    name: 'ListItem',
    backgroundColor: '$bgPrimary',
    // Rows are flush by default — the list container owns the radius and clips.
    // A per-row radius made grouped lists look like stacked, overlapping chips.
    borderRadius: 0,
    cursor: 'pointer',

    hoverStyle: {
        backgroundColor: '$bgSecondary',
    },

    pressStyle: {
        backgroundColor: '$bgSecondary',
        opacity: 0.9,
    },

    focusVisibleStyle: {
        outlineWidth: 2,
        outlineColor: '$focus',
        outlineStyle: 'solid',
        outlineOffset: 2,
    },

    variants: {
        variant: {
            default: {
                backgroundColor: '$bgPrimary',
            },
            bordered: {
                backgroundColor: '$bgPrimary',
                borderWidth: 1,
                borderColor: '$border',
            },
            elevated: {
                backgroundColor: '$bgSecondary',
                shadowColor: '$shadowColor',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 1,
            },
        },
    },

    defaultVariants: {
        variant: 'default',
    },
});

/** Row density, in points. */
const LIST_ITEM_PADDING = {
    small: { horizontal: 'var(--space-3)', vertical: 'var(--space-2)' },
    medium: { horizontal: 'var(--space-4)', vertical: 'var(--space-3)' },
    large: { horizontal: 'var(--space-5)', vertical: 'var(--space-4)' },
} as const;

export type ListItemSize = keyof typeof LIST_ITEM_PADDING;

type StyledListItemProps = Omit<React.ComponentProps<typeof StyledListItem>, 'size'>;

/**
 * Padding is applied as props rather than through a `size` variant: Tamagui's
 * own ListItem owns `size` and derives padding from the space scale, which now
 * resolves to CSS variables it can't do arithmetic on. Props beat variants, so
 * this keeps rows at the density we asked for.
 */
export const ListItem = ({
    size = 'medium',
    subTitle,
    ...props
}: StyledListItemProps & { size?: ListItemSize }) => {
    const padding = LIST_ITEM_PADDING[size] ?? LIST_ITEM_PADDING.medium;

    // Tamagui sizes the subtitle off the row's `size` token, which lands at
    // 18px — larger than the 16px title above it. Wrap plain strings in Caption
    // so the supporting line always sits below the title in the hierarchy.
    const resolvedSubTitle =
        typeof subTitle === 'string' ? <Caption color="$textSecondary">{subTitle}</Caption> : subTitle;

    return (
        <StyledListItem
            paddingHorizontal={padding.horizontal}
            paddingVertical={padding.vertical}
            subTitle={resolvedSubTitle}
            {...(props as any)}
        />
    );
};

export type ListItemProps = React.ComponentProps<typeof ListItem>;
