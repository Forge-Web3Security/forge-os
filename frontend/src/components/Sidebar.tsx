import { BadgeIcon } from "./BadgeIcon";

type SidebarItem = { name: string; status?: string; url?: string; localUrl?: string; command?: string };

function icon(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function SidebarSection({ title, open, items, tone }: { title: string; open: boolean; items: SidebarItem[]; tone: "cyan" | "emerald" | "slate" }) {
  return (
    <section>
      {open && <div className="px-2 mb-1 text-[10px] uppercase tracking-wider text-slate-600">{title}</div>}
      <div className="space-y-1">
        {items.map((item) => {
          const href = item.localUrl ?? item.url;
          const content = (
            <>
              <BadgeIcon label={icon(item.name)} tone={tone} />
              {open && (
                <>
                  <span className="text-xs flex-1">{item.name}</span>
                  {item.status && <span className="text-[10px] text-slate-500">{item.status}</span>}
                </>
              )}
            </>
          );

          return href ? (
            <a key={item.name} href={href} target="_blank" rel="noreferrer" className="w-full h-9 flex items-center gap-2 px-2 border border-transparent hover:border-slate-700 hover:bg-slate-900/70 text-left">
              {content}
            </a>
          ) : (
            <button key={item.name} className="w-full h-9 flex items-center gap-2 px-2 border border-transparent hover:border-slate-700 hover:bg-slate-900/70 text-left" title={item.command ?? item.name}>
              {content}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function Sidebar({ open, onToggle, collaborators, tools, research }: {
  open: boolean;
  onToggle: () => void;
  collaborators: SidebarItem[];
  tools: SidebarItem[];
  research: SidebarItem[];
}) {
  return (
    <aside className={`${open ? "w-64" : "w-14"} border-r border-slate-800 bg-[#0b0e13] transition-all duration-200 flex flex-col`}>
      <div className="h-11 border-b border-slate-800 flex items-center gap-2 px-3">
        <button onClick={onToggle} className="h-8 w-8 grid place-items-center border border-slate-700 hover:border-cyan-500/70 bg-[#090c11] text-slate-300" aria-label="Toggle sidebar">≡</button>
        {open && <div className="text-sm font-semibold tracking-wide">ForgeOS</div>}
      </div>
      <div className="flex-1 overflow-auto p-2 space-y-4">
        <SidebarSection title="Collaborators" open={open} items={collaborators} tone="cyan" />
        <SidebarSection title="Tools" open={open} items={tools} tone="slate" />
        <SidebarSection title="Research" open={open} items={research} tone="emerald" />
      </div>
      <div className="h-10 border-t border-slate-800 px-3 flex items-center gap-2 text-[11px] text-slate-500">
        <BadgeIcon label="HD" tone="slate" />
        {open && <span>bare-metal mode</span>}
      </div>
    </aside>
  );
}
