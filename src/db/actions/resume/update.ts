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
    const obj = (
      await db
        .update(ResumeTable)
        .set({
          ...parsed,
        })
        .where(eq(ResumeTable.id, resume.id))
        .returning({
          updatedId: ResumeTable.id,
          updatedUrl: ResumeTable.custom_url,
        })
    )[0];
    revalidatePath(`/resume/${obj.updatedId}`);
    revalidatePath(`/resume`);
    resume.custom_url ? revalidatePath(`/${obj.updatedUrl}`) : null;
  } catch (error) {
    return { error: JSON.stringify(error) };
  } finally {
    parsed.custom_url &&
      redirect(`/${parsed.custom_url}`, RedirectType["replace"]);

    return true;
  }
}

export type UpdateResumeFunction = typeof updateResume;
