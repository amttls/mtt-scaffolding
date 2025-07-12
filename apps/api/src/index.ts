import "dotenv/config";

import { serve } from "@hono/node-server";
import { logger } from "@repo/logger";

import app from "@/app";
import env from "@/shared/env";

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    logger.info(`Server is running on http://localhost:${info.port}`);
  },
);
