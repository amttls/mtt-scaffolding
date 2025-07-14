import { testClient } from "hono/testing";

import { createTestApp } from "@/shared/lib/create-app";
import type { AppOpenAPI } from "@/shared/lib/types";

const clientCache = new Map();

export function getTypedClient<T extends AppOpenAPI>(
  router: T,
): ReturnType<typeof testClient<T>> {
  if (!clientCache.has(router)) {
    clientCache.set(router, testClient(createTestApp(router)));
  }
  return clientCache.get(router);
}
