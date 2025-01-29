import TableSkeleton from '@/components/app/table-skeleton'
import { flexRender, Table as TableType } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { getPagination } from '@/lib/utils'

interface DatatableProps<TData> {
    isLoading: boolean
    table: TableType<TData>
}

const Datatable = <TData,>({ isLoading, table }: DatatableProps<TData>) => {
    const {
        getPageCount,
        getCanNextPage,
        getCanPreviousPage,
        previousPage,
        nextPage,
        getHeaderGroups,
        getRowModel,
        getState,
    } = table
    const { pagination } = getState()

    const paginationObj = useMemo(() => {
        return getPagination(pagination.pageIndex, getPageCount())
    }, [pagination])

    return (
        <>
            {isLoading ? (
                <TableSkeleton header={getHeaderGroups()} row={pagination.pageSize} />
            ) : (
                <Table className="border">
                    <TableHeader>
                        {getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {getRowModel().rows?.length ? (
                            getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
            {getCanPreviousPage() && getCanNextPage() && (
                <Pagination>
                    <PaginationContent>
                        {getCanPreviousPage() && (
                            <PaginationItem>
                                <PaginationPrevious href="#" onClick={() => previousPage()} />
                            </PaginationItem>
                        )}
                        {paginationObj.map((p, index) => {
                            return (
                                <PaginationItem key={index}>
                                    {p === '...' ? (
                                        <PaginationEllipsis />
                                    ) : (
                                        <PaginationLink
                                            onClick={() => table.setPageIndex(Number(p))}
                                            href="#"
                                            isActive={p === pagination.pageIndex}
                                        >
                                            {Number(p) + 1}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            )
                        })}
                        {getCanNextPage() && (
                            <PaginationItem>
                                <PaginationNext href="#" onClick={() => nextPage()} />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </>
    )
}

export default Datatable
