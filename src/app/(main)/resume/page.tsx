import getResumes from "@/db/actions/resume/get-many";
import insertResume from "@/db/actions/resume/insert";

import { DataTable } from "@/components/resume-listing";
import { columns } from "../../../components/resume-listing/columns";

export default async function ResumeIndex() {
  const { rows } = await getResumes();

  return (
    <div className="container mx-auto h-full w-full py-10">
      <DataTable columns={columns} data={rows} insertResume={insertResume} />
    </div>
  );
}
