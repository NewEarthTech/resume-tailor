import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

// Connect drizzle to Vercel Postgres
export const db = drizzle(sql as never, { logger: true });
