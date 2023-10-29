import * as React from "react";
import type { Resume } from "@/db/schema/resume";
import { auth, currentUser } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function ResumeIndex() {
  const { userId } = auth();

  ("use server");
  const { rows }: { rows: Resume[] } =
    await sql<Resume>`SELECT * FROM resume WHERE user_id = ${userId}`;

  return (
    <div className="container mx-auto h-full w-full py-10">
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
