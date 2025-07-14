import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import schema from "@/shared/db/schema";
import env from "@/shared/env";

const client = postgres(env.DATABASE_URL);
const db = drizzle(client, { schema });

export default db;
