import React from 'react';
import { useTokenCSS } from '../state/designSystem';
import {
  Type,
  Palette,
  Grid,
  CornerUpRight,
  Layers,
  Play,
  MousePointer,
  SquareCheck,
  CreditCard,
  Menu,
  Sliders,
  Smartphone
} from 'lucide-react';

// Token demos
import ColorSwatch from './TokenDemos/ColorSwatch';
import SpacingLadder from './TokenDemos/SpacingLadder';
import RadiiChips from './TokenDemos/RadiiChips';
import ElevationTiles from './TokenDemos/ElevationTiles';
import EasingCurve from './TokenDemos/motion/EasingCurve';
import CardEntrances from './TokenDemos/motion/CardEntrances';
import './TokenDemos/motion/motion-demos.css';
import TypeScaleTable from './TokenDemos/TypeScaleTable';
import HapticsPreview from './TokenDemos/HapticsPreview';

// Primitive demos
import ButtonMatrix from './PrimitiveDemos/ButtonMatrix';
import InputGallery from './PrimitiveDemos/InputGallery';
import CardGallery from './PrimitiveDemos/CardGallery';
import NavPreview from './PrimitiveDemos/NavPreview';
import FormControls from './PrimitiveDemos/FormControls';

import './DesignSystemOverview.css';

export default function DesignSystemOverview() {
  // Initialize token CSS binding
  useTokenCSS();

  return (
    <div className="design-system-overview">

      {/* TOKENS SECTION */}
      <section className="tokens-section">
        <div className="section-header">
          <h2>Tokens</h2>
          <p>Foundational design elements that define your system's visual language</p>
        </div>

        <div className="token-subsection">
          <div className="subsection-header">
            <div className="subsection-title">
              <Type className="subsection-icon" />
              <h3>Typography Scale</h3>
            </div>
            <p>Type styles that set hierarchy—headlines, body, captions. Change these to give your product a distinct voice.</p>
          </div>
          <TypeScaleTable />
        </div>

        <div className="token-subsection">
          <div className="subsection-header">
            <div className="subsection-title">
              <Palette className="subsection-icon" />
              <h3>Color Roles</h3>
            </div>
            <p>Brand and UI colors used across components. These are semantic—change the role, and the whole system updates.</p>
          </div>
          <ColorSwatch />
        </div>

        <div className="token-subsection">
          <div className="subsection-header">
            <div className="subsection-title">
              <Grid className="subsection-icon" />
              <h3>Spacing Ladder</h3>
            </div>
            <p>Consistent rhythm so screens feel intentional. Based on an 8-pt scale.</p>
          </div>
          <SpacingLadder />
        </div>

        <div className="token-subsection">
          <div className="subsection-header">
            <div className="subsection-title">
              <CornerUpRight className="subsection-icon" />
              <h3>Corner Radii</h3>
            </div>
            <p>How rounded surfaces are. Small for dense controls, medium for cards, large for modals, full for pills.</p>
          </div>
          <RadiiChips />
        </div>

        <div className="token-subsection">
          <div className="subsection-header">
            <div className="subsection-title">
              <Layers className="subsection-icon" />
              <h3>Elevation (Shadows)</h3>
            </div>
            <p>Depth cues. Use subtle for resting cards, medium for interactive popovers, strong for modals.</p>
          </div>
          <ElevationTiles />
        </div>

        <div className="token-subsection">
          <div className="subsection-header">
            <div className="subsection-title">
              <Play className="subsection-icon" />
              <h3>Motion</h3>
            </div>
            <p>How fast and smooth UI moves. All demos use your duration and easing tokens and respect reduced motion.</p>
          </div>
          <div className="motion-demos-grid">
            <EasingCurve />
            <CardEntrances />
          </div>
        </div>


        <div className="token-subsection">
          <div className="subsection-header">
            <div className="subsection-title">
              <Smartphone className="subsection-icon" />
              <h3>Haptics</h3>
            </div>
            <p>Short tactile vibrations that reinforce interactions. Use <strong>light</strong> feedback for low-risk taps (like menu tabs) and <strong>medium</strong> feedback for primary actions (like cards or main buttons). Use <strong>success/error</strong> notifications for confirmations.</p>
          </div>
          <HapticsPreview />
        </div>
      </section>

      {/* PRIMITIVES SECTION */}
      <section className="tokens-section">
        <div className="section-header">
          <h2>Primitives</h2>
          <p>Interactive components built with your tokens—buttons, inputs, cards, and more</p>
        </div>

        <div className="token-subsection">
          <div className="subsection-header">
            <div className="subsection-title">
              <MousePointer className="subsection-icon" />
              <h3>Buttons</h3>
            </div>
            <p>Primary, secondary, and destructive variants with hover and focus states.</p>
          </div>
          <ButtonMatrix />
        </div>

        <div className="token-subsection">
          <div className="subsection-header">
            <div className="subsection-title">
              <SquareCheck className="subsection-icon" />
              <h3>Form Inputs</h3>
            </div>
            <p>Text fields, checkboxes, and selects using your border and spacing tokens.</p>
          </div>
          <InputGallery />
        </div>

        <div className="token-subsection">
          <div className="subsection-header">
            <div className="subsection-title">
              <CreditCard className="subsection-icon" />
              <h3>Cards</h3>
            </div>
            <p>Content containers with consistent radius and elevation patterns.</p>
          </div>
          <CardGallery />
        </div>

        <div className="token-subsection">
          <div className="subsection-header">
            <div className="subsection-title">
              <Menu className="subsection-icon" />
              <h3>Navigation</h3>
            </div>
            <p>Menu and navigation components that adapt to your layout choices.</p>
          </div>
          <NavPreview />
        </div>

        <div className="token-subsection">
          <div className="subsection-header">
            <div className="subsection-title">
              <Sliders className="subsection-icon" />
              <h3>Form Controls</h3>
            </div>
            <p>Switches, sliders, and other interactive form elements.</p>
          </div>
          <FormControls />
        </div>
      </section>

    </div>
  );
}