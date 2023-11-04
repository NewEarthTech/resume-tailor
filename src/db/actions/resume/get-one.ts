"use server";

import { notFound, redirect } from "next/navigation";
import { Resume } from "@/db/schema/resume";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";

export default async function getResume(id: string) {
  const { userId } = auth();
  if (!userId) redirect(`/sign-in`);

  const resume = await sql<Resume>`SELECT * FROM resume WHERE id = ${id}`;
  if (!resume) notFound();

  return resume;
}

export type GetResumeFunction = typeof getResume;
