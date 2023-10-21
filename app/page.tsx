import { PreviewPane } from "@/components/preview-pane";
import { ResumeForm } from "@/components/form/index";

export default function ResumeTailor() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:grid-flow-col">
      <div className="flex md:col-span-7 flex-col items-center justify-start space-y-6">
        <PreviewPane />
      </div>
      <div className="space-y-6 md:col-span-5">
        <ResumeForm />
      </div>
    </div>
  );
}
