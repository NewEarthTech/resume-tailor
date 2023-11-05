"use server";

import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { ResumeTable } from "@/db/schema/resume";
import { eq } from "drizzle-orm";

export default async function getResume(id: string) {
  // const resume = (
  //   await db.execute(sql`SELECT * FROM resume WHERE id = ${id} LIMIT 1`)
  // ).rows[0];

  const resume = (
    await db.select().from(ResumeTable).where(eq(ResumeTable.id, id)).limit(1)
  )[0];

  if (!resume) notFound();

  return resume;
}

export type GetResumeFunction = typeof getResume;
