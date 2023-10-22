"use client";

import * as z from "zod";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ContactInformation,
  ContactInformationEntry,
  FieldValueDataTypes,
  ResumeEntryGeneric,
  ResumeSection,
  ResumeSectionEntry,
  sectionType as sectionTypeSchema,
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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@radix-ui/react-select";

const ToDoComponent = ({ value }: { value: FieldValueDataTypes }) => {
  return (
    <Fragment>
      <span className="text-xs">
        {`// TODO: implement ${typeof value} controller`}
      </span>
      <Input value={value.toString()} disabled />
    </Fragment>
  );
};

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
  const { update } = useStore();
  return (
    <FormField
      name={fieldName as keyof ResumeState}
      control={form.control}
      render={({ field }) => {
        field.onChange = (e) => {
          // console.log("e.target.value", e.target.value);
          update(path, value as FieldValueDataTypes);
          form.setValue(path as keyof ResumeState, e.target.value);
        };
        return (
          <FormItem className="space-y-2">
            {fieldName !== "include" ? (
              <div className="grid w-full gap-1.5 mb-2">
                <Label htmlFor={field.name}>{titleCase(fieldName)}</Label>
                <FormControl>
                  {typeof value === "string" ? (
                    fieldName === "summary" ? (
                      <Textarea
                        placeholder="Type your message here."
                        value={value}
                        onChange={field.onChange}
                      />
                    ) : (
                      <Input value={value} onChange={field.onChange} />
                    )
                  ) : (
                    <ToDoComponent value={value} />
                  )}
                </FormControl>
              </div>
            ) : null}
          </FormItem>
        );
      }}
    />
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
  const { update } = useStore();

  useEffect(() => {
    update(`${path}.include`, entry.include);
  }, [entry.include, path, update]);
  return (
    <AccordionItem value={path}>
      <div className="flex items-center gap-4 justify-end">
        <Checkbox
          checked={entry.include}
          onCheckedChange={(e) =>
            // @ts-expect-error
            form.setValue(`${path}.include` as keyof ResumeState, e)
          }
          className=""
          // onCheckedChange={(e) => update(`${path}.include`, e)}
        />
        <AccordionTrigger
          count={Object.entries(entry).length - 1}
          className="flex justify-between gap-7"
        >
          <Label className="text-left" htmlFor="include">
            <h3 className="text-base font-semibold overflow-hidden whitespace-normal">
              {/* @ts-expect-error */}
              {!!entry.myName ? entry.myName : entry.title}
            </h3>
            <h4 className="text-sm font-medium overflow-hidden">
              {/* @ts-expect-error */}
              {!!entry.jobTitle
                ? /* @ts-expect-error */
                  entry.jobTitle
                : /* @ts-expect-error */
                  entry.summary || entry.entity}
            </h4>
          </Label>
          <div className="text-xs"></div>
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
  useStore.subscribe((state) => state.sections[0]);
  return (
    <Card>
      <Accordion type="multiple">
        <AccordionItem value={`${title}-section-accordion-${path}`}>
          <CardHeader className="relative">
            <div className="flex gap-3 justify-between items-center">
              <Checkbox
                checked={include}
                onCheckedChange={(e) =>
                  // @ts-expect-error
                  form.setValue(`${path}.include` as keyof ResumeState, e)
                }
                className="bg-background"
                // onCheckedChange={(e) => update(`${path}.include`, e)}
              />
              <AccordionTrigger
                count={entries.length}
                className="flex py-1 open:pb-2 my-0 justify-between cursor-pointer items-center"
              >
                <CardTitle className=" flex flex-row gap-x-20 text-lg items-start justify-between">
                  {title}
                </CardTitle>
              </AccordionTrigger>
            </div>
          </CardHeader>
          <AccordionContent className="relative">
            <Separator className="border-[1px] mx-5" />
            <CardContent>
              <Accordion type="multiple">
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
                <SelectTrigger className="m-0 right-0 top-[.45rem] mx-[1.1rem]">
                  <SelectValue className="capitalize" placeholder={"Layout"} />
                </SelectTrigger>
                <SelectContent>
                  {sectionTypeSchema.options.map(
                    (
                      typeOption: z.infer<typeof sectionTypeSchema>,
                      i: number
                    ) => (
                      <SelectItem
                        key={`${path}.${title}.select.type.${i}.${typeOption}`}
                        value={typeOption}
                        className="capitalize"
                      >
                        {typeOption}
                      </SelectItem>
                    )
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
        className="space-y-4 flex flex-col"
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
