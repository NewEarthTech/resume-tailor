import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(request: Request) {
  const { userId, sessionId } = auth();
  if (!sessionId) {
    return NextResponse.json({ id: null }, { status: 401 });
  }
  return NextResponse.json({ id: userId }, { status: 200 });
}
