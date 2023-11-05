"use server";

import getResume from "@/db/actions/resume/get-one";
import updateResume from "@/db/actions/resume/update";

import { PreviewPane } from "@/components/preview-pane";
import { ResumeForm } from "@/components/resume-form";
import { URLField } from "@/components/resume-form/url";

export default async function ResumeTailor({
  params: { id },
}: {
  params: { id: string };
}) {
  const resume = await getResume(id);

  return (
    <>
      <div className="relative flex flex-col-reverse gap-6 md:grid md:grid-flow-col md:grid-cols-12 md:p-5">
        <div className="relative z-0 flex flex-col items-start justify-start space-y-6 md:col-span-7 md:overscroll-none">
          <PreviewPane />
        </div>
        <div className="sticky top-0 z-10 space-y-6 overflow-y-scroll print:hidden md:col-span-5 md:max-h-[initial]">
          <ResumeForm updateResume={updateResume} resume={resume} />
        </div>
      </div>
      <pre>{JSON.stringify(resume, null, 2)}</pre>
    </>
  );
}
