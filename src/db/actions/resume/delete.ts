"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { ResumeTable } from "@/db/schema/resume";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

import { toast } from "@/components/ui/use-toast";

export default async function deleteResume(id: string) {
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

export type DeleteResumeFunction = typeof deleteResume;
