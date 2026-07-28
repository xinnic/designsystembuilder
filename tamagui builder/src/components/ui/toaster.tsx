import { useToast } from "@/hooks/use-toast"
import { YStack } from "tamagui"
import { Body, Caption } from "@/design-system/components/Text"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            {/* The Radix title/description render as Tamagui Views, so their
                content has to be a Text node — a bare string throws. */}
            <YStack gap="$1">
              {title && (
                <ToastTitle>
                  <Body margin={0} fontWeight="600">{title}</Body>
                </ToastTitle>
              )}
              {description && (
                <ToastDescription>
                  <Caption color="$textSecondary">{description}</Caption>
                </ToastDescription>
              )}
            </YStack>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
