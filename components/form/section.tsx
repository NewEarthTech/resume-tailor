import {
  ContactInformationEntry,
  ResumeEntryGeneric,
  ResumeSectionEntry,
  ResumeState,
  resumeState,
  sectionType as sectionTypeSchema,
  useStore,
} from "@/app/store";
import { Separator } from "@radix-ui/react-select";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResumeFormSectionEntry } from "./entry";

export function ResumeFormSection({
  title,
  sectionType,
  entries,
  form,
  path,
  include,
}: {
  title: string;
  sectionType: string;
  entries:
    | (ResumeSectionEntry & { index?: number })[]
    | [ContactInformationEntry];
  form: ReturnType<typeof useForm<z.infer<typeof resumeState>>>;
  path?: string;
  include: boolean;
}) {
  const { update } = useStore();
  return (
    // <Accordion
    //   type="single"
    //   collapsible
    //   defaultValue="contactInformation.accordionItem"
    // >
    <Card>
      {/* <AccordionItem value={"acc"}> */}
      <CardHeader className="relative">
        <div className="flex items-center justify-start gap-3">
          <Checkbox
            checked={include}
            onCheckedChange={(e) => {
              update(`${path}.include`, e);
              form.setValue(
                `${path}.include` as keyof ResumeState,
                e as keyof ResumeState["sections"][number],
              );
            }}
            className="bg-background"
          />
          {/* <AccordionTrigger
            count={entries.length}
            className="my-0 flex cursor-pointer items-center justify-between py-1 open:pb-2"
          > */}
          <CardTitle className=" flex flex-row items-start justify-between gap-x-20 text-lg">
            {title}
          </CardTitle>
          {/* </AccordionTrigger> */}
        </div>
      </CardHeader>
      {/* <AccordionContent className="relative"> */}
      <Separator className="mx-5 border-[1px]" />
      <CardContent>
        {/* <Accordion
          type="single"
          collapsible
          defaultValue="contactInformation.entries.0.accordionItem"
        > */}
        {entries?.map((entry: ResumeEntryGeneric, i: number) => (
          <ResumeFormSectionEntry
            key={`${path}.entries.${i}.formSectionEntryMap`}
            path={`${path}.entries.${i}`}
            form={form}
            entry={entry}
          />
        ))}
        {/* </Accordion> */}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Select
          value={sectionType}
          onValueChange={(e) => {
            update(`${path}.type`, e);
            form.setValue(
              `${path}.type` as keyof ResumeState,
              e as keyof ResumeState["sections"][0],
            );
          }}
        >
          <SelectTrigger className="right-0 top-[.45rem] m-0 mx-[1.1rem]">
            <SelectValue className="capitalize" placeholder={"Layout"} />
          </SelectTrigger>
          <SelectContent>
            {sectionTypeSchema.options.map(
              (typeOption: z.infer<typeof sectionTypeSchema>, i: number) => (
                <SelectItem
                  key={`${path}.${title}.select.type.${i}.${typeOption}`}
                  value={typeOption}
                  className="capitalize"
                >
                  {typeOption}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
        <Button variant="default">Add Entry</Button>
      </CardFooter>
      {/* </AccordionContent> */}
      {/* </AccordionItem> */}
    </Card>
    // </Accordion>
  );
}
