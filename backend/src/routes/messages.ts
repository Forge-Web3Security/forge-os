import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { addMessage, listMessages } from "../logs/workConsole.js";

const messageSchema = z.object({
  source: z.string().min(1).default("ForgeOS"),
  level: z.enum(["info", "warn", "error"]).default("info"),
  content: z.string().min(1),
});

export function registerMessageRoutes(app: FastifyInstance) {
  app.get("/api/messages", async () => ({ ok: true, messages: listMessages() }));

  app.post("/api/messages", async (request, reply) => {
    const parsed = messageSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ ok: false, error: parsed.error.flatten() });
    return { ok: true, message: addMessage(parsed.data) };
  });
}
