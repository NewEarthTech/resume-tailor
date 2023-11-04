"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { ResumeTable } from "@/db/schema/resume";
import { auth } from "@clerk/nextjs";

export default async function insertResume() {
  const { userId } = auth();
  if (!userId) redirect(`/sign-in`);

  try {
    const { insertedId } = (
      await db
        .insert(ResumeTable)
        .values({
          user_id: userId,
        })
        .returning({ insertedId: ResumeTable.id })
    )[0];
    return insertedId;
  } catch (error) {}
}

export type InsertResumeFunction = typeof insertResume;
