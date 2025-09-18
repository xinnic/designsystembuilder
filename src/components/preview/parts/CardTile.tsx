import React from "react";
import { playHaptic } from "../../../platform/haptics";

export function CardTile({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const handleClick = () => {
    if (onClick) {
      playHaptic('medium');
      onClick();
    }
  };

  return (
    <div
      className={`rounded-surface p-[var(--space-3)] ${onClick ? 'cursor-pointer hover:bg-secondary/50 transition-colors' : ''}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}