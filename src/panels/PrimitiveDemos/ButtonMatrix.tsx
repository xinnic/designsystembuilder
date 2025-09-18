import React from 'react';
import './ButtonMatrix.css';

type Variant = 'primary' | 'secondary' | 'destructive';
const variants: Variant[] = ['primary', 'secondary', 'destructive'];
const states = ['Default', 'Hover', 'Pressed', 'Focus', 'Disabled'] as const;

export default function ButtonMatrix() {
  return (
    <div className="btn-matrix">
      {variants.map(v => (
        <div key={v} className="btn-col">
          <div className="col-title">{v}</div>
          {states.map(s => (
            <button
              key={s}
              className={`btn ${v} ${s.toLowerCase()}`}
              disabled={s === 'Disabled'}
            >
              {s}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}