"use server";

import { UUID } from "crypto";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { ResumeTable } from "@/db/schema/resume";
import { auth } from "@clerk/nextjs";

export default async function insertResume() {
  const { userId } = auth();
  if (!userId) redirect(`/sign-in`);

  let insertedId;

  try {
    insertedId = (
      await db
        .insert(ResumeTable)
        .values({
          user_id: userId,
        })
        .returning({ insertedId: ResumeTable.id })
    )[0].insertedId;
  } catch (error) {
    return { error: JSON.stringify(error) };
  } finally {
    redirect(`/resume/${insertedId}`);
    return true;
  }
}

export type InsertResumeFunction = typeof insertResume;
