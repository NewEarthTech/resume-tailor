"use client";

import Link from "next/link";
import type { Resume } from "@/db/schema/resume";
import { ColumnDef } from "@tanstack/react-table";

import { ActionsMenu } from "@/components/content/data-table/actions-menu";
import { DataTableColumnHeader } from "@/components/content/data-table/column-header";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Resume>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      const id = row.getValue("id")?.toString();
      return (
        <Button
          key={id}
          className="max-w-[60px] overflow-x-scroll whitespace-nowrap rounded-md text-sm"
          asChild
          variant="link"
        >
          <Link href={`${process.env.base_url}/resume/${id}`}>{id}</Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "custom_url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="URL" />
    ),
    cell: ({ row }) => {
      const url = row.getValue("custom_url")?.toString();
      if (!url) return null;
      return (
        <Button key={url} className="text-sm" asChild variant="ghost">
          <Link href={`${process.env.base_url}/resume/${url}`}>{url}</Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "user_title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
  },
  {
    accessorKey: "pdf_url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PDF" />
    ),
  },
  {
    accessorKey: "user_email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "user_phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: "user_address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
  },
  {
    accessorKey: "user_link",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Social Link" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionsMenu row={row} />;
    },
  },
];
