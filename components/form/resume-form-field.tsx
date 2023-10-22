import { Fragment } from "react";
import { FieldValueDataTypes } from "@/app/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField, FormItem } from "@/components/ui/form";
import { titleCase } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { resumeState, type ResumeState } from "@/app/store";
import * as z from "zod";
import { FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/app/store";

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
    if (fieldName === "include") return null;
  return (
    <FormField
      name={fieldName as keyof ResumeState}
      control={form.control}
      render={({ field }) => {
        field.onChange = (e) => {
          console.log("e.target.value", e.target.value);
          update(path, e.target.value as FieldValueDataTypes);
          form.setValue(path as keyof ResumeState, e.target.value);
        };
        return (
          <FormItem className="space-y-2">
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
          </FormItem>
        );
      }}
    />
  );
};

export { ResumeFormField };
