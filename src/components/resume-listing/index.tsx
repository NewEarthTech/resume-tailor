import getResumes from "@/db/actions/resume/get-many";
import insertResume from "@/db/actions/resume/insert";
import { Resume } from "@/db/schema/resume";

import { handleInsert } from "@/components/create-resume-button";
import { columns } from "@/components/resume-listing/columns";
import { DataTable } from "./data-table";

export default async function ResumeListing() {
  const { rows } = await getResumes();
  return (
    <DataTable
      columns={columns}
      data={rows}
      handleInsert={handleInsert}
      insertResume={insertResume}
    />
  );
}
