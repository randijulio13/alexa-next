'use client'

import React, { useMemo, useState } from 'react'
import CreateEvent from './CreateEvent'
import Datatable from '@/components/app/datatable'
import { useQuery } from '@tanstack/react-query'
import { PaginationData } from '@/schemas/common'
import { Event } from '@prisma/client'
import { DeleteEventAction, GetEventAction } from '../actions'
import {
    getCoreRowModel,
    useReactTable,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
} from '@tanstack/react-table'
import { getColumn } from '../_libs/datatable'
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
import { toast } from '@/hooks/use-toast'

const EventDatatable = () => {
    const [sorting] = useState<SortingState>([])
    const [columnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility] = useState<VisibilityState>({})
    const [rowSelection] = useState({})
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const totalPage = useMemo(() => {
        return 10
    }, [])

    const getData = async (): Promise<PaginationData<Event[]>> => {
        const data = await GetEventAction({ page: 0, take: 10 })
        return data
    }

    const { data, refetch, isFetching } = useQuery({
        queryKey: ['events'],
        queryFn: getData,
    })

    const columns = getColumn(setSelectedId)

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

    const handleDelete = async (id: number) => {
        try {
            toast({
                title: 'Deleting event',
                description: 'Please wait while the event is being deleted.',
            })
            await DeleteEventAction(id)
            toast({
                title: 'Event deleted',
                description: 'The event has been successfully deleted.',
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
    }

    return (
        <div className="flex flex-col">
            <div className="mb-4">
                <CreateEvent {...{ refetch }} />
            </div>
            <Datatable isLoading={isFetching} table={table} />
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

export default EventDatatable
