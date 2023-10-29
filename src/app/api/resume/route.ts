import { NextResponse } from "next/server";
import { db } from "@/db";
import { insertResume } from "@/db/actions/resume";
import { NewResume, ResumeTable } from "@/db/schema/resume";
import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const resume = await db
    .select()
    .from(ResumeTable)
    .where(eq(ResumeTable.user_id, userId));

  return NextResponse.json({ resume });
}

export async function POST() {
  const { userId } = auth();

  if (!userId) return NextResponse.redirect("/sign-in");

  const params: NewResume = {
    user_id: userId,
  };

  const resume = await insertResume(params);

  return NextResponse.json({ resume });
}
