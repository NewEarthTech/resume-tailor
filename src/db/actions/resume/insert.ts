"use server";

import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { insertResumeSchema, ResumeTable } from "@/db/schema/resume";
import { auth } from "@clerk/nextjs";

export default async function insertResume() {
  const { userId } = auth();
  if (!userId) redirect(`/sign-in`);

  const resume = insertResumeSchema.parse({
    user_id: userId,
  });

  // const insertedId = (
  //   await db
  //     .insert(ResumeTable)
  //     .values(resume)
  //     .returning({ insertedId: ResumeTable.id })
  // )[0].insertedId;
  // if (!insertedId) return notFound();
  // revalidatePath(`/resume/${insertedId}`, "page");
  // return insertedId;
}

export type InsertResumeFunction = typeof insertResume;
