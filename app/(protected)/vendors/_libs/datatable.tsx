import { Button } from '@/components/ui/button'
import { Vendor } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { EyeIcon, Trash } from 'lucide-react'

import Link from 'next/link'

export const getColumn = (
    // getData: () => Promise<void>,
    onClickDelete: React.Dispatch<React.SetStateAction<number | null>>
): ColumnDef<Vendor>[] => {
    return [
        {
            accessorKey: 'number',
            header: '#',
            cell: (cell) => {
                return <span>{cell.row.index + 1}</span>
            },
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'description',
            header: 'Description',
        },
        {
            accessorKey: 'vendorType',
            header: 'Type',
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                return (
                    <div className="flex gap-2 items-center">
                        <Button asChild size="sm">
                            <Link href={`/vendors/${row.original.id}`}>
                                <EyeIcon />
                                Detail
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => onClickDelete(row.original.id)}>
                            <Trash />
                            Delete
                        </Button>
                    </div>
                )
            },
        },
    ]
}
