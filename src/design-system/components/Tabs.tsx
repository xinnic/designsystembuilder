import { styled, Tabs as TamaguiTabs, GetProps } from 'tamagui';

/**
 * Tabs - Styled tabs component with design tokens
 *
 * Features:
 * - Design system colors and spacing
 * - Active tab highlighting
 * - Smooth transitions
 * - Accessible navigation
 *
 * @example
 * <Tabs defaultValue="tab1" orientation="horizontal">
 *   <Tabs.List>
 *     <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
 *     <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
 *   </Tabs.List>
 *   <Tabs.Content value="tab1">Content 1</Tabs.Content>
 *   <Tabs.Content value="tab2">Content 2</Tabs.Content>
 * </Tabs>
 */
export const Tabs = styled(TamaguiTabs, {
  name: 'Tabs',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: 'transparent',
});

// Styled tab list container
export const TabsList = styled(TamaguiTabs.List, {
  name: 'TabsList',
  flexDirection: 'row',
  backgroundColor: '$bgSecondary',
  borderRadius: '$2',
  borderWidth: 1,
  borderColor: '$border',
  padding: '$1',
  gap: '$1',

  variants: {
    variant: {
      default: {
        backgroundColor: '$bgSecondary',
      },
      underlined: {
        backgroundColor: 'transparent',
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '$border',
        padding: 0,
      },
      pills: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        gap: '$2',
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
});

// Styled individual tab trigger
export const TabsTrigger = styled(TamaguiTabs.Tab, {
  name: 'TabsTrigger',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: '$4',
  paddingVertical: '$2',
  borderRadius: '$1',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  color: '$textSecondary',
  fontSize: '$3',
  fontWeight: '500',
  transition: 'all 0.2s',

  hoverStyle: {
    backgroundColor: '$bgPrimary',
    color: '$textPrimary',
  },

  focusStyle: {
    outlineWidth: 2,
    outlineColor: '$focus',
    outlineStyle: 'solid',
    outlineOffset: 2,
  },

  pressStyle: {
    scale: 0.98,
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$brand',
        color: 'white',

        hoverStyle: {
          backgroundColor: '$brand',
          color: 'white',
        },
      },
    },

    variant: {
      default: {},
      underlined: {
        backgroundColor: 'transparent',
        borderRadius: 0,
        paddingHorizontal: '$3',

        '&[data-state="active"]': {
          backgroundColor: 'transparent',
          color: '$brand',
          borderBottomWidth: 2,
          borderBottomColor: '$brand',
        },
      },
      pills: {
        borderRadius: '$4',
        paddingHorizontal: '$4',

        '&[data-state="active"]': {
          backgroundColor: '$brand',
          color: 'white',
        },
      },
    },

    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },

    size: {
      small: {
        paddingHorizontal: '$2',
        paddingVertical: '$1',
        fontSize: '$2',
      },
      medium: {
        paddingHorizontal: '$4',
        paddingVertical: '$2',
        fontSize: '$3',
      },
      large: {
        paddingHorizontal: '$5',
        paddingVertical: '$3',
        fontSize: '$4',
      },
    },
  },

  defaultVariants: {
    variant: 'default',
    size: 'medium',
  },
});

// Styled tab content
export const TabsContent = styled(TamaguiTabs.Content, {
  name: 'TabsContent',
  flexGrow: 1,
  padding: '$4',
  backgroundColor: 'transparent',

  variants: {
    variant: {
      default: {},
      bordered: {
        borderWidth: 1,
        borderColor: '$border',
        borderRadius: '$2',
        backgroundColor: '$bgPrimary',
      },
      elevated: {
        backgroundColor: '$bgPrimary',
        borderRadius: '$2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
});

// Re-export for convenience
Tabs.List = TabsList;
Tabs.Tab = TabsTrigger;
Tabs.Content = TabsContent;

export type TabsProps = GetProps<typeof Tabs>;