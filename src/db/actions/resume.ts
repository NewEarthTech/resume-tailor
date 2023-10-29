"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { Resume, ResumeTable } from "@/db/schema/resume";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";

import { toast } from "@/components/ui/use-toast";

async function getResumes() {
  const { userId } = auth();
  if (!userId) notFound();

  return await sql<Resume>`SELECT * FROM resume WHERE user_id = ${userId}`;
}

async function insertResume() {
  const { userId } = auth();
  if (!userId) notFound();

  try {
    const { insertedId } = (
      await db
        .insert(ResumeTable)
        .values({
          user_id: userId,
        })
        .returning({ insertedId: ResumeTable.id })
    )[0];
    toast({
      title: "Resume Created",
      description: `Redirecting to /resume/${insertedId}...`,
    });
    revalidatePath(`/resume`);
    redirect(`/resume/${insertedId}`);
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Resume Not Created",
      description: `${JSON.stringify(error)}`,
    });
  }
}

async function deleteResume(id: string) {
  const { userId } = auth();
  if (!userId) notFound();

  try {
    const { deletedId } = (
      await db
        .delete(ResumeTable)
        .where(eq(ResumeTable.id, id))
        .returning({ deletedId: ResumeTable.id })
    )[0];
    toast({
      title: "Resume Deleted",
      description: `So long, ${deletedId}...`,
    });
    revalidatePath(`/resume`);
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Resume Not Deleted",
      description: `${JSON.stringify(error)}`,
    });
  }
}

type GetResumesFunction = typeof getResumes;
type InsertResumeFunction = typeof insertResume;
type DeleteResumeFunction = typeof deleteResume;

export {
  getResumes,
  type GetResumesFunction,
  insertResume,
  type InsertResumeFunction,
  deleteResume,
  type DeleteResumeFunction,
};
