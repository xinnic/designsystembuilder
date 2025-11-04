import React, { useState, useEffect } from 'react';
import { Copy, Layers3, Palette } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { PreviewPhoneTamagui } from '@/components/PreviewPhoneTamagui';
import DesignSystemOverview from '@/components/DesignSystemOverview';
import TamaguiShowcase from '@/panels/TamaguiShowcase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { getPresetById } from '@/lib/stylePresets';
import { useDesignSystem } from '@/state/designSystem';

const fonts = [
  { name: 'Plus Jakarta Sans', class: 'font-jakarta' },
  { name: 'Be Vietnam Pro', class: 'font-vietnam' },
  { name: 'Wix Madefor Text', class: 'font-wix' },
  { name: 'Figtree', class: 'font-figtree' },
  { name: 'Albert Sans', class: 'font-albert' },
  { name: 'Satoshi', class: 'font-satoshi' },
];

const Index = () => {
  const {
    isDarkMode,
    setDarkMode,
    selectedTheme,
    setTheme,
    customPrimaryColor,
    setCustomPrimaryColor,
    selectedAccentColor,
    setAccentColor,
    customAccentColor,
    setCustomAccentColor,
    selectedScale,
    setScale,
    selectedPrimaryFont,
    setPrimaryFont,
    selectedDisplayFont,
    setDisplayFont,
    stylePresetId: selectedStylePreset,
    setStylePreset,
    tokens
  } = useDesignSystem();

  const [selectedBaseLib, setSelectedBaseLib] = useState('shadcn');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Theme and style classes are now handled by useTokenCSS in the store

  const parseTypographyValue = (value: string) => {
    // Parse strings like "700 28px/38px" into { weight: 700, size: "28px", line: "38px" }
    const match = value.match(/(\d+)\s+(\d+px)\/(\d+px)/);
    if (match) {
      return {
        weight: parseInt(match[1]),
        size: match[2],
        line: match[3]
      };
    }
    return { weight: 400, size: "16px", line: "24px" };
  };

  const getTamaguiMegaprompt = (primaryFontName: string, displayFontName: string, selectedScale: string, typographyStyles: any, colorRoles: any, spacingScale: string, radii: string, shadows: string, motion: string, themeModes: string, densityModes: string) => {
    return `# React Native Design System with Tamagui

## Objective
Create a comprehensive, cross-platform React Native design system using Tamagui that works seamlessly on Web, iOS, and Android. All components must be fully accessible, performant, and themeable.

## Platform Requirements
- **React Native**: 0.72+ with New Architecture support
- **Tamagui**: Latest version for cross-platform UI
- **Platforms**: iOS 13+, Android 5.0+, Modern Web Browsers
- **Accessibility**: WCAG AA compliant, VoiceOver/TalkBack support

## Project Structure
\`\`\`
src/
├── design-system/
│   ├── tamagui.config.ts       # Main Tamagui configuration
│   ├── tokens/
│   │   ├── colors.ts            # Color tokens
│   │   ├── typography.ts        # Typography tokens  
│   │   ├── spacing.ts           # Spacing tokens
│   │   └── index.ts             # Export all tokens
│   ├── themes/
│   │   ├── light.ts             # Light theme
│   │   ├── dark.ts              # Dark theme
│   │   └── index.ts             # Theme provider
│   └── components/
│       ├── primitives/          # Base components
│       └── composed/            # Complex components
\`\`\`

## Design Tokens Configuration

### Typography System
\`\`\`typescript
// Primary Font: ${primaryFontName} (Body text, UI elements)
// Display Font: ${displayFontName} (Headings, emphasis)
// Scale: ${selectedScale}

export const fonts = {
  body: createFont({
    family: Platform.select({
      ios: '${primaryFontName}',
      android: '${primaryFontName}',
      default: 'var(--font-primary)',
    }),
    size: {
      1: ${typographyStyles.caption.size},
      2: ${typographyStyles.body.size},
      3: ${typographyStyles.subhead.size},
      4: ${typographyStyles.h2.size},
      5: ${typographyStyles.h1.size},
      6: ${typographyStyles.display.size},
    },
    lineHeight: {
      1: ${typographyStyles.caption.line},
      2: ${typographyStyles.body.line},
      3: ${typographyStyles.subhead.line},
      4: ${typographyStyles.h2.line},
      5: ${typographyStyles.h1.line},
      6: ${typographyStyles.display.line},
    },
    weight: {
      4: '${typographyStyles.body.weight}',
      6: '${typographyStyles.subhead.weight}',
      7: '${typographyStyles.h1.weight}',
    },
  }),
  heading: createFont({
    family: Platform.select({
      ios: '${displayFontName}',
      android: '${displayFontName}',
      default: 'var(--font-display)',
    }),
    // Same size/lineHeight/weight as body
  }),
};
\`\`\`

### Color Tokens
\`\`\`typescript
export const colors = {
  // Brand Colors
  brand: '${colorRoles['brand-primary']}',
  brandWeak: lighten('${colorRoles['brand-primary']}', 0.4),
  brandStrong: darken('${colorRoles['brand-primary']}', 0.2),
  brandAccent: '${colorRoles['brand-accent']}',

  // Text Colors
  textPrimary: '${colorRoles['text-primary']}',
  textSecondary: '${colorRoles['text-secondary']}',
  textDisabled: '${colorRoles['text-disabled']}',
  textInverse: isDark ? '#000000' : '#FFFFFF',

  // Background Colors
  bgPrimary: '${colorRoles['bg-primary']}',
  bgSecondary: '${colorRoles['bg-secondary']}',
  bgTertiary: isDark ? '#2A2A2A' : '#F5F5F5',

  // Semantic Colors
  success: '${colorRoles.success}',
  warning: '${colorRoles.warning}',
  info: '${colorRoles.info}',
  danger: '${colorRoles.danger}',

  // Border & Focus
  border: '${colorRoles.border}',
  focus: '${colorRoles.focus}',
};
\`\`\`

### Spacing & Layout
\`\`\`typescript
export const space = {
  ${spacingScale.split(', ').map(s => {
    const [key, value] = s.split(': ');
    const num = key.replace('space-', '');
    return `${num}: ${value}`;
  }).join(',\n  ')},
};

export const radius = {
  ${radii.split(', ').map(r => {
    const [key, value] = r.split(': ');
    const num = key === 'sm' ? '1' : key === 'md' ? '2' : key === 'lg' ? '3' : '4';
    return `${num}: ${value}`;
  }).join(',\n  ')},
};
\`\`\`

## Core Component Library

### Button Component
\`\`\`typescript
import { styled, Button as TamaguiButton } from 'tamagui';

export const Button = styled(TamaguiButton, {
  name: 'Button',
  backgroundColor: '$brand',
  color: 'white',
  fontSize: '$3',
  paddingHorizontal: '$4',
  paddingVertical: '$3',
  borderRadius: '$2',
  
  pressStyle: {
    opacity: 0.8,
    scale: 0.98,
  },
  
  hoverStyle: {
    opacity: 0.9,
  },
  
  focusStyle: {
    borderWidth: 2,
    borderColor: '$focus',
  },
  
  variants: {
    variant: {
      primary: {
        backgroundColor: '$brand',
        color: 'white',
      },
      secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$brand',
        color: '$brand',
      },
      tertiary: {
        backgroundColor: 'transparent',
        color: '$brand',
      },
      destructive: {
        backgroundColor: '$danger',
        color: 'white',
      },
    },
    size: {
      small: {
        fontSize: '$2',
        paddingHorizontal: '$3',
        paddingVertical: '$2',
      },
      medium: {
        fontSize: '$3',
        paddingHorizontal: '$4',
        paddingVertical: '$3',
      },
      large: {
        fontSize: '$4',
        paddingHorizontal: '$5',
        paddingVertical: '$4',
      },
    },
  },
  
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});
\`\`\`

### Input Component
\`\`\`typescript
export const Input = styled(TamaguiInput, {
  backgroundColor: '$bgSecondary',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$2',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  fontSize: '$3',
  color: '$textPrimary',
  placeholderTextColor: '$textDisabled',
  
  focusStyle: {
    borderColor: '$focus',
    borderWidth: 2,
  },
});
\`\`\`

### Card Component
\`\`\`typescript
export const Card = styled(TamaguiCard, {
  backgroundColor: '$bgSecondary',
  borderRadius: '$3',
  padding: '$4',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
  
  variants: {
    elevated: {
      true: {
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
      },
    },
  },
});
\`\`\`

## Navigation Components

### Bottom Tab Bar
\`\`\`typescript
export const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <XStack
      backgroundColor="$bgSecondary"
      borderTopWidth={1}
      borderTopColor="$border"
      paddingBottom={Platform.OS === 'ios' ? '$4' : '$2'}
      paddingTop="$2"
      justifyContent="space-around"
    >
      {state.routes.map((route, index) => (
        <TabButton
          key={route.key}
          active={state.index === index}
          onPress={() => navigation.navigate(route.name)}
          icon={descriptors[route.key].options.tabBarIcon}
          label={route.name}
        />
      ))}
    </XStack>
  );
};
\`\`\`

## Form Controls

### Switch Component
\`\`\`typescript
export const Switch = styled(TamaguiSwitch, {
  size: '$4',
  backgroundColor: '$border',
  
  checked: {
    backgroundColor: '$brand',
  },
  
  '& > span': {
    backgroundColor: 'white',
  },
});
\`\`\`

### Checkbox Component
\`\`\`typescript
export const Checkbox = styled(TamaguiCheckbox, {
  size: '$3',
  borderRadius: '$1',
  borderWidth: 2,
  borderColor: '$border',
  
  checked: {
    backgroundColor: '$brand',
    borderColor: '$brand',
  },
});
\`\`\`

## Theme Configuration

### Light Theme
\`\`\`typescript
export const lightTheme = {
  ...lightColors,
  background: colors.bgPrimary,
  backgroundStrong: colors.bgSecondary,
  color: colors.textPrimary,
  colorHover: colors.textSecondary,
  borderColor: colors.border,
  brand: colors.brand,
};
\`\`\`

### Dark Theme
\`\`\`typescript
export const darkTheme = {
  ...darkColors,
  background: colors.bgPrimary,
  backgroundStrong: colors.bgSecondary,
  color: colors.textPrimary,
  colorHover: colors.textSecondary,
  borderColor: colors.border,
  brand: colors.brand,
};
\`\`\`

## App Entry Point
\`\`\`typescript
import { TamaguiProvider } from 'tamagui';
import config from './design-system/tamagui.config';

export default function App() {
  const colorScheme = useColorScheme();
  
  return (
    <TamaguiProvider 
      config={config} 
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
    >
      <NavigationContainer>
        <Stack.Navigator>
          {/* Your screens */}
        </Stack.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
}
\`\`\`

## Platform-Specific Adjustments

### iOS Specific
\`\`\`typescript
const iosStyles = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
\`\`\`

### Android Specific
\`\`\`typescript
const androidStyles = Platform.select({
  android: {
    elevation: 3,
  },
});
\`\`\`

### Web Specific
\`\`\`typescript
const webStyles = Platform.select({
  web: {
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all 0.2s ease',
  },
});
\`\`\`

## Animation Configuration
\`\`\`typescript
export const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
});
\`\`\`

## Accessibility Implementation
- All interactive elements have minimum 44x44 touch targets
- Proper accessibility labels and hints
- Screen reader support with semantic HTML on web
- VoiceOver (iOS) and TalkBack (Android) optimized
- Keyboard navigation support on web
- Focus indicators meeting WCAG AA standards
- Color contrast ratios ≥ 4.5:1 for text

## Performance Optimization
- Use React.memo for expensive components
- Implement FlatList for long scrollable content
- Lazy load screens with React.lazy
- Image optimization with FastImage
- Minimize re-renders with proper state management
- Use InteractionManager for heavy computations

## Testing Requirements
- Unit tests with Jest and React Native Testing Library
- E2E tests with Detox (mobile) or Playwright (web)
- Accessibility testing with react-native-accessibility-checker
- Visual regression tests with Percy or Chromatic
- Performance monitoring with Flipper

## Build & Deployment
\`\`\`json
// package.json scripts
{
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "web": "expo start --web",
    "test": "jest",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  }
}
\`\`\`

## Required Dependencies
\`\`\`json
{
  "dependencies": {
    "react-native": "0.72.x",
    "@tamagui/core": "latest",
    "@tamagui/animations-react-native": "latest",
    "@tamagui/font-inter": "latest",
    "@tamagui/themes": "latest",
    "react-native-safe-area-context": "latest",
    "react-native-screens": "latest",
    "@react-navigation/native": "latest",
    "@react-navigation/bottom-tabs": "latest"
  }
}
\`\`\`

## IMPORTANT NOTES
- All colors must be tokenized - no hardcoded values
- Components must work identically on all three platforms
- Theme switching must be instant without reload
- Typography must respect system font scaling
- All animations must respect prefers-reduced-motion
- Components must be tree-shakeable for optimal bundle size

---
Generated for ${themeModes} mode with ${densityModes} support
Primary Font: ${primaryFontName} | Display Font: ${displayFontName}
`;
  };

  const generatePrompt = () => {
    const primaryFontName = fonts.find(f => f.class === selectedPrimaryFont)?.name || 'Plus Jakarta Sans';
    const displayFontName = fonts.find(f => f.class === selectedDisplayFont)?.name || 'Plus Jakarta Sans';
    const colorThemes = {
      custom: customPrimaryColor,
      turquoise: '#1abc9c',
      emerald: '#2ecc71',
      'peter-river': '#3498db',
      amethyst: '#9b59b6',
      'wet-asphalt': '#34495e',
      'sun-flower': '#f1c40f',
      carrot: '#e67e22',
      alizarin: '#e74c3c',
      concrete: '#95a5a6',
      orange: '#f39c12',
      pumpkin: '#d35400',
      pomegranate: '#c0392b',
      nephritis: '#27ae60',
      'belize-hole': '#2980b9',
      wisteria: '#8e44ad',
      'midnight-blue': '#2c3e50',
      asbestos: '#7f8c8d'
    };

    const scaleSpecs = {
      small: {
        fontDisplay: '700 48px/56px',
        fontH1: '700 24px/30px',
        fontH2: '600 20px/26px',
        fontSubhead: '600 16px/22px',
        fontBody: '400 14px/20px',
        fontCaption: '400 12px/16px',
        fontButtonText: '600 18px/26px',
        fontBadge: '500 11px/14px'
      },
      regular: {
        fontDisplay: '700 48px/56px',
        fontH1: '700 28px/38px',
        fontH2: '600 22px/30px',
        fontSubhead: '600 18px/26px',
        fontBody: '400 16px/24px',
        fontCaption: '400 14px/20px',
        fontButtonText: '600 18px/26px',
        fontBadge: '500 12px/16px'
      },
      large: {
        fontDisplay: '700 48px/56px',
        fontH1: '700 36px/44px',
        fontH2: '600 24px/32px',
        fontSubhead: '600 21px/30px',
        fontBody: '400 18px/26px',
        fontCaption: '400 15px/22px',
        fontButtonText: '600 18px/26px',
        fontBadge: '500 13px/18px'
      }
    };

    const currentScale = scaleSpecs[selectedScale as keyof typeof scaleSpecs];
    const primaryColor = colorThemes[selectedTheme as keyof typeof colorThemes];

    // Parse typography values
    const typographyStyles = {
      display: parseTypographyValue(currentScale.fontDisplay),
      h1: parseTypographyValue(currentScale.fontH1),
      h2: parseTypographyValue(currentScale.fontH2),
      subhead: parseTypographyValue(currentScale.fontSubhead),
      body: parseTypographyValue(currentScale.fontBody),
      caption: parseTypographyValue(currentScale.fontCaption),
      buttonText: parseTypographyValue(currentScale.fontButtonText),
      badge: parseTypographyValue(currentScale.fontBadge)
    };

    // Get accent color based on selected accent color
    const getAccentColor = () => {
      const accentMap = {
        custom: customAccentColor,
        turquoise: '#1abc9c',
        emerald: '#2ecc71',
        'peter-river': '#3498db',
        amethyst: '#9b59b6',
        'wet-asphalt': '#34495e',
        'sun-flower': '#f1c40f',
        carrot: '#e67e22',
        alizarin: '#e74c3c',
        concrete: '#95a5a6',
        orange: '#f39c12',
        pumpkin: '#d35400',
        pomegranate: '#c0392b',
        nephritis: '#27ae60',
        'belize-hole': '#2980b9',
        wisteria: '#8e44ad',
        'midnight-blue': '#2c3e50',
        asbestos: '#7f8c8d'
      };
      return accentMap[selectedAccentColor as keyof typeof accentMap] || '#1abc9c';
    };

    const accentColor = getAccentColor();

    // Define color roles based on theme and new token system
    const colorRoles = {
      'text-primary': isDarkMode ? '#E1E1E1' : '#1A1A1A',
      'text-secondary': isDarkMode ? '#A8A8A8' : '#6C7588',
      'text-disabled': isDarkMode ? '#666666' : '#A1A1A1',
      'bg-primary': isDarkMode ? '#121212' : '#F8F9FA',
      'bg-secondary': isDarkMode ? '#1E1E1E' : '#FFFFFF',
      'border': isDarkMode ? '#2C2C2C' : '#E5E7EB',
      'brand-primary': primaryColor,
      'brand-secondary': '#E8EBFF',
      'brand-accent': accentColor,
      'success': '#22c55e',
      'warning': '#f59e0b',
      'info': '#3b82f6',
      'danger': '#f44444',
      'focus': '#0066CC'
    };

    // Define other token systems
    const spacingScale = 'space-1: 4px, space-2: 8px, space-3: 12px, space-4: 16px, space-5: 20px, space-6: 24px, space-8: 32px, space-10: 40px, space-12: 48px, space-16: 64px';
    const radii = `sm: ${tokens.radius.sm}, md: ${tokens.radius.md}, lg: ${tokens.radius.lg}, full: ${tokens.radius.full}`;
    const shadows = 'level-1: subtle (cards, inputs), level-2: medium (dropdowns, popovers), level-3: strong (modals, drawers)';
    const motion = 'duration-fast: 150ms, duration-medium: 300ms, duration-slow: 500ms, easing-ease-out: cubic-bezier(0, 0, 0.2, 1), easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)';
    const themeModes = isDarkMode ? 'Dark' : 'Light';
    const densityModes = 'Comfortable, Compact';

    return getTamaguiMegaprompt(
      primaryFontName,
      displayFontName,
      selectedScale,
      typographyStyles,
      colorRoles,
      spacingScale,
      radii,
      shadows,
      motion,
      themeModes,
      densityModes
    );
  };

  const copyToClipboard = async () => {
    try {
      const prompt = generatePrompt();
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "Prompt copied!",
        description: "The design system prompt has been copied to your clipboard.",
      });
      setIsDialogOpen(false);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the prompt to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleCopyPromptClick = () => {
    setIsDialogOpen(true);
  };

  const [rightPanelView, setRightPanelView] = useState<'tamagui' | 'tokens'>('tokens');

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <div className="min-w-[280px] flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header with Copy Prompt Button */}
        <header className="border-b border-border p-4 flex justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleCopyPromptClick} 
                className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
              >
                <Copy className="h-4 w-4" />
                Generate Megaprompt
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>React Native Design System Megaprompt</DialogTitle>
                <DialogDescription>
                  Generate a complete React Native design system with Tamagui for cross-platform apps
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  className="min-h-[400px] font-mono text-sm resize-none"
                  value={generatePrompt()}
                  readOnly
                />
                <div className="flex justify-end">
                  <Button onClick={copyToClipboard} className="gap-2">
                    <Copy className="h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        {/* Preview Panels */}
        <div className="flex-1 flex min-w-0">
          {/* Mobile App Preview */}
          <div className="flex-1 min-w-[400px] border-r border-border">
            <PreviewPhoneTamagui />
          </div>

          {/* Right Panel - Tailwind Components or Design Tokens */}
          <div className="flex-1 min-w-[300px] flex flex-col">
            {/* Toggle Buttons */}
            <div className="border-b border-border p-4 flex gap-2">
              <button
                onClick={() => setRightPanelView('tokens')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  rightPanelView === 'tokens'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <Layers3 size={16} />
                Design Tokens
              </button>
              <button
                onClick={() => setRightPanelView('tamagui')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  rightPanelView === 'tamagui'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <Palette size={16} />
                React Native Components
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {rightPanelView === 'tamagui' ? (
                <TamaguiShowcase />
              ) : (
                <DesignSystemOverview />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;