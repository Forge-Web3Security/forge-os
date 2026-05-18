import { motion } from "framer-motion";
import type { WorkConsoleMessage } from "../lib/api";
import { Panel } from "./Panel";

function CheckItem({ text, done = false }: { text: string; done?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs py-1">
      <span className={done ? "text-emerald-400" : "text-slate-600"}>{done ? "●" : "○"}</span>
      <span className={done ? "text-slate-300" : "text-slate-500"}>{text}</span>
    </div>
  );
}

function CodeBlock({ lines }: { lines: string[] }) {
  return <div className="bg-[#05070b] border border-slate-800 p-2 text-xs text-slate-400 space-y-1">{lines.map((line) => <div key={line}><span className="text-cyan-500">$</span> {line}</div>)}</div>;
}

export function WorkBoard({ messages, healthOk, ollamaConnected, modelCount }: {
  messages: WorkConsoleMessage[];
  healthOk: boolean;
  ollamaConnected: boolean;
  modelCount: number;
}) {
  return (
    <div className="flex-1 min-h-0 p-3 overflow-auto">
      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-12 gap-3 h-full min-h-[460px]">
        <Panel className="col-span-8 row-span-2" title="Active Work">
          <div className="space-y-3 text-xs leading-6">
            <div className="flex justify-between"><span className="text-slate-600">Priority</span><span className="text-cyan-300">Audit Copilot production readiness</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Mode</span><span className="text-emerald-300">small patches · tested · verified</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Target</span><span className="text-amber-300">real bug bounty workflow</span></div>
            <div className="mt-4 border border-slate-800 bg-[#080b10] p-3 text-slate-400">
              ForgeOS Alpha is a local workstation. External tools are linked, not absorbed. Real Linux terminal. Testable backend.
            </div>
          </div>
        </Panel>

        <Panel className="col-span-4" title="Pinned Checks">
          <CheckItem text="Backend health endpoint" done={healthOk} />
          <CheckItem text="Ollama reachable" done={ollamaConnected} />
          <CheckItem text={`Local models: ${modelCount}`} done={modelCount > 0} />
          <CheckItem text="Terminal node-pty bridge" />
        </Panel>

        <Panel className="col-span-4" title="Quick Commands">
          <CodeBlock lines={["npm run test:all", "curl http://127.0.0.1:4242/api/health", "curl http://127.0.0.1:4242/api/local-models", "ollama list"]} />
        </Panel>

        <Panel className="col-span-6" title="Notes">
          <textarea defaultValue={"# Session notes\n- Keep Alpha small\n- Real terminal only\n- External tools as links\n- Work Board owns the screen"} className="h-full min-h-[190px] w-full resize-none bg-[#06080c] border border-slate-800 p-3 text-xs text-slate-300 outline-none focus:border-cyan-500/60" />
        </Panel>

        <Panel className="col-span-6" title="Work Console">
          <div className="space-y-1 text-xs text-slate-400">
            {messages.map((message, index) => (
              <div key={message.id}><span className="text-slate-600">[{String(index + 1).padStart(2, "0")}]</span> <span className="text-slate-500">{message.source}:</span> {message.content}</div>
            ))}
          </div>
        </Panel>
      </motion.div>
    </div>
  );
}
