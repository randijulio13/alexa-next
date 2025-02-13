import AppBreadcrumb, { BreadcrumbItemProps } from '@/components/app/breadcrumb'
import React from 'react'
import EventDatatable from './_components/EventDatatable'

const page = async () => {
    const items: BreadcrumbItemProps[] = [
        {
            label: 'Home',
            link: '/',
        },
        {
            label: 'Events',
        },
    ]
    return (
        <div className="px-8 py-4">
            <div className="mb-4">
                <AppBreadcrumb items={items} />
            </div>
            <EventDatatable />
        </div>
    )
}

export default page
