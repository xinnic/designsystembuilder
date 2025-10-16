import React from "react";
import { playHaptic } from "../../../platform/haptics";

export function ListItem({
  avatarUrl,
  title,
  subtitle,
  trailing,
  onClick,
}: {
  avatarUrl: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
}) {
  const handleClick = () => {
    if (onClick) {
      playHaptic('light');
      onClick();
    }
  };

  return (
    <div
      className={`flex items-center justify-between py-[var(--space-2)] ${onClick ? 'cursor-pointer hover:bg-secondary/30 rounded-md px-2 -mx-2 transition-colors' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-[var(--space-2)]">
        <img
          src={avatarUrl}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <div className="text-foreground font-semibold">{title}</div>
          {subtitle && (
            <div className="text-muted-foreground text-sm">{subtitle}</div>
          )}
        </div>
      </div>
      {trailing}
    </div>
  );
}