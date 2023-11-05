"use client";

import { ChangeEvent, KeyboardEvent, useOptimistic, useState } from "react";
import { InsertResumeFunction } from "@/db/actions/resume/insert";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { EmptyState } from "@/components/resume-listing/empty-state";
import { DataTablePagination } from "@/components/resume-listing/pagination";
import { DataTableViewOptions } from "@/components/resume-listing/view-options";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HandleInsertFunction } from "../create-resume-handler";

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
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-11/12">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter resume..."
          value={
            (table.getColumn("custom_url")?.getFilterValue() as string) ?? ""
          }
          onChange={(
            e: ChangeEvent<HTMLInputElement> & { target: { value: string } },
          ) => table.getColumn("custom_url")?.setFilterValue(e.target.value)}
          className="mx-auto max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <DataTableViewOptions table={table} />

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-white/20"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
