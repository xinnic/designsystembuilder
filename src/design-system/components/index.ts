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

// Avatar components
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  type AvatarProps,
  type AvatarImageProps,
  type AvatarFallbackProps,
} from './Avatar';

// ListItem components
export {
  ListItem,
  ListItemTitle,
  ListItemSubtitle,
  type ListItemProps,
  type ListItemTitleProps,
  type ListItemSubtitleProps,
} from './ListItem';

// Separator component
export { Separator, type SeparatorProps } from './Separator';

// Slider components
export {
  Slider,
  SliderTrack,
  SliderTrackActive,
  SliderThumb,
  type SliderProps,
  type SliderTrackProps,
  type SliderTrackActiveProps,
  type SliderThumbProps,
} from './Slider';

// RadioGroup components
export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupIndicator,
  RadioGroupItemWithLabel,
  type RadioGroupProps,
  type RadioGroupItemProps,
  type RadioGroupIndicatorProps,
} from './RadioGroup';

// ToggleGroup components
export {
  ToggleGroup,
  ToggleGroupItem,
  type ToggleGroupProps,
  type ToggleGroupItemProps,
} from './ToggleGroup';

// Accordion components
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionChevron,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
} from './Accordion';

// Sheet components
export {
  Sheet,
  SheetOverlay,
  SheetFrame,
  SheetHandle,
  type SheetProps,
  type SheetOverlayProps,
  type SheetFrameProps,
  type SheetHandleProps,
} from './Sheet';

// Popover components
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverClose,
  type PopoverProps,
  type PopoverTriggerProps,
  type PopoverContentProps,
  type PopoverArrowProps,
  type PopoverCloseProps,
} from './Popover';

// Tooltip components
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  type TooltipProps,
  type TooltipTriggerProps,
  type TooltipContentProps,
  type TooltipArrowProps,
} from './Tooltip';

// Toast components
export {
  Toast,
  ToastTitle,
  ToastDescription,
  type ToastProps,
  type ToastTitleProps,
  type ToastDescriptionProps,
} from './Toast';

// Spinner component
export { Spinner, type SpinnerProps } from './Spinner';
