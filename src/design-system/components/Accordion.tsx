import { Accordion as TamaguiAccordion, GetProps, Square } from 'tamagui';
import { createStyledComponent } from '../utils/createComponent';
import { ChevronDown } from 'lucide-react';
import React from 'react';

/**
 * Styled Accordion component with design system tokens
 *
 * Collapsible sections for organizing content
 *
 * @example
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content goes here</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 */
export const Accordion = createStyledComponent(TamaguiAccordion, 'Accordion', {
  styles: {
    backgroundColor: '$bgPrimary',
    borderRadius: '$2',
    overflow: 'hidden',
  },
});

export const AccordionItem = createStyledComponent(TamaguiAccordion.Item, 'AccordionItem', {
  styles: {
    borderBottomWidth: 1,
    borderBottomColor: '$border',
  },
});

export const AccordionTrigger = createStyledComponent(TamaguiAccordion.Trigger, 'AccordionTrigger', {
  styles: {
    padding: '$4',
    backgroundColor: '$bgPrimary',
    color: '$textPrimary',
    fontWeight: '600',
    fontSize: '$3',
    cursor: 'pointer',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    hoverStyle: {
      backgroundColor: '$bgSecondary',
    },

    focusStyle: {
      outlineWidth: 2,
      outlineColor: '$focus',
      outlineStyle: 'solid',
    },
  },
});

export const AccordionContent = createStyledComponent(TamaguiAccordion.Content, 'AccordionContent', {
  styles: {
    padding: '$4',
    paddingTop: 0,
    backgroundColor: '$bgPrimary',
    color: '$textSecondary',
  },
});

/**
 * Accordion chevron indicator
 */
export const AccordionChevron = ({ open }: { open?: boolean }) => (
  <Square
    animation="quick"
    rotate={open ? '180deg' : '0deg'}
  >
    <ChevronDown size={20} color="rgb(var(--color-text-secondary))" />
  </Square>
);

export type AccordionProps = GetProps<typeof Accordion>;
export type AccordionItemProps = GetProps<typeof AccordionItem>;
export type AccordionTriggerProps = GetProps<typeof AccordionTrigger>;
export type AccordionContentProps = GetProps<typeof AccordionContent>;
