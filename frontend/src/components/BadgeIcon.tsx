type Tone = "cyan" | "emerald" | "amber" | "slate";

const tones: Record<Tone, string> = {
  cyan: "border-cyan-500/40 text-cyan-300 bg-cyan-500/10",
  emerald: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
  amber: "border-amber-500/40 text-amber-300 bg-amber-500/10",
  slate: "border-slate-700 text-slate-400 bg-slate-900/60",
};

export function BadgeIcon({ label, tone = "slate" }: { label: string; tone?: Tone }) {
  return <span className={`h-5 min-w-5 px-1 inline-flex items-center justify-center border text-[10px] leading-none ${tones[tone]}`}>{label}</span>;
}
