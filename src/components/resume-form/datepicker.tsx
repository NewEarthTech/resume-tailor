"use client";

import * as React from "react";
import {
  FieldValueDataTypes,
  ResumeState,
  resumeState,
  useStore,
} from "@/store/store";
import { format, formatISO, lightFormat } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  value,
  form,
  path,
  className,
}: {
  value: Date | string | undefined;
  form: ReturnType<typeof useForm<z.infer<typeof resumeState>>>;
  path: keyof ResumeState;
  className?: string;
}) {
  const { update } = useStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(new Date(value), "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : new Date()}
          onSelect={(e) => {
            update(path, e?.toISOString() as FieldValueDataTypes);
            form.setValue(path as keyof ResumeState, e?.toISOString() || "");
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
