import type { FastifyInstance } from "fastify";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export function registerToolRoutes(app: FastifyInstance) {
  app.get("/api/tools", async () => {
    try {
      const raw = await readFile(resolve(process.cwd(), "../config/tools.json"), "utf8");
      return { ok: true, ...(JSON.parse(raw) as object) };
    } catch {
      return { ok: true, collaborators: [], tools: [], research: [] };
    }
  });
}
