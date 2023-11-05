"use server";

import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { ResumeTable } from "@/db/schema/resume";
import { auth } from "@clerk/nextjs";

export default async function insertResume() {
  const { userId } = auth();
  if (!userId) redirect(`/sign-in`);

  return (
    await db
      .insert(ResumeTable)
      .values({
        user_id: userId,
      })
      .returning({ insertedId: ResumeTable.id })
  )[0].insertedId;
}

export type InsertResumeFunction = typeof insertResume;

// revalidatePath(`/resume/${insertedId}`, "page");
// return new Error(JSON.stringify(error));
