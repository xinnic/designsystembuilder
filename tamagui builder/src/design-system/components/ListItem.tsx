import { styled, ListItem as TamaguiListItem, GetProps } from 'tamagui';

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
export const ListItem = styled(TamaguiListItem, {
    name: 'ListItem',
    backgroundColor: '$bgPrimary',
    paddingHorizontal: '$3',
    paddingVertical: '$2',
    borderRadius: '$2',
    cursor: 'pointer',

    hoverStyle: {
        backgroundColor: '$bgSecondary',
    },

    pressStyle: {
        backgroundColor: '$bgSecondary',
        opacity: 0.9,
    },

    focusStyle: {
        outlineWidth: 2,
        outlineColor: '$focus',
        outlineStyle: 'solid',
        outlineOffset: 2,
    },

    variants: {
        size: {
            small: {
                paddingVertical: '$1',
                paddingHorizontal: '$2',
            },
            medium: {
                paddingVertical: '$2',
                paddingHorizontal: '$3',
            },
            large: {
                paddingVertical: '$3',
                paddingHorizontal: '$4',
            },
        },

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
        size: 'medium',
        variant: 'default',
    },
});

export type ListItemProps = GetProps<typeof ListItem>;
