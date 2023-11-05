"use client";

import { useOptimistic } from "react";
import { UpdateResumeFunction } from "@/db/actions/resume/update";
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
import { toast } from "../ui/use-toast";
import { URLField } from "./url";

export function ResumeForm({
  resume,
  updateResume,
}: {
  resume: Resume;
  updateResume: UpdateResumeFunction;
}) {
  const [optimisticResume, setOptimisticResume] = useOptimistic<Resume>(resume);
  const form = useForm<z.infer<typeof selectResumeSchema>>({
    resolver: zodResolver(insertResumeSchema),
    values: optimisticResume,
  });

  const onSubmit: SubmitHandler<NewResume> = (values: any) => {
    setOptimisticResume(values);
    updateResume(values);
    //.then((res: true | { error: string }) =>
    //   toast({
    //     title: "Resume Updated",
    //     description: `Response: ${JSON.stringify(res)}`,
    //   }),
    // );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <URLField updateResume={updateResume} resume={resume} />
        <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>

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
        {Object.entries(form.formState.errors).length > 0 ? (
          <pre className="text-destructive">
            {JSON.stringify(form.formState.errors, null, 2)}
          </pre>
        ) : null}
      </form>
    </Form>
  );
}

{
  /* <ResumeFormSection
          title={contactInformation.title}
          path={"contactInformation"}
          sectionType={contactInformation.sectionType}
          entries={contactInformation.entries as [ContactInformationEntry]}
          include={contactInformation.include}
          form={form}
        /> */
}
{
  /* {form.getValues().sections.map((section, i) => {
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
        })} */
}
