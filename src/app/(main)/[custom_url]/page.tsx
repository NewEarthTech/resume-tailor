"use server";

import { notFound } from "next/navigation";
import ResumeTailor from "@/app/(main)/resume/[id]/page";
import { db } from "@/db";
import getResumeFromUrl from "@/db/actions/resume/get-one-from-url";
import { ResumeTable } from "@/db/schema/resume";
import { ne } from "drizzle-orm";

// export async function generateStaticParams() {
//   const resumes = await db
//     .select({
//       custom_url: ResumeTable.custom_url,
//     })
//     .from(ResumeTable)
//     .where(ne(ResumeTable.custom_url, null));

//   return resumes.map((resume) => ({
//     custom_url: resume.custom_url,
//   }));
// }

export default async function CustomUrl({
  params: { custom_url },
}: {
  params: { custom_url: string };
}) {
  const id = await getResumeFromUrl(custom_url);
  if (!id) return notFound();
  return <ResumeTailor params={{ id: String(id) }} />;
}
