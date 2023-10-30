import { updateResume } from "@/db/actions/resume";
import { sql } from "@vercel/postgres";

import { PreviewPane } from "@/components/preview-pane";
import { ResumeForm } from "@/components/resume-form";
import { URLField } from "@/components/resume-form/field/url";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResumeTailor({
  params: { id },
}: {
  params: { id: string };
}) {
  const { rows } = await sql`SELECT * FROM resume WHERE id = ${id}`;
  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };
  const handleURLSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    "use server";
  };
  return (
    <div className="relative flex flex-col-reverse gap-6 md:grid md:grid-flow-col md:grid-cols-12 md:p-5">
      <div className="relative z-0 flex flex-col items-start justify-start space-y-6 md:col-span-7 md:overscroll-none">
        <URLField resumeId={id} />
        <PreviewPane />
      </div>
      <div className="sticky top-0 z-10 space-y-6 overflow-y-scroll print:hidden md:col-span-5 md:max-h-[initial]">
        <ResumeForm />
      </div>
    </div>
  );
}

{
  /* <pre>{JSON.stringify(rows, null, 2)}</pre> */
}
