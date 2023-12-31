"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import type { Resume } from "@/db/schema/resume";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/resume-listing/column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleCopyIcon } from "@/components/ui/toggle-copy-icon";

const ActionsMenu = dynamic(
  () => import("./actions-menu").then((mod) => mod.ActionsMenu),
  { loading: () => <Skeleton className="h-full w-full" /> },
);

export const columns: ColumnDef<Resume>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user_title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
  },
  {
    accessorKey: "user_email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "custom_url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="URL" />
    ),
    cell: ({ row }) => {
      const id = row.original.id;
      const url = row.getValue("custom_url")?.toString();
      if (!url && !id) return null;
      const href = `/${url ? url : "resume/" + id}`;
      return (
        <div className="flex items-center">
          <Button
            key={href}
            className="overflow-x-scroll whitespace-nowrap rounded-md text-xs"
            variant="link"
            asChild
          >
            <Link href={href}>{`${process.env.base_url}${href}`}</Link>
          </Button>
          <ToggleCopyIcon textToCopy={href} variant="outline" className="" />
        </div>
      );
    },
  },
  // {
  //   accessorKey: "user_phone",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Phone" />
  //   ),
  // },
  // {
  //   accessorKey: "user_address",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Address" />
  //   ),
  // },
  // {
  //   accessorKey: "user_link",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Social Link" />
  //   ),
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      return row ? <ActionsMenu row={row} /> : null;
    },
  },
];
