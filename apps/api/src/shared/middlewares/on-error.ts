import type { ErrorHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import env from "@/shared/env";
import {
  INTERNAL_SERVER_ERROR_CODE,
  OK_CODE,
} from "@/shared/http/status-codes";

/**
 * Global error handler middleware that catches and formats all application errors.
 * Provides different response formats for production and development environments.
 * @param err - The error object that was thrown
 * @param c - Hono context object containing request and response utilities
 * @returns JSON response with error details and appropriate HTTP status code
 */
const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    "status" in err ? err.status : c.newResponse(null).status;

  const statusCode =
    currentStatus !== OK_CODE
      ? (currentStatus as ContentfulStatusCode)
      : INTERNAL_SERVER_ERROR_CODE;

  return c.json(
    {
      message: err.message,

      stack: env.NODE_ENV === "production" ? undefined : err.stack,
    },
    statusCode,
  );
};

export default onError;
