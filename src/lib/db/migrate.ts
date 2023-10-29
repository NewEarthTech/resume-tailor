import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

const db = drizzle(sql, { logger: true });

async () => await migrate(db, { migrationsFolder: "./lib/db/migrations" });
