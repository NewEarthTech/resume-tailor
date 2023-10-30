"use client";

import Link from "next/link";
import type { Resume } from "@/db/schema/resume";
import { ColumnDef } from "@tanstack/react-table";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Copy } from "lucide-react";

import { ActionsMenu } from "@/components/content/data-table/actions-menu";
import { DataTableColumnHeader } from "@/components/content/data-table/column-header";
import { Button } from "@/components/ui/button";
import { ToggleCopyIcon } from "@/components/ui/toggle-copy-icon";

export const columns: ColumnDef<Resume>[] = [
  // {
  //   accessorKey: "user_title",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Job Title" />
  //   ),
  // },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="URL" />
    ),
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const url = row.original.custom_url;
      const id = row.getValue("id")?.toString();
      if (!url && !id) return null;
      const href = `${process.env.base_url}/resume/${url ? url : id}`;
      return (
        <div className="flex items-center">
          <Button
            key={href}
            className="overflow-x-scroll whitespace-nowrap rounded-md text-xs"
            variant="link"
            asChild
          >
            <Link href={href} target="_blank">
              {href}
            </Link>
          </Button>
          <ToggleCopyIcon textToCopy={href} variant="outline" className="" />
        </div>
      );
    },
  },
  // {
  //   accessorKey: "pdf_url",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="PDF" />
  //   ),
  // },
  // {
  //   accessorKey: "user_email",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Email" />
  //   ),
  // },
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
      return <ActionsMenu row={row} />;
    },
  },
];
