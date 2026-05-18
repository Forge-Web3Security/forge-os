import type { FastifyInstance } from "fastify";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export function registerProjectRoutes(app: FastifyInstance) {
  app.get("/api/projects", async () => {
    try {
      const raw = await readFile(resolve(process.cwd(), "../config/workspaces.json"), "utf8");
      return { ok: true, ...(JSON.parse(raw) as object) };
    } catch {
      return { ok: true, workspaces: [] };
    }
  });
}
