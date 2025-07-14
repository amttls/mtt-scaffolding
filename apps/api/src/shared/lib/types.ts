import type { Schema } from "hono";
import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";

import type { HonoPinoLogger } from "@repo/logger";

export type AppBindings = {
  Variables: {
    logger: HonoPinoLogger;
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
