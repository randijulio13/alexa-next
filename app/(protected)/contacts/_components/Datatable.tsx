'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Contact } from '@prisma/client'
import { toast } from '@/hooks/use-toast'
import { DeleteContactAction, GetContactAction } from '../actions'
import { getColumn } from '../_libs/datatable'
import CreateContact from './CreateContact'
import { getPagination } from '@/lib/utils'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { PaginationData } from '@/schemas/common'
import { useQuery } from '@tanstack/react-query'
import TableSkeleton from './TableSkeleton'

interface DatatableProps {
    initialData: PaginationData<Contact[]>
}

const Datatable = ({ initialData }: DatatableProps) => {
    const [sorting] = useState<SortingState>([])
    const [columnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility] = useState<VisibilityState>({})
    const [rowSelection] = useState({})
    const [pagination, setPagination] = useState({
        pageIndex: initialData.currentPage,
        pageSize: initialData.perPage,
    })

    const totalPage = useMemo(() => {
        return initialData.totalPage
    }, [initialData])

    const getData = useCallback(async (): Promise<
        PaginationData<Contact[]>
    > => {
        const contact = await GetContactAction({
            page: pagination.pageIndex,
            take: pagination.pageSize,
        })

        if (!contact) throw new Error('Error fetching contact data')
        return contact
    }, [pagination])

    const { data, refetch, isFetching, error } = useQuery({
        queryKey: ['contacts'],
        queryFn: getData,
    })

    useEffect(() => {
        if (error) {
            toast({
                variant: 'destructive',
                title: 'An error occurred',
                description: error.message,
            })
        }
    }, [error])

    useEffect(() => {
        refetch()
    }, [pagination])

    const [selectedContact, setSelectedContact] = useState<number | null>(null)

    const handleDelete = useCallback(async (id: number) => {
        try {
            toast({
                title: 'Deleting contact',
                description: 'Please wait while the contact is being deleted.',
            })
            await DeleteContactAction(id)
            toast({
                title: 'Contact deleted',
                description: 'The contact has been successfully deleted.',
            })

            refetch()
        } catch (err) {
            if (err instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: 'An error occurred',
                    description: err.message,
                })
            }
        }
    }, [])

    const columns = useMemo(() => {
        return getColumn(setSelectedContact)
    }, [])

    const {
        getCanPreviousPage,
        getCanNextPage,
        previousPage,
        nextPage,
        ...table
    } = useReactTable({
        columns,
        data: data?.data ?? [],
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        manualPagination: true,
        pageCount: totalPage,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    })

    const paginationObj = useMemo(() => {
        return getPagination(pagination.pageIndex, totalPage)
    }, [pagination])

    return (
        <div className="flex flex-col gap-4">
            <div>
                <CreateContact {...{ refetch }} />
            </div>
            {isFetching ? (
                <TableSkeleton
                    header={table.getHeaderGroups()}
                    row={pagination.pageSize}
                />
            ) : (
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
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
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
                                <PaginationPrevious
                                    href="#"
                                    onClick={() => previousPage()}
                                />
                            </PaginationItem>
                        )}
                        {paginationObj.map((p, index) => {
                            return (
                                <PaginationItem key={index}>
                                    {p === '...' ? (
                                        <PaginationEllipsis />
                                    ) : (
                                        <PaginationLink
                                            onClick={() =>
                                                table.setPageIndex(Number(p))
                                            }
                                            href="#"
                                            isActive={
                                                p === pagination.pageIndex
                                            }
                                        >
                                            {Number(p) + 1}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            )
                        })}
                        {getCanNextPage() && (
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={() => nextPage()}
                                />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
            <AlertDialog
                onOpenChange={(state) =>
                    setSelectedContact(state ? selectedContact : null)
                }
                open={!!selectedContact}
            >
                <AlertDialogTrigger asChild></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                handleDelete(Number(selectedContact))
                            }
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Datatable
