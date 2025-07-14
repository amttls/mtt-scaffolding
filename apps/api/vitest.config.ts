import path from "path";
import { defineConfig } from "vitest/config";

import { sharedConfig } from "@repo/vitest-config";

export default defineConfig({
  test: {
    projects: [
      // Unit tests
      {
        resolve: {
          alias: { "@": path.resolve(__dirname, "./src") },
        },
        test: {
          ...sharedConfig.test,
          include: ["src/**/*.test.ts"],
          exclude: ["src/**/*.integration.test.ts"],
          name: "unit",
        },
      },
      // Integration tests
      {
        resolve: {
          alias: { "@": path.resolve(__dirname, "./src") },
        },
        test: {
          ...sharedConfig.test,
          include: ["src/**/*.integration.test.ts"],
          setupFiles: ["./src/test/integration-setup.ts"],
          name: "integration",
        },
      },
    ],
  },
});
