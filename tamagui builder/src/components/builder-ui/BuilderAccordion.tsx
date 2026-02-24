import React from 'react';
import { XStack, Text, useTheme, Button } from 'tamagui';
import { ChevronDown, LucideIcon } from 'lucide-react';

interface BuilderAccordionProps {
  title: string;
  icon?: LucideIcon;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const BuilderAccordion = ({ title, icon: Icon, isOpen, onToggle, children }: BuilderAccordionProps) => {
  const theme = useTheme();

  return (
    <>
      <XStack
        onPress={onToggle}
        paddingVertical="$3"
        paddingHorizontal="$2"
        alignItems="center"
        justifyContent="space-between"
        cursor="pointer"
        hoverStyle={{ opacity: 0.7 }}
        pressStyle={{ opacity: 0.5 }}
        marginBottom={isOpen ? "$2" : 0}
      >
        <XStack gap="$3" alignItems="center">
          {Icon && <Icon size={18} color={theme.color?.val || '#000'} />}
          <Text 
            size="$4" 
            fontWeight="600" 
            color="$color"
          >
            {title}
          </Text>
        </XStack>
        <ChevronDown
          size={16}
          color={theme.color?.val || '#000'}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </XStack>
      
      {isOpen && children}
    </>
  );
};
