import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import { UpdateUserParams } from "@clerk/types";

/* 
Retrieve the current user
In some cases, you might need the current user in your Route Handler. 
Clerk provides an asynchronous helper called currentUser to retrieve it.
*/
export async function GET() {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  return NextResponse.json({ user });
}

// interacting with Clerk's API
export async function POST({ body }: NextRequest) {
  const { userId } = auth();

  if (!userId) return NextResponse.redirect("/sign-in");

  const user = await clerkClient.users.updateUser(
    userId,
    body as Partial<UpdateUserParams>,
  );

  return NextResponse.json({ user });
}
