"use client";

// import {
// ContactInformationEntry,
// DefaultResume,
// resumeState,
// useStore,
// type ResumeSectionEntry,
// type ResumeState,
// } from "@/store/store";
import getResume from "@/db/actions/resume/get-one";
import {
  insertResumeSchema,
  NewResume,
  Resume,
  selectResumeSchema,
} from "@/db/schema/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// import { ResumeFormSection } from "./section";

export function ResumeForm({ resume }: { resume: Resume }) {
  // const { sections, ...state } = useStore();
  const form = useForm<z.infer<typeof selectResumeSchema>>({
    // const form = useForm({
    resolver: zodResolver(insertResumeSchema),
    defaultValues: {
      ...resume,
      // ...DefaultResume,
      // resumeName: `${new Date().toISOString().substring(0, 10)}-`,
      // resumeId: crypto.randomUUID(),
    },
  });
  // const onSubmit: SubmitHandler<ResumeState> = (values) => console.log(values);
  const onSubmit: SubmitHandler<NewResume> = (values: any) =>
    console.log(values);
  // const contactInformation = form.watch().contactInformation;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>
        {/* <ResumeFormSection
          title={contactInformation.title}
          path={"contactInformation"}
          sectionType={contactInformation.sectionType}
          entries={contactInformation.entries as [ContactInformationEntry]}
          include={contactInformation.include}
          form={form}
        /> */}
        {/* {form.getValues().sections.map((section, i) => {
          return (
            <ResumeFormSection
              path={`sections.${i}`}
              key={`sections.${i}.root`}
              title={section.title}
              sectionType={section.sectionType}
              entries={section.entries || []}
              include={section.include}
              form={form}
            />
          );
        })} */}
        <div className="mx-4 flex justify-stretch gap-4">
          <Button
            variant="destructive"
            type="reset"
            className="w-full"
            onClick={(e) => form.clearErrors()}
          >
            Reset
          </Button>
          <Button variant="default" className="w-full" type="submit">
            Submit
          </Button>
        </div>
        {/* {Object.entries(form.formState.errors).length > 0 ? (
          <pre className="text-destructive">
          </pre>
        ) : null} */}
      </form>
    </Form>
  );
}

{
  /* {JSON.stringify(form.formState.errors, null, 2)} */
}
