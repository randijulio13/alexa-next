import { Button } from '@/components/ui/button'
import { Event } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { EyeIcon, Trash } from 'lucide-react'
import Link from 'next/link'

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
            accessorKey: 'description',
            header: 'Description',
        },
        {
            accessorKey: 'location',
            header: 'Location',
        },
        {
            accessorKey: 'eventDate',
            header: 'Event Date',
            cell: ({ row }) => {
                return format(row.original.eventDate, 'PPP')
            },
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                return (
                    <div className="flex gap-2">
                        <Button size="sm" asChild>
                            <Link href={`/events/${row.original.id}`}>
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
