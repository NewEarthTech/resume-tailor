"use client";

import Link from "next/link";
import type { Resume } from "@/db/schema/resume";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { DataTableColumnHeader } from "@/components/content/data-table/column-header";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Resume>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <Button
        key={row.getValue("id")}
        className="max-w-fit overflow-hidden text-sm"
        asChild
        variant="ghost"
      >
        <Link href={`/resume/${row.getValue("id")}`}>{row.getValue("id")}</Link>
      </Button>
    ),
  },
  {
    accessorKey: "user_title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
  },
  {
    accessorKey: "custom_url",
    header: "URL",
  },
  {
    accessorKey: "pdf_url",
    header: "PDF",
  },
  {
    accessorKey: "user_email",
    header: "Email",
  },
  {
    accessorKey: "user_address",
    header: "Address",
  },
  {
    accessorKey: "user_link",
    header: "Social Link",
  },
];
