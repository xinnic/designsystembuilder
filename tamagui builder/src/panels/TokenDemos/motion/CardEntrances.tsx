import React, { useEffect } from 'react';
import './CardEntrances.css';

const DemoCard = ({ title }: { title: string }) => (
  <div className="demo-card">
    <div className="demo-card-media" />
    <div className="demo-card-text">
      <div className="demo-card-title">{title}</div>
      <div className="demo-card-sub">Token-based entrance animation</div>
    </div>
  </div>
);

export default function CardEntrances() {
  // re-trigger animations on mount for demo loop
  useEffect(() => {
    const id = setInterval(() => {
      document.querySelectorAll('.demo-card').forEach(el => {
        el.classList.remove('fadeScale', 'slideUp');
        // force reflow
        void (el as HTMLElement).offsetWidth;
        el.classList.add(Math.random() > 0.5 ? 'fadeScale' : 'slideUp');
      });
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="motion-demo-card">
      <h4 className="motion-demo-title">Card Entrances</h4>
      <p className="motion-demo-subtitle">
        Alternates between <strong>Fade &amp; Scale</strong> and <strong>Slide Up</strong> using <code>--motion-fast</code>/<code>--motion-base</code> &amp; <code>--ease-standard</code>.
      </p>
      <div className="demo-card-stack">
        <DemoCard title="Breathing Session" />
        <DemoCard title="Focus Stats" />
        <DemoCard title="Daily Tip" />
      </div>
      <div className="motion-token-row">
        <code>--motion-fast</code> • <code>--motion-base</code> • <code>--ease-standard</code>
      </div>
    </div>
  );
}