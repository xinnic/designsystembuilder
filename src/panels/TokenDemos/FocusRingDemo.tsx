import React from 'react';
import './FocusRingDemo.css';

export default function FocusRingDemo() {
  return (
    <div className="focus-demo">
      <button className="focus-demo-button">
        Tab to see focus ring
      </button>
      <p className="focus-demo-hint">
        Try pressing Tab to focus the button above
      </p>
    </div>
  );
}