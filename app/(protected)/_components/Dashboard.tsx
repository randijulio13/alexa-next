'use client'

import { Button } from '@/components/ui/button'
import { BoxIcon, Calendar, Users } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
interface DashboardProps {
    totalContact: number
    totalVendor: number
    totalEvent: number
}

const Dashboard = ({ totalContact, totalVendor, totalEvent }: DashboardProps) => {
    const cards = useMemo(() => {
        return [
            {
                title: 'Upcoming Events',
                count: totalEvent,
                icon: <Calendar className="!w-12 !h-12 opacity-10" />,
                link: '/events',
            },
            {
                title: 'Contacts',
                count: totalContact,
                icon: <Users className="!w-12 !h-12 opacity-10" />,
                link: '/contacts',
            },
            {
                title: 'Vendors',
                count: totalVendor,
                icon: <BoxIcon className="!w-12 !h-12 opacity-10" />,
                link: '/vendors',
            },
        ]
    }, [totalContact])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => (
                <Button asChild className="h-24 flex items-center justify-between" key={index}>
                    <Link href={card.link}>
                        <div className="flex flex-col gap-0 items-start">
                            <h4 className="mb-0 text-4xl font-bold">{card.count}</h4>
                            <span>{card.title}</span>
                        </div>
                        {card.icon}
                    </Link>
                </Button>
            ))}
        </div>
    )
}

export default Dashboard
