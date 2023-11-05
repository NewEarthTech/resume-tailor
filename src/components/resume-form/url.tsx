"use client";

import { Resume } from "@/db/schema/resume";
import { GlobeIcon, Link2, TypeIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

export function URLField({ resume }: { resume: Resume }) {
  const formContext = useFormContext();
  const { pending } = useFormStatus();

  return (
    <pre className="flex-0 flex w-full items-center self-start border-[1px] border-solid border-border pl-3 text-left text-sm">
      <Label htmlFor="custom_url">
        <span className="flex items-center pr-3">
          <GlobeIcon
            size={20}
            className="stroke-1.25 fill-background stroke-foreground pr-1.5"
          />
          /
        </span>
        <span className="sr-only">URL field</span>
      </Label>
      <Input
        className="border-r-none flex-1 text-sm"
        placeholder={resume.id}
        defaultValue={resume.custom_url || resume.id}
        {...formContext.register("custom_url")}
        onChange={(e: any) => {
          formContext.setValue(
            "custom_url",
            e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          );
        }}
      />
      <Button
        type="submit"
        className="w-[60px] cursor-pointer rounded-l-none text-sm"
        disabled={pending}
        aria-disabled={pending}
      >
        <Link2 size={20} />
      </Button>
    </pre>
  );
}
