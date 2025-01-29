import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { flexRender, HeaderGroup } from '@tanstack/react-table'
import React from 'react'

interface TableSkeletonProps<TData> {
    header: HeaderGroup<TData>[]
    row: number
}

const TableSkeleton = <TData,>({ header, row }: TableSkeletonProps<TData>) => {
    return (
        <Table className="border">
            <TableHeader>
                {header.map((headerGroup) => (
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
                {[...Array(row)].map((_, index) => (
                    <TableRow key={index}>
                        {header[0].headers.map((header) => (
                            <TableHead key={header.id}>
                                <Skeleton className="h-4" />
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TableSkeleton
