"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Contact } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { DeleteContactAction, GetContactAction } from "../actions";
import { getColumn } from "../_libs/datatable";
import { useRouter } from "next/navigation";
import CreateContact from "./CreateContact";

interface DatatableProps {
  initialData: Contact[];
}

const Datatable = ({ initialData }: DatatableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Contact[]>(initialData);

  const getData = useCallback(async () => {
    try {
      const contact = await GetContactAction();
      setData(contact);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: err.message,
      });
    }
  }, []);

  const handleDelete = useCallback(async (data: Contact) => {
    try {
      await DeleteContactAction(data);
      toast({
        title: "Contact deleted",
        description: "The contact has been successfully deleted.",
      });

      getData();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: err.message,
      });
    }
  }, []);

  const columns = useMemo(() => {
    return getColumn(handleDelete);
  }, []);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <CreateContact {...{ getData }} />
      </div>
      <Table className="border">
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
                          header.getContext()
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
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Datatable;
