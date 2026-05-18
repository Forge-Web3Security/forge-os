import type { FastifyInstance } from "fastify";
import { env } from "../env.js";

type OllamaTagsResponse = {
  models?: Array<{ name?: string; model?: string; modified_at?: string; size?: number }>;
};

export function registerOllamaRoutes(app: FastifyInstance) {
  app.get("/api/local-models", async () => {
    const url = `${env.ollamaBaseUrl}/api/tags`;
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(2500) });
      if (!response.ok) {
        return { ok: false, connected: false, baseUrl: env.ollamaBaseUrl, models: [], error: `HTTP ${response.status}` };
      }
      const data = (await response.json()) as OllamaTagsResponse;
      return { ok: true, connected: true, baseUrl: env.ollamaBaseUrl, models: data.models ?? [] };
    } catch (error) {
      return {
        ok: false,
        connected: false,
        baseUrl: env.ollamaBaseUrl,
        models: [],
        error: error instanceof Error ? error.message : "Unknown Ollama error",
      };
    }
  });
}
