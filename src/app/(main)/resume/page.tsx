import type { Resume } from "@/db/schema/resume";
import { sql } from "@vercel/postgres";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function ResumeIndex() {
  "use server";
  const { rows }: { rows: Resume[] } =
    await sql`SELECT * FROM resume WHERE user_id = 1`;

  return (
    <div className=" container mx-auto h-full w-full  py-10">
      {/* {JSON.stringify(rows)} */}
      {rows ? <DataTable columns={columns} data={rows} /> : null}
    </div>
  );
}
