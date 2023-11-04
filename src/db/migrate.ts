import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

import { db } from "./index";

await migrate(db, { migrationsFolder: "src/db/migrations" });
