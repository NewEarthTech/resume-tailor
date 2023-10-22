import { ResumeForm } from "@/components/form/index";
import { PreviewPane } from "@/components/preview-pane";

export default function ResumeTailor() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-flow-col md:grid-cols-12">
      <div className="flex flex-col items-center justify-start space-y-6 md:col-span-7 md:overscroll-none">
        <PreviewPane />
      </div>
      <div className="space-y-6 md:col-span-5">
        <ResumeForm />
      </div>
    </div>
  );
}
