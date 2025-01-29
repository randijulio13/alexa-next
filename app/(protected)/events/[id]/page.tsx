import AppBreadcrumb, { BreadcrumbItemProps } from '@/components/app/breadcrumb'
import React from 'react'
import { GetEventByIdAction } from '../actions'
import EventDetail from './_components/EventDetail'

interface EditEventPageProps {
    params: Promise<{ id: string }>
}

const page = async ({ params }: EditEventPageProps) => {
    const { id } = await params
    const event = await GetEventByIdAction(Number(id))

    const items: BreadcrumbItemProps[] = [
        {
            label: 'Home',
            link: '/',
        },
        {
            label: 'Events',
            link: '/events',
        },
        {
            label: event.name,
        },
    ]
    return (
        <div className="px-8 py-4">
            <div className="mb-4">
                <AppBreadcrumb items={items} />
            </div>
            <EventDetail event={event} />
        </div>
    )
}

export default page
