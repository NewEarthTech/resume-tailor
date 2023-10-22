"use client";

import * as z from "zod";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ContactInformation,
  ContactInformationEntry,
  FieldValueDataTypes,
  ResumeSection,
  ResumeSectionEntry,
  useStore,
} from "@/app/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { resumeState, type ResumeState, DefaultResume } from "@/app/store";
import { Fragment, Key, forwardRef, useEffect } from "react";
import { titleCase } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ResumeFormField = ({
  form,
  fieldName,
  value,
  path,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof resumeState>>>;
  fieldName: string;
  value: FieldValueDataTypes;
  path: string;
}) => {
  // console.log(`${path}.${fieldName}`);
  const { update } = useStore();
  useEffect(() => {
    // updateSection(section, `fields.${fieldName}`, value);
    console.log("value", value);
    // update(path, value as FieldValueDataTypes);
  }, [value]);
  return (
    <FormField
      name={fieldName as keyof ResumeState}
      control={form.control}
      render={({ field }) => {
        field.onChange = (e) => {
          form.setValue(path as keyof ResumeState, e.target.value);
        };
        return (
          <FormItem className="space-y-2">
            <Label htmlFor={field.name}>{titleCase(fieldName)}</Label>
            <FormControl>
              {typeof value === "string" ? (
                <Input value={value} onChange={field.onChange} />
              ) : (
                <>
                  type: {typeof value}
                  <pre suppressHydrationWarning>
                    type: {JSON.stringify(typeof value)}, value:{" "}
                    {JSON.stringify(value, null, 2)}
                  </pre>
                </>
              )}
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

const ResumeFormSectionEntryFields = ({
  form,
  entry,
  path,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof resumeState>>>;
  entry: ResumeSectionEntry | ContactInformationEntry;
  path: string;
}) => {
  // console.log(`${path}.ResumeFormSectionEntryFields`);
  return (
    <div>
      {Object.entries(entry).map(([key, value], j) => (
        <Fragment key={`${path}.${key}.fragment`}>
          <ResumeFormField
            key={`${path}.${key}.field`}
            fieldName={key as keyof typeof entry}
            value={value}
            form={form}
            path={`${path}.${key}`}
          />
          <pre suppressHydrationWarning>{JSON.stringify(value, null, 2)}</pre>
        </Fragment>
      ))}
    </div>
  );
};

export function ResumeFormSectionEntry({
  entry,
  form,
  path,
}: {
  entry: ResumeSectionEntry | ContactInformationEntry;
  form: ReturnType<typeof useForm<z.infer<typeof resumeState>>>;
  path: string;
}) {
  // console.log(`${path}.ResumeFormSectionEntry`);
  const { update } = useStore();
  useEffect(() => {
    update(`${path}.include`, entry.include);
  }, [form.watch()]);
  return (
    <AccordionItem value={path}>
      <div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={entry.include}
            onCheckedChange={(e) => form.setValue(`${path}.include`, e)}
          />
          <Label className="text-base" htmlFor="include">
            {entry.title} - {entry.entity}
          </Label>
        </div>
        <AccordionTrigger className="flex text-sm items-center gap-1"></AccordionTrigger>
        <AccordionContent>
          <ResumeFormSectionEntryFields form={form} entry={entry} path={path} />
        </AccordionContent>
      </div>
    </AccordionItem>
  );
}

function ResumeFormSection({
  title,
  type,
  sectionIndex,
  entries,
  form,
  path,
}: {
  title: string;
  type: string;
  sectionIndex?: number;
  entries: ResumeSectionEntry[] | [ContactInformationEntry];
  form: ReturnType<typeof useForm<z.infer<typeof resumeState>>>;
  path?: string;
}) {
  // console.log(`${path}.ResumeFormSection`);
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex flex-row gap-x-20 items-start justify-between">
          {title}
        </CardTitle>
        <Select>
          <SelectTrigger className="m-0 absolute right-0 top-[.45rem] mx-[1.1rem]">
            <SelectValue placeholder="Layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={type}>{type}</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple">
          {entries?.map(
            (
              entry: ResumeSectionEntry | ContactInformationEntry,
              j: number
            ) => (
              <ResumeFormSectionEntry
                key={j}
                path={`${path}.entries.${j}`}
                form={form}
                entry={entry}
              />
            )
          )}
        </Accordion>
      </CardContent>
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
        className="space-y-8 flex flex-col"
      >
        <ResumeFormSection
          title={contactInformation.title}
          path={"contactInformation"}
          type={contactInformation.type}
          entries={contactInformation.entries as [ContactInformationEntry]}
          form={form}
        />

        {form.watch().sections.map((section, i) => (
          <ResumeFormSection
            title={section.title}
            type={section.type}
            entries={section.entries as ResumeSectionEntry[]}
            sectionIndex={i}
            path={`sections.${i}`}
            form={form}
            key={`section-${i}-root`}
          />
        ))}
        <div className="flex justify-end gap-4">
          <Button variant="destructive" type="reset">
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
