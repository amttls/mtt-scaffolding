import "dotenv/config";

import { serve } from "@hono/node-server";
import { createHonoLogger, honoPinoLogger } from "@repo/logger";
import { env } from "@shared/env";
import notFound from "@shared/middlewares/not-found";
import onError from "@shared/middlewares/on-error";

import { Hono } from "hono";

const app = new Hono();

const logger = createHonoLogger(env.LOG_LEVEL);

app.use(
  honoPinoLogger({
    pino: logger,
  }),
);

app.get("/", (c) => {
  c.status(200);
  return c.json({ meesage: { foo: "bar" } });
});

app.get("/error", () => {
  throw new Error("UPPS");
});

app.notFound(notFound);

app.onError(onError);

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    logger.info(`Server is running on http://localhost:${info.port}`);
  },
);
