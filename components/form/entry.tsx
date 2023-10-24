import { useEffect } from "react";
import {
  ContactInformationEntry,
  ResumeSectionEntry,
  resumeState,
  ResumeState,
  useStore,
} from "@/app/store";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ResumeFormField } from "./field";

export function ResumeFormSectionEntry({
  entry,
  form,
  path,
}: {
  entry: ResumeSectionEntry | ContactInformationEntry;
  form: ReturnType<typeof useForm<z.infer<typeof resumeState>>>;
  path: string;
}) {
  const { update } = useStore();

  useEffect(() => {
    update(`${path}.include`, entry.include);
  }, [entry.include, path, update]);
  return (
    // <AccordionItem value={`${path}.accordionItem`}>
    <>
      <div className="flex items-center justify-start gap-4 py-4">
        <Checkbox
          checked={entry.include}
          onCheckedChange={(e) =>
            form.setValue(
              `${path}.include` as keyof ResumeState,
              e as keyof ResumeState["sections"][0],
            )
          }
        />
        {/* <AccordionTrigger
          count={Object.entries(entry).length - 1}
          className="flex justify-between gap-7"
        > */}
        <Label className="text-left" htmlFor="include">
          <h3 className="overflow-hidden whitespace-normal text-base font-semibold">
            {/* {!!entry.myName ? entry.myName : entry.title} */}
            {entry.title}
          </h3>
          <h4 className="overflow-hidden text-sm font-medium">
            {/* {!!entry.jobTitle
                ? entry.jobTitle
                : entry.summary || entry.entity} */}
            {entry.entity}
          </h4>
        </Label>
        {/* </AccordionTrigger> */}
      </div>
      {/* <AccordionContent> */}
      {Object.entries(entry).map(([key, value], j) => (
        <ResumeFormField
          key={`${path}.${key}.formFieldMap`}
          fieldName={key as keyof typeof entry}
          value={value}
          form={form}
          path={`${path}.${key}`}
        />
      ))}
      {/* </AccordionContent> */}
      {/* </AccordionItem> */}
    </>
  );
}
