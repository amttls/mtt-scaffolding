import { logger } from "@repo/logger";

import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";
import { flattenError, type ZodError } from "zod/v4";

expand(config());

const EnvSchema = z
  .object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    PORT: z.coerce.number().default(5173),
    LOG_LEVEL: z
      .enum(["trace", "debug", "info", "warn", "error", "fatal"])
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

let env: Env;

try {
  // eslint-disable-next-line no-process-env
  env = EnvSchema.parse(process.env);
} catch (e) {
  const error = e as ZodError;

  logger.error(
    flattenError(error).fieldErrors,
    "Invalid Environment Variables:",
  );

  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

export default env;
