import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";

import schema from "@/shared/db/schema";

async function MOCK_DB() {
  // use require to defeat dynamic require error
  // (https://github.com/drizzle-team/drizzle-orm/issues/2853#issuecomment-2668459509)
  const { createRequire } =
    await vi.importActual<typeof import("node:module")>("node:module");
  const require = createRequire(import.meta.url);
  const { pushSchema } =
    require("drizzle-kit/api") as typeof import("drizzle-kit/api");

  const client = new PGlite();
  const db = drizzle(client, { schema });

  // apply schema to db

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { apply } = await pushSchema(schema, db as any);
  await apply();

  return { default: db };
}

vi.mock("@/shared/db", MOCK_DB);
