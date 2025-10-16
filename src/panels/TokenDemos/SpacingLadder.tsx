import React from 'react';
import { useDesignSystem } from '../../state/designSystem';
import './SpacingLadder.css';

export default function SpacingLadder() {
  const { tokens } = useDesignSystem();

  return (
    <div className="spacing-ladder">
      {tokens.space.map((space, index) => (
        <div key={index} className="spacing-item">
          <div
            className="spacing-block"
            style={{ width: `${space}px` }}
          />
          <div className="spacing-label">
            {space}px
          </div>
        </div>
      ))}
    </div>
  );
}