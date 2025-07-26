import { defineConfig } from "orval";
import env from "./src/env";

export default defineConfig({
  api: {
    input: {
      target: env.API_SPEC_PATH,
    },
    output: {
      mode: "tags-split",
      target: "./src/generated",
      schemas: "./src/generated/models",
      client: "react-query",
      httpClient: "fetch",
      baseUrl: env.API_URL,
    },
    hooks: {
      afterAllFilesWrite: " prettier . --write --ignore-path .prettierignore",
    },
  },
});
