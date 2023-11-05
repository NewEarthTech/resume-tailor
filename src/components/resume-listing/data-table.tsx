"use client";

import { useOptimistic } from "react";
import { InsertResumeFunction } from "@/db/actions/resume/insert";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { EmptyState } from "@/components/resume-listing/empty-state";
import { DataTablePagination } from "@/components/resume-listing/pagination";
import { DataTableViewOptions } from "@/components/resume-listing/view-options";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HandleInsertFunction } from "../create-resume-button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  insertResume: InsertResumeFunction;
  handleInsert: HandleInsertFunction;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  insertResume,
  handleInsert,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [optimisticTable, setOptimisticTable] = useOptimistic(table);
  return (
    <div className="w-11/12 rounded-md border">
      <DataTableViewOptions table={optimisticTable} />

      <Table>
        <TableHeader>
          {optimisticTable.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {optimisticTable.getRowModel().rows?.length ? (
            optimisticTable.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-white/20"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <EmptyState
              columns={columns}
              handleInsert={handleInsert}
              insertResume={insertResume}
            />
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={optimisticTable} />
    </div>
  );
}
