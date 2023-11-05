import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

export function EmptyState({ columns, handleInsert, insertResume }: any) {
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        <div className="m-5 ">No results.</div>
        <form action={handleInsert}>
          <Button variant="secondary" className="my-4 text-sm" type="submit">
            Create resume?
          </Button>
        </form>
      </TableCell>
    </TableRow>
  );
}
