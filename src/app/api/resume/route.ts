import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { insertResume } from "@/db/actions/resume";
import { NewResume, ResumeTable, selectResumeSchema } from "@/db/schema/resume";
import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import { eq, not } from "drizzle-orm";

export async function GET(request: Request) {
  const { userId, sessionId } = auth();

  console.log("request", request.headers);
  console.log("userId", userId);
  console.log("sessionId", sessionId);

  if (!sessionId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const resume = await db
    .select()
    .from(ResumeTable)
    .where(eq(ResumeTable.user_id, userId));

  if (!resume) return notFound();

  return NextResponse.json({ resume }, { status: 200 });
}

// export async function POST(_request: Request) {
//   const { userId } = auth();

//   if (!userId) return NextResponse.redirect("/sign-in");

//   const params: NewResume = selectResumeSchema.parse({
//     user_id: userId,
//   });

//   const resume = await insertResume(params);

//   return NextResponse.json({ resume });
// }
