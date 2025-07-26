export const sharedConfig = {
  test: {
    include: ["src/**/*.test.ts", "src/**/*.integration.test.ts"],
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    coverage: {
      provider: "istanbul",
      reporter: [
        [
          "json",
          {
            file: `../coverage.json`,
          },
        ],
      ],
      enabled: true,
    },
  },
};

// Re-export specific configs for backwards compatibility
export { baseConfig } from "./base.js";
export { uiConfig } from "./ui.js";