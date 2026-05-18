import { useEffect, useMemo, useState } from "react";
import { getHealth, getLocalModels, getMessages, getTools, type WorkConsoleMessage } from "./lib/api";
import { BadgeIcon } from "./components/BadgeIcon";
import { Sidebar } from "./components/Sidebar";
import { Panel } from "./components/Panel";
import { WorkBoard } from "./components/WorkBoard";

type ToolConfig = {
  collaborators: Array<{ name: string; status?: string; url?: string; localUrl?: string; command?: string }>;
  tools: Array<{ name: string; status?: string; url?: string; localUrl?: string; command?: string }>;
  research: Array<{ name: string; status?: string; url?: string; localUrl?: string; command?: string }>;
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("work");
  const [healthOk, setHealthOk] = useState(false);
  const [ollamaConnected, setOllamaConnected] = useState(false);
  const [modelCount, setModelCount] = useState(0);
  const [messages, setMessages] = useState<WorkConsoleMessage[]>([]);
  const [toolConfig, setToolConfig] = useState<ToolConfig>({
    collaborators: [
      { name: "ChatGPT", status: "external", url: "https://chatgpt.com" },
      { name: "Qwen Cloud", status: "external", url: "https://chat.qwen.ai" },
      { name: "Ollama Local", status: "local", url: "http://127.0.0.1:11434" },
      { name: "OpenCode", status: "local" },
      { name: "Copilot", status: "VSCode" },
    ],
    tools: [],
    research: [],
  });

  const currentTime = useMemo(() => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), []);

  useEffect(() => {
    async function load() {
      const [health, models, loadedMessages, tools] = await Promise.allSettled([getHealth(), getLocalModels(), getMessages(), getTools()]);
      if (health.status === "fulfilled") setHealthOk(Boolean(health.value.ok));
      if (models.status === "fulfilled") {
        setOllamaConnected(Boolean(models.value.connected));
        setModelCount(Array.isArray(models.value.models) ? models.value.models.length : 0);
      }
      if (loadedMessages.status === "fulfilled") setMessages(loadedMessages.value.messages ?? []);
      if (tools.status === "fulfilled" && tools.value.ok) {
        setToolConfig({ collaborators: tools.value.collaborators ?? [], tools: tools.value.tools ?? [], research: tools.value.research ?? [] });
      }
    }
    load();
    const timer = window.setInterval(load, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden bg-[#07090d] text-slate-200 font-mono">
      <div className="flex h-full">
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} collaborators={toolConfig.collaborators} tools={toolConfig.tools} research={toolConfig.research} />

        <main className="flex-1 min-w-0 flex flex-col">
          <header className="h-11 border-b border-slate-800 bg-[#0a0d12] flex items-center justify-between px-3">
            <div className="flex items-center gap-3">
              <BadgeIcon label="✓" tone={healthOk ? "cyan" : "amber"} />
              <div>
                <div className="text-sm font-semibold">Collaboration Station</div>
                <div className="text-[10px] text-slate-500">/home/rick/Projects/audit-copilot</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span>Dev-Mint</span><span>{currentTime}</span>
              <span className={healthOk ? "text-emerald-400" : "text-amber-400"}>● {healthOk ? "online" : "checking"}</span>
            </div>
          </header>

          <section className="flex-1 min-h-0 grid grid-cols-[1fr_320px] bg-[#07090d]">
            <div className="min-w-0 flex flex-col border-r border-slate-800">
              <div className="h-9 border-b border-slate-800 flex items-center px-2 gap-1 bg-[#090c11]">
                {[["work", "Work Board"], ["findings", "Findings"], ["reports", "Reports"], ["memory", "Memory"]].map(([key, label]) => (
                  <button key={key} onClick={() => setActiveTab(key)} className={`h-7 px-3 text-xs border ${activeTab === key ? "border-cyan-500/60 bg-cyan-500/10 text-cyan-300" : "border-transparent text-slate-500 hover:text-slate-300"}`}>{label}</button>
                ))}
              </div>
              <WorkBoard messages={messages} healthOk={healthOk} ollamaConnected={ollamaConnected} modelCount={modelCount} />
            </div>

            <aside className="hidden lg:flex flex-col bg-[#090c11]">
              <div className="h-9 border-b border-slate-800 px-3 flex items-center text-xs text-slate-400">Context</div>
              <div className="p-3 space-y-3 overflow-auto">
                <Panel title="Current Project">
                  <div className="text-xs space-y-2 text-slate-400">
                    <div className="flex justify-between"><span className="text-slate-600">Project</span><span className="text-cyan-300">a-cp</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Branch</span><span className="text-emerald-300">baseline/original-main</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Risk</span><span className="text-amber-300">protected</span></div>
                  </div>
                </Panel>
                <Panel title="Rules Loaded">
                  <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                    <li>No rushed architecture</li>
                    <li>Tests before merge</li>
                    <li>Small production patches</li>
                    <li>External LLM branches are donor only</li>
                  </ul>
                </Panel>
                <Panel title="Alpha Status">
                  <div className="text-xs text-slate-400 space-y-2">
                    <div>Backend: {healthOk ? "online" : "offline"}</div>
                    <div>Ollama: {ollamaConnected ? "connected" : "not connected"}</div>
                    <div>Models: {modelCount}</div>
                  </div>
                </Panel>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
