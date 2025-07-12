import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { users } from "@/modules/user/user.schema";

import env from "@/shared/env";

const client = postgres(env.DATABASE_URL);
const db = drizzle(client, { schema: { users } });

export default db;
