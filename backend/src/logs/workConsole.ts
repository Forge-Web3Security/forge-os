export type WorkConsoleMessage = {
  id: string;
  source: string;
  level: "info" | "warn" | "error";
  content: string;
  timestamp: string;
};

const messages: WorkConsoleMessage[] = [
  {
    id: "startup-1",
    source: "ForgeOS",
    level: "info",
    content: "ForgeOS backend initialized.",
    timestamp: new Date().toISOString(),
  },
];

export function listMessages() {
  return messages.slice(-250);
}

export function addMessage(input: Omit<WorkConsoleMessage, "id" | "timestamp">) {
  const message: WorkConsoleMessage = {
    ...input,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
  messages.push(message);
  return message;
}
