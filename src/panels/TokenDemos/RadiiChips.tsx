import React from 'react';
import { useDesignSystem } from '../../state/designSystem';
import './RadiiChips.css';

export default function RadiiChips() {
  const { tokens } = useDesignSystem();

  const radiiInfo = [
    { name: 'sm', value: tokens.radius.sm, usage: 'Inputs' },
    { name: 'md', value: tokens.radius.md, usage: 'Cards' },
    { name: 'lg', value: tokens.radius.lg, usage: 'Modals' },
    { name: 'full', value: tokens.radius.full, usage: 'Pills' }
  ];

  return (
    <div className="radii-grid">
      {radiiInfo.map((radius) => (
        <div key={radius.name} className="radii-item">
          <div
            className="radii-chip"
            style={{ borderRadius: radius.value }}
          />
          <div className="radii-info">
            <div className="radii-name">{radius.name}</div>
            <div className="radii-usage">{radius.usage}</div>
          </div>
        </div>
      ))}
    </div>
  );
}