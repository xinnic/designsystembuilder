import { styled, Text as TamaguiText, GetProps } from 'tamagui';

/**
 * Base styled text component with design system tokens
 */
const BaseText = styled(TamaguiText, {
  name: 'Text',
  fontFamily: '$body',
  color: '$textPrimary',
});

/**
 * Display text - Largest heading for hero sections
 * @example <Display>Welcome to our app</Display>
 */
export const Display = styled(BaseText, {
  name: 'Display',
  fontFamily: '$heading',
  fontSize: '$6',
  lineHeight: '$6',
  fontWeight: '700',
  color: '$textPrimary',
});

/**
 * H1 - Main page heading
 * @example <H1>Page Title</H1>
 */
export const H1 = styled(BaseText, {
  name: 'H1',
  fontFamily: '$heading',
  fontSize: '$5',
  lineHeight: '$5',
  fontWeight: '700',
  color: '$textPrimary',
});

/**
 * H2 - Section heading
 * @example <H2>Section Title</H2>
 */
export const H2 = styled(BaseText, {
  name: 'H2',
  fontFamily: '$heading',
  fontSize: '$4',
  lineHeight: '$4',
  fontWeight: '600',
  color: '$textPrimary',
});

/**
 * H3 - Subsection heading
 * @example <H3>Subsection Title</H3>
 */
export const H3 = styled(BaseText, {
  name: 'H3',
  fontFamily: '$heading',
  fontSize: '$3',
  lineHeight: '$3',
  fontWeight: '600',
  color: '$textPrimary',
});

/**
 * Body - Default body text
 * @example <Body>This is body text</Body>
 */
export const Body = styled(BaseText, {
  name: 'Body',
  fontSize: '$2',
  lineHeight: '$2',
  fontWeight: '400',
  color: '$textPrimary',
});

/**
 * Caption - Small text for labels, metadata
 * @example <Caption>Posted 2 hours ago</Caption>
 */
export const Caption = styled(BaseText, {
  name: 'Caption',
  fontSize: '$1',
  lineHeight: '$1',
  fontWeight: '400',
  color: '$textSecondary',
});

/**
 * Label - Form labels and UI labels
 * @example <Label>Email address</Label>
 */
export const Label = styled(BaseText, {
  name: 'Label',
  fontSize: '$2',
  lineHeight: '$2',
  fontWeight: '600',
  color: '$textPrimary',
});

/**
 * Link - Styled text for links
 * @example <Link href="/about">Learn more</Link>
 */
export const Link = styled(BaseText, {
  name: 'Link',
  fontSize: '$2',
  lineHeight: '$2',
  fontWeight: '400',
  color: '$brand',
  cursor: 'pointer',
  textDecorationLine: 'none',

  hoverStyle: {
    textDecorationLine: 'underline',
    opacity: 0.9,
  },

  pressStyle: {
    opacity: 0.8,
  },

  focusStyle: {
    outlineWidth: 2,
    outlineColor: '$focus',
    outlineStyle: 'solid',
    outlineOffset: 2,
  },
});

// Type exports
export type DisplayProps = GetProps<typeof Display>;
export type H1Props = GetProps<typeof H1>;
export type H2Props = GetProps<typeof H2>;
export type H3Props = GetProps<typeof H3>;
export type BodyProps = GetProps<typeof Body>;
export type CaptionProps = GetProps<typeof Caption>;
export type LabelProps = GetProps<typeof Label>;
export type LinkProps = GetProps<typeof Link>;

// Re-export base text for custom use cases
export const Text = BaseText;
export type TextProps = GetProps<typeof Text>;
