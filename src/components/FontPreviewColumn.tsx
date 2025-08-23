import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FontPreviewColumnProps {
  fontName: string;
  fontClass: string;
}

const sampleParagraph = "Typography is the art and technique of arranging type to make written language legible, readable, and visually appealing. Good typography enhances the user experience by establishing clear hierarchy, improving readability, and creating emotional connection through careful selection of typefaces, spacing, and layout principles.";

export function FontPreviewColumn({ fontName, fontClass }: FontPreviewColumnProps) {
  return (
    <Card className="p-6">
      {/* Font Name Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-heading-2 font-bold text-primary">{fontName}</h2>
        <p className="text-subhead-regular text-muted-foreground">Font preview</p>
      </div>

      {/* Typography Styles - Horizontal Layout */}
      <div className={`flex gap-8 min-w-max ${fontClass}`}>
        
        {/* Display Large */}
        <div className="flex-shrink-0 w-80">
          <p className="text-footnote text-muted-foreground mb-2">Display-Large • 34pt • Bold • 40pt line height</p>
          <h1 className="text-display-large">Creative Design</h1>
        </div>

        {/* Display Medium */}
        <div className="flex-shrink-0 w-64">
          <p className="text-footnote text-muted-foreground mb-2">Display-Medium • 28pt • Bold • 34pt line height</p>
          <h2 className="text-display-medium">Section Title</h2>
        </div>

        {/* Heading 1 */}
        <div className="flex-shrink-0 w-64">
          <p className="text-footnote text-muted-foreground mb-2">Heading-1 • 22pt • Bold • 28pt line height</p>
          <h3 className="text-heading-1">Modal or Card Title</h3>
        </div>

        {/* Heading 2 */}
        <div className="flex-shrink-0 w-64">
          <p className="text-footnote text-muted-foreground mb-2">Heading-2 • 17pt • Semibold • 22pt line height</p>
          <h4 className="text-heading-2">Content Block Subheading</h4>
        </div>

        {/* Body Regular */}
        <div className="flex-shrink-0 w-96">
          <p className="text-footnote text-muted-foreground mb-2">Body-Regular • 17pt • Regular • 24pt line height</p>
          <p className="text-body-regular">{sampleParagraph}</p>
        </div>

        {/* Body Bold */}
        <div className="flex-shrink-0 w-80">
          <p className="text-footnote text-muted-foreground mb-2">Body-Bold • 17pt • Bold • 24pt line height</p>
          <p className="text-body-bold">This is emphasized text within a paragraph for important information.</p>
        </div>

        {/* Subhead Regular */}
        <div className="flex-shrink-0 w-64">
          <p className="text-footnote text-muted-foreground mb-2">Subhead-Regular • 15pt • Regular • 20pt line height</p>
          <p className="text-subhead-regular">Secondary information and image captions go here.</p>
        </div>

        {/* Subhead Bold */}
        <div className="flex-shrink-0 w-48">
          <p className="text-footnote text-muted-foreground mb-2">Subhead-Bold • 15pt • Semibold • 20pt line height</p>
          <p className="text-subhead-bold">Form Field Label</p>
        </div>

        {/* Footnote */}
        <div className="flex-shrink-0 w-64">
          <p className="text-footnote text-muted-foreground mb-2">Footnote • 13pt • Regular • 18pt line height</p>
          <p className="text-footnote">Tertiary information, helper text, and legal copy.</p>
        </div>

        {/* Button Text */}
        <div className="flex-shrink-0 w-80">
          <p className="text-footnote text-muted-foreground mb-2">Button • 17pt • Semibold • 22pt line height</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="default" className="text-button">
              Primary Button
            </Button>
            <Button variant="secondary" className="text-button">
              Secondary Button
            </Button>
            <Button variant="outline" className="text-button">
              Tertiary Button
            </Button>
            <Button variant="destructive" className="text-button">
              Destructive Button
            </Button>
          </div>
        </div>

        {/* Button States */}
        <div className="flex-shrink-0 w-96">
          <p className="text-footnote text-muted-foreground mb-3">Button States</p>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <Button variant="default" className="text-button">Default</Button>
              <Button variant="default" className="text-button hover:bg-primary-hover">Hover</Button>
              <Button variant="default" className="text-button focus:ring-2 focus:ring-ring">Focused</Button>
              <Button variant="default" className="text-button bg-primary-pressed">Pressed</Button>
              <Button variant="default" className="text-button" disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}