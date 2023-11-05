"use server";

import { notFound } from "next/navigation";
import ResumeTailor from "@/app/(main)/resume/[id]/page";
import getResumeFromUrl from "@/db/actions/resume/get-one-from-url";

export default async function CustomUrl({
  params: { custom_url },
}: {
  params: { custom_url: string };
}) {
  const id = await getResumeFromUrl(custom_url);
  if (!id) return notFound();
  return <ResumeTailor params={{ id: String(id) }} />;
}
