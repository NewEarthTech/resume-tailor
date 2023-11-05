"use client";

import { ReactNode } from "react";
import { InsertUserFunction } from "@/db/actions/user/insert";

import { Button } from "@/components/ui/button";

export default function ClientButton({
  insertUser,
  children,
  ...props
}: {
  insertUser: InsertUserFunction;
  children: ReactNode;
}) {
  return (
    <form action={insertUser}>
      <Button {...props} type="submit">
        {children}
      </Button>
    </form>
  );
}
