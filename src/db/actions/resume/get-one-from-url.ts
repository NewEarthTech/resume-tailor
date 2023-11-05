import { notFound } from "next/navigation";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export default async function getResumeIdFromUrl(custom_url: string) {
  return (
    (
      await db.execute(
        sql`SELECT id FROM resume WHERE custom_url = ${custom_url}`,
      )
    ).rows[0]?.id || null
  );
}
