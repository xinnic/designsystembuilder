import React from "react";

export function CardTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-surface p-[var(--space-3)]">
      {children}
    </div>
  );
}