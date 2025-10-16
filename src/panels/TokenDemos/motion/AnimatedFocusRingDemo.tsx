import React from 'react';
import './AnimatedFocusRingDemo.css';

export default function AnimatedFocusRingDemo() {
  return (
    <div className="motion-demo-card">
      <h4 className="motion-demo-title">Focus Ring</h4>
      <p className="motion-demo-subtitle">
        Tokenized, animated focus outline with hover/press ramps. Meets 2px minimum rule.
      </p>
      <div className="focus-ring-row">
        <button className="focus-ring-btn">Focusable</button>
        <button className="focus-ring-btn destructive" aria-label="Delete">
          Destructive
        </button>
      </div>
      <div className="motion-token-row">
        <code>--color-focus</code> • <code>--motion-fast</code>
      </div>
    </div>
  );
}