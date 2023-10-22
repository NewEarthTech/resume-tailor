"use client";

import * as z from "zod";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResumeSection, ResumeSectionEntry, useStore } from "@/app/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { resumeState, type ResumeState, DefaultResume } from "@/app/store";
import { Fragment, forwardRef, useEffect } from "react";
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
  // section,
  fieldName,
  value,
}: // i,
{
  // i: number;
  form: ReturnType<typeof useForm<z.infer<typeof resumeState>>>;
  // section: number;
  fieldName: string;
  value: string | string[] | boolean;
}) => {
  const { updateSection } = useStore();
  // useEffect(() => {
  // updateSection(section, `fields.${fieldName}`, value);
  // }, [value]);
  return (
    <FormField
      name={fieldName as keyof ResumeState}
      control={form.control}
      render={({ field }) => {
        // field.onChange = (e) => {
        //   form.setValue(
        //     `sections.${i}.fields.${
        //       fieldName as keyof ResumeSection["fields"]
        //     }`,
        //     e.target.value
        //   );
        // };
        return (
          <FormItem className="space-y-2">
            {/* <Label htmlFor={field.name}>{titleCase(fieldName)}</Label> */}
            <FormControl>
              <Input
                // value={
                //   form.watch().sections[section].fields[
                //     fieldName as keyof ResumeSection["fields"]
                //   ]
                // }
                onChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

const ResumeFormSectionEntryFields = forwardRef(
  (
    {
      section,
      form,
      entry,
    }: {
      section?: number;
      form: ReturnType<typeof useForm<z.infer<typeof resumeState>>>;
      entry: ResumeSectionEntry;
      // fields: ResumeSection["fields"] | ResumeState["contactInformation"];
    },
    ref
  ) => {
    return (
      <div>
        {Object.entries(entry).map(([key, value], j) => (
          <Fragment key={`section-${section}-entry-${j}`}>
            <ResumeFormField
              key={`section-${section}-entry-${j}`}
              //   i={section}
              //   section={section}
              fieldName={key as keyof typeof entry}
              value={value}
              form={form}
            />
            <pre>{JSON.stringify(key, null, 2)}</pre>
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </Fragment>
        ))}
      </div>
    );
  }
);

export function ResumeFormSectionEntry({
  entry: { title, ...entry },
  sectionIndex,
  entryIndex,
  form,
}: {
  entry: ResumeSectionEntry;
  sectionIndex: number;
  entryIndex: number;
  form: ReturnType<typeof useForm<z.infer<typeof resumeState>>>;
}) {
  // const { updateEntry } = useStore();
  const path = `sections.${sectionIndex}.entries.${entryIndex}`;
  // const entry = useStore(
  //   (state) => state?.sections[sectionIndex]?.entries[entryIndex]
  // );
  useEffect(() => {
    // update(`${path}.include`, entry.include);
    // updateSection(sectionIndex, `entries.${entryIndex}.include`, entry.include)
    // updateEntry(sectionIndex, entryIndex, "include", entry.include);
  }, [entry.include]);
  // }, [form.watch().sections[sectionIndex].entries[entryIndex].include]);
  useEffect(() => {
    console.log(form.watch().sections[sectionIndex].entries?.length);
  }, [form.watch().sections[sectionIndex].entries?.length]);
  return (
    <AccordionItem value={path}>
      <div className="flex items-center gap-2">
        <Checkbox
        // checked={
        //   form.watch().sections[sectionIndex].entries[entryIndex].include
        // }
        // onCheckedChange={(e) =>
        //   form.setValue(
        //     `sections.${sectionIndex}.entries[${entryIndex}].include`,
        //     e
        //   )
        // }
        />
        <Label className="text-lg" htmlFor="include">
          {title} - {entry.entity}
        </Label>
      </div>
      <AccordionTrigger className="flex items-center gap-1">
        Details...
      </AccordionTrigger>
      <AccordionContent>
        <ResumeFormSectionEntryFields
          section={sectionIndex}
          form={form}
          entry={entry}
        />
      </AccordionContent>
    </AccordionItem>
  );
}

function ResumeFormSection({
  sectionIndex,
  section,
  form,
}: {
  sectionIndex: number;
  section: ResumeSection;
  form: ReturnType<typeof useForm<z.infer<typeof resumeState>>>;
}) {
  return (
    <Card>
      <CardHeader className="">
        <CardTitle>{section?.title}</CardTitle>
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {section?.entries?.map((entry, j) => (
            <ResumeFormSectionEntry
              key={j}
              sectionIndex={sectionIndex}
              entryIndex={j}
              form={form}
              entry={entry}
            />
          ))}
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col"
      >
        {form.watch().sections.map((section, i) => (
          <ResumeFormSection
            section={section}
            sectionIndex={i}
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
