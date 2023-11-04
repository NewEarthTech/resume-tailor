"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { Resume, ResumeTable } from "@/db/schema/resume";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

import { toast } from "@/components/ui/use-toast";

export default async function updateResume(id: string, resume: Resume) {
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

export type UpdateResumeFunction = typeof updateResume;
