import type { FastifyInstance } from "fastify";
import { env } from "../env.js";
import { addMessage } from "../logs/workConsole.js";

type ForgeWebSocket = {
  send: (data: string) => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  close: () => void;
};

function unwrapSocket(connection: any): ForgeWebSocket {
  return connection?.socket ?? connection;
}

function safeSend(ws: ForgeWebSocket | null, data: string) {
  try {
    ws?.send(data);
  } catch {
    // Avoid crashing the backend from terminal error reporting.
  }
}

export function registerTerminalSocket(app: FastifyInstance) {
  app.get("/ws/terminal", { websocket: true }, (connection) => {
    const ws = unwrapSocket(connection);
    let ptyProcess: import("node-pty").IPty | null = null;

    import("node-pty")
      .then((pty) => {
        ptyProcess = pty.spawn(env.shell, [], {
          name: "xterm-256color",
          cols: 100,
          rows: 30,
          cwd: process.env.HOME,
          env: process.env,
        });

        addMessage({
          source: "ForgeTerm",
          level: "info",
          content: `Terminal opened with ${env.shell}`,
        });

        ptyProcess.onData((data) => {
          safeSend(ws, data);
        });

        ws.on("message", (message: Buffer | string) => {
          const raw = message.toString();

          if (raw.startsWith("{")) {
            try {
              const parsed = JSON.parse(raw) as {
                type?: string;
                cols?: number;
                rows?: number;
              };

              if (parsed.type === "resize" && parsed.cols && parsed.rows) {
                ptyProcess?.resize(parsed.cols, parsed.rows);
                return;
              }
            } catch {
              // If JSON parsing fails, treat it as terminal input.
            }
          }

          ptyProcess?.write(raw);
        });

        ws.on("close", () => {
          ptyProcess?.kill();
          addMessage({
            source: "ForgeTerm",
            level: "info",
            content: "Terminal closed.",
          });
        });

        ws.on("error", () => {
          ptyProcess?.kill();
        });
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : String(error);

        addMessage({
          source: "ForgeTerm",
          level: "error",
          content: `Failed to load node-pty: ${message}`,
        });

        safeSend(ws, `ForgeTerm failed to load node-pty: ${message}\r\n`);
        try {
          ws.close();
        } catch {
          // Ignore close failure.
        }
      });
  });
}
