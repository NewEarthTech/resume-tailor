import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import insertResume from "@/db/actions/resume/insert";

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
