import { ResumeForm } from "@/components/form/index";
import { PreviewPane } from "@/components/preview-pane";

export default function ResumeTailor() {
  return (
    <div className="relative flex flex-col-reverse gap-6 md:grid md:grid-flow-col md:grid-cols-12">
      <div className="relative z-0 flex flex-col items-center justify-start space-y-6 md:col-span-7 md:overscroll-none">
        <PreviewPane />
      </div>
      <div className="sticky top-0 z-10 max-h-[30vh] space-y-6 overflow-y-scroll bg-muted print:hidden md:col-span-5 md:max-h-[initial]">
        <ResumeForm />
      </div>
    </div>
  );
}
