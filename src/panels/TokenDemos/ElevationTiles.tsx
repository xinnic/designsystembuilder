import React from 'react';
import { useDesignSystem } from '../../state/designSystem';
import './ElevationTiles.css';

export default function ElevationTiles() {
  const { tokens } = useDesignSystem();

  const elevations = [
    { name: 'Level 1', value: tokens.shadow['1'], usage: 'Cards' },
    { name: 'Level 2', value: tokens.shadow['2'], usage: 'Popovers' },
    { name: 'Level 3', value: tokens.shadow['3'], usage: 'Modals' }
  ];

  return (
    <div className="elevation-grid">
      {elevations.map((elevation) => (
        <div key={elevation.name} className="elevation-item">
          <div
            className="elevation-tile"
            style={{ boxShadow: elevation.value }}
          />
          <div className="elevation-info">
            <div className="elevation-name">{elevation.name}</div>
            <div className="elevation-usage">{elevation.usage}</div>
          </div>
        </div>
      ))}
    </div>
  );
}