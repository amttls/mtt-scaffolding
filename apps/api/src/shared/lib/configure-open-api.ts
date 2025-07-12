import { Scalar } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "@/shared/lib/types";

import packageJSON from "../../../package.json" with { type: "json" };

/**
 * Configures OpenAPI documentation and reference UI for the application
 * @param app - The Hono OpenAPI application instance
 */
export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/docs", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "MTT API",
    },
  });

  app.get(
    "/reference",
    Scalar({
      url: "/docs",
      theme: "deepSpace",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
    }),
  );
}
