"use server";

import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { ResumeTable } from "@/db/schema/resume";
import { auth } from "@clerk/nextjs";

import { toast } from "@/components/ui/use-toast";

export default async function insertResume() {
  const { userId } = auth();
  if (!userId) redirect(`/sign-in`);

  const insertedId = (
    await db
      .insert(ResumeTable)
      .values({
        user_id: userId,
      })
      .returning({ insertedId: ResumeTable.id })
  )[0].insertedId;
  if (!insertedId) throw new Error(`Failed to insert resume`);
  revalidatePath(`/resume`, "page");
  revalidatePath(`/resume/${insertedId}`, "page");
  return insertedId;
}

export type InsertResumeFunction = typeof insertResume;

// revalidatePath(`/resume/${insertedId}`, "page");
// return new Error(JSON.stringify(error));
