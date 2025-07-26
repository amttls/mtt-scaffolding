import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["test", "development", "production"])
    .default("development"),
  API_URL: z.string().url().default("http://localhost:5731"),
  API_SPEC_PATH: z.string().default("../../apps/api/dist/openapi.json"),
});

export type Env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line no-process-env
const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

export default env!;
