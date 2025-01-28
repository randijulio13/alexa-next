import React from 'react'
import Datatable from './_components/Datatable'
import { GetContactAction } from './actions'
import AppBreadcrumb, { BreadcrumbItemProps } from '@/components/app/breadcrumb'

const page = async () => {
    const data = await GetContactAction({ page: 0, take: 10 })
    const items: BreadcrumbItemProps[] = [
        {
            label: 'Home',
            link: '/',
        },
        {
            label: 'Contacts',
        },
    ]
    return (
        <div className="p-4">
            <div className="mb-4">
                <AppBreadcrumb items={items} />
            </div>
            <Datatable initialData={data} />
        </div>
    )
}

export default page
