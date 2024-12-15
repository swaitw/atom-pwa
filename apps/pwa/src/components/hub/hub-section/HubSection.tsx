import * as React from "react";

export interface HubSectionProps {
  title?: string;
  children: React.ReactNode;
}

function HubSection({ title = "Section", children }: HubSectionProps) {
  return (
    <div>
      <h2 className="m-0 pb-4 text-xl font-medium uppercase tracking-[1px] text-accent-400 opacity-50 dark:opacity-100">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-4">{children}</div>
    </div>
  );
}

export default HubSection;
