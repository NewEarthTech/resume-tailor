"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { Resume, ResumeTable } from "@/db/schema/resume";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";

import { toast } from "@/components/ui/use-toast";

async function insertResume() {
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

async function getResumes() {
  const { userId } = auth();
  if (!userId) redirect(`/sign-in`);

  return await sql<Resume>`SELECT * FROM resume WHERE user_id = ${userId}`;
}

async function getResume(id: string) {
  const { userId } = auth();
  if (!userId) redirect(`/sign-in`);

  const resume = await sql<Resume>`SELECT * FROM resume WHERE id = ${id}`;
  if (!resume) notFound();

  return resume;
}

async function updateResume(id: string, resume: Resume) {
  const { userId } = auth();
  if (!userId) redirect(`/sign-in`);

  try {
    await db
      .update(ResumeTable)
      .set({
        ...resume,
      })
      .where(eq(ResumeTable.id, id));
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Resume Not Updated",
      description: `${JSON.stringify(error)}`,
    });
  }
  toast({
    title: "Resume Updated",
    description: `Resume ${id} has been updated`,
  });
  revalidatePath(`/resume/${id}`);
  revalidatePath(`/resume`);
}

async function deleteResume(id: string) {
  const { userId } = auth();
  if (!userId) redirect(`/sign-in`);
  let deletedId;
  try {
    deletedId = (
      await db
        .delete(ResumeTable)
        .where(eq(ResumeTable.id, id))
        .returning({ deletedId: ResumeTable.id })
    )[0].deletedId;
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Resume Not Deleted",
      description: `${JSON.stringify(error)}`,
    });
  }

  toast({
    title: "Resume Deleted",
    description: `So long, ${deletedId}...`,
  });
  revalidatePath(`/resume`);
}

type InsertResumeFunction = typeof insertResume;
type GetResumesFunction = typeof getResumes;
type GetResumeFunction = typeof getResume;
type UpdateResumeFunction = typeof updateResume;
type DeleteResumeFunction = typeof deleteResume;

export {
  insertResume,
  type InsertResumeFunction,
  getResumes,
  type GetResumesFunction,
  getResume,
  type GetResumeFunction,
  updateResume,
  type UpdateResumeFunction,
  deleteResume,
  type DeleteResumeFunction,
};
