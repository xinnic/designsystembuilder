import React from 'react';
import { useDesignSystem } from '../../state/designSystem';
import './TypeScaleTable.css';

export default function TypeScaleTable() {
  const { tokens } = useDesignSystem();

  const typeStyles = [
    { name: 'Display', token: tokens.displayLg, sample: 'Design System', useDisplayFont: true },
    { name: 'H1', token: tokens.h1, sample: 'Main Heading', useDisplayFont: true },
    { name: 'H2', token: tokens.h2, sample: 'Section Title', useDisplayFont: true },
    { name: 'Subhead', token: tokens.subhead, sample: 'Subheading', useDisplayFont: true },
    { name: 'Body', token: tokens.body, sample: 'Body text content', useDisplayFont: false },
    { name: 'Caption', token: tokens.caption, sample: 'Caption', useDisplayFont: false },
    { name: 'Button', token: tokens.button, sample: 'Button Text', useDisplayFont: false },
    { name: 'Label', token: tokens.eyebrow, sample: 'Supporting text', useDisplayFont: false }
  ];

  return (
    <div className="type-scale-table">
      {typeStyles.map((style) => (
        <div key={style.name} className="type-row">
          <div
            className="type-sample"
            style={{
              fontFamily: style.useDisplayFont ? 'var(--font-display)' : tokens.fontFamily,
              fontSize: style.token.size,
              lineHeight: style.token.line,
              fontWeight: style.token.weight,
              letterSpacing: ('track' in style.token ? style.token.track : 'normal') as string,
              textTransform: 'uppercase' in style.token && style.token.uppercase ? 'uppercase' : 'none'
            }}
          >
            {style.sample}
          </div>
          <div className="type-meta">
            <div className="type-name">{style.name}</div>
            <div className="type-specs">
              {style.token.size} / {style.token.line} @ {style.token.weight}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}