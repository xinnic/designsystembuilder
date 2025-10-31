/**
 * Design System Styled Components
 *
 * These components are built on Tamagui primitives and styled with our design tokens.
 * All components use CSS variables, making them reactive to theme changes.
 */

// Button components
export { Button, type ButtonProps } from './Button';

// Typography components
export {
  Text,
  Display,
  H1,
  H2,
  H3,
  Body,
  Caption,
  Label,
  Link,
  type TextProps,
  type DisplayProps,
  type H1Props,
  type H2Props,
  type H3Props,
  type BodyProps,
  type CaptionProps,
  type LabelProps,
  type LinkProps,
} from './Text';

// Card components
export {
  Card,
  CardHeader,
  CardFooter,
  type CardProps,
  type CardHeaderProps,
  type CardFooterProps,
} from './Card';

// Form components
export { Input, TextArea, type InputProps, type TextAreaProps } from './Input';
export { Switch, type SwitchProps } from './Switch';
export { Checkbox, CheckboxIndicator, CheckboxWithLabel, type CheckboxProps } from './Checkbox';
export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  StyledSelect,
  type SelectProps
} from './Select';

// Navigation components
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps
} from './Tabs';

// Feedback components
export {
  Progress,
  ProgressIndicator,
  CircularProgress,
  ProgressWithLabel,
  type ProgressProps
} from './Progress';

// Overlay components
export {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  AlertDialog,
  Modal,
  type DialogProps
} from './Dialog';

// Layout components
export { XStack, YStack, Stack } from './Stack';
