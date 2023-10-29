"use server";

import { db } from "@/db";
import { Resume, ResumeTable } from "@/db/schema/resume";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";

async function getResumes() {
  const { userId } = auth();

  return await sql<Resume>`SELECT * FROM resume WHERE user_id = ${userId}`;
}

async function insertResume() {
  const { userId } = auth();
  if (!userId) throw new Error("User not found");
  const resume = db.insert(ResumeTable).values({ user_id: userId });
  return Response.redirect(`/resume/${resume}`, 302);
}

type GetResumesFunction = typeof getResumes;
type InsertResumeFunction = typeof insertResume;

export {
  getResumes,
  type GetResumesFunction,
  insertResume,
  type InsertResumeFunction,
};

// onMouseDown={async function () {
//   "use server";
//   const user = await currentUser();
//   const resume = sql`INSERT INTO resumes (user_id) VALUES (${user?.id})`;
//   // const resume = await db
//   // .insert(ResumeTable)
//   // .values({ user_id: userId })
//   // .returning({ insertedId: ResumeTable.id });
//   //  `INSERT INTO resumes (user_id) VALUES (${userId})`;
//   Response.redirect(`/resume/${resume}`, 302);
// }}
