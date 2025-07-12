import exampleRouter from "@/modules/example/example.route";
import userRouter from "@/modules/user/user.router";

import configureOpenAPI from "@/shared/lib/configure-open-api";
import createApp from "@/shared/lib/create-app";

const app = createApp();

const routes = [exampleRouter, userRouter];

configureOpenAPI(app);

for (const route of routes) {
  app.route("/v1", route);
}

export default app;
