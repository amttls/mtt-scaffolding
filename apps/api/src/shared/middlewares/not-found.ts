import type { NotFoundHandler } from "hono";
import { NOT_FOUND_CODE } from "@shared/http/status-codes";
import { NOT_FOUND_MESSAGE } from "@shared/http/status-phrases";

const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `${NOT_FOUND_MESSAGE} - ${c.req.path}`,
    },
    NOT_FOUND_CODE,
  );
};

export default notFound;
