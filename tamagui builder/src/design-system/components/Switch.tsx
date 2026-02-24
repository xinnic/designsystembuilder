import { Switch as TamaguiSwitch, SwitchProps as TamaguiSwitchProps } from 'tamagui';

/**
 * Switch component wrapper with design system tokens
 *
 * Note: We use Tamagui's native Switch instead of styled() because
 * Switch has complex internal state and animations that don't work well
 * with the styled API.
 *
 * @example
 * <Switch checked={value} onCheckedChange={setValue} />
 * <Switch size="small" disabled />
 */
export const Switch = TamaguiSwitch;

export type SwitchProps = TamaguiSwitchProps;
