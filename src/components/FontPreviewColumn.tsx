import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface FontPreviewColumnProps {
  fontName: string;
  fontClass: string;
  selectedTheme: string;
  isDarkMode: boolean;
  selectedScale: string;
}

const sampleParagraph = "Typography is the art and technique of arranging type to make written language legible, readable, and visually appealing. Good typography enhances the user experience by establishing clear hierarchy, improving readability, and creating emotional connection through careful selection of typefaces, spacing, and layout principles.";

export function FontPreviewColumn({ fontName, fontClass, selectedTheme, isDarkMode, selectedScale }: FontPreviewColumnProps) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const generatePrompt = () => {
    const themeColors = {
      blue: { light: '#1976D2', dark: '#90CAF9' },
      purple: { light: '#7B1FA2', dark: '#B39DDB' },
      pink: { light: '#C2185B', dark: '#F48FB1' },
      red: { light: '#D32F2F', dark: '#EF9A9A' },
      yellow: { light: '#FBC02D', dark: '#FFF59D' },
      orange: { light: '#F57C00', dark: '#FFCC80' },
      teal: { light: '#00796B', dark: '#80CBC4' },
    };

    const scales = {
      small: {
        displayLarge: { size: '36px', lineHeight: '44px', weight: '700' },
        displayMed: { size: '30px', lineHeight: '36px', weight: '700' },
        heading1: { size: '24px', lineHeight: '30px', weight: '700' },
        heading2: { size: '20px', lineHeight: '26px', weight: '600' },
        subhead: { size: '16px', lineHeight: '22px', weight: '600' },
        body: { size: '14px', lineHeight: '20px', weight: '400' },
        eyebrow: { size: '11px', lineHeight: '14px', weight: '500', letterSpacing: '0.05em' },
        caption: { size: '12px', lineHeight: '16px', weight: '400' },
        button: { size: '16px', lineHeight: '22px', weight: '600', letterSpacing: '0.02em' },
      },
      regular: {
        displayLarge: { size: '48px', lineHeight: '56px', weight: '700' },
        displayMed: { size: '36px', lineHeight: '44px', weight: '700' },
        heading1: { size: '28px', lineHeight: '38px', weight: '700' },
        heading2: { size: '22px', lineHeight: '30px', weight: '600' },
        subhead: { size: '18px', lineHeight: '26px', weight: '600' },
        body: { size: '16px', lineHeight: '24px', weight: '400' },
        eyebrow: { size: '12px', lineHeight: '16px', weight: '500', letterSpacing: '0.05em' },
        caption: { size: '14px', lineHeight: '20px', weight: '400' },
        button: { size: '18px', lineHeight: '26px', weight: '600', letterSpacing: '0.02em' },
      },
      large: {
        displayLarge: { size: '60px', lineHeight: '68px', weight: '700' },
        displayMed: { size: '48px', lineHeight: '56px', weight: '700' },
        heading1: { size: '36px', lineHeight: '44px', weight: '700' },
        heading2: { size: '24px', lineHeight: '32px', weight: '600' },
        subhead: { size: '21px', lineHeight: '30px', weight: '600' },
        body: { size: '18px', lineHeight: '26px', weight: '400' },
        eyebrow: { size: '13px', lineHeight: '18px', weight: '500', letterSpacing: '0.05em' },
        caption: { size: '15px', lineHeight: '22px', weight: '400' },
        button: { size: '20px', lineHeight: '28px', weight: '600', letterSpacing: '0.02em' },
      },
    };

    const currentColor = themeColors[selectedTheme as keyof typeof themeColors];
    const currentScale = scales[selectedScale as keyof typeof scales];
    const buttonColor = isDarkMode ? currentColor.dark : currentColor.light;
    const buttonTextColor = isDarkMode ? '#000000' : '#FFFFFF';
    const textPrimary = isDarkMode ? '#E1E1E1' : '#1C1C1E';
    const textSecondary = isDarkMode ? '#A8A8A8' : '#636366';
    const backgroundPrimary = isDarkMode ? '#121212' : '#FFFFFF';
    const backgroundSecondary = isDarkMode ? '#1E1E1E' : '#F2F2F7';

    return `Create a design system using ${fontName} font with ${selectedScale.toUpperCase()} typographic scale:

TYPOGRAPHY SYSTEM (${selectedScale.toUpperCase()} SCALE):
- Font Family: ${fontName}
- Eyebrow Text: ${currentScale.eyebrow.size}, ${currentScale.eyebrow.weight} weight, uppercase, ${currentScale.eyebrow.letterSpacing} letter-spacing, ${currentScale.eyebrow.lineHeight} line-height
- Heading 1: ${currentScale.heading1.size}, ${currentScale.heading1.weight} weight, ${currentScale.heading1.lineHeight} line-height
- Heading 2: ${currentScale.heading2.size}, ${currentScale.heading2.weight} weight, ${currentScale.heading2.lineHeight} line-height
- Subhead: ${currentScale.subhead.size}, ${currentScale.subhead.weight} weight, ${currentScale.subhead.lineHeight} line-height
- Body Regular: ${currentScale.body.size}, ${currentScale.body.weight} weight, ${currentScale.body.lineHeight} line-height
- Button Text: ${currentScale.button.size}, ${currentScale.button.weight} weight, ${currentScale.button.lineHeight} line-height, ${currentScale.button.letterSpacing} letter-spacing
- Caption: ${currentScale.caption.size}, ${currentScale.caption.weight} weight, ${currentScale.caption.lineHeight} line-height
- Display Large: ${currentScale.displayLarge.size}, ${currentScale.displayLarge.weight} weight, ${currentScale.displayLarge.lineHeight} line-height
- Display Medium: ${currentScale.displayMed.size}, ${currentScale.displayMed.weight} weight, ${currentScale.displayMed.lineHeight} line-height

COLOR SYSTEM (${isDarkMode ? 'Dark' : 'Light'} Mode):
- Primary Text: ${textPrimary}
- Secondary Text: ${textSecondary}
- Primary Background: ${backgroundPrimary}
- Secondary Background: ${backgroundSecondary}
- Brand/Button Color: ${buttonColor}
- Button Text Color: ${buttonTextColor}
- Border Color: ${isDarkMode ? '#2C2C2C' : '#C6C6C8'}

BUTTON SPECIFICATIONS:
- Background: ${buttonColor}
- Text: ${buttonTextColor}
- Height: 40px
- Border Radius: Full rounded
- Font: ${currentScale.button.size}, ${currentScale.button.weight} weight
- Padding: 16px horizontal, 8px vertical
- Hover: Slightly darker shade of button color
- Active/Pressed: Even darker shade of button color

COMPONENT VARIANTS:
- Default: Filled button with brand color background
- Outline: Transparent background with brand color border and text
- Ghost: Transparent background with brand color text
- Secondary: Same as outline variant
- Destructive: Red background for destructive actions

DESIGN BEST PRACTICES:

Spacing, Grid, & Elevation:
- Use a soft 8pt grid system for all spacing and padding (8, 16, 24, 32, etc.)
- This creates rhythm and polish throughout the interface

Buttons:
- Clear visual distinction between primary, secondary, and tertiary buttons
- Destructive actions styled with semantic destructive color and careful placement
- Minimum tap target size of 44x44 points for touch accessibility

Input Fields:
- Generous spacing with clear, persistent labels above the field
- Optional helper text below for context
- Clear visual states for focused, error, and disabled states

Dialogs and Modals:
- Modals for self-contained tasks, dialogs for critical confirmations
- Clear, direct language in user vocabulary (not technical jargon)
- Explain situation, consequences, and provide actionable choices

Corner Radius System (4px base unit):
- radius-sm (8px): Small interactive elements like tags, input fields
- radius-md (16px): Default for primary cards, activity cards, media containers
- radius-lg (24px): Large containers or modals sitting on top of content
- radius-full (999px): Circular or pill-shaped elements like avatars, toggles

Elevation System:
- Level 0 (none): Elements flush with background
- Level 1 (0px 2px 4px rgba(0,0,0,0.05)): Subtle lift for static cards
- Level 2 (0px 4px 12px rgba(0,0,0,0.1)): Default interactive elements
- Level 3 (0px 8px 24px rgba(0,0,0,0.15)): Emphasized elements like modals

Please implement this design system with semantic CSS custom properties and ensure proper contrast ratios for accessibility.`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatePrompt());
      toast({
        title: "Copied to clipboard",
        description: "Design system prompt has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please select and copy the text manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={`p-6 scale-${selectedScale}`}>
      {/* Font Name Header */}
      <div className="border-b pb-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className={`text-heading-2 font-semibold text-foreground ${fontClass}`}>{fontName}</h2>
          <div className="w-px h-6 bg-border"></div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground">
                <Sparkles className="w-3 h-3 mr-1" />
                Copy Prompt
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Design System Prompt - {fontName}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Copy this prompt to implement the {fontName} design system:
                  </p>
                  <Button onClick={copyToClipboard} size="sm" variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={generatePrompt()}
                  readOnly
                  className="min-h-[400px] font-mono text-sm"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Typography Styles - Horizontal Layout */}
      <div className={`flex gap-8 min-w-max ${fontClass}`}>
        
        {/* Headings Cell with Eyebrow */}
        <div className="flex-shrink-0 w-80">
          <div className="space-y-4">
            <p className="text-eyebrow text-secondary">Eyebrow Text</p>
            <h1 className="text-heading-1 text-foreground">Heading 1</h1>
            <h2 className="text-heading-2 text-foreground">Heading 2</h2>
            <h3 className="text-subhead text-secondary">Subhead</h3>
          </div>
        </div>

        {/* Body Text Cell */}
        <div className="flex-shrink-0 w-96">
          <p className="text-eyebrow text-secondary mb-2">Body • 14px • Regular • 20px line height</p>
          <p className="text-body-regular text-foreground">
            Typography is the art and technique of arranging type to make written language legible, readable, and visually appealing. <strong>Good typography enhances the user experience</strong> by establishing clear hierarchy, improving readability, and creating emotional connection through careful selection of typefaces, spacing, and layout principles.
          </p>
        </div>

        {/* Display Sizes Cell */}
        <div className="flex-shrink-0 w-80">
          <p className="text-eyebrow text-secondary mb-4">Display Sizes</p>
          <div className="space-y-4">
            <h1 className="text-display-large text-foreground">Large Display</h1>
            <h2 className="text-display-medium text-foreground">Medium Display</h2>
          </div>
        </div>

        {/* Caption */}
        <div className="flex-shrink-0 w-64">
          <p className="text-eyebrow text-secondary mb-2">Caption • 12px • Regular • 16px line height</p>
          <p className="text-caption text-secondary">Tertiary information, helper text, legal copy.</p>
        </div>

        {/* Button Text */}
        <div className="flex-shrink-0 w-80">
          <p className="text-eyebrow text-secondary mb-2">Button • 16px • Semibold</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="default">
              Filled
            </Button>
            <Button variant="secondary">
              Outlined
            </Button>
            <Button variant="ghost">
              Text
            </Button>
            <Button variant="destructive">
              Destructive
            </Button>
          </div>
        </div>

        {/* Button States */}
        <div className="flex-shrink-0 w-96">
          <p className="text-eyebrow text-secondary mb-3">Button States</p>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Default</Button>
              <Button variant="default" className="hover:bg-[hsl(var(--button-bg-hover))]">Hover</Button>
              <Button variant="default" className="focus:ring-2 focus:ring-ring">Focused</Button>
              <Button variant="default" className="bg-[hsl(var(--button-bg-pressed))]">Pressed</Button>
              <Button variant="default" disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}