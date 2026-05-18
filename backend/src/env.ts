export const env = {
  host: process.env.FORGE_BACKEND_HOST ?? "127.0.0.1",
  port: Number(process.env.FORGE_BACKEND_PORT ?? "4242"),
  shell: process.env.FORGE_SHELL ?? "/bin/bash",
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL ?? "http://127.0.0.1:11434",
};
