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
    <Accordion type="single" collapsible>
      <AccordionItem
        value={`${path}.accordion`}
        className="transition-all [&[data-state=open]]:rounded-sm [&[data-state=open]]:bg-popover [&[data-state=open]]:drop-shadow-sm"
      >
        <CardHeader className="relative flex flex-row items-center gap-3">
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
          <AccordionTrigger
            noIcon
            className="my-0 flex cursor-pointer flex-row items-center gap-x-1 justify-self-start py-1 open:pb-2"
          >
            <CardTitle className="text-left text-lg">{title}</CardTitle>
          </AccordionTrigger>
          <Select
            value={sectionType}
            onValueChange={(e) => {
              update(`${path}.sectionType`, e);
              form.setValue(
                `${path}.sectionType` as keyof ResumeState,
                e as keyof ResumeState["sections"][0],
              );
            }}
          >
            <SelectTrigger className="m-0 ml-[1.1rem] w-32 capitalize">
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
        </CardHeader>
        <AccordionContent className="relative">
          <Separator className="mx-5 border-[1px]" />
          <CardContent>
            <Accordion
              type="single"
              collapsible
              defaultValue="contactInformation.entries.0.accordionItem"
            >
              {entries?.map((entry: ResumeEntryGeneric, i: number) => (
                <ResumeFormSectionEntry
                  key={`${path}.entries.${i}.formSectionEntryMap`}
                  path={`${path}.entries.${i}`}
                  form={form}
                  entry={entry}
                />
              ))}
            </Accordion>
          </CardContent>
          <CardFooter className="justify-end gap-4">
            <Button asChild variant="outline">
              <AccordionTrigger className="[&[data-state=open]>svg]:-rotate-180">
                Close Pane
              </AccordionTrigger>
            </Button>
            <Button className="whitespace-nowrap" variant="default">
              + Add Entry
            </Button>
          </CardFooter>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
