"use client";

import * as z from "zod";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ResumeSection, useStore } from "@/app/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { resumeState, type ResumeState, DefaultResume } from "@/app/store";
import { Fragment, forwardRef, useEffect } from "react";
import { titleCase } from "@/lib/utils";

type ResumeFormType = ReturnType<typeof useForm<z.infer<typeof resumeState>>>;

const ResumeFormField = forwardRef(
  (
    {
      form,
      section,
      name,
      placeholder,
      value,
    }: {
      form: ResumeFormType;
      section: number;
      name: keyof ResumeSection["fields"];
      placeholder: string;
      value: string | string[];
    },
    ref
  ) => {
    return (
      <FormField
        control={form.control}
        name={name as string}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{titleCase(name)}</FormLabel>
            <FormControl>
              <Input name={name} />
            </FormControl>
            <FormDescription>
              {section}
              <br />
              {placeholder}
              <br />
              {name}
              <br />
              {JSON.stringify(value)}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

const ResumeFormSection = forwardRef(
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
          {Object.keys(fields).map((key, i) => {
            return (
              <ResumeFormField
                key={`${section}-${i}`}
                section={section}
                form={form}
                name={key as keyof typeof fields}
                value={fields[key as keyof typeof fields]}
                placeholder={titleCase(key)}
              />
            );
          })}
        </CardContent>
      </Card>
    );
  }
);

export function ResumeForm() {
  // const { update, updateSection } = useStore();
  const form = useForm<z.infer<typeof resumeState>>({
    resolver: zodResolver(resumeState),
    defaultValues: {
      ...DefaultResume,
      resumeName: `${new Date().toISOString().substring(0, 10)}-`,
      resumeId: crypto.randomUUID(),
    },
  });
  const onSubmit: SubmitHandler<ResumeState> = (values) => console.log(values);
  if (!form) return null;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col"
      >
        <ResumeFormSection
          title="Contact Information"
          section={-1}
          form={form}
          fields={form.watch().contactInformation}
        />
        {form.watch().sections.map(({ title, fields }, i) => (
          <ResumeFormSection
            key={i}
            section={i}
            title={title}
            form={form}
            fields={fields}
          />
        ))}
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
