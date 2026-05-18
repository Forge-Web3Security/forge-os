import type { ReactNode } from "react";

export function Panel({ title, className = "", children }: { title?: string; className?: string; children: ReactNode }) {
  return (
    <div className={`border border-slate-800 bg-[#0a0d12] min-h-[120px] flex flex-col ${className}`}>
      {title && <div className="h-8 border-b border-slate-800 px-3 flex items-center text-xs text-slate-400 bg-[#090c11]">{title}</div>}
      <div className="p-3 flex-1 min-h-0">{children}</div>
    </div>
  );
}
