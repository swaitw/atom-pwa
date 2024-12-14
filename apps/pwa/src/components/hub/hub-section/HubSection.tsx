import * as React from "react";

export interface HubSectionProps {
  title?: string;
  children: React.ReactNode;
}

function HubSection({ title = "Section", children }: HubSectionProps) {
  return (
    <div>
      <h2 className="font-medium pb-4 uppercase text-xl tracking-[1px] m-0 text-accent-400 opacity-50 dark:opacity-100">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-4">{children}</div>
    </div>
  );
}

export default HubSection;
