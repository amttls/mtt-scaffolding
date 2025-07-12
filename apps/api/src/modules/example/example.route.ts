import { createRoute } from "@hono/zod-openapi";

import createRouter from "@/shared/lib/create-router";
import { jsonContent } from "@/shared/openapi/helpers";
import { OK_CODE } from "@/shared/http/status-codes";
import { createMessageObjectSchema } from "@/shared/openapi/schemas";

const exampleRouter = createRouter().openapi(
  createRoute({
    tags: ["Example"],
    method: "get",
    path: "/examples",
    responses: {
      [OK_CODE]: jsonContent(
        createMessageObjectSchema("Example endpoint resolved succesfully"),
        "MTT API - GET Example Route",
      ),
    },
  }),
  (c) => {
    return c.json(
      { message: "Example endpoint resolved succesfully" },
      OK_CODE,
    );
  },
);

export default exampleRouter;
