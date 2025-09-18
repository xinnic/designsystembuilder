import React from 'react';
import { useDesignSystem } from '../../state/designSystem';
import './TypeScaleTable.css';

export default function TypeScaleTable() {
  const { tokens } = useDesignSystem();

  const typeStyles = [
    { name: 'Display', token: tokens.displayLg, sample: 'Design System' },
    { name: 'H1', token: tokens.h1, sample: 'Main Heading' },
    { name: 'H2', token: tokens.h2, sample: 'Section Title' },
    { name: 'Subhead', token: tokens.subhead, sample: 'Subheading' },
    { name: 'Body', token: tokens.body, sample: 'Body text content' },
    { name: 'Caption', token: tokens.caption, sample: 'Caption' },
    { name: 'Button', token: tokens.button, sample: 'Button Text' },
    { name: 'Label', token: tokens.eyebrow, sample: 'Supporting text' }
  ];

  return (
    <div className="type-scale-table">
      {typeStyles.map((style) => (
        <div key={style.name} className="type-row">
          <div
            className="type-sample"
            style={{
              fontFamily: tokens.fontFamily,
              fontSize: style.token.size,
              lineHeight: style.token.line,
              fontWeight: style.token.weight,
              letterSpacing: 'track' in style.token ? style.token.track : 'normal',
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