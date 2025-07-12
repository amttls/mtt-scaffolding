import { OK_CODE } from "@/shared/http/status-codes";
import createRouter from "@/shared/lib/create-router";
import { jsonContent } from "@/shared/openapi/helpers";
import { createMessageObjectSchema } from "@/shared/openapi/schemas";
import { createRoute } from "@hono/zod-openapi";

const indexRouter = createRouter().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
      [OK_CODE]: jsonContent(
        createMessageObjectSchema("MTT API"),
        "MTT API Index",
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: "Tasks API",
      },
      OK_CODE,
    );
  },
);

export default indexRouter;
