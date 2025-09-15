import React from "react";

export function PhoneScaffold({ children }: { children: React.ReactNode }) {
  return (
    <div className="preview rounded-[var(--radius-lg)] shadow-[var(--shadow-3)] overflow-hidden bg-background">
      <div className="preview-scroll h-full overflow-y-auto">
        {/* Safe area + consistent horizontal padding */}
        <div
          className="px-[var(--phone-inset-x)] py-[calc(env(safe-area-inset-top,0px)+var(--phone-inset-y))] space-y-[var(--stack-gap)]"
        >
          {children}
          {/* bottom safe area spacer so content never sits on the bottom bar */}
          <div className="pb-[calc(env(safe-area-inset-bottom,0px)+24px)]" />
        </div>
      </div>
    </div>
  );
}