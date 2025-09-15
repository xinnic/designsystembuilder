import React from "react";

export function ListItem({
  avatarUrl,
  title,
  subtitle,
  trailing,
}: {
  avatarUrl: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-[var(--space-2)]">
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