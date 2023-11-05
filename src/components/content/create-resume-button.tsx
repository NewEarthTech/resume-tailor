import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import insertResume from "@/db/actions/resume/insert";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { toast } from "../ui/use-toast";

export const handleInsert = async () => {
  "use server";
  let id;
  try {
    id = await insertResume();
  } catch (error) {
    console.error(error);

    toast({
      variant: "destructive",
      title: "Resume Not Created",
      description: `${JSON.stringify(error)}`,
    });
  }
  toast({
    title: "Resume Created",
    description: `Redirecting to /resume/${id}...`,
  });

  revalidatePath(`/resume/${id}`);
  revalidatePath(`/resume`);
  redirect(`/resume/${id}`);
};

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
