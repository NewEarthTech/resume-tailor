"use server";

import { redirect } from "next/navigation";
import { Resume } from "@/db/schema/resume";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";

export default async function getResumes() {
  const { userId } = auth();
  if (!userId) redirect(`/sign-in`);

  return await sql<Resume>`SELECT * FROM resume WHERE user_id = ${userId}`;
}

export type GetResumesFunction = typeof getResumes;
