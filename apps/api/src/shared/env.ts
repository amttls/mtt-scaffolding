import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(5173),
  LOG_LEVEL: z
    .enum(["trace", "debug", "info", "warn", "error", "fatal"])
    .optional(),
  LOG_HTTP_DETAILS: z
    .enum(["true", "false"])
    .default("false")
    .transform((val) => val === "true"),
});

export const env = envSchema.parse(process.env);

