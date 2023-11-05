"use server";

import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { db } from "@/db";
import { insertResumeSchema, Resume, ResumeTable } from "@/db/schema/resume";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export default async function updateResume(resume: Resume) {
  const { userId } = auth();
  if (!userId) redirect(`/sign-in`);

  const parsed = insertResumeSchema.parse(resume);

  try {
    await db
      .update(ResumeTable)
      .set({
        ...parsed,
      })
      .where(eq(ResumeTable.id, resume.id));
  } catch (error) {
    return { error: JSON.stringify(error) };
  } finally {
    revalidatePath(`/resume/${parsed.id}`, "page");
    revalidatePath(`/resume`, "page");

    if (parsed.custom_url) {
      revalidatePath(`/${parsed.custom_url}`);
      redirect(`/${parsed.custom_url}`, RedirectType["replace"]);
    }
    return parsed;
  }
}

export type UpdateResumeFunction = typeof updateResume;
