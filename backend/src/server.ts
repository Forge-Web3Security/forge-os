import Fastify from "fastify";
import cors from "@fastify/cors";
import websocket from "@fastify/websocket";
import { env } from "./env.js";
import { registerHealthRoutes } from "./routes/health.js";
import { registerOllamaRoutes } from "./routes/ollama.js";
import { registerMessageRoutes } from "./routes/messages.js";
import { registerProjectRoutes } from "./routes/projects.js";
import { registerToolRoutes } from "./routes/tools.js";
import { registerTerminalSocket } from "./terminal/terminalSocket.js";

export function buildServer() {
  const app = Fastify({ logger: { level: "info" } });
  app.register(cors, { origin: true });
  app.register(websocket);
  registerHealthRoutes(app);
  registerOllamaRoutes(app);
  registerMessageRoutes(app);
  registerProjectRoutes(app);
  registerToolRoutes(app);
  registerTerminalSocket(app);
  return app;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const app = buildServer();
  app.listen({ host: env.host, port: env.port }).catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
}
