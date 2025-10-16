import React from "react";

export function Section({
  title,
  subtitle,
  children,
  gap = "var(--stack-gap)",
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  gap?: string;
}) {
  return (
    <section className="flex flex-col" style={{ gap }}>
      {(title || subtitle) && (
        <header className="flex flex-col" style={{ gap: "var(--space-1)" }}>
          {title && <h2 className="text-xl font-semibold leading-tight text-foreground">{title}</h2>}
          {subtitle && <p className="text-base leading-relaxed text-muted-foreground">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}