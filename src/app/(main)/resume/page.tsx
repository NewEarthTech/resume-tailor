import { getResumes, insertResume } from "@/db/actions/resume";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function ResumeIndex() {
  const { rows } = await getResumes();

  return (
    <div className="container mx-auto h-full w-full py-10">
      <DataTable columns={columns} data={rows} insertResume={insertResume} />
    </div>
  );
}
