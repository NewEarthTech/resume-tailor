"use client";

import { useEffect } from "react";
import {
  contactInformation,
  ContactInformationEntry,
  DefaultResume,
  ResumeEntryGeneric,
  ResumeSectionEntry,
  resumeState,
  sectionType as sectionTypeSchema,
  useStore,
  type ResumeState,
} from "@/app/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-select";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "../ui/checkbox";
import { ResumeFormField } from "./resume-form-field";

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
    // update(`${path}.include`, entry.include);
  }, [entry.include, path, update]);
  return (
    <AccordionItem value={`${path}.accordionItem`}>
      <div className="flex items-center justify-start gap-4 py-4">
        <Checkbox
          checked={entry.include}
          onCheckedChange={(e) =>
            form.setValue(
              `${path}.include` as keyof ResumeState,
              e as keyof ResumeState["sections"][0],
            )
          }
          className=""
          // onCheckedChange={(e) => update(`${path}.include`, e)}
        />
        <AccordionTrigger
          count={Object.entries(entry).length - 1}
          className="flex justify-between gap-7"
        >
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
          {/* <div className="text-xs"></div> */}
        </AccordionTrigger>
      </div>
      <AccordionContent>
        {Object.entries(entry).map(([key, value], j) => (
          <ResumeFormField
            key={`${path}.${key}.formFieldMap`}
            fieldName={key as keyof typeof entry}
            value={value}
            form={form}
            path={`${path}.${key}`}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

function ResumeFormSection({
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
  return (
    <Card>
      <Accordion
        type="single"
        collapsible
        defaultValue="contactInformation.accordionItem"
      >
        <AccordionItem value={`${path}.accordionItem`}>
          <CardHeader className="relative">
            <div className="flex items-center justify-start gap-3">
              <Checkbox
                checked={include}
                // onCheckedChange={(e) =>
                // form.setValue(`${path}.include` as keyof ResumeState, e)
                // }
                className="bg-background"
                // onCheckedChange={(e) => update(`${path}.include`, e)}
              />
              <AccordionTrigger
                count={entries.length}
                className="my-0 flex cursor-pointer items-center justify-between py-1 open:pb-2"
              >
                <CardTitle className=" flex flex-row items-start justify-between gap-x-20 text-lg">
                  {title}
                </CardTitle>
              </AccordionTrigger>
            </div>
          </CardHeader>
          <AccordionContent className="relative">
            <Separator className="mx-5 border-[1px]" />
            <CardContent>
              <Accordion
                type="single"
                collapsible
                defaultValue="contactInformation.entries.0.accordionItem"
              >
                {entries?.map((entry: ResumeEntryGeneric, j: number) => (
                  <ResumeFormSectionEntry
                    key={`${path}.entries.${j}.formSectionEntryMap`}
                    path={`${path}.entries.${j}`}
                    form={form}
                    entry={entry}
                  />
                ))}
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Select value={sectionType} onValueChange={(e) => console.log(e)}>
                <SelectTrigger className="right-0 top-[.45rem] m-0 mx-[1.1rem]">
                  <SelectValue className="capitalize" placeholder={"Layout"} />
                </SelectTrigger>
                <SelectContent>
                  {sectionTypeSchema.options.map(
                    (
                      typeOption: z.infer<typeof sectionTypeSchema>,
                      i: number,
                    ) => (
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

export function ResumeForm() {
  const form = useForm<z.infer<typeof resumeState>>({
    resolver: zodResolver(resumeState),
    defaultValues: {
      ...DefaultResume,
      resumeName: `${new Date().toISOString().substring(0, 10)}-`,
      resumeId: crypto.randomUUID(),
    },
  });
  const onSubmit: SubmitHandler<ResumeState> = (values) => console.log(values);
  const contactInformation = form.watch().contactInformation;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <ResumeFormSection
          title={contactInformation.title}
          path={"contactInformation"}
          sectionType={contactInformation.sectionType}
          entries={contactInformation.entries as [ContactInformationEntry]}
          include={contactInformation.include}
          form={form}
        />
        {form.watch().sections.map((section, i) => {
          return (
            <ResumeFormSection
              path={`sections.${i}`}
              key={`sections.${i}.root`}
              form={form}
              title={section.title}
              sectionType={section.sectionType}
              entries={section.entries || []}
              include={section.include}
            />
          );
        })}
        <div className="flex justify-end gap-4">
          <Button
            variant="destructive"
            type="reset"
            onClick={(e) => form.clearErrors()}
          >
            Reset
          </Button>
          <Button variant="default" type="submit">
            Submit
          </Button>
        </div>
        {Object.entries(form.formState.errors).length > 0 ? (
          <pre className="text-destructive">
            {JSON.stringify(form.formState.errors, null, 2)}
          </pre>
        ) : null}
      </form>
    </Form>
  );
}
