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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { ResumeFormField } from "./field";

export function ResumeFormSectionEntry({
  entry,
  form,
  path,
}: {
  entry:
    | keyof ResumeState["sections"][number]["entries"]
    | ResumeState["contactInformation"]["entries"][0];
  form: ReturnType<typeof useForm<z.infer<typeof resumeState>>>;
  path: string;
}) {
  const { update } = useStore();

  useEffect(() => {
    update(`${path}.include`, entry.include);
  }, [entry.include, path, update]);
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={`contactInformation.entries.0.accordion`}
    >
      <AccordionItem className="ml-1" value={`${path}.accordion`}>
        <div className="flex items-center justify-start gap-4 py-4">
          <Checkbox
            checked={entry.include}
            className="scale-90"
            onCheckedChange={(e) =>
              form.setValue(
                `${path}.include` as keyof ResumeState,
                e as keyof ResumeState["sections"][0],
              )
            }
          />
          <AccordionTrigger
            count={Object.entries(entry).length - 1}
            className="flex justify-start gap-2"
          >
            <Label className="text-left" htmlFor="include">
              <h3 className="overflow-hidden whitespace-normal text-base font-semibold">
                {!!entry.myName ? entry.myName : entry.title}
              </h3>
              <h4 className="overflow-hidden text-sm font-medium">
                {!!entry.jobTitle
                  ? entry.jobTitle
                  : entry.summary || entry.entity}
                {entry.entity}
              </h4>
            </Label>
          </AccordionTrigger>
        </div>
        <AccordionContent>
          {Object.entries(entry).map(([key, value], j) => (
            <ResumeFormField
              key={`${path}.${key}.formFieldMap`}
              fieldName={key as keyof ResumeState}
              value={value}
              form={form}
              path={`${path}.${key}`}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
