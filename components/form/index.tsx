"use client";

import * as z from "zod";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResumeSection, useStore } from "@/app/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { resumeState, type ResumeState, DefaultResume } from "@/app/store";
import { forwardRef, useEffect } from "react";
import { titleCase } from "@/lib/utils";

type ResumeFormType = ReturnType<typeof useForm<z.infer<typeof resumeState>>>;

const ResumeFormField = ({
  i,
  form,
  section,
  fieldName,
  value,
}: {
  i: number;
  form: ReturnType<typeof useForm<z.infer<typeof resumeState>>>;
  section: number;
  fieldName: string;
  value: string | string[];
}) => {
  const { updateSection } = useStore();
  useEffect(() => {
    // console.log("ResumeFormField", i, section, fieldName, value);
    // console.log(`fields.${fieldName}`, value);
    console.log("section", section);
    console.log("fieldName", fieldName);
    console.log("value", value);
    updateSection(section, `fields.${fieldName}`, value);
  }, [value]);
  return (
    <FormField
      name={fieldName as keyof ResumeState}
      control={form.control}
      render={({ field }) => {
        field.onChange = (e) => {
          // form.setValue(fieldName as keyof ResumeState, e.target.value);
          form.setValue(
            `sections.${i}.fields.${
              fieldName as keyof ResumeSection["fields"]
            }`,
            e.target.value
          );
          // control._formValues.sections[section].fields[fieldName] =
          //   e.target.value;
          // control.setValue(fieldName, e.target.value)
          // control.setValue();
          console.log("onChange", e.target.value);
          // updateSection(i, `fields.${fieldName}`, e.target.value);
          // field.onChange(e);
        };
        return (
          <FormItem className="space-y-2">
            <Label htmlFor={field.name}>{titleCase(fieldName)}</Label>
            <FormControl>
              <Input
                value={
                  form.watch().sections[section].fields[
                    fieldName as keyof ResumeSection["fields"]
                  ]
                }
                onChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

const ResumeFormSectionFields = forwardRef(
  (
    {
      title,
      section,
      form,
      fields,
    }: {
      title: string;
      section: number;
      form: ReturnType<typeof useForm<z.infer<typeof resumeState>>>;
      fields: ResumeSection["fields"] | ResumeState["contactInformation"];
    },
    ref
  ) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <pre>{JSON.stringify(fields, null, 2)}</pre>
          {Object.entries(fields).map(([key, value], j) => (
            <ResumeFormField
              key={`${section}-${j}`}
              i={section}
              section={section}
              fieldName={key as keyof typeof fields}
              value={fields[key as keyof typeof fields]}
              form={form}
            />
          ))}
        </CardContent>
      </Card>
    );
  }
);

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
        {form.watch().sections.map(({ title, type, fields }, i) => {
          return (
            <ResumeFormSectionFields
              title={title}
              key={i}
              section={i}
              form={form}
              fields={fields}
            />
          );
        })}
        <div className="flex justify-end gap-4">
          <Button variant="destructive" type="reset">
            Reset
          </Button>
          <Button type="submit">Submit</Button>
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
