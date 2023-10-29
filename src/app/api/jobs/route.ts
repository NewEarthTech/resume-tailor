import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { insertJob } from "@/db/actions/job";
import { insertJobSchema, JobTable, NewJob } from "@/db/schema/job";
import { auth, clerkClient, currentUser } from "@clerk/nextjs";

export async function GET() {
  const jobs = db.select().from(JobTable);

  return NextResponse.json({ jobs });
}

export async function POST({ body }: NextRequest) {
  const { userId } = auth();

  if (!userId) return NextResponse.redirect("/sign-in");

  const parsed: NewJob = insertJobSchema.parse(body);

  return NextResponse.json({ job: await insertJob(parsed) });
}
