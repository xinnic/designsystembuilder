import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { X } from "lucide-react"
import { styled, useTheme } from "tamagui"

const ToastProvider = ToastPrimitives.Provider

const StyledViewport = styled(ToastPrimitives.Viewport, {
  position: 'fixed',
  bottom: 0,
  right: 0,
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'column',
  padding: '$4',
  gap: '$3',
  width: '100%',
  maxWidth: 420,
  maxHeight: '100vh',
  pointerEvents: 'none',
  
  '& > *': {
    pointerEvents: 'auto',
  },
})

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>((props, ref) => (
  <StyledViewport
    ref={ref}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const StyledToast = styled(ToastPrimitives.Root, {
  backgroundColor: '$background',
  borderColor: '$borderColor',
  borderWidth: 1,
  borderRadius: '$4',
  padding: '$4',
  gap: '$3',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowRadius: '$4',
  shadowOffset: { width: 0, height: 2 },
  elevation: '$4',
  
  animation: 'quick',
  enterStyle: { 
    opacity: 0, 
    scale: 0.9, 
    x: 100,
  },
  exitStyle: { 
    opacity: 0, 
    scale: 0.95,
    x: 100,
  },
  
  variants: {
    variant: {
      default: {
        backgroundColor: '$background',
        borderColor: '$borderColor',
      },
      destructive: {
        backgroundColor: '$background',
        borderColor: 'rgb(var(--color-danger))',
        borderWidth: 2,
      },
    }
  },
  
  defaultVariants: {
    variant: 'default'
  }
})

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & {
    variant?: "default" | "destructive"
  }
>(({ variant, ...props }, ref) => {
  return (
    <StyledToast
      ref={ref}
      variant={variant}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const StyledAction = styled(ToastPrimitives.Action, {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$2',
  borderWidth: 1,
  borderColor: '$borderColor',
  backgroundColor: 'transparent',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  minHeight: '$6',
  
  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },
  
  pressStyle: {
    backgroundColor: '$backgroundStrong',
  },
})

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>((props, ref) => (
  <StyledAction
    ref={ref}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const StyledClose = styled(ToastPrimitives.Close, {
  position: 'absolute',
  top: '$2',
  right: '$2',
  borderRadius: '$2',
  padding: '$1',
  opacity: 0.5,
  backgroundColor: 'transparent',
  borderWidth: 0,
  cursor: 'pointer',
  
  hoverStyle: {
    opacity: 1,
    backgroundColor: '$backgroundHover',
  },
  
  pressStyle: {
    opacity: 0.8,
  },
})

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>((props, ref) => {
  const theme = useTheme()
  
  return (
    <StyledClose
      ref={ref}
      toast-close=""
      {...props}
    >
      <X size={16} color={theme.color?.val} />
    </StyledClose>
  )
})
ToastClose.displayName = ToastPrimitives.Close.displayName

const StyledTitle = styled(ToastPrimitives.Title, {
  fontSize: '$3',
  fontWeight: '600',
  color: '$color',
  lineHeight: '$3',
})

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>((props, ref) => (
  <StyledTitle
    ref={ref}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const StyledDescription = styled(ToastPrimitives.Description, {
  fontSize: '$2',
  opacity: 0.9,
  color: '$colorHover',
  lineHeight: '$2',
})

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>((props, ref) => (
  <StyledDescription
    ref={ref}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>
type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
