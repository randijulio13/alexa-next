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
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

import { Contact } from '@prisma/client'
import { toast } from '@/hooks/use-toast'
import { DeleteContactAction, GetContactAction } from '../actions'
import { getColumn } from '../_libs/datatable'
import CreateContact from './CreateContact'

import { PaginationData } from '@/schemas/common'
import { useQuery } from '@tanstack/react-query'
import Datatable from '@/components/app/datatable'

interface DatatableProps {
    initialData: PaginationData<Contact[]>
}

const ContactDatatable = ({ initialData }: DatatableProps) => {
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

    const getData = useCallback(async (): Promise<PaginationData<Contact[]>> => {
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

    const [selectedId, setSelectedId] = useState<number | null>(null)

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
        return getColumn(setSelectedId)
    }, [])

    const table = useReactTable({
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

    return (
        <div className="flex flex-col gap-4">
            <div>
                <CreateContact {...{ refetch }} />
            </div>
            <Datatable table={table} isLoading={isFetching} />
            <AlertDialog onOpenChange={(state) => setSelectedId(state ? selectedId : null)} open={!!selectedId}>
                <AlertDialogTrigger asChild></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data
                            from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(Number(selectedId))}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default ContactDatatable
