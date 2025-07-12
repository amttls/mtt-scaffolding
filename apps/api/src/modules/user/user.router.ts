import * as routes from "@/modules/user/user.routes";
import * as handlers from "@/modules/user/user.handlers";

import createRouter from "@/shared/lib/create-router";

export default createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.findOne, handlers.findOne)
  .openapi(routes.create, handlers.create)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove);
