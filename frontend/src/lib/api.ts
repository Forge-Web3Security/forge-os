export type WorkConsoleMessage = {
  id: string;
  source: string;
  level: "info" | "warn" | "error";
  content: string;
  timestamp: string;
};

export async function getHealth() { return (await fetch("/api/health")).json(); }
export async function getLocalModels() { return (await fetch("/api/local-models")).json(); }
export async function getMessages(): Promise<{ ok: boolean; messages: WorkConsoleMessage[] }> {
  return (await fetch("/api/messages")).json();
}
export async function getTools() { return (await fetch("/api/tools")).json(); }
