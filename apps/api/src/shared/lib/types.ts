import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { HonoPinoLogger } from "@repo/logger";

export type AppBindings = {
  Variables: {
    logger: HonoPinoLogger;
  };
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
