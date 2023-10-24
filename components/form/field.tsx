import { Fragment } from "react";
import {
  FieldValueDataTypes,
  resumeState,
  useStore,
  type ResumeState,
} from "@/app/store";
import { cva } from "class-variance-authority";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn, titleCase } from "@/lib/utils";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

const exclude: {
  [key: string]: boolean;
} = {
  include: true,
};

const ResumeFormField = ({
  form,
  fieldName,
  value,
  path,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof resumeState>>>;
  fieldName: keyof ResumeState;
  value: FieldValueDataTypes;
  path: string;
}) => {
  const { update } = useStore();
  if (exclude[fieldName]) return null;
  return (
    <FormField
      name={fieldName as keyof ResumeState}
      control={form.control}
      render={({ field }) => {
        field.onChange = (e) => {
          update(path, e.target.value as FieldValueDataTypes);
          form.setValue(path as keyof ResumeState, e.target.value);
        };
        return (
          <FormItem>
            <div className="mb-4 grid w-full gap-1.5">
              <Label htmlFor={field.name}>{titleCase(fieldName)}</Label>
              <FormControl>
                {typeof value === "string" ? (
                  fieldName === ("summary" as keyof ResumeState) ? (
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
          </FormItem>
        );
      }}
    />
  );
};

export { ResumeFormField };
