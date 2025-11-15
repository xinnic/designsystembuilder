/**
 * Centralized color theme configuration
 * This ensures consistency between Sidebar UI and Zustand store
 */

export interface ColorTheme {
  name: string;
  color: string;
  label: string;
  isCustom?: boolean;
}

// Define the color palette once for consistency
export const COLOR_VALUES = {
  turquoise: '#1abc9c',
  emerald: '#2ecc71',
  nephritis: '#27ae60',
  'peter-river': '#3498db',
  'belize-hole': '#2980b9',
  amethyst: '#9b59b6',
  wisteria: '#8e44ad',
  'wet-asphalt': '#34495e',
  'midnight-blue': '#2c3e50',
  'sun-flower': '#f1c40f',
  orange: '#f39c12',
  carrot: '#e67e22',
  pumpkin: '#d35400',
  alizarin: '#e74c3c',
  pomegranate: '#c0392b',
  concrete: '#95a5a6',
  asbestos: '#7f8c8d',
} as const;

// Color themes for primary colors
export const colorThemes: ColorTheme[] = [
  { name: 'custom', color: 'rainbow', label: 'Custom', isCustom: true },
  { name: 'turquoise', color: COLOR_VALUES.turquoise, label: 'Turquoise' },
  { name: 'emerald', color: COLOR_VALUES.emerald, label: 'Emerald' },
  { name: 'nephritis', color: COLOR_VALUES.nephritis, label: 'Nephritis' },
  { name: 'peter-river', color: COLOR_VALUES['peter-river'], label: 'Peter River' },
  { name: 'belize-hole', color: COLOR_VALUES['belize-hole'], label: 'Belize Hole' },
  { name: 'amethyst', color: COLOR_VALUES.amethyst, label: 'Amethyst' },
  { name: 'wisteria', color: COLOR_VALUES.wisteria, label: 'Wisteria' },
  { name: 'wet-asphalt', color: COLOR_VALUES['wet-asphalt'], label: 'Wet Asphalt' },
  { name: 'midnight-blue', color: COLOR_VALUES['midnight-blue'], label: 'Midnight Blue' },
  { name: 'sun-flower', color: COLOR_VALUES['sun-flower'], label: 'Sun Flower' },
  { name: 'orange', color: COLOR_VALUES.orange, label: 'Orange' },
  { name: 'carrot', color: COLOR_VALUES.carrot, label: 'Carrot' },
  { name: 'pumpkin', color: COLOR_VALUES.pumpkin, label: 'Pumpkin' },
  { name: 'alizarin', color: COLOR_VALUES.alizarin, label: 'Alizarin' },
  { name: 'pomegranate', color: COLOR_VALUES.pomegranate, label: 'Pomegranate' },
  { name: 'concrete', color: COLOR_VALUES.concrete, label: 'Concrete' },
  { name: 'asbestos', color: COLOR_VALUES.asbestos, label: 'Asbestos' },
];

// Accent colors (same as primary for now)
export const accentColors: ColorTheme[] = colorThemes;

// Export the rainbow gradient for custom color picker
export const RAINBOW_GRADIENT = 'conic-gradient(from 0deg, #e74c3c 0deg, #f39c12 45deg, #f1c40f 90deg, #2ecc71 135deg, #1abc9c 180deg, #3498db 225deg, #9b59b6 270deg, #e91e63 315deg, #e74c3c 360deg)';

// Default colors for fallbacks
export const DEFAULT_PRIMARY = '#3498db';
export const DEFAULT_ACCENT = '#1abc9c';