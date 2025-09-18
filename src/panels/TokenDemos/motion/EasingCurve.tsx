import React, { useEffect, useRef, useState } from 'react';

const bezierFromCSS = (css: string) => {
  // expects "cubic-bezier(x1,y1,x2,y2)"
  const m = css.match(/cubic-bezier\(([^)]+)\)/i);
  if (!m) return [0.4, 0, 0.2, 1] as [number, number, number, number];
  return m[1].split(',').map(Number) as [number, number, number, number];
};

// cubic-bezier solver (de Casteljau)
const sample = (t: number, [x1, y1, x2, y2]: [number, number, number, number]) => {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const x = ((ax * t + bx) * t + cx) * t;
  const y = ((ay * t + by) * t + cy) * t;
  return { x, y };
};

export default function EasingCurve() {
  const ref = useRef<SVGSVGElement>(null);
  const [curve, setCurve] = useState<[number, number, number, number]>([0.4, 0, 0.2, 1]);

  useEffect(() => {
    const css = getComputedStyle(document.documentElement).getPropertyValue('--ease-standard').trim();
    setCurve(bezierFromCSS(css));
  }, []);

  // animate a dot along the path using requestAnimationFrame
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let start: number | undefined;
    const dur = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--motion-base')) || 300;
    let raf = 0;
    const step = (ts: number) => {
      if (start === undefined) start = ts;
      const t = Math.min((ts - start) / dur, 1);
      setProgress(t);
      if (t < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => { start = undefined; raf = requestAnimationFrame(step); }, 600);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const { x, y } = sample(progress, curve);
  const W = 240, H = 160, P = 16;

  return (
    <div className="motion-demo-card">
      <h4 className="motion-demo-title">Easing Curve</h4>
      <p className="motion-demo-subtitle">Your <code>--ease-standard</code> shown as a cubic-bezier. The dot animates with <code>--motion-base</code>.</p>
      <svg ref={ref} width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="easing-svg">
        <rect x="0" y="0" width={W} height={H} rx="12" fill="rgb(var(--color-bg-secondary))" />
        {/* grid */}
        <path d={`M${P},${H - P} L${W - P},${H - P} M${P},${P} L${P},${H - P}`} stroke="rgb(var(--color-border))" strokeWidth="1" />
        {/* curve */}
        <path
          d={`M ${P},${H - P} C ${P + curve[0] * (W - 2 * P)},${H - P - curve[1] * (H - 2 * P)} ${P + curve[2] * (W - 2 * P)},${H - P - curve[3] * (H - 2 * P)} ${W - P},${P}`}
          stroke="rgb(var(--color-brand))"
          strokeWidth="2"
          fill="none"
        />
        {/* animated dot */}
        <circle
          cx={P + x * (W - 2 * P)}
          cy={H - P - y * (H - 2 * P)}
          r="6"
          fill="rgb(var(--color-brand))"
        />
      </svg>
      <div className="motion-token-row">
        <code>--motion-base</code> • <code>--ease-standard</code>
      </div>
    </div>
  );
}