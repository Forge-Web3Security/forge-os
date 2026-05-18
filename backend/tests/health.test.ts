import { describe, expect, it } from "vitest";
import { buildServer } from "../src/server.js";

describe("ForgeOS backend", () => {
  it("returns health", async () => {
    const app = buildServer();
    const response = await app.inject({ method: "GET", url: "/api/health" });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({ ok: true, service: "forge-os-backend" });
    await app.close();
  });

  it("accepts work console messages", async () => {
    const app = buildServer();
    const response = await app.inject({
      method: "POST",
      url: "/api/messages",
      payload: { source: "test", level: "info", content: "hello forge" },
    });
    expect(response.statusCode).toBe(200);
    expect(response.json().ok).toBe(true);
    await app.close();
  });
});
