import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { insertResume } from "@/db/actions/resume";
import { insertJobSchema } from "@/db/schema/job";
import {
  insertResumeSchema,
  NewResume,
  Resume,
  ResumeTable,
} from "@/db/schema/resume";
import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return NextResponse.json(
    await db.select().from(ResumeTable).where(eq(ResumeTable.id, params.id)),
  );
}

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   const { userId } = auth();

//   if (!userId) return NextResponse.redirect("/sign-in");

//   const resume = await db
//     .select()
//     .from(ResumeTable)
//     .where(eq(ResumeTable.user_id, userId))
//     .where(eq(ResumeTable.id, params.id));

//   if (!resume) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   const insert = insertResumeSchema.parse(request.body);

//   return NextResponse.json({ resume: await insertResume(insert) });
// }
