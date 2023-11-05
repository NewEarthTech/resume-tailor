"use client";

import { useParams } from "next/navigation";
import updateResume, { UpdateResumeFunction } from "@/db/actions/resume/update";
import { Resume } from "@/db/schema/resume";
import { useAuth } from "@clerk/nextjs";
import { Update } from "drizzle-orm";
import { Globe, GlobeIcon, Link2, TypeIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormField } from "../ui/form";
import { toast } from "../ui/use-toast";

export function URLField({
  resume,
  updateResume,
}: {
  resume: Resume;
  updateResume: UpdateResumeFunction;
}) {
  const formContext = useFormContext();

  const handleURLChange = (e: any) => {
    formContext.setValue(
      "custom_url",
      e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    );
  };

  const handleSubmit = async (e: unknown) => {
    formContext.handleSubmit(formContext.getValues().custom_url);
    // updateResume(resume);
    toast({
      title: "URL updated",
      description: JSON.stringify(resume.custom_url, null, 2),
    });
  };
  return (
    <>
      <pre className="flex-0 flex w-full items-center self-start border-[1px] border-solid border-border pl-3 text-left">
        <span className="flex pr-3">
          <GlobeIcon className="stroke-1.25 fill-background stroke-foreground pr-1.5" />
          /
        </span>
        <label htmlFor="custom_url" className="sr-only">
          URL field
        </label>
        <Input
          className="border-r-none flex-1 text-base"
          placeholder={resume.id}
          defaultValue={resume.custom_url || resume.id}
          {...formContext.register("custom_url")}
          onChange={handleURLChange}
        />
        <Button
          type="submit"
          className="w-[60px] cursor-pointer rounded-l-none text-base"
        >
          <Link2 />
        </Button>
      </pre>
    </>
  );
}
