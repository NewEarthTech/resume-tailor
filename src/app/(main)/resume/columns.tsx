"use client";

import type { Resume } from "@/db/schema/resume";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Resume>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user_title",
    header: "Job Title",
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
