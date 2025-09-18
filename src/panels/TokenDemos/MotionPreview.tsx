import React from 'react';
import './MotionPreview.css';

export default function MotionPreview() {
  return (
    <div className="motion-grid">
      <div className="demo fade-scale">Fade & scale</div>
      <div className="demo slide-up">Slide up</div>
      <button className="demo focus-pulse">Focus ring</button>
    </div>
  );
}