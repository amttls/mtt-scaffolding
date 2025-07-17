import { baseConfig } from "@repo/vitest-config";
import path from "path";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
    test: {
      setupFiles: ["./src/test/setup.ts"],
    },
  }),
);
