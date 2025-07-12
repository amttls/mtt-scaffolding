import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  external: ["pino", "pino-pretty", "hono-pino"],
  sourcemap: true,
});
