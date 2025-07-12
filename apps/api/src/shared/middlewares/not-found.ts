import type { NotFoundHandler } from "hono";

import { NOT_FOUND_CODE } from "@/shared/http/status-codes";
import { NOT_FOUND_MESSAGE } from "@/shared/http/status-phrases";

/**
 * Handles 404 Not Found responses for unmatched routes.
 * Returns a JSON response with an error message that includes the requested path.
 * @param c - Hono context object containing request and response utilities
 * @returns JSON response with error message and 404 status code
 */
const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `${NOT_FOUND_MESSAGE} - ${c.req.path}`,
    },
    NOT_FOUND_CODE,
  );
};

export default notFound;
