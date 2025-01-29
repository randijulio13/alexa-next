'use client'

import React, { useCallback, useMemo, useState } from 'react'
import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
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

import { Vendor } from '@prisma/client'
import { toast } from '@/hooks/use-toast'
import { DeleteVendorAction, GetVendorAction } from '../actions'
import { getColumn } from '../_libs/datatable'
import CreateVendor from './CreateVendor'
import Datatable from '@/components/app/datatable'

interface DatatableProps {
    initialData: Vendor[]
}

const VendorDatatable = ({ initialData }: DatatableProps) => {
    const [sorting] = useState<SortingState>([])
    const [columnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility] = useState<VisibilityState>({})
    const [rowSelection] = useState({})
    const [data, setData] = useState<Vendor[]>(initialData)
    const [selectedId, setSelectedId] = useState<number | null>(null)

    const getData = useCallback(async () => {
        try {
            const vendor = await GetVendorAction()
            setData(vendor)
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

    const handleDelete = useCallback(async (id: number) => {
        try {
            await DeleteVendorAction(id)
            toast({
                title: 'Vendor deleted',
                description: 'The vendor has been successfully deleted.',
            })

            getData()
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
        data,
        getCoreRowModel: getCoreRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="flex flex-col gap-4">
            <div>
                <CreateVendor {...{ getData }} />
            </div>
            <Datatable isLoading={false} table={table} />
            <AlertDialog open={!!selectedId} onOpenChange={(state) => setSelectedId(state ? selectedId : null)}>
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

export default VendorDatatable
