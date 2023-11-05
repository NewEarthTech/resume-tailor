import getResumes from "@/db/actions/resume/get-many";
import insertResume from "@/db/actions/resume/insert";

import { DataTable } from "@/components/content/data-table";
import { columns } from "../../../components/content/data-table/columns";

export default async function ResumeIndex() {
  const { rows } = await getResumes();

  return (
    <div className="container mx-auto h-full w-full py-10">
      <DataTable columns={columns} data={rows} insertResume={insertResume} />
    </div>
  );
}
