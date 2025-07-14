import { logger } from "@repo/logger";

import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

const EnvSchema = z
  .object({
    NODE_ENV: z
      .enum(["test", "development", "production"])
      .default("development"),
    PORT: z.coerce.number().default(5173),
    LOG_LEVEL: z
      .enum(["trace", "debug", "info", "warn", "error", "fatal", "silent"])
      .optional(),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
  })
  .superRefine((input, ctx) => {
    if (input.NODE_ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: "string",
        received: "undefined",
        path: ["DATABASE_AUTH_TOKEN"],
        message: "Must be set when NODE_ENV is 'production'",
      });
    }
  });

export type Env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line no-process-env
const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  logger.error("❌ Invalid env:");
  logger.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

export default env!;
