import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppBindings, AppOpenAPI } from "@/shared/lib/types";
import defaultHook from "@/shared/openapi/default-hook";

/**
 * Creates a new OpenAPI Hono router instance with default configuration
 * @returns A new OpenAPI Hono router with app bindings and default hook
 */
export default function createRouter(): AppOpenAPI {
  return new OpenAPIHono<AppBindings>({ strict: false, defaultHook });
}
