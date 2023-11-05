import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import insertResume from "@/db/actions/resume/insert";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { toast } from "./ui/use-toast";

export const handleInsert = async () => {
  "use server";
  let id;
  id = await insertResume()
    .then((id) => {
      revalidatePath(`/resume`, "page");
      return id;
    })
    .catch((error) => {
      toast({
        variant: "destructive",
        title: "Resume Not Created",
        description: `${JSON.stringify(error)}`,
      });
    });
  redirect(`/resume/${id}`, RedirectType["push"]);
};

export type HandleInsertFunction = typeof handleInsert;

export async function CreateResumeButton({
  className,
  variant = "default",
  children,
}: ButtonProps) {
  return (
    <form action={handleInsert}>
      <Button
        variant={variant}
        className={cn("my-4 hidden text-sm sm:[display:inherit]", className)}
        type="submit"
      >
        Create resume
        {children ? children : null}
      </Button>
    </form>
  );
}
