import { requestId } from "hono/request-id";

import { honoPinoLogger } from "@repo/logger";

import createRouter from "@/shared/lib/create-router";
import type { AppOpenAPI } from "@/shared/lib/types";
import onError from "@/shared/middlewares/on-error";
import notFound from "@/shared/middlewares/not-found";
import serveEmojiFavicon from "@/shared/middlewares/serve-emoji-favicon";

/**
 * Creates and configures the main Hono application with middleware
 * @returns The configured Hono OpenAPI application instance
 */
export default function createApp(): AppOpenAPI {
  const app = createRouter();

  app.use(serveEmojiFavicon("⚡"));
  app.use(requestId());
  app.use(honoPinoLogger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
