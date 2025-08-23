import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FontPreviewColumnProps {
  fontName: string;
  fontClass: string;
}

const sampleParagraph = "Typography is the art and technique of arranging type to make written language legible, readable, and visually appealing. Good typography enhances the user experience by establishing clear hierarchy, improving readability, and creating emotional connection through careful selection of typefaces, spacing, and layout principles.";

export function FontPreviewColumn({ fontName, fontClass }: FontPreviewColumnProps) {
  return (
    <Card className="p-6 overflow-x-auto">
      {/* Font Name Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-heading-2 font-semibold text-foreground">{fontName}</h2>
        <p className="text-caption text-secondary">Font preview</p>
      </div>

      {/* Typography Styles - Horizontal Layout */}
      <div className={`flex gap-8 min-w-max ${fontClass}`}>
        
        {/* Headings Cell with Eyebrow */}
        <div className="flex-shrink-0 w-80">
          <p className="text-eyebrow text-secondary mb-4">Headings</p>
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