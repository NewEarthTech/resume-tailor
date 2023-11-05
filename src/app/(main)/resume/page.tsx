import getResumes from "@/db/actions/resume/get-many";

import ResumeListing from "@/components/resume-listing";

export default async function ResumeIndex() {
  return <ResumeListing />;
}
