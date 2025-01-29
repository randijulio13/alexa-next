import { Button } from '@/components/ui/button'
import { Event } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Trash } from 'lucide-react'

export const getColumn = (onClickDelete: React.Dispatch<React.SetStateAction<number | null>>): ColumnDef<Event>[] => {
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
            accessorKey: 'phone',
            header: 'Phone',
        },
        {
            accessorKey: 'address',
            header: 'Address',
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                return (
                    <Button variant="destructive" size="sm" onClick={() => onClickDelete(row.original.id)}>
                        <Trash />
                        Delete
                    </Button>
                )
            },
        },
    ]
}
