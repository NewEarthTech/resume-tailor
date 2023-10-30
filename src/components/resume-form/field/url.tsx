"use client";

import { useParams } from "next/navigation";
import { updateResume } from "@/db/actions/resume";
import { useAuth } from "@clerk/nextjs";
import { Globe, GlobeIcon, Link2, TypeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function URLField({ resumeId }: { resumeId: string }) {
  const updateResumeWithId = updateResume.bind(null, resumeId);
  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <form
      className="w-full"
      //   action={(e) => {
      //     "use server";
      //     updateResumeWithId(e);
      //   }}
    >
      <pre className="flex-0 flex w-full items-center self-start border-[1px] border-solid border-border pl-3 text-left">
        <span className="flex pr-3">
          <GlobeIcon className="stroke-1.25 fill-background stroke-foreground pr-1.5" />
          /resume/
        </span>
        <label htmlFor="custom_url" className="sr-only">
          URL field
        </label>
        <Input
          className="border-r-none flex-1 text-base"
          name="custom_url"
          defaultValue={resumeId}
          onChange={handleURLChange}
        />
        <Button
          type="submit"
          className="w-[60px] cursor-pointer rounded-l-none text-base"
          asChild
        >
          <Link2 />
        </Button>
      </pre>
    </form>
  );
}
