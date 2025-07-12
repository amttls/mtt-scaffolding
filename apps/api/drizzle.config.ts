import "dotenv/config";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/shared/db/migrations",
  schema: "./src/shared/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    // eslint-disable-next-line no-process-env
    url: process.env.DATABASE_URL!,
  },
});
