import indexRouter from "@/modules/index.router";
import userRouter from "@/modules/user/user.router";

import configureOpenAPI from "@/shared/lib/configure-open-api";
import createApp from "@/shared/lib/create-app";

const app = createApp();

const routes = [indexRouter, userRouter] as const;

configureOpenAPI(app);

for (const route of routes) {
  app.route("/api", route);
}

export type AppType = (typeof routes)[number];

export default app;
